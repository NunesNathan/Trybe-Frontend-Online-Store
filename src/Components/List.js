import React, { Component } from 'react';
import PropType from 'prop-types';
import ItemCard from './ItemCard';

export default class List extends Component {
  render() {
    const { resultado } = this.props;
    return (
      <div className="itens-Card">
        { resultado.map((result) => <ItemCard key={ result.id } { ...result } />)}
      </div>
    );
  }
}

List.propTypes = {
  resultado: PropType.string.isRequired,
};
