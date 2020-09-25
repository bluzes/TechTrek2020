
import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import authenticationService from '../services/authenticationService';

const PrivateRoute = ({component: Component, ...rest}) => {
    const user1 = authenticationService.getCurrentUser();
    return (
        <Route {...rest} render={props => (
            user1 ?
                <Component {...props} />
                : <Redirect to="/login" />
        )} />
    );
};

export default PrivateRoute;