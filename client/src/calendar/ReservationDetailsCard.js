import React, { useCallback, useContext } from 'react';

import { Card } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import { ReservationDetails } from './ReservationDetails';
import { appContext } from '../AppContext';
import { authContext } from '../AuthContext';
import { getCourtName } from '../helper';
import styles from './ReservationDetailsCard.module.css';

export function ReservationDetailsCard({
    reservation,
    onEditClick,
}) {
    const { user } = useContext(authContext);
    const { courts } = useContext(appContext);

    const { from, to, courtId, name, text } = reservation;


    const handleEditClick = useCallback(() => {
        onEditClick(reservation);
    }, [reservation, onEditClick]);

    return (
        <Card
            className={styles.card}
            actions={[
                <div 
                    className={styles.editButton}
                    onClick={handleEditClick}
                >
                    <EditOutlined /> Bearbeiten
                </div>
            ]}
        >
            <ReservationDetails
                court={getCourtName(courts, courtId)}
                date={from.format('dd[\xa0]L')}
                inline
                name={text || (user?.name !== name && name)}
                time={`${from.format('H')} Uhr bis ${to.format('H')} Uhr`}
            />
        </Card>
    );
}