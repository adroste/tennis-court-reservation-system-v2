import React, { useContext } from 'react';

import { LoginModal } from '../user/LoginModal';
import { ReservationGroupModal } from './ReservationGroupModal';
import { VerifyMailModal } from '../user/VerifyMailModal';
import { authContext } from '../AuthContext';

export function ReservationModal(props) {
    
    const { user } = useContext(authContext);
    const { onFinish } = props;

    if (!user)
        return <LoginModal onClose={onFinish} />

    if (!user.verified)
        return <VerifyMailModal onClose={onFinish} />

    return <ReservationGroupModal {...props} />;
}