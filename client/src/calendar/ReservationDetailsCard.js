import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import React, { useCallback, useContext } from 'react';

import { Button } from 'antd';
import { ReservationDetails } from './ReservationDetails';
import { appContext } from '../AppContext';
import styles from './ReservationDetailsCard.module.css';

export function ReservationDetailsCard({
    groupDates,
    reservation,
    onEditClick,
}) {
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
                type="primary"
                onClick={handleEditClick}
            >
                <EditOutlined /> | <DeleteOutlined />
            </Button>

            <ReservationDetails
                small
                date={date}
                courtName={courtName}
                groupDates={groupDates}
                name={customName || name}
                showAllDates
            />
        </div>
    );
}