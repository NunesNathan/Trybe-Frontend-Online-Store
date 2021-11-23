import React, { Component } from 'react';
import { Route, Switch } from 'react-router';
import Home from '../Components/Home';
import ItemPage from './ItemPage';
import ShoppingCart from './ShoppingCart';

export default class Redirect extends Component {
  constructor(props) {
    super(props);

    this.state = {
      carrinho: [],
    };
  }

  componentDidMount() {
    this.inicial();
  }

  inicial = () => {
    const carrinh = [
      {
        nome: 'carrinho 1',
        volume: 1,
        valor: 2.01,
      },
      {
        nome: 'carrinho 2',
        volume: 1,
        valor: 21.03,
      },
      {
        nome: 'carrinho 3',
        volume: 1,
        valor: 10.99,
      },
    ];
    this.setState({
      carrinho: carrinh,
    });
  }

  render() {
    const { carrinho } = this.state;
    return (
      <Switch>
        <Route path="/" exact>
          <Home />
        </Route>
        <Route path="/shoppingcart">
          <ShoppingCart itensSalvos={ carrinho } />
        </Route>
        <Route path="/itemdetails/:MLB">
          <ItemPage />
        </Route>
      </Switch>
    );
  }
}
