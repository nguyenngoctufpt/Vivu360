import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';

import BottomTabs from './BottomTabs';
import CustomDrawerContent from '../components/drawer/CustomDrawerContent';

const Drawer = createDrawerNavigator();

export default function AppDrawer () {
  return (
    <Drawer.Navigator
      drawerContent={(props) => (
        <CustomDrawerContent {...props} />
      )}
      screenOptions={{
        headerShown: false,
        drawerStyle: { width: '82%' }
      }}
      >
      <Drawer.Screen name='Tabs' component={BottomTabs} />
    </Drawer.Navigator>
  );
};