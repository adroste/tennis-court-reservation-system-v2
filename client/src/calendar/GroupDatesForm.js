import { Button, Checkbox, Divider, Radio } from 'antd';
import { MinusOutlined, PlusOutlined } from '@ant-design/icons';
import React, { useCallback, useEffect, useMemo, useState } from 'react';

import classNames from 'classnames/bind';
import dayjs from 'dayjs';
import styles from './GroupDatesForm.module.css';

const cn = classNames.bind(styles);

const defaultRepeatValuesMap = {
    1: 'Täglich',
    7: 'Wöchentlich',
    14: '2-Wöchentlich',
};

export function GroupDatesForm({
    date,
    defaultAddCount = 2,
    onGroupDatesChange,
    repeatValuesMap = defaultRepeatValuesMap,
    reservations,
}) {
    const [enabled, setEnabled] = useState(false);
    const [repeatValue, setRepeatValue] = useState();
    const [visibleDates, setVisibleDates] = useState([]);
    const [selectedDates, setSelectedDates] = useState([]);

    const dates = useMemo(() => {
        const today = dayjs();
        return visibleDates.map(d => ({
            date: d,
            checked: selectedDates.findIndex(gd => gd.isSame(d, 'day')) !== -1,
            reserved: reservations?.findIndex(r => r.date.isSame(d, 'day')) !== -1,
            past: d.isBefore(today, 'day'),
        }));
    }, [selectedDates, reservations, visibleDates]);

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
    }, [reservations, date, repeatValuesMap]);

    const addDate = useCallback(() => {
        setVisibleDates(visibleDates => {
            const last = visibleDates[visibleDates.length - 1];
            const add = last.add(repeatValue, 'day');
            setSelectedDates(selectedDates => [...selectedDates, add]);
            return [...visibleDates, add];
        });
    }, [repeatValue]);

    const removeDate = useCallback(() => {
        setVisibleDates(visibleDates => {
            const last = visibleDates[visibleDates.length - 1];
            const reserved = reservations?.findIndex(r => r.date.isSame(last, 'day')) !== -1;
            if (visibleDates.length <= 1 || reserved)
                return visibleDates;
            setSelectedDates(selectedDates => selectedDates.filter(gd => !gd.isSame(last, 'day')));
            return visibleDates.slice(0, -1);
        });
    }, [reservations]);

    const handleEnableChange = useCallback(e => {
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
    }, [date, defaultAddCount]);

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
    }, [visibleDates]);

    return (
        <div className={styles.wrapper}>
            <div className={styles.enableCheckbox}>
                <Checkbox
                    checked={enabled}
                    onChange={handleEnableChange}
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
                                {dates.map(({ date, checked, reserved, past }, i) => (
                                    <Checkbox
                                        className={cn({
                                            unchecked: !checked,
                                            danger: reserved && !checked,
                                        })}
                                        key={date}
                                        value={i}
                                        disabled={past}
                                        checked={checked}
                                        onChange={handleCheckedChange}
                                    >
                                        <span className={styles.date}>{date.format('dd L')}</span>
                                        {!past && reserved && checked && <span className={styles.extra}> Aktuell reserviert</span>}
                                        {!past && reserved && !checked && <span className={styles.extra}> Wird storniert</span>}
                                        {past && <span className={styles.extra}> Bereits vergangen</span>}
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