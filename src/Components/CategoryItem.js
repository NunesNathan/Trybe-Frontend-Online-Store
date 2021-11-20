import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class CategoryItem extends Component {
  render() {
    const { category, onChange, id } = this.props;

    return (
      <li>
        <label htmlFor={ `${id}` }>
          { category }
          <input
            className="reto"
            type="radio"
            name="category"
            value={ category }
            onChange={ () => onChange(id) }
            data-testid="category"
          />
        </label>
      </li>
    );
  }
}

CategoryItem.propTypes = {
  category: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
};
