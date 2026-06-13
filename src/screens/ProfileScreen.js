import React from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

import { profileMenus, supportMenus } from '../data/profileMenus';
import ProfileMenuItem from '../components/profile/ProfileMenuItem';

export default function ProfileScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Phần header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Tài khoản</Text>
        </View>

        {/* Thẻ người dùng */}
        <View style={styles.userCard}>
          <Image source={{ uri: 'https://i.pravatar.cc/150' }} style={styles.avatar} />
          <View style={styles.userInfo}>
            <Text style={styles.userName}>user</Text>
            <Text style={styles.userEmail}>user@example.com</Text>
          </View>
          <TouchableOpacity>
            <Ionicons name='create-outline' size={22} color='#0F6FFF' />
          </TouchableOpacity>
        </View>

        {/* Thẻ thành viên */}
        <View style={styles.membershipCard}>
          <Text style={styles.memberTitle}>Thành viên bạc</Text>
          <Ionicons name='ribbon' size={34} color='#FFF' />
        </View>

        {/* Mục đặt chỗ */}
        <View style={styles.sectionCard}>
          {profileMenus.map((item, index) => (
            <View key={item.title}>
              <ProfileMenuItem title={item.title} icon={item.icon} />
              {index < profileMenus.length - 1 && (
                <View style={styles.divider} />
              )}
            </View>
          ))}
        </View>

        {/* Mục hỗ trợ và cài đặt */}
        <View style={styles.sectionCard}>
          {supportMenus.map((item, index) => (
            <View key={item.title}>
              <ProfileMenuItem title={item.title} icon={item.icon} />
              {index < supportMenus.length - 1 && (
                <View style={styles.divider} />
              )}
            </View>
          ))}
        </View>

        {/* Đăng xuất */}
        <TouchableOpacity style={styles.logoutButton}>
          <Ionicons name='log-out-outline' size={22} color='#FF4D4F' />
          <Text style={styles.logoutText}>Đăng xuất</Text>
        </TouchableOpacity>
        
        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F7FB' },
  header: { alignItems: 'flex-start', paddingVertical: 20, paddingHorizontal: 20 },
  headerTitle: { fontSize: 24, fontWeight: '700', color: '#222' },
  userCard: {
    marginHorizontal: 20,
    backgroundColor: '#FFF',
    borderRadius: 24,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
    elevation: 2
  },
  avatar: { width: 72, height: 72, borderRadius: 16 },
  userInfo: { flex: 1, marginLeft: 16 },
  userName: { fontSize: 18, fontWeight: '700', color: '#222' },
  userEmail: { marginTop: 4, fontSize: 14, color: '#666' },
  membershipCard: {
    marginTop: 16,
    marginHorizontal: 20,
    backgroundColor: '#0F6FFF',
    borderRadius: 24,
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  memberTitle: { color: '#FFF', fontSize: 18, fontWeight: '700' },
  sectionCard: {
    marginTop: 16,
    marginHorizontal: 20,
    backgroundColor: '#FFF',
    borderRadius: 24,
    paddingHorizontal: 16,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
    elevation: 2
  },
  divider: { height: 1, backgroundColor: '#F0F0F0' },
  logoutButton: {
    marginTop: 20,
    marginHorizontal: 20,
    height: 56,
    borderRadius: 18,
    backgroundColor: '#FFF0F0',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  logoutText: {
    marginLeft: 8,
    color: '#FF4D4F',
    fontSize: 16,
    fontWeight: '600'
  }
});