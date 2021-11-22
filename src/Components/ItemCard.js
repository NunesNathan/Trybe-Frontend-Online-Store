import React, { Component } from 'react';
import PropType from 'prop-types';
import { Link } from 'react-router-dom';

export default class ItemCard extends Component {
  render() {
    const { title, thumbnail, price, id } = this.props;
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
};
