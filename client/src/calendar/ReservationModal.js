import { Button, Checkbox, Modal } from 'antd';
import React, { useCallback, useContext, useMemo, useState } from 'react';

import { DoReservationModal } from './DoReservationModal';
import { GroupDatesForm } from './GroupDatesForm';
import { ReservationDetails } from './ReservationDetails';
import { appContext } from '../AppContext';
import styles from './ReservationModal.module.css';
import { useGroupReservations } from './useReservations';

export function ReservationModal({
    date,
    courtId,
    reservation,
    onFinish,
}) {
    const { courts, texts: { reservationPrice, reservationTos } } = useContext(appContext);

    const courtName = courts.find(c => c.courtId === courtId)?.name;

    const [tosAccepted, setTosAccepted] = useState(false);
    const [newCustomName, setNewCustomName] = useState(null);
    const [newGroupDates, setNewGroupDates] = useState();
    // const [cancelConfirm, setCancelConfirm] = useState(false);
    // const [changeConfirm, setChangeConfirm] = useState(false);

    // todo user context
    const name = reservation?.name || "Günther Jacob";
    const customName = reservation?.customName;
    const admin = true;
    // const myReservation = false;
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

    // const showCancelConfirm = useCallback(() => {
    //     setCancelConfirm(true);
    // }, []);

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
                                disabled={reservationTos && !tosAccepted}
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
                        courtName={courtName}
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
                        {reservationPrice &&
                            <div>
                                <h1>Preis</h1>
                                <div dangerouslySetInnerHTML={{ __html: reservationPrice }} />
                            </div>
                        }

                        {reservationTos &&
                            <div>
                                <h1>Nutzungsordnung</h1>
                                <div dangerouslySetInnerHTML={{ __html: reservationTos }} />

                                <Checkbox
                                    checked={tosAccepted}
                                    onChange={handleAcceptTos}
                                >
                                    Ich akzeptiere die Nutzungsordnung.
                                </Checkbox>
                            </div>
                        }
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