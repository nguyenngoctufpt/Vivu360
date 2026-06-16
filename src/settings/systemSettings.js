import React, { useState } from 'react';
import { View, Text, Pressable, ScrollView, StyleSheet, Modal, Dimensions, Alert, Switch } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { X, Save, Bell, Shield, MapPin, Eye, Trash2, Sliders } from 'lucide-react-native';

const { width, height } = Dimensions.get('window');

export function SystemSettingsModal({ visible, onClose, theme, isDarkMode }) {
  const [notifyPush, setNotifyPush] = useState(true);
  const [notifyPromo, setNotifyPromo] = useState(false);
  const [useLocation, setUseLocation] = useState(true);
  const [biometricLock, setBiometricLock] = useState(false);
  const [highDpiMap, setHighDpiMap] = useState(true);

  const [cacheSize, setCacheSize] = useState('142.8 MB');

  const handleClearCache = () => {
    Alert.alert(
      'Xóa bộ nhớ đệm',
      'Bạn có chắc muốn giải phóng bộ nhớ đệm của Vivu360? Thao tác này sẽ không ảnh hưởng tới dữ liệu cá nhân.',
      [
        { text: 'Hủy bỏ', style: 'cancel' },
        {
          text: 'Xóa sạch',
          style: 'destructive',
          onPress: () => {
            setCacheSize('0.0 KB');
            Alert.alert('Thành công', 'Đã giải phóng thành công bộ nhớ đệm ứng dụng!');
          }
        }
      ]
    );
  };

  const handleSaveSettings = () => {
    Alert.alert('Thành công', 'Cấu hình hệ thống của bạn đã được cập nhật thành công!');
    onClose();
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.backdrop}>
        <View style={[styles.modalCard, { backgroundColor: theme.card, borderColor: theme.border }]}>
          {/* Header */}
          <View style={[styles.header, { borderBottomColor: theme.border }]}>
            <Text style={[styles.headerTitle, { color: theme.textPrimary }]}>Cài đặt hệ thống</Text>
            <Pressable style={styles.closeBtn} onPress={onClose}>
              <X size={20} color={theme.textPrimary} />
            </Pressable>
          </View>

          {/* Form Scroll Settings */}
          <ScrollView style={styles.scrollContent} showsVerticalScrollIndicator={false}>
            
            {/* 1. Notifications Section */}
            <Text style={[styles.sectionTitle, { color: theme.textSecondary }]}>THÔNG BÁO</Text>
            <View style={[styles.cardBlock, { backgroundColor: theme.statusBg, borderColor: theme.border }]}>
              <View style={styles.settingRow}>
                <View style={styles.settingLabelGroup}>
                  <Bell size={16} color="#3b82f6" />
                  <View>
                    <Text style={[styles.settingName, { color: theme.textPrimary }]}>Thông báo đẩy</Text>
                    <Text style={[styles.settingDesc, { color: theme.textMuted }]}>Nhận cập nhật về các tour và tin nhắn tức thời</Text>
                  </View>
                </View>
                <Switch
                  value={notifyPush}
                  onValueChange={setNotifyPush}
                  trackColor={{ false: '#d1d5db', true: '#3b82f6' }}
                  thumbColor="#fff"
                />
              </View>

              <View style={[styles.divider, { backgroundColor: theme.border }]} />

              <View style={styles.settingRow}>
                <View style={styles.settingLabelGroup}>
                  <Sliders size={16} color="#10b981" />
                  <View>
                    <Text style={[styles.settingName, { color: theme.textPrimary }]}>Khuyến mãi & Tin tức</Text>
                    <Text style={[styles.settingDesc, { color: theme.textMuted }]}>Nhận tin tức ưu đãi giảm giá tour du lịch mới nhất</Text>
                  </View>
                </View>
                <Switch
                  value={notifyPromo}
                  onValueChange={setNotifyPromo}
                  trackColor={{ false: '#d1d5db', true: '#3b82f6' }}
                  thumbColor="#fff"
                />
              </View>
            </View>

            {/* 2. Privacy & Map */}
            <Text style={[styles.sectionTitle, { color: theme.textSecondary, marginTop: 20 }]}>QUYỀN HẠN & BẢN ĐỒ</Text>
            <View style={[styles.cardBlock, { backgroundColor: theme.statusBg, borderColor: theme.border }]}>
              <View style={styles.settingRow}>
                <View style={styles.settingLabelGroup}>
                  <MapPin size={16} color="#ef4444" />
                  <View>
                    <Text style={[styles.settingName, { color: theme.textPrimary }]}>Dịch vụ định vị GPS</Text>
                    <Text style={[styles.settingDesc, { color: theme.textMuted }]}>Cho phép Vivu360 định vị bản đồ và gợi ý điểm đến</Text>
                  </View>
                </View>
                <Switch
                  value={useLocation}
                  onValueChange={setUseLocation}
                  trackColor={{ false: '#d1d5db', true: '#3b82f6' }}
                  thumbColor="#fff"
                />
              </View>

              <View style={[styles.divider, { backgroundColor: theme.border }]} />

              <View style={styles.settingRow}>
                <View style={styles.settingLabelGroup}>
                  <Eye size={16} color="#8b5cf6" />
                  <View>
                    <Text style={[styles.settingName, { color: theme.textPrimary }]}>Độ phân giải bản đồ cao</Text>
                    <Text style={[styles.settingDesc, { color: theme.textMuted }]}>Tải trước bản đồ 3D chất lượng cao (tốn dung lượng)</Text>
                  </View>
                </View>
                <Switch
                  value={highDpiMap}
                  onValueChange={setHighDpiMap}
                  trackColor={{ false: '#d1d5db', true: '#3b82f6' }}
                  thumbColor="#fff"
                />
              </View>
            </View>

            {/* 3. Security */}
            <Text style={[styles.sectionTitle, { color: theme.textSecondary, marginTop: 20 }]}>BẢO MẬT & BỘ NHỚ</Text>
            <View style={[styles.cardBlock, { backgroundColor: theme.statusBg, borderColor: theme.border }]}>
              <View style={styles.settingRow}>
                <View style={styles.settingLabelGroup}>
                  <Shield size={16} color="#06b6d4" />
                  <View>
                    <Text style={[styles.settingName, { color: theme.textPrimary }]}>Khóa sinh trắc học</Text>
                    <Text style={[styles.settingDesc, { color: theme.textMuted }]}>Yêu cầu FaceID hoặc Vân tay khi mở ứng dụng</Text>
                  </View>
                </View>
                <Switch
                  value={biometricLock}
                  onValueChange={setBiometricLock}
                  trackColor={{ false: '#d1d5db', true: '#3b82f6' }}
                  thumbColor="#fff"
                />
              </View>

              <View style={[styles.divider, { backgroundColor: theme.border }]} />

              <Pressable style={styles.settingRow} onPress={handleClearCache}>
                <View style={styles.settingLabelGroup}>
                  <Trash2 size={16} color="#f97316" />
                  <View>
                    <Text style={[styles.settingName, { color: theme.textPrimary }]}>Bộ nhớ đệm tạm thời</Text>
                    <Text style={[styles.settingDesc, { color: theme.textMuted }]}>Dọn dẹp hình ảnh đã lưu để giải phóng máy</Text>
                  </View>
                </View>
                <View style={styles.cacheBadge}>
                  <Text style={styles.cacheText}>{cacheSize}</Text>
                </View>
              </Pressable>
            </View>

            <View style={{ height: 40 }} />
          </ScrollView>

          {/* Footer Submit Button */}
          <View style={[styles.footer, { borderTopColor: theme.border }]}>
            <Pressable style={styles.submitBtn} onPress={handleSaveSettings}>
              <LinearGradient
                colors={['#3b82f6', '#1d4ed8']}
                style={styles.submitGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
              >
                <Save size={16} color="#fff" />
                <Text style={styles.submitText}>Lưu Cấu Hình</Text>
              </LinearGradient>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: { flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.6)', justifyContent: 'flex-end' },
  modalCard: {
    width: '100%',
    height: height * 0.82,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    borderWidth: 1,
    borderBottomWidth: 0,
    overflow: 'hidden',
  },
  header: {
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    borderBottomWidth: 1,
  },
  headerTitle: { fontSize: 16, fontWeight: '900' },
  closeBtn: { width: 36, height: 36, borderRadius: 18, alignItems: 'center', justifyContent: 'center' },
  
  scrollContent: { flex: 1, padding: 20 },
  
  sectionTitle: { fontSize: 10, fontWeight: '800', letterSpacing: 1.2, marginBottom: 8, marginLeft: 4 },
  cardBlock: {
    borderRadius: 16,
    borderWidth: 1,
    paddingHorizontal: 16,
    overflow: 'hidden',
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 14,
    gap: 12,
  },
  settingLabelGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  settingName: { fontSize: 13, fontWeight: '700' },
  settingDesc: { fontSize: 10, fontWeight: '500', marginTop: 2, lineHeight: 14 },
  
  divider: { height: 1 },
  
  cacheBadge: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
    backgroundColor: 'rgba(249, 115, 22, 0.1)',
  },
  cacheText: { color: '#f97316', fontSize: 10, fontWeight: '800' },

  footer: { padding: 20, borderTopWidth: 1 },
  submitBtn: { height: 48, borderRadius: 14, overflow: 'hidden' },
  submitGradient: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8 },
  submitText: { color: '#fff', fontSize: 14, fontWeight: '800' },
});
