import React, { Component } from 'react';
import CarrinhoCompras from './CarrinhoCompras';
import CategoryList from './CategoryList';
import List from './List';

export default class Home extends Component {
  constructor() {
    super();

    this.state = {
      inputValue: '',
      toGo: false,
      selectedCategory: '',
      quantidadeCarrinho: 0,
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

  handleCategoryChange = (id) => {
    const { selectedCategory } = this.state;
    this.setState({
      selectedCategory: id,
    });
    console.log(selectedCategory);
  };

  render() {
    const { inputValue, toGo, quantidadeCarrinho } = this.state;
    return (
      <main>
        <section className="menu">
          <form>
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
            // selectedCategory={ selectedCategory }
            onChange={ this.handleCategoryChange }
          />

          { toGo
            && <List input={ inputValue } />}
        </section>
      </main>
    );
  }
}
