import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

const tags = ['#funny', '#memes', '#love', '#dating', '#selfcare', '#pets', '#sports'];

const users = [
  { id: '1', name: 'ava_dev', avatar: 'https://randomuser.me/api/portraits/women/65.jpg' },
  { id: '2', name: 'memequeen', avatar: 'https://randomuser.me/api/portraits/women/33.jpg' },
  { id: '3', name: 'shreyhaha', avatar: 'https://randomuser.me/api/portraits/women/88.jpg' },
];

const posts = Array.from({ length: 12 }, (_, i) => ({
  id: i.toString(),
  image: `https://source.unsplash.com/random/300x300?sig=${i}`,
}));

export default function Search() {
  const [query, setQuery] = useState('');

  const filteredTags = tags.filter((tag) => tag.includes(query.toLowerCase()));

  return (
    <ScrollView style={styles.container}>
      <TextInput
        placeholder="Search users, tags..."
        style={styles.searchInput}
        value={query}
        onChangeText={setQuery}
      />

      {/* 🔥 Trending tags */}
      <View style={styles.tagContainer}>
        {(query ? filteredTags : tags).map((tag, index) => (
          <View key={index} style={styles.tag}>
            <Text style={styles.tagText}>{tag}</Text>
          </View>
        ))}
      </View>

      {/* 👥 Suggested Users */}
      <Text style={styles.sectionTitle}>Suggested Users</Text>
      {users.map((user) => (
        <View key={user.id} style={styles.userRow}>
          <Image source={{ uri: user.avatar }} style={styles.avatar} />
          <Text style={styles.username}>@{user.name}</Text>
          <TouchableOpacity style={styles.followButton}>
            <Text style={styles.followText}>Follow</Text>
          </TouchableOpacity>
        </View>
      ))}

      {/* 📷 Explore Grid */}
      <Text style={styles.sectionTitle}>Explore</Text>
      <FlatList
        data={posts}
        keyExtractor={(item) => item.id}
        numColumns={3}
        renderItem={({ item }) => (
          <Image source={{ uri: item.image }} style={styles.gridImage} />
        )}
        scrollEnabled={false}
        columnWrapperStyle={{ justifyContent: 'space-between' }}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, backgroundColor: '#fff', flex: 1 },
  searchInput: {
    backgroundColor: '#f1f1f1',
    borderRadius: 12,
    paddingHorizontal: 16,
    height: 44,
    marginBottom: 16,
  },
  tagContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 24,
  },
  tag: {
    backgroundColor: '#E0F0FF',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginRight: 8,
    marginBottom: 8,
  },
  tagText: { color: '#007AFF', fontWeight: '600' },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 12,
    color: '#333',
  },
  userRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    marginRight: 12,
  },
  username: {
    flex: 1,
    fontSize: 16,
    color: '#444',
  },
  followButton: {
    backgroundColor: '#4A90E2',
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 8,
  },
  followText: {
    color: '#fff',
    fontWeight: '600',
  },
  gridImage: {
    width: '32%',
    aspectRatio: 1,
    borderRadius: 8,
    marginBottom: 8,
  },
});
