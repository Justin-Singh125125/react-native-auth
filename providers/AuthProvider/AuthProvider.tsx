import { useAutoDiscovery } from 'expo-auth-session';
import { AuthContext, AuthContextProps } from '../../context';
import { AuthProviderProps } from './AuthProvider.types';
import { useMemo } from 'react';

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const discovery = useAutoDiscovery(
    'https://login.microsoftonline.com/a4310d02-5ebc-4101-8b85-ab8a740dd294/v2.0'
  );

  const value = useMemo<AuthContextProps>(() => {
    return {
      discovery,
    };
  }, [discovery]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
