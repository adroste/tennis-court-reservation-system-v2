import { Button, Modal, Space, Table, Tooltip } from 'antd';
import { DeleteOutlined, EditOutlined, ExclamationCircleOutlined, MailOutlined } from '@ant-design/icons';
import React, { useCallback, useContext, useMemo, useState } from 'react';
import { deleteUserApi, getUsersApi, patchUserApi } from '../api';

import { ErrorResult } from '../ErrorResult';
import { authContext } from '../AuthContext';
import styles from './UserManagementPage.module.css';
import { useApi } from '../useApi';

export function UserManagementPage() {

    const { user: { userId } } = useContext(authContext);

    const [users, setUsers] = useState([]);
    const [getState,] = useApi(getUsersApi, setUsers, true);
    const [deleteState, deleteUser] = useApi(deleteUserApi, setUsers);
    const [putState, patchUser] = useApi(patchUserApi, setUsers);

    // key prop is required for antd
    const keyedUsers = useMemo(() => users.map(u => ({ ...u, key: u.userId })), [users]);

    const handleDeleteUser = useCallback(userId => {
        deleteUser({ path: { userId } }, { userId });
    }, [deleteUser]);

    const handleSetAdmin = useCallback((userId, admin) => {
        patchUser({ path: { userId } }, {
            userId,
            admin,
        });
    }, [patchUser]);

    const columns = [
        {
            title: 'UserId',
            dataIndex: 'userId',
            key: 'userId',
            width: '5%',
            sorter: (a, b) => a.userId < b.userId ? -1 : 1,
        },
        {
            title: 'Admin',
            dataIndex: 'admin',
            key: 'admin',
            width: '10%',
            sorter: (a, b) => a.admin === b.admin ? 0 : (a.admin ? -1 : 1),
            render: (_, record) => (
                <div>
                    {record.admin ? "Ja" : "Nein"}
                    <Tooltip title="Adminstatus ändern">
                        <Button
                            disabled={record.userId === userId}
                            type="link"
                            icon={<EditOutlined />}
                            onClick={() => {
                                Modal.confirm({
                                    title: record.admin ? 'Adminrechte entziehen?' : 'Adminrechte vergeben?',
                                    icon: <ExclamationCircleOutlined />,
                                    content: (
                                        <div>
                                            Der Nutzer
                                            <br />
                                            <strong>{record.name} ({record.mail})</strong>
                                            <br />
                                            wird durch diese Aktion {record.admin ? 'zu einem normalen Nutzer herabgestuft.' : 'zum Admin befördert.'}
                                        </div>
                                    ),
                                    okText: record.admin ? 'Rechte entziehen' : 'Zum Admin machen',
                                    okType: 'danger',
                                    cancelText: 'Abbrechen',
                                    onOk() {
                                        handleSetAdmin(record.userId, !record.admin);
                                    },
                                });
                            }}
                        />
                    </Tooltip>
                </div>
            )
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            width: '20%',
            sorter: (a, b) => a.name.localeCompare(b.name),
        },
        {
            title: 'E-Mail',
            dataIndex: 'mail',
            key: 'mail',
            width: '25%',
            sorter: (a, b) => a.mail.localeCompare(b.mail),
        },
        {
            title: 'Verifiziert',
            dataIndex: 'verified',
            key: 'verified',
            width: '5%',
            sorter: (a, b) => a.verified === b.verified ? 0 : (a.verified ? -1 : 1),
            render: (_, record) => record.verified ? 'Ja' : 'Nein',
        },
        {
            title: 'Letzte Aktivität',
            dataIndex: 'lastActivity',
            key: 'lastActivity',
            width: '20%',
            sorter: (a, b) => a.lastActivity - b.lastActivity,
            render: (_, record) => record.lastActivity?.format('L LT'),
        },
        {
            title: 'Reservierungen (offen)',
            dataIndex: 'upcomingReservationCount',
            key: 'upcomingReservationCount',
            width: '5%',
            sorter: (a, b) => a.upcomingReservationCount - b.upcomingReservationCount,
        },
        {
            title: 'Reservierungen (gesamt)',
            dataIndex: 'totalReservationCount',
            key: 'totalReservationCount',
            width: '5%',
            sorter: (a, b) => a.totalReservationCount - b.totalReservationCount,
        },
        {
            title: 'Aktionen',
            key: 'action',
            render: (_, record) => (
                <Space key={record._id}>
                    <Tooltip title="E-Mail senden">
                        <Button
                            type="link"
                            icon={<MailOutlined />}
                            disabled={record.userId === userId}
                            onClick={() => {
                                window.location.href = `mailto:${record.mail}`;
                            }}
                        />
                    </Tooltip>
                    <Tooltip title="Nutzer löschen">
                        <Button
                            type="link"
                            danger
                            icon={<DeleteOutlined />}
                            disabled={record.userId === userId}
                            onClick={() => {
                                Modal.confirm({
                                    title: 'Nutzer löschen?',
                                    icon: <ExclamationCircleOutlined />,
                                    content: (
                                        <>
                                            <div>Diese Aktion kann nicht rückgängig gemacht werden.</div>
                                            <div>Es werden alle Daten sowie Reservierungen unwiderruflich gelöscht.</div>
                                            <br />
                                            <div>
                                                <strong>
                                                    Nutzer: {record.name}
                                                    <br />
                                                    E-Mail: {record.mail}
                                                </strong>
                                            </div>
                                        </>
                                    ),
                                    okText: 'Unwiderruflich Löschen',
                                    okType: 'danger',
                                    cancelText: 'Abbrechen',
                                    onOk() {
                                        handleDeleteUser(record.userId);
                                    },
                                });
                            }}
                        />
                    </Tooltip>
                </Space>
            ),
        },
    ];

    if (getState.error || deleteState.error || putState.error)
        return <ErrorResult />

    return (
        <div className={styles.wrapper}>
            <h1>Nutzerverwaltung</h1>
            <Table
                columns={columns}
                dataSource={keyedUsers}
                loading={getState.loading || deleteState.loading || putState.loading}
                scroll={{ x: 1300 }}
            />
        </div>
    )
}