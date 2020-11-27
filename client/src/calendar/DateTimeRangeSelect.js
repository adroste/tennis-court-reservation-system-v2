import React, { useCallback, useMemo } from 'react';

import { DatePicker } from './DatePicker';
import { DownOutlined } from '@ant-design/icons';
import { Select } from 'antd';
import styles from './DateTimeRangeSelect.module.css';

export function DateTimeRangeSelect({
    disabled = false,
    from,
    to,
    onFromChange,
    onToChange,
}) {
    const hours = useMemo(() => [...Array(24).keys()], []);

    const updateTimes = useCallback(({ newFrom = from, newTo = to }) => {
        if (newFrom.isAfter(newTo)) {
            const tmp = newFrom;
            newFrom = newTo;
            newTo = tmp;
        } else if (newFrom.isSame(newTo)) {
            newTo = newFrom.add(1, 'hour'); // minimal diff 1 hour
        }

        if (!newFrom.isSame(from))
            onFromChange(newFrom);
        if (!newTo.isSame(to))
            onToChange(newTo);
    }, [from, onFromChange, onToChange, to]);

    const handleFromDateChange = useCallback(newFromDate => {
        updateTimes({
            newFrom: newFromDate.hour(from.hour())
        });
    }, [from, updateTimes]);

    const handleToDateChange = useCallback(newToDate => {
        updateTimes({
            newTo: newToDate.hour(to.hour())
        });
    }, [to, updateTimes]);

    const handleFromHourChange = useCallback(newFromHour => {
        updateTimes({
            newFrom: from.hour(newFromHour)
        });
    }, [from, updateTimes]);

    const handleToHourChange = useCallback(newToHour => {
        updateTimes({
            newTo: to.hour(newToHour)
        });
    }, [to, updateTimes]);

    return (
        <div>
            <div>
                <DatePicker
                    allowClear={false}
                    bordered={false}
                    className={styles.datePicker}
                    disabled={disabled}
                    format="L"
                    onChange={handleFromDateChange}
                    showToday={false}
                    suffixIcon={<DownOutlined />}
                    value={from}
                />

                <Select
                    size="large"
                    bordered={false}
                    value={from.hour()}
                    onChange={handleFromHourChange}
                >
                    {hours.map(hour => (
                        <Select.Option
                            key={hour}
                            value={hour}
                        >
                            {hour} Uhr
                        </Select.Option>
                    ))}
                </Select>

            </div>

            <div>
                <span className={styles.to}>bis</span>

                <DatePicker
                    allowClear={false}
                    bordered={false}
                    className={styles.datePicker}
                    disabled={disabled}
                    format="L"
                    onChange={handleToDateChange}
                    showToday={false}
                    suffixIcon={<DownOutlined />}
                    value={to}
                />

                <Select
                    size="large"
                    bordered={false}
                    value={to.hour()}
                    onChange={handleToHourChange}
                >
                    {hours.map(hour => (
                        <Select.Option
                            key={hour}
                            value={hour}
                        >
                            {hour % 24} Uhr
                        </Select.Option>
                    ))}
                </Select>
            </div>
        </div>
    );
}