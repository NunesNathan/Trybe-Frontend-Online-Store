import React, { Component } from 'react';
import ShoppingCartButton from './ShoppingCartButton';
import CategoryList from './CategoryList';
import List from './List';
import * as api from '../services/api';

export default class Home extends Component {
  constructor() {
    super();

    this.state = {
      inputValue: '',
      idValue: '',
      quantityOnCart: 0,
      results: [],
      control: 0,
    };
  }

  componentDidMount() {
    const results = localStorage.getItem('product');

    if (results === null) {
      localStorage.setItem('product', JSON.stringify([]));
    }
  }

  componentDidUpdate() {
    const { control, inputValue } = this.state;
    if (control === 1) {
      const { idValue } = this.state;
      this.categoryFunc(idValue, inputValue);
    }
  }

  queryFunc = async (input) => {
    const { idValue } = this.state;
    const response = await api.getProductsFromCategoryAndQuery(idValue, input);
    this.setState({
      results: response.results,
    });
  }

  categoryFunc = async (id, inputValue) => {
    const response = await api.getProductsFromCategoryAndQuery(id, inputValue);
    this.setState({
      results: response.results,
      control: 0,
    });
  }

  changeInput = (e) => {
    this.setState({
      inputValue: e.target.value,
    });
  }

  enterFunc = (e) => {
    e.preventDefault();
    const { inputValue } = this.state;
    this.queryFunc(inputValue);
  }

  handleCategoryChange = (id) => {
    this.setState({
      idValue: id,
      control: 1,
    });
  };

  render() {
    const { inputValue, quantityOnCart, results } = this.state;
    return (
      <main>
        <section className="menu">
          <form className="formMenu">
            <label htmlFor="get">
              <input
                type="text"
                data-testid="query-input"
                value={ inputValue }
                onChange={ this.changeInput }
                id="get"
              />
              <button
                type="submit"
                data-testid="query-button"
                onClick={ this.enterFunc }
                id="get"
              >
                Buscar!
              </button>
            </label>
            <br />
            <span
              data-testid="home-initial-message"
            >
              Digite algum termo de pesquisa ou escolha uma categoria.
            </span>
          </form>

          <ShoppingCartButton quantity={ quantityOnCart } />
        </section>
        <section className="mainSearch">
          <CategoryList
            onChange={ this.handleCategoryChange }
          />
          { results.length > 0
          && <List results={ results } />}
        </section>
      </main>
    );
  }
}
