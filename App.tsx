import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import { AuthProvider } from './providers';
import { HomeScreen } from './components';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <AuthProvider>
        <HomeScreen />
      </AuthProvider>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
