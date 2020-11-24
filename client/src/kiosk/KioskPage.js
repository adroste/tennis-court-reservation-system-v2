import React, { useContext, useEffect } from 'react';
import { UPDATE_INTERVALS_SEC, setDefaultUpdateIntervals } from '../updateIntervals';

import { Alert } from 'antd';
import { DateClock } from './DateClock';
import { ReservationCalendar } from '../calendar/ReservationCalendar';
import { SystemLinkQr } from './SystemLinkQr';
import { appContext } from '../AppContext';
import { parseQuery } from '../helper';
import styles from './KioskPage.module.css';
import { useLocation } from 'react-router-dom';
import { useTime } from '../calendar/useTime';

export function KioskPage() {

    const { config: { announcement, orgName } } = useContext(appContext);

    const hour = useTime('hour');
    const { search } = useLocation();

    useEffect(() => {
        const params = parseQuery(search);
        let updateInterval = 60; // 1 minute, default value
        try {
            if (params['update'])
                updateInterval = parseInt(params['update']);
        } catch (e) { console.error(e); }

        UPDATE_INTERVALS_SEC.RESERVATIONS = updateInterval;
        UPDATE_INTERVALS_SEC.BASE_DATA = updateInterval * 10;
        return setDefaultUpdateIntervals;
    }, [search]);

    return (
        <div className={styles.wrapper}>

            <div className={styles.top}>

                <div className={styles.title}>
                    <div className={styles.orgName}>
                        {orgName}
                    </div>
                    <div className={styles.subTitle}>
                        Reservierungssystem
                    </div>
                </div>
                
                <DateClock />

                <div className={styles.linkQr}>
                    <SystemLinkQr 
                        bgColor="#f0f2f5"
                    />
                </div>

            </div>

            {announcement &&
                <div className={styles.alert}>
                    <Alert
                        message={announcement}
                        type="info"
                        showIcon
                    />
                </div>
            }

            <ReservationCalendar
                highlightHour={hour.hour()}
                kiosk
                selectedDate={hour}
                today={hour}
            />
        </div>
    );
}