import React, { Component } from 'react';
import { Route, Switch } from 'react-router';
import Home from '../components/Home';

export default class Redirect extends Component {
  render() {
    return (
      <Switch>
        <Route path="/" exact>
          <Home />
        </Route>
      </Switch>
    );
  }
}
