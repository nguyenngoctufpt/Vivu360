import React, { useState } from 'react';
import { Dimensions, Image, StyleSheet, Text, View } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';

import { promotions } from '../../data/promotions';

const WIDTH = Dimensions.get('window').width;

export default function PromotionCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <View>
      <Carousel
        width={WIDTH - 40}
        height={180}
        data={promotions}
        loop
        autoPlay
        autoPlayInterval={4000}
        onSnapToItem={(index) => setActiveIndex(index)}
        renderItem={({ item }) => (
          <View style={styles.container}>
            <Image source={{ uri: item.image }} style={styles.image} />

            <View style={styles.overlay}>
              <Text style={{ color: '#FFF', fontSize: 16 }}>{item.title}</Text>
              <Text style={styles.subtitle}>{item.subtitle}</Text>
              <Text style={{ color: '#FFF', marginTop: 8 }}>{item.description}</Text>
            </View>
          </View>
        )}
      />

      <View style={styles.indicatorHolder}>
        {promotions.map((_, index) => (
          <View
            key={index}
            style={{
              width: activeIndex === index ? 24 : 8,
              height: 8,
              borderRadius: 4,
              marginHorizontal: 4,
              backgroundColor: activeIndex === index ? '#0F6FFF' : '#D8D8D8'
            }}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderRadius: 24,
    overflow: 'hidden',
    backgroundColor: '#0F6FFF'
  },
  image: { position: 'absolute', width: '100%', height: '100%' },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.25)',
    padding: 20,
    justifyContent: 'center'
  },
  subtitle: { color: '#FFF', fontSize: 24, fontWeight: '700', marginTop: 8 },
  indicatorHolder: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 12
  }
});