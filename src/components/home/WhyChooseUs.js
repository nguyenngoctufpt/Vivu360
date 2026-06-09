import React from 'react';
import { Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const features = [
  { name: 'Thanh toán an toàn', icon: 'shield-checkmark-outline' },
  { name: 'Hỗ trợ 24/7', icon: 'shield-checkmark-outline' },
  { name: 'Giá tốt mỗi ngày', icon: 'shield-checkmark-outline' },
  { name: 'Trải nghiệm đa dạng', icon: 'shield-checkmark-outline' }
];

export default function WhyChooseUs() {
  return (
    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
      {features.map(item => (
        <View
          key={item.name}
          style={{ alignItems: 'center', width: 80 }}
        >
          <Ionicons name={item.icon} size={32} color='#1976F3' />
          <Text style={{ textAlign: 'center', marginTop: 8, fontSize: 12 }}>{item.name}</Text>
        </View>
      ))}
    </View>
  );
};