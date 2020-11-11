import { Redirect, Route } from 'react-router-dom';

import React from 'react';

export function ProtectedRoute({ condition, children, ...rest }) {
    return (
        <Route
            {...rest}
            render={({ location }) =>
                condition
                    ? children
                    : <Redirect to={{ pathname: "/login", state: { from: location } }} />
            }
        />
    );
}