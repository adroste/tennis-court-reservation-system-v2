import React, { useCallback, useContext } from 'react';

import { BaseTemplateEditor } from './BaseTemplateEditor';
import { appContext } from '../AppContext';

export function TemplateEditor({
    id,
    extra,
    replacements,
}) {

    const { templates } = useContext(appContext);
    const initialValue = templates[id];

    const save = useCallback(cleanValue => {
        console.log('save', { value: cleanValue });
    }, []);

    return (
        <BaseTemplateEditor
            extra={extra}
            initialValue={initialValue}
            onSave={save}
            replacements={replacements}
        />
    );
}