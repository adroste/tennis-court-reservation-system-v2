import { Button, Divider, Typography } from 'antd';
import React, { useCallback, useContext } from 'react';

import { RegisterForm } from './RegisterForm';
import { authContext } from '../AuthContext';
import { putUserApi } from '../api';
import styles from './MyAccountPage.module.css';
import { useApi } from '../useApi';
import { useHistory } from 'react-router-dom';

export function MyAccountPage() {

    const { user, setUser } = useContext(authContext);
    const [putState, putUser] = useApi(putUserApi, setUser);
    const history = useHistory();

    const handleFinishUser = useCallback(({ name, mail, password }) => {
        const update = { userId: user.userId };
        if (name !== user.name)
            update.name = name;
        if (mail !== user.mail)
            update.mail = mail;
        if (password)
            update.password = password;
        
        putUser(update, () => {
            if (mail !== user.mail)
                history.push('/verifymail/new');
        });
    }, [putUser, user, history]);

    return (
        <div className={styles.wrapper}>
            <h1>Benutzerkonto</h1>

            <RegisterForm
                apiState={putState}
                onFinish={handleFinishUser}
                user={user}
            />

            <Divider />

            <h1>Datenschutz</h1>
            <div className={styles.buttonWrapper}>
                <Button disabled>
                    Datenauskunft anfordern
                </Button>
                <div>Sie erhalten eine Mail mit einer Übersicht über alle Ihre gespeicherten Daten.</div>
            </div>
            <div className={styles.buttonWrapper}>
                <Button disabled>
                    Alle Daten löschen
                </Button>
                <Typography.Text type="danger">Diese Aktion kann nicht rückgängig gemacht werden.</Typography.Text>
                <div>Es werden alle Ihre Daten (Reservierungen und Benutzerkonto) endgültig gelöscht.</div>
            </div>

        </div>
    );
}