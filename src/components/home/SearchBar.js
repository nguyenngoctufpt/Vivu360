import React from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function SearchBar () {
  return (
    <View style={styles.container}>
      <Ionicons name='search' size={22} color='#1976F3' />
      <TextInput
        placeholder='Bạn muốn đi đâu?'
        style={{ flex: 1, marginLeft: 10 }}
      />
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: 30,
    paddingHorizontal: 16,
    height: 56,
    width: 240
  }
});