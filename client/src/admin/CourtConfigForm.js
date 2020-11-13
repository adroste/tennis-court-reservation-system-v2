import { Button, Checkbox, Form, Input, InputNumber, Slider, Space } from 'antd';
import { CaretDownFilled, CaretDownOutlined, CaretUpOutlined, DeleteOutlined, MinusCircleOutlined, MinusOutlined, PlusOutlined } from '@ant-design/icons';
import React, { useCallback, useContext, useEffect, useMemo, useState } from 'react';

import { DatePicker } from '../calendar/DatePicker';
import { appContext } from '../AppContext';
import styles from './CourtConfigForm.module.css';

export function CourtConfigForm() {

    const { courts } = useContext(appContext);
    const [, forceUpdate] = useState();

    const [form] = Form.useForm();

    const initialValues = useMemo(() => ({ courts }), [courts]);

    const resetForm = useCallback(() => form.resetFields(), [form]);

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

    const onFinish = values => {
        console.log('Success:', values);
    };

    const onFinishFailed = errorInfo => {
        console.log('Failed:', errorInfo);
    };

    return (
        <Form
            form={form}
            initialValues={initialValues}
            layout="vertical"
            onFinish={onFinish}
            autoComplete="off"
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

                                <Space>
                                    <Form.Item
                                        {...field}
                                        key="disabled"
                                        name={[field.name, 'disabled']}
                                        fieldKey={[field.fieldKey, 'disabled']}
                                        valuePropName="checked"
                                    >
                                        {/*<Checkbox onChange={() => move() /* hack to force update }>*/}
                                        <Checkbox onChange={forceUpdate}>
                                            Sperren?
                                        </Checkbox>
                                    </Form.Item>
                                </Space>

                                {form.getFieldValue(['courts', field.name, 'disabled']) &&
                                    <Space>
                                        <Form.Item
                                            {...field}
                                            key="disabledFromTil"
                                            label="Zeitraum der Sperrung"
                                            name={[field.name, 'disabledFromTil']}
                                            fieldKey={[field.fieldKey, 'disabledFromTil']}
                                        >
                                            <DatePicker.RangePicker />
                                        </Form.Item>

                                        <Form.Item
                                            {...field}
                                            key="disabledReason"
                                            label="Grund für Sperrung"
                                            name={[field.name, 'disabledReason']}
                                            fieldKey={[field.fieldKey, 'disabledReason']}
                                        >
                                            <Input placeholder="z.B.: Arbeiten" />
                                        </Form.Item>
                                    </Space>
                                }
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