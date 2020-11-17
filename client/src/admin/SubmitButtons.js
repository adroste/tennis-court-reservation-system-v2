import { Button, Col, Row } from 'antd';

import { StatusText } from './StatusText';

function SubmitButtonsState({ apiState }) {
    const { success, loading, error } = apiState;

    if (loading)
        return (
            <StatusText
                loading
                text="Speichern..."
            />
        );

    if (error)
        return (
            <StatusText
                error
                text="Konnte nicht gespeichert werden"
            />
        );

    if (success)
        return (
            <StatusText
                success
                text="Gespeichert"
            />
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