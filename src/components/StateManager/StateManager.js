export const globalManager = {
    subscribe: ()=>{},
    unsubscribe: ()=>{},
    dispatch: ()=>{},
}

export const StateManager = () => {
    const state = {
        count: {
            value:0,
            subscribers: []
        },
        totalCountSubscribers: {
            value:0,
            subscribers: []
        }
    }

    const subscribeFunction = (subscriber) => {
        subscriber.callBackFunctions.forEach(el => {
            handleOnSubscribe(el.storeName)
            state[el.storeName].subscribers.push({name:subscriber.subscriberName, function:el.function})
            console.log(`--- '${subscriber.subscriberName}' subscribed to ~${el.storeName}~ ---`)
            el.function(state[el.storeName].value)
        })
    }

    const handleOnSubscribe = (storeName) => {
        if (storeName === 'count') {
            state['totalCountSubscribers'].value++
            handleTotalSubscribersStore('totalCountSubscribers')
        }
    }

    const handleOnUnubscribe = (storeName) => {
        if (storeName === 'count') {
            state['totalCountSubscribers'].value--
            handleTotalSubscribersStore('totalCountSubscribers')
        }
    }

    const unsubscribeFunction = (unsubscriber) => {
        handleOnUnubscribe(unsubscriber.storeName)
        console.log(`--- '${unsubscriber.unsubscriberName}' unsubscribed from ~${unsubscriber.storeName}~ ---`)
        state[unsubscriber.storeName].subscribers = state[unsubscriber.storeName].subscribers.filter(el => el.name !== unsubscriber.unsubscriberName)
    }

    const dispatchFunction = ({store, type}) => {
        switch (store){
            case 'count':
                handleCountStore(type)
                break
            case 'totalCountSubscribers':
                handleTotalSubscribersStore(store)
                break
        }
    }

    globalManager["subscribe"] = subscribeFunction
    globalManager["unsubscribe"] = unsubscribeFunction
    globalManager["dispatch"] = dispatchFunction

    const handleCountStore = (type) => {
        const store = 'count'
        switch (type){
            case 'INCREMENT':
                state[store].value += 1
                break
            case 'DECREMENT':
                state[store].value - 1 > 0 ? state[store].value -= 1 : state[store].value = 0
                break
            case 'RESET':
                state[store].value = 0
                break

            default :
                console.log("invalid type")
                break
        }
        sendToSubscribers(store)

    }

    const sendToSubscribers = (store) => {
        state[store].subscribers.forEach(subscriber => {
            subscriber.function(state[store].value)
        })
        // console.log(state[store].subscribers)
        console.log(`Store: ${store}, Value: ${state[store].value}, Subscribers: ${state[store].subscribers.length}`)
    }

    const handleTotalSubscribersStore = (store) => {
        sendToSubscribers(store)
    }
}
export default StateManager