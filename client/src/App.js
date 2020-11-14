import React, { useContext } from 'react';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';

import { Ball } from './Ball';
import { CookieNotice } from './CookieNotice';
import { Footer } from './Footer';
import { KioskPage } from './kiosk/KioskPage';
import { Layout } from 'antd';
import { NavBar } from './navigation/NavBar';
import { RouterSwitch } from './navigation/RouterSwitch';
import { appContext } from './AppContext';
import styles from './App.module.css';

function App() {
    const appData = useContext(appContext);

    const basename = process.env.PUBLIC_URL;

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
            <Router basename={basename}>
                <Layout>
                    <Switch>

                        <Route exact path="/kiosk">
                            <Layout.Content className={styles.content}>
                                <KioskPage />
                            </Layout.Content>
                            <Layout.Footer className={styles.footer}>
                                <Footer noLinks />
                            </Layout.Footer>
                        </Route>

                        <Route path="*">

                            <NavBar />
                            <Layout.Content className={styles.content}>
                                <RouterSwitch />
                            </Layout.Content>
                            <Layout.Footer className={styles.footer}>
                                <Footer />
                            </Layout.Footer>
                            <CookieNotice />

                        </Route>

                    </Switch>
                </Layout>
            </Router>
        </>
    );
}

export default App;
