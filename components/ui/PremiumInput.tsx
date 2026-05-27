import React from 'react';
import { StyleSheet, Text, View, TextInput, TextInputProps } from 'react-native';

interface PremiumInputProps extends TextInputProps {
  label: string;
}

/**
 * PremiumInput - Isolated structural input element extracted directly from the form container.
 * Preserves the exact text layout tracking, background canvas fill, and semantic label layout.
 */
export const PremiumInput: React.FC<PremiumInputProps> = ({
  label,
  style,
  ...props
}) => {
  return (
    <View style={styles.inputFieldContainer}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={[styles.input, style]}
        placeholderTextColor="#999999"
        autoCapitalize="none"
        autoCorrect={false}
        {...props}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  inputFieldContainer: {
    width: '100%',
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: '#000000',
    marginBottom: 8,
    marginTop: 16,
  },
  input: {
    height: 52,
    backgroundColor: '#F5F5F5',
    borderRadius: 14,
    paddingHorizontal: 16,
    fontSize: 15,
    color: '#000000',
  },
});