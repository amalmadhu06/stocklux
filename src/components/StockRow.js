import React, { Component } from "react";
import { stock } from "../resources/stock.js";

const changeStyle = {
  color: "#4caf50",
  fontSize: "0.8rem",
  marginLeft: 5,
};

class StockRow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      price: "updating price",
      date: "updating",
      time: "updating",
      data: {
        dollar_change: "updating change",
        percent_change: "updating change",
      },
    };
  }

  applyData(data) {
    // console.log(data);
    this.setState({
      price: data.price,
      date: data.date,
      time: data.time,
    });
    stock.getYesterdaysClose(this.props.ticker, data.date, (data) => {
      console.log(data);
    });
  }

  componentDidMount() {
    stock.latestPrice(this.props.ticker, this.applyData.bind(this));
    //   .then((data) => callback(data));
  }

  render() {
    return (
      <li className="list-group-item">
        <b>{this.props.ticker}</b> {this.state.price}
        <span className="change" style={changeStyle}>
          {this.state.dollar_change}
          {this.state.percent_change}
        </span>
      </li>
    );
  }
}

export default StockRow;
