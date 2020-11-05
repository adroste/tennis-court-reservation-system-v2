import { Redirect, Route, Switch } from 'react-router-dom';

import { CalendarPage } from '../calendar/CalendarPage';
import { MyReservationsPage } from '../calendar/MyReservationsPage';
import React from 'react';

export function RouterSwitch() {
    const isAdmin = true;
    return (
        <Switch>

            <Route exact path="/">
                <CalendarPage />
            </Route>

            <Route exact path="/myreservations">
                <MyReservationsPage />
            </Route>

            <Route exact path="/info">
                Info
            </Route>

            <Route exact path="/myaccount">
                account
            </Route>

            <Route exact path="/imprint-privacy">
                imprint
            </Route>

            <Route path="/admin"
                render={() => isAdmin ?
                    (
                        <Switch>
                            <Route exact path="/admin/users">
                                Verwaltung: User
                            </Route>

                            <Route exact path="/admin/reservations">
                                Verwaltung: Reservations
                            </Route>

                            <Route exact path="/admin/texts">
                                Verwaltung: Texts
                            </Route>

                            <Route path="*">
                                <Redirect to="/" />
                            </Route>
                        </Switch>
                    ) : (
                        <Redirect to="/" />
                    )
                }
            />

            <Route path="*">
                <Redirect to="/" />
            </Route>

        </Switch>
    );
}