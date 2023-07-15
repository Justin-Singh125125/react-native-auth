import { AuthContext } from '../../context';
import { AuthProviderProps } from './AuthProvider.types';

export const AuthProvider = ({ children }: AuthProviderProps) => {
  return (
    <AuthContext.Provider
      value={{
        discovery: null,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
