import React, { Component } from 'react';
import ShoppingCartButton from '../Components/ShoppingCartButton';
import * as api from '../services/api';
import * as reviews from '../services/reviews';

export default class ItemPage extends Component {
  constructor() {
    super();

    this.state = {
      details: {},
      MLB: window.location.pathname.match(/[^/]+$/),
      optional: '',
      email: '',
      oldReviews: [],
    };
  }

  componentDidMount() {
    this.fetcher();
    this.fetcher2();
  }

  fetcher = async () => {
    /* regex for getting everything after last slash
    https://stackoverflow.com/questions/8945477/regular-expression-for-getting-everything-after-last-slash */
    const { MLB } = this.state;
    this.setState({
      details: await api.getDetailsById(MLB),
    });
  }

  fetcher2 = () => {
    const { MLB } = this.state;
    this.setState({
      oldReviews: reviews.getReviews(MLB),
    });
  }

  fetcher3 = async (e) => {
    e.preventDefault();
    const { MLB, optional, email } = this.state;
    const review = { email, optional };
    await reviews.submitReview(MLB, review);
  }

  changeInputs = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  }

  render() {
    const { details, optional, email, oldReviews } = this.state;
    return (
      <>
        <ShoppingCartButton quantity={ 0 } />
        <section>
          <h2 data-testid="product-detail-name">{details.title}</h2>
        </section>
        <section>
          <h3>Avaliações</h3>
          <form>
            <label htmlFor="review">
              <input
                value={ email }
                placeholder="Email"
                type="email"
                name="email"
                required
                onChange={ this.changeInputs }
                id="review"
              />
              <input
                placeholder="Mensagem (opcional)"
                data-testid="product-detail-evaluation"
                type="textarea"
                name="optional"
                value={ optional }
                onChange={ this.changeInputs }
                id="review"
              />
              <button type="submit" onClick={ this.fetcher3 }>
                Enviar avaliação
              </button>
            </label>
          </form>
          { oldReviews
            && (
              <ol>
                { oldReviews.map((review) => (
                  <li key={ review.email }>
                    <p>{ review.email }</p>
                    <p>{ review.optional }</p>
                  </li>
                ))}
              </ol>
            )}
        </section>
      </ >
    );
  }
}
