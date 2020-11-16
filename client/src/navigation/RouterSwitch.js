import React, { Suspense, lazy, useContext } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import { Ball } from '../Ball';
import { ProtectedRoute } from './ProtectedRoute';
import { authContext } from '../AuthContext';

const CalendarPage = lazy(() => import('../calendar/CalendarPage').then(m => ({ default: m.CalendarPage })));
const GeneralSettingsPage = lazy(() => import('../admin/GeneralSettingsPage').then(m => ({ default: m.GeneralSettingsPage })));
const InfoPage = lazy(() => import('../other/InfoPage').then(m => ({ default: m.InfoPage })));
const LegalPrivacyPage = lazy(() => import('../other/LegalPrivacyPage').then(m => ({ default: m.LegalPrivacyPage })));
const LoginPage = lazy(() => import('../user/LoginPage').then(m => ({ default: m.LoginPage })));
const LogoutPage = lazy(() => import('../user/LogoutPage').then(m => ({ default: m.LogoutPage })));
const VerifyMailPage = lazy(() => import('../user/VerifyMailPage').then(m => ({ default: m.VerifyMailPage })));
const MyAccountPage = lazy(() => import('../user/MyAccountPage').then(m => ({ default: m.MyAccountPage })));
const MyReservationsPage = lazy(() => import('../calendar/MyReservationsPage').then(m => ({ default: m.MyReservationsPage })));
const RegisterPage = lazy(() => import('../user/RegisterPage').then(m => ({ default: m.RegisterPage })));
const StatsPage = lazy(() => import('../admin/StatsPage').then(m => ({ default: m.StatsPage })));
const EditTemplatesPage = lazy(() => import('../admin/EditTemplatesPage').then(m => ({ default: m.EditTemplatesPage })));
const UserManagementPage = lazy(() => import('../admin/UserManagementPage').then(m => ({ default: m.UserManagementPage })));

export function RouterSwitch() {

    const { user } = useContext(authContext);

    return (
        <Suspense fallback={<Ball visible large centered spin />}>
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

                <Route path="/verifymail/:verifyKey">
                    <VerifyMailPage />
                </Route>

                <ProtectedRoute condition={user?.admin} exact path="/admin/general">
                    <GeneralSettingsPage />
                </ProtectedRoute>

                <ProtectedRoute condition={user?.admin} exact path="/admin/stats">
                    <StatsPage />
                </ProtectedRoute>

                <ProtectedRoute condition={user?.admin} exact path="/admin/users">
                    <UserManagementPage />
                </ProtectedRoute>

                <ProtectedRoute condition={user?.admin} exact path="/admin/templates">
                    <EditTemplatesPage />
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
        </Suspense>
    );
}