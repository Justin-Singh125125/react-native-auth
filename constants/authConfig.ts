import { AuthRequestConfig, makeRedirectUri } from 'expo-auth-session';
import { expo } from '../app.json';

export const AUTH_CONFIG: AuthRequestConfig = {
  clientId: '53a36208-e172-4574-a2f9-7f4d189e6ade',
  redirectUri: makeRedirectUri({ scheme: expo.scheme }),
  // https://github.com/AzureAD/microsoft-authentication-library-for-js/issues/521#issuecomment-577400515
  scopes: ['53a36208-e172-4574-a2f9-7f4d189e6ade/.default', 'offline_access'],
  usePKCE: false,
};
