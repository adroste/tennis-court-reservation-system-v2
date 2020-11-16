import { Button, Checkbox, Form, Input, Space } from 'antd';
import React, { useCallback, useContext, useEffect } from 'react';

import { appContext } from '../AppContext';
import styles from './RegisterForm.module.css';

export function RegisterForm({
    newUser,
    currentName,
    currentMail,
    reset,
}) {
    const { templates: { systemTos } } = useContext(appContext);

    const [form] = Form.useForm();

    const resetForm = useCallback(() => form.resetFields(), [form]);

    useEffect(() => {
        form.resetFields();
    }, [form, currentName, currentMail]);

    const onFinish = values => {
        console.log('Success:', values);
    };

    const onFinishFailed = errorInfo => {
        console.log('Failed:', errorInfo);
    };

    return (
        <Form
            form={form}
            className={styles.form}
            layout="vertical"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
        >

            <Form.Item
                label="Anzeigename"
                name="name"
                initialValue={currentName}
                rules={[
                    // { max: 20, message: 'Maximal 20 Zeichen erlaubt' },
                    // { min: 5, message: 'Mindestens 5 Zeichen erforderlich' },
                    { required: true, message: 'Der Anzeigename darf nicht leer sein' },
                    {
                        pattern: /^[\u00c0-\u017eA-Za-z0-9]{1}[\u00c0-\u017eA-Za-z0-9\s]{3,18}[\u00c0-\u017eA-Za-z0-9]{1}$/,
                        message: 'Zwischen 5 und 20 Zeichen bestehend aus: Buchstaben, Zahlen & Leertaste (nicht Anfang / Ende)'
                    }
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                name="email"
                label="E-Mail"
                initialValue={currentMail}
                rules={[
                    { type: 'email', message: 'Beispiel: mustermann@web.de' },
                    { required: true, message: 'E-Mail Adresse ist erforderlich' },
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label={newUser ? "Passwort" : "Neues Passwort"}
                name="password"
                rules={[
                    {
                        required: true,
                        validator(_, value) {
                            if (
                                (value?.length > 0 && value?.length < 8)
                                || (newUser && !value)
                            )
                                return Promise.reject('Mindestens 8 Zeichen erforderlich');
                            return Promise.resolve();
                        },
                    }
                ]}
            >
                <Input.Password placeholder={newUser ? "Mind. 8 Zeichen" : "Nicht ändern"} />
            </Form.Item>

            <Form.Item
                label="Passwort bestätigen"
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
                <Input.Password placeholder={newUser ? "Mind. 8 Zeichen" : "Nicht ändern"} />
            </Form.Item>


            {newUser &&
                <>
                    <div>
                        <h1>Nutzungsbedingungen</h1>
                        <div dangerouslySetInnerHTML={{ __html: systemTos }} />
                    </div>

                    <Form.Item
                        name="tos-accept"
                        valuePropName="checked"
                        rules={[
                            {
                                validator: (_, value) =>
                                    value ? Promise.resolve() : Promise.reject('Erforderlich'),
                            },
                        ]}
                    >
                        <Checkbox>
                            Ich akzeptiere die Nutzungsbedingungen
                        </Checkbox>
                    </Form.Item>
                </>
            }

            <Form.Item>
                <Space>
                    <Button type="primary" htmlType="submit">
                        {newUser ? "Registrieren" : "Speichern"}
                    </Button>
                    {reset &&
                        <Button type="default" onClick={resetForm}>
                            Zurücksetzen
                        </Button>
                    }
                </Space>
            </Form.Item>
        </Form>
    );
}