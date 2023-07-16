import { useAuthRequest, exchangeCodeAsync, TokenResponse } from 'expo-auth-session';
import { Button, ButtonProps } from 'react-native';
import { useAuth } from '../../hooks';
import { AUTH_CONFIG } from '../../constants';

export const SignIn = () => {
  const { discovery, signin } = useAuth();

  const [_, __, promptAsync] = useAuthRequest(AUTH_CONFIG, discovery);

  const handlePress: ButtonProps['onPress'] = async () => {
    const result = await promptAsync();

    if (result.type === 'success' && discovery) {
      const { code } = result.params;

      const tokenResponse = await exchangeCodeAsync({ ...AUTH_CONFIG, code }, discovery);

      await signin(tokenResponse);
    }
  };

  return <Button title="Sign In" onPress={handlePress} />;
};
