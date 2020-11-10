import { Button, Divider, Form, Input, Typography } from 'antd';
import React, { useContext, useEffect } from 'react';

import { authContext } from '../AuthContext';
import styles from './MyAccountPage.module.css';

export function MyAccountPage() {

    const { name, mail } = useContext(authContext);
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

            <Form
                form={form}
                className={styles.accountForm}
                layout="vertical"
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
            >
                <Form.Item
                    label="Anzeigename"
                    name="name"
                    initialValue={name}
                    rules={[
                        { max: 20, message: 'Maximal 20 Zeichen erlaubt' },
                        { required: true, message: 'Der Anzeigename darf nicht leer sein' },
                        { pattern: /^[\u00c0-\u017eA-Za-z0-9_-]+$/, message: 'Erlaube Zeichen: Buchstaben, Zahlen, _ und -' }
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="email"
                    label="E-Mail"
                    initialValue={mail}
                    rules={[
                        { type: 'email', message: 'Beispiel: mustermann@web.de' },
                        { required: true, message: 'E-Mail Adresse ist erforderlich' },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Neues Password"
                    name="password"
                    rules={[
                        {
                            required: true,
                            validator(_, value) {
                                if (value?.length > 0 && value?.length < 8)
                                    return Promise.reject('Mindestens 8 Zeichen erforderlich');
                                return Promise.resolve();
                            },
                        }
                    ]}
                >
                    <Input.Password placeholder="Nicht ändern" />
                </Form.Item>

                <Form.Item
                    label="Password bestätigen"
                    name="password-confirm"
                    dependencies={['password']}
                    rules={[
                        ({ getFieldValue }) => ({
                            required: true,
                            validator(_, value) {
                                if (getFieldValue('password') === value)
                                    return Promise.resolve();
                                return Promise.reject('Passwörter stimmen nicht überein!');
                            },
                        })
                    ]}
                >
                    <Input.Password placeholder="Nicht ändern" />
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Speichern
                    </Button>
                </Form.Item>
            </Form>

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