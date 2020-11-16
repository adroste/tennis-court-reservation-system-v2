import React, { useState } from 'react';

import { Ball } from '../Ball';
import { Divider } from 'antd';
import { ErrorResult } from '../ErrorResult';
import { MailTemplateEditor } from './MailTemplateEditor';
import { getMailTemplatesApi } from '../api';
import { useApi } from '../useApi';

export function MailTemplatesPane() {

    const [mailTemplates, setMailTemplates] = useState();
    const [state, ] = useApi(getMailTemplatesApi, setMailTemplates, true);

    if (state.error)
        return <ErrorResult />;

    if (state.loading)
        return <Ball visible spin centered large />;

    return (
        <>
            <h1>Reservierungsbestätigung</h1>
            <MailTemplateEditor
                id='reservationConfirmation'
                mailTemplates={mailTemplates}
                setMailTemplates={setMailTemplates}
                replacements={[
                    {
                        key: '{{name}}',
                        description: 'Wird durch den Namen des Benutzers ersetzt',
                    },
                    {
                        key: '{{reservierung}}',
                        description: 'Wird durch die Angaben zur getätigen Reservierung ersetzt',
                    }
                ]}
            />

            <Divider />

            <h1>Stornierung</h1>
            <MailTemplateEditor
                id='reservationCancelled'
                mailTemplates={mailTemplates}
                setMailTemplates={setMailTemplates}
                replacements={[
                    {
                        key: '{{name}}',
                        description: 'Wird durch den Namen des Benutzers ersetzt',
                    },
                    {
                        key: '{{reservierung}}',
                        description: 'Wird durch die Angaben zur stornierten Reservierung ersetzt',
                    },
                    {
                        key: '{{grund}}',
                        description: 'Wird durch den Grund der Stornierung ersetzt',
                    }
                ]}
            />

            <Divider />

            <h1>Registrierung: E-Mail bestätigen</h1>
            <MailTemplateEditor
                id='confirmMail'
                mailTemplates={mailTemplates}
                setMailTemplates={setMailTemplates}
                replacements={[
                    {
                        key: '{{name}}',
                        description: 'Wird durch den Namen des Benutzers ersetzt',
                    },
                    {
                        key: '{{link}}',
                        description: 'Wird durch den Bestätigungslink ersetzt',
                    },
                ]}
            />

            <Divider />

            <h1>Registrierung: Passwort vergessen</h1>
            <MailTemplateEditor
                id='resetPassword'
                mailTemplates={mailTemplates}
                setMailTemplates={setMailTemplates}
                replacements={[
                    {
                        key: '{{name}}',
                        description: 'Wird durch den Namen des Benutzers ersetzt',
                    },
                    {
                        key: '{{link}}',
                        description: 'Wird durch den Link zum Passwort-Reset ersetzt',
                    },
                ]}
            />

        </>
    );
}