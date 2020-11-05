import React, { useCallback } from 'react';

import classNames from 'classnames/bind';
import styles from './SlotCell.module.css';

const cn = classNames.bind(styles);

export function SlotCell({
    court,
    hour,
    onClick,
    reservation,
}) {
    const handleClick = useCallback(() => {
        onClick({ court, hour, reservation });
    }, [court, hour, onClick, reservation]);

    return (
        <td
            className={cn('cell')}
            onClick={handleClick}
        >
            <div
                className={cn({
                    slot: true,
                    reserved: reservation,
                    free: !reservation,
                })}
                data-free-text="Frei"
                data-free-text-hover={`${hour} Uhr, ${court}`}
            >
                {reservation && (reservation.customName ?? reservation.name)}
            </div>
        </td>
    );
}
