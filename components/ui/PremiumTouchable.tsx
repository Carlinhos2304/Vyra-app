import React from 'react';
import { Animated, Pressable, StyleSheet, StyleProp, ViewStyle } from 'react-native';
import { usePremiumPress } from '../../hooks/animation/usePremiumPress';

interface PremiumTouchableProps {
  children: React.ReactNode;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
  disabled?: boolean;
  activeOpacity?: number; // Maintained for API compatibility with legacy touches
}

export const PremiumTouchable: React.FC<PremiumTouchableProps> = ({
  children,
  onPress,
  style,
  disabled = false,
}) => {
  const { pressProps, animatedStyle } = usePremiumPress();

  return (
    <Pressable 
      onPress={onPress} 
      disabled={disabled}
      style={styles.pressableReset}
    >
      <Animated.View 
        style={[
          style, 
          !disabled && animatedStyle,
          disabled && styles.disabledOpacity
        ]}
        {...(!disabled ? pressProps : {})}
      >
        {children}
      </Animated.View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  pressableReset: {
    backgroundColor: 'transparent',
  },
  disabledOpacity: {
    opacity: 0.4,
  },
});