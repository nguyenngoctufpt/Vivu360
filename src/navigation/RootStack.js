import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import AppDrawer from './AppDrawer';

const Stack = createNativeStackNavigator();

export default function RootStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name='Main' component={AppDrawer} />
    </Stack.Navigator>
  );
};