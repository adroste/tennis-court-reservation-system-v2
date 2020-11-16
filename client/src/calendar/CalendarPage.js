import React, { useCallback, useContext, useState } from 'react';

import { Alert } from 'antd';
import { ReservationCalendar } from './ReservationCalendar';
import { WeekPicker } from './WeekPicker';
import { appContext } from '../AppContext';
import styles from './CalendarPage.module.css';
import { useTime } from './useTime';

export function CalendarPage() {

    const { config: { announcement }, courts } = useContext(appContext);

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

            {courts.map(({ courtId, name, disabled, disabledFromTil, disabledReason }) => (
                disabled && (
                    <div key={courtId} className={styles.alert}>
                        <Alert
                            message={`${name} ist gesperrt ab ${disabledFromTil[0].format('dd L')}${disabledFromTil[1] ? disabledFromTil[1].format('[ bis] dd L') : ''}${disabledReason ? `: ${disabledReason}` : ''}`}
                            type="warning"
                            showIcon
                        />
                    </div>
                )
            ))}

            <WeekPicker
                date={selectedDate || today}
                onChange={handleWeekChange}
            />

            <ReservationCalendar
                selectedDate={selectedDate || today}
                today={today}
            />
        </div>
    );
}