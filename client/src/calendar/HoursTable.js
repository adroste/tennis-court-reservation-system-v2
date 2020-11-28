import React from 'react';
import classNames from 'classnames/bind';
import styles from './HoursTable.module.css';
import { useTime } from './useTime';

const cn = classNames.bind(styles);

export function HoursTable({
    hours,
    highlightHour,
}) {
    const now = useTime('hour');

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