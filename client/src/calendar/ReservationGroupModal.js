import { Button, Form, Input, Modal, Radio, message } from 'antd';
import React, { useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { getReservationsApi, patchReservationGroupApi, postReservationGroupApi } from '../api';

import { Ball } from '../Ball';
import { ErrorResult } from '../ErrorResult';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { RESERVATION_TYPES } from '../ReservationTypes';
import { ReservationDetailsForm } from './ReservationDetailsForm';
import { ReservationTosConfirm } from './ReservationTosConfirm';
import { StatusText } from '../admin/StatusText';
import { authContext } from '../AuthContext';
import dayjs from 'dayjs';
import styles from './ReservationGroupModal.module.css';
import { useApi } from '../useApi';

const INITIAL_TO_HOUR_ADD = 1;

export function ReservationGroupModal({
    initialFrom,
    initialCourtId,
    reservation,
    onFinish,
    setReservations: setOuterReservations,
}) {
    const { user } = useContext(authContext);

    const [changeReason, setChangeReason] = useState('');
    const [text, setText] = useState(null);
    const [reservations, setReservations] = useState(null);
    const [from, setFrom] = useState(reservation?.from || initialFrom);
    const [to, setTo] = useState(() => reservation?.to || initialFrom.add(INITIAL_TO_HOUR_ADD, 'hour'));
    const [courtId, setCourtId] = useState(reservation?.courtId || initialCourtId);
    const prevErrorRef = useRef({});

    const [groupReservations, setGroupReservations] = useState([]);
    const [state, getGroupReservations] = useApi(getReservationsApi, setGroupReservations);

    const [postState, postReservationGroup] = useApi(postReservationGroupApi, setOuterReservations);
    const [patchState, patchReservationGroup] = useApi(patchReservationGroupApi, setOuterReservations);

    const loading = state.loading || postState.loading || patchState.loading;

    const adminEdit = reservation && user.admin && reservation?.userId !== user.userId;
    const canEdit = user.admin || !reservation || reservation.userId === user.userId;

    const newReservations = useMemo(() => reservations?.filter(
        r => !groupReservations.some(gr => gr.from.isSame(r.from, 'hour') && gr.to.isSame(r.to, 'hour'))
    ), [reservations, groupReservations]);
    const cancelReservations = useMemo(() => reservations && groupReservations.filter(
        gr => !reservations.some(r => r.from.isSame(gr.from, 'hour') && r.to.isSame(gr.to, 'hour'))
    ), [reservations, groupReservations]);
    const changeText = !!(groupReservations && text);

    const unavailableReservations = useMemo(() => {
        let uaRes = postState.error?.unavailableReservations || patchState.error?.unavailableReservations;
        if (uaRes)
            uaRes = uaRes.map(({ courtId, from, to }) => ({
                courtId,
                from: dayjs(from),
                to: dayjs(to),
            }));
        return uaRes;
    }, [patchState.error?.unavailableReservations, postState.error?.unavailableReservations]);

    useEffect(() => {
        if (reservation?.groupId)
            getGroupReservations({ query: { 'group-id': reservation?.groupId } });
    }, [reservation, getGroupReservations]);

    const handleChangeChangeReason = useCallback(e => {
        setChangeReason(e.target.value);
    }, []);

    const handlePostReservation = useCallback(() => {
        postReservationGroup(null, {
            reservations,
            text,
            type: RESERVATION_TYPES.NORMAL,
        }, () => {
            message.success("Reservierung erfolgreich");
            onFinish();
        });
    }, [
        onFinish,
        postReservationGroup,
        reservations,
        text,
    ]);

    const handleChangeReservation = useCallback(() => {
        const doChange = () => {
            patchReservationGroup({
                path: {
                    groupId: reservation.groupId
                }
            }, {
                reason: adminEdit ? changeReason : undefined,
                reservations,
                text,
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

                    {newReservations.length > 0 &&
                        <>
                            <div className={styles.heading}>Neue Termine</div>
                            <ul>
                                {newReservations.map(({ from, to }) => (
                                    <li key={from}>{from.format('dd[\xa0]L')}, {from.hour()} bis {to.hour()} Uhr</li>
                                ))}
                            </ul>
                        </>
                    }

                    {cancelReservations.length > 0 &&
                        <>
                            <div className={styles.heading}>Zu Stornieren</div>
                            <ul>
                                {cancelReservations.map(({ from, to }) => (
                                    <li key={from}>{from.format('dd[\xa0]L')}, {from.hour()} bis {to.hour()} Uhr</li>
                                ))}
                            </ul>
                        </>
                    }

                    {changeText &&
                        <>
                            <div className={styles.heading}>Änderungen</div>
                            <ul>
                                <li>Name: <strong>{text}</strong></li>
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
        adminEdit,
        cancelReservations,
        changeReason,
        changeText,
        newReservations,
        onFinish,
        patchReservationGroup,
        reservation,
        reservations,
        text,
    ]);


    const handleCancelReservation = useCallback(() => {
        let cancelType;

        const handleCancelTypeChange = e => (cancelType = e.target.value);

        const doDelete = () => {
            const reqParams = {
                path: {
                    groupId: reservation.groupId
                }
            };
            const cb = () => {
                message.success("Stornierung erfolgreich");
                onFinish();
            }

            let reservations;
            if (cancelType === 'single') {
                reservations = groupReservations.filter(r => !r.from.isSame(reservation.from, 'day'));
            } else if (cancelType === 'allActive') {
                reservations = groupReservations.filter(r => r.from.isBefore(dayjs(), 'hour'));
            } else {
                reservations = [];
            }

            patchReservationGroup(reqParams, {
                reason: adminEdit ? changeReason : undefined,
                reservations,
            }, cb);
        };

        if (groupReservations.length <= 1) {
            doDelete();
        } else {
            Modal.confirm({
                title: 'Termine stornieren',
                icon: <ExclamationCircleOutlined />,
                centered: true,
                content: (
                    <Radio.Group onChange={handleCancelTypeChange}>
                        <Radio value="single">Nur diesen Termin</Radio>
                        <ul>
                            <li key={reservation.from}>{reservation.from.format('dd[\xa0]L')}, {reservation.from.hour()} bis {reservation.to.hour()} Uhr</li>
                        </ul>
                        <Radio value="allActive">Alle offenen Termine</Radio>
                        <ul>
                            {groupReservations.filter(r => !r.from.isBefore(dayjs(), 'hour')).map(({ from, to }) => (
                                <li key={from}>{from.format('dd[\xa0]L')}, {from.hour()} bis {to.hour()} Uhr</li>
                            ))}
                        </ul>
                        {user?.admin &&
                            <>
                                <Radio value="all">Alle Termine</Radio>
                                <ul>
                                    {groupReservations.map(({ from, to }) => (
                                        <li key={from}>{from.format('dd[\xa0]L')}, {from.hour()} bis {to.hour()} Uhr</li>
                                    ))}
                                </ul>
                            </>
                        }
                    </Radio.Group>
                ),
                okText: 'Stornieren',
                okType: 'danger',
                cancelText: 'Abbrechen',
                onOk: doDelete,
            });
        }
    }, [
        adminEdit,
        changeReason,
        groupReservations,
        onFinish,
        patchReservationGroup,
        reservation,
        user?.admin,
    ]);

    useEffect(() => {
        if (prevErrorRef.current.post === postState.error
            && prevErrorRef.current.patch === patchState.error)
            return;
        prevErrorRef.current.post = postState.error;
        prevErrorRef.current.patch = patchState.error;

        const message = postState.error?.message || patchState.error?.message;
        if (unavailableReservations) {
            Modal.error({
                centered: true,
                title: 'Reservierung fehlgeschlagen',
                content: (
                    <div>
                        <div>
                            Folgende Termine sind nicht verfügbar:
                        </div>
                        <ul>
                            {unavailableReservations.map(({ from, to }) => (
                                <li key={from}>{from.format('dd[\xa0]L')}, {from.hour()} bis {to.hour()} Uhr</li>
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
                        {reservations?.length > diff ?
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
    }, [reservations?.length, postState.error, patchState.error, unavailableReservations])

    if (
        state.error
        || (postState.error && !postState.error.unavailableReservations && postState.error.message !== 'too many active reservations')
        || (patchState.error && !patchState.error.unavailableReservations && patchState.error.message !== 'too many active reservations')
    ) {
        return (
            <Modal
                title="Reservierung"
                visible={true}
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
            visible={true}
            width={530}
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
                                        disabled={adminEdit && !changeReason}
                                    >
                                        Stornieren
                                    </Button>
                                    <Button
                                        type="primary"
                                        onClick={handleChangeReservation}
                                        disabled={
                                            !(newReservations?.length || cancelReservations?.length || changeText)
                                            || (adminEdit && !changeReason)
                                        }
                                    >
                                        Speichern
                                    </Button>
                                </>
                            ) : (
                                <Button
                                    disabled={!newReservations?.length}
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
                {state.loading ?
                    (
                        <Ball visible spin centered large />
                    ) : (

                        <ReservationDetailsForm
                            courtId={courtId}
                            currentReservations={groupReservations}
                            disabled={loading}
                            from={from}
                            onCourtIdChange={setCourtId}
                            onFromChange={setFrom}
                            onReservationsChange={setReservations}
                            onTextChange={setText}
                            onToChange={setTo}
                            readOnly={!canEdit}
                            text={text}
                            to={to}
                            unavailableReservations={unavailableReservations}
                        />
                    )
                }

                {adminEdit &&
                    <Form layout="vertical">
                        <Form.Item 
                            label="Grund der Änderung"
                            required
                        >
                            <Input.TextArea
                                autoSize
                                disabled={loading}
                                onChange={handleChangeChangeReason}
                                placeholder="Erforderlich"
                                required
                                value={changeReason}
                            />
                            <div className={styles.changeReasonHint}>
                                Der Inhaber der Reservierung wird über die Änderungen sowie dessen Grund per E-Mail informiert.
                            </div>
                        </Form.Item>
                    </Form>
                }

                {false && /*TODO */ !reservation &&
                    <ReservationTosConfirm
                    />
                }
            </div>
        </Modal>
    );
}