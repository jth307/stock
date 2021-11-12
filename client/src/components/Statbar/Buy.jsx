import React from 'react';
import apiRoutes from '../../apiRoutes.js';


class BuyOrSell extends React.Component {
  render() {
    const [buyTabClass, sellTabClass] = this.props.active === "buy" ?
      ["form-tab active", "form-tab"] : ["form-tab", "form-tab active"];
    return (
      <div className="form-tabs">
        <div
          className={buyTabClass}
          onClick={() => this.props.onSelected("buy")}>
            Buy
        </div>
        <div
          className={sellTabClass}
          onClick={() => this.props.onSelected("sell")}>
            Sell
        </div>
      </div>
    );
  }
}

class Buy extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      active: "buy",
      shares: '',
      stockQty: this.props.currentStock.quantity,
      validInput: false,
      inputErrorDisplay: false,
      limitExceeded: false,
      estimatedCost: "$0.00",
      modalClass: 'cart-popup-container',
    };
    this.selectTab = this.selectTab.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  isValid(input) {
    const inputInt = parseInt(input);
    if (inputInt === NaN || inputInt < 0) {
      return false;
    } else if (inputInt.toString() !== input.trim()) {
      return false;
    } else {
      return true;
    }
  }

  selectTab(type) {
    this.setState({ active: type, inputErrorDisplay: false, limitExceeded: false });
  }

  handleInput(e) {
    const validInput = this.isValid(e.target.value);
    if (validInput) {
      this.setState({
        shares: e.target.value,
        validInput: true,
        limitExceeded: false,
        inputErrorDisplay: false,
        estimatedCost: "$" +
          (this.props.currentStock.price * parseInt(e.target.value))
            .toLocaleString('en', { minimumFractionDigits: 2 })
      });
    } else {
      this.setState({
        shares: e.target.value,
        validInput: false,
        inputErrorDisplay: false,
        limitExceeded: false,
        estimatedCost: "$0.00"
      });
    }
  }

  handleSubmit(e) {
    if (!this.state.validInput) {
      this.setState({ inputErrorDisplay: true });
    } else {

      let stockCount = this.state.active === 'buy'? this.state.shares : -Math.abs(this.state.shares)

      if (this.state.active !== 'buy' && this.state.shares > this.state.stockQty) {
        this.setState({limitExceeded: true});
      } else {
        let data = {
          stock: this.props.currentStock.name,
          qty: stockCount,
          userID: this.props.user.userID,
        }

        if (this.state.active !== 'buy' && this.state.shares === this.props.currentStock.quantity.toString()){
          apiRoutes.deleteStock(data)
          .then((res) => {
            this.setState({stockQty: this.state.stockQty + stockCount})
            this.openCartModal();
            })
        } else {
          apiRoutes.updateStockQuantity(data)
          .then((res) => {
            this.setState({stockQty: Number(this.state.stockQty) + Number(stockCount)})
            this.openCartModal();
            })
        }
      }
    }
  }

  closeCartModal() {
    this.setState({modalClass: 'cart-popup-container'});
  }

  openCartModal() {
    this.setState({modalClass:'cart-popup-container cart-show-popup'});
  }

  render() {
    const inputError = this.state.inputErrorDisplay ?
      (<span>Please enter a positive integer</span>) : null;

    const limitError = this.state.limitExceeded ?
      (<span>You don't have enough stocks</span>) : null;

    const color = this.props.currentStock.percentage < 0 ? "red" : "green";

    const [estimated, btnText] = this.state.active === "buy" ?
      ["Cost", "Buy"] : ["Credit", "Sell"];

    const sharesText = this.props.currentStock.quantity <= 1 ? " Share" : " Shares";

    const relevantInfo = this.state.active === "buy" ? (
      <span>
        ${(329255/ 100)
          .toLocaleString('en', { minimumFractionDigits: 2 }) + " "}
        Buying Power Available
      </span>
    ) : (<span>{this.state.stockQty + sharesText} Available</span>);

    return (
      <>
      <div className={this.state.modalClass}>
        <div className="cart-popup-content">
          <button type="button" onClick={()=>(this.closeCartModal())} className="cart-close-popup">&times;</button>
          <h1 className="cart-popup-header">Transaction successful</h1>
        </div>
      </div>
      <div className='buy-stocks-div'>
      <aside className={`asset-page-sidebar ${color}`}>
        <BuyOrSell
          active={this.state.active}
          onSelected={this.selectTab}
       />
        <div className="sidebar-form">
          <div className="sidebar-form-row">
            <span>Shares</span>
            <input
              type="text"
              value={this.state.shares}
              maxLength="5"
              placeholder="0"
              onChange={this.handleInput}
             />
          </div>
          <div className="sidebar-form-row">
            <span>Market Price</span>
            <span className="bold-me">
              ${this.props.currentStock.price
                .toLocaleString('en', { minimumFractionDigits: 2 })}
            </span>
          </div>
          <div className="sidebar-form-row estimate">
            <span>Estimated {estimated}</span>
            <span>{this.state.estimatedCost}</span>
          </div>
          <button onClick={this.handleSubmit}>
            {`${btnText} `}
          </button>
        </div>
        <div className="sidebar-form-errors">
          {inputError}
          {limitError}
        </div>
        <div className="relevant-info">
          {relevantInfo}
        </div>
      </aside>
      </div>
      </>
    );
  }
}

export default Buy;