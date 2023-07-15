import { useAuthRequest, makeRedirectUri } from 'expo-auth-session';
import { Button, ButtonProps } from 'react-native';
import { useAuth } from '../../hooks';
import { AUTH_CONFIG } from '../../constants';

export const SignIn = () => {
  const { discovery } = useAuth();

  const [_, __, promptAsync] = useAuthRequest(AUTH_CONFIG, discovery);

  const handlePress: ButtonProps['onPress'] = async () => {
    const result = await promptAsync();

    if (result.type === 'success') {
      const { code } = result.params;
      console.log(code);
    }
  };

  return <Button title="Sign In" onPress={handlePress} />;
};
