import React, { Component } from 'react';

export default class ShoppingCart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
    };
  }

  componentDidMount() {
    this.getProductLocal();
  }

  getProductLocal() {
    const { product } = localStorage;
    const productList = JSON.parse(product);

    productList.map(async (arr) => {
      arr.volume = 1;
      this.setState((prevState) => (
        { products: [...prevState.products, arr] }));
    });
  }

  botao = (event) => {
    const { id, name: nomeButton } = event.target;
    const { products } = this.state;

    // referencia: https://stackoverflow.com/questions/29537299/react-how-to-update-state-item1-in-state-using-setstate
    products.find(({ title, volume }, index) => {
      if (title === id) {
        const items = [...products];
        const item = { ...items[index] };
        if (volume > 0 && nomeButton === 'down') {
          item.volume -= 1;
        } if (volume >= 0 && nomeButton === 'up') {
          item.volume += 1;
        }
        items[index] = item;
        this.setState({ products: [...items] });
      }
      return null;
    });
  }

  render() {
    const { products } = this.state;

    if (products.length < 1) {
      return (
        <span data-testid="shopping-cart-empty-message">
          Seu carrinho está vazio
        </span>
      );
    }

    return (
      <div>
        <span>{ products.length }</span>
        { products.map(({ title, volume, price }) => (
          <div key={ `${title}` }>
            <h3 data-testid="shopping-cart-product-name">{`${title}`}</h3>
            <button
              type="button"
              name="down"
              onClick={ this.botao }
              id={ title }
              data-testid="product-decrease-quantity"
            >
              -
            </button>
            <span data-testid="shopping-cart-product-quantity">{`${volume}`}</span>
            <button
              type="button"
              name="up"
              onClick={ this.botao }
              id={ title }
              data-testid="product-increase-quantity"
            >
              +
            </button>
            <span>{`${(price * volume).toFixed(2)}`}</span>
          </div>
        ))}
      </div>
    );
  }
}
