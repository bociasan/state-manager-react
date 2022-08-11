import {useEffect, useState} from "react";

export const globalManager = {
    subscribe: ()=>{},
    unsubscribe: ()=>{},
    dispatch: ()=>{},
}

export const StateManager = () => {
    const [state, setState] = useState({
        count: 0,
        subscribers: []
    })

    const subscribeFunction = (subscriber) => {
        console.log(`--- '${subscriber.name}' subscribed ---`)
        subscriber.callBackFunction(state.count)
        state.subscribers.push(subscriber)
    }

    const unsubscribeFunction = (subscriber) => {
        state.subscribers = state.subscribers.filter(el => el.name !== subscriber.name)
        console.log(`--- '${subscriber.name}' unsubscribed ---`)
    }

    const dispatchFunction = ({type}) => {
        switch (type){
            case 'INCREMENT':
                // state.count.value += 1
                state.count += 1
                break
            case 'DECREMENT':
                state.count - 1 > 0 ? state.count -= 1 : state.count = 0
                break
            case 'RESET':
                state.count = 0
                break

            default :
                console.log("invalid type")
                break
        }
        sendToSubscribers()
    }

    globalManager["subscribe"] = subscribeFunction
    globalManager["unsubscribe"] = unsubscribeFunction
    globalManager["dispatch"] = dispatchFunction

    const sendToSubscribers = ()=>{
        state.subscribers.forEach(subscriber => {
            subscriber.callBackFunction(state.count)
        })
        console.log(state.subscribers)
        console.log(`Value changed to ${state.count}, subscribers length: ${state.subscribers.length}`)
    }

}
export default StateManager