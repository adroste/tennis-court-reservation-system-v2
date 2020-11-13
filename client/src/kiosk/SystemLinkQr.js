import React, { useContext } from 'react';

import QrCode from 'qrcode.react';
import { appContext } from '../AppContext';
import styles from './SystemLinkQr.module.css';

export function SystemLinkQr({
    bgColor,
}) {

    const { url } = useContext(appContext);

    return (
        <div className={styles.wrapper}>
            <div className={styles.qr}>
                <QrCode
                    value={url}
                    size={150}
                    bgColor={bgColor}
                />
            </div>
            <div className={styles.plain}>
                {url.replace(/(http|https):\/\//, '')}
            </div>
        </div>
    );
}