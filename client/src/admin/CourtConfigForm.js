import { Button, Form, Input, Modal, Space } from 'antd';
import { CaretDownOutlined, CaretUpOutlined, DeleteOutlined, ExclamationCircleOutlined, PlusOutlined } from '@ant-design/icons';
import React, { useCallback, useContext, useEffect, useMemo, useState } from 'react';

import { SubmitButtons } from './SubmitButtons';
import { appContext } from '../AppContext';
import { putCourtsApi } from '../api';
import styles from './CourtConfigForm.module.css';
import { useApi } from '../useApi';

export function CourtConfigForm() {

    const { courts, setCourts } = useContext(appContext);
    const [disableReset, setDisableReset] = useState(true);
    const [state, putCourts] = useApi(putCourtsApi, setCourts);

    const [form] = Form.useForm();

    const initialValues = useMemo(() => ({ courts }), [courts]);

    const resetForm = useCallback(() => {
        form.resetFields();
        setDisableReset(true);
    }, [form]);

    useEffect(() => {
        form.resetFields();
    }, [form, courts]);

    const getNextId = useCallback(() => {
        const curCourts = form.getFieldValue('courts') || [];
        let maxId = 0;
        for (let c of [...courts, ...curCourts])
            maxId = Math.max(c.courtId, maxId);
        return maxId + 1;
    }, [courts, form]);

    const handleFieldsChange = useCallback(() => {
        if (disableReset)
            setDisableReset(false);
    }, [disableReset]);

    const handleSave = useCallback(({ courts }) => {
        Modal.confirm({
            title: 'Achtung!',
            icon: <ExclamationCircleOutlined />,
            centered: true,
            content: (
                <div>
                    <p>Durch das Ändern von Plätzen können bestehende Reservierungen verloren gehen.</p>
                    <p>Alle Reservierungen, die im Zeitraum einer Sperrung liegen, werden automatisch storniert.</p>
                    <p>Dies gilt auch für das Entfernen eines Platzes.</p>
                    <p>Alle Nutzer, die von einer Stornierung betroffen sind, werden per E-Mail informiert.</p>
                </div>
            ),
            okText: 'Bestätigen',
            okType: 'danger',
            cancelText: 'Abbrechen',
            onOk() {
                putCourts(null, courts, resetForm);
            },
        });
    }, [putCourts, resetForm]);

    return (
        <Form
            autoComplete="off"
            form={form}
            initialValues={initialValues}
            layout="vertical"
            onFieldsChange={handleFieldsChange}
            onFinish={handleSave}
        >
            <Form.List name="courts">
                {(fields, { add, remove, move }) => (
                    <>
                        {fields.map((field, i) => (
                            <div key={field.key} className={styles.court}>
                                <Space>
                                    <Form.Item
                                        {...field}
                                        key="courtId"
                                        label="ID"
                                        name={[field.name, 'courtId']}
                                        // name={'courtId'}
                                        fieldKey={[field.fieldKey, 'courtId']}
                                    >
                                        <Input
                                            disabled
                                            bordered={false}
                                            className={styles.courtIdInput}
                                        />
                                    </Form.Item>

                                    <Form.Item
                                        {...field}
                                        key="name"
                                        label="Name"
                                        name={[field.name, 'name']}
                                        fieldKey={[field.fieldKey, 'name']}
                                        rules={[{ required: true, message: 'Name erforderlich' }]}
                                    >
                                        <Input placeholder="z.B.: Platz 1" />
                                    </Form.Item>

                                    <Form.Item
                                        label="Aktionen"
                                    >
                                        <Space>
                                            <Button
                                                onClick={() => move(i, i - 1)}
                                                icon={<CaretUpOutlined />}
                                            />
                                            <Button
                                                onClick={() => move(i, i + 1)}
                                                icon={<CaretDownOutlined />}
                                            />
                                            <Button
                                                onClick={() => remove(field.name)}
                                                danger
                                                icon={<DeleteOutlined />}
                                            />
                                        </Space>
                                    </Form.Item>
                                </Space>
                            </div>
                        ))}

                        <Form.Item key="add">
                            <Button
                                type="dashed"
                                onClick={() => add({ courtId: getNextId() })}
                                block
                                icon={<PlusOutlined />}
                            >
                                Platz anlegen
                            </Button>
                        </Form.Item>
                    </>
                )}
            </Form.List>

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