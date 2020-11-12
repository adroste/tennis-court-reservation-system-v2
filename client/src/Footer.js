import React, { useContext } from 'react';

import { Link } from 'react-router-dom';
import { appContext } from './AppContext';

export function Footer() {
    const { orgName } = useContext(appContext);

    return (
        <>
            <p>
                <Link to="/legalnotice-privacy">Impressum / Datenschutz</Link>
            </p>
            <p>
                ©2020 {orgName} - entwickelt von <a target="_blank" rel="noopener noreferrer" href="https://github.com/alexdroste/reservierungssystem-tennis-v2">Alexander&nbsp;Droste</a>
            </p>
        </>
    );
}