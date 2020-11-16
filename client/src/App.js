import React, { Suspense, lazy, useContext } from 'react';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';

import { Ball } from './Ball';
import { CookieNotice } from './CookieNotice';
import { ErrorResult } from './ErrorResult';
import { Footer } from './Footer';
import { Layout } from 'antd';
import { NavBar } from './navigation/NavBar';
import { RouterSwitch } from './navigation/RouterSwitch';
import { appContext } from './AppContext';
import styles from './App.module.css';

const KioskPage = lazy(() => import('./kiosk/KioskPage').then(m => ({ default: m.KioskPage })));
const DemoControls = lazy(() => import('./demo/DemoControls').then(m => ({ default: m.DemoControls })));

function App() {
    const { state } = useContext(appContext);

    const basename = process.env.PUBLIC_URL;
    const demoMode = process.env.REACT_APP_DEMO;

    if (state.error)
        return (
            <ErrorResult />
        );

    if (state.loading)
        return (
            <Ball
                visible
                preloader
                spin
            />
        );

    return (
        <Router basename={basename}>
            <Layout>
                <Suspense fallback={<Ball visible preloader spin />}>

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

                    {demoMode && <DemoControls />}

                </Suspense>
            </Layout>
        </Router>
    );
}

export default App;
