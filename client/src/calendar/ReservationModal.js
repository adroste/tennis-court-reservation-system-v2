import React, { useContext } from 'react';

import { DisableReservationGroupModal } from './DisableReservationGroupModal';
import { LoginModal } from '../user/LoginModal';
import { RESERVATION_TYPES } from '../ReservationTypes';
import { ReservationGroupModal } from './ReservationGroupModal';
import { VerifyMailModal } from '../user/VerifyMailModal';
import { authContext } from '../AuthContext';

export function ReservationModal(props) {
    
    const { user } = useContext(authContext);
    const { onFinish, reservation, type } = props;

    if (!user)
        return <LoginModal onClose={onFinish} />

    if (!user.verified)
        return <VerifyMailModal onClose={onFinish} />

    if (reservation?.type === RESERVATION_TYPES.DISABLE || type === RESERVATION_TYPES.DISABLE)
        return <DisableReservationGroupModal {...props} />;

    return <ReservationGroupModal {...props} />;
}