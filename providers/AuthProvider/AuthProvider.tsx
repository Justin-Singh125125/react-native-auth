import { useEffect } from 'react';
import * as SecureStore from 'expo-secure-store';
import { useAutoDiscovery, refreshAsync, TokenResponse } from 'expo-auth-session';
import { AuthContext, AuthContextProps } from '../../context';
import { AuthProviderProps } from './AuthProvider.types';
import { REFRESH_TOKEN_CACHE_KEY } from './AuthProvider.constants';
import { useState } from 'react';
import { AUTH_CONFIG } from '../../constants';
import { useApiInterceptor } from './hooks';

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const discovery = useAutoDiscovery(
    'https://login.microsoftonline.com/a4310d02-5ebc-4101-8b85-ab8a740dd294/v2.0'
  );

  const [tokenResponse, setTokenResponse] = useState<AuthContextProps['tokenResponse']>(null);

  const [isLoading, setIsLoading] = useState<AuthContextProps['isLoading']>(true);

  const refreshTokenConcurrently: AuthContextProps['refreshTokenConcurrently'] = async (
    tokenResponse
  ) => {
    if (!discovery) {
      throw new Error('No discovery found.');
    }

    if (!tokenResponse) {
      throw new Error('No tokens found.');
    }

    if (TokenResponse.isTokenFresh(tokenResponse)) {
      return tokenResponse;
    }

    const originalRefreshToken = tokenResponse.refreshToken;

    const newTokenResponse = await refreshAsync(
      {
        ...AUTH_CONFIG,
        refreshToken: originalRefreshToken,
      },
      discovery
    );

    if (!newTokenResponse.refreshToken) {
      throw new Error('No refresh token was returned.');
    }

    setTokenResponse(tokenResponse);

    await SecureStore.setItemAsync(REFRESH_TOKEN_CACHE_KEY, newTokenResponse.refreshToken);

    return newTokenResponse;
  };

  const autoSignin = async () => {
    setIsLoading(true);
    try {
      if (!discovery) {
        throw new Error('No discovery found.');
      }

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
  };

  useEffect(() => {
    if (discovery) {
      autoSignin();
    }
  }, [discovery]);

  const value: AuthContextProps = {
    isAuthenticated: Boolean(tokenResponse?.accessToken),
    discovery,
    tokenResponse,
    isLoading,
    signin,
    signout,
    refreshTokenConcurrently,
  };

  useApiInterceptor(value);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
