import { useVSFContext } from "@vue-storefront/core"

const useInstantMessage = function(){
    const context  = useVSFContext();

    return {
        sendMessage(params){
       //     console.log('%c called!', 'color: green')
       //     console.log(context.$vendure.api.writeContactUsMessage)
           console.log('sendMessage Called')
           //return context.$vendure.api.writeInstantMessage({...params})
        },
        getUserInstantMessage(params){
            console.log('get all user\'s called');
            //return context.$vendure.api.getUserInstantMessage({...params});
        }
    }
}
export {useInstantMessage}