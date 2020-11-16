import { BulbOutlined, CalendarOutlined, CarryOutOutlined, SettingOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Menu } from 'antd';
import React, { useCallback, useContext } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

import { authContext } from '../AuthContext';
import classNames from 'classnames/bind';
import styles from './MainMenu.module.css';

const cn = classNames.bind(styles);

export function MainMenu({
    horizontal = false,
    onClick,
}) {
    const { user } = useContext(authContext);
    const { pathname } = useLocation();
    const history = useHistory();

    const handleClick = useCallback(({ key }) => {
        if (onClick)
            onClick(key);
        if (pathname !== key)
            history.push(key);
    }, [history, pathname, onClick]);

    const handleLoginClick = useCallback(() => {
        handleClick({ key: '/login' });
    }, [handleClick]);

    const handleRegisterClick = useCallback(() => {
        handleClick({ key: '/register' });
    }, [handleClick]);

    const handleLogoutClick = useCallback(() => {
        handleClick({ key: '/logout' });
    }, [handleClick]);

    /* Keys of Menu.Items match with the corresponding routes
     * in RouterSwitch to be able to map location.pathname directly
     * with the Menu.Item for that route => used to highlight the current item
     * via selectedKeys prop
     */
    return (
        <>
            <Menu
                className={cn({
                    menu: true,
                    horizontal
                })}
                mode={horizontal ? 'horizontal' : 'inline'}
                theme='light'
                selectedKeys={[pathname]}
                onClick={handleClick}
            >
                <Menu.Item key="/" icon={<CalendarOutlined />}>
                    Reservierungskalender
                </Menu.Item>

                {user &&
                    <Menu.Item key="/myreservations" icon={<CarryOutOutlined />}>
                        Meine Reservierungen
                    </Menu.Item>
                }

                <Menu.Item key="/info" icon={<BulbOutlined />}>
                    Hinweise
                </Menu.Item>

                {user?.admin &&
                    <Menu.SubMenu
                        key="/admin"
                        title="Verwaltung"
                        icon={<SettingOutlined />}
                    >
                        <Menu.Item key="/admin/general">
                            Allgemein
                        </Menu.Item>
                        <Menu.Item key="/admin/stats">
                            Statistiken
                        </Menu.Item>
                        <Menu.Item key="/admin/users">
                            Nutzerverwaltung
                        </Menu.Item>
                        <Menu.Item key="/admin/templates">
                            Textvorlagen
                        </Menu.Item>
                    </Menu.SubMenu>
                }

                <span key="stretch" className={styles.stretch} />

                {user &&
                    <Menu.Item key="/myaccount" icon={<UserOutlined />}>
                        Mein Benutzerkonto
                    </Menu.Item>
                }
            </Menu>

            {user &&
                <Button
                    className={cn({
                        menuButton: true,
                        horizontal,
                    })}
                    onClick={handleLogoutClick}
                >
                    Abmelden
                </Button>
            }

            {!user &&
                <Button
                    className={cn({
                        menuButton: true,
                        horizontal,
                    })}
                    onClick={handleLoginClick}
                >
                    Anmelden
                </Button>
            }

            {!user &&
                <Button
                    className={cn({
                        menuButton: true,
                        horizontal,
                    })}
                    type="primary"
                    onClick={handleRegisterClick}
                >
                    Kostenlos Registrieren
                </Button>
            }
        </>
    );
}