import { Button, Checkbox, Input, Modal, Typography } from 'antd';
import React, { useCallback, useMemo, useState } from 'react';

import { GroupDatesForm } from './GroupDatesForm';
import { ReservationDetails } from './ReservationDetails';
import dayjs from 'dayjs';
import { findReservation } from './helper';
import styles from './ReservationModalInner.module.css';
import { useGroupReservations } from './useReservations';

export function DoReservationModal({
    court,
    customName,
    date,
    groupDates,
    groupReservations,
    onFinish,
    reservation,
}) {

    const newReservations = useMemo(() => {


    }, []);

    const cancelReservations = useMemo(() => {

    }, []);

    const changeReservations = useMemo(() => {

    }, []);

    const commit = useCallback(name => {
        //
    }, []);

    return (
        <Modal
            title="Reservierung bestätigen"
            visible={true}
            width={600}
            centered
            okText={(newReservations?.length || changeReservations?.length) ? 'Speichern' : 'Stornieren'}
            okType={(newReservations?.length || changeReservations?.length) ? 'primary' : 'danger'}
            cancelText="Abbrechen"
            onCancel={onFinish}
            onOk={commit}
        >
            <div className={styles.wrapper}>
                nicht verfügbar
            </div>
        </Modal>
    );
}