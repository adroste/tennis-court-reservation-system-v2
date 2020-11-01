import { ConfigProvider, Layout } from 'antd';
import { Link, BrowserRouter as Router } from 'react-router-dom';

import { NavBar } from './navigation/NavBar';
import React from 'react';
import { RouterSwitch } from './navigation/RouterSwitch';
import locale from 'antd/lib/locale/de_DE';
import styles from './App.module.css';

function App() {

    const title = "Tennisclub Braunlage";
    // const title = "WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW";

    return (
        <ConfigProvider locale={locale}>
            <Router>
                <Layout>
                    <NavBar
                        title={title}
                    />
                    <Layout.Content className={styles.content}>
                        <RouterSwitch />
                    </Layout.Content>
                    <Layout.Footer className={styles.footer}>
                        <p>
                            <Link to="/imprint-privacy">Impressum / Datenschutz</Link>
                        </p>
                        <p>
                            ©2020 {title} - entwickelt von <a target="_blank" rel="noopener noreferrer" href="https://github.com/alexdroste/reservierungssystem-tennis-v2">Alexander&nbsp;Droste</a>
                        </p>
                    </Layout.Footer>
                </Layout>
            </Router>
        </ConfigProvider>
    );
}

export default App;
