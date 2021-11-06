import React from 'react';

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
      validInput: false,
      inputErrorDisplay: false,
      estimatedCost: "$0.00",
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
    this.setState({ active: type, inputErrorDisplay: false });
    // this.props.clearErrors();
  }

  handleInput(e) {
    const validInput = this.isValid(e.target.value);
    if (validInput) {
      this.setState({
        shares: e.target.value,
        validInput: true,
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
        estimatedCost: "$0.00"
      });
    }
    // this.props.clearErrors();
  }

  handleSubmit(e) {

    if (!this.state.validInput) {
      this.setState({ inputErrorDisplay: true });
    } else {
      const sharesSuccessText = parseInt(this.state.shares) === 1 ? "share" : "shares";
      if (this.state.active === 'buy') {
        alert('bought!')
        // this.props.buyAsset(parseInt(this.state.shares));
        // this.props.setSuccessMessage(`You bought ${this.state.shares} ${sharesSuccessText} of ${this.props.asset.ticker}`);
      } else {
        // this.props.sellAsset(parseInt(this.state.shares));
        // this.props.setSuccessMessage(`You sold ${this.state.shares} ${sharesSuccessText} of ${this.props.asset.ticker}`);
        alert('sold!')
      }
      // if (this.state.timeout) clearTimeout(this.state.timeout);
    }
  }

  render() {
    const inputError = this.state.inputErrorDisplay ?
      (<span>Please enter a positive integer</span>) : null;

    const color = this.props.currentStock.percentage < 0 ? "red" : "green";

    const [estimated, btnText] = this.state.active === "buy" ?
      ["Cost", "Buy"] : ["Credit", "Sell"];

    const sharesText = "Shares"
    // this.props.quantity === 1 ? "Share" : "Shares";

    const relevantInfo = this.state.active === "buy" ?(
      <span>
        ${(3292/ 100)
          .toLocaleString('en', { minimumFractionDigits: 2 }) + " "}
        Buying Power Available
      </span>
    ) : (<span>12{" "+sharesText} Available</span>);
    return (
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
          {/* {
            this.props.errors.map((error) => (<span>{error}</span>))
          } */}
        </div>
        <div className="relevant-info">
          {relevantInfo}
        </div>
      </aside>
      </div>
    );
  }
}

export default Buy;