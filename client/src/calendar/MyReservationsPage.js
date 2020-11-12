import React, { useCallback, useContext, useState } from 'react';

import { Empty } from 'antd';
import { ReservationDetailsCard } from './ReservationDetailsCard';
import { ReservationModal } from './ReservationModal';
import { authContext } from '../AuthContext';
import styles from './MyReservationsPage.module.css';
import { useToday } from './useToday';
import { useUserReservations } from './useReservations';

function getGroupDates(myReservations, reservation) {
    if (!reservation?.groupId)
        return null;
    return myReservations
        .filter(r => r.groupId === reservation.groupId)
        .map(r => r.date);
}

export function MyReservationsPage() {

    const { user: { userId } } = useContext(authContext);

    const today = useToday();
    const [selectedReservation, setSelectedReservation] = useState();

    const myReservations = useUserReservations(today, userId);

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
                    <h1>Nächster Termin</h1>
                    <div className={styles.content}>
                        <ReservationDetailsCard
                            key={myReservations[0].id}
                            reservation={myReservations[0]}
                            groupDates={getGroupDates(myReservations, myReservations[0])}
                            onEditClick={handleEditClick}
                        />
                    </div>
                </>
            }

            {myReservations?.length > 1 &&
                <>
                    <h1>Weitere Termine</h1>
                    <div className={styles.content}>
                        {myReservations.map((reservation, i) => {
                            if (i === 0)
                                return null;
                            return (
                                <ReservationDetailsCard
                                    key={reservation.id}
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
                    courtId={selectedReservation?.courtId}
                    reservation={selectedReservation}
                    onFinish={handleReservationEditFinish}
                />
            }
        </div>
    );
}