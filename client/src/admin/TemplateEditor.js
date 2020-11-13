import { Button, Input, Space } from 'antd';
import React, { useCallback, useContext, useEffect, useState } from 'react';

import { HtmlEditor } from './HtmlEditor';
import { appContext } from '../AppContext';
import styles from './TemplateEditor.module.css';

const wrapperStyle = { display: 'flex' };

export function TemplateEditor({
    textKey,
    mailKey,
    extra,
    replacements,
}) {

    const { texts, mailTemplates } = useContext(appContext);
    const [value, setValue] = useState();
    const [subject, setSubject] = useState();

    const save = useCallback(() => {
        setValue(value => {
            setSubject(subject => {
                // check if value only consists of empty tags
                const cleanValue = value.match(/<.*?>([^<>]+)<.*?>/gim) ? value : '';
                console.log('save', { value: cleanValue, subject });
                return subject;
            });
            return value;
        });
    }, []);

    const reset = useCallback(() => {
        if (mailKey) {
            const { body, subject } = (mailTemplates[mailKey] || {});
            setValue(body);
            setSubject(subject);
        } else if (textKey) {
            setValue(texts[textKey]);
        }
    }, [texts, mailTemplates, textKey, mailKey]);

    useEffect(() => {
        reset();
    }, [reset, texts, mailTemplates])

    const handleSubjectChange = useCallback(e => {
        setSubject(e.target.value);
    }, []);

    return (
        <Space direction="vertical" style={wrapperStyle}>

            {mailKey &&
                <Input addonBefore="Betreff:" value={subject} onChange={handleSubjectChange} />
            }

            <HtmlEditor
                value={value}
                onChange={setValue}
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

            <Space>
                <Button type="primary" onClick={save}>
                    Speichern
                </Button>
                <Button onClick={reset}>
                    Zurücksetzen
                </Button>
            </Space>
        </Space>
    );
}