import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import React, { useCallback, useContext } from 'react';

import { Button } from 'antd';
import { ReservationDetails } from './ReservationDetails';
import { appContext } from '../AppContext';
import { authContext } from '../AuthContext';
import styles from './ReservationDetailsCard.module.css';

export function ReservationDetailsCard({
    groupDates,
    reservation,
    onEditClick,
}) {
    const { user } = useContext(authContext);
    const { courts } = useContext(appContext);

    const { date, courtId, name, customName } = reservation;

    const courtName = courts.find(c => c.courtId === courtId)?.name;

    const handleEditClick = useCallback(() => {
        onEditClick(reservation);
    }, [reservation, onEditClick]);

    return (
        <div className={styles.card}>
            <Button
                className={styles.editButton}
                type="link"
                onClick={handleEditClick}
            >
                <EditOutlined /> | <DeleteOutlined />
            </Button>

            <ReservationDetails
                autoHideName
                date={date}
                courtName={courtName}
                groupDates={groupDates}
                name={customName || (user?.name !== name && name)}
                showFollowUpDate
            />
        </div>
    );
}