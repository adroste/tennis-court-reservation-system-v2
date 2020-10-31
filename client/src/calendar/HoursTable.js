import React from 'react';
import styles from './HoursTable.module.css';

export function HoursTable({
    visibleHours,
}) {
    return (
        <div className={styles.hoursTableWrapper}>
            <table className={styles.hoursTable}>
                {visibleHours.map(hour => (
                    <tr>
                        <th>
                            <div className={styles.hour}>
                                {hour} Uhr<br />
                                <span className={styles.til}>bis {hour + 1} Uhr</span>
                            </div>
                        </th>
                    </tr>
                ))}
            </table>
        </div>
    );
}