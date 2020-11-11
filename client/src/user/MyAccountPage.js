import { Button, Divider, Form, Typography } from 'antd';
import React, { useContext, useEffect } from 'react';

import { RegisterForm } from './RegisterForm';
import { authContext } from '../AuthContext';
import styles from './MyAccountPage.module.css';

export function MyAccountPage() {

    const { user: { name, mail } } = useContext(authContext);
    const [form] = Form.useForm();

    useEffect(() => {
        form.resetFields();
    }, [form, name, mail]);

    const onFinish = values => {
        console.log('Success:', values);
    };

    const onFinishFailed = errorInfo => {
        console.log('Failed:', errorInfo);
    };

    return (
        <div className={styles.wrapper}>
            <Typography.Title level={3}>Benutzerkonto</Typography.Title>

            <RegisterForm
                currentMail={mail}
                currentName={name}
            />

            <Divider />

            <Typography.Title level={3}>Datenschutz</Typography.Title>
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