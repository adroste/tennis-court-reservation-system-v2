import { Button, Checkbox, Divider, Radio } from 'antd';
import { MinusOutlined, PlusOutlined } from '@ant-design/icons';
import React, { useCallback, useContext, useEffect, useMemo, useState } from 'react';

import { appContext } from '../AppContext';
import classNames from 'classnames/bind';
import styles from './GroupDatesForm.module.css';

const cn = classNames.bind(styles);

const defaultRepeatValuesMap = {
    1: 'Täglich',
    7: 'Wöchentlich',
    14: '2-Wöchentlich',
};

export function GroupDatesForm({
    courtId,
    date,
    defaultAddCount = 2,
    onGroupDatesChange,
    repeatValuesMap = defaultRepeatValuesMap,
    reservations,
    today,
    unavailableDates,
}) {
    const { courts, config: { reservationDaysInAdvance } } = useContext(appContext);

    const [enabled, setEnabled] = useState(false);
    const [repeatValue, setRepeatValue] = useState();
    const [visibleDates, setVisibleDates] = useState([]);
    const [selectedDates, _setSelectedDates] = useState([]);

    const courtDisabledFromTil = useMemo(() =>
        (courts.find(c => c.courtId === courtId))?.disabledFromTil, [courts, courtId]);

    const checkIfNotAvailable = useCallback(date => (
        date.isAfter(today.add(reservationDaysInAdvance, 'day'), 'day')
        || (courtDisabledFromTil && date.isBetween(courtDisabledFromTil[0], courtDisabledFromTil[1], 'day', '[]'))
        || (unavailableDates && unavailableDates.some(d => date.isSame(d, 'day')))
    ), [courtDisabledFromTil, today, reservationDaysInAdvance, unavailableDates]);

    const dates = useMemo(() => {
        return visibleDates.map(d => ({
            date: d,
            checked: selectedDates.findIndex(gd => gd.isSame(d, 'day')) !== -1,
            reserved: reservations?.findIndex(r => r.date.isSame(d, 'day')) !== -1,
            past: d.isBefore(today, 'day'),
            notAvailable: checkIfNotAvailable(d),
        }));
    }, [checkIfNotAvailable, selectedDates, reservations, visibleDates, today]);

    const setSelectedDates = useCallback(selectedDates => {
        _setSelectedDates(_selectedDates => {
            let dates = selectedDates;
            if (typeof selectedDates === 'function')
                dates = selectedDates(_selectedDates);
            return dates.filter(d => !checkIfNotAvailable(d));
        });
    }, [checkIfNotAvailable]);

    useEffect(() => {
        onGroupDatesChange(selectedDates);
    }, [selectedDates, onGroupDatesChange]);

    useEffect(() => {
        let selectedDates = [date];
        let visibleDates = [date];

        if (reservations?.length) {
            selectedDates = reservations.map(r => r.date);
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
            setEnabled(true);

            const first = selectedDates[0];
            const last = selectedDates[selectedDates.length - 1];
            const count = Math.abs(first.diff(last, 'day') / repeatValue);
            visibleDates = [];
            for (let i = 0; i <= count; ++i)
                visibleDates.push(first.add(i * repeatValue, 'day'));
        }

        setVisibleDates(visibleDates);
        setSelectedDates(selectedDates);
    }, [reservations, date, repeatValuesMap, setSelectedDates]);

    const addDate = useCallback(() => {
        setVisibleDates(visibleDates => {
            const last = visibleDates[visibleDates.length - 1];
            const add = last.add(repeatValue, 'day');
            setSelectedDates(selectedDates => [...selectedDates, add]);
            return [...visibleDates, add];
        });
    }, [repeatValue, setSelectedDates]);

    const removeDate = useCallback(() => {
        setVisibleDates(visibleDates => {
            const last = visibleDates[visibleDates.length - 1];
            const reserved = reservations?.findIndex(r => r.date.isSame(last, 'day')) !== -1;
            if (visibleDates.length <= 1 || reserved)
                return visibleDates;
            setSelectedDates(selectedDates => selectedDates.filter(gd => !gd.isSame(last, 'day')));
            return visibleDates.slice(0, -1);
        });
    }, [reservations, setSelectedDates]);

    const handleEnabledChange = useCallback(e => {
        setEnabled(e.target.checked);
    }, []);

    const handleRepeatValueChange = useCallback(e => {
        const newRepeatValue = e.target.value;
        setRepeatValue(newRepeatValue);

        const newDates = [date];
        for (let i = 1; i <= defaultAddCount; ++i)
            newDates.push(date.add(i * newRepeatValue, 'day'));

        setVisibleDates(newDates);
        setSelectedDates(newDates);
    }, [date, defaultAddCount, setSelectedDates]);

    const handleCheckedChange = useCallback(e => {
        const index = e.target.value;
        const checked = e.target.checked;
        const date = visibleDates[index];

        setSelectedDates(selectedDates => {
            const newSelection = selectedDates.filter(gd => !gd.isSame(date, 'day'));
            if (checked)
                newSelection.push(date);
            newSelection.sort((a, b) => a.valueOf() - b.valueOf());
            return newSelection;
        });
    }, [visibleDates, setSelectedDates]);

    return (
        <div className={styles.wrapper}>
            <div className={styles.enableCheckbox}>
                <Checkbox
                    checked={enabled}
                    onChange={handleEnabledChange}
                    disabled={reservations?.length}
                >
                    Wiederholen / Regelmäßiger Termin
                </Checkbox>
            </div>
            {enabled &&
                <div className={styles.repeatSettings}>
                    <div>
                        <Radio.Group
                            className={styles.repeatTypes}
                            value={repeatValue}
                            onChange={handleRepeatValueChange}
                            disabled={reservations?.length}
                        >
                            {Object.keys(repeatValuesMap).map(value => (
                                <Radio key={value} value={value}>{repeatValuesMap[value]}</Radio>
                            ))}
                        </Radio.Group>
                    </div>

                    {repeatValue > 0 &&
                        <>
                            <Divider />

                            <div className={styles.dates}>
                                {dates.map(({ date, checked, reserved, past, notAvailable }, i) => (
                                    <Checkbox
                                        className={cn({
                                            unchecked: !checked,
                                            danger: reserved && !checked,
                                        })}
                                        key={date}
                                        value={i}
                                        disabled={past || notAvailable}
                                        checked={checked}
                                        onChange={handleCheckedChange}
                                    >
                                        <span className={styles.date}>{date.format('dd L')}</span>
                                        {!notAvailable && !past && reserved && checked && <span className={styles.extra}> Aktuell reserviert</span>}
                                        {!notAvailable && !past && reserved && !checked && <span className={styles.extra}> Wird storniert</span>}
                                        {!notAvailable && past && <span className={styles.extra}> Bereits vergangen</span>}
                                        {notAvailable && <span className={styles.extra}> Nicht verfügbar</span>}
                                    </Checkbox>
                                ))}
                            </div>
                            <div className={styles.buttons}>
                                <Button
                                    icon={<PlusOutlined />}
                                    onClick={addDate}
                                />
                                <Button
                                    icon={<MinusOutlined />}
                                    onClick={removeDate}
                                />
                            </div>
                        </>
                    }
                </div>
            }
        </div>
    );
}