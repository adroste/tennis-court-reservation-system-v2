import React, { useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';

import { DayTable } from './DayTable';
import { ErrorResult } from '../ErrorResult';
import { HoursTable } from './HoursTable';
import { ReservationModal } from './ReservationModal';
import { UPDATE_INTERVALS_SEC } from '../updateIntervals';
import { appContext } from '../AppContext';
import { getReservationsApi } from '../api';
import styles from './ReservationCalendar.module.css';
import { useApi } from '../useApi';
import { useUpdateEffect } from '../useUpdateEffect';

const VISIBLE_DATES_COUNT = 7; // week

export function ReservationCalendar({
    highlightHour,
    kiosk = false,
    selectedDate,
    today,
}) {
    const { courts, config: { visibleHours, reservationDaysInAdvance } } = useContext(appContext);

    const [selectedSlot, setSelectedSlot] = useState();
    const initialScrollDoneRef = useRef(false);
    const scrollerRef = useRef();

    const [reservations, setReservations] = useState(null);
    const [state, getReservations] = useApi(getReservationsApi, setReservations); 

    const updateReservations = useCallback(() => getReservations({
        query: {
            start: selectedDate.startOf('week').toISOString(),
            end: selectedDate.endOf('week').toISOString(),
        }
    }), [selectedDate, getReservations]);

    useUpdateEffect(updateReservations, UPDATE_INTERVALS_SEC.RESERVATIONS);

    useEffect(() => {
        setReservations(null);
        updateReservations();
    }, [updateReservations]);

    const hours = useMemo(() => {
        const hours = [];
        for (let i = parseInt(visibleHours[0]); i < parseInt(visibleHours[1]); ++i)
            hours.push(i);
        return hours;
    }, [visibleHours]);

    const visibleDates = useMemo(() => Array.from(Array(VISIBLE_DATES_COUNT)).map((_, i) =>
        selectedDate.startOf('week').add(i, 'day') // startOf also sets hours, mins, secs to zero
    ), [selectedDate]);

    // scroll automatically to today's date
    useEffect(() => {
        if (initialScrollDoneRef.current || !scrollerRef.current)
            return;
        if (selectedDate.isSame(today, 'week')) {
            initialScrollDoneRef.current = true;
            const index = Math.abs(today.startOf('week').diff(today, 'day'));
            requestAnimationFrame(() => {
                scrollerRef.current.scrollLeft
                    = ((scrollerRef.current.scrollWidth) / VISIBLE_DATES_COUNT) * index;
            });
        }
    }, [selectedDate, today, reservations]);

    const handleSlotClicked = useCallback(selectedSlot => {
        if (!kiosk)
            setSelectedSlot(selectedSlot);
    }, [kiosk]);

    const handleReservationFinish = useCallback(() => {
        setSelectedSlot(null);
    }, []);

    if (state.error)
        return (
            <div className={styles.tableWrapper}>
                <ErrorResult />
            </div>
        );

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
                            courts={courts}
                            date={date}
                            hours={hours}
                            key={date}
                            loading={!reservations}
                            onSlotClick={handleSlotClicked}
                            reservationDaysInAdvance={reservationDaysInAdvance}
                            reservations={reservations}
                            today={today}
                        />
                    ))}
                </div>
            </div>

            {selectedSlot &&
                <ReservationModal
                    date={selectedSlot?.date}
                    courtId={selectedSlot?.courtId}
                    reservation={selectedSlot?.reservation}
                    today={today}
                    onFinish={handleReservationFinish}
                    setReservations={setReservations}
                />
            }
        </>
    );
}