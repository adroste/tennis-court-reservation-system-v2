import React, { useCallback, useContext, useState } from 'react';

import { Alert } from 'antd';
import { ReservationCalendar } from './ReservationCalendar';
import { WeekPicker } from './WeekPicker';
import { appContext } from '../AppContext';
import styles from './CalendarPage.module.css';
import { useTime } from './useTime';

export function CalendarPage() {

    const { config: { announcement } } = useContext(appContext);

    const today = useTime('day');
    const [selectedDate, setSelectedDate] = useState(null);

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