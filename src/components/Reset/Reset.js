import './Reset.css'
import {useEffect, useState} from "react";


export const Reset = ({manager}) => {
    const [value, setValue] = useState(999)
    const SUBSCRIBER = {
        name: "reset-component",
        callBackFunction: setValue
    }
    const reset = () => manager.dispatch({type: 'RESET'})
    useEffect(() => manager.subscribe(SUBSCRIBER), [])

    return <div className="reset-container component-main-container">
        <div className="reset-title title"> Reset </div>
    <div className="reset-text">
        {value}
    </div>
    <button className="reset-button" onClick={() => reset()}>Reset</button>

    </div>
}

export default Reset