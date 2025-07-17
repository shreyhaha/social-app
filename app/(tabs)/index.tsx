import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  PanResponder,
  Dimensions,
  Image,
  TouchableOpacity,
} from 'react-native';
import { AntDesign } from '@expo/vector-icons';

const SCREEN_WIDTH = Dimensions.get('window').width;

const profiles = [
  { id: 1, name: 'Ava, 23', image: 'https://randomuser.me/api/portraits/women/1.jpg' },
  { id: 2, name: 'Mia, 25', image: 'https://randomuser.me/api/portraits/women/2.jpg' },
  { id: 3, name: 'Sophia, 22', image: 'https://randomuser.me/api/portraits/women/3.jpg' },
  { id: 4, name: 'Isabella, 26', image: 'https://randomuser.me/api/portraits/women/4.jpg' },
  { id: 5, name: 'Emma, 24', image: 'https://randomuser.me/api/portraits/women/5.jpg' },
  { id: 6, name: 'Olivia, 21', image: 'https://randomuser.me/api/portraits/women/6.jpg' },
  { id: 7, name: 'Amelia, 27', image: 'https://randomuser.me/api/portraits/women/7.jpg' },
  { id: 8, name: 'Ella, 22', image: 'https://randomuser.me/api/portraits/women/8.jpg' },
  { id: 9, name: 'Lily, 23', image: 'https://randomuser.me/api/portraits/women/9.jpg' },
  { id: 10, name: 'Chloe, 25', image: 'https://randomuser.me/api/portraits/women/10.jpg' },
  { id: 11, name: 'Ava, 23', image: 'https://randomuser.me/api/portraits/women/1.jpg' },
  { id: 12, name: 'Mia, 25', image: 'https://randomuser.me/api/portraits/women/2.jpg' },
  { id: 13, name: 'Sophia, 22', image: 'https://randomuser.me/api/portraits/women/3.jpg' },
  { id: 14, name: 'Isabella, 26', image: 'https://randomuser.me/api/portraits/women/4.jpg' },
  { id: 15, name: 'Emma, 24', image: 'https://randomuser.me/api/portraits/women/5.jpg' },
  { id: 16, name: 'Olivia, 21', image: 'https://randomuser.me/api/portraits/women/6.jpg' },
  { id: 17, name: 'Amelia, 27', image: 'https://randomuser.me/api/portraits/women/7.jpg' },
  { id: 18, name: 'Ella, 22', image: 'https://randomuser.me/api/portraits/women/8.jpg' },
  { id: 19, name: 'Lily, 23', image: 'https://randomuser.me/api/portraits/women/9.jpg' },
  { id: 20, name: 'Chloe, 25', image: 'https://randomuser.me/api/portraits/women/10.jpg' },
];

export default function MatchScreen() {
  const position = useRef(new Animated.ValueXY()).current;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showHearts, setShowHearts] = useState(false);

  // Pre-create heart animations OUTSIDE of .map()
  const heartAnimations = useRef(
    Array.from({ length: 6 }, () => new Animated.Value(0))
  ).current;

  const triggerHearts = () => {
    heartAnimations.forEach((anim) => {
      anim.setValue(0);
      Animated.timing(anim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }).start();
    });
  };

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: (_, gesture) => {
        position.setValue({ x: gesture.dx, y: gesture.dy });
      },
      onPanResponderRelease: (_, gesture) => {
        if (gesture.dx > 120) {
          swipeCard('right');
        } else if (gesture.dx < -120) {
          swipeCard('left');
        } else {
          resetCard();
        }
      },
    })
  ).current;

  const swipeCard = (direction: 'left' | 'right') => {
    if (direction === 'right') {
      setShowHearts(true);
      triggerHearts();
    }

    Animated.timing(position, {
      toValue: {
        x: direction === 'right' ? SCREEN_WIDTH + 100 : -SCREEN_WIDTH - 100,
        y: 0,
      },
      duration: 200,
      useNativeDriver: false,
    }).start(() => {
      position.setValue({ x: 0, y: 0 });
      setCurrentIndex((prev) => prev + 1);
      setShowHearts(false);
    });
  };

  const resetCard = () => {
    Animated.spring(position, {
      toValue: { x: 0, y: 0 },
      useNativeDriver: false,
    }).start();
  };

  const renderHeartExplosions = () => {
    if (!showHearts) return null;

    return (
      <View style={styles.heartBurst}>
        {heartAnimations.map((anim, i) => {
          const angle = (Math.PI * 2 * i) / heartAnimations.length;
          const x = Math.cos(angle) * 40;
          const y = Math.sin(angle) * 40;

          return (
            <Animated.View
              key={i}
              style={{
                position: 'absolute',
                transform: [
                  { translateX: anim.interpolate({ inputRange: [0, 1], outputRange: [0, x] }) },
                  { translateY: anim.interpolate({ inputRange: [0, 1], outputRange: [0, y] }) },
                  { scale: anim.interpolate({ inputRange: [0, 1], outputRange: [1.2, 0] }) },
                ],
                opacity: anim.interpolate({ inputRange: [0, 1], outputRange: [1, 0] }),
              }}
            >
              <AntDesign name="heart" size={16} color="#ff4d6d" />
            </Animated.View>
          );
        })}
      </View>
    );
  };

  const renderProfile = () => {
    if (currentIndex >= profiles.length) {
      return (
        <View style={styles.card}>
          <Text style={styles.name}>No more matches</Text>
        </View>
      );
    }

    const profile = profiles[currentIndex];
    return (
      <Animated.View
        {...panResponder.panHandlers}
        style={[styles.card, position.getLayout()]}
      >
        <Image source={{ uri: profile.image }} style={styles.image} />
        <Text style={styles.name}>{profile.name}</Text>
      </Animated.View>
    );
  };

  return (
    <View style={styles.container}>
      {renderProfile()}
      {renderHeartExplosions()}

      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          onPress={() => swipeCard('left')}
          style={[styles.button, styles.cross]}
        >
          <AntDesign name="close" size={30} color="#fff" />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => swipeCard('right')}
          style={[styles.button, styles.like]}
        >
          <AntDesign name="heart" size={30} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  card: {
    width: 320,
    height: 500,
    backgroundColor: '#fff',
    borderRadius: 16,
    elevation: 5,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
  },
  image: {
    width: 280,
    height: 350,
    borderRadius: 12,
    marginBottom: 15,
  },
  name: { fontSize: 22, fontWeight: '600' },
  buttonsContainer: {
    position: 'absolute',
    bottom: 40,
    width: '100%',
    paddingHorizontal: 60,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cross: { backgroundColor: '#FF6B6B' },
  like: { backgroundColor: '#4CD964' },
  heartBurst: {
    position: 'absolute',
    bottom: 100,
    left: '50%',
    transform: [{ translateX: -32 }],
    width: 64,
    height: 64,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
