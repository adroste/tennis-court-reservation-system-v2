import React, { useCallback, useContext, useEffect, useState } from 'react';

import { Alert } from 'antd';
import { ReservationCalendar } from './ReservationCalendar';
import { WeekPicker } from './WeekPicker';
import { appContext } from '../AppContext';
import dayjs from 'dayjs';
import styles from './CalendarPage.module.css';

const checkTodayChangeIntervalMs = 6000; // minute

export function CalendarPage() {

    const { announcement, courts } = useContext(appContext);

    const [today, setToday] = useState(dayjs());
    const [selectedDate, setSelectedDate] = useState(dayjs());

    // check peridically if today's date changed
    useEffect(() => {
        const todayCheckInterval = setInterval(() => {
            const newToday = dayjs();
            if (!today.isSame(newToday, 'day')) {
                setToday(newToday);
                if (selectedDate.isSame(today, 'week'))
                    setSelectedDate(newToday);
            }
        }, checkTodayChangeIntervalMs);

        return () => clearInterval(todayCheckInterval);
    }, [selectedDate, today]);

    const handleWeekChange = useCallback(date => {
        setSelectedDate(date);
    }, []);

    return (
        <div className={styles.wrapper}>

            {announcement &&
                <div className={styles.alert}>
                    <Alert
                        message={announcement}
                        type="info"
                        showIcon
                    />
                </div>
            }

            {courts.map(({ courtId, name, disabledFrom, disabledTil, disabledReason }) => (
                disabledFrom && (
                    <div key={courtId} className={styles.alert}>
                        <Alert
                            message={`${name} ist gesperrt ab ${disabledFrom.format('dd L')}${disabledTil ? disabledTil.format('[ bis] dd L') : ''}${disabledReason ? `: ${disabledReason}` : ''}`}
                            type="warning"
                            showIcon
                        />
                    </div>
                )
            ))}

            <WeekPicker
                date={selectedDate}
                onChange={handleWeekChange}
            />

            <ReservationCalendar
                selectedDate={selectedDate}
                today={today}
            />
        </div>
    );
}