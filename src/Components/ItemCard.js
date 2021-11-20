import React, { Component } from 'react';
import PropType from 'prop-types';

export default class ItemCard extends Component {
  render() {
    const { title, thumbnail, price } = this.props;
    return (
      <li data-testid="product" className="item">
        <span>{ title }</span>
        <img src={ thumbnail } alt={ title } />
        <span>{ price }</span>
      </li>
    );
  }
}

ItemCard.propTypes = {
  title: PropType.string.isRequired,
  thumbnail: PropType.string.isRequired,
  price: PropType.number.isRequired,
};
