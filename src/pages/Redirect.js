import React, { Component } from 'react';
import { Route, Switch } from 'react-router';
import Home from '../Components/Home';
import ShoppingCart from './ShoppingCart';

export default class Redirect extends Component {
  render() {
    return (
      <Switch>
        <Route path="/" exact>
          <Home />
        </Route>
        <Route path="/shoppingcart">
          <ShoppingCart />
        </Route>
      </Switch>
    );
  }
}
