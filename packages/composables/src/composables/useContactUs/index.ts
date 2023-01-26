import { useVSFContext } from '@vue-storefront/core';

const useContactUs = function () {
  const context = useVSFContext();

  return {
    sendContactUs(params) {
      context.$vendure.api.writeContactUsMessage({ ...params });
    },
  };
};
export { useContactUs };
