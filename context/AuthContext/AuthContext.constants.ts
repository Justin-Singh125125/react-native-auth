import { AuthContextProps } from './AuthContext.types';

export const INITIAL_AUTH_CONTEXT: AuthContextProps = {
  isAuthenticated: false,
  discovery: null,
  tokenResponse: null,
  signin: () => Promise.resolve(),
};
