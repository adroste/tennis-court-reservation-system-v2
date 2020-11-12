import React, { useCallback } from 'react';

import classNames from 'classnames/bind';
import styles from './SlotCell.module.css';

const cn = classNames.bind(styles);

export function SlotCell({
    courtId,
    courtName,
    disabled = false,
    disabledText,
    hour,
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
                enabled: !disabled,
            })}
            onClick={handleClick}
        >
            <div
                className={cn({
                    slot: true,
                    reserved: reservation,
                    disabled,
                    disabledText,
                })}
                data-free-text="Frei"
                data-free-text-hover={`${hour} Uhr, ${courtName}`}
            >
                {!(disabled && disabledText) && reservation && (reservation.customName ?? reservation.name)}
                {disabled && disabledText}
            </div>
        </td>
    );
}
