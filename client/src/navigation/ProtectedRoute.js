import React, { useContext } from 'react';
import { Redirect, Route } from 'react-router-dom';

import { authContext } from '../AuthContext';

export function ProtectedRoute({ admin, children, ...rest }) {

    const { user } = useContext(authContext);

    return (
        <Route
            {...rest}
            render={({ location }) => {
                if (!user)
                    return <Redirect to={{ pathname: "/login", state: { from: location } }} />;
                else if (admin && !user.admin)
                    return <Redirect to="/" />;
                return children;
            }}
        />
    );
}