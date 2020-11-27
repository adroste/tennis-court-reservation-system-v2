import React, { useCallback, useContext, useEffect, useMemo, useState } from 'react';

import { Button } from 'antd';
import { SlotCell } from './SlotCell';
import { authContext } from '../AuthContext';
import classNames from 'classnames/bind';
import { findReservation } from '../helper';
import styles from './DayTable.module.css';
import { useTime } from './useTime';

const cn = classNames.bind(styles);

export function DayTable({
    courts,
    date,
    hours,
    loading,
    onDisableCourtClick,
    onSlotClick,
    reservationDaysInAdvance,
    reservations,
}) {
    const { user } = useContext(authContext);
    const [disableOverlay, setDisableOverlay] = useState(false);
    useEffect(() => setDisableOverlay(false), [user]);

    const now = useTime('hour');

    const isToday = useMemo(() => now.isSame(date, 'day'), [date, now]);
    const tooFarAhead = useMemo(() =>
        date.isAfter(now.add(reservationDaysInAdvance, 'day'), 'day'), [date, now, reservationDaysInAdvance]);
    const reservableAsOf = useMemo(() => date.subtract(reservationDaysInAdvance, 'day').format('L'), [date, reservationDaysInAdvance]);

    const showInfoOverlay = !disableOverlay && tooFarAhead;

    const handleDisableOverlayClick = useCallback(() => setDisableOverlay(true), []);

    const renderRowSlots = useCallback((date) => courts.map(({ courtId, name }) => (
        <SlotCell
            alwaysClickable={user?.admin}
            courtId={courtId}
            courtName={name}
            date={date}
            disabled={date.isBefore(now, 'hour')}
            hours={hours}
            key={courtId}
            loading={loading}
            onClick={onSlotClick}
            reservation={findReservation(reservations, date, courtId)}
        />
    )), [user?.admin, courts, hours, loading, now, onSlotClick, reservations]);

    return (
        <div className={styles.wrapper}>
            <table>
                <thead>
                    <tr>
                        <th className={styles.date} colSpan={courts.length}>
                            {isToday && <span className={styles.today}>Heute</span>}
                            {date.format('dd[\xa0]L')}
                        </th>
                    </tr>
                    <tr>
                        {courts.map(({ courtId, name }) => (
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
                            {renderRowSlots(date.hour(hour))}
                        </tr>
                    ))}
                    {user?.admin &&
                        <tr className={styles.adminActions}>
                            {courts.map(({ courtId }) => (
                                <td key={courtId}>
                                    <Button
                                        type="link"
                                        onClick={() => onDisableCourtClick({ courtId, date })}
                                    >
                                        Sperren
                                    </Button>
                                </td>
                            ))}
                        </tr>
                    }
                </tbody>
            </table>

            {showInfoOverlay &&
                <div className={styles.infoOverlay}>
                    <div>Reservierbar<br />ab {reservableAsOf}</div>
                    {user?.admin &&
                        <Button
                            className={styles.linkButton}
                            type="link"
                            onClick={handleDisableOverlayClick}
                        >
                            Trotzdem reservieren<br />(Trainer/Admin)
                        </Button>
                    }
                </div>
            }
        </div>
    );
}
