import { Button, Radio } from 'antd';
import { DeleteOutlined, LockOutlined, PlusOutlined } from '@ant-design/icons';
import React, { useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';

import { ScrollRadioGroup } from './ScrollRadioGroup';
import { appContext } from '../AppContext';
import { authContext } from '../AuthContext';
import classNames from 'classnames/bind';
import styles from './RepeatReservationForm.module.css';
import { useTime } from './useTime';

const cn = classNames.bind(styles);

const defaultRepeatValuesMap = {
    1: 'Täglich',
    7: 'Wöchentlich',
    14: '2-Wöchentlich',
};

export function RepeatReservationForm({
    courtId,
    currentReservations,
    defaultAddCount = 2,
    disabled = false,
    from,
    onChange,
    repeatValuesMap = defaultRepeatValuesMap,
    to,
    unavailableReservations,
}) {
    const { user } = useContext(authContext);
    const { config: { reservationDaysInAdvance } } = useContext(appContext);

    const now = useTime('hour');

    const [repeatValue, setRepeatValue] = useState(0);
    const [visibleDates, setVisibleDates] = useState([]);
    const [selectedDates, _setSelectedDates] = useState([]);
    const prevValRef = useRef({});

    const dateToReservation = useCallback(from => ({
        courtId,
        from,
        to: from.hour(to.hour() || 24),
    }), [courtId, to]);

    const checkIfTooFarAhead = useCallback(date => (
        !user?.admin && date.isAfter(now.add(reservationDaysInAdvance, 'day'), 'day')
    ), [now, reservationDaysInAdvance, user?.admin]);

    const checkIfNotAvailable = useCallback(date => {
        if (!unavailableReservations)
            return false;
        const r1 = dateToReservation(date);
        return unavailableReservations.some(r2 => (
            r1.courtId === r2.courtId
            && r1.from.isSame(r2.from, 'hour')
            && r1.to.isSame(r2.to, 'hour')
        ));
    }, [unavailableReservations, dateToReservation]);

    const setSelectedDates = useCallback(selectedDates => {
        _setSelectedDates(_selectedDates => {
            let dates = selectedDates;
            if (typeof selectedDates === 'function')
                dates = selectedDates(_selectedDates);
            return dates.filter(d => !checkIfNotAvailable(d) && !checkIfTooFarAhead(d));
        });
    }, [checkIfNotAvailable, checkIfTooFarAhead]);

    useEffect(() => {
        onChange(selectedDates.map(dateToReservation));
    }, [selectedDates, onChange, dateToReservation]);

    // automatically unchecks unavailable dates if unavailableDates changes
    // or time/config changes
    useEffect(() => setSelectedDates(s => s), [setSelectedDates]);

    const reset = useCallback(() => {
        let selectedDates = [];
        let visibleDates = [];

        if (currentReservations?.length > 1) {
            selectedDates = currentReservations.map(r => r.from.hour(from.hour()));
            selectedDates.sort((a, b) => a.valueOf() - b.valueOf());
            let repeatValue = Number.MAX_SAFE_INTEGER;

            if (selectedDates.length > 1) {
                for (let i = 1; i < selectedDates.length; ++i) {
                    const diff = selectedDates[i - 1].diff(selectedDates[i], 'day');
                    repeatValue = Math.min(repeatValue, Math.abs(diff));
                }
            }

            repeatValue = repeatValue.toString();
            const allowedValues = Object.keys(repeatValuesMap);
            if (!allowedValues.includes(repeatValue))
                repeatValue = allowedValues[0];
            setRepeatValue(repeatValue);

            const first = selectedDates[0];
            const last = selectedDates[selectedDates.length - 1];
            const count = Math.abs(first.diff(last, 'day') / repeatValue);
            visibleDates = [];
            for (let i = 0; i <= count; ++i)
                visibleDates.push(first.add(i * repeatValue, 'day'));
        } else if (repeatValue > 0) {
            for (let i = 0; i <= defaultAddCount; ++i) {
                const date = from.add(i * repeatValue, 'day');
                visibleDates.push(date);
                selectedDates.push(date);
            }
        } else {
            selectedDates = [from];
            visibleDates = [from];
        }

        setVisibleDates(visibleDates);
        setSelectedDates(selectedDates);
    }, [currentReservations, defaultAddCount, from, repeatValue, repeatValuesMap, setSelectedDates]);

    useEffect(() => {
        if (
            prevValRef.current.courtId !== courtId
            || prevValRef.current.currentReservations !== currentReservations
            || prevValRef.current.from !== from
            || prevValRef.current.repeatValue !== repeatValue
            || prevValRef.current.to !== to
        ) {
            prevValRef.current.courtId = courtId;
            prevValRef.current.currentReservations = currentReservations;
            prevValRef.current.from = from;
            prevValRef.current.repeatValue = repeatValue;
            prevValRef.current.to = to;
            reset();
        }
    }, [courtId, currentReservations, from, repeatValue, reset, to]);

    const addDate = useCallback(() => {
        setVisibleDates(visibleDates => {
            const last = visibleDates[visibleDates.length - 1];
            const add = last.add(repeatValue, 'day');
            setSelectedDates(selectedDates => [...selectedDates, add]);
            return [...visibleDates, add];
        });
    }, [repeatValue, setSelectedDates]);

    const handleRepeatValueChange = useCallback(e => {
        const newRepeatValue = e.target.value;
        setRepeatValue(newRepeatValue);
    }, []);

    const handleCheckedChange = useCallback((date, checked) => {
        setSelectedDates(selectedDates => {
            // change checked state
            const newSelection = selectedDates.filter(d => !d.isSame(date, 'day'));
            if (checked)
                newSelection.push(date);
            newSelection.sort((a, b) => a.valueOf() - b.valueOf());

            // remove unchecked visible dates at end
            // setVisibleDates(visibleDates => {
            //     const newVisibleDates = [...visibleDates];
            //     // i > 0: make sure at least one item is visible
            //     for (let i = newVisibleDates.length - 1; i > 0; --i) {
            //         if (
            //             currentReservations?.some(r => r.from.isSame(newVisibleDates[i], 'day'))
            //             || newSelection.some(d => d.isSame(newVisibleDates[i], 'day'))
            //         ) {
            //             break;
            //         }
            //         newVisibleDates.pop();
            //     }
            //     return newVisibleDates;
            // });

            return newSelection;
        });
    }, [currentReservations, setSelectedDates]);

    const dates = useMemo(() => {
        return visibleDates.map(d => {
            const r = dateToReservation(d);
            const reserved = currentReservations?.some(cr =>
                cr.from.isSame(r.from, 'hour') && cr.to.isSame(r.to, 'hour'));
            const checked = selectedDates.some(sd => sd.isSame(d, 'day'));
            return {
                date: d,
                checked,
                change: !reserved && currentReservations?.some(r => r.from.isSame(d, 'day')),
                reserved,
                past: d.isBefore(now, 'hour'),
                notAvailable: checkIfNotAvailable(d),
                tooFarAhead: checkIfTooFarAhead(d),
                onClick: () => handleCheckedChange(d, !checked),
            };
        });
    }, [
        checkIfNotAvailable,
        checkIfTooFarAhead,
        currentReservations,
        dateToReservation,
        handleCheckedChange,
        now,
        selectedDates,
        visibleDates,
    ]);


    return (
        <div className={styles.wrapper}>
            <div>
                <ScrollRadioGroup
                    disabled={currentReservations?.length > 1 || disabled}
                    onChange={handleRepeatValueChange}
                    value={repeatValue}
                >
                    <Radio.Button key={0} value={0}>Einzeltermin</Radio.Button>
                    {Object.keys(repeatValuesMap).map(value => (
                        <Radio.Button key={value} value={value}>{repeatValuesMap[value]}</Radio.Button>
                    ))}
                </ScrollRadioGroup>
            </div>

            {repeatValue > 0 &&
                <>
                    <div className={styles.dates}>
                        {dates.map(({ date, checked, change, reserved, past, notAvailable, tooFarAhead, onClick }) => (
                            <Button
                                key={date}
                                className={cn({
                                    dateButton: true,
                                    unchecked: !checked,
                                    danger: (reserved && !checked) || notAvailable,
                                })}
                                disabled={(!user?.admin && (past || tooFarAhead)) || notAvailable || disabled}
                                onClick={onClick}
                                type="link"
                                icon={
                                    ((!user?.admin && (past || tooFarAhead)) || notAvailable || disabled)
                                        ? <LockOutlined />
                                        : checked ? <DeleteOutlined /> : <PlusOutlined />
                                }
                            >
                                <span className={styles.date}>{date.format('dd[\xa0]L')}</span>
                                {!past && reserved && checked && <span className={styles.extra}>Aktuell reserviert</span>}
                                {!past && reserved && !checked && <span className={styles.extra}>Wird storniert</span>}
                                {!notAvailable && past && <span className={styles.extra}>Bereits vergangen</span>}
                                {!notAvailable && tooFarAhead && <span className={styles.extra}>Zu weit in der Zukunft</span>}
                                {!notAvailable && change && <span className={styles.extra}>Wird geändert</span>}
                                {notAvailable && <span className={styles.extra}>Nicht verfügbar</span>}
                            </Button>
                        ))}
                    </div>
                    <div className={styles.buttons}>
                        <Button
                            disabled={disabled}
                            icon={<PlusOutlined />}
                            onClick={addDate}
                            type="dashed"
                        />
                    </div>
                </>
            }
        </div>
    );
}