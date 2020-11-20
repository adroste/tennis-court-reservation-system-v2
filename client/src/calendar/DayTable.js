import React, { useCallback, useContext, useMemo } from 'react';

import { SlotCell } from './SlotCell';
import { authContext } from '../AuthContext';
import { findReservation } from '../helper';
import styles from './DayTable.module.css';

export function DayTable({
    courts,
    date,
    hours,
    loading,
    onSlotClick,
    reservationDaysInAdvance,
    reservations,
    today,
}) {
    const { user } = useContext(authContext);
    const isToday = useMemo(() => today.isSame(date, 'day'), [date, today]);
    const inPast = useMemo(() => date.isBefore(today, 'day'), [date, today]);
    const tooFarAhead = useMemo(() => 
        date.isAfter(today.add(reservationDaysInAdvance, 'day'), 'day'), [date, reservationDaysInAdvance, today]);

    const courtsToday = useMemo(() => courts.map(({ courtId, name, disabled, disabledFromTil }) => {
        const manuallyDisabled = disabled && date.isBetween(disabledFromTil[0], disabledFromTil[1], 'day', '[]');
        return {
            courtId,
            name,
            disabled: manuallyDisabled || (!user?.admin && (inPast || tooFarAhead)),
            disabledText: manuallyDisabled ? 'Gesperrt' : null,
        };
    }), [user?.admin, courts, date, inPast, tooFarAhead]);

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
                    {hours.map(hour => (
                        <tr key={hour}>
                            {courtsToday.map(({ courtId, name, disabled, disabledText }) => (
                                <SlotCell
                                    courtId={courtId}
                                    courtName={name}
                                    disabled={disabled}
                                    disabledText={disabledText}
                                    hour={hour}
                                    key={courtId}
                                    loading={loading}
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
