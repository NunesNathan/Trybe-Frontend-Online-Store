import React from 'react';
import PropTypes from 'prop-types';

class CategoryItem extends React.Component {
  render() {
    const { category, onChange, id } = this.props;

    return (
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
    );
  }
}

CategoryItem.propTypes = {
  category: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
};

export default CategoryItem;
