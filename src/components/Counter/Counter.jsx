import './Counter.css'
import {useEffect, useState} from "react";
import {globalManager} from "../StateManager/StateManager";
import {createSubscriber, createUnsubscriber} from "../../utils/functions";

export const Counter = () => {
    const manager = globalManager

    const [value, setValue] = useState(-2)
    const [totalSubscribers, setTotalSubscribers] = useState('?')
    const NAME = 'counter-component'
    const STORES = [{count:setValue}, {totalSubscribers:setTotalSubscribers}]
    const SUBSCRIBER = createSubscriber(NAME, STORES)

    const increment = () => manager.dispatch({store: 'count', type: 'INCREMENT'})
    const decrement = () => manager.dispatch({store: 'count', type: 'DECREMENT'})
    const subscribe = () => manager.subscribe(SUBSCRIBER)

    useEffect(() => subscribe(), [])



    return <div className="counter-component-container component-main-container">
        <div className="title-container">
            <div className="title"> Counter </div>
        </div>
        <div className="count-value-container">
            <div className="count-value value">
                {value}
            </div>
        </div>
        <div className="buttons-container">
            <button className="increment-button" onClick={() => increment()}>Increment</button>
            <button className="decrement-button" onClick={() => decrement()}>Decrement</button>
        </div>
        <div> {`Total subscribers: ${totalSubscribers}`}</div>
    </div>
}

export default Counter