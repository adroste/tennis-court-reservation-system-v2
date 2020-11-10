import React, { useContext } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import { CalendarPage } from '../calendar/CalendarPage';
import { GeneralSettingsPage } from '../admin/GeneralSettingsPage';
import { InfoPage } from '../other/InfoPage';
import { LegalPrivacyPage } from '../other/LegalPrivacyPage';
import { LoginPage } from '../user/LoginPage';
import { MyAccountPage } from '../user/MyAccountPage';
import { MyReservationsPage } from '../calendar/MyReservationsPage';
import { ProtectedRoute } from './ProtectedRoute';
import { TextBlocksPage } from '../admin/TextBlocksPage';
import { authContext } from '../AuthContext';

export function RouterSwitch() {

    const { admin, loggedIn } = useContext(authContext);

    return (
        <Switch>

            <Route exact path="/">
                <CalendarPage />
            </Route>

            <Route exact path="/info">
                <InfoPage />
            </Route>

            <Route exact path="/legalnotice-privacy">
                <LegalPrivacyPage />
            </Route>

            <Route path="/login"
                render={() => 
                    loggedIn 
                        ? <Redirect to="/" />
                        : <LoginPage />
                }
            />

            <ProtectedRoute condition={admin} path="/admin/general">
                <GeneralSettingsPage />
            </ProtectedRoute>

            <ProtectedRoute condition={admin} exact path="/admin/users">
                Verwaltung: User
            </ProtectedRoute>

            <ProtectedRoute condition={admin} exact path="/admin/texts">
                <TextBlocksPage />
            </ProtectedRoute>

            <ProtectedRoute condition={loggedIn} exact path="/myreservations">
                <MyReservationsPage />
            </ProtectedRoute>

            <ProtectedRoute condition={loggedIn} path="/myaccount">
                <MyAccountPage />
            </ProtectedRoute>

            <Route path="*">
                <Redirect to="/" />
            </Route>

        </Switch>
    );
}