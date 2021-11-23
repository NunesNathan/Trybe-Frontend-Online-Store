import React, { Component } from 'react';
import ShoppingCartButton from '../Components/ShoppingCartButton';
import * as api from '../services/api';

export default class ItemPage extends Component {
  constructor() {
    super();

    this.state = {
      details: {},
      id: '',
    };
  }

  componentDidMount() {
    this.fetcher();
  }

  fetcher = async () => {
    /* regex for getting everything after last slash
    https://stackoverflow.com/questions/8945477/regular-expression-for-getting-everything-after-last-slash */
    const MLB = window.location.pathname.match(/[^/]+$/);
    this.setState({
      details: await api.getDetailsById(MLB),
      id: MLB,
    });
  }

  addProduct = ({ target }) => {
    const { product } = localStorage;
    const list = JSON.parse(product);

    localStorage.setItem('product', JSON.stringify([...list, target.id]));
  }

  render() {
    const { details, id } = this.state;
    return (
      <>
        <ShoppingCartButton quantity={ 0 } />
        <section>
          <h2 data-testid="product-detail-name">{details.title}</h2>
        </section>
        <button
          type="button"
          id={ id }
          data-testid="product-detail-add-to-cart"
          onClick={ this.addProduct }
        >
          Add ao carrinho
        </button>
        <section>
          <h3>Avaliações</h3>
          <form>
            <input placeholder="Email" type="email" required />
            <input
              placeholder="Mensagem (opcional)"
              data-testid="product-detail-evaluation"
              type="textarea"
            />
          </form>
        </section>
      </ >
    );
  }
}
