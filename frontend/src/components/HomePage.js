import React from 'react';
import {Button} from '@material-ui/core';
import authenticationService from '../services/authenticationService';

export default function HomePage(props) {
    const logout = e => {
        authenticationService.logout()
        props.history.push("/login");
    }

    const createCustomer = () => {
        props.history.push("/createcustomer");
    }
    return(<div>
        <Button onClick={logout}>Logout</Button>
        <Button onClick={createCustomer}>Create Customer</Button>
        Im in home page!!</div>)
}