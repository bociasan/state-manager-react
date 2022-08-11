import './EvenDetector.css'
import {useEffect, useState} from "react";
import {globalManager} from "../StateManager/StateManager";

export const EvenDetector = () => {
    const UNSUBSCRIBED_VALUE = '---'
    const manager = globalManager
    const [limit, setLimit] = useState(10)
    const [checked, setChecked]= useState(false)
    const [subscribed, setSubscribed] = useState(false)
    const [value, setValue] = useState(UNSUBSCRIBED_VALUE)
    const SUBSCRIBER = {
        name: "even-detector-component",
        callBackFunction: setValue
    }

    const subscribe = () => {
        manager.subscribe(SUBSCRIBER)
        setSubscribed(true)
    }
    const unsubscribe = () => {
        manager.unsubscribe(SUBSCRIBER)
        setSubscribed(false)
        setValue(UNSUBSCRIBED_VALUE)
    }

    const handleBellClick = () => {
        if (subscribed)
            unsubscribe()
        else subscribe()
    }

    const handleCheckbox = () => {
        if (!checked && subscribed) showLimitAlert()
        setChecked(!checked)
    }

    const showLimitAlert = () => {
        alert(`From even-detector component: \n Value exceeds counter limit of ${limit}. \n Component will be unsubscribed. \n If you want to subscribe, reset the counter or make a lower value.`)
        unsubscribe()
    }

    // useEffect(() => subscribe(), [])
    useEffect(() => {
        if (checked && value > limit) {
            showLimitAlert()
        }
    }, [value])


    return <div className="even-detector-container component-main-container">
        <div className="title even-detector-title">
            Even Detector
        </div>
        <div className="value-indicator-container">
            <div className={"subscribe-container"}>
                <img className={subscribed ? "bell subscribed" : "bell unsubscribed"}
                     src={require("../../img/bell.png")} onClick={() => handleBellClick()}/>
            </div>
            <div className="even-detector-text value">
                {value}
            </div>
            <div className={"circle-indicator-container"}>
                <div className={value === 0 || value === UNSUBSCRIBED_VALUE ? "circle-indicator" :
                    value % 2 === 0 ? "circle-indicator even" : "circle-indicator odd"}/>
            </div>
        </div>
        <div className={"limit-container component-main-container"}>
            <div className="row-container">
                <div className={"limit-check-label"}>Limit check</div>
                <input type={"checkbox"} checked={checked ? "checked" : ""}
                       className={"limit-checkbox"} onChange={()=> handleCheckbox()}/>
            </div>
            <div className="row-container">
                <div>
                    Limit value
                </div>
                <input className={"limit-number-input"} type="text" inputMode="numeric" pattern="\d*"
                       value={limit} onChange={(e) => setLimit(parseInt(e.target.value))}/>
            </div>
        </div>
    </div>
}

export default EvenDetector