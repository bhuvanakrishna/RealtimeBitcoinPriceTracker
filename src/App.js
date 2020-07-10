import React from "react";
import logo from "./logo.svg";
import "./App.css";

import GetData2 from "./components/GetData2";

function App() {
  return (
    <div className="App">
      <h1>Real Time Prices of BitCoin</h1>
      <h3>API: finhub.io, Chart Library: Recharts</h3>
      <GetData2 />
    </div>
  );
}

export default App;
