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

    productList.map(async (id) => {
      const fetchProductDetails = await fetch(`https://api.mercadolibre.com/items/${id}`);
      const productDetails = await fetchProductDetails.json();
      productDetails.volume = 1;
      console.log(productDetails);
      this.setState((prevState) => (
        { products: [...prevState.products, productDetails] }));
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
          console.log(nomeButton);
          console.log(volume);
        } if (volume >= 0 && nomeButton === 'up') {
          item.volume += 1;
          console.log(nomeButton);
          console.log(volume);
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
        <span data-testid="shopping-cart-product-quantity">{ products.length }</span>
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
            <span>{` ${volume} `}</span>
            <button
              type="button"
              name="up"
              onClick={ this.botao }
              id={ title }
              data-testid="product-increase-quantity"
            >
              +
            </button>
            <span>{` ${(price * volume).toFixed(2)} `}</span>
          </div>
        ))}
        {/* { products.map(({ id, title, thumbnail, price }) => (
          <div key={ id }>
            <h1 data-testid="shopping-cart-product-name">{ title }</h1>
            <img src={ thumbnail } alt={ title } />
            <p>{ price }</p>
          </div>
        )) } */}
      </div>
    );
  }
}
