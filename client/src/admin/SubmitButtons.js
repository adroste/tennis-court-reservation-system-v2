import { Button, Col, Row, Space } from 'antd';
import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';

import { Ball } from '../Ball';

function SubmitButtonsState({ apiState }) {
    const { success, loading, error } = apiState;

    if (loading)
        return (
            <Space>
                <Ball visible spin />
                <span>Speichern...</span>
            </Space>
        );

    if (error)
        return (
            <Space>
                <CloseCircleOutlined style={{ color: '#ff4d4f' }} />
                <span>Konnte nicht gespeichert werden</span>
            </Space>
        );

    if (success)
        return (
            <Space>
                <CheckCircleOutlined style={{ color: '#52c41a' }} />
                <span>Gespeichert</span>
            </Space>
        );

    return null;
}

export function SubmitButtons({
    apiState = {},
    disableReset,
    onSave,
    onReset,
}) {
    return (
        <Row gutter={[16, 16]} align="middle">
            <Col>
                <Button 
                    disabled={apiState.loading}
                    onClick={onSave}
                    type="primary" 
                    htmlType="submit"
                >
                    Speichern
                </Button>
            </Col>
            <Col>
                <Button 
                    disabled={apiState.loading || disableReset}
                    onClick={onReset}
                    htmlType="reset"
                >
                    Zurücksetzen
                </Button>
            </Col>
            <Col>
                <SubmitButtonsState apiState={apiState} />
            </Col>
        </Row>
    );
}