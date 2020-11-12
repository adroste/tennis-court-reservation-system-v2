import { Alert, Button, Checkbox, Form, Input, Typography } from 'antd';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { LockOutlined, MailOutlined } from '@ant-design/icons';
import React, { useContext, useEffect } from 'react';

import { LoginForm } from './LoginForm';
import { authContext } from '../AuthContext';
import styles from './LoginPage.module.css';

export function LoginPage() {

    const { user } = useContext(authContext);
    const location = useLocation();
    const history = useHistory();

    useEffect(() => {
        if (user) {
            const { from } = location.state || { from: { pathname: "/" } };
            history.replace(from);
        }
    }, [history, location, user])

    return (
        <>
        <div className={styles.cta}>
            <Alert type="info" message={
                <span>Sie haben noch keinen Account? <Link to="/register">Jetzt&nbsp;Registrieren!</Link></span>
            } />
        </div>
        <div className={styles.wrapper}>
            <h1>Anmelden</h1>

            <LoginForm />
        </div>
        </>
    );
}