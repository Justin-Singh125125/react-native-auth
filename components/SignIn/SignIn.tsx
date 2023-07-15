import { useAuthRequest, exchangeCodeAsync } from 'expo-auth-session';
import { Button, ButtonProps } from 'react-native';
import { useAuth } from '../../hooks';
import { AUTH_CONFIG } from '../../constants';

export const SignIn = () => {
  const { discovery } = useAuth();

  const [_, __, promptAsync] = useAuthRequest(AUTH_CONFIG, discovery);

  const handlePress: ButtonProps['onPress'] = async () => {
    const result = await promptAsync();

    if (result.type === 'success' && discovery) {
      const { code } = result.params;
      console.log(code);
      const { accessToken, refreshToken } = await exchangeCodeAsync(
        {
          clientId: AUTH_CONFIG.clientId,
          redirectUri: AUTH_CONFIG.redirectUri,
          code,
        },
        discovery
      );

      console.log('accessToken', accessToken);
      console.log('refreshToken', refreshToken);
    }
  };

  return <Button title="Sign In" onPress={handlePress} />;
};
