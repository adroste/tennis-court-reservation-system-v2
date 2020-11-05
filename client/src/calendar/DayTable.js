import React, { useCallback } from 'react';

import { SlotCell } from './SlotCell';
import { findReservation } from './helper';
import styles from './DayTable.module.css';

export function DayTable({
    courts,
    date,
    onSlotClick,
    reservations,
    isToday,
    visibleHours,
}) {
    const handleClick = useCallback(({ court, hour, reservation }) => {
        onSlotClick({ 
            court, 
            date: date.hour(hour), 
            reservation,
        });
    }, [date, onSlotClick]);

    return (
        <div className={styles.wrapper}>
            <table>
                <thead>
                    <tr>
                        <th className={styles.date} colSpan={courts.length}>
                            {isToday && <span className={styles.today}>Heute</span>}
                            {date.format('dd l')}
                        </th>
                    </tr>
                    <tr>
                        {courts.map(court => (
                            <td key={court}>
                                <div className={styles.court}>
                                    {court}
                                </div>
                            </td>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {visibleHours.map(hour => (
                        <tr key={hour}>
                            {courts.map(court => (
                                <SlotCell 
                                    key={court}
                                    court={court}
                                    hour={hour}
                                    onClick={handleClick}
                                    reservation={findReservation(reservations, date.hour(hour), court)} 
                                />
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
