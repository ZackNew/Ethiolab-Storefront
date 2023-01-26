import { useVSFContext } from '@vue-storefront/core';
import { ref } from '@vue/composition-api';

export function useTinNumber() {
  const context = useVSFContext();
  const tinNumber = ref('');

  return {
    setTinNumber(params) {},
    load() {},
    tinNumber,
  };
}
