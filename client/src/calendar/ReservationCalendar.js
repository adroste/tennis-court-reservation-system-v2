import React, { useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';

import { DayTable } from './DayTable';
import { HoursTable } from './HoursTable';
import { ReservationModal } from './ReservationModal';
import { appContext } from '../AppContext';
import { authContext } from '../AuthContext';
import styles from './ReservationCalendar.module.css';
import { useHistory } from 'react-router-dom';
import { useWeekReservations } from './useReservations';

const visibleDatesCount = 7; // week

export function ReservationCalendar({
    selectedDate,
    today,
}) {
    const { user } = useContext(authContext);
    const { courts, visibleHours } = useContext(appContext);
    const history = useHistory();

    const [selectedSlot, setSelectedSlot] = useState();
    const scrollerRef = useRef();

    const reservations = useWeekReservations(selectedDate);

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
        if (user)
            setSelectedSlot(selectedSlot);
        else 
            history.replace('/login');
    }, [user]);

    const handleReservationFinish = useCallback(() => {
        setSelectedSlot(null);
    }, []);

    return (
        <>
            <div className={styles.tableWrapper}>
                <HoursTable visibleHours={visibleHours} />

                <div className={styles.tableScroller} ref={scrollerRef}>
                    {visibleDates.map(date => (
                        <DayTable
                            key={date}
                            date={date}
                            today={today}
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
                    courtId={selectedSlot?.courtId}
                    reservation={selectedSlot?.reservation}
                    onFinish={handleReservationFinish}
                />
            }
        </>
    );
}