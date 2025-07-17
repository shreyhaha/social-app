import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';

export default function Profile() {
  const handleLogout = () => {
    Alert.alert('Logout', 'You have been logged out.');
    // You can add router.replace('/login') here if you implement authentication
  };

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: 'https://randomuser.me/api/portraits/men/44.jpg' }}
        style={styles.avatar}
      />
      <Text style={styles.username}>imaguy</Text>
      <Text style={styles.bio}>Just a guy vibing in the digital dating world 💫</Text>

      <View style={styles.infoBox}>
        <Text style={styles.label}>Email</Text>
        <Text style={styles.value}>wtf@example.com</Text>

        <Text style={styles.label}>Age</Text>
        <Text style={styles.value}>22</Text>

        <Text style={styles.label}>Location</Text>
        <Text style={styles.value}>Mumbai,India</Text>
      </View>

      <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', padding: 24, backgroundColor: '#fff' },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginTop: 30,
    marginBottom: 16,
  },
  username: { fontSize: 22, fontWeight: 'bold', marginBottom: 6 },
  bio: { fontSize: 14, color: '#666', textAlign: 'center', marginBottom: 20 },
  infoBox: {
    width: '100%',
    backgroundColor: '#f2f2f2',
    padding: 16,
    borderRadius: 12,
    marginBottom: 24,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#555',
    marginTop: 8,
  },
  value: {
    fontSize: 16,
    color: '#000',
  },
  logoutBtn: {
    backgroundColor: '#FF6B6B',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 30,
  },
  logoutText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
