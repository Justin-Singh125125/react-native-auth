import { createContext } from 'react';
import { AuthContextProps } from './AuthContext.types';
import { INITIAL_AUTH_CONTEXT } from './AuthContext.constants';

export const AuthContext = createContext<AuthContextProps>(INITIAL_AUTH_CONTEXT);
