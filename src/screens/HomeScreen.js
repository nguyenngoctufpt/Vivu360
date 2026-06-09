import React from 'react';
import { FlatList, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import SearchBar from '../components/home/SearchBar';
import ServiceMenu from '../components/home/ServiceMenu';
import DestinationCard from '../components/home/DestinationCard';
import WhyChooseUs from '../components/home/WhyChooseUs';
import PromotionCarousel from '../components/home/PromotionCarousel';
import { destinations } from '../data/destinations';

export default function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1 }}>
      {/* Header */}
      <View style={styles.header}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <TouchableOpacity onPress={() => navigation.openDrawer()}>
            <Ionicons name='menu' size={24} color='white' />
          </TouchableOpacity>
          <Text style={styles.logo}>Vivu360</Text>
          <Ionicons name='notifications' size={24} color='white' />
        </View>
      </View>

      <ScrollView
        style={{ flex: 1 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Banner */}
        <View style={styles.bannerContainer}>
          <View style={styles.bannerView}>
            <View style={{ flex: 1, paddingRight: 12 }}>
              <Text style={{ color: '#D9E8FF', fontSize: 12 }}>Xin chào, user!</Text>
              <Text style={{ color: '#FFF', fontSize: 24, fontWeight: '700', marginTop: 8 }}>
                Khám phá thế giới
              </Text>
              <Text style={{ color: '#FFF', fontSize: 24, fontWeight: '700', marginBottom: 24 }}>
                cùng Vivu360
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.searchBarSize}>
          <SearchBar />
        </View>

        <View style={{ padding: 20 }}>
          <ServiceMenu />
          <PromotionCarousel />

          {/* Điểm đến */}
          <View style={{ marginTop: 30 }}>
            <Text style={{ fontSize: 24, fontWeight: '700' }}>Điểm đến phổ biến</Text>

            <FlatList
              horizontal
              data={destinations}
              renderItem={({ item }) => (
                <DestinationCard item={item} />
              )}
              keyExtractor={(item) => item.id.toString()}
              showsHorizontalScrollIndicator={false}
              style={{ marginTop: 16 }}
            />
          </View>

          {/* Vì sao chọn ứng dụng */}
          <View style={{ marginTop: 30, marginBottom: 30 }}>
            <Text style={{ fontSize: 24, fontWeight: '700', marginBottom: 20 }}>Vì sao chọn Vivu360?</Text>
            <WhyChooseUs />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#1E88FF',
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom: 20
  },
  logo: { color: '#FFF', fontSize: 24, fontWeight: '700' },
  bannerContainer: {
    backgroundColor: '#1E88FF',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 32,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30
  },
  bannerView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  searchBarSize: {
    marginHorizontal: 20,
    marginTop: -28,
    zIndex: 10
  }
});