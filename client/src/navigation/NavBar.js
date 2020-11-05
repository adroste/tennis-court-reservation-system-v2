import { Button, Drawer, Layout, Typography } from 'antd';
import React, { useCallback, useContext, useState } from 'react';

import { MainMenu } from './MainMenu';
import { MenuOutlined } from '@ant-design/icons';
import { appContext } from '../AppContext';
import styles from './NavBar.module.css';

export function NavBar() {
    const { title } = useContext(appContext);

    const [drawerOpen, setDrawerOpen] = useState(false);

    const openMenu = useCallback(() => setDrawerOpen(true), []);
    const closeDrawer = useCallback(() => setDrawerOpen(false), []);

    return (
        <Layout.Header className={styles.header}>
            <div className={styles.title}>
                <h1>
                    {title}
                </h1>
                <Typography.Text type="secondary">
                    Reservierungssystem
                </Typography.Text>
            </div>
            <div className={styles.horizontalMenuWrapper}>
                <MainMenu horizontal />
            </div>
            <div className={styles.drawerMenuWrapper}>
                <Button
                    type="text"
                    icon={<MenuOutlined />}
                    onClick={openMenu}
                />
                <Drawer
                    title={`${title}\nReservierungssystem`}
                    visible={drawerOpen}
                    width={300}
                    className={styles.drawer}
                    onClose={closeDrawer}
                >
                    <MainMenu />
                </Drawer>
            </div>
        </Layout.Header>
    );
}