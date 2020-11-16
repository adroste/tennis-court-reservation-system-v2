import { Button, Result, Space } from 'antd';
import React, { useCallback, useContext, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';

import { Ball } from '../Ball';
import { authContext } from '../AuthContext';
import styles from './VerifyMailPage.module.css';

export function VerifyMailPage() {

    const { logout } = useContext(authContext);
    const history = useHistory();
    const { verifyKey } = useParams();
    const loading = false;

    useEffect(() => {

    }, [verifyKey]);

    const handleCalendarClick = useCallback(() => {
        history.replace('/');
    }, [history]);

    if (loading)
        return (
            <div className={styles.wrapper}>
                <Ball visible spin centered large />
            </div>
        );

    if (verifyKey === 'new')
        return (
            <div className={styles.wrapper}>
                <Result
                    status="info"
                    title="Bitte bestätigen Sie Ihre E-Mail Adresse"
                    extra={
                        <div>
                            <div>
                                Es wurde soeben eine Mail mit einem Bestätigungslink an Ihre E-Mail Adresse versandt.
                            </div>
                            <br />
                            <div>
                                Klicken Sie auf den Bestätigungslink, um ihre E-Mail Adresse zu verifizieren.
                            </div>
                        </div>
                    }
                />
            </div>
        );

    return (
        <div className={styles.wrapper}>
            <Result
                status="success"
                title="E-Mail erfolgreich bestätigt."
                extra={
                    <Space direction="vertical" size="large">
                        <Button type="primary" onClick={handleCalendarClick}>
                            Zum Kalender
                        </Button>
                    </Space>
                }
            />
        </div>
    );
}