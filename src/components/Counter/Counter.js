import './Counter.css'
import {useEffect, useState} from "react";
import {globalManager} from "../StateManager/StateManager";

export const Counter = () => {
    const manager = globalManager

    const [value, setValue] = useState(-2)

    const SUBSCRIBER = {
        name: "counter-component",
        callBackFunction: setValue
    }
    const increment = () => manager.dispatch({type: 'INCREMENT'})
    const decrement = () => manager.dispatch({type: 'DECREMENT'})
    const subscribe = () => manager.subscribe(SUBSCRIBER)
    const unsubscribe = () => {
        manager.unsubscribe(SUBSCRIBER)
        setValue('unsubscribed')
    }
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
        {/*<button onClick={() => unsubscribe()}> Unsubscribe </button>*/}
        {/*<button onClick={() => subscribe()}> Subscribe </button>*/}
        {/*<div className={"limit-container"}>*/}
        {/*    <div className="row-container">*/}
        {/*        <div className={"limit-check-label"}>Limit check</div>*/}
        {/*        <input type={"checkbox"} checked={checked ? "checked" : ""}*/}
        {/*               className={"limit-checkbox"} onChange={()=>setChecked(!checked)}/>*/}
        {/*    </div>*/}
        {/*    <div className="row-container">*/}
        {/*        <div>*/}
        {/*            Limit value*/}
        {/*        </div>*/}
        {/*        <input className={"limit-number-input"} type="text" inputMode="numeric" pattern="\d*"*/}
        {/*               value={limit} onChange={(e) => setLimit(parseInt(e.target.value))}/>*/}
        {/*    </div>*/}
        {/*</div>*/}
    </div>
}

export default Counter