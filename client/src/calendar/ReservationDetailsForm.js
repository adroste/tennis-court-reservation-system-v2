import { Button, Input, Radio } from 'antd';
import { DownOutlined, EditOutlined } from '@ant-design/icons';
import React, { useCallback, useContext, useState } from 'react';

import { DatePicker } from './DatePicker';
import { RepeatReservationForm } from './RepeatReservationForm';
import { ReservationDetails } from './ReservationDetails';
import { ReservationTimeSelect } from './ReservationTimeSelect';
import { ScrollRadioGroup } from './ScrollRadioGroup';
import { appContext } from '../AppContext';
import { authContext } from '../AuthContext';
import styles from './ReservationDetailsForm.module.css';

export function ReservationDetailsForm({
    courtId,
    currentReservations,
    disabled,
    from,
    onCourtIdChange,
    onFromChange,
    onReservationsChange,
    onTextChange,
    onToChange,
    readOnly,
    text,
    to,
    unavailableReservations,
}) {
    const { courts } = useContext(appContext);
    const { user } = useContext(authContext);

    const [editName, setEditName] = useState(false);
    const handleEditName = useCallback(() => {
        setEditName(true);
    }, []);

    const handleCancelEditName = useCallback(() => {
        setEditName(false);
        onTextChange(null);
    }, [onTextChange]);

    const handleDateChange = useCallback(date => {
        const diff = Math.abs(to.diff(from, 'hour'));
        const newFrom = date.hour(from.hour());
        const newTo = newFrom.add(diff, 'hour');
        onFromChange(newFrom);
        onToChange(newTo);
    }, [from, to, onFromChange, onToChange]);

    const handleTextChange = useCallback(e => {
        onTextChange(e.target.value);
    }, [onTextChange]);

    const handleCourtIdChange = useCallback(e => {
        onCourtIdChange(e.target.value);
    }, [onCourtIdChange]);

    if (readOnly)
        return (
            <ReservationDetails
                court={
                    <div className={styles.plain}>
                        {getCourtName(courts, courtId)}
                    </div>
                }
                date={
                    <div className={styles.plain}>
                        {from.format('dd[\xa0]L')}
                    </div>
                }
                time={
                    <div className={styles.plain}>
                        {from.format('H')} Uhr bis {to.format('H')} Uhr
                    </div>
                }
                name={
                    <div className={styles.plain}>
                        {currentReservations?.[0]?.text || currentReservations?.[0]?.name || user.name}
                    </div>
                }
            />

        );

    return (
        <ReservationDetails
            court={
                <ScrollRadioGroup
                    disabled={disabled}
                    onChange={handleCourtIdChange}
                    value={courtId}
                >
                    {courts.map(({ courtId, name }) => (
                        <Radio.Button key={courtId} value={courtId}>{name}</Radio.Button>
                    ))}
                </ScrollRadioGroup>
            }
            date={
                <DatePicker
                    allowClear={false}
                    bordered={false}
                    className={styles.datePicker}
                    disabled={disabled}
                    format="L"
                    onChange={handleDateChange}
                    showToday={false}
                    suffixIcon={<DownOutlined />}
                    value={from}
                />
            }
            time={
                <ReservationTimeSelect
                    from={from}
                    to={to}
                    onFromChange={onFromChange}
                    onToChange={onToChange}
                />
            }
            name={editName ?
                (
                    <>
                        <Input
                            className={styles.nameInput}
                            disabled={disabled}
                            onChange={handleTextChange}
                            placeholder="z.B. Training, ..."
                            value={text}
                            size="large"
                        />
                        <Button
                            disabled={disabled}
                            onClick={handleCancelEditName}
                            type='link'
                        >
                            abbrechen
                        </Button>
                    </>
                ) : (
                    <>
                        <div className={styles.plain}>
                            <span>
                                {currentReservations?.[0]?.text || currentReservations?.[0]?.name || user.name}
                            </span>
                        </div>
                        {user.admin &&
                            <Button
                                disabled={disabled}
                                onClick={handleEditName}
                                type='link'
                            >
                                <EditOutlined /> bearbeiten
                            </Button>
                        }
                    </>
                )
            }
            repeat={
                <RepeatReservationForm
                    from={from}
                    to={to}
                    disabled={disabled}
                    onChange={onReservationsChange}
                    currentReservations={currentReservations}
                    unavailableReservations={unavailableReservations}
                />
            }
        />
    );
}