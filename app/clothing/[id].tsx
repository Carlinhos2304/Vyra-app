import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

type ClothingDetailSearchParams = {
  id: string;
  name: string;
  brand: string;
  category: string;
  image: string;
  color: string;
};

export default function ClothingDetailScreen() {
  const params = useLocalSearchParams<ClothingDetailSearchParams>();
  
  const { id, name, brand, category, image, color } = params;

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Absolute Header Navigation Overlay */}
      <View style={styles.navBarFloatingOverlay}>
        <TouchableOpacity 
          style={styles.navCircleActionButton} 
          onPress={() => router.navigate('/(tabs)/closet')}
          activeOpacity={0.8}
        >
          <Ionicons name="arrow-back" size={20} color="#1C1917" />
        </TouchableOpacity>
        
        <View style={styles.navActionRightBlock}>
          <TouchableOpacity style={styles.navCircleActionButton} activeOpacity={0.8}>
            <Ionicons name="heart-outline" size={20} color="#1C1917" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.navCircleActionButton} activeOpacity={0.8}>
            <Ionicons name="share-social-outline" size={20} color="#1C1917" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollLayout}>
        {/* Core Hero Showcase Image Framework */}
        <View style={styles.heroImageFrame}>
          {image ? (
            <Image source={{ uri: image }} style={styles.garmentCoverImage} />
          ) : (
            <View style={styles.garmentCoverImage} />
          )}
        </View>

        {/* Informational Presentation Shell */}
        <View style={styles.detailCardBody}>
          <View style={styles.identityHeaderRow}>
            <View style={styles.titleTextContainer}>
              <Text style={styles.brandSubtitleText}>{brand || 'Unknown Brand'}</Text>
              <Text style={styles.garmentNameTitleText}>{name || 'Unnamed Garment'}</Text>
            </View>
            <View style={styles.categoryBadgeContainer}>
              <Text style={styles.categoryBadgeText}>{category || 'Uncategorized'}</Text>
            </View>
          </View>

          {/* Attribute Structured Parameters Data Grid */}
          <View style={styles.attributesSpecificationGrid}>
            <View style={styles.gridAttributeCell}>
              <Text style={styles.attributeLabelText}>Color</Text>
              <View style={styles.colorIndicatorRow}>
                <View 
                  style={[
                    styles.colorBlockVisual, 
                    { backgroundColor: color ? color.toLowerCase() : 'transparent' }
                  ]} 
                />
                <Text style={styles.attributeValueText}>{color || 'N/A'}</Text>
              </View>
            </View>

            <View style={styles.gridAttributeCell}>
              <Text style={styles.attributeLabelText}>ID</Text>
              <Text style={styles.attributeValueText}>#{id || 'N/A'}</Text>
            </View>
          </View>

          {/* Destructive Control Management Button Group Shelf */}
          <View style={styles.actionButtonGroupHorizontalRow}>
            <TouchableOpacity style={styles.secondaryOutlineActionButton} activeOpacity={0.7}>
              <Ionicons name="create-outline" size={16} color="#1C1917" style={styles.actionButtonIconStyle} />
              <Text style={styles.secondaryButtonLabelText}>Edit Item</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.destructiveOutlineActionButton} activeOpacity={0.7}>
              <Ionicons name="trash-outline" size={16} color="#DC2626" style={styles.actionButtonIconStyle} />
              <Text style={styles.destructiveButtonLabelText}>Delete</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAF9', // Adheres strictly to global --background configuration in theme.css
  },
  scrollLayout: {
    paddingBottom: 40,
  },
  navBarFloatingOverlay: {
    position: 'absolute',
    top: 56,
    left: 20,
    right: 20,
    zIndex: 100,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  navActionRightBlock: {
    flexDirection: 'row',
    gap: 10,
  },
  navCircleActionButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  heroImageFrame: {
    width: width,
    height: width * 1.25, // Formulates premium structural scale framework aspect configuration choices
    backgroundColor: '#F5F5F4',
  },
  garmentCoverImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  detailCardBody: {
    marginTop: -24,
    backgroundColor: '#FAFAF9',
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    paddingTop: 24,
    paddingHorizontal: 24,
  },
  identityHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  titleTextContainer: {
    flex: 1,
    paddingRight: 16,
  },
  brandSubtitleText: {
    fontSize: 13,
    fontWeight: '500',
    color: '#78716C', // Aligns identically with design tokens mapping --muted-foreground 
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 4,
  },
  garmentNameTitleText: {
    fontSize: 24,
    fontWeight: '400',
    color: '#1C1917',
    letterSpacing: 0.3,
  },
  categoryBadgeContainer: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E7E5E4', // Derived from --border schema rules variables
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  categoryBadgeText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#78716C',
  },
  attributesSpecificationGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    backgroundColor: '#FFFFFF', // Maps to structural interface card rules --card specification parameter
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#E7E5E4',
    padding: 4,
    marginTop: 24,
    marginBottom: 24,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.01,
    shadowRadius: 3,
    elevation: 1,
  },
  gridAttributeCell: {
    width: '50%',
    padding: 16,
    borderWidth: 0.5,
    borderColor: '#F5F5F4',
  },
  attributeLabelText: {
    fontSize: 11,
    color: '#78716C',
    fontWeight: '500',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 6,
  },
  attributeValueText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1C1917',
  },
  colorIndicatorRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  colorBlockVisual: {
    width: 14,
    height: 14,
    borderRadius: 7,
    marginRight: 6,
    borderWidth: 1,
    borderColor: '#E7E5E4',
  },
  actionButtonGroupHorizontalRow: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 8,
  },
  secondaryOutlineActionButton: {
    flex: 1,
    flexDirection: 'row',
    height: 48,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E7E5E4',
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  secondaryButtonLabelText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1C1917',
  },
  destructiveOutlineActionButton: {
    flex: 1,
    flexDirection: 'row',
    height: 48,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#FCA5A5', // Soft error boundary frame highlighting
    backgroundColor: '#FFF5F5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  destructiveButtonLabelText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#DC2626', // Direct deployment mapping architectural specifications --destructive variables
  },
  actionButtonIconStyle: {
    marginRight: 6,
  },
});