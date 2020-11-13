import React, { useContext } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import { CalendarPage } from '../calendar/CalendarPage';
import { GeneralSettingsPage } from '../admin/GeneralSettingsPage';
import { InfoPage } from '../other/InfoPage';
import { LegalPrivacyPage } from '../other/LegalPrivacyPage';
import { LoginPage } from '../user/LoginPage';
import { LogoutPage } from '../user/LogoutPage';
import { MyAccountPage } from '../user/MyAccountPage';
import { MyReservationsPage } from '../calendar/MyReservationsPage';
import { ProtectedRoute } from './ProtectedRoute';
import { RegisterPage } from '../user/RegisterPage';
import { StatsPage } from '../admin/StatsPage';
import { TextBlocksPage } from '../admin/TextBlocksPage';
import { authContext } from '../AuthContext';

export function RouterSwitch() {

    const { user } = useContext(authContext);

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

            <Route exact path="/logout">
                <LogoutPage />
            </Route>

            <Route exact path="/login">
                <LoginPage />
            </Route>

            <Route exact path="/register"
                render={() =>
                    user
                        ? <Redirect to="/" />
                        : <RegisterPage />
                }
            />

            <ProtectedRoute condition={user?.admin} exact path="/admin/general">
                <GeneralSettingsPage />
            </ProtectedRoute>

            <ProtectedRoute condition={user?.admin} exact path="/admin/stats">
                <StatsPage />
            </ProtectedRoute>

            <ProtectedRoute condition={user?.admin} exact path="/admin/users">
                Verwaltung: User
            </ProtectedRoute>

            <ProtectedRoute condition={user?.admin} exact path="/admin/texts">
                <TextBlocksPage />
            </ProtectedRoute>

            <ProtectedRoute condition={user} exact path="/myreservations">
                <MyReservationsPage />
            </ProtectedRoute>

            <ProtectedRoute condition={user} exact path="/myaccount">
                <MyAccountPage />
            </ProtectedRoute>

            <Route path="*">
                <Redirect to="/" />
            </Route>

        </Switch>
    );
}