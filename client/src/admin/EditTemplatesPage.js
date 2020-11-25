import { MailTemplatesPane } from './MailTemplatesPane';
import React from 'react';
import { Tabs } from 'antd';
import { TemplateEditor } from './TemplateEditor';
import styles from './EditTemplatesPage.module.css';

export function EditTemplatesPage() {

    return (
        <div className={styles.wrapper}>
            <Tabs className={styles.tabs} type="card">

                <Tabs.TabPane tab="Hinweis-Seite" key="2">
                    <div className={styles.content}>

                        <TemplateEditor id='infoPage' />

                    </div>
                </Tabs.TabPane>

                <Tabs.TabPane tab="Impressum / Datenschutz" key="i">
                    <div className={styles.content}>

                        <TemplateEditor 
                            id='legalPrivacy' 
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

                        <TemplateEditor
                            id='reservationTos'
                            extra={
                                <>
                                    <div>Der Nutzer wird während einer Reservierung dazu aufgefordert, oben stehende Hinweise / Ordnung zu akzeptieren.</div>
                                </>
                            }
                        />

                    </div>
                </Tabs.TabPane>

                <Tabs.TabPane tab="Registrierung" key="7">
                    <div className={styles.content}>

                        <h1>Nutzungsbedingungen</h1>
                        <TemplateEditor
                            id='systemTos'
                            extra='Der Nutzer muss diese Nutzungsbedingungen akzeptieren, um sich Registrieren zu können.'
                        />

                    </div>
                </Tabs.TabPane>

                <Tabs.TabPane tab="E-Mail Vorlagen" key="3">
                    <div className={styles.content}>

                        <MailTemplatesPane />

                    </div>
                </Tabs.TabPane>

            </Tabs>
        </div>
    );
}