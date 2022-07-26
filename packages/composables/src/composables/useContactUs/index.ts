import { useVSFContext } from "@vue-storefront/core"

const useContactUs = function(){
    const context  = useVSFContext();

    return {
        sendContactUs(params){
       //     console.log('%c called!', 'color: green')
       //     console.log(context.$vendure.api.writeContactUsMessage)
           context.$vendure.api.writeContactUsMessage({...params})
        }
    }
}
export {useContactUs}