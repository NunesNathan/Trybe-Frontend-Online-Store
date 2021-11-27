import React, { Component } from 'react';
import PropType from 'prop-types';
import { Link } from 'react-router-dom';
import * as helpers from '../services/helpers';

export default class ItemCard extends Component {
  render() {
    const { resultado } = this.props;
    return (
      <li
        data-testid="product"
        className="item"
      >
        <Link
          data-testid="product-detail-link"
          to={ `/itemdetails/${resultado.id}` }
        >
          <span>{ resultado.title }</span>
          <img src={ resultado.thumbnail } alt={ resultado.title } />
          <span>{ resultado.price }</span>
        </Link>
        <button
          type="button"
          id={ resultado.id }
          data-testid="product-add-to-cart"
          onClick={ () => helpers.addProduct(resultado) }
        >
          Add ao carrinho!
        </button>
      </li>
    );
  }
}

ItemCard.propTypes = {
  resultado: PropType.string.isRequired,
};
