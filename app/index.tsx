import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { useRouter } from 'expo-router';

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Basic check (replace with real validation/auth later)
    if (!email || !password) {
      Alert.alert('Error', 'Please enter both email and password.');
      return;
    }

    // Navigate to the tab layout (Match, Profile, etc.)
    router.replace('/(tabs)/profile'); // or index

  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login to SocialMatch</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        autoCapitalize="none"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        autoCapitalize="none"
        value={password}
        onChangeText={setPassword}
      />

      <Button title="Login" onPress={handleLogin} color="#4A90E2" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 26, fontWeight: 'bold', textAlign: 'center', marginBottom: 30 },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    paddingHorizontal: 15,
    marginBottom: 15,
    borderRadius: 8,
  },
});
