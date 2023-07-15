import { StyleSheet, Text, View } from 'react-native';
import { AuthProvider } from './providers';

export default function App() {
  return (
    <View style={styles.container}>
      <AuthProvider>
        <Text>Hello World</Text>
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
