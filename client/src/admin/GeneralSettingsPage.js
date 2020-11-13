import { Divider, Typography } from 'antd';

import { AnnouncementForm } from './AnnouncementForm';
import { CourtConfigForm } from './CourtConfigForm';
import React from 'react';
import { SystemConfigForm } from './SystemConfigForm';
import styles from './GeneralSettingsPage.module.css';

export function GeneralSettingsPage() {

    return (
        <div className={styles.wrapper}>

            <h1>Ankündigung</h1>
            <AnnouncementForm />

            <Divider />

            <h1>Platzverwaltung</h1>
            <Typography.Text>
                Die Reihenfolge gibt die Darstellung im Reservierungskalender vor.
            </Typography.Text>
            <br/><br/>
            <CourtConfigForm />

            <Divider />

            <h1>Basiseinstellungen</h1>
            <SystemConfigForm />

        </div>
    );
}