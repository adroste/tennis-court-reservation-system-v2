import React from 'react';
import classNames from 'classnames/bind';
import styles from './Ball.module.css';

const cn = classNames.bind(styles);

export function Ball({
    size,
    preloader,
    visible,
    spin,
}) {
    return (
        <div className={cn({
            wrapper: true,
            visible,
            preloader,
            spin,
        })}>
            <div className={styles.ballWrapper}>
                <div className={styles.ball}>
                </div>
            </div>
        </div>
    )
}