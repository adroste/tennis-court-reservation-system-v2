import React, { useCallback, useContext, useEffect, useMemo, useState } from 'react';

import { Button } from 'antd';
import { SlotCell } from './SlotCell';
import { authContext } from '../AuthContext';
import classNames from 'classnames/bind';
import { findReservation } from '../helper';
import styles from './DayTable.module.css';

const cn = classNames.bind(styles);

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
    const [adminOverride, setAdminOverride] = useState(false);
    useEffect(() => setAdminOverride(false), [user?.admin]);

    const isToday = useMemo(() => today.isSame(date, 'day'), [date, today]);
    const inPast = useMemo(() => date.isBefore(today, 'day'), [date, today]);
    const tooFarAhead = useMemo(() =>
        date.isAfter(today.add(reservationDaysInAdvance, 'day'), 'day'), [date, today, reservationDaysInAdvance]);
    const reservableAsOf = useMemo(() => date.subtract(reservationDaysInAdvance, 'day').format('L'), [date, reservationDaysInAdvance]);


    const courtsToday = useMemo(() => courts.map(({ courtId, name, disabled, disabledFromTil }) => {
        const manuallyDisabled = disabled && date.isBetween(disabledFromTil[0], disabledFromTil[1], 'day', '[]');
        return {
            courtId,
            name,
            disabled: manuallyDisabled || (!adminOverride && (inPast || tooFarAhead)),
            disabledText: manuallyDisabled ? 'Gesperrt' : null,
        };
    }), [adminOverride, courts, date, inPast, tooFarAhead]);

    const showInfoOverlay = !adminOverride && tooFarAhead;

    const handleClick = useCallback(({ courtId, hour, reservation }) => {
        onSlotClick({
            courtId,
            date: date.hour(hour),
            reservation,
        });
    }, [date, onSlotClick]);

    const handleAdminOverrideClick = useCallback(() => {
        setAdminOverride(true)
    }, []);

    const renderRowSlots = (hour) => courtsToday.map(({ courtId, name, disabled, disabledText }) => (
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
    ));

    return (
        <div className={styles.wrapper}>
            <table>
                <thead>
                    <tr>
                        <th className={styles.date} colSpan={courtsToday.length}>
                            {isToday && <span className={styles.today}>Heute</span>}
                            {date.format('dd L')}
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
                <tbody
                    className={cn({
                        blur: showInfoOverlay
                    })}
                >
                    {hours.map(hour => (
                        <tr key={hour}>
                            {renderRowSlots(hour)}
                        </tr>
                    ))}
                </tbody>
            </table>
            {showInfoOverlay &&
                <div className={styles.infoOverlay}>
                    {inPast && <div>Bereits Vergangen</div>}
                    {tooFarAhead && <div>Reservierbar<br />ab {reservableAsOf}</div>}
                    {user?.admin &&
                        <Button
                            className={styles.linkButton}
                            type="link"
                            onClick={handleAdminOverrideClick}
                        >
                            Trotzdem reservieren<br />(Nur Admin)
                        </Button>
                    }
                </div>
            }
        </div>
    );
}
