import React, { Component } from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './components/HomePage';
import Login from './components/LoginPage';
import PrivateRoute from './components/PrivateRoute';

class App extends Component {

  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route component={Login} exact path="/login" />
          <PrivateRoute component={Home} exact path="/" />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;