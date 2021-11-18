import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Home extends Component {
  render() {
    return (
      <main>
        <Link to="/shoppingcart" data-testid="shopping-cart-button">
          <button type="button">
            <img src="https://cdn-icons-png.flaticon.com/512/1374/1374128.png" height="42" width="42" alt="carrinho" />
          </button>
        </Link>
        <br />
        <span
          data-testid="home-initial-message"
        >
          Digite algum termo de pesquisa ou escolha uma categoria.
        </span>
      </main>
    );
  }
}
