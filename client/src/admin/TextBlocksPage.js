import { Divider, Tabs } from 'antd';

import React from 'react';
import { TemplateEditor } from './TemplateEditor';
import styles from './TextBlocksPage.module.css';

export function TextBlocksPage() {

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

                        <TemplateEditor 
                            textKey='legalPrivacy' 
                            extra={
                                <>
                                    <h2>Rechtliche Informationen</h2>
                                    <div>
                                        <div>Folgende Informationen sollten in die Datenschutzerklärung eingebracht werden.</div>
                                        <ul>
                                            <li>
                                                Das System verwendet eine zu Cookies ähnliche Technologie, 
                                                um Basisfunktionen wie die Nutzeranmeldung zu ermöglichen.
                                            </li>
                                            <li>
                                                Es werden keinerlei Daten mit Dritten ausgetauscht.
                                            </li>
                                            <li>
                                                Es werden keine Tracking Cookies gesetzt.
                                            </li>
                                            <li>
                                                Das System hat ein eingebautes Tracking-System,
                                                um Seitenaufrufe, etc. zu zählen. 
                                                <br/>
                                                Dazu werden Anfragen an den Server ausgewertet.
                                                Aus den Informationen der Anfrage wird für jeden Nutzer
                                                ein Fingerprint erstellt, um die Anzahl der Aufrufe in Abhängigkeit unterschiedliche Nutzer zählen zu können. 
                                                Dabei werden keine personenbezogenen Daten gespeichert oder weitergegeben. 
                                                Der Fingerprint erneuert sich täglich, damit keine Nutzerprofile erstellt werden können. 
                                            </li>
                                        </ul>
                                    </div>
                                </>
                            }
                        />

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

                        <h1>Nutzungsbedingungen</h1>
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