import { useEffect } from 'react';
import * as SecureStore from 'expo-secure-store';
import { useAutoDiscovery, refreshAsync, DiscoveryDocument } from 'expo-auth-session';
import { AuthContext, AuthContextProps } from '../../context';
import { AuthProviderProps } from './AuthProvider.types';
import { REFRESH_TOKEN_CACHE_KEY } from './AuthProvider.constants';
import { useMemo, useState } from 'react';
import { AUTH_CONFIG } from '../../constants';

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const discovery = useAutoDiscovery(
    'https://login.microsoftonline.com/a4310d02-5ebc-4101-8b85-ab8a740dd294/v2.0'
  );

  const [tokenResponse, setTokenResponse] = useState<AuthContextProps['tokenResponse']>(null);

  const autoSignin = async (discovery: DiscoveryDocument) => {
    try {
      const refreshToken = await SecureStore.getItemAsync(REFRESH_TOKEN_CACHE_KEY);

      if (!refreshToken) {
        throw new Error('No refresh token was found in cache');
      }

      const tokenResponse = await refreshAsync(
        {
          ...AUTH_CONFIG,
          refreshToken,
        },
        discovery
      );

      setTokenResponse(tokenResponse);
    } catch (e) {}
  };

  const signin: AuthContextProps['signin'] = async (tokenResponse) => {
    if (!tokenResponse.refreshToken) {
      throw new Error('No refresh token was provided.');
    }

    setTokenResponse(tokenResponse);

    await SecureStore.setItemAsync(REFRESH_TOKEN_CACHE_KEY, tokenResponse.refreshToken);
  };

  useEffect(() => {
    if (discovery) {
      autoSignin(discovery);
    }
  }, [discovery]);

  const value = useMemo<AuthContextProps>(() => {
    return {
      isAuthenticated: Boolean(tokenResponse?.accessToken),
      discovery,
      signin,
      tokenResponse,
    };
  }, [discovery, signin, tokenResponse]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
