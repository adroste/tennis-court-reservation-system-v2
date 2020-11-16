import { Button, Result } from 'antd'

export function ErrorResult() {

    return (
        <Result
            status="warning"
            title="Etwas ist schiefgelaufen."
            extra={
                <Button type="primary" onClick={() => window.location.reload()} >
                    Seite neu laden
                </Button>
            }
        />
    )

}