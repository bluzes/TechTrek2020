import React, { Component } from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './components/HomePage';
import Login from './components/LoginPage';
import PrivateRoute from './components/PrivateRoute';

class App extends Component {
  constructor(props) {
    super(props);
    this.remaining = -1;
  }

  componentDidMount() {
    // this.interval = setInterval(() => this.setState({ time: Date.now() }), 1000);
  }
  componentWillUnmount() {
    clearInterval(this.interval);
  }

  updateTimeout = (expiry) => {
    this.interval = setInterval(() => this.setState({ remaining: expiry - Date.now() }), 1000);
    // this.setState({
    //   someVar: 'some value'
    // })
  }

  render() {
    if (this.remaining != -1 && this.remaining < 60) {
      return (<p>Session ends soon {Date.now()}</p>);
    }
    return (
      <BrowserRouter>
        <Switch>
          <Route component={Login} updateTimeout={this.updateTimeout} exact path="/login" />
          <PrivateRoute component={Home} exact path="/" />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;