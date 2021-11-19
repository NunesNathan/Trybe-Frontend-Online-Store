import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import CategoryList from './CategoryList';
import List from './List';

export default class Home extends Component {
  constructor() {
    super();

    this.state = {
      inputValue: '',
      toGo: false,
      selectedCategory: '',
    };
  }

  changeInput = (e) => {
    this.setState({
      inputValue: e.target.value,
    });
  }

  enterFunc = (e) => {
    e.preventDefault();
    this.setState({
      toGo: true,
    });
  }

  handleCategoryChange = ({ target }) => {
    this.setState({
      selectedCategory: target.value,
    });
  };

  render() {
    const { inputValue, toGo, selectedCategory } = this.state;
    return (
      <main>
        <div className="menu">
          <form>
            <label htmlFor="get">
              <input
                type="text"
                data-testid="query-input"
                value={ inputValue }
                onChange={ this.changeInput }
              />
              <button
                type="submit"
                data-testid="query-button"
                onClick={ this.enterFunc }
              >
                Buscar!
              </button>
            </label>
            <CategoryList
              selectedCategory={ selectedCategory }
              onChange={ this.handleCategoryChange }
            />
            <br />
            <span
              data-testid="home-initial-message"
            >
              Digite algum termo de pesquisa ou escolha uma categoria.
            </span>
          </form>

          <Link to="/shoppingcart" data-testid="shopping-cart-button">
            <button type="button">
              <img src="https://cdn-icons-png.flaticon.com/512/1374/1374128.png" height="42" width="42" alt="carrinho" />
            </button>
          </Link>
        </div>

        { toGo
          && <List input={ inputValue } />}
      </main>
    );
  }
}
