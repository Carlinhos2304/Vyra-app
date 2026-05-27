import React from 'react';
import { StyleSheet, View, ViewProps } from 'react-native';
import { colors, spacing } from '../../constants/theme'; // Adjust relative path to your token location

interface PremiumCardProps extends ViewProps {
  children: React.ReactNode;
  isDark?: boolean;
  aspectRatio?: number;
}

/**
 * PremiumCard - An architectural, minimalist structural container component.
 * Engineered for clean luxury editorial layout distribution with zero visual noise.
 */
export const PremiumCard: React.FC<PremiumCardProps> = ({
  children,
  isDark = false,
  aspectRatio,
  style,
  ...props
}) => {
  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: isDark ? 'rgba(255, 255, 255, 0.02)' : colors.surface,
          borderColor: isDark ? 'rgba(255, 255, 255, 0.06)' : colors.border,
        },
        aspectRatio ? { aspectRatio } : null,
        style,
      ]}
      {...props}
    >
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: '100%',
    padding: spacing.lg,
    borderWidth: 1,
    borderRadius: 1, // Ultra-minimal geometric radius matching high-fashion digital layouts
  },
});