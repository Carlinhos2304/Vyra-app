import React from 'react';
import { StyleSheet, StyleSheetProperties } from 'react-native';
import { SafeAreaView, SafeAreaViewProps } from 'react-native-safe-area-context';

interface PremiumScreenProps extends SafeAreaViewProps {
  children: React.ReactNode;
}

/**
 * PremiumScreen - Pure structural wrapper isolating layout container bounds,
 * maintaining exact canvas color fills and safe area distribution.
 */
export const PremiumScreen: React.FC<PremiumScreenProps> = ({ 
  children, 
  style, 
  ...props 
}) => {
  return (
    <SafeAreaView style={[styles.container, style]} {...props}>
      {children}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
});