import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import React, { useCallback } from 'react';

import { Button } from 'antd';
import { ReservationDetails } from './ReservationDetails';
import styles from './ReservationDetailsCard.module.css';

export function ReservationDetailsCard({
    groupDates,
    reservation,
    onEditClick,
}) {
    const { date, court, name, customName } = reservation;

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
                court={court}
                groupDates={groupDates}
                name={customName || name}
                showAllDates
            />
        </div>
    );
}