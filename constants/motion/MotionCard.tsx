import React from 'react';
import { Animated, Pressable, StyleProp, ViewStyle } from 'react-native';
import { usePremiumPress } from '../../hooks/animation/usePremiumPress';

interface MotionCardProps {
  children: React.ReactNode;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
}

export const MotionCard: React.FC<MotionCardProps> = ({ children, onPress, style }) => {
  const { pressProps, animatedStyle } = usePremiumPress();

  return (
    <Pressable onPress={onPress} disabled={!onPress}>
      {({ pressed }) => (
        <Animated.View style={[style, animatedStyle]}>
          {children}
        </Animated.View>
      )}
    </Pressable>
  );
};