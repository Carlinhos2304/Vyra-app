import React from 'react';
import { StyleSheet, Text, View, ViewProps } from 'react-native';
import { colors, spacing } from '../../constants/theme'; // Adjust relative path to your token location

interface SectionHeaderProps extends ViewProps {
  title: string;
  subtitle?: string;
  isDark?: boolean;
}

/**
 * SectionHeader - A premium luxury editorial heading component.
 * Engineered with high tracking and structured architectural hierarchy 
 * to align with the minimalist aesthetics of high-fashion digital platforms.
 */
export const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  subtitle,
  isDark = false,
  style,
  ...props
}) => {
  const primaryTextColor = isDark ? '#FAFAF9' : colors.primary;
  const secondaryTextColor = isDark ? 'rgba(250, 250, 249, 0.5)' : colors.secondaryText;

  return (
    <View style={[styles.container, style]} {...props}>
      <Text style={[styles.title, { color: primaryTextColor }]}>
        {title.toUpperCase()}
      </Text>
      {subtitle && (
        <Text style={[styles.subtitle, { color: secondaryTextColor }]}>
          {subtitle}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingVertical: spacing.sm,
  },
  title: {
    fontSize: 11,
    fontWeight: '600',
    letterSpacing: 2.5, // High tracking signature for luxury editorial alignment
    lineHeight: 16,
  },
  subtitle: {
    fontSize: 13,
    fontWeight: '400',
    letterSpacing: 0.2,
    lineHeight: 18,
    marginTop: spacing.xs, // Strict, elegant spacing bounds
  },
});