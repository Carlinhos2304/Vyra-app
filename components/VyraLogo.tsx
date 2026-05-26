import React from 'react';
import { View, StyleSheet } from 'react-native';

type Props = {
  isDark?: boolean;
  size?: number;
};

export default function VyraLogo({
  isDark = false,
  size = 48,
}: Props) {
  const coreColor = isDark ? '#FAFAF9' : '#1C1917';

  const hairlineColor = isDark
    ? 'rgba(250, 250, 249, 0.4)'
    : 'rgba(28, 25, 23, 0.4)';

  return (
    <View
      style={[
        styles.markContainer,
        {
          width: size,
          height: size,
        },
      ]}
    >
      {/* Thick left stroke */}
      <View
        style={[
          styles.leftBlockStroke,
          {
            backgroundColor: coreColor,
          },
        ]}
      />

      {/* Thin right stroke */}
      <View
        style={[
          styles.rightHairlineStroke,
          {
            backgroundColor: hairlineColor,
          },
        ]}
      />

      {/* Bottom cut */}
      <View
        style={[
          styles.horizontalBaseCut,
          {
            backgroundColor: isDark ? '#1C1917' : '#FAFAF9',
          },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  markContainer: {
    position: 'relative',
  },

  leftBlockStroke: {
    position: 'absolute',
    left: '18%',
    top: '8%',
    width: '28%',
    height: '85%',
    transform: [{ rotate: '22deg' }],
    borderRadius: 2,
  },

  rightHairlineStroke: {
    position: 'absolute',
    right: '24%',
    top: '8%',
    width: '5%',
    height: '85%',
    transform: [{ rotate: '-22deg' }],
    borderRadius: 2,
  },

  horizontalBaseCut: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '12%',
  },
});