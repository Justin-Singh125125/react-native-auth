import { AuthContextProps } from './AuthContext.types';

export const INITIAL_AUTH_CONTEXT: AuthContextProps = {
  isLoading: true,
  isAuthenticated: false,
  discovery: null,
  tokenResponse: null,
  signin: () => Promise.resolve(),
};
