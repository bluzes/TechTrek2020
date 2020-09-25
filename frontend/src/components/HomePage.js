import React from 'react';
import {Button, AppBar, Typography, Toolbar, makeStyles,} from '@material-ui/core';
import authenticationService from '../services/authenticationService';

const useStyles = makeStyles((theme) => ({
    root: {
        height: '100vh',
        margin: "10px"
      },
    title: {
        flexGrow: 1,
        color: 'black'
      },
      body: {
        margin: theme.spacing(8, 4),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        color: '#FF3333'
      },
    }));

export default function HomePage(props) {
    const classes = useStyles();
    const logout = e => {
        authenticationService.logout()
        props.history.push("/login");
    }

    const createCustomer = () => {
        props.history.push("/createcustomer");
    }
    return(<div>
         <AppBar style={ {backgroundColor: "#FF3333" }}  position="relative">
            <Toolbar>
            <Typography variant="h6" className={classes.title} component="span">Tech Trek 2020</Typography>
            <Button color="inherit" variant='outlined' onClick={logout}>LogOut</Button>
            </Toolbar>
            </AppBar>
            <div className={classes.body}>
            <Button variant="outlined" color="inherit" onClick={createCustomer}>Create Customer</Button>
            </div>
        </div>)
}