import { Text, ActivityIndicator } from 'react-native';
import { useAuth } from '../../hooks';
import { SignIn } from '../SignIn';

export const HomeScreen = () => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <ActivityIndicator />;
  }

  if (!isAuthenticated) {
    return <SignIn />;
  }

  return <Text>Authenticated</Text>;
};
