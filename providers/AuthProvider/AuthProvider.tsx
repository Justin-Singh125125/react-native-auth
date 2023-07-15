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

  const [isLoading, setIsLoading] = useState<AuthContextProps['isLoading']>(true);

  const autoSignin = async (discovery: DiscoveryDocument) => {
    setIsLoading(true);
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

      if (!tokenResponse.refreshToken) {
        throw new Error('No refresh token was returned.');
      }

      setTokenResponse(tokenResponse);

      await SecureStore.setItemAsync(REFRESH_TOKEN_CACHE_KEY, tokenResponse.refreshToken);
    } finally {
      setIsLoading(false);
    }
  };

  const signin: AuthContextProps['signin'] = async (tokenResponse) => {
    if (!tokenResponse.refreshToken) {
      throw new Error('No refresh token was provided.');
    }

    setTokenResponse(tokenResponse);

    await SecureStore.setItemAsync(REFRESH_TOKEN_CACHE_KEY, tokenResponse.refreshToken);
  };

  const signout: AuthContextProps['signout'] = async () => {
    setTokenResponse(null);

    await SecureStore.deleteItemAsync(REFRESH_TOKEN_CACHE_KEY);

    /**
     * if you have a revoke endpoint. Most providers do not support this
     */

    // const revokeTokenIfPresent = async (token: string | undefined, discovery: DiscoveryDocument) => {
    //   if (token) {
    //     await revokeAsync({ ...AUTH_CONFIG, token }, discovery);
    //   }
    // };

    // try {
    //   await revokeTokenIfPresent(accessToken, discovery);
    // } finally {
    //   await revokeTokenIfPresent(refreshToken, discovery);
    // }
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
      isLoading,
      signout,
    };
  }, [discovery, signin, tokenResponse, isLoading, signout]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
