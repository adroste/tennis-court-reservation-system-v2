import { Button, Divider, Typography } from 'antd';
import React, { useContext } from 'react';

import { RegisterForm } from './RegisterForm';
import { authContext } from '../AuthContext';
import styles from './MyAccountPage.module.css';

export function MyAccountPage() {

    const { user: { name, mail } } = useContext(authContext);

    return (
        <div className={styles.wrapper}>
            <h1>Benutzerkonto</h1>

            <RegisterForm
                currentMail={mail}
                currentName={name}
                reset
            />

            <Divider />

            <h1>Datenschutz</h1>
            <div className={styles.buttonWrapper}>
                <Button>
                    Datenauskunft anfordern
                </Button>
                <div>Sie erhalten eine Mail mit einer Übersicht über alle Ihre gespeicherten Daten.</div>
            </div>
            <div className={styles.buttonWrapper}>
                <Button>
                    Alle Daten löschen
                </Button>
                <Typography.Text type="danger">Diese Aktion kann nicht rückgängig gemacht werden.</Typography.Text>
                <div>Es werden alle Ihre Daten (Reservierungen und Benutzerkonto) endgültig gelöscht.</div>
            </div>

        </div>
    );
}