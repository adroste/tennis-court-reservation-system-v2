import { Button, Result } from 'antd';
import React, { useCallback, useContext, useEffect } from 'react';

import { authContext } from '../AuthContext';
import styles from './LogoutPage.module.css';
import { useHistory } from 'react-router-dom';

export function LogoutPage() {

    const { logout } = useContext(authContext);
    const history = useHistory();
    
    useEffect(() => logout(), [logout]);

    const handleLoginClick = useCallback(() => {
        history.push('/login');
    }, [history]);

    const handleCalendarClick = useCallback(() => {
        history.push('/');
    }, [history]);

    return (
        <div className={styles.wrapper}>
            <Result
                status="success"
                title="Erfolgreich abgemeldet"
                extra={
                    <div className={styles.buttons}>
                        <Button type="primary" onClick={handleCalendarClick}>
                            Zurück zum Kalender
                        </Button>
                        <Button onClick={handleLoginClick}>
                            Erneut Anmelden
                        </Button>
                    </div>
                }
            />
        </div>
    );
}