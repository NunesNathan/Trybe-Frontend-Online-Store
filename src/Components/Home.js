import React, { Component } from 'react';
import CarrinhoCompras from './CarrinhoCompras';
import CategoryList from './CategoryList';
import List from './List';
import { getResultsByCategory, getResultsBySearch } from '../services/api';

export default class Home extends Component {
  constructor() {
    super();

    this.state = {
      inputValue: '',
      selectedCategory: '',
      quantidadeCarrinho: 0,
      results: [],
      controle: 0,
    };
  }

  componentDidUpdate() {
    const { controle } = this.state;
    if (controle === 1) {
      const { selectedCategory } = this.state;
      this.categoriaFun(selectedCategory);
    }
  }

  inputFun = async (input) => {
    const resposta = await getResultsBySearch(input);
    this.setState({
      results: resposta.results,
    });
  }

  categoriaFun = async (id) => {
    const resposta = await getResultsByCategory(id);
    this.setState({
      results: resposta.results,
      controle: 0,
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
    this.inputFun(inputValue);
  }

  handleCategoryChange = (id) => {
    this.setState({
      selectedCategory: id,
      controle: 1,
    });
  };

  render() {
    const { inputValue, quantidadeCarrinho, results } = this.state;
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

          <CarrinhoCompras quantidade={ quantidadeCarrinho } />
        </section>
        <section className="principal">
          <CategoryList
            onChange={ this.handleCategoryChange }
          />
          <List resultado={ results } />
        </section>
      </main>
    );
  }
}
