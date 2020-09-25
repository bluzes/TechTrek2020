import React, { Component } from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './components/HomePage';
import Login from './components/LoginPage';
import PrivateRoute from './components/PrivateRoute';
import CreateCustomer from './components/CreateCustomer';

class App extends Component {

  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route component={Login} exact path="/login" />
          <PrivateRoute component={Home} exact path="/" />
          <PrivateRoute component={CreateCustomer} exact path="/createcustomer" />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;