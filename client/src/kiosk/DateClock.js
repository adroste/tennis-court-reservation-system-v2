import React, { useEffect, useState } from 'react';

import dayjs from 'dayjs';
import styles from './DateClock.module.css';

const UPDATE_INTERVAL_MS = 5000;

export function DateClock() {

    const [dateTime, setDateTime] = useState(() => dayjs());

    useEffect(() => {
        const int = setInterval(() => {
            setDateTime(dayjs());
        }, UPDATE_INTERVAL_MS)
        return () => clearInterval(int);
    }, []);

    return (
        <div className={styles.wrapper}>
            <div className={styles.time}>
                {dateTime.format('HH')}<span className={styles.clockDots}>:</span>{dateTime.format('mm')} Uhr
            </div>
            <div className={styles.date}>
                {dateTime.format('dddd LL')}
            </div>
        </div>
    );
}