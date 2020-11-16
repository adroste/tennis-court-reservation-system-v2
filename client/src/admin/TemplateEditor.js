import React, { useCallback, useContext } from 'react';

import { BaseTemplateEditor } from './BaseTemplateEditor';
import { appContext } from '../AppContext';
import { putTemplatesApi } from '../api';
import { useApi } from '../useApi';

export function TemplateEditor({
    id,
    extra,
    replacements,
}) {

    const { templates, setTemplates } = useContext(appContext);
    const { body } = templates[id];

    const [state, putTemplate] = useApi(putTemplatesApi, setTemplates);

    const save = useCallback(({ cleanBody }) => {
        putTemplate({
            [id]: {
                body: cleanBody,
            },
        });
    }, [id, putTemplate]);

    return (
        <BaseTemplateEditor
            apiState={state}
            extra={extra}
            initialBody={body}
            onSave={save}
            replacements={replacements}
        />
    );
}