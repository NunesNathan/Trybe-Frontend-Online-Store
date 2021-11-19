import React, { Component } from 'react';
import PropType from 'prop-types';

export default class ItemCard extends Component {
  render() {
    const { title, thumbnail, price } = this.props;
    return (
      <div data-testid="product" className="item">
        <span>{ title }</span>
        <img src={ thumbnail } alt={ title } height="100" width="80" />
        <span>{ price }</span>
      </div>
    );
  }
}

ItemCard.propTypes = {
  title: PropType.string.isRequired,
  thumbnail: PropType.string.isRequired,
  price: PropType.number.isRequired,
};
