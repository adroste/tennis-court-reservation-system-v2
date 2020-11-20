import { Button, Modal, Result } from 'antd';
import React, { useCallback, useContext } from 'react';

import { authContext } from '../AuthContext';
import styles from './VerifyMailModal.module.css';
import { useHistory } from 'react-router-dom';

export function VerifyMailModal({
    onClose
}) {
    const { user } = useContext(authContext);
    const history = useHistory();

    const handleChangeMailClick = useCallback(() => {
        history.push('/profile');
    }, [history]);
    
    const handleResendMail = useCallback(() => {
        history.push('/verify-mail/send');
    }, [history]);

    return (
        <Modal
            title="E-Mail nicht verifiziert"
            visible={true}
            centered
            width={580}
            onCancel={onClose}
            onOk={onClose}
            footer={null}
        >
            <Result
                status="warning"
                title="Bitte bestätigen Sie Ihre E-Mail Adresse"
                extra={
                    <div>
                        <div>
                            Klicken Sie auf den Bestätigungslink, den Sie bei Ihrer Registrierung an <strong>{user?.mail}</strong> erhalten haben.
                        </div>
                        <div className={styles.buttons}>
                            <Button type="primary" onClick={handleResendMail}>
                                Bestätigungslink erneut senden
                            </Button>
                            <Button type="link" onClick={handleChangeMailClick}>
                                E-Mail Adresse ändern
                            </Button>
                        </div>
                    </div>
                }
            />
        </Modal>
    );
}