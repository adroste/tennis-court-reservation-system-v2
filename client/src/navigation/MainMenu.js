import { BulbOutlined, CalendarOutlined, CarryOutOutlined, LogoutOutlined, SettingOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Menu } from 'antd';

import React from 'react';
import styles from './MainMenu.module.css';

export function MainMenu({
    horizontal = false
}) {
    return (
        <>
            <Menu
                className={styles.leftMenu}
                mode={horizontal ? 'horizontal' : 'inline'}
                theme='light'
            >
                <Menu.Item icon={<CalendarOutlined />}>
                    Reservierungskalender
                </Menu.Item>
                <Menu.Item icon={<CarryOutOutlined />}>
                    Meine Reservierungen
                </Menu.Item>
                <Menu.Item icon={<BulbOutlined />}>
                    Hinweise
                </Menu.Item>
                <Menu.SubMenu
                    title="Verwaltung"
                    icon={<SettingOutlined />}
                >
                    <Menu.Item>
                        A
                    </Menu.Item>
                    <Menu.Item>
                        B
                    </Menu.Item>
                </Menu.SubMenu>
            </Menu>
            <Menu
                className={styles.rightMenu}
                mode={horizontal ? 'horizontal' : 'inline'}
                theme='light'
            >
                <Menu.Item icon={<UserOutlined />}>
                    Mein Benutzerkonto
                </Menu.Item>
                <Button
                    style={{ marginLeft: horizontal ? 20 : 24 }}
                >
                    Abmelden
                </Button>
            </Menu>
        </>
    );
}