import React from 'react';
import { StyleSheet, Text, View, Dimensions, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');

// Premium Component: The Reconstructed Asymmetric Vertex Symbol
const VyraMark = ({ isDark }: { isDark: boolean }) => {
  const coreColor = isDark ? '#FAFAF9' : '#1C1917';
  const hairlineColor = isDark ? 'rgba(250, 250, 249, 0.4)' : 'rgba(28, 25, 23, 0.4)';

  return (
    <View style={styles.markContainer}>
      {/* Weighted Left Stroke */}
      <View style={[styles.leftBlockStroke, { backgroundColor: coreColor }]} />
      {/* Hairline Right Stroke */}
      <View style={[styles.rightHairlineStroke, { backgroundColor: hairlineColor }]} />
      {/* Micro-Cut Horizontal Floor Base */}
      <View style={[styles.horizontalBaseCut, { backgroundColor: isDark ? '#1C1917' : '#FAFAF9' }]} />
    </View>
  );
};

export default function BrandIdentityDashboard() {
  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollLayout}>
        
        {/* Header Block */}
        <View style={styles.headerBlock}>
          <Text style={styles.sectionLabelHeading}>VYRA BRAND IDENTITY SYSTEM</Text>
          <Text style={styles.paragraphDescription}>
            Production UI branding asset preview maps configured directly from design tokens.
          </Text>
        </View>

        {/* Component 1: Light Background Preview */}
        <Text style={styles.contextLabelText}>Light Background Preview (Standard Canvas)</Text>
        <View style={[styles.previewCanvasFrame, styles.bgLight]}>
          <VyraMark isDark={false} />
          <Text style={styles.wordmarkLight}>VYRA</Text>
          <Text style={styles.subtextMuted}>DIGITAL CLOSET</Text>
        </View>

        {/* Component 2: Dark Background Preview */}
        <Text style={styles.contextLabelText}>Dark Background Preview (Premium Overlay / Splash)</Text>
        <View style={[styles.previewCanvasFrame, styles.bgDark]}>
          <VyraMark isDark={true} />
          <Text style={styles.wordmarkDark}>VYRA</Text>
          <Text style={[styles.subtextMuted, { color: '#78716C' }]}>AI STYLIST</Text>
        </View>

        {/* Component 3: App Icon Variation Matrices */}
        <Text style={styles.contextLabelText}>App Icon Dimensions & Borders Preview</Text>
        <View style={styles.appIconRowGroup}>
          
          {/* Light Minimalist App Icon Wrapper */}
          <View style={[styles.appIconContainerSquare, styles.bgLight, styles.borderOutline]}>
            <View style={styles.scaleReductionWrapper}>
              <VyraMark isDark={false} />
            </View>
          </View>

          {/* Dark Luxury App Icon Wrapper */}
          <View style={[styles.appIconContainerSquare, styles.bgDark]}>
            <View style={styles.scaleReductionWrapper}>
              <VyraMark isDark={true} />
            </View>
          </View>

          {/* Monochromatic High Contrast Grid Icon */}
          <View style={[styles.appIconContainerSquare, { backgroundColor: '#000000' }]}>
            <View style={styles.scaleReductionWrapper}>
              <VyraMark isDark={true} />
            </View>
          </View>

        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAF9',
  },
  scrollLayout: {
    padding: 24,
    paddingBottom: 60,
  },
  headerBlock: {
    marginBottom: 32,
  },
  sectionLabelHeading: {
    fontSize: 12,
    fontWeight: '500',
    color: '#1C1917',
    letterSpacing: 2,
    marginBottom: 6,
  },
  paragraphDescription: {
    fontSize: 14,
    color: '#78716C',
    lineHeight: 20,
  },
  contextLabelText: {
    fontSize: 11,
    fontWeight: '500',
    color: '#78716C',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginTop: 20,
    marginBottom: 10,
  },
  previewCanvasFrame: {
    width: '100%',
    paddingVertical: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  bgLight: {
    backgroundColor: '#FAFAF9',
  },
  bgDark: {
    backgroundColor: '#1C1917',
  },
  borderOutline: {
    borderWidth: 1,
    borderColor: '#E7E5E4',
  },
  wordmarkLight: {
    fontSize: 22,
    fontWeight: '300',
    color: '#1C1917',
    letterSpacing: 8,
    marginTop: 20,
    marginLeft: 8, // Balances trailing tracking space cleanly
    textTransform: 'uppercase',
  },
  wordmarkDark: {
    fontSize: 22,
    fontWeight: '300',
    color: '#FAFAF9',
    letterSpacing: 8,
    marginTop: 20,
    marginLeft: 8,
    textTransform: 'uppercase',
  },
  subtextMuted: {
    fontSize: 10,
    fontWeight: '400',
    color: '#78716C',
    letterSpacing: 3,
    marginTop: 6,
    marginLeft: 3,
    textTransform: 'uppercase',
  },
  
  // Custom Asymmetric Symbol Vector Logic Frame
  markContainer: {
    width: 48,
    height: 48,
    position: 'relative',
  },
  leftBlockStroke: {
    position: 'absolute',
    left: 8,
    top: 4,
    width: 14,
    height: 42,
    transform: [{ rotate: '22deg' }],
    borderRadius: 1,
  },
  rightHairlineStroke: {
    position: 'absolute',
    right: 12,
    top: 4,
    width: 2.5,
    height: 42,
    transform: [{ rotate: '-22deg' }],
    borderRadius: 1,
  },
  horizontalBaseCut: {
    position: 'absolute',
    bottom: -1,
    left: 0,
    right: 0,
    height: 6,
  },

  // App Icon Mock Subsections Layout Frame
  appIconRowGroup: {
    flexDirection: 'row',
    gap: 16,
    marginTop: 4,
  },
  appIconContainerSquare: {
    width: (width - 80) / 3,
    aspectRatio: 1,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.03,
    shadowRadius: 8,
    elevation: 2,
  },
  scaleReductionWrapper: {
    transform: [{ scale: 0.65 }], // Correctly standardizes layout sizing parameters inside icons
  },
});