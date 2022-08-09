import './App.css';
import {useEffect, useState} from "react";
import Counter from "./components/Counter/Counter";

function App() {
  const [countValue, setCountValue] = useState(0)

  const subscribeFunc = () => {
    console.log("subscribed")
  }

  const dispatchFunc = ({type}) => {
    switch (type){
      case 'INCREMENT':
        setCountValue(countValue + 1)
        break
      case 'DECREMENT':
        setCountValue(countValue - 1 > 0 ? countValue - 1 : 0)
        break
      default :
        console.log("invalid type")
        break
    }
  }

  const manager = {
    // subscribe: subscribeFunc,
    dispatch: dispatchFunc,
    countValue: countValue
  }

  // useEffect(()=>{
  //
  // }, [countValue])

  return (
    <div className="App">
      {/*<StateManager>*/}
      <Counter manager={manager}>
      </Counter>
      {/*</StateManager>*/}
    </div>
  );
}

export default App;
