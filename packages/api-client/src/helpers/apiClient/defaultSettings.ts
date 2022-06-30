import { ClientConfig } from '../../types';

export const defaultSettings: ClientConfig = {
  api: {
    uri: ''
  },
  auth: {
    getAuthCookie: () => '',
    setAuthCookie: (token) => token,
    removeAuthCookie: () => ''
  },
  currency: 'ETB',
  lang: 'en'
};
