import { useRef } from 'react';
import { Animated } from 'react-native';
import { MOTION } from '../../constants/motion';

export function usePremiumPress() {
  const scale = useRef(new Animated.Value(1)).current;
  const opacity = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.parallel([
      Animated.spring(scale, {
        toValue: 0.96, // Subtle structural deformation
        useNativeDriver: true,
        ...MOTION.springs.interactiveCard,
      }),
      Animated.timing(opacity, {
        toValue: 0.85,
        duration: MOTION.timings.instant,
        easing: MOTION.curves.calmEaseInOut,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const handlePressOut = () => {
    Animated.parallel([
      Animated.spring(scale, {
        toValue: 1,
        useNativeDriver: true,
        ...MOTION.springs.interactiveCard,
      }),
      Animated.timing(opacity, {
        toValue: 1,
        duration: MOTION.timings.micro,
        easing: MOTION.curves.premiumEaseOut,
        useNativeDriver: true,
      }),
    ]).start();
  };

  return {
    pressProps: {
      onPressIn: handlePressIn,
      onPressOut: handlePressOut,
    },
    animatedStyle: {
      transform: [{ scale }],
      opacity,
    },
  };
}