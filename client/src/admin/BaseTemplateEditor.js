import { Button, Space } from 'antd';
import React, { useCallback, useEffect, useState } from 'react';

import { HtmlEditor } from './HtmlEditor';
import styles from './BaseTemplateEditor.module.css';

const wrapperStyle = { display: 'flex' };

export function BaseTemplateEditor({
    before,
    extra,
    initialValue,
    onReset,
    onSave,
    replacements,
}) {

    const [value, setValue] = useState();

    const save = useCallback(() => {
        setValue(value => {
            // check if value only consists of empty tags
            const cleanValue = value.match(/<.*?>([^<>]+)<.*?>/gim) ? value : '';
            onSave(cleanValue);
            return value;
        });
    }, [onSave]);

    const reset = useCallback(() => {
        setValue(initialValue);
        if (onReset)
            onReset();
    }, [initialValue, onReset]);

    useEffect(() => {
        reset();
    }, [reset, initialValue])

    return (
        <Space direction="vertical" style={wrapperStyle}>

            {before}

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