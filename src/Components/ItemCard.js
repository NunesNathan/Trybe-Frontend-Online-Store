import React, { Component } from 'react';
import PropType from 'prop-types';
import { Link } from 'react-router-dom';

export default class ItemCard extends Component {
  render() {
    const { title, thumbnail, price, id, addProduct } = this.props;
    return (
      <Link
        data-testid="product-detail-link"
        to={ `/itemdetails/${id}` }
      >
        <li
          data-testid="product"
          className="item"
        >
          <span>{ title }</span>
          <img src={ thumbnail } alt={ title } />
          <span>{ price }</span>
          <button
            type="button"
            id={ id }
            data-testid="product-add-to-cart"
            onClick={ addProduct }
          >
            Add ao carrinho
          </button>
        </li>
      </Link>
    );
  }
}

ItemCard.propTypes = {
  title: PropType.string.isRequired,
  thumbnail: PropType.string.isRequired,
  price: PropType.number.isRequired,
  id: PropType.string.isRequired,
  addProduct: PropType.func.isRequired,
};
