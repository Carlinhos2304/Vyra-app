import React, { useEffect, useRef } from 'react';
import { Animated } from 'react-native';
import { MOTION } from '../../constants/motion';

interface StaggeredListWrapperProps {
  children: React.ReactNode;
  index: number;
}

export const StaggeredListWrapper: React.FC<StaggeredListWrapperProps> = ({ children, index }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(14)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: MOTION.timings.subtle,
        delay: index * MOTION.timings.stagger,
        easing: MOTION.curves.premiumEaseOut,
        useNativeDriver: true,
      }),
      Animated.timing(translateY, {
        toValue: 0,
        duration: MOTION.timings.subtle,
        delay: index * MOTION.timings.stagger,
        easing: MOTION.curves.premiumEaseOut,
        useNativeDriver: true,
      }),
    ]).start();
  }, [index]);

  return (
    <Animated.View style={{ opacity: fadeAnim, transform: [{ translateY }] }}>
      {children}
    </Animated.View>
  );
};