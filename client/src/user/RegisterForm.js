import { Button, Checkbox, Form, Input } from 'antd';
import React, { useCallback, useContext, useEffect, useState } from 'react';

import { StatusText } from '../admin/StatusText';
import { SubmitButtons } from '../admin/SubmitButtons';
import { appContext } from '../AppContext';
import styles from './RegisterForm.module.css';

export function RegisterForm({
    apiState = {},
    onFinish,
    user,
}) {
    const { templates: { systemTos } } = useContext(appContext);

    const [form] = Form.useForm();
    const [disableReset, setDisableReset] = useState(true);
    const loading = apiState.loading;

    const resetForm = useCallback(() => {
        form.resetFields();
        setDisableReset(true);
    }, [form]);

    useEffect(() => {
        resetForm();
    }, [resetForm, user]);

    useEffect(() => {
        if (apiState.success)
            resetForm();
    }, [apiState.success, resetForm]);

    const handleFieldsChange = useCallback(() => {
        if (disableReset)
            setDisableReset(false);
    }, [disableReset]);

    return (
        <Form
            form={form}
            className={styles.form}
            layout="vertical"
            onFinish={onFinish}
            onFieldsChange={handleFieldsChange}
        >
            <Form.Item
                label="Anzeigename"
                name="name"
                initialValue={user?.name}
                rules={[
                    // { max: 20, message: 'Maximal 20 Zeichen erlaubt' },
                    // { min: 5, message: 'Mindestens 5 Zeichen erforderlich' },
                    { required: true, message: 'Der Anzeigename darf nicht leer sein' },
                    {
                        pattern: /^[\u00c0-\u017eA-Za-z0-9.]{1}[\u00c0-\u017eA-Za-z0-9\s.]{3,18}[\u00c0-\u017eA-Za-z0-9.]{1}$/,
                        message: 'Zwischen 5 und 20 Zeichen bestehend aus: Buchstaben, Zahlen, Punkten sowie Leerzeichen (außer am Anfang / Ende)'
                    }
                ]}
            >
                <Input 
                    autoComplete="name" 
                    disabled={loading}
                />
            </Form.Item>

            <Form.Item
                name="mail"
                label="E-Mail"
                initialValue={user?.mail}
                rules={[
                    { type: 'email', message: 'Beispiel: mustermann@web.de' },
                    { required: true, message: 'E-Mail Adresse ist erforderlich' },
                ]}
            >
                <Input 
                    autoComplete="email" 
                    disabled={loading}
                />
            </Form.Item>

            <Form.Item
                label={user ? "Neues Passwort" : "Passwort"}
                name="password"
                rules={[
                    {
                        required: true,
                        validator(_, value) {
                            if (
                                (value?.length > 0 && value?.length < 8)
                                || (!user && !value)
                            )
                                return Promise.reject('Mindestens 8 Zeichen erforderlich');
                            return Promise.resolve();
                        },
                    }
                ]}
            >
                <Input.Password 
                    autoComplete="new-password" 
                    placeholder={user ? "Nicht ändern" : "Mind. 8 Zeichen"} 
                    disabled={loading}
                />
            </Form.Item>

            <Form.Item
                label="Passwort bestätigen"
                name="password-confirm"
                dependencies={['password']}
                rules={[
                    ({ getFieldValue }) => ({
                        required: true,
                        validator(_, value) {
                            const pwVal = getFieldValue('password');
                            if (pwVal === value || (!pwVal && !value))
                                return Promise.resolve();
                            return Promise.reject('Passwörter stimmen nicht überein!');
                        },
                    })
                ]}
            >
                <Input.Password 
                    autoComplete="new-password" 
                    placeholder={user ? "Nicht ändern" : "Mind. 8 Zeichen"} 
                    disabled={loading}
                />
            </Form.Item>

            {!user &&
                <>
                    <div>
                        <h1>Nutzungsbedingungen</h1>
                        <div dangerouslySetInnerHTML={{ __html: systemTos.body }} />
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
                        <Checkbox 
                            disabled={loading}
                        >
                            Ich akzeptiere die Nutzungsbedingungen
                        </Checkbox>
                    </Form.Item>
                </>
            }

            <Form.Item>
                {!user ?
                    (
                        <Button
                            type="primary"
                            htmlType="submit"
                            disabled={loading}
                        >
                            <StatusText
                                loading={loading}
                                text={loading ? 'Registrierung...' : 'Registrieren'}
                            />
                        </Button>
                    ): (
                        <SubmitButtons
                            apiState={apiState}
                            disableReset={disableReset}
                            onReset={resetForm}
                        />
                    )
                }
            </Form.Item>
        </Form>
    );
}