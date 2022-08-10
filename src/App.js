import './App.css';
import {useEffect, useState} from "react";
import Counter from "./components/Counter/Counter";
import Reset from "./components/Reset/Reset";

function App() {
  const [countValue, setCountValue] = useState(0)
  const [subscribers, setSubscribers] = useState([])

  const subscribeFunction = (subscriber) => {
    console.log(`--- '${subscriber.name}' subscribed ---`)
    subscriber.callBackFunction(countValue)
    setSubscribers([...subscribers, subscriber])
  }

  const unsubscribeFunction = (subscriber) => {
    setSubscribers([...subscribers].filter(el => el.name !== subscriber.name))
    console.log(`--- '${subscriber.name}' unsubscribed ---`)
  }



  const dispatchFunction = ({type}) => {
    switch (type){
      case 'INCREMENT':
        setCountValue(countValue + 1)
        break
      case 'DECREMENT':
        setCountValue(countValue - 1 > 0 ? countValue - 1 : 0)
        break
      case 'RESET':
        setCountValue(0)
        break

      default :
        console.log("invalid type")
        break
    }
  }

  const manager = {
    subscribe: subscribeFunction,
    unsubscribe: unsubscribeFunction,
    dispatch: dispatchFunction,
    // countValue: countValue
  }

  useEffect(()=>{
    subscribers.forEach(subscriber => {
      console.log(subscriber)
      subscriber.callBackFunction(countValue)
    })
    console.log(`Value changed to ${countValue}, subscribers length: ${subscribers.length}`)
  }, [countValue])



  return (
    <div className="App">
        <Counter manager={manager}/>
    </div>
  );
}

export default App;
