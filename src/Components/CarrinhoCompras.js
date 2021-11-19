import React, { Component } from 'react';
import PropType from 'prop-types';
import { Link } from 'react-router-dom';

export default class CarrinhoCompras extends Component {
  render() {
    const { quantidade } = this.props;
    return (
      <Link to="/shoppingcart" data-testid="shopping-cart-button">
        <button type="button">
          <img src="https://cdn-icons-png.flaticon.com/512/1374/1374128.png" height="42" width="42" alt="carrinho" />
          <span>{ ` ${quantidade}` }</span>
        </button>
      </Link>
    );
  }
}

CarrinhoCompras.propTypes = {
  quantidade: PropType.number.isRequired,
};
