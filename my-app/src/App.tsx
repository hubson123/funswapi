import React from "react";
import logo from "./logo.svg";
import "./App.css";
import HomePage from "./components/HomePage";

function App() {
  return (
    <div className="App">
      <div className="cont">
        <div className="stars">
          <HomePage />
        </div>
      </div>
    </div>
  );
}

export default App;
