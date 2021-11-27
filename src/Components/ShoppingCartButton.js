import React, { Component } from 'react';
import PropType from 'prop-types';
import { Link } from 'react-router-dom';

export default class ShoppingCartButton extends Component {
  render() {
    const { quantity } = this.props;
    return (
      <Link to="/shoppingcart" data-testid="shopping-cart-button">
        <button className="shoppingCartButton" type="button">
          <img src="https://cdn-icons-png.flaticon.com/512/1374/1374128.png" alt="Carrinho de compras." />
          <span>{ `${quantity}` }</span>
        </button>
      </Link>
    );
  }
}

ShoppingCartButton.propTypes = {
  quantity: PropType.number.isRequired,
};
