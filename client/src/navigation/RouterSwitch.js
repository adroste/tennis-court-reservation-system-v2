import { Redirect, Route, Switch } from 'react-router-dom';

import React from 'react';

export function RouterSwitch() {
    const isAdmin = true;
    return (
        <Switch>

            <Route exact path="/">
                Kalender
            </Route>

            <Route exact path="/myreservations">
                Meine Reservierungen
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