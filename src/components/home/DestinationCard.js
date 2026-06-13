import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { ImageBackground, StyleSheet, Text, View } from 'react-native';

export default function DestinationCard({ item }) {
  return (
    <ImageBackground
      source={{ uri: item.image }}
      imageStyle={{ borderRadius: 10 }}
      style={styles.image}
    >
      <View style={styles.overlay}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Ionicons name='location' size={14} color='#FFF' />
          <Text style={styles.destinationName}>{item.name}</Text>
        </View>
        <Text style={styles.provinceName}>{item.province}</Text>
      </View>
    </ImageBackground>
  );
};


const styles = StyleSheet.create({
  image: {
    width: 150,
    height: 200,
    marginRight: 12,
    justifyContent: 'flex-end'
  },
  overlay: {
    backgroundColor: 'rgba(0,0,0,0.25)',
    borderBottomLeftRadius: 18,
    borderBottomRightRadius: 18,
    padding: 10
  },
  destinationName: { color: '#FFF', fontWeight: '700', marginLeft: 4 },
  provinceName: { color: '#FFF', marginTop: 2, fontSize: 12 }
});