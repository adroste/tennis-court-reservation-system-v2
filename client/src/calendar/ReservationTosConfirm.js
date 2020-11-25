import React, { useContext } from 'react';

import { Modal } from 'antd';
import { appContext } from '../AppContext';

export function ReservationTosConfirm({
    onCancel,
    onOk,
}) {
    const { templates: { reservationTos } } = useContext(appContext);

    return (
        <Modal
            visible={true}
            width={600}
            centered
            onCancel={onCancel}
            onOk={onOk}
            cancelText="Abbrechen"
            okText="Akzeptieren"
        >
            <div dangerouslySetInnerHTML={{ __html: reservationTos.body }} />
        </Modal>
    );
}