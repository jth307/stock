import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import symbols from './symbols.json';
import getStockData from '../query.js';


class Searchbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = { query: "", results: [] };
    this.updateQuery = this.updateQuery.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.resetQuery = this.resetQuery.bind(this);
  }

  resetQuery() {
    this.setState({ query: "", results: [] });
  }

  updateQuery(e) {
    const query = e.target.value;
    const queryExp = RegExp("^" + query, 'i');
    let results = [];
    results = symbols.filter(stock => {
      if (stock.symbol.match(queryExp) || stock.name.match(queryExp)) {
        return stock;
      }
    });
    this.setState({ query: query, results: results });
  }

  handleSubmit(e) {
    e.preventDefault();
    const results = this.state.results;
    // If the user presses enter, go to the first result
    if (results.length > 0) {
      const firstResult = this.state.results[0].symbol;
      getStockData(firstResult)
      .then((res) => {
        this.props.changeStock(firstResult,res.data.c,res.data.dp,res.data.d)
        this.resetQuery()
      })
    }
  }

  handleClick(symbol) {

    getStockData(symbol)
    .then((res) => {

      this.props.changeStock(symbol,res.data.c,res.data.dp, res.data.d)
      this.resetQuery()
    })
  }


  formatName(name) {
    if (name.length >= 45) {
      return `${name.slice(0, 35)}...`;
    } else {
      return name;
    }
  }

  searchResults() {
    let results = this.state.results;
    if (results.length > 0) {
      results = results.slice(0, 6);
      return (
        <ul className="search-results">
          <div id="search-header">Stocks</div>
          {results.map((result, i) => {
            return (
              <li key={i}>
                <div className="result"  onClick={()=>(this.handleClick(result.symbol))}>
                  <div>{result.symbol}</div>
                  <div>{this.formatName(result.name)}</div>
                  <div></div>
                </div>
              </li>
            );
          })}
        </ul>
      );
    }
  }

  render() {
    return (
      <div className="searchbar-container">
        <div className="searchbar">
          <form onSubmit={this.handleSubmit}>
            <input
              type="text"
              placeholder="Search"
              className="search-input"
              onChange={this.updateQuery}
              value={this.state.query} />
          </form>
          {this.searchResults()}
        </div>
      </div>
    );
  }
}

export default withRouter(Searchbar);

