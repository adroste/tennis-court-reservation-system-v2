import React, { useCallback, useContext, useMemo } from 'react';
import { Select, Space } from 'antd';

import { appContext } from '../AppContext';
import { visibleHoursToHoursArray } from '../helper';

export function ReservationTimeSelect({
    disabled = false,
    from,
    to,
    onFromChange,
    onToChange,
}) {
    const { config: { visibleHours } } = useContext(appContext);

    const hours = useMemo(() => visibleHoursToHoursArray(visibleHours), [visibleHours]);

    const toHours = useMemo(() => hours.reduce((toHours, h) => {
        if (h >= from.hour())
            toHours.push(h + 1);
        return toHours;
    }, []), [from, hours]);

    const handleFromChange = useCallback(newFromHour => {
        const diff = Math.abs(to.diff(from, 'hour'));
        let newToHour = newFromHour + diff;
        if (!hours.includes(newToHour))
            newToHour = hours[hours.length - 1] + 1;
        onFromChange(from.hour(newFromHour));
        onToChange(to.hour(newToHour));
    }, [from, to, onFromChange, onToChange, hours]);

    const handleToChange = useCallback(newToHour => {
        onToChange(to.hour(newToHour));
    }, [to, onToChange]);

    return (
        <Space direction="horizontal" size="middle">
            <Select
                bordered={false}
                disabled={disabled}
                onChange={handleFromChange}
                size="large"
                value={from.hour()}
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

            <span>bis</span>

            <Select
                bordered={false}
                disabled={disabled}
                onChange={handleToChange}
                size="large"
                value={to.hour()}
            >
                {toHours.map(hour => (
                    <Select.Option
                        key={hour}
                        value={hour}
                    >
                        {hour % 24} Uhr
                    </Select.Option>
                ))}
            </Select>
        </Space>
    );
}