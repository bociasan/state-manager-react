import './App.css';
import {useEffect, useState} from "react";
import Counter from "./components/Counter/Counter";
import Reset from "./components/Reset/Reset";
import EvenDetector from "./components/EvenDetector/EvenDetector";
import StateManager from "./components/StateManager/StateManager";



function App() {

  return (
    <div className="App">
      <div className="container">
          <StateManager/>
          <Counter />
          <EvenDetector />
          <Reset />
      </div>
    </div>
  );
}

export default App;
