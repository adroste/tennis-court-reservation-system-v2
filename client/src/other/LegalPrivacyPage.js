import React, { useContext } from 'react';

import { appContext } from '../AppContext';
import styles from './LegalPrivacyPage.module.css';

export function LegalPrivacyPage() {
    const { texts: { legalPrivacy } } = useContext(appContext);

    return (
        <div className={styles.wrapper}>
            <div dangerouslySetInnerHTML={{ __html: legalPrivacy }} />
        </div>
    );
}