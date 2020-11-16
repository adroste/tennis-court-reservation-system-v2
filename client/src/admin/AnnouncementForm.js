import { Checkbox, Form, Input } from 'antd';
import React, { useCallback, useContext, useEffect, useState } from 'react';

import { SubmitButtons } from './SubmitButtons';
import { appContext } from '../AppContext';
import { putConfigApi } from '../api';
import { useApi } from '../useApi';

export function AnnouncementForm() {

    const { config: { announcement }, setConfig } = useContext(appContext);
    const [enabled, setEnabled] = useState();
    const [disableReset, setDisableReset] = useState(true);
    const [state, putConfig] = useApi(putConfigApi, setConfig);

    const [form] = Form.useForm();

    const resetForm = useCallback(() => {
        form.resetFields()
        setEnabled(!!announcement);
        setDisableReset(true);
    }, [form, announcement]);

    useEffect(() => {
        resetForm();
    }, [resetForm, announcement]);

    useEffect(() => {
        if (state.success)
            resetForm();
    }, [state.success, resetForm]);

    const handleEnabledChange = useCallback(e => {
        setEnabled(e.target.checked);
    }, []);

    const handleFieldsChange = useCallback(() => {
        if (disableReset)
            setDisableReset(false);
    }, [disableReset]);

    const handleSave = useCallback(({ announcement }) => {
        putConfig({
            announcement: enabled ? announcement : '',
        });
    }, [enabled, putConfig]);

    return (
        <Form
            form={form}
            layout="vertical"
            onFinish={handleSave}
            onFieldsChange={handleFieldsChange}
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
                <SubmitButtons
                    apiState={state}
                    disableReset={disableReset}
                    onReset={resetForm}
                />
            </Form.Item>
        </Form>
    );
}