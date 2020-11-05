import React, { useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';

import { DayTable } from './DayTable';
import { HoursTable } from './HoursTable';
import { ReservationModal } from './ReservationModal';
import { WeekPicker } from './WeekPicker';
import { appContext } from '../AppContext';
import dayjs from 'dayjs';
import styles from './ReservationCalendar.module.css';
import { useWeekReservations } from './useReservations';

const visibleDatesCount = 7; // week
const checkTodayChangeIntervalMs = 60000; // minute

export function ReservationCalendar() {

    const { courts, visibleHours } = useContext(appContext);

    const [selectedDate, setSelectedDate] = useState(dayjs());
    const [selectedSlot, setSelectedSlot] = useState();
    const scrollerRef = useRef();

    const reservations = useWeekReservations(selectedDate);

    const visibleDates = useMemo(() => Array.from(Array(visibleDatesCount)).map((_, i) => 
        selectedDate.startOf('week').add(i, 'day')
    ), [selectedDate]);

    useEffect(() => {
        let interval;

        const today = dayjs();
        if (selectedDate.isSame(today, 'week')) {
            const index = Math.abs(selectedDate.startOf('week').diff(today, 'day'));
            // scroll automatically to today's date
            requestAnimationFrame(() => {
                scrollerRef.current.scrollLeft
                    = ((scrollerRef.current.scrollWidth) / visibleDatesCount) * index;
            });
            
            // check peridically if today's date change
            interval = setInterval(() => {
                const newToday = dayjs();
                if (!selectedDate.isSame(newToday, 'day'))
                    setSelectedDate(newToday);
            }, checkTodayChangeIntervalMs);
        }

        return () => clearInterval(interval);
    }, [selectedDate]);

    const handleSlotClicked = useCallback(selectedSlot => {
        setSelectedSlot(selectedSlot);
    }, []);

    const handleReservationFinish = useCallback(() => {
        setSelectedSlot(null);
    }, []);

    const handleWeekChange = useCallback(date => {
        setSelectedDate(date);
    }, []);

    return (
        <div className={styles.wrapper}>
            <WeekPicker
                date={selectedDate}
                onChange={handleWeekChange}
            />

            <div className={styles.tableWrapper}>
                <HoursTable visibleHours={visibleHours} />

                <div className={styles.tableScroller} ref={scrollerRef}>
                    {visibleDates.map(date => (
                        <DayTable
                            key={date}
                            date={date}
                            isToday={date.isSame(dayjs(), 'day')}
                            courts={courts}
                            visibleHours={visibleHours}
                            reservations={reservations}
                            onSlotClick={handleSlotClicked}
                        />
                    ))}
                </div>
            </div>

            {selectedSlot &&
                <ReservationModal
                    date={selectedSlot?.date}
                    court={selectedSlot?.court}
                    reservation={selectedSlot?.reservation}
                    onFinish={handleReservationFinish}
                />
            }
        </div>
    );
}