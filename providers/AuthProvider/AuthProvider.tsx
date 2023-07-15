import { isValidElement } from 'react';
import { useAutoDiscovery } from 'expo-auth-session';
import { AuthContext, AuthContextProps } from '../../context';
import { AuthProviderProps } from './AuthProvider.types';
import { useMemo, useState } from 'react';

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const discovery = useAutoDiscovery(
    'https://login.microsoftonline.com/a4310d02-5ebc-4101-8b85-ab8a740dd294/v2.0'
  );

  const [tokenResponse, setTokenResponse] = useState<AuthContextProps['tokenResponse']>(null);

  const signin: AuthContextProps['signin'] = async (tokenResponse) => {
    setTokenResponse(tokenResponse);
  };

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
