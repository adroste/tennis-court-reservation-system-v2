import { Button, Drawer, Layout, Typography } from 'antd';

import { MainMenu } from './MainMenu';
import React from 'react';
import styles from './NavBar.module.css';

export function NavBar() {

    const title = "Tennisclub Braunlage Grün-Weiß e.V.".substr(0, 20);

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
            <MainMenu horizontal />
            <Drawer
                title={`${title}\nReservierungssystem`}
                visible={false}
                width={300}
                className={styles.drawer}
            >
                <MainMenu />
            </Drawer>

        </Layout.Header>
    );
}