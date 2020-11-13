import { Button, notification } from 'antd';
import React, { useEffect, useState } from 'react';

export function CookieNotice() {

    useEffect(() => {
        const closed = localStorage.getItem('notice-closed');

        if (closed)
            return;

        const close = () => {
            notification.close('cookie-notice');
            localStorage.setItem('notice-closed', 'true');
        };

        notification.info({
            key: 'cookie-notice',
            message: 'Cookie Hinweis',
            duration: 0,
            placement: 'bottomRight',
            description: (
                <>
                    <div>
                        Zur Gewährleistung der Funktionalität wird eine zu Cookies alternative Technologie benutzt.
                    </div>
                    <div>
                        Es werden keine 3rd-Party oder Tracking Cookies gesetzt.
                    </div>
                </>
            ),
            onClose: close,
            btn: (
                <Button type="primary" size="middle" onClick={close}>
                    OK
                </Button>
            ),
            closeIcon: null
        });
    }, []);

    return null;
}