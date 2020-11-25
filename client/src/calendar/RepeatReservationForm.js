import { Button, Checkbox, Radio } from 'antd';
import { MinusOutlined, PlusOutlined } from '@ant-design/icons';
import React, { useCallback, useContext, useEffect, useMemo, useState } from 'react';

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
    from,
    to,
    defaultAddCount = 2,
    disabled = false,
    onChange,
    repeatValuesMap = defaultRepeatValuesMap,
    currentReservations,
    unavailableReservations,
}) {
    const { user } = useContext(authContext);
    const { config: { reservationDaysInAdvance } } = useContext(appContext);

    const now = useTime('hour');

    const [repeatValue, setRepeatValue] = useState(0);
    const [visibleDates, setVisibleDates] = useState([]);
    const [selectedDates, _setSelectedDates] = useState([]);

    const fromToHourDiff = useMemo(() => Math.abs(to.diff(from, 'hour')), [from, to]);
    const dateToReservation = useCallback(from => ({
        from,
        to: from.add(fromToHourDiff, 'hour'),
    }), [fromToHourDiff]);

    const checkIfTooFarAhead = useCallback(date => (
        date.isAfter(now.add(reservationDaysInAdvance, 'day'), 'day')
    ), [now, reservationDaysInAdvance]);

    const checkIfNotAvailable = useCallback(date => {
        if (!unavailableReservations)
            return false;
        const r = dateToReservation(date);
        return unavailableReservations.some(r2 => (
            r2.from.isBefore(r.to, 'hour')
            && r2.to.isAfter(r.from, 'hour')
        ));
    }, [unavailableReservations, dateToReservation]);

    const dates = useMemo(() => {
        return visibleDates.map(d => ({
            date: d,
            checked: selectedDates.some(sd => sd.isSame(d, 'day')),
            reserved: currentReservations?.some(r => r.from.isSame(d, 'day')),
            past: d.isBefore(now, 'hour'),
            notAvailable: checkIfNotAvailable(d),
            tooFarAhead: checkIfTooFarAhead(d),
        }));
    }, [checkIfNotAvailable, selectedDates, currentReservations, visibleDates, now, checkIfTooFarAhead]);

    const setSelectedDates = useCallback(selectedDates => {
        _setSelectedDates(_selectedDates => {
            let dates = selectedDates;
            if (typeof selectedDates === 'function')
                dates = selectedDates(_selectedDates);
            return dates.filter(d => !checkIfNotAvailable(d));
        });
    }, [checkIfNotAvailable]);

    useEffect(() => {
        onChange(selectedDates.map(dateToReservation));
    }, [selectedDates, onChange, dateToReservation]);

    // automatically unchecks unavailable dates if unavailableDates changes
    useEffect(() => setSelectedDates(s => s), [setSelectedDates]);

    useEffect(() => {
        let selectedDates = [from];
        let visibleDates = [from];

        if (currentReservations?.length > 1) {
            selectedDates = currentReservations.map(r => r.from);
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
        }

        setVisibleDates(visibleDates);
        _setSelectedDates(selectedDates);
    }, [currentReservations, from, to, repeatValuesMap]);

    const addDate = useCallback(() => {
        setVisibleDates(visibleDates => {
            const last = visibleDates[visibleDates.length - 1];
            const add = last.add(repeatValue, 'day');
            if (!checkIfTooFarAhead(add))
                setSelectedDates(selectedDates => [...selectedDates, add]);
            return [...visibleDates, add];
        });
    }, [repeatValue, setSelectedDates, checkIfTooFarAhead]);

    const removeDate = useCallback(() => {
        setVisibleDates(visibleDates => {
            const last = visibleDates[visibleDates.length - 1];
            const reserved = currentReservations?.some(r => r.from.isSame(last, 'day'));
            if (visibleDates.length <= 1 || reserved)
                return visibleDates;
            setSelectedDates(selectedDates => selectedDates.filter(d => !d.isSame(last, 'day')));
            return visibleDates.slice(0, -1);
        });
    }, [currentReservations, setSelectedDates]);

    const handleRepeatValueChange = useCallback(e => {
        const newRepeatValue = e.target.value;
        setRepeatValue(newRepeatValue);

        const newDates = [from];
        if (newRepeatValue > 0) {
            for (let i = 1; i <= defaultAddCount; ++i)
                newDates.push(from.add(i * newRepeatValue, 'day'));
        }

        setVisibleDates(newDates);
        setSelectedDates(newDates.filter(d => !checkIfTooFarAhead(d)));
    }, [from, defaultAddCount, setSelectedDates, checkIfTooFarAhead]);

    const handleCheckedChange = useCallback(e => {
        const index = e.target.value;
        const checked = e.target.checked;
        const date = visibleDates[index];

        setSelectedDates(selectedDates => {
            const newSelection = selectedDates.filter(d => !d.isSame(date, 'day'));
            if (checked)
                newSelection.push(date);
            newSelection.sort((a, b) => a.valueOf() - b.valueOf());
            return newSelection;
        });
    }, [visibleDates, setSelectedDates]);

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
                        {dates.map(({ date, checked, reserved, past, notAvailable, tooFarAhead }, i) => (
                            <Checkbox
                                key={date}
                                className={cn({
                                    unchecked: !checked,
                                    danger: (reserved && !checked) || notAvailable,
                                })}
                                checked={checked}
                                disabled={(!user?.admin && (past || tooFarAhead)) || notAvailable || disabled}
                                onChange={handleCheckedChange}
                                value={i}
                            >
                                <span className={styles.date}>{date.format('dd[\xa0]L')}</span>
                                {!past && reserved && checked && <span className={styles.extra}> Aktuell reserviert</span>}
                                {!past && reserved && !checked && <span className={styles.extra}> Wird storniert</span>}
                                {!notAvailable && past && <span className={styles.extra}> Bereits vergangen</span>}
                                {!notAvailable && tooFarAhead && <span className={styles.extra}> Zu weit in der Zukunft</span>}
                                {notAvailable && <span className={styles.extra}> Nicht verfügbar</span>}
                            </Checkbox>
                        ))}
                    </div>
                    <div className={styles.buttons}>
                        <Button
                            disabled={disabled}
                            icon={<PlusOutlined />}
                            onClick={addDate}
                        />
                        <Button
                            disabled={disabled}
                            icon={<MinusOutlined />}
                            onClick={removeDate}
                        />
                    </div>
                </>
            }
        </div>
    );
}