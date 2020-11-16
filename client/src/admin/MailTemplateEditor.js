import React, { useCallback, useEffect, useState } from 'react';

import { BaseTemplateEditor } from './BaseTemplateEditor';
import { Input } from 'antd';

export function MailTemplateEditor({
    id,
    mailTemplates,
    extra,
    replacements,
}) {
    const { body, subject } = mailTemplates[id];

    const [curSubject, setCurSubject] = useState();

    const save = useCallback(cleanValue => {
        setCurSubject(subject => {
            console.log('save', { value: cleanValue, subject });
            return subject;
        });
    }, []);

    const reset = useCallback(() => {
        setCurSubject(subject);
    }, [subject]);

    useEffect(() => {
        reset();
    }, [reset, id, mailTemplates])

    const handleSubjectChange = useCallback(e => {
        setCurSubject(e.target.value);
    }, []);

    return (
        <BaseTemplateEditor
            before={
                <Input addonBefore="Betreff:" value={curSubject} onChange={handleSubjectChange} />
            }
            extra={extra}
            initialValue={body}
            onReset={reset}
            onSave={save}
            replacements={replacements}
        />
    );
}