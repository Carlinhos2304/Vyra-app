import React from 'react';
import { StyleSheet, Text, TouchableOpacity, TouchableOpacityProps } from 'react-native';

interface PremiumButtonProps extends TouchableOpacityProps {
  label: string;
  onPress: () => void;
}

/**
 * PremiumButton - The primary action button extracted exactly from the login layout.
 * Retains original tap-opacity interaction metrics, geometry, and tracking.
 */
export const PremiumButton: React.FC<PremiumButtonProps> = ({
  label,
  onPress,
  style,
  ...props
}) => {
  return (
    <TouchableOpacity
      style={[styles.signInButton, style]}
      activeOpacity={0.8}
      onPress={onPress}
      {...props}
    >
      <Text style={styles.signInButtonText}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  signInButton: {
    height: 52,
    backgroundColor: '#1C1A17',
    borderRadius: 26,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 24,
  },
  signInButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '600',
  },
});