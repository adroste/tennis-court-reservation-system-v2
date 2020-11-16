import React, { useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';

import { DayTable } from './DayTable';
import { HoursTable } from './HoursTable';
import { LoginModal } from '../user/LoginModal';
import { ReservationModal } from './ReservationModal';
import { appContext } from '../AppContext';
import { authContext } from '../AuthContext';
import styles from './ReservationCalendar.module.css';
import { useWeekReservations } from './useReservations';

const visibleDatesCount = 7; // week

export function ReservationCalendar({
    highlightHour,
    kiosk = false,
    selectedDate,
    today,
}) {
    const { user } = useContext(authContext);
    const { courts, config: { visibleHours, reservationDaysInAdvance } } = useContext(appContext);

    const [selectedSlot, setSelectedSlot] = useState();
    const scrollerRef = useRef();

    const reservations = useWeekReservations(selectedDate);

    const hours = useMemo(() => {
        const hours = [];
        for (let i = parseInt(visibleHours[0]); i < parseInt(visibleHours[1]); ++i)
            hours.push(i);
        return hours;
    }, [visibleHours]);

    const visibleDates = useMemo(() => Array.from(Array(visibleDatesCount)).map((_, i) =>
        selectedDate.startOf('week').add(i, 'day')
    ), [selectedDate]);

    // scroll automatically to today's date
    useEffect(() => {
        if (selectedDate.isSame(today, 'week')) {
            const index = Math.abs(today.startOf('week').diff(today, 'day'));
            requestAnimationFrame(() => {
                scrollerRef.current.scrollLeft
                    = ((scrollerRef.current.scrollWidth) / visibleDatesCount) * index;
            });
        }
    }, [selectedDate, today]);

    const handleSlotClicked = useCallback(selectedSlot => {
        if (!kiosk)
            setSelectedSlot(selectedSlot);
    }, [kiosk]);

    const handleReservationFinish = useCallback(() => {
        setSelectedSlot(null);
    }, []);

    return (
        <>
            <div className={styles.tableWrapper}>
                <HoursTable 
                    hours={hours} 
                    highlightHour={highlightHour}
                />

                <div className={styles.tableScroller} ref={scrollerRef}>
                    {visibleDates.map(date => (
                        <DayTable
                            key={date}
                            date={date}
                            today={today}
                            courts={courts}
                            hours={hours}
                            reservations={reservations}
                            onSlotClick={handleSlotClicked}
                            reservationDaysInAdvance={reservationDaysInAdvance}
                        />
                    ))}
                </div>
            </div>

            {selectedSlot && (user ?
                (
                    <ReservationModal
                        date={selectedSlot?.date}
                        courtId={selectedSlot?.courtId}
                        reservation={selectedSlot?.reservation}
                        today={today}
                        onFinish={handleReservationFinish}
                    />
                ) : (
                    <LoginModal 
                        onClose={handleReservationFinish}
                    />
                ))
            }
        </>
    );
}