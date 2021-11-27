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
      control: false,
      renderList: false,
      salvos: [],
    };
  }

  componentDidMount() {
    const results = localStorage.getItem('product');

    if (results === null) {
      localStorage.setItem('product', JSON.stringify([]));
    }
  }

  componentDidUpdate() {
    const { control, inputValue, idValue } = this.state;
    if (control) {
      this.categoryFunc(idValue, inputValue);
    }
  }

  enterFunc = (event) => {
    event.preventDefault();
    const { inputValue } = this.state;
    this.queryFunc(inputValue);
  }

  queryFunc = async (input) => {
    const { idValue } = this.state;
    const response = await api.getProductsFromCategoryAndQuery(idValue, input);
    this.setState({
      results: response.results,
      renderList: true,
    });
  }

  categoryFunc = async (id, inputValue) => {
    const response = await api.getProductsFromCategoryAndQuery(id, inputValue);
    this.setState({
      results: response.results,
      control: false,
      renderList: true,
    });
  }

  changeInput = ({ target: { value } }) => {
    this.setState({
      inputValue: value,
    });
  }

  handleCategoryChange = (id) => {
    this.setState({
      idValue: id,
      control: true,
    });
  };

  render() {
    const { inputValue, quantityOnCart, results, renderList, salvos } = this.state;
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

          <ShoppingCartButton quantity={ quantityOnCart } salvos={ salvos } />
        </section>
        <section className="mainSearch">
          <CategoryList
            onChange={ this.handleCategoryChange }
            salvos={ salvos }
          />
          {renderList
            && <List results={ results } />}
        </section>
      </main>
    );
  }
}
