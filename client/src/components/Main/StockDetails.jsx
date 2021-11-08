import React from 'react';
import apiRoutes from '../apiRoutes.js';


class StockDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = { CEO: '', city: '', state: '', employees: '', sector: '', description: '' };
  }

  componentDidMount() {
    apiRoutes.getStockDetail(this.props.currentStock.name)
      .then((res) => {
        this.setState({
          CEO: res.data.CEO,
          city: res.data.city,
          state: res.data.state,
          employees: res.data.employees,
          sector: res.data.sector,
          description: res.data.description,
        });
      });
  }

  componentDidUpdate(prevProps) {
    if (this.props.currentStock !== prevProps.currentStock) {
      apiRoutes.getStockDetail(this.props.currentStock.name)
      .then((res) => {
        this.setState({
          CEO: res.data.CEO,
          city: res.data.city,
          state: res.data.state,
          employees: res.data.employees,
          sector: res.data.sector,
          description: res.data.description,
        });
      });
    }
  }

  render() {
    const empls = this.state.employees ?
      this.state.employees.toLocaleString('en') : '-';
    return (
      <div className='stock-about'>
        <h2>About</h2>
        <hr />
        <p>{this.state.description}</p>
        <div className='company-info'>
            <label>CEO <div>{this.state.CEO}</div></label>
            <label>Employees <div>{empls}</div></label>
            <label>Headquarters <div>{this.state.city}, {this.state.state}</div></label>
            <label>Industry <div>{this.state.sector}</div></label>
        </div>
    </div>
    );
  }
}

export default StockDetails;

