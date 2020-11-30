import React, { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { findReservation, visibleHoursToLocalizedHourRange } from '../helper';

import { Button } from 'antd';
import { SlotCell } from './SlotCell';
import { appContext } from '../AppContext';
import { authContext } from '../AuthContext';
import classNames from 'classnames/bind';
import styles from './DayTable.module.css';
import { useTime } from './useTime';

const cn = classNames.bind(styles);

export function DayTable({
    courts,
    date,
    loading,
    onDisableCourtClick,
    onSlotClick,
    reservationDaysInAdvance,
    reservations,
}) {
    const { config: { visibleHours } } = useContext(appContext);
    const { user } = useContext(authContext);
    const [disableOverlay, setDisableOverlay] = useState(false);
    useEffect(() => setDisableOverlay(false), [user]);

    const now = useTime('hour');

    const isToday = useMemo(() => now.isSame(date, 'day'), [date, now]);
    const tooFarAhead = useMemo(() =>
        date.isAfter(now.add(reservationDaysInAdvance, 'day'), 'day'), [date, now, reservationDaysInAdvance]);
    const reservableAsOf = useMemo(() => date.subtract(reservationDaysInAdvance, 'day').format('L'), [date, reservationDaysInAdvance]);

    const showInfoOverlay = !disableOverlay && tooFarAhead;

    const rows = useMemo(() => (
        visibleHoursToLocalizedHourRange(date, visibleHours)
    ), [date, visibleHours]);

    const handleDisableOverlayClick = useCallback(() => setDisableOverlay(true), []);

    const handleDisableCourtClick = (courtId) => {
        onDisableCourtClick({
            courtId,
            from: date.hour(0),
            to: date.hour(24),
        });
    };

    return (
        <div className={styles.wrapper}>
            <div className={styles.date}>
                {isToday && <span className={styles.today}>Heute</span>}
                {date.format('dd[\xa0]L')}
            </div>

            <div className={styles.cols}>
                {courts.map(({ courtId, name }) => (
                    <div key={courtId} className={styles.court}>
                        {name}
                    </div>
                ))}
            </div>

            <div className={cn('body', 'cols')}>
                {courts.map(({ courtId, name }) => (
                    <div
                        key={courtId}
                        className={cn({ 
                            col: true,
                            blur: showInfoOverlay 
                        })}
                    >
                        {rows.map(({ from, to, span }, i) => (
                            <SlotCell
                                alwaysClickable={user?.admin}
                                courtId={courtId}
                                courtName={name}
                                rowIndex={i}
                                rows={rows}
                                from={from}
                                to={to}
                                baseRowSpan={span}
                                disabled={from.isBefore(now, 'hour')}
                                key={from}
                                loading={loading}
                                onClick={onSlotClick}
                                reservation={findReservation(reservations, from, to, courtId)}
                            />
                        ))}
                        {user?.admin &&
                            <div className={styles.adminAction}>
                                <Button
                                    type="link"
                                    onClick={() => handleDisableCourtClick(courtId)}
                                >
                                    Sperren
                                </Button>
                            </div>
                        }
                    </div>
                ))}

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
        </div>
    );
}
