import { Text } from 'react-native';
import { useAuth } from '../../hooks';
import { SignIn } from '../SignIn';

export const HomeScreen = () => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <SignIn />;
  }

  return <Text>Authenticated</Text>;
};
