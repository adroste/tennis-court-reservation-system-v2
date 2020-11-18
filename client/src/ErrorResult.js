import { Button, Result } from 'antd';

export function ErrorResult() {

    return (
        <Result
            style={{ margin: '0 auto' }}
            status="warning"
            title="Etwas ist schiefgelaufen."
            extra={
                <Button type="primary" onClick={() => window.location.reload()} >
                    Erneut versuchen
                </Button>
            }
        />
    )

}