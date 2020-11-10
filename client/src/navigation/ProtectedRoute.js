import { Redirect, Route } from 'react-router-dom';

import React from 'react';

export function ProtectedRoute({ condition, children, ...rest }) {
    return (
        <Route
            {...rest}
            render={() =>
                condition
                    ? children
                    : <Redirect to="/login" />
            }
        />
    );
}