import { DiscoveryDocument } from 'expo-auth-session';

export type AuthContextProps = {
  discovery: DiscoveryDocument | null;
};
