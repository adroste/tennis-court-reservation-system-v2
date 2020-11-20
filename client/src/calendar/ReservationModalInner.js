import { Button, Checkbox, Input, Modal, message } from 'antd';
import React, { useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { deleteReservationGroupApi, getReservationsApi, patchReservationGroupApi, postReservationGroupApi } from '../api';

import { ErrorResult } from '../ErrorResult';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { GroupDatesForm } from './GroupDatesForm';
import { ReservationDetails } from './ReservationDetails';
import { StatusText } from '../admin/StatusText';
import { appContext } from '../AppContext';
import { authContext } from '../AuthContext';
import styles from './ReservationModalInner.module.css';
import { useApi } from '../useApi';

export function ReservationModalInner({
    date,
    courtId,
    reservation,
    today,
    onFinish,
    setReservations,
}) {
    const { courts, templates: { reservationPrice, reservationTos } } = useContext(appContext);
    const { user } = useContext(authContext);

    const courtName = courts.find(c => c.courtId === courtId)?.name;

    const [tosAccepted, setTosAccepted] = useState(false);
    const [newCustomName, setNewCustomName] = useState(null);
    const [newGroupDates, setNewGroupDates] = useState(null);
    const [editName, setEditName] = useState(false);
    const prevErrorRef = useRef({});

    const [groupReservations, setGroupReservations] = useState([]);
    const [state, getGroupReservations] = useApi(getReservationsApi, setGroupReservations);

    const [postState, postReservationGroup] = useApi(postReservationGroupApi, setReservations);
    const [deleteState, deleteReservationGroup] = useApi(deleteReservationGroupApi, setReservations);
    const [patchState, patchReservationGroup] = useApi(patchReservationGroupApi, setReservations);

    const loading = state.loading || postState.loading || patchState.loading || deleteState.loading;

    const canEdit = user.admin || !reservation || reservation.userId === user.userId;

    const groupDates = useMemo(() => groupReservations.map(r => r.date), [groupReservations]);

    const newDates = useMemo(() => newGroupDates?.filter(
        ngd => !groupDates.some(gd => gd.isSame(ngd, 'hour'))
    ), [newGroupDates, groupDates]);
    const cancelDates = useMemo(() => newGroupDates && groupDates.filter(
        gd => !newGroupDates.some(ngd => gd.isSame(ngd, 'hour'))
    ), [newGroupDates, groupDates]);
    const changeCustomName = !!(groupDates && newCustomName);

    useEffect(() => {
        if (reservation?.groupId)
            getGroupReservations({ query: { 'group-id': reservation?.groupId } });
    }, [reservation, getGroupReservations]);

    const handleGroupDatesChange = useCallback(dates => {
        setNewGroupDates(dates);
    }, []);

    const handleAcceptTos = useCallback(e => {
        setTosAccepted(e.target.checked);
    }, []);

    const handleEditName = useCallback(() => {
        setEditName(true);
    }, []);

    const handleCancelEditName = useCallback(() => {
        setEditName(false);
        setNewCustomName(null);
    }, []);

    const handleNewCustomNameChange = useCallback(e => {
        setNewCustomName(e.target.value);
    }, []);

    const handlePostReservation = useCallback(() => {
        postReservationGroup(null, {
            courtId,
            dates: newDates,
            userId: user.userId,
            customName: newCustomName,
        }, () => {
            message.success("Reservierung erfolgreich");
            onFinish();
        });
    }, [
        courtId,
        newCustomName,
        newDates,
        onFinish,
        postReservationGroup,
        user,
    ]);

    const handleChangeReservation = useCallback(() => {
        const doChange = () => {
            patchReservationGroup({
                path: {
                    groupId: reservation.groupId
                }
            }, {
                groupId: reservation.groupId,
                dates: newGroupDates,
                customName: newCustomName,
            }, () => {
                message.success("Speichern erfolgreich");
                onFinish();
            });
        };

        Modal.confirm({
            title: 'Wirklich speichern?',
            icon: <ExclamationCircleOutlined />,
            centered: true,
            content: (
                <div className={styles.wrapper}>

                    {newDates.length > 0 &&
                        <>
                            <div className={styles.heading}>Neue Termine</div>
                            <ul>
                                {newDates.map(date => <li key={date}>{date.format('dd L')}</li>)}
                            </ul>
                        </>
                    }

                    {cancelDates.length > 0 &&
                        <>
                            <div className={styles.heading}>Zu Stornieren</div>
                            <ul>
                                {cancelDates.map(date => <li key={date}>{date.format('dd L')}</li>)}
                            </ul>
                        </>
                    }

                    {changeCustomName &&
                        <>
                            <div className={styles.heading}>Änderungen</div>
                            <ul>
                                <li>Name: <strong>{newCustomName}</strong></li>
                            </ul>
                        </>
                    }

                </div>
            ),
            okText: 'Bestätigen',
            okType: 'danger',
            cancelText: 'Abbrechen',
            onOk: doChange
        });
    }, [
        cancelDates,
        changeCustomName,
        newCustomName,
        newDates,
        newGroupDates,
        onFinish,
        patchReservationGroup,
        reservation,
    ]);


    const handleCancelReservation = useCallback(() => {
        const doDelete = () => {
            deleteReservationGroup({
                path: {
                    groupId: reservation.groupId
                }
            }, null, () => {
                message.success("Stornierung erfolgreich");
                onFinish();
            });
        };

        if (groupDates.length <= 1) {
            doDelete();
        } else {
            Modal.confirm({
                title: 'Wirklich alle stornieren?',
                icon: <ExclamationCircleOutlined />,
                centered: true,
                content: (
                    <ul>
                        {groupDates.map(date => (
                            <li key={date}>{date.format('dd L')}</li>
                        ))}
                    </ul>
                ),
                okText: 'Bestätigen',
                okType: 'danger',
                cancelText: 'Abbrechen',
                onOk: doDelete,
            });
        }
    }, [
        deleteReservationGroup,
        groupDates,
        onFinish,
        reservation,
    ]);

    useEffect(() => {
        if (prevErrorRef.current.post === postState.error 
            && prevErrorRef.current.patch === patchState.error)
            return;
        prevErrorRef.current.post = postState.error;
        prevErrorRef.current.patch = patchState.error;

        const uaDates = postState.error?.unavailableDates || patchState.error?.unavailableDates;
        const message = postState.error?.message || patchState.error?.message;
        if (uaDates) {
            Modal.error({
                centered: true,
                title: 'Reservierung fehlgeschlagen',
                content: (
                    <div>
                        <div>
                            Folgende Termine sind nicht verfügbar:
                        </div>
                        <ul>
                            {uaDates.map(date => (
                                <li key={date}>{date.format('dd L')}</li>
                            ))}
                        </ul>
                    </div>
                )
            });
        } else if (message === 'too many active reservations') {
            const value = postState.error?.value || patchState.error?.value;
            const max = postState.error?.max || patchState.error?.max;
            const diff = Math.abs(value - max);
            Modal.error({
                centered: true,
                title: 'Reservierungslimit erreicht',
                content: (
                    <div>
                        {newGroupDates?.length > diff ?
                            (
                                <p>
                                    Bitte entfernen Sie mindestens <strong>{diff}</strong> Termine.
                                </p>
                            ) : (
                                <p>
                                    Sie können aktuell keine weiteren Termine reservieren.
                                </p>
                            )
                        }
                        <p>
                            Es können maximal {max} Reservierungen im voraus getätigt werden. Bereits vergangene Termine werden dabei nicht angerechnet.
                        </p>
                    </div>
                )
            });
        }
    }, [newGroupDates?.length, postState.error, patchState.error])

    if (
        state.error
        || (postState.error && !postState.error.unavailableDates && postState.error.message !== 'too many active reservations')
        || (patchState.error && !patchState.error.unavailableDates && patchState.error.message !== 'too many active reservations')
        || deleteState.error
    ) {
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
                            Abbrechen
                        </Button>
                    </div>
                }
            >
                <div className={styles.wrapper}>
                    <ErrorResult />
                </div>
            </Modal>
        );
    }

    return (
        <Modal
            title="Reservierung"
            visible={true}
            width={600}
            centered
            onCancel={onFinish}
            onOk={onFinish}
            footer={loading ?
                (
                    <StatusText
                        loading
                        text="Bitte warten..."
                    />
                ) : (
                    <div className={styles.footer}>
                        <Button onClick={onFinish}>
                            {canEdit ? 'Abbrechen' : 'Schließen'}
                        </Button>
                        {canEdit && (reservation ?
                            (
                                <>
                                    <Button
                                        type="danger"
                                        onClick={handleCancelReservation}
                                    >
                                        {groupDates.length > 1 ? 'Alle stornieren' : 'Stornieren'}
                                    </Button>
                                    <Button
                                        type="primary"
                                        onClick={handleChangeReservation}
                                        disabled={!(newDates?.length || cancelDates?.length || changeCustomName)}
                                    >
                                        Speichern
                                        </Button>
                                </>
                            ) : (
                                <Button
                                    disabled={(reservationTos.body && !tosAccepted) || !newDates?.length}
                                    type="primary"
                                    onClick={handlePostReservation}
                                >
                                    Reservieren
                                </Button>
                            )
                        )}
                    </div>
                )
            }
        >
            <div className={styles.wrapper}>
                <div>
                    <ReservationDetails
                        courtName={courtName}
                        date={date}
                        groupDates={newGroupDates || groupDates}
                        name={editName ?
                            (
                                <>
                                    <Input
                                        className={styles.nameInput}
                                        disabled={loading}
                                        onChange={handleNewCustomNameChange}
                                        placeholder="z.B. Training, ..."
                                        size="small"
                                        value={newCustomName}
                                    />
                                    <Button
                                        disabled={loading}
                                        onClick={handleCancelEditName}
                                        size="small"
                                        type='link'
                                    >
                                        abbrechen
                                    </Button>
                                </>
                            ) : (
                                <>
                                    {reservation?.customName || reservation?.name || user.name}
                                    {user.admin &&
                                        <Button
                                            disabled={loading}
                                            onClick={handleEditName}
                                            size="small"
                                            type='link'
                                        >
                                            ändern
                                        </Button>
                                    }
                                </>
                            )
                        }
                        showAllDates={!canEdit}
                        showDateRange={canEdit}
                        repeat={canEdit &&
                            <GroupDatesForm
                                courtId={courtId}
                                currentGroupDates={groupDates}
                                date={date}
                                disabled={loading}
                                onGroupDatesChange={handleGroupDatesChange}
                                today={today}
                                unavailableDates={postState.error?.unavailableDates || patchState.error?.unavailableDates}
                            />
                        }
                    />
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
                                    disabled={loading}
                                >
                                    Ich akzeptiere die Nutzungsordnung.
                                </Checkbox>
                            </div>
                        }
                    </>
                }
            </div>
        </Modal>
    );
}