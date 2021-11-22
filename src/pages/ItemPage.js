import React, { Component } from 'react';
import ShoppingCartButton from '../Components/ShoppingCartButton';
import * as api from '../services/api';

export default class ItemPage extends Component {
  constructor() {
    super();

    this.state = {
      details: {},
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
    });
  }

  render() {
    const { details } = this.state;
    return (
      <>
        <ShoppingCartButton quantity={ 0 } />
        <section>
          <h2 data-testid="product-detail-name">{details.title}</h2>
        </section>
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
