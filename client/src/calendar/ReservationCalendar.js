import React, { useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';

import { DayTable } from './DayTable';
import { ErrorResult } from '../ErrorResult';
import { HoursTable } from './HoursTable';
import { RESERVATION_TYPES } from '../ReservationTypes';
import { ReservationModal } from './ReservationModal';
import { UPDATE_INTERVALS_SEC } from '../updateIntervals';
import { appContext } from '../AppContext';
import { getReservationsApi } from '../api';
import styles from './ReservationCalendar.module.css';
import { useApi } from '../useApi';
import { useTime } from './useTime';
import { useUpdateEffect } from '../useUpdateEffect';

const VISIBLE_DATES_COUNT = 7; // week

export function ReservationCalendar({
    kiosk = false,
    selectedDate,
}) {
    const { courts, config: { reservationDaysInAdvance } } = useContext(appContext);

    const today = useTime('day');

    const [selectedSlot, setSelectedSlot] = useState();
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

    const visibleDates = useMemo(() => Array.from(Array(VISIBLE_DATES_COUNT)).map((_, i) =>
        selectedDate.startOf('week').add(i, 'day') // startOf also sets hours, mins, secs to zero
    ), [selectedDate]);

    // scroll automatically to today's date
    useEffect(() => {
        if (!scrollerRef.current)
            return;
        if (selectedDate.isSame(today, 'week')) {
            const index = Math.abs(today.startOf('week').diff(today, 'day'));
            requestAnimationFrame(() => {
                scrollerRef.current.scrollLeft
                    = ((scrollerRef.current.scrollWidth) / VISIBLE_DATES_COUNT) * index;
            });
        } else {
            requestAnimationFrame(() => {
                scrollerRef.current.scrollLeft = 0;
            });
        }
    }, [selectedDate, today]);

    const handleSlotClicked = useCallback(selectedSlot => {
        if (!kiosk)
            setSelectedSlot(selectedSlot);
    }, [kiosk]);

    const handleDisableCourtClicked = useCallback(selectedSlot => {
        setSelectedSlot({ 
            ...selectedSlot,
            type: RESERVATION_TYPES.DISABLE,
        });
    }, []);

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
        <div className={styles.wrapper}>
            <div className={styles.tableWrapper}>
                <HoursTable
                    highlightHour={selectedDate.isSame(today, 'week')}
                />

                <div className={styles.tableScroller} ref={scrollerRef}>
                    {visibleDates.map(date => (
                        <DayTable
                            courts={courts}
                            date={date}
                            key={date}
                            loading={!reservations}
                            onDisableCourtClick={handleDisableCourtClicked}
                            onSlotClick={handleSlotClicked}
                            reservationDaysInAdvance={reservationDaysInAdvance}
                            reservations={reservations}
                        />
                    ))}
                </div>
            </div>

            {selectedSlot &&
                <ReservationModal
                    initialCourtId={selectedSlot?.courtId}
                    initialFrom={selectedSlot?.from}
                    initialTo={selectedSlot?.to}
                    reservation={selectedSlot?.reservation}
                    type={selectedSlot?.type}
                    onFinish={handleReservationFinish}
                    setReservations={setReservations}
                />
            }
        </div>
    );
}