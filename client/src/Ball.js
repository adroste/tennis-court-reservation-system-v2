import React from 'react';
import classNames from 'classnames/bind';
import styles from './Ball.module.css';

const cn = classNames.bind(styles);

export function Ball({
    centered,
    large,
    preloader,
    spin,
    visible,
}) {
    return (
        <div className={cn({
            centered,
            preloader,
            spin,
            visible,
            wrapper: true,
        })}>
            <div className={cn({
                ballWrapper: true,
                large,
            })}>
                <div className={styles.ball}>
                </div>
            </div>
        </div>
    )
}