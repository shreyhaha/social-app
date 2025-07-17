import React from 'react';
import { View, Text, SafeAreaView, TouchableOpacity } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons'; // For a menu icon

// Preference Screens
function GenderPreference() {
  return (
    <SafeAreaView>
      <Text style={{ fontSize: 20, padding: 20 }}>Gender Preferences</Text>
    </SafeAreaView>
  );
}

function DistancePreference() {
  return (
    <SafeAreaView>
      <Text style={{ fontSize: 20, padding: 20 }}>Distance Preferences</Text>
    </SafeAreaView>
  );
}

function MainMatchScreen({ navigation }) {
  return (
    <SafeAreaView>
      <TouchableOpacity
        style={{
          padding: 10,
          paddingLeft: 15,
          alignSelf: 'flex-start',
        }}
        onPress={() => navigation.openDrawer()}
      >
        <Ionicons name="menu" size={28} color="black" />
      </TouchableOpacity>

      <Text style={{ fontSize: 24, fontWeight: 'bold', padding: 20 }}>
        🎯 Match Page
      </Text>
      <Text style={{ fontSize: 16, paddingHorizontal: 20 }}>
        Tap the ☰ menu to set your preferences.
      </Text>
    </SafeAreaView>
  );
}

const Drawer = createDrawerNavigator();

export default function Match() {
  return (
    <NavigationContainer independent={true}>
      <Drawer.Navigator initialRouteName="Match">
        <Drawer.Screen name="Match" component={MainMatchScreen} />
        <Drawer.Screen name="Gender" component={GenderPreference} />
        <Drawer.Screen name="Distance" component={DistancePreference} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
