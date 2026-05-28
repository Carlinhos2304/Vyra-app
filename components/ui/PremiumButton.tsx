import React from 'react';
import { StyleSheet, Text, Animated, Pressable, ViewStyle, StyleProp } from 'react-native';
import { colors, spacing } from '../../constants/theme';
import { usePremiumPress } from '../../hooks/animation/usePremiumPress';

interface PremiumButtonProps {
  label: string;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
  disabled?: boolean;
  isLoading?: boolean;
}

export const PremiumButton: React.FC<PremiumButtonProps> = ({
  label,
  onPress,
  style,
  disabled = false,
  isLoading = false,
}) => {
  const { pressProps, animatedStyle } = usePremiumPress();
  const isInteractive = !disabled && !isLoading;

  return (
    <Pressable 
      onPress={onPress} 
      disabled={!isInteractive}
      style={styles.pressableReset}
    >
      <Animated.View
        style={[
          styles.buttonBody,
          style,
          isInteractive && animatedStyle,
          (disabled || isLoading) && styles.disabledState,
        ]}
        {...(isInteractive ? pressProps : {})}
      >
        <Text style={styles.buttonLabel}>{label}</Text>
      </Animated.View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  pressableReset: {
    width: '100%',
  },
  buttonBody: {
    height: 52,
    backgroundColor: '#1C1917', // Primary Brand Onyx
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  buttonLabel: {
    color: '#FAFAF9', // Alabaster text token
    fontSize: 15,
    fontWeight: '500',
    letterSpacing: 0.3,
  },
  disabledState: {
    opacity: 0.5,
  },
});