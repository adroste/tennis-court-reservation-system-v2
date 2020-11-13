import React from 'react';
import classNames from 'classnames/bind';
import styles from './HoursTable.module.css';

const cn = classNames.bind(styles);

export function HoursTable({
    hours,
    highlightHour,
}) {
    return (
        <div className={styles.hoursTableWrapper}>
            <table className={styles.hoursTable}>
                <tbody>
                    {hours.map(hour => (
                        <tr key={hour} className={cn({ highlight: highlightHour === hour })}>
                            <th>
                                <div className={styles.hour}>
                                    {hour} Uhr<br />
                                    <span className={styles.til}>bis {hour + 1} Uhr</span>
                                </div>
                            </th>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}