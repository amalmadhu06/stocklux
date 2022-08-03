import React from "react";
import "bootstrap/dist/css/bootstrap.min.css"; //importing boostrap for styling

import StockList from "./components/StockList.js";
import StockRow  from "./components/StockRow.js";

function App() {  
  return (
    <div className="App">
      <div className="container">
        <div className="col-md-5 mt-5">
          <div className="card">
            <StockList />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
