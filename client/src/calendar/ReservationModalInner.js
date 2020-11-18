import { Button, Checkbox, Modal } from 'antd';
import React, { useCallback, useContext, useMemo, useState } from 'react';

import { DoReservationModal } from './DoReservationModal';
import { GroupDatesForm } from './GroupDatesForm';
import { ReservationDetails } from './ReservationDetails';
import { appContext } from '../AppContext';
import { authContext } from '../AuthContext';
import styles from './ReservationModalInner.module.css';
import { useGroupReservations } from './useReservations';

export function ReservationModalInner({
    date,
    courtId,
    reservation,
    today,
    onFinish,
}) {
    const { courts, templates: { reservationPrice, reservationTos } } = useContext(appContext);
    const { user } = useContext(authContext);

    const courtName = courts.find(c => c.courtId === courtId)?.name;

    const [tosAccepted, setTosAccepted] = useState(false);
    const [newCustomName, setNewCustomName] = useState(null);
    const [newGroupDates, setNewGroupDates] = useState();
    // const [cancelConfirm, setCancelConfirm] = useState(false);
    // const [changeConfirm, setChangeConfirm] = useState(false);

    const canEdit = !reservation || reservation.userId === user.userId;

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

    const handleDoReservation = useCallback(() => {
        /*
        courtId,
        customName,
        delete: [id],
        put: [{ id, prop, ... }]
        post: {
            courtId,
            customName,
            dates: [],
            groupId
        }
        addGroup:
        
        neu (!reservation)
            post 
                newGroupDates || date
                newCustomName
                courtId
        ändern 
            post
        */

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
                                {(!!groupReservations?.length || user.admin) &&
                                    <Button
                                        type="primary"
                                    >
                                        Speichern
                                    </Button>
                                }
                            </>
                        ) : (
                            <Button
                                disabled={reservationTos.body && !tosAccepted}
                                type="primary"
                                onClick={handleDoReservation}
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
                        allowEditName={user.admin}
                        courtName={courtName}
                        date={date}
                        groupDates={newGroupDates || groupDates}
                        name={typeof newCustomName === 'string' ? newCustomName : (reservation?.customName || reservation?.name || user.name)}
                        onNameChange={handleNewCustomNameChange}
                        showAllDates={!canEdit}
                    />

                    {canEdit && (!reservation || groupReservations.length > 1) &&
                        <GroupDatesForm
                            courtId={courtId}
                            date={date}
                            onGroupDatesChange={handleGroupDatesChange}
                            reservations={groupReservations}
                            today={today}
                            // unavailableDates= //TODO
                        />
                    }
                </div>

                {!reservation &&
                    <>
                        {reservationPrice.body &&
                            <div>
                                <h1>Preis</h1>
                                <div dangerouslySetInnerHTML={{ __html: reservationPrice.body }} />
                            </div>
                        }

                        {reservationTos.body &&
                            <div>
                                <h1>Nutzungsordnung</h1>
                                <div dangerouslySetInnerHTML={{ __html: reservationTos.body }} />

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