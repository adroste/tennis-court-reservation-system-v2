import React, { useContext } from 'react';

import { Link } from 'react-router-dom';
import { appContext } from './AppContext';
import dayjs from 'dayjs';

export function Footer({
    noLinks,
}) {
    const { orgName } = useContext(appContext);

    return (
        <>
            {!noLinks &&
                <p>
                    <Link to="/legalnotice-privacy">Impressum / Datenschutz</Link>
                </p>
            }
            <p>
                {`©${dayjs().format('YYYY')} ${orgName} - entwickelt von `}
                {noLinks 
                    ? <span>Alexander&nbsp;Droste</span>
                    : <a target="_blank" rel="noopener noreferrer" href="https://github.com/alexdroste/reservierungssystem-tennis-v2">Alexander&nbsp;Droste</a>
                }
            </p>
        </>
    );
}