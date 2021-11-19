import React from 'react';
import PropTypes from 'prop-types';

class CategoryItem extends React.Component {
  render() {
    const { category, onChange, id } = this.props;

    return (
      <li>
        <input
          type="radio"
          name="category"
          value={ category }
          onChange={ () => onChange(id) }
        />
        <p data-testid="category">{category}</p>
      </li>
    );
  }
}

CategoryItem.propTypes = {
  category: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
};

export default CategoryItem;
