// app/(tabs)/community.tsx
import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { AntDesign } from '@expo/vector-icons';

type Post = {
  id: string;
  user: string;
  text: string;
  upvotes: number;
};


const initialPosts = [
  { id: '1', user: 'whatthehell', text: 'What’s the best rom-com on Netflix right now?', upvotes: 12 },
  { id: '2', user: 'ava_dev', text: 'How do you guys deal with burnout?', upvotes: 8 },
  { id: '3', user: 'memequeen', text: 'Cat or dog people?', upvotes: 20 },
];

const [posts, setPosts] = useState<Post[]>(initialPosts);

export default function Community() {
  const [posts, setPosts] = useState(initialPosts);
  const [input, setInput] = useState('');

  const handlePost = () => {
    if (!input.trim()) return;
    const newPost = {
      id: (posts.length + 1).toString(),
      user: 'you',
      text: input,
      upvotes: 0,
    };
    setPosts([newPost, ...posts]);
    setInput('');
  };

  const upvotePost = (id: string) => {
    setPosts((prev) =>
      prev.map((post) =>
        post.id === id ? { ...post, upvotes: post.upvotes + 1 } : post
      )
    );
  };

  const renderItem = ({ item }: { item: Post }) => (
    <View style={styles.postCard}>
      <Text style={styles.user}>@{item.user}</Text>
      <Text style={styles.text}>{item.text}</Text>
      <TouchableOpacity onPress={() => upvotePost(item.id)} style={styles.vote}>
        <AntDesign name="up" size={16} color="#4A90E2" />
        <Text style={styles.voteText}>{item.upvotes}</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>📢 Community Forum</Text>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="What's on your mind?"
          value={input}
          onChangeText={setInput}
        />
        <TouchableOpacity style={styles.postButton} onPress={handlePost}>
          <AntDesign name="pluscircle" size={24} color="white" />
        </TouchableOpacity>
      </View>

      <FlatList
        data={posts}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 100 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#f8f8f8' },
  header: { fontSize: 24, fontWeight: 'bold', marginBottom: 16 },
  inputContainer: {
    flexDirection: 'row',
    marginBottom: 12,
    alignItems: 'center',
  },
  input: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 12,
    height: 44,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  postButton: {
    backgroundColor: '#4A90E2',
    padding: 10,
    borderRadius: 30,
    marginLeft: 8,
  },
  postCard: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    elevation: 2,
  },
  user: {
    fontWeight: '600',
    marginBottom: 4,
    color: '#333',
  },
  text: { fontSize: 16, color: '#444' },
  vote: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  voteText: {
    marginLeft: 6,
    fontWeight: '500',
    color: '#4A90E2',
  },
});
