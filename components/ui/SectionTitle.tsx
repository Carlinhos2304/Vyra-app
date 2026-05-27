import React from 'react';
import { StyleSheet, Text, TextStyle, View, ViewProps } from 'react-native';
import { colors, spacing } from '../../constants/theme'; // Adjust relative path to your token location

interface SectionTitleProps extends ViewProps {
  children: string;
  isDark?: boolean;
  withBottomMargin?: boolean;
}

/**
 * SectionTitle - A lightweight, quiet typography component designed for 
 * architectural sub-sections, internal card divisions, and small structural labels.
 * Employs a restrained editorial tracking framework inspired by premium fashion-tech.
 */
export const SectionTitle: React.FC<SectionTitleProps> = ({
  children,
  isDark = false,
  withBottomMargin = false,
  style,
  ...props
}) => {
  const textColor = isDark ? '#FAFAF9' : colors.primary;

  return (
    <View 
      style={[
        styles.container, 
        withBottomMargin && styles.bottomMargin, 
        style
      ]} 
      {...props}
    >
      <Text style={[styles.text, { color: textColor }]}>
        {children.toUpperCase()}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
  },
  bottomMargin: {
    marginBottom: spacing.sm, // Disciplined, compressed spacing for internal architecture
  },
  text: {
    fontSize: 10,
    fontWeight: '600',
    letterSpacing: 2.0, // Restrained luxury tracking scale for functional subheadings
    lineHeight: 14,
  } as TextStyle,
});