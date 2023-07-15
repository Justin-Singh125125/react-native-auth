import { View, ActivityIndicator, Button, ButtonProps } from 'react-native';
import { useAuth } from '../../hooks';
import { SignIn } from '../SignIn';

export const HomeScreen = () => {
  const { isAuthenticated, isLoading, signout } = useAuth();

  if (isLoading) {
    return <ActivityIndicator />;
  }

  if (!isAuthenticated) {
    return <SignIn />;
  }

  const handlePress: ButtonProps['onPress'] = async () => {
    await signout();
  };

  return (
    <View>
      <Button title="Logout" onPress={handlePress} />
    </View>
  );
};
