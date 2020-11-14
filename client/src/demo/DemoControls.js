import { Button, Space, notification } from 'antd';
import React, { useContext, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

import { authContext } from '../AuthContext';

export function DemoControls() {

    const { user, login } = useContext(authContext);

    const history = useHistory();
    const location = useLocation();

    useEffect(() => {
        notification.info({
            key: 'demo',
            message: 'Demo Modus',
            duration: 0,
            placement: 'bottomLeft',
            description: (
                <>
                    <p>Dies ist eine Demo, gefüllt mit Beispieldaten.</p>
                    <Space direction="vertical">
                        {location.pathname === '/kiosk' ?
                            (
                                <Button size="middle" onClick={() => history.push('/')}>
                                    Kiosk Modus verlassen
                                </Button>
                            ) : (
                                <>
                                    <Button size="middle" onClick={() => history.push('/kiosk')}>
                                        Kiosk Modus
                                    </Button>
                                    {!user &&
                                        <>
                                            <Button size="middle" onClick={() => login({
                                                rememberLogin: false,
                                            })}>
                                                Als Admin anmelden
                                            </Button>
                                            <Button size="middle" onClick={() => login({
                                                rememberLogin: false,
                                            })}>
                                                Als Nutzer anmelden
                                            </Button>
                                        </>
                                    }
                                </>
                            )
                        }
                    </Space>
                </>
            ),
            closeIcon: ' ',
        });
    }, [history, location, user, login]);

    return null;
}