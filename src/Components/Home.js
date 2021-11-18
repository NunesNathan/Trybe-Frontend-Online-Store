import React, { Component } from 'react';
import List from './List';

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
        <span
          data-testid="home-initial-message"
        >
          Digite algum termo de pesquisa ou escolha uma categoria.
        </span>
        { toGo
          && <List input={ inputValue } />}
      </main>
    );
  }
}
