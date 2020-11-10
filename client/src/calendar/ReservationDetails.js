import { Button, Input } from 'antd';
import { CalendarOutlined, ClockCircleOutlined, UserOutlined } from '@ant-design/icons';
import React, { useCallback, useMemo, useState } from 'react';

import classNames from 'classnames/bind';
import dayjs from 'dayjs';
import styles from './ReservationDetails.module.css';

const cn = classNames.bind(styles);

const formatVal = 'dd L';

export function ReservationDetails({
    allowEditName = false,
    courtName,
    date,
    groupDates,
    name,
    onNameChange,
    showAllDates = false,
    small,
}) {
    const [editName, setEditName] = useState(false);

    let dateStr = date.format(formatVal);
    if (!showAllDates && groupDates) {
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

    const handleNameChange = useCallback(e => {
        onNameChange(e.target.value);
    }, [onNameChange]);

    const handleEditName = useCallback(() => {
        setEditName(true);
        onNameChange('');
    }, [onNameChange]);

    const handleCancelEditName = useCallback(() => {
        setEditName(false);
        onNameChange(null);
    }, [onNameChange]);

    return (
        <div className={cn({
            details: true,
            small,
        })}>
            <div><CalendarOutlined />&nbsp;&nbsp;{dateStr}</div>
            <div><ClockCircleOutlined />&nbsp;&nbsp;{`${date.format('H')} bis ${date.add(1, 'h').format('H')} Uhr, ${courtName}`}</div>
            <div>
                <UserOutlined />&nbsp;&nbsp;
                {editName ?
                    (
                        <>
                            <Input
                                className={styles.userInput}
                                value={name}
                                onChange={handleNameChange}
                                placeholder="z.B. Training, ..."
                            />
                            <Button type='link' onClick={handleCancelEditName}>abbrechen</Button>
                        </>
                    ) : (
                        <>
                            {name}
                            {allowEditName &&
                                <Button type='link' onClick={handleEditName}>ändern</Button>
                            }
                        </>
                    )
                }
            </div>
            {showAllDates && groupDates?.length &&
                <div className={styles.allDates}>
                    <span>Wiederkehrender Termin:</span>
                    <div className={styles.dateList}>
                        {pastGroupEventsCount > 0 && <span>{pastGroupEventsCount} vergangene Termine</span>}
                        {futureGroupEvents?.map(d => <span key={d}>{d.format(formatVal)}</span>)}
                    </div>
                </div>
            }
        </ div>
    );
}