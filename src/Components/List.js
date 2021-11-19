import React, { Component } from 'react';
import PropType from 'prop-types';
import { getResultsBySearch } from '../services/api';
import ItemCard from './ItemCard';

export default class List extends Component {
  constructor() {
    super();

    this.state = {
      results: false,
    };
  }

  componentDidMount() {
    this.fetcher();
  }

  fetcher = async () => {
    const { input } = this.props;
    const results = await getResultsBySearch(input);
    this.setState({
      results: results.results,
    });
  }

  render() {
    const { results } = this.state;
    return (
      results
        ? (
          <div className="itens-Card">
            { results.map((result) => <ItemCard key={ result.id } { ...result } />)}
          </div>
        )
        : <h3>Nenhum produto foi encontrado</h3>
    );
  }
}

List.propTypes = {
  input: PropType.string.isRequired,
};
