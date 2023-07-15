import { DiscoveryDocument, TokenResponse } from 'expo-auth-session';

export type AuthContextProps = {
  isLoading: boolean;
  isAuthenticated: boolean;
  discovery: DiscoveryDocument | null;
  tokenResponse: TokenResponse | null;
  signin: (tokenResponse: TokenResponse) => Promise<void>;
};
