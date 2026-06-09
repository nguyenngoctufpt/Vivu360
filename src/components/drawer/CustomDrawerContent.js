import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { DrawerContentScrollView } from '@react-navigation/drawer';
import { Ionicons } from '@expo/vector-icons';

import { mainMenus, utilityMenus } from '../../data/drawerMenu';
import DrawerMenuItem from './DrawerMenuItem';

export default function CustomDrawerContent(props) {
  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView
        {...props}
        showsVerticalScrollIndicator={false}
      >
        {/* Logo */}
        <Text style={styles.logo}>Vivu360</Text>

        {/* Thẻ người dùng */}
        <View style={styles.userCard}>
          <View style={{ flexDirection: 'row' }}>
            <Image
              source={{ uri: 'https://i.pravatar.cc/100' }}
              style={styles.avatar}
            />
            <View style={{ marginLeft: 12 }}>
              <Text style={{ fontSize: 18, fontWeight: '600' }}>Tên người dùng</Text>
              <Text style={{ color: '#666' }}>username@example.com</Text>
            </View>
          </View>
        </View>

        {/* Thành viên */}
        <TouchableOpacity style={styles.membershipButton}>
          <Ionicons name='ribbon-outline' size={22} color='#1976F3' />
          <Text style={styles.membershipText}>Thành viên bạc</Text>
        </TouchableOpacity>

        {/* Menu chính */}
        {mainMenus.map(item => (
          <DrawerMenuItem key={item.title} title={item.title} icon={item.icon} />
        ))}
        <View style={styles.divider} />

        {/* Menu khác */}
        {utilityMenus.map(item => (
          <DrawerMenuItem key={item.title} title={item.title} icon={item.icon} />
        ))}
        <View style={styles.divider} />

        {/* Đăng xuất */}
        <TouchableOpacity style={styles.logoutButton}>
          <Ionicons name='log-out-outline' size={22} color='red' />
          <Text style={styles.logoutText}>Đăng xuất</Text>
        </TouchableOpacity>
      </DrawerContentScrollView>
    </View>
  );
};


const styles = StyleSheet.create({
  logo: {
    fontSize: 38,
    fontWeight: 'bold',
    color: '#1976F3',
    marginBottom: 24
  },
  userCard: {
    backgroundColor: '#F4F8FF',
    borderRadius: 16,
    padding: 16
  },
  avatar: { width: 56, height: 56, borderRadius: 28 },
  membershipButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
    marginBottom: 24
  },
  membershipText: { marginLeft: 10, color: '#1976F3', fontWeight: '600' },
  divider: {
    height: 1,
    backgroundColor: '#E5E5E5',
    marginVertical: 16
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#EEE'
  },
  logoutText: { marginLeft: 12, color: 'red', fontWeight: '600' }
});