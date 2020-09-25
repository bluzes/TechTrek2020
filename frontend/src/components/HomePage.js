import React from 'react';
import {Button} from '@material-ui/core';
import authenticationService from '../services/authenticationService';

export default function HomePage(props) {
    const logout = e => {
        authenticationService.logout()
        props.history.push("/login");
    }
    return(<div>
        <Button onClick={logout}>Logout</Button>
        Im in home page!!</div>)
}