import './EvenDetector.css'
import {useEffect, useState} from "react";
import {globalManager} from "../StateManager/StateManager";
import {createSubscriber, createUnsubscriber} from "../../utils/functions";

export const EvenDetector = () => {
    const UNSUBSCRIBED_VALUE = '---'
    const manager = globalManager
    const [limit, setLimit] = useState(10)
    const [checked, setChecked]= useState(false)
    const [subscribed, setSubscribed] = useState(true)
    const [counterValue, setCounterValue] = useState(UNSUBSCRIBED_VALUE)
    const NAME = 'EVDT'
    const STORES = [{count:setCounterValue}]
    const SUBSCRIBER = createSubscriber(NAME, STORES)
    const STORE = 'count'
    const UNSUBSCRIBER = createUnsubscriber(NAME, STORE)

    const subscribe = () => {
        manager.subscribe(SUBSCRIBER)
        setSubscribed(true)
    }
    const unsubscribe = () => {
        manager.unsubscribe(UNSUBSCRIBER)
        setSubscribed(false)
        setCounterValue(UNSUBSCRIBED_VALUE)
    }

    const handleBellClick = () => {
        if (subscribed)
            unsubscribe()
        else subscribe()
    }

    const handleCheckbox = () => {
        if (!checked && subscribed && counterValue > limit) showLimitAlert()
        setChecked(!checked)
    }

    const showLimitAlert = () => {
        alert(`From even-detector component: \n Value exceeds counter limit of ${limit}. \n Component will be unsubscribed. \n If you want to subscribe, reset the counter or make a lower value.`)
        unsubscribe()
    }

    useEffect(() => subscribe(), [])
    useEffect(() => {
        if (checked && counterValue > limit) {
            showLimitAlert()
        }
    }, [counterValue])


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
                {counterValue}
            </div>
            <div className={"circle-indicator-container"}>
                <div className={counterValue === 0 || counterValue === UNSUBSCRIBED_VALUE ? "circle-indicator" :
                    counterValue % 2 === 0 ? "circle-indicator even" : "circle-indicator odd"}/>
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