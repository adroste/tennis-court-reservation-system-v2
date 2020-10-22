import { BulbOutlined, CalendarOutlined, CarryOutOutlined, SettingOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Menu } from 'antd';
import React, { useCallback } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

import styles from './MainMenu.module.css';

export function MainMenu({
    horizontal = false
}) {
    const { pathname } = useLocation();
    const history = useHistory();

    const handleClick = useCallback(({ key }) => {
        if (pathname !== key)
            history.push(key);
    }, [history, pathname]);

    /* Keys of Menu.Items match with the corresponding routes
     * in RouterSwitch to be able to map location.pathname directly
     * with the Menu.Item for that route => used to highlight the current item
     * via selectedKeys prop
     */
    return (
        <>
            <Menu
                className={styles.leftMenu}
                mode={horizontal ? 'horizontal' : 'inline'}
                theme='light'
                selectedKeys={[pathname]}
                onClick={handleClick}
            >
                <Menu.Item key="/" icon={<CalendarOutlined />}>
                    Reservierungskalender
                </Menu.Item>
                <Menu.Item key="/myreservations" icon={<CarryOutOutlined />}>
                    Meine Reservierungen
                </Menu.Item>
                <Menu.Item key="/info" icon={<BulbOutlined />}>
                    Hinweise
                </Menu.Item>
                <Menu.SubMenu
                    key="/admin"
                    title="Verwaltung"
                    icon={<SettingOutlined />}
                >
                    <Menu.Item key="/admin/users">
                        Nutzerverwaltung
                    </Menu.Item>
                    <Menu.Item key="/admin/reservations">
                        Reservierungsverwaltung
                    </Menu.Item>
                    <Menu.Item key="/admin/texts">
                        Textbausteine
                    </Menu.Item>
                </Menu.SubMenu>
            </Menu>
            <Menu
                className={styles.rightMenu}
                mode={horizontal ? 'horizontal' : 'inline'}
                theme='light'
                selectedKeys={[pathname]}
                onClick={handleClick}
            >
                <Menu.Item key="/myaccount" icon={<UserOutlined />}>
                    Mein Benutzerkonto
                </Menu.Item>
            </Menu>
            <Button
                className={styles.menuButton}
                style={{ marginLeft: horizontal ? 20 : 24 }}
            >
                Abmelden
            </Button>
        </>
    );
}