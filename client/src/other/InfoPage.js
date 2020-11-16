import React, { useContext } from 'react';

import { appContext } from '../AppContext';
import styles from './InfoPage.module.css';

export function InfoPage() {
    const { templates: { infoPage } } = useContext(appContext);

    return (
        <div className={styles.wrapper}>
            <div dangerouslySetInnerHTML={{ __html: infoPage.body }} />
        </div>
    );
}