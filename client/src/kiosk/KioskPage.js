import React, { useContext } from 'react';

import { Alert } from 'antd';
import { DateClock } from './DateClock';
import { ReservationCalendar } from '../calendar/ReservationCalendar';
import { SystemLinkQr } from './SystemLinkQr';
import { appContext } from '../AppContext';
import styles from './KioskPage.module.css';
import { useToday } from '../calendar/useToday';

export function KioskPage() {

    const { announcement, courts, orgName } = useContext(appContext);

    const today = useToday();

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
                    <SystemLinkQr />
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

            <ReservationCalendar
                selectedDate={today}
                today={today}
            />
        </div>
    );
}