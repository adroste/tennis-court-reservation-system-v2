import React, { useCallback } from 'react';

import classNames from 'classnames/bind';
import styles from './SlotCell.module.css';

const cn = classNames.bind(styles);

export function SlotCell({
    courtId,
    courtName,
    disabled = false,
    hour,
    inPast,
    onClick,
    reservation,
}) {
    const handleClick = useCallback(() => {
        if (!disabled)
            onClick({ courtId, hour, reservation });
    }, [courtId, disabled, hour, onClick, reservation]);

    return (
        <td
            className={cn({
                cell: true,
                enabled: !disabled && !inPast,
            })}
            onClick={handleClick}
        >
            <div
                className={cn({
                    slot: true,
                    reserved: reservation,
                    free: !reservation,
                    disabled,
                })}
                data-disabled-text="Gesperrt"
                data-free-text="Frei"
                data-free-text-hover={`${hour} Uhr, ${courtName}`}
            >
                {!disabled && reservation && (reservation.customName ?? reservation.name)}
            </div>
        </td>
    );
}
