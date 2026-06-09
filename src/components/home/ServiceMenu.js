import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { services } from '../../data/services';

export default function ServiceMenu() {
  return (
    <View style={styles.container}>
      {services.map(item => (
        <TouchableOpacity
          key={item.id}
          style={{ alignItems: 'center' }}
        >
          <Ionicons name={item.icon} size={24} color='#1976F3' />
          <Text style={{ marginTop: 8, fontSize: 12 }}>{item.title}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF',
    borderRadius: 24,
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 20
  }
});