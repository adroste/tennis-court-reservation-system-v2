import { Button, Form, Input, InputNumber, Slider, Space } from 'antd';
import React, { useCallback, useContext, useEffect } from 'react';

import { appContext } from '../AppContext';

const sliderMarks = Array.from(Array(24)).reduce((marks, _, i) => {
    marks[i] = i; 
    return marks;
}, {})

export function SystemConfigForm() {

    const { config } = useContext(appContext);

    const [form] = Form.useForm();

    const resetForm = useCallback(() => form.resetFields(), [form]);

    useEffect(() => {
        form.resetFields();
    }, [form, config]);

    const onFinish = values => {
        console.log('Success:', values);
    };

    const onFinishFailed = errorInfo => {
        console.log('Failed:', errorInfo);
    };

    return (
        <Form
            form={form}
            layout="vertical"
            initialValues={config}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
        >
            <Form.Item
                name="url"
                label="URL des Reservierungssystems"
                rules={[{ required: true, message: 'URL ist erforderlich' }]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                name="orgName"
                label="Vereinsname"
                rules={[{ required: true, message: 'Vereinsname ist erforderlich' }]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                name="serverMail"
                label="E-Mail Adresse, die zum Senden benutzt wird"
                rules={[
                    { type: 'email', message: 'Beispiel: mustermann@web.de' },
                    { required: true, message: 'E-Mail Adresse ist erforderlich' },
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                name="reservationDaysInAdvance"
                label="Anzahl der Tage, die Plätze im voraus reservierbar sind"
                rules={[{ required: true, message: 'Angabe ist erforderlich' }]}
            >
                <InputNumber 
                    min={1}
                    max={1825}
                />
            </Form.Item>

            <Form.Item
                name="reservationMaxActiveCount"
                label="Maximale Anzahl an offenen Reservierungen, die ein Nutzer tätigen darf"
                rules={[{ required: true, message: 'Angabe ist erforderlich' }]}
            >
                <InputNumber 
                    min={1}
                />
            </Form.Item>

            <Form.Item
                name="visibleHours"
                label="Angezeigte Uhrzeiten im Kalender"
                rules={[{ required: true, message: 'Angabe ist erforderlich' }]}
            >
                <Slider 
                    marks={sliderMarks}
                    range
                    min={0}
                    max={23}
                />
            </Form.Item>

            <Form.Item>
                <Space>
                    <Button type="primary" htmlType="submit">
                        Speichern
                    </Button>
                    <Button type="default" onClick={resetForm}>
                        Zurücksetzen
                    </Button>
                </Space>
            </Form.Item>
        </Form>
    );
}