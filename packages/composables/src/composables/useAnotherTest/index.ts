interface AnotherTestParams{
    name: string
}

import { ref } from "@vue/composition-api"
export function  useAnotherTest(param: AnotherTestParams){
    const name = ref('');
    const setName = (newName) => name.value = newName;
    return {name, setName}
}