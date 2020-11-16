import { Button, Checkbox, Form, Input, Space } from 'antd';
import React, { useCallback, useContext, useEffect, useState } from 'react';

import { appContext } from '../AppContext';

export function AnnouncementForm() {

    const { config: { announcement } } = useContext(appContext);
    const [enabled, setEnabled] = useState();

    const [form] = Form.useForm();

    const resetForm = useCallback(() => {
        form.resetFields()
        setEnabled(!!announcement);
    }, [form, announcement]);

    useEffect(() => {
        resetForm();
    }, [resetForm, announcement]);

    const handleEnabledChange = useCallback(e => {
        setEnabled(e.target.checked);
    }, []);

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
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
        >
            <Form.Item
                name="announcement"
                label={
                    <Checkbox
                        checked={enabled}
                        onChange={handleEnabledChange}
                    >
                        Ankündigung veröffentlichen
                    </Checkbox>
                }
                initialValue={announcement}
            >
                <Input.TextArea
                    disabled={!enabled}
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