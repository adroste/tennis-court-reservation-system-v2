import React, { useContext } from 'react';

import { Ball } from './Ball';
import { CookieNotice } from './CookieNotice';
import { Footer } from './Footer';
import { Layout } from 'antd';
import { NavBar } from './navigation/NavBar';
import { BrowserRouter as Router } from 'react-router-dom';
import { RouterSwitch } from './navigation/RouterSwitch';
import { appContext } from './AppContext';
import styles from './App.module.css';

function App() {
    const appData = useContext(appContext);

    if (!appData)
        return (
            <Ball
                visible={!appData}
                preloader
                spin
            />
        );

    return (
        <>
            <Router>
                <Layout>
                    <NavBar />
                    <Layout.Content className={styles.content}>
                        <RouterSwitch />
                    </Layout.Content>
                    <Layout.Footer className={styles.footer}>
                        <Footer />
                    </Layout.Footer>
                </Layout>
            </Router>
            <CookieNotice />
        </>
    );
}

export default App;
