import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class CategoryItem extends Component {
  render() {
    const { category, onChange, id } = this.props;
    return (
      <li>
        <label className="form-check-label" htmlFor={ id }>
          { category }
          <input
            className="form-check-input"
            type="radio"
            name="category"
            value={ category }
            onChange={ () => onChange(id) }
            data-testid="category"
            id={ id }
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
