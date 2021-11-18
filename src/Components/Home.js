import React, { Component } from 'react';
import List from './List';
import { Link } from 'react-router-dom';

export default class Home extends Component {
  constructor() {
    super();

    this.state = {
      inputValue: '',
      toGo: false,
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

  render() {
    const { inputValue, toGo } = this.state;
    return (
      <main>
      <span
          data-testid="home-initial-message"
        >
          Digite algum termo de pesquisa ou escolha uma categoria.
        </span>

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
        </form>

        <Link to="/shoppingcart" data-testid="shopping-cart-button">
          <button type="button">
            <img src="https://cdn-icons-png.flaticon.com/512/1374/1374128.png" height="42" width="42" alt="carrinho" />
          </button>
        </Link>
        <br />
        
        { toGo
          && <List input={ inputValue } />}
      </main>
    );
  }
}
