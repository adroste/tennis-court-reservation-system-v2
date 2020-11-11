import { Alert, Button, Checkbox, Form, Input, Typography } from 'antd';
import { LockOutlined, MailOutlined } from '@ant-design/icons';

import { Link } from 'react-router-dom';
import React from 'react';
import { RegisterForm } from './RegisterForm';
import styles from './RegisterPage.module.css';

export function RegisterPage() {

    const onFinish = values => {
        console.log('Success:', values);
    };

    const onFinishFailed = errorInfo => {
        console.log('Failed:', errorInfo);
    };

    return (
        <div className={styles.wrapper}>

            <Typography.Title level={3}>
                Registrieren
            <div className={styles.loginItem}>
                <span>Bereits registriert? </span>
                <Link to="/login">Anmelden</Link>
            </div>
            </Typography.Title>

            <RegisterForm
                newUser
            />
        </div>
    );
}