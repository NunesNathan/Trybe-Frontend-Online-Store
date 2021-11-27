import React, { Component } from 'react';
import ShoppingCartButton from '../Components/ShoppingCartButton';
import * as api from '../services/api';
import * as helpers from '../services/helpers';
import * as reviews from '../services/reviews';

export default class ItemPage extends Component {
  constructor() {
    super();

    /* regex pra tudo que está depois da ultima barra do pathname
    https://stackoverflow.com/questions/8945477/regular-expression-for-getting-everything-after-last-slash */
    this.state = {
      details: {},
      MLB: window.location.pathname.match(/[^/]+$/),
      optional: '',
      email: '',
      rate: 1,
      oldReviews: [],
      resultado: [],
    };
  }

  componentDidMount() {
    this.produto();
    this.getDetailsFromStorage();
    this.getReviewsFromStorage();
  }

  produto = async () => {
    const { MLB } = this.state;
    const fetchProductDetails = await fetch(`https://api.mercadolibre.com/items/${MLB}`);
    const arr = await fetchProductDetails.json();
    this.setState({
      resultado: arr,
    });
  }

  getDetailsFromStorage = async () => {
    const { MLB } = this.state;
    this.setState({
      details: await api.getDetailsById(MLB),
    });
  }

  getReviewsFromStorage = () => {
    const { MLB } = this.state;
    this.setState({
      oldReviews: reviews.getReviews(MLB),
    });
  }

  changeInputs = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  }

  submitReviewToStorage = async (e) => {
    e.preventDefault();
    const { MLB, optional, email, rate } = this.state;
    const review = { email, optional, rate };
    await reviews.submitReview(MLB, review);
    this.setState({
      optional: '',
      email: '',
      rate: 1,
    });
  }

  addProduct = ({ target }) => {
    const { product } = localStorage;
    const list = JSON.parse(product);

    localStorage.setItem('product', JSON.stringify([...list, target.id]));
  }

  getReviewsFromStorage = () => {
    const { MLB } = this.state;
    this.setState({
      oldReviews: helpers.getReviews(MLB),
    });
  }

  changeInputs = ({ target: { name, value } }) => {
    this.setState({
      [name]: value,
    });
  }

  submitReviewToStorage = async (e) => {
    e.preventDefault();
    const { MLB, optional, email, rate } = this.state;
    const review = { email, optional, rate };
    await helpers.submitReview(MLB, review);
    this.setState({
      optional: '',
      email: '',
      rate: 1,
    }, () => this.getReviewsFromStorage());
  }

  render() {
    const { details, optional, email, oldReviews, MLB, resultado } = this.state;
    return (
      <main>
        <ShoppingCartButton quantity={ 0 } />
        <section>
          <h2 data-testid="product-detail-name">{ details.title }</h2>
          <img src={ details.thumbnail } alt={ details.title } />
          <h3>
            Preço: R$
            { details.price }
          </h3>
          <h3>{ details.warranty }</h3>
          <h3>
            Quantidade vendida: +
            { details.sold_quantity }
          </h3>
        </section>
        <button
          type="button"
          id={ MLB }
          data-testid="product-detail-add-to-cart"
          onClick={ () => helpers.addProduct(resultado) }
        >
          Add ao carrinho
        </button>
        <section>
          <h3>Avaliar</h3>
          <form>
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
            <select name="rate" onChange={ this.changeInputs }>
              <option value={ 1 }>1</option>
              <option value={ 2 }>2</option>
              <option value={ 3 }>3</option>
              <option value={ 4 }>4</option>
              <option value={ 5 }>5</option>
            </select>
            <button type="submit" onClick={ this.submitReviewToStorage }>
              Enviar avaliação
            </button>
          </form>
        </section>
        {oldReviews
          && (
            <ol>
              <h3>Avaliações de outros compradores: </h3>
              {oldReviews.map((review) => (
                <li key={ review.email }>
                  <p>{ review.email }</p>
                  <span>{ '⭐'.repeat(review.rate) }</span>
                  <span>{ review.optional }</span>
                </li>
              ))}
            </ol>
          )}
      </main>
    );
  }
}
