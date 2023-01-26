import { useVSFContext } from '@vue-storefront/core';

const useInstantMessage = function () {
  const context = useVSFContext();

  return {
    async sendMessage(params) {
      await context.$vendure.api.writeInstantMessage({ ...params });
    },
    async getUserInstantMessage(params) {
      return await context.$vendure.api.getUserInstantMessage({ ...params });
    },
  };
};
export { useInstantMessage };
