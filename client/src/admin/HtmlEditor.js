import { BtnBold, BtnBulletList, BtnClearFormatting, BtnItalic, BtnLink, BtnNumberedList, BtnRedo, BtnUnderline, BtnUndo, Button, Editor, Separator, Toolbar } from 'react-simple-wysiwyg';
import React, { useCallback, useMemo, useState } from 'react';

import { Input } from 'antd';
import styles from './HtmlEditor.module.css';
import { withEditorContext } from 'react-simple-wysiwyg/lib/Editor';

function createButton(
    title,
    content,
    command,
    commandArgument,
) {
    ButtonFactory.displayName = title.replace(/\s/g, '');

    return withEditorContext(ButtonFactory);

    function ButtonFactory(props) {
        const { selection, ...buttonProps } = props;

        let active = false;
        if (typeof command === 'string') {
            active = !!selection && document.queryCommandState(command);
        }

        return (
            <Button title={title} {...buttonProps} onMouseDown={action} active={active}>
                {content}
            </Button>
        );

        function action() {
            if (typeof command === 'function') {
                command(selection);
            } else if (commandArgument) {
                document.execCommand(command, false, commandArgument);
            } else {
                document.execCommand(command);
            }
        }
    }
}

const BtnH1 = createButton('H1', '𝗛1', 'formatBlock', 'H1');
const BtnH2 = createButton('H2', '𝗛2', 'formatBlock', 'H2');
const BtnBlock = createButton('Block', 'Block', 'formatBlock', 'div');
const BtnParagraph = createButton('Absatz', 'Absatz', 'formatBlock', 'p');

const defaultValue = '';

export function HtmlEditor({
    value,
    onChange,
}) {
    const [showHtml, setShowHtml] = useState(false);

    const handleChange = useCallback(e => {
        onChange(e.target.value);
    }, [onChange]);

    const BtnShowHtml = useMemo(() => {
        const title = showHtml ? 'HTML ausblenden' : 'HTML-Editor';
        return createButton(title, title, () => {
            setShowHtml(!showHtml);
        });
    }, [showHtml]);

    return (
        <div>
            <Editor
                value={value || defaultValue}
                onChange={handleChange}
            >
                <Toolbar className={styles.toolbar}>

                    <BtnUndo />
                    <BtnRedo />

                    <Separator />

                    <BtnBold />
                    <BtnItalic />
                    <BtnUnderline />

                    <Separator />

                    <BtnNumberedList />
                    <BtnBulletList />

                    <Separator />

                    <BtnLink />
                    <BtnClearFormatting />

                    <Separator />

                    <BtnBlock className={styles.varWidth} />
                    <BtnParagraph className={styles.varWidth} />
                    <BtnH1 />
                    <BtnH2 />

                    <Separator />

                    <BtnShowHtml className={styles.varWidth} />

                </Toolbar>
            </Editor>

            {showHtml &&
                <Input.TextArea
                    value={value || defaultValue}
                    onChange={handleChange}
                    autoSize
                />
            }
        </div>
    );
}