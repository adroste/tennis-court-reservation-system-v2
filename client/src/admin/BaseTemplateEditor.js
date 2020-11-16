import { Input, Space } from 'antd';
import React, { useCallback, useEffect, useState } from 'react';

import { HtmlEditor } from './HtmlEditor';
import { SubmitButtons } from './SubmitButtons';
import styles from './BaseTemplateEditor.module.css';

const wrapperStyle = { display: 'flex' };

export function BaseTemplateEditor({
    apiState,
    hasSubject,
    extra,
    initialBody,
    initialSubject,
    onSave,
    replacements,
}) {

    const [body, setBody] = useState();
    const [subject, setSubject] = useState();

    const disableReset = body === initialBody 
        && (!hasSubject || subject === initialSubject);

    const save = useCallback(() => {
        // check if value only consists of empty tags
        const cleanBody = body.match(/<.*?>([^<>]+)<.*?>/gim) ? body : '';
        onSave({
            cleanBody,
            subject,
        });
    }, [subject, body, onSave]);

    const reset = useCallback(() => {
        setBody(initialBody);
        if (hasSubject)
            setSubject(initialSubject);
    }, [hasSubject, initialBody, initialSubject]);

    useEffect(() => {
        reset();
    }, [reset])

    const handleSubjectChange = useCallback(e => {
        setSubject(e.target.value);
    }, []);

    return (
        <Space direction="vertical" style={wrapperStyle}>

            {hasSubject &&
                <Input addonBefore="Betreff:" value={subject} onChange={handleSubjectChange} />
            }

            <HtmlEditor
                value={body}
                onChange={setBody}
            />

            {replacements &&
                <div>
                    <h3>Automatische Ersetzungen</h3>
                    <ul>
                        {replacements.map(({ key, description }) => (
                            <li key={key}>
                                <span className={styles.key}>{key}</span>
                                {' - '}
                                <span>{description}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            }

            <div>
                {extra}
            </div>

            <SubmitButtons
                apiState={apiState}
                disableReset={disableReset}
                onSave={save}
                onReset={reset}
            />
        </Space>
    );
}