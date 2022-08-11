export const createSubscriber = (name, stores) => {
    const callBackFunctions = stores.map(store =>{
            const storeName = Object.keys(store)[0]
            const storeFunction = stores.find(el => Object.keys(el)[0] == storeName)[storeName]
            return {
                storeName: storeName,
                function: storeFunction
        }})
    return {
        subscriberName: name,
        callBackFunctions: callBackFunctions
    }
}

export const createUnsubscriber = (name, store) => {
    return {
        unsubscriberName: name,
        storeName: store
    }
}