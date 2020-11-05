import { ConfigProvider, Layout } from 'antd';

import { AppContextProvider } from './AppContext';
import { Footer } from './Footer';
import { NavBar } from './navigation/NavBar';
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { RouterSwitch } from './navigation/RouterSwitch';
import locale from 'antd/lib/locale/de_DE';
import styles from './App.module.css';

function App() {
    return (
        <ConfigProvider locale={locale}>
            <AppContextProvider>
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
            </AppContextProvider>
        </ConfigProvider>
    );
}

export default App;
