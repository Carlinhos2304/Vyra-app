import React, { useEffect, useRef } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Animated,
  Easing,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import VyraLogo from '../components/VyraLogo';

const { height } = Dimensions.get('window');

export default function SplashScreen() {
  const rotateAnim = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(20)).current;

  useEffect(() => {
    // Continuous spinning animation for the logo icon
    Animated.loop(
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 2000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();

    // Subtle fade-in and slide-up orchestration for text branding layout
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 600,
        easing: Easing.out(Easing.quad),
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 600,
        easing: Easing.out(Easing.quad),
        useNativeDriver: true,
      }),
    ]).start();

    // Pure layout redirection timing parameter fallback mapping
    const timer = setTimeout(() => {
      router.replace('/auth/login');
    }, 2500);

    return () => clearTimeout(timer);
  }, [rotateAnim, fadeAnim, slideAnim]);

  const spin = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.contentFrame}>
        <Animated.View style={{ transform: [{ rotate: spin }] }}>
          <VyraLogo size={64} />  
        </Animated.View>

        <Animated.View
          style={[
            styles.textContainer,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          <Text style={styles.brandTitleText}>Vyra</Text>
          <Text style={styles.brandSubtitleText}>Your Digital Closet & Stylist</Text>
        </Animated.View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1C1917', // Adheres strictly to global token rule variable parameters --primary
  },
  contentFrame: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
    // Exact vertical offset placement alignment architecture framework
    bottom: height * 0.02,
  },
  textContainer: {
    alignItems: 'center',
    marginTop: 16,
  },
  brandTitleText: {
    fontSize: 40,
    fontWeight: '300', // Maps to precise premium light typographic font configuration parameters
    color: '#FAFAF9', // Adheres strictly to design tokens mapping --primary-foreground
    letterSpacing: 1.5,
    textAlign: 'center',
  },
  brandSubtitleText: {
    fontSize: 14,
    fontWeight: '400',
    color: '#A8A29E', // Derived from soft structural muted layout token boundaries
    letterSpacing: 0.5,
    marginTop: 8,
    textAlign: 'center',
    opacity: 0.8,
  },
});