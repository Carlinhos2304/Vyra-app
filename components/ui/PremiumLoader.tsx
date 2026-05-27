import React, { useEffect, useRef } from 'react';
import { StyleSheet, Text, View, Animated, Easing } from 'react-native';
import { colors, spacing } from '../../constants/theme'; // Adjust relative path to your token location

interface PremiumLoaderProps {
  label?: string;
  fullscreen?: boolean;
}

/**
 * PremiumLoader
 * A minimalist, lightweight loading indicator built for high-end editorial interfaces.
 * Uses a precise, low-velocity horizontal track pulse instead of high-motion spinners.
 */
export const PremiumLoader: React.FC<PremiumLoaderProps> = ({
  label,
  fullscreen = false,
}) => {
  const pulseAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1600,
          easing: Easing.bezier(0.25, 1, 0.5, 1), // Premium ease-out
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 0,
          duration: 1400,
          easing: Easing.bezier(0.33, 0, 0.67, 1), // Calm ease-in-out
          useNativeDriver: true,
        }),
      ])
    );

    animation.start();
    return () => animation.stop();
  }, [pulseAnim]);

  // Subtle architectural micro-interactions
  const trackScaleX = pulseAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.6, 1.05],
  });

  const trackOpacity = pulseAnim.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0.25, 0.8, 0.4],
  });

  const labelOpacity = pulseAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.4, 0.7],
  });

  return (
    <View
      style={[
        styles.container,
        fullscreen && styles.fullscreen,
        fullscreen && { backgroundColor: colors.background },
      ]}
    >
      <View style={styles.trackWrapper}>
        <Animated.View
          style={[
            styles.indicatorTrack,
            {
              backgroundColor: colors.primary,
              opacity: trackOpacity,
              transform: [{ scaleX: trackScaleX }],
            },
          ]}
        />
      </View>

      {label && (
        <Animated.Text
          style={[
            styles.editorialLabel,
            { color: colors.secondaryText, marginTop: spacing.md, opacity: labelOpacity },
          ]}
        >
          {label}
        </Animated.Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.lg,
  },
  fullscreen: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 999,
  },
  trackWrapper: {
    width: 48,
    height: 1,
    overflow: 'hidden',
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },
  indicatorTrack: {
    width: '100%',
    height: '100%',
  },
  editorialLabel: {
    fontSize: 10,
    fontWeight: '400',
    letterSpacing: 1.5,
    textTransform: 'uppercase',
    textAlign: 'center',
  },
});