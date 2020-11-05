import { Empty, Typography } from 'antd';
import React, { useCallback, useState } from 'react';

import { ReservationDetailsCard } from './ReservationDetailsCard';
import { ReservationModal } from './ReservationModal';
import styles from './MyReservationsPage.module.css';
import { useUserReservations } from './useReservations';

function getGroupDates(myReservations, reservation) {
    if (!reservation?.groupId)
        return null;
    return myReservations
        .filter(r => r.groupId === reservation.groupId)
        .map(r => r.date);
}

export function MyReservationsPage() {

    const [selectedReservation, setSelectedReservation] = useState();

    // const myReservations = useUserReservations(3);
    const myReservations = useUserReservations(1);
    // const myReservations = [];

    const handleEditClick = useCallback(reservation => {
        setSelectedReservation(reservation);
    }, []);

    const handleReservationEditFinish = useCallback(() => {
        setSelectedReservation(null);
    }, []);

    return (
        <div className={styles.wrapper}>
            {!myReservations?.length &&
                <div className={styles.content}>
                    <Empty
                        className={styles.empty}
                        description="Keine Reservierungen"
                    />
                </div>
            }

            {myReservations?.length > 0 &&
                <>
                    <Typography.Title level={2}>Nächster Termin</Typography.Title>
                    <div className={styles.content}>
                        <ReservationDetailsCard
                            reservation={myReservations[0]}
                            groupDates={getGroupDates(myReservations, myReservations[0])}
                            onEditClick={handleEditClick}
                        />
                    </div>
                </>
            }

            {myReservations?.length > 1 &&
                <>
                    <Typography.Title level={2}>Weitere Termine</Typography.Title>
                    <div className={styles.content}>
                        {myReservations.map((reservation, i) => {
                            if (i === 0)
                                return null;
                            return (
                                <ReservationDetailsCard
                                    reservation={reservation}
                                    groupDates={getGroupDates(myReservations, reservation)}
                                    onEditClick={handleEditClick}
                                />
                            );
                        })}
                    </div>
                </>
            }

            {selectedReservation &&
                <ReservationModal
                    date={selectedReservation?.date}
                    court={selectedReservation?.court}
                    reservation={selectedReservation}
                    onFinish={handleReservationEditFinish}
                />
            }
        </div>
    );
}