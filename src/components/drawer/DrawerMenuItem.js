import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function DrawerMenuItem({ title, icon, onPress }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 14
      }}
    >
      <Ionicons name={icon} size={22} color='#1976F3' />
      <Text style={{ marginLeft: 16, fontSize: 16 }}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};