import React, { Component } from 'react';
import PropType from 'prop-types';
import { Link } from 'react-router-dom';
import * as helpers from '../services/helpers';

export default class ItemCard extends Component {
  tratamento = async ({ target: { id } }) => {
    const fetchProductDetails = await fetch(`https://api.mercadolibre.com/items/${id}`);
    const productDetails = await fetchProductDetails.json();
    helpers.addProduct(productDetails);
  }

  render() {
    const { title, thumbnail, price, id } = this.props;
    return (
      <li
        data-testid="product"
        className="item"
      >
        <Link
          data-testid="product-detail-link"
          to={ `/itemdetails/${id}` }
        >
          <span>{ title }</span>
          <img src={ thumbnail } alt={ title } />
          <span>{ price }</span>
        </Link>
        <button
          type="button"
          id={ id }
          data-testid="product-add-to-cart"
          onClick={ this.tratamento }
        >
          Add ao carrinho!
        </button>
      </li>
    );
  }
}

ItemCard.propTypes = {
  title: PropType.string.isRequired,
  thumbnail: PropType.string.isRequired,
  price: PropType.number.isRequired,
  id: PropType.string.isRequired,
};
