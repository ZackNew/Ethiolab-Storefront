import { useVSFContext } from "@vue-storefront/core"

const useInstantMessage = function(){
    const context  = useVSFContext();

    return {
       async sendMessage(params){
       //     console.log('%c called!', 'color: green')
       //     console.log(context.$vendure.api.writeContactUsMessage)
           console.log('sendMessage Called')
           await context.$vendure.api.writeInstantMessage({...params})
            // console.log('helloxxxxxxx')
        },
        async getUserInstantMessage(params){
            // console.log('get all user\'s called');
            return await context.$vendure.api.getUserInstantMessage({...params});
        }
    }
}
export {useInstantMessage}