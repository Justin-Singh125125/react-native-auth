import { StyleSheet, Text, View } from 'react-native';
import { AuthProvider } from './providers';
import { SignIn, HomeScreen } from './components';

export default function App() {
  return (
    <View style={styles.container}>
      <AuthProvider>
        <HomeScreen />
      </AuthProvider>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
