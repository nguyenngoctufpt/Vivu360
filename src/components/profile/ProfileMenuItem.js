import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function ProfileMenuItem({ title, icon, onPress }) {
  return (
    <TouchableOpacity
      style={styles.container}
      activeOpacity={0.7}
      onPress={onPress}
    >
      <View style={styles.leftSection}>
        <View style={styles.iconContainer}>
          <Ionicons name={icon} size={20} color='#0F6FFF' />
        </View>
        <Text style={styles.title}>{title}</Text>
      </View>

      <Ionicons name='chevron-forward' size={18} color='#B0B0B0' />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 58,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  leftSection: { flexDirection: 'row', alignItems: 'center' },
  iconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#EFF5FF',
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: { fontSize: 16, marginLeft: 12, color: '#222' }
});