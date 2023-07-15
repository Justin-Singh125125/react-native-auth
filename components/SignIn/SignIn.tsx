import { Button } from 'react-native';
import { useAuth } from '../../hooks';

export const SignIn = () => {
  const { discovery } = useAuth();

  return <Button title="Sign In" onPress={() => {}} />;
};
