import { Button, Checkbox, Modal, Typography } from 'antd';
import React, { useCallback, useMemo, useState } from 'react';

import { DoReservationModal } from './DoReservationModal';
import { GroupDatesForm } from './GroupDatesForm';
import { ReservationDetails } from './ReservationDetails';
import styles from './ReservationModal.module.css';
import { useGroupReservations } from './useReservations';

export function ReservationModal({
    date,
    court,
    reservation,
    onFinish,
}) {
    const [tosAccepted, setTosAccepted] = useState(false);
    const [newCustomName, setNewCustomName] = useState(null);
    const [newGroupDates, setNewGroupDates] = useState();
    const [cancelConfirm, setCancelConfirm] = useState(false);
    const [changeConfirm, setChangeConfirm] = useState(false);

    // todo user context
    const name = reservation?.name || "Günther Jacob";
    const customName = reservation?.customName;
    const admin = true;
    const myReservation = false;
    const canEdit = true;

    const groupReservations = useGroupReservations(reservation?.groupId);

    const groupDates = useMemo(() => {
        if (!groupReservations?.length)
            return null;
        return groupReservations.map(r => r.date);
    }, [groupReservations]);

    const handleGroupDatesChange = useCallback(dates => {
        setNewGroupDates(dates);
    }, []);


    const handleAcceptTos = useCallback(e => {
        setTosAccepted(e.target.checked);
    }, []);

    const showCancelConfirm = useCallback(() => {
        setCancelConfirm(true);
    }, []);

    const handleNewCustomNameChange = useCallback(name => {
        setNewCustomName(name);
    }, []);

    return (
        <Modal
            title="Reservierung"
            visible={true}
            width={600}
            centered
            onCancel={onFinish}
            onOk={onFinish}
            footer={
                <div className={styles.footer}>
                    <Button onClick={onFinish}>
                        {canEdit ? 'Abbrechen' : 'Schließen'}
                    </Button>
                    {canEdit && (reservation ?
                        (
                            <>
                                <Button
                                    type="danger"
                                >
                                    {groupReservations?.length ? 'Alle stornieren' : 'Stornieren'}
                                </Button>
                                {(!!groupReservations?.length || admin) &&
                                    <Button
                                        type="primary"
                                    >
                                        Speichern
                                    </Button>
                                }
                            </>
                        ) : (
                            <Button
                                disabled={!tosAccepted}
                                type="primary"
                            >
                                Reservieren
                            </Button>
                        )
                    )}
                </div>
            }
        >
            <div className={styles.wrapper}>
                <div>
                    <ReservationDetails
                        allowEditName={admin}
                        court={court}
                        date={date}
                        groupDates={newGroupDates || groupDates}
                        name={typeof newCustomName === 'string' ? newCustomName : (customName || name)}
                        onNameChange={handleNewCustomNameChange}
                        showAllDates={!canEdit}
                    />

                    {canEdit && (!reservation || groupReservations.length > 1) &&
                        <GroupDatesForm
                            date={date}
                            onGroupDatesChange={handleGroupDatesChange}
                            reservations={groupReservations}
                        />
                    }
                </div>

                {!reservation &&
                    <>
                        <div>
                            <Typography.Title level={4}>
                                Preis
                            </Typography.Title>
                            <div>
                                15,- Euro pro Wertmarke<br />
                                145,- Euro pro 10 Wertmarken
                            </div>
                        </div>

                        <div>
                            <Typography.Title level={4}>
                                Nutzungsordnung
                            </Typography.Title>
                            <ul>
                                <li>
                                    Zur Nutzung benötigen Sie Wertmarken und einen Zugangscode. Diese erhalten Sie bei unserern Partnern: <br />
                            relexa hotel Harz-Wald Braunlage, Karl-Röhrig Str. 5a, Tel. 05520/8070 <br />
                            BTG Braunlage (Tourist-Information), Elbingeröderstr. 17, Tel. 05520/93070 <br />
                                </li>
                                <li>
                                    Am Eingang der Halle ist ein Codeschloß angebracht, in das ein 4-stelliger Zahlencode eingegeben werden muß, um den Türöffner zu betätigen.
                                </li>
                                <li>
                                    Auf den Plätzen befindet sich für jeden Platz ein Wertmarkenautomat. Eine Wertmarke schaltet für 1 Stunde (+ etwas Nachlauf) das Licht ein und gibt die Heizungssteuerung frei.
                                </li>
                                <li>
                                    Eine Nutzung nach 22.00 und vor 8.00 Uhr ist ohne Reservierung möglich.
                                </li>
                                <li>
                                    Aus dem Reservierungssystem können keine Rechtsansprüche abgeleitet werden.
                                </li>
                            </ul>

                            <Checkbox
                                checked={tosAccepted}
                                onChange={handleAcceptTos}
                            >
                                Ich akzeptiere die Nutzungsordnung.
                            </Checkbox>
                        </div>
                    </>
                }
            </div>

            {false &&
                <DoReservationModal

                />
            }
        </Modal>
    );
}