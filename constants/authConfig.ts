import { AuthRequestConfig, makeRedirectUri } from 'expo-auth-session';

export const AUTH_CONFIG: AuthRequestConfig = {
  clientId: '53a36208-e172-4574-a2f9-7f4d189e6ade',
  redirectUri: makeRedirectUri(),
  scopes: ['openid', 'profile', 'email', 'offline_access'],
};
