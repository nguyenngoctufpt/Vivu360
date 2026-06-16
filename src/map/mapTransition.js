import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Easing,
  Dimensions,
  SafeAreaView,
  Platform
} from 'react-native';
import { Activity, Compass, Cpu, Globe, Shield } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { mockMapMarkers } from '../data';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

export function MapTransitionScreen({ tourId, spotIdx, onTransitionComplete, isDarkMode, theme }) {
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState('KHỞI ĐỘNG LIÊN KẾT...');
  
  const spinValue = useRef(new Animated.Value(0)).current;
  const opacityValue = useRef(new Animated.Value(0)).current;
  const pulseValue = useRef(new Animated.Value(1)).current;

  const activeMarker = mockMapMarkers.find(m => m.id === tourId) || mockMapMarkers[0];

  // Rotate animation for radar sweep
  useEffect(() => {
    Animated.loop(
      Animated.timing(spinValue, {
        toValue: 1,
        duration: 2000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();
  }, []);

  // Pulse effect for target glow
  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseValue, {
          toValue: 1.2,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(pulseValue, {
          toValue: 1.0,
          duration: 800,
          useNativeDriver: true,
        })
      ])
    ).start();
  }, []);

  // Fade-in animation
  useEffect(() => {
    Animated.timing(opacityValue, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, []);

  // Progress counter and text simulator
  useEffect(() => {
    let interval = setInterval(() => {
      setProgress((prev) => {
        const next = prev + Math.floor(Math.random() * 12) + 6;
        if (next >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            onTransitionComplete(tourId, spotIdx);
          }, 300);
          return 100;
        }
        
        // Update status text based on progress
        if (next < 25) {
          setStatusText('ĐANG KẾT NỐI VỆ TINH ĐỊNH VỊ...');
        } else if (next < 50) {
          setStatusText('ĐANG ĐỒNG BỘ TỌA ĐỘ GPS...');
        } else if (next < 75) {
          setStatusText('ĐANG TẢI DỮ LIỆU ĐA GIÁC 3D...');
        } else {
          setStatusText('THIẾT LẬP KHÔNG GIAN 360° VR...');
        }
        return next;
      });
    }, 120);

    return () => clearInterval(interval);
  }, [tourId, spotIdx]);

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: isDarkMode ? '#070a13' : '#f0f4f8' }]}>
      <Animated.View style={[styles.innerContainer, { opacity: opacityValue }]}>
        
        {/* BACKGROUND HUD LINES */}
        <View style={styles.gridOverlay} pointerEvents="none">
          <View style={styles.gridLineH} />
          <View style={[styles.gridLineH, { top: '30%' }]} />
          <View style={[styles.gridLineH, { top: '70%' }]} />
          <View style={styles.gridLineV} />
          <View style={[styles.gridLineV, { left: '30%' }]} />
          <View style={[styles.gridLineV, { left: '70%' }]} />
        </View>

        {/* TOP STATUS */}
        <View style={styles.header}>
          <View style={styles.statusRow}>
            <Activity size={14} color="#06b6d4" />
            <Text style={styles.headerText}>SAT NAV SYSTEMS // ACTIVE LINK</Text>
          </View>
          <Text style={styles.telemetryText}>SYS_SECURE_KEY: VX-902-VR</Text>
        </View>

        {/* MAIN RADAR SCANNER */}
        <View style={styles.radarContainer}>
          <Animated.View style={[styles.radarOuterCircle, { transform: [{ scale: pulseValue }] }]}>
            <View style={styles.radarInnerCircle} />
          </Animated.View>
          
          {/* Sweeper */}
          <Animated.View style={[styles.radarSweeper, { transform: [{ rotate: spin }] }]}>
            <LinearGradient
              colors={['rgba(6, 182, 212, 0.4)', 'rgba(6, 182, 212, 0)']}
              style={styles.sweeperGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            />
          </Animated.View>

          {/* Glowing Center Target */}
          <View style={styles.radarCenter}>
            <Globe size={32} color="#22c55e" />
          </View>
        </View>

        {/* LOCATION META */}
        <View style={styles.metaContainer}>
          <Text style={styles.connectingLabel}>ĐANG DI CHUYỂN TỚI</Text>
          <Text style={styles.locationTitle}>{activeMarker.title.toUpperCase()}</Text>
          <Text style={styles.locationRegion}>{activeMarker.region} // VIỆT NAM</Text>
          
          <View style={styles.coordinateBox}>
            <Text style={styles.coordText}>VĨ ĐỘ: {(20.8 + activeMarker.id * 0.5).toFixed(4)}° N</Text>
            <Text style={styles.coordDivider}>|</Text>
            <Text style={styles.coordText}>KINH ĐỘ: {(107.0 + activeMarker.id * 0.2).toFixed(4)}° E</Text>
          </View>
        </View>

        {/* PROGRESS BLOCK */}
        <View style={styles.progressContainer}>
          <View style={styles.progressTextRow}>
            <Text style={styles.statusLabel}>{statusText}</Text>
            <Text style={styles.percentageLabel}>{progress}%</Text>
          </View>
          
          {/* Progress Bar */}
          <View style={styles.progressBarBg}>
            <View style={[styles.progressBarFill, { width: `${progress}%` }]} />
          </View>

          {/* Cyber metrics */}
          <View style={styles.footerMetrics}>
            <View style={styles.metricItem}>
              <Cpu size={10} color="#94a3b8" />
              <Text style={styles.metricText}>SYS_BUF: OK</Text>
            </View>
            <View style={styles.metricItem}>
              <Compass size={10} color="#94a3b8" />
              <Text style={styles.metricText}>AZIMUTH: 45°</Text>
            </View>
            <View style={styles.metricItem}>
              <Shield size={10} color="#94a3b8" />
              <Text style={styles.metricText}>SECURE: 256-bit</Text>
            </View>
          </View>
        </View>

      </Animated.View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  innerContainer: {
    flex: 1,
    justifyContent: 'space-between',
    paddingVertical: 40,
    paddingHorizontal: 24,
  },
  gridOverlay: {
    ...StyleSheet.absoluteFillObject,
    opacity: 0.05,
  },
  gridLineH: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: '50%',
    height: 1,
    backgroundColor: '#06b6d4',
  },
  gridLineV: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: '50%',
    width: 1,
    backgroundColor: '#06b6d4',
  },
  header: {
    alignItems: 'center',
    marginTop: 10,
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  headerText: {
    color: '#06b6d4',
    fontSize: 10,
    fontWeight: '900',
    fontFamily: Platform.OS === 'ios' ? 'Courier New' : 'monospace',
    letterSpacing: 1,
  },
  telemetryText: {
    color: '#64748b',
    fontSize: 8.5,
    fontFamily: Platform.OS === 'ios' ? 'Courier New' : 'monospace',
    marginTop: 4,
  },
  radarContainer: {
    width: 220,
    height: 220,
    borderRadius: 110,
    borderWidth: 1,
    borderColor: 'rgba(6, 182, 212, 0.2)',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  radarOuterCircle: {
    position: 'absolute',
    width: 200,
    height: 200,
    borderRadius: 100,
    borderWidth: 1.5,
    borderColor: 'rgba(6, 182, 212, 0.15)',
    borderStyle: 'dashed',
    justifyContent: 'center',
    alignItems: 'center',
  },
  radarInnerCircle: {
    width: 130,
    height: 130,
    borderRadius: 65,
    borderWidth: 0.8,
    borderColor: 'rgba(6, 182, 212, 0.25)',
  },
  radarSweeper: {
    position: 'absolute',
    width: 110,
    height: 110,
    top: 0,
    left: 0,
    transformOrigin: 'bottom right',
    overflow: 'hidden',
  },
  sweeperGradient: {
    width: '100%',
    height: '100%',
    borderBottomRightRadius: 110,
  },
  radarCenter: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: 'rgba(6, 182, 212, 0.15)',
    borderWidth: 1.5,
    borderColor: '#06b6d4',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#06b6d4',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 8,
  },
  metaContainer: {
    alignItems: 'center',
    marginVertical: 10,
  },
  connectingLabel: {
    color: '#06b6d4',
    fontSize: 9.5,
    fontWeight: '900',
    letterSpacing: 2,
  },
  locationTitle: {
    color: '#fff',
    fontSize: 26,
    fontWeight: '900',
    marginTop: 6,
    letterSpacing: 0.5,
    textShadowColor: 'rgba(6, 182, 212, 0.5)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
  },
  locationRegion: {
    color: '#94a3b8',
    fontSize: 10,
    fontWeight: '800',
    marginTop: 4,
    letterSpacing: 1.5,
  },
  coordinateBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: 'rgba(255,255,255,0.03)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.06)',
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginTop: 12,
  },
  coordText: {
    color: '#06b6d4',
    fontSize: 8.5,
    fontWeight: '800',
    fontFamily: Platform.OS === 'ios' ? 'Courier New' : 'monospace',
  },
  coordDivider: {
    color: 'rgba(255,255,255,0.15)',
    fontSize: 8,
  },
  progressContainer: {
    width: '100%',
    marginBottom: 10,
  },
  progressTextRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginBottom: 8,
  },
  statusLabel: {
    color: '#94a3b8',
    fontSize: 10,
    fontWeight: '800',
  },
  percentageLabel: {
    color: '#06b6d4',
    fontSize: 14,
    fontWeight: '900',
    fontFamily: Platform.OS === 'ios' ? 'Courier New' : 'monospace',
  },
  progressBarBg: {
    height: 6,
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 3,
    overflow: 'hidden',
    borderWidth: 0.5,
    borderColor: 'rgba(255,255,255,0.08)',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#06b6d4',
    borderRadius: 3,
    shadowColor: '#06b6d4',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
  },
  footerMetrics: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
    borderTopWidth: 0.5,
    borderTopColor: 'rgba(255,255,255,0.06)',
    paddingTop: 8,
  },
  metricItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  metricText: {
    color: '#64748b',
    fontSize: 7.5,
    fontWeight: '700',
    fontFamily: Platform.OS === 'ios' ? 'Courier New' : 'monospace',
  },
});
