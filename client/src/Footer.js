import React, { useContext } from 'react';

import { Link } from 'react-router-dom';
import { appContext } from './AppContext';

export function Footer() {
    const { title } = useContext(appContext);

    return (
        <>
            <p>
                <Link to="/imprint-privacy">Impressum / Datenschutz</Link>
            </p>
            <p>
                ©2020 {title} - entwickelt von <a target="_blank" rel="noopener noreferrer" href="https://github.com/alexdroste/reservierungssystem-tennis-v2">Alexander&nbsp;Droste</a>
            </p>
        </>
    );
}