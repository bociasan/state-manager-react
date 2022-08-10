import './Reset.css'
import {useEffect, useState} from "react";
import {globalManager} from "../../App";

export const Reset = () => {
    const manager = globalManager
    const [value, setValue] = useState(999)
    const SUBSCRIBER = {
        name: "reset-component",
        callBackFunction: setValue
    }
    const reset = () => manager.dispatch({type: 'RESET'})
    useEffect(() => manager.subscribe(SUBSCRIBER), [])

    // console.log(globalManager)

    return <div className="reset-container component-main-container">
        <div className="reset-title title"> Reset </div>
    <div className="reset-text">
        {value}
    </div>
    <button className="reset-button" onClick={() => reset()}>Reset</button>

    </div>
}

export default Reset