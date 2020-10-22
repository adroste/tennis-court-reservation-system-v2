import { Link, BrowserRouter as Router } from 'react-router-dom';

import { Layout } from 'antd';
import { NavBar } from './navigation/NavBar';
import React from 'react';
import { RouterSwitch } from './navigation/RouterSwitch';

function App() {

    const title = "Tennisclub Braunlage";

    return (
        <Router>
            <Layout>
                <NavBar 
                    title={title}
                />
                <Layout.Content
                    style={{ marginTop: 64 }}
                >
                    <RouterSwitch />
                </Layout.Content>
                <Layout.Footer 
                    style={{ textAlign: 'center' }}
                >
                    <p>
                        <Link to="/imprint-privacy">Impressum / Datenschutz</Link>
                    </p>
                    <p>
                        ©2020 {title} - entwickelt von <a target="_blank" rel="noopener noreferrer" href="https://github.com/alexdroste/reservierungssystem-tennis-v2">Alexander&nbsp;Droste</a>
                    </p>
                </Layout.Footer>
            </Layout>
        </Router>
    );
}

export default App;
