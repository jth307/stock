import React from 'react';
import { Link, withRouter } from 'react-router-dom';

// All searchable IEX symbols/tickers
import symbols from './symbols.json';

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
      console.log('hello')
      const firstResult = this.state.results[0].symbol;
      // this.props.history.push(`stocks/${firstResult}`);
      this.props.changeStock(firstResult)
      this.resetQuery()
    }
  }

  formatName(name) {
    if (name.length >= 50) {
      return `${name.slice(0, 50)}...`;
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
                <div className="result"  onClick={this.handleSubmit}>
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