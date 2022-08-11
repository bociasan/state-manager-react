import './Reset.css'
import {useEffect, useState} from "react";
import {globalManager} from "../StateManager/StateManager";
import {createSubscriber} from "../../utils/functions";

export const Reset = () => {
    const manager = globalManager
    const [counterValue, setCounterValue] = useState(-3)
    const NAME = 'RST'
    const STORES = [{count:setCounterValue}]
    const SUBSCRIBER = createSubscriber(NAME, STORES)
    const reset = () => manager.dispatch({store: 'count', type: 'RESET'})
    useEffect(() => manager.subscribe(SUBSCRIBER), [])

    return <div className="reset-container component-main-container">
        <div className="reset-title title"> Reset </div>
        <div className="reset-text value">
            {counterValue}
        </div>
        <button className="reset-button" onClick={() => reset()}>Reset</button>
    </div>
}

export default Reset