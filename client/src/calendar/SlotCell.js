import React, { useCallback, useContext } from 'react';

import { RESERVATION_TYPES } from '../ReservationTypes';
import { authContext } from '../AuthContext';
import classNames from 'classnames/bind';
import styles from './SlotCell.module.css';

const cn = classNames.bind(styles);

const SLOT_HEIGHT_PX = 32;
const CELL_PADDING_PX = 3;

export function SlotCell({
    alwaysClickable = false,
    courtId,
    courtName,
    date,
    disabled = false,
    hours,
    loading = false,
    onClick,
    reservation,
}) {
    const { user } = useContext(authContext);

    const handleClick = useCallback(() => {
        if (alwaysClickable || (!disabled && reservation?.type !== RESERVATION_TYPES.DISABLE))
            onClick({ courtId, date, reservation });
    }, [alwaysClickable, courtId, date, disabled, onClick, reservation]);

    let rowSpan = 1;
    if (reservation) {
        if (reservation.from.isBefore(date, 'hour') && date.hour() !== hours[0]) {
            rowSpan = 0;
        } else {
            const maxRowSpan = hours.length - hours.indexOf(date.hour());
            rowSpan = Math.min(reservation.to.diff(date, 'hour'), maxRowSpan);
        }
    }

    if (rowSpan === 0)
        return null;

    return (
        <div
            className={cn({
                alwaysClickable,
                cell: true,
                enabled: !disabled && reservation?.type !== RESERVATION_TYPES.DISABLE,
            })}
            style={{ padding: CELL_PADDING_PX }}
            rowSpan={rowSpan}
            onClick={handleClick}
        >
            <div
                className={cn({
                    slot: true,
                    loading,
                    reserved: reservation?.type === RESERVATION_TYPES.NORMAL,
                    mine: user && user?.userId === reservation?.userId,
                })}
                style={{ height: SLOT_HEIGHT_PX * rowSpan + CELL_PADDING_PX * 2 * (rowSpan - 1) }}
                data-free-text="Frei"
                data-free-text-hover={`${date.hour()} Uhr, ${courtName}`}
            >
                <div className={cn({
                    text: true,
                    singleLine: rowSpan === 1,
                })}>
                    {reservation && (reservation.type === RESERVATION_TYPES.DISABLE ?
                        (
                            <>
                                <div>Gesperrt</div>
                                <div>{reservation.text}</div>
                            </>
                        ) : (
                            <div>{reservation.text || reservation.name}</div>
                        )
                    )}
                </div>
            </div>
        </div>
    );
}
