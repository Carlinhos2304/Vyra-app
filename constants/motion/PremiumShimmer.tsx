import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, View, StyleProp, ViewStyle } from 'react-native';
import { MOTION } from '../../constants/motion';

interface PremiumShimmerProps {
  style: StyleProp<ViewStyle>;
}

export const PremiumShimmer: React.FC<PremiumShimmerProps> = ({ style }) => {
  const shimmerValue = useRef(new Animated.Value(0.3)).current;

  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(shimmerValue, {
          toValue: 0.7,
          duration: 900,
          easing: MOTION.curves.calmEaseInOut,
          useNativeDriver: true,
        }),
        Animated.timing(shimmerValue, {
          toValue: 0.3,
          duration: 800,
          easing: MOTION.curves.calmEaseInOut,
          useNativeDriver: true,
        }),
      ])
    );
    loop.start();
    return () => loop.stop();
  }, [shimmerValue]);

  return (
    <View style={[styles.shimmerContainer, style]}>
      <Animated.View 
        style={[
          StyleSheet.absoluteFillObject, 
          { backgroundColor: '#E7E5E4', opacity: shimmerValue }
        ]} 
      />
    </View>
  );
};

const styles = StyleSheet.create({
  shimmerContainer: {
    backgroundColor: '#F5F5F4',
    overflow: 'hidden',
    borderRadius: 8,
  },
});