import React, { useCallback } from 'react';

import { BaseTemplateEditor } from './BaseTemplateEditor';
import { putMailTemplateApi } from '../api';
import { useApi } from '../useApi';

export function MailTemplateEditor({
    id,
    mailTemplates,
    setMailTemplates,
    extra,
    replacements,
}) {
    const { body, subject } = mailTemplates[id];

    const [state, putMailTemplate] = useApi(putMailTemplateApi, setMailTemplates);

    const save = useCallback(({ cleanBody, subject }) => {
        putMailTemplate({ path: { id } }, {
            id,
            body: cleanBody,
            subject,
        });
    }, [id, putMailTemplate]);

    return (
        <BaseTemplateEditor
            apiState={state}
            extra={extra}
            hasSubject
            initialBody={body}
            initialSubject={subject}
            onSave={save}
            replacements={replacements}
        />
    );
}