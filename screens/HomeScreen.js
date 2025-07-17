import React, { useRef, useEffect } from 'react';
import {
  View,
  Text,
  Animated,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

export default function HomeScreen() {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const bounceAnim = useRef(new Animated.Value(1)).current;
  const slideAnim = useRef(new Animated.Value(300)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1500,
      useNativeDriver: true,
    }).start();

    Animated.spring(slideAnim, {
      toValue: 0,
      useNativeDriver: true,
    }).start();
  }, []);

  const handlePress = () => {
    Animated.sequence([
      Animated.timing(bounceAnim, {
        toValue: 1.2,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(bounceAnim, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
  };

  return (
    <View style={styles.container}>
      <Animated.Text style={[styles.title, { opacity: fadeAnim }]}>
        Welcome to SocialMatch!
      </Animated.Text>

      <Animated.View style={{ transform: [{ scale: bounceAnim }] }}>
        <TouchableOpacity onPress={handlePress} style={styles.button}>
          <Text style={styles.buttonText}>Find a Match</Text>
        </TouchableOpacity>
      </Animated.View>

      <Animated.View style={[styles.card, { transform: [{ translateY: slideAnim }] }]}>
        <Text style={styles.cardText}>👤 Match Suggestion: Alex, 23</Text>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#F5F5F5',
  },
  title: {
    fontSize: 28, fontWeight: 'bold', marginBottom: 30,
  },
  button: {
    backgroundColor: '#FF5C5C', paddingVertical: 12, paddingHorizontal: 24, borderRadius: 8,
  },
  buttonText: {
    color: '#fff', fontSize: 18,
  },
  card: {
    marginTop: 40,
    padding: 20,
    backgroundColor: '#FFF',
    borderRadius: 10,
    elevation: 5,
  },
  cardText: {
    fontSize: 16,
  },
});
