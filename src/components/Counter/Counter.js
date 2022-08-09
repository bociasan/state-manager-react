import './Counter.css'
import {useEffect} from "react";

export const Counter = ({manager}) => {
    const increment = () => {
        manager.dispatch({type: 'INCREMENT'})
    }

    const decrement = () => {
        manager.dispatch({type: 'DECREMENT'})
    }

    return <div className="component-container">
        <div className="title-container">
            <div className="title"> Counter </div>
        </div>
        <div className="count-value-container">
            <div className="count-value">
                {manager.countValue}
            </div>
        </div>
        <div className="buttons-container">
            <button className="increment-button" onClick={() => increment()}>Increment</button>
            <button className="decrement-button" onClick={() => decrement()}>Decrement</button>
        </div>
    </div>
}

export default Counter