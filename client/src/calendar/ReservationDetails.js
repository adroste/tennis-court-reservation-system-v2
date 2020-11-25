import { CalendarOutlined, ClockCircleOutlined, EnvironmentOutlined, RedoOutlined, UserOutlined } from '@ant-design/icons';

import React from 'react';
import classNames from 'classnames/bind';
import styles from './ReservationDetails.module.css';

const cn = classNames.bind(styles);

export function ReservationDetails({
    court,
    date,
    inline = false,
    name,
    repeat,
    time,
}) {
    return (
        <div className={cn({
            wrapper: true,
            inline
        })}>
            {name &&
                <div className={styles.item}>
                    <div className={styles.title}>
                        <UserOutlined />&nbsp;Name
                    </div>
                    <div className={styles.content}>
                        {name}
                    </div>
                </div>
            }

            {date && 
                <div className={styles.item}>
                    <div className={styles.title}>
                        <CalendarOutlined />&nbsp;Datum
                    </div>
                    <div className={styles.content}>
                        {date}
                    </div>
                </div>
            }

            {time &&
                <div className={styles.item}>
                    <div className={styles.title}>
                        <ClockCircleOutlined />&nbsp;Uhrzeit
                    </div>
                    <div className={styles.content}>
                        {time}
                    </div>
                </div>
            }

            {court &&
                <div className={styles.item}>
                    <div className={styles.title}>
                        <EnvironmentOutlined />&nbsp;Platz
                    </div>
                    <div className={styles.content}>
                        {court}
                    </div>
                </div>
            }

            {repeat &&
                <div className={styles.item}>
                    <div className={styles.title}>
                        <RedoOutlined />&nbsp;Wiederholung
                    </div>
                    <div className={styles.content}>
                        {repeat}
                    </div>
                </div>
            }
        </ div>
    );
}