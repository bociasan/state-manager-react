import './Counter.css'
import {useEffect, useState} from "react";

export const Counter = ({manager}) => {
    const [value, setValue] = useState(-1)
    const SUBSCRIBER = {
        name: "counter-component",
        callBackFunction: setValue
    }
    const increment = () => manager.dispatch({type: 'INCREMENT'})
    const decrement = () => manager.dispatch({type: 'DECREMENT'})
    useEffect(() => manager.subscribe(SUBSCRIBER), [])

    useEffect(() => {
        if (value > 10) {
            manager.unsubscribe(SUBSCRIBER)
            setValue('unsubscribed')
        }
    }, [value])

    return <div className="component-container component-main-container">
        <div className="title-container">
            <div className="title"> Counter </div>
        </div>
        <div className="count-value-container">
            <div className="count-value">
                {value}
            </div>
        </div>
        <div className="buttons-container">
            <button className="increment-button" onClick={() => increment()}>Increment</button>
            <button className="decrement-button" onClick={() => decrement()}>Decrement</button>
        </div>
    </div>
}

export default Counter