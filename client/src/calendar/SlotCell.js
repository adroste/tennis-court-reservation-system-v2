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
    from,
    to,
    rowIndex,
    rows,
    disabled = false,
    loading = false,
    onClick,
    reservation,
}) {
    const { user } = useContext(authContext);

    const handleClick = useCallback(() => {
        if (alwaysClickable || (!disabled && reservation?.type !== RESERVATION_TYPES.DISABLE))
            onClick({ courtId, from, to, reservation });
    }, [alwaysClickable, courtId, from, to, disabled, onClick, reservation]);

    let rowSpan = (to.hour() || 24) - from.hour();
    if (reservation) {
        if (reservation.from.isBefore(from, 'hour') && rowIndex !== 0) {
            rowSpan = 0;
        } else {
            let maxRowSpan = (rows[rows.length - 1].to.hour() || 24) - from.hour();
            if (from.isSame(reservation.to, 'day'))
                rowSpan = Math.min((reservation.to.hour() || 24) - from.hour(), maxRowSpan);
            else
                rowSpan = maxRowSpan;
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
                data-free-text-hover={`${from.hour()} Uhr, ${courtName}`}
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
