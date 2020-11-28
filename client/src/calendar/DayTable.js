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

    const dates = useMemo(() => hours.map(h => date.hour(h)), [date, hours]);

    const handleDisableOverlayClick = useCallback(() => setDisableOverlay(true), []);

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
                        className={cn({ blur: showInfoOverlay })}
                    >
                        {dates.map(date => (
                            <SlotCell
                                alwaysClickable={user?.admin}
                                courtId={courtId}
                                courtName={name}
                                date={date}
                                disabled={date.isBefore(now, 'hour')}
                                hours={hours}
                                key={date}
                                loading={loading}
                                onClick={onSlotClick}
                                reservation={findReservation(reservations, date, courtId)}
                            />
                        ))}
                        {user?.admin &&
                            <div className={styles.adminAction}>
                                <Button
                                    type="link"
                                    onClick={() => onDisableCourtClick({ courtId, date })}
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
