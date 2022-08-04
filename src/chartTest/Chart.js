import React, { Component } from "react";
import Plot from "react-plotly.js";

class Chart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stockChartXValues: [],
      stockChartYValues: [],
    };
  }

  componentDidMount() {
    this.fetchStock();
  }

  fetchStock() {
    const pointerToThis = this;
    const API_KEY = "HGJWFG4N8AQ66ICD/removethisforapitowork";
    const stockSymbol = "MSFT";
    let API_Call = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${stockSymbol}&outputsize=compact&apikey=${API_KEY}`;

    let stockChartXValuesFunction = [];
    let stockChartYValuesFunction = [];

    fetch(API_Call)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        for (var key in data["Time Series (Daily)"]) {
          stockChartXValuesFunction.push(key);
          stockChartYValuesFunction.push(
            data["Time Series (Daily)"][key]["1. open"]
          );
        }

        pointerToThis.setState({
          stockChartXValues: stockChartXValuesFunction,
          stockChartYValues: stockChartYValuesFunction,
        });
      });
  }

  render() {
    return (
      <div>
        <h3>Stock Chart</h3>
        <Plot
          data={[
            {
              x: this.state.stockChartXValues,
              y: this.state.stockChartYValues,
              type: "scatter",
              mode: "lines+markers",
              marker: {color: "grey"}
            },
          ]}
          layout={{width: 720, height: 440, title: 'Last 100 Days'}}
        />
      </div>
    );
  }
}

export default Chart;
