import React, { useState, useMemo } from 'react';
import { View, Text, Image, Pressable, ScrollView, StyleSheet, Modal, Dimensions, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { getRankDetails } from '../data';
import {
  X,
  MapPin,
  Users,
  Heart,
  Award,
  Globe,
  Sparkles,
  MessageCircle,
  CheckCircle,
} from 'lucide-react-native';

const { width, height } = Dimensions.get('window');

const isSourceVerified = (name) => {
  if (!name) return false;
  const verifiedNames = [
    'Ban truyền thông Vivu360', 
    'Tạp chí Phượt Việt', 
    'Góc Ẩm Thực Việt',
    'Thanh Hằng',
    'Quốc Bảo'
  ];
  return verifiedNames.includes(name.trim());
};

// Mock User Profiles Database
const userProfilesData = {
  'Thanh Hằng': {
    name: 'Thanh Hằng',
    avatar: 'https://i.pravatar.cc/150?img=47',
    cover: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=500&q=80',
    bio: 'Đam mê chụp ảnh phong cảnh du lịch tự nhiên. Đã đi qua 20 tỉnh thành Việt Nam. Rất vui được kết bạn! 📸✈️',
    level: 'Cấp 12 - Chuyên Gia Du Lịch',
    levelColor: '#facc15',
    trips: 18,
    followers: '1.4k',
    following: 342,
    photos: [
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=200&q=80',
      'https://images.unsplash.com/photo-1504893524553-b855bce32c67?auto=format&fit=crop&w=200&q=80',
      'https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=200&q=80',
      'https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?auto=format&fit=crop&w=200&q=80',
    ]
  },
  'Quốc Bảo': {
    name: 'Quốc Bảo',
    avatar: 'https://i.pravatar.cc/150?img=33',
    cover: 'https://images.unsplash.com/photo-1504893524553-b855bce32c67?auto=format&fit=crop&w=500&q=80',
    bio: 'Phượt thủ leo núi chuyên nghiệp, săn mây là hơi thở. Bạn nào muốn trekking Sa Pa, Hà Giang cứ nhắn mình nha! 🧗‍♂️🏔️',
    level: 'Cấp 15 - Kỷ Lục Gia Trekking',
    levelColor: '#a855f7',
    trips: 34,
    followers: '3.2k',
    following: 580,
    photos: [
      'https://images.unsplash.com/photo-1504893524553-b855bce32c67?auto=format&fit=crop&w=200&q=80',
      'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=200&q=80',
      'https://images.unsplash.com/photo-1518684079-3c830dcef090?auto=format&fit=crop&w=200&q=80',
    ]
  },
  'Khánh An': {
    name: 'Khánh An',
    avatar: 'https://i.pravatar.cc/150?img=22',
    cover: 'https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=500&q=80',
    bio: 'Thích nằm dài bên bờ biển uống nước dừa hơn là đi bộ. Nghỉ dưỡng là chân lý! Đảo ngọc Phú Quốc là ngôi nhà thứ 2. 🏖️🌴',
    level: 'Cấp 8 - Đại Sứ Nghỉ Dưỡng',
    levelColor: '#10b981',
    trips: 12,
    followers: '920',
    following: 154,
    photos: [
      'https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=200&q=80',
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=200&q=80',
    ]
  },
  'Nguyễn Minh': {
    name: 'Nguyễn Minh',
    avatar: 'https://i.pravatar.cc/150?img=68',
    cover: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=500&q=80',
    bio: 'Thích tìm hiểu lịch sử, danh lam thắng cảnh. Thích trải nghiệm tham quan ảo AR 360 độ trên Vivu360! 🌐🎒',
    level: 'Cấp 8 - Nhà Thám Hiểm AR',
    levelColor: '#60a5fa',
    trips: 12,
    followers: '820',
    following: 310,
    photos: [
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=200&q=80',
      'https://images.unsplash.com/photo-1518684079-3c830dcef090?auto=format&fit=crop&w=200&q=80',
    ]
  }
};

export function UserProfileModal({ username, visible, onClose, isDarkMode, theme, currentUser }) {
  const [isFollowing, setIsFollowing] = useState(false);

  const rank = useMemo(() => {
    if (currentUser && (username === 'Nguyễn Minh' || username === currentUser.name)) {
      return getRankDetails(currentUser.points || 8250);
    }
    const otherProfile = userProfilesData[username];
    if (otherProfile) {
      if (otherProfile.name === 'Thanh Hằng') {
        return getRankDetails(12400); // Platinum
      } else if (otherProfile.name === 'Quốc Bảo') {
        return getRankDetails(15200); // Platinum
      } else if (otherProfile.name === 'Khánh An') {
        return getRankDetails(9150); // Gold
      }
    }
    return getRankDetails(100); // Bronze
  }, [username, currentUser]);

  const profile = useMemo(() => {
    const defaultMeName = 'Nguyễn Minh';
    const isMe = username === defaultMeName || (currentUser && username === currentUser.name);

    if (isMe && currentUser) {
      return {
        name: currentUser.name,
        avatar: currentUser.avatar,
        cover: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=500&q=80',
        bio: currentUser.bio || 'Thích tìm hiểu lịch sử, danh lam thắng cảnh. Thích trải nghiệm tham quan ảo AR 360 độ trên Vivu360! 🌐🎒',
        level: `${currentUser.level || 'Cấp 8'} - Nhà Thám Hiểm AR`,
        levelColor: '#60a5fa',
        trips: 12,
        followers: '820',
        following: 310,
        photos: [
          'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=200&q=80',
          'https://images.unsplash.com/photo-1518684079-3c830dcef090?auto=format&fit=crop&w=200&q=80',
        ]
      };
    }

    return userProfilesData[username] || {
      name: username,
      avatar: 'https://i.pravatar.cc/150?img=11',
      cover: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=500&q=80',
      bio: 'Thành viên mới gia nhập Vivu360. Đang lên kế hoạch cho những chuyến đi tiếp theo!',
      level: 'Cấp 1 - Thành Viên Mới',
      levelColor: '#9ca3af',
      trips: 1,
      followers: '12',
      following: 5,
      photos: []
    };
  }, [username, currentUser]);

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.backdrop}>
        <View style={[styles.card, { backgroundColor: theme.card, borderColor: theme.border }]}>
          {/* Header images */}
          <View style={styles.headerArea}>
            <Image source={{ uri: profile.cover }} style={styles.coverImage} />
            <LinearGradient
              colors={['rgba(0,0,0,0.5)', 'transparent', 'rgba(0,0,0,0.4)']}
              style={styles.coverGradient}
            />

            {/* Back Button */}
            <Pressable style={styles.closeBtn} onPress={onClose}>
              <X size={20} color="#fff" />
            </Pressable>
          </View>

          {/* Profile details */}
          <View style={styles.contentArea}>
            {/* Avatar & Follow row */}
            <View style={styles.avatarRow}>
              <LinearGradient
                colors={rank.colors}
                style={styles.modalAvatarFrame}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                <View style={[styles.modalAvatarInner, { backgroundColor: theme.card }]}>
                  <Image source={{ uri: profile.avatar }} style={styles.modalAvatarImage} />
                </View>
              </LinearGradient>
              <View style={styles.actionRow}>
                <Pressable
                  style={[styles.followBtn, isFollowing ? styles.followBtnActive : null]}
                  onPress={() => setIsFollowing(!isFollowing)}
                >
                  <Text style={styles.followBtnText}>
                    {isFollowing ? 'Đang Theo Dõi' : 'Theo Dõi'}
                  </Text>
                </Pressable>
                <Pressable
                  style={styles.msgBtn}
                  onPress={() => Alert.alert('Trò chuyện', `Tính năng nhắn tin trực tiếp với ${profile.name} đang được kết nối!`)}
                >
                  <MessageCircle size={18} color="#fff" />
                </Pressable>
              </View>
            </View>

            {/* Name & Title */}
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 4 }}>
              <Text style={[styles.profileName, { color: theme.textPrimary, marginBottom: 0 }]}>{profile.name}</Text>
              {isSourceVerified(profile.name) && (
                <CheckCircle size={18} color="#fff" fill="#1877f2" />
              )}
            </View>
            <View style={styles.levelRow}>
              <Award size={14} color={profile.levelColor} />
              <Text style={[styles.levelText, { color: profile.levelColor }]}>{profile.level}</Text>
            </View>

            {/* Stats board */}
            <View style={[styles.statsBoard, { backgroundColor: theme.statusBg }]}>
              <View style={styles.statBox}>
                <Text style={[styles.statVal, { color: theme.textPrimary }]}>{profile.trips}</Text>
                <Text style={styles.statLabel}>Chuyến đi</Text>
              </View>
              <View style={styles.statDivider} />
              <View style={styles.statBox}>
                <Text style={[styles.statVal, { color: theme.textPrimary }]}>{profile.followers}</Text>
                <Text style={styles.statLabel}>Người theo dõi</Text>
              </View>
              <View style={styles.statDivider} />
              <View style={styles.statBox}>
                <Text style={[styles.statVal, { color: theme.textPrimary }]}>{profile.following}</Text>
                <Text style={styles.statLabel}>Đang theo dõi</Text>
              </View>
            </View>

            {/* Bio */}
            <Text style={[styles.bioTitle, { color: theme.textPrimary }]}>Tiểu sử</Text>
            <Text style={[styles.bioText, { color: theme.textSecondary }]}>{profile.bio}</Text>

            {/* Photos Check-in Grid */}
            {profile.photos && profile.photos.length > 0 && (
              <>
                <Text style={[styles.bioTitle, { color: theme.textPrimary, marginTop: 14 }]}>Ảnh Check-in</Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.photoGrid}>
                  {profile.photos.map((photoUrl, idx) => (
                    <Image key={idx} source={{ uri: photoUrl }} style={styles.checkinPhoto} />
                  ))}
                </ScrollView>
              </>
            )}
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: { flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.6)', justifyContent: 'center', alignItems: 'center' },
  card: {
    width: width * 0.9,
    maxHeight: height * 0.8,
    borderRadius: 24,
    borderWidth: 1.2,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.35,
    shadowRadius: 16,
    elevation: 10,
  },
  headerArea: { height: 120, position: 'relative' },
  coverImage: { width: '100%', height: '100%' },
  coverGradient: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 },
  closeBtn: {
    position: 'absolute',
    top: 12,
    right: 12,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(0,0,0,0.5)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 0.5,
    borderColor: 'rgba(255,255,255,0.2)'
  },
  contentArea: { padding: 18, paddingTop: 0 },
  avatarRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginTop: -40,
    marginBottom: 12,
  },
  modalAvatarFrame: {
    width: 86,
    height: 86,
    borderRadius: 43,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalAvatarInner: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  modalAvatarImage: {
    width: 76,
    height: 76,
    borderRadius: 38,
  },
  actionRow: { flexDirection: 'row', gap: 8 },
  followBtn: {
    height: 36,
    paddingHorizontal: 16,
    borderRadius: 18,
    backgroundColor: '#3b82f6',
    alignItems: 'center',
    justifyContent: 'center'
  },
  followBtnActive: {
    backgroundColor: '#10b981',
  },
  followBtnText: { color: '#fff', fontSize: 12, fontWeight: '800' },
  msgBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#4b5563',
    alignItems: 'center',
    justifyContent: 'center'
  },
  profileName: { fontSize: 18, fontWeight: '900' },
  levelRow: { flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 4 },
  levelText: { fontSize: 11, fontWeight: '800' },

  statsBoard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 14,
    marginVertical: 14,
  },
  statBox: { flex: 1, alignItems: 'center' },
  statVal: { fontSize: 14, fontWeight: '800' },
  statLabel: { fontSize: 9, color: '#94a3b8', fontWeight: '600', marginTop: 2 },
  statDivider: { width: 1, height: 20, backgroundColor: 'rgba(148, 163, 184, 0.2)' },

  bioTitle: { fontSize: 12, fontWeight: '800' },
  bioText: { fontSize: 11, lineHeight: 16, marginTop: 6, fontWeight: '500' },

  photoGrid: { gap: 8, marginTop: 8 },
  checkinPhoto: { width: 90, height: 90, borderRadius: 12 },
});
