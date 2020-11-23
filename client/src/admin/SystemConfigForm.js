import { Form, Input, InputNumber, Slider } from 'antd';
import React, { useCallback, useContext, useEffect, useState } from 'react';

import { SubmitButtons } from './SubmitButtons';
import { appContext } from '../AppContext';
import { patchConfigApi } from '../api';
import { useApi } from '../useApi';

const sliderMarks = Array.from(Array(25)).reduce((marks, _, i) => {
    marks[i] = i % 24; 
    return marks;
}, {})

export function SystemConfigForm() {

    const { config, setConfig } = useContext(appContext);
    const [disableReset, setDisableReset] = useState(true);
    const [state, patchConfig] = useApi(patchConfigApi, setConfig);

    const [form] = Form.useForm();

    const resetForm = useCallback(() => {
        form.resetFields();
        setDisableReset(true);
    }, [form]);

    useEffect(() => {
        resetForm();
    }, [config, resetForm]);

    const handleFieldsChange = useCallback(() => {
        if (disableReset)
            setDisableReset(false);
    }, [disableReset]);

    const handleSave = useCallback(values => {
        patchConfig(null, values, resetForm);
    }, [patchConfig, resetForm]);

    return (
        <Form
            form={form}
            layout="vertical"
            initialValues={config}
            onFinish={handleSave}
            onFieldsChange={handleFieldsChange}
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
                    max={24}
                />
            </Form.Item>

            <Form.Item>
                <SubmitButtons
                    apiState={state}
                    disableReset={disableReset}
                    onReset={resetForm}
                />
            </Form.Item>
        </Form>
    );
}