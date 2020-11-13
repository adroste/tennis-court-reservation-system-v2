import { Button, Divider, Input, Tabs } from 'antd';
import React, { useContext } from 'react';

import { DefaultEditor } from 'react-simple-wysiwyg';
import { HtmlEditor } from './HtmlEditor';
import { TemplateEditor } from './TemplateEditor';
import { appContext } from '../AppContext';
import styles from './TextBlocksPage.module.css';

export function TextBlocksPage() {
    const { texts: {
        reservationPrice,
        reservationTos,
        infoPage,
    }, mailTemplates: {
        reservationConfirmation,
    } } = useContext(appContext);

    // const [html, setHtml] = React.useState('');

    const onChange = (e) => {
        // setHtml(e.target.value);
    };

    return (
        <div className={styles.wrapper}>
            <Tabs className={styles.tabs} type="card">

                <Tabs.TabPane tab="Hinweis-Seite" key="2">
                    <div className={styles.content}>

                        <TemplateEditor textKey='infoPage' />

                    </div>
                </Tabs.TabPane>

                <Tabs.TabPane tab="Impressum / Datenschutz" key="i">
                    <div className={styles.content}>

                        <TemplateEditor textKey='legalPrivacy' />

                    </div>
                </Tabs.TabPane>

                <Tabs.TabPane tab="Reservierungsdialog" key="1">
                    <div className={styles.content}>

                        <h1>Preis</h1>
                        <TemplateEditor
                            textKey='reservationPrice'
                            extra='Ein leerer Wert deaktiviert diesen Textblock.'
                        />

                        <Divider />

                        <h1>Nutzungsordnung</h1>
                        <TemplateEditor
                            textKey='reservationTos'
                            extra={
                                <>
                                    <div>Der Nutzer muss diese Nutzungsordnung akzeptieren, um eine Reservierung durchzuführen.</div>
                                    <div>Ein leerer Wert deaktviert diesen Textblock.</div>
                                </>
                            }
                        />

                    </div>
                </Tabs.TabPane>

                <Tabs.TabPane tab="Registrierung" key="7">
                    <div className={styles.content}>

                        <h1>Nutzungsbedingungen (System)</h1>
                        <TemplateEditor
                            textKey='systemTos'
                            extra='Der Nutzer muss diese Nutzungsbedingungen akzeptieren, um sich Registrieren zu können.'
                        />

                    </div>
                </Tabs.TabPane>

                <Tabs.TabPane tab="E-Mail Vorlagen" key="3">
                    <div className={styles.content}>

                        <h1>Reservierungsbestätigung</h1>
                        <TemplateEditor
                            mailKey='reservationConfirmation'
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
                        <TemplateEditor
                            mailKey='reservationCancelled'
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
                        <TemplateEditor
                            mailKey='confirmMail'
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
                        <TemplateEditor
                            mailKey='resetPassword'
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

                    </div>
                </Tabs.TabPane>

            </Tabs>
        </div>
    );
}