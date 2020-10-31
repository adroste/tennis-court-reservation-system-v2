import React from 'react';
import classNames from 'classnames/bind';
import styles from './DayTable.module.css';

const cn = classNames.bind(styles);

function getReservation(reservations, date, court, hour) {
    for (let [curDateStr, curCourt, curHour, name] of reservations)
        if (date.isSame(curDateStr) && court === curCourt && hour === curHour)
            return name;
}

export function DayTable({
    date,
    courts,
    visibleHours,
    reservations,
}) {
    return (
        <div className={cn('dayTableWrapper')}>
            <table className={cn('dayTable')}>
                <thead>
                    <tr>
                        <th colSpan={courts.length}>
                            {date.format('dd D')}
                        </th>
                    </tr>
                    <tr>
                        {courts.map(court => (
                            <td>
                                <div className={cn('court')}>
                                    {court}
                                </div>
                            </td>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {visibleHours.map(hour => (
                        <tr className={styles.bodyRow}>
                            {courts.map(court => {
                                const reservedBy = getReservation(reservations, date, court, hour);
                                return (
                                    <td className={cn('timeCell')}>
                                        <div className={cn({
                                            slot: true,
                                            reserved: reservedBy,
                                            free: !reservedBy,
                                        })}
                                            data-text="Frei"
                                            data-text-hover={`${hour} Uhr, ${court}`}
                                        >
                                            <span>{reservedBy}</span>
                                        </div>
                                    </td>
                                );
                            })}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
