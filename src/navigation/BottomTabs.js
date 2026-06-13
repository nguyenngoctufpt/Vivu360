import React from 'react';
import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';

const Tab = createBottomTabNavigator();

function BlankScreen() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text style={{ fontSize: 18, color: '#333333', fontWeight: '500' }}>Screen</Text>
      </View>
    </SafeAreaView>
  );
}

export default function BottomTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ color, size }) => {
          let iconName;

          switch (route.name) {
            case 'Home':
              iconName = 'home-outline';
              break;
            case 'Explore':
              iconName = 'compass-outline';
              break;
            case 'Booking':
              iconName = 'person-outline';
              break;
            case 'Favorite':
              iconName = 'heart-outline';
              break;
            case 'Profile':
              iconName = 'person-outline';
              break;
          }

          return (
            <Ionicons name={iconName} size={size} color={color} />
          )
        }
      })}>
        <Tab.Screen
          name='Home'
          component={HomeScreen}
          options={{ title: 'Trang chủ' }}
        />
        <Tab.Screen
          name="Explore"
          component={BlankScreen}
          options={{ title: 'Khám phá' }}
        />
        <Tab.Screen
          name="Booking"
          component={BlankScreen}
          options={{ title: 'Đặt chỗ' }}
        />
        <Tab.Screen
          name="Favorite"
          component={BlankScreen}
          options={{ title: 'Yêu thích' }}
        />
        <Tab.Screen
          name="Profile"
          component={ProfileScreen}
          options={{ title: 'Tài khoản' }}
        />
    </Tab.Navigator>
  );
};