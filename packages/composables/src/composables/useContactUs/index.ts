import { useVSFContext } from "@vue-storefront/core"

const useContactUs = function(){
    const context  = useVSFContext();

    return {
        sendContactUs(params){
           console.log(params);
        }
    }
}
export {useContactUs}