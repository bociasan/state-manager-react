import './EvenDetector.css'
import {useEffect, useState} from "react";
import {globalManager} from "../../App";

export const EvenDetector = () => {
    const manager = globalManager
    const DEF = "circle-indicator"
    const [limit, setLimit] = useState(10)
    const [checked, setChecked]= useState(true)
    const [value, setValue] = useState(-1)
    const SUBSCRIBER = {
        name: "even-detector-component",
        callBackFunction: setValue
    }


    const subscribe = () => manager.subscribe(SUBSCRIBER)
    const unsubscribe = () => {
        manager.unsubscribe(SUBSCRIBER)
        setValue('---')
    }
    useEffect(() => subscribe(), [])
    useEffect(() => {
        if (checked && value > limit) {
            alert(`From counter component: \n Value exceeds counter limit of ${limit}. \n Counter  component will be unsubscribed. \n If you want to subscribe, reset the counter or make a lower value.`)
            unsubscribe()
        }
    }, [value])


    return <div className="even-detector-container component-main-container">
        <div className="title even-detector-title">
            Even Detector
        </div>
        <div className="value-indicator-container">
            <div className="even-detector-text">
                {value}
            </div>
            <div className={
                value === 0 ? DEF :
                    value % 2 === 0 ? DEF.concat(" even") : DEF.concat(" odd")
            }/>

        </div>
        <div className="row-container">
            <button onClick={() => subscribe()}> Subscribe </button>
            <button onClick={() => unsubscribe()}> Unsubscribe </button>
        </div>
        <div className={"limit-container component-main-container"}>
            <div className="row-container">
                <div className={"limit-check-label"}>Limit check</div>
                <input type={"checkbox"} checked={checked ? "checked" : ""}
                       className={"limit-checkbox"} onChange={()=>setChecked(!checked)}/>
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