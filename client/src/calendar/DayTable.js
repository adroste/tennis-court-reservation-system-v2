import React, { useCallback, useMemo } from 'react';

import { SlotCell } from './SlotCell';
import { findReservation } from './helper';
import styles from './DayTable.module.css';

export function DayTable({
    courts,
    date,
    onSlotClick,
    reservations,
    today,
    visibleHours,
}) {
    const isToday = today.isSame(date, 'day');
    const inPast = date.isBefore(today, 'day');

    const courtsToday = useMemo(() => courts.map(({ courtId, name, disabledFrom, disabledTil }) => ({
        courtId,
        name,
        disabled: disabledFrom ?
            (
                disabledTil 
                    ? date.isBetween(disabledFrom, disabledTil, 'day', '[]')
                    : date.isSameOrAfter(disabledFrom, 'day')
            ) : false,
    })), [courts, date]);

    const handleClick = useCallback(({ courtId, hour, reservation }) => {
        onSlotClick({
            courtId,
            date: date.hour(hour),
            reservation,
        });
    }, [date, onSlotClick]);

    return (
        <div className={styles.wrapper}>
            <table>
                <thead>
                    <tr>
                        <th className={styles.date} colSpan={courtsToday.length}>
                            {isToday && <span className={styles.today}>Heute</span>}
                            {date.format('dd l')}
                        </th>
                    </tr>
                    <tr>
                        {courtsToday.map(({ courtId, name }) => (
                            <td key={courtId}>
                                <div className={styles.court}>
                                    {name}
                                </div>
                            </td>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {visibleHours.map(hour => (
                        <tr key={hour}>
                            {courtsToday.map(({ courtId, name, disabled }) => (
                                <SlotCell
                                    key={courtId}
                                    courtId={courtId}
                                    courtName={name}
                                    inPast={inPast}
                                    hour={hour}
                                    disabled={disabled}
                                    onClick={handleClick}
                                    reservation={findReservation(reservations, date.hour(hour), courtId)}
                                />
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
