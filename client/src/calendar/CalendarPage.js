import React, { useCallback, useState } from 'react';

import { ReservationCalendar } from './ReservationCalendar';
import { WeekPicker } from './WeekPicker';
import styles from './CalendarPage.module.css';
import { useTime } from './useTime';

export function CalendarPage() {

    const today = useTime('day');
    const [selectedDate, setSelectedDate] = useState(null);

    const handleWeekChange = useCallback(date => {
        setSelectedDate(date);
    }, []);

    return (
        <div className={styles.wrapper}>
            <WeekPicker
                date={selectedDate || today}
                onChange={handleWeekChange}
            />

            <ReservationCalendar
                selectedDate={selectedDate || today}
            />
        </div>
    );
}