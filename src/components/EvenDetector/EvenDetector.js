import './EvenDetector.css'
import {useEffect, useState} from "react";
import {globalManager} from "../../App";

export const EvenDetector = () => {
    const manager = globalManager
    const DEF = "circle-indicator"
    const [value, setValue] = useState(555)
    const SUBSCRIBER = {
        name: "even-detector-component",
        callBackFunction: setValue
    }

    useEffect(() => manager.subscribe(SUBSCRIBER), [])

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
    </div>
}

export default EvenDetector