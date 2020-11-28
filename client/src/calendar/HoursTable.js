import React, { useContext, useMemo } from 'react';

import { appContext } from '../AppContext';
import classNames from 'classnames/bind';
import styles from './HoursTable.module.css';
import { useTime } from './useTime';
import { visibleHoursToHoursArray } from '../helper';

const cn = classNames.bind(styles);

export function HoursTable({
    highlightHour,
}) {
    const { config: { visibleHours } } = useContext(appContext);

    const now = useTime('hour');

    const hours = useMemo(() => visibleHoursToHoursArray(visibleHours), [visibleHours]);

    return (
        <div className={styles.wrapper}>
            {hours.map(hour => (
                <div 
                    key={hour} 
                    className={cn({ 
                        hour: true,
                        highlight: highlightHour && now.hour() === hour
                    })}
                >
                    {hour} Uhr<br />
                    <span className={styles.to}>bis {(hour + 1) % 24} Uhr</span>
                </div>
            ))}
        </div>
    );
}