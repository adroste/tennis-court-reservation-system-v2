import React, { useEffect, useRef } from 'react';

import { DayTable } from './DayTable';
import { HoursTable } from './HoursTable';
import { WeekPicker } from './WeekPicker';
import dayjs from 'dayjs';
import styles from './ReservationCalendar.module.css';

export function ReservationCalendar() {

    const scrollerRef = useRef();

    const reservations = [
        ['2020-10-24', 'Platz 1', 13, 'Müller'],
        ['2020-10-24', 'Platz 2', 13, 'Peter Jacob'],
        ['2020-10-25', 'Platz 1', 13, 'Müller Gustagv Petersen'],
        ['2020-10-20', 'Platz 1', 8, 'Müller Gustagv Petersen'],
        ['2020-10-20', 'Platz 1', 10, 'Müller Gustagv Petersen franz dieter franx'],
        ['2020-10-20', 'Platz 1', 18, 'Vera Berger'],
        ['2020-10-20', 'Platz 2', 18, 'Christian15lww'],
    ];


    const courts = ['Platz 1', 'Platz 2', 'Platz 3asfdasdfasdfasdf'];
    // const courts = ['Platz 1', 'Platz 2', 'Platz 3', 'Platz 4'];
    // const courts = ['Platz 1', 'Platz 2'];

    const fromTilHours = [8, 22];
    const visibleHours = [];
    for (let i = fromTilHours[0]; i < fromTilHours[1]; ++i)
        visibleHours.push(i);

    const visibleDatesCount = 7;
    const focusedDateIndex = 0;
    const selectedDate = dayjs('2020-10-19');
    const visibleDates = [];
    for (let i = 0; i < visibleDatesCount; ++i) {
        visibleDates.push(selectedDate.add(i, 'day'));
    }

    useEffect(() => {
        if (focusedDateIndex)
            scrollerRef.current.scrollLeft 
                = ((scrollerRef.current.scrollWidth) / visibleDatesCount) * focusedDateIndex;
    }, [focusedDateIndex, visibleDatesCount]);

    return (
        <div className={styles.wrapper}>
            <WeekPicker 
                date={selectedDate}
            />

            <div className={styles.tableWrapper}>
                <HoursTable visibleHours={visibleHours} />

                <div className={styles.tableScroller} ref={scrollerRef}>
                    {visibleDates.map(date => (
                        <DayTable
                            key={date}
                            date={date}
                            courts={courts}
                            visibleHours={visibleHours}
                            reservations={reservations}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}