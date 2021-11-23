import React, { Component } from 'react';
import PropType from 'prop-types';

export default class ShoppingCart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      carrinho: [],
    };
  }

  componentDidMount() {
    this.inicial();
  }

  inicial = () => {
    const { itensSalvos } = this.props;
    this.setState({
      carrinho: itensSalvos,
    });
  }

  botao = (event) => {
    const { id, name: nomeButton } = event.target;
    const { carrinho } = this.state;

    // referencia: https://stackoverflow.com/questions/29537299/react-how-to-update-state-item1-in-state-using-setstate
    carrinho.find(({ nome, volume }, index) => {
      if (nome === id) {
        const items = [...carrinho];
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
        this.setState({ carrinho: [...items] });
      }
      return null;
    });
  }

  render() {
    const { carrinho } = this.state;
    return (
      <main>
        <h3 data-testid="shopping-cart-empty-message">Seu carrinho está vazio</h3>
        { carrinho.map(({ nome, volume, valor }) => (
          <div key={ `${nome}` }>
            <h3>{`${nome}`}</h3>
            <button
              type="button"
              name="down"
              onClick={ this.botao }
              id={ nome }
              data-testid="product-decrease-quantity"
            >
              -
            </button>
            <span>{` ${volume} `}</span>
            <button
              type="button"
              name="up"
              onClick={ this.botao }
              id={ nome }
              data-testid="product-increase-quantity"
            >
              +
            </button>
            <span>{` ${(valor * volume).toFixed(2)} `}</span>
          </div>
        ))}
      </main>
    );
  }
}

ShoppingCart.propTypes = {
  itensSalvos: PropType.string.isRequired,
};
