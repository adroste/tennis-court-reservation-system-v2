import { Button, Modal, Space, Table, Tooltip } from 'antd';
import { DeleteOutlined, EditOutlined, ExclamationCircleOutlined, MailOutlined } from '@ant-design/icons';
import React, { useCallback, useContext, useEffect, useState } from 'react';

import { authContext } from '../AuthContext';
import dayjs from 'dayjs';
import styles from './UserManagementPage.module.css';

export function UserManagementPage() {

    const { user: { userId } } = useContext(authContext);

    const [userList, setUserList] = useState([]);

    const refreshUserList = useCallback(() => {
        setUserList([
            {
                key: '3', // required by antd table
                userId: '3',
                name: 'Jürgen M.',
                mail: 'juergen@example.com',
                admin: true,
                lastActivity: dayjs().subtract(4, 'days'),
                upcomingReservationCount: 3,
                totalReservationCount: 41,
            },
            {
                key: '1', // required by antd table
                userId: 1,
                name: 'Müller',
                mail: 'mueller@example.com',
                admin: true,
                lastActivity: dayjs().subtract(1, 'm'),
                upcomingReservationCount: 3,
                totalReservationCount: 41,
            },
            {
                key: '41', // required by antd table
                userId: '41',
                name: 'Franz Test',
                mail: 'test.franz.mein.mail@franz.de',
                admin: false,
                lastActivity: dayjs().subtract(3, 'h'),
                upcomingReservationCount: 0,
                totalReservationCount: 140,
            }
        ])
    }, []);

    // const deleteUser = useCallback(userId => {
    //     console.log('delete user', userId);
    //     refreshUserList()
    // }, [refreshUserList]);

    useEffect(() => {
        refreshUserList();
    }, [refreshUserList]);


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
                                        console.log('OK');
                                    },
                                    onCancel() {
                                        console.log('Cancel');
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
            title: 'Letzte Aktivität',
            dataIndex: 'lastActivity',
            key: 'lastActivity',
            width: '20%',
            sorter: (a, b) => a.lastActivity - b.lastActivity,
            render: (_, record) => record.lastActivity?.format('L LT')
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
                                        console.log('OK');
                                    },
                                    onCancel() {
                                        console.log('Cancel');
                                    },
                                });
                            }}
                        />
                    </Tooltip>
                </Space>
            ),
        },
    ];

    return (

        <div className={styles.wrapper}>
            <h1>Nutzerverwaltung</h1>
            <Table
                columns={columns}
                dataSource={userList}
                scroll={{ x: 1300 }}
            />
        </div>
    )
}