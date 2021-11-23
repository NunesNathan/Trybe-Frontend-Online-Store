import React, { Component } from 'react';
import PropType from 'prop-types';
import ItemCard from './ItemCard';

export default class List extends Component {
  addProduct({ target }) {
    const { product } = localStorage;
    const list = JSON.parse(product);

    localStorage.setItem('product', JSON.stringify([...list, target.id]));
  }

  render() {
    const { results } = this.props;
    return (
      results.length > 0
        ? (
          <ul className="items-Card">
            { results.map((result) => (
              <ItemCard
                key={ result.id }
                { ...result }
                addProduct={ this.addProduct }
              />
            ))}
          </ul>
        )
        : <h3>Nenhum produto foi encontrado</h3>
    );
  }
}

List.propTypes = {
  results: PropType.arrayOf(PropType.object).isRequired,
};
