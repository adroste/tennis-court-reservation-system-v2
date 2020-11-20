import { CalendarOutlined, ClockCircleOutlined, EnvironmentOutlined, RedoOutlined, UserOutlined } from '@ant-design/icons';
import React, { useMemo } from 'react';

import dayjs from 'dayjs';
import styles from './ReservationDetails.module.css';

const formatVal = 'dd[\xa0]L';

export function ReservationDetails({
    courtName,
    date,
    groupDates,
    name,
    repeat,
    showAllDates = false,
    showDateRange = false,
    showFollowUpDate = false,
}) {
    let dateStr = date.format(formatVal);
    if (showDateRange && groupDates) {
        dateStr = groupDates.length ? groupDates[0].format(formatVal) : '-';
        if (groupDates.length > 1)
            dateStr += ` bis ${groupDates[groupDates.length - 1].format(formatVal)}`;
    }

    const pastGroupEventsCount = useMemo(() => {
        const today = dayjs();
        return groupDates?.reduce((count, date) => {
            if (date.isBefore(today, 'day'))
                return count + 1;
            return count;
        }, 0);
    }, [groupDates]);

    const futureGroupEvents = useMemo(() => {
        const today = dayjs();
        return groupDates?.filter(date => !date.isBefore(today, 'day'));
    }, [groupDates]);

    const followUpReservation = useMemo(() => {
        const sorted = [...groupDates];
        sorted.sort((a, b) => a - b);
        return sorted?.find(gd => gd.isAfter(date, 'day'));
    }, [groupDates, date]);

    return (
        <div className={styles.wrapper}>
            <div className={styles.item}>
                <div><CalendarOutlined /></div>
                <div>{dateStr}</div>
            </div>

            <div className={styles.item}>
                <div><ClockCircleOutlined /></div>
                <div>{`${date.format('H')} bis ${date.add(1, 'h').format('H')} Uhr`}</div>
            </div>

            <div className={styles.item}>
                <div><EnvironmentOutlined /></div>
                <div>{courtName}</div>
            </div>

            {name &&
                <div className={styles.item}>
                    <div><UserOutlined /></div>
                    <div>{name}</div>
                </div>
            }
            
            {repeat &&
                <div className={styles.item}>
                    <div><RedoOutlined /></div>
                    <div>{repeat}</div>
                </div>
            }

            {showAllDates && groupDates?.length &&
                <div className={styles.item}>
                    <div><RedoOutlined /></div>
                    <div className={styles.allDates}>
                        <span>Wiederkehrender Termin</span>
                        <div className={styles.dateList}>
                            {pastGroupEventsCount === 1 && <span>Ein vergangener Termin</span>}
                            {pastGroupEventsCount > 1 && <span>{pastGroupEventsCount} vergangene Termine</span>}
                            {futureGroupEvents?.map(d => <span key={d}>{d.format(formatVal)}</span>)}
                        </div>
                    </div>
                </div>
            }

            {showFollowUpDate && followUpReservation &&
                <div className={styles.item}>
                    <div><RedoOutlined /></div>
                    <div className={styles.allDates}>
                        <span>Folgetermin</span>
                        <div className={styles.dateList}>
                            <span>{followUpReservation.format(formatVal)}</span>
                        </div>
                    </div>
                </div>
            }
        </ div>
    );
}