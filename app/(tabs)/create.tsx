import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Image,
  Dimensions,
  FlatList,
} from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { PremiumScreen } from '../../components/ui/PremiumScreen';
import { SectionHeader } from '../../components/ui/SectionHeader';
import { SectionTitle } from '../../components/ui/SectionTitle';

const { width } = Dimensions.get('window');
const GRID_ITEM_WIDTH = (width - 44) / 2; // Precise 2-column mathematical grid calculation matching theme margins

// Mock dataset directly based on the layout and arrays defined in the exported Figma AI component
const AVAILABLE_ITEMS = [
  {
    id: '1',
    name: 'White Shirt',
    category: 'top',
    image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=150&h=200&fit=crop',
  },
  {
    id: '2',
    name: 'Blue Jeans',
    category: 'bottom',
    image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=150&h=200&fit=crop',
  },
  {
    id: '3',
    name: 'Black Blazer',
    category: 'top',
    image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=150&h=200&fit=crop',
  },
  {
    id: '4',
    name: 'Brown Boots',
    category: 'shoes',
    image: 'https://images.unsplash.com/photo-1608256246200-53e635b5b65f?w=150&h=200&fit=crop',
  },
];

export default function CreateOutfitScreen() {
  const [outfitName, setOutfitName] = useState('');
  const [selectedItems, setSelectedItems] = useState<typeof AVAILABLE_ITEMS>([]);

  const handleAddItem = (item: typeof AVAILABLE_ITEMS[0]) => {
    if (!selectedItems.some((selected) => selected.id === item.id)) {
      setSelectedItems([...selectedItems, item]);
    }
  };

  const handleRemoveItem = (id: string) => {
    setSelectedItems(selectedItems.filter((item) => item.id !== id));
  };

  const renderAvailableItem = ({ item }: { item: typeof AVAILABLE_ITEMS[0] }) => {
    const isSelected = selectedItems.some((selected) => selected.id === item.id);

    return (
      <TouchableOpacity
        onPress={() => !isSelected && handleAddItem(item)}
        activeOpacity={isSelected ? 1 : 0.8}
        style={[styles.gridCard, isSelected && styles.gridCardDisabled]}
      >
        <View style={styles.gridImageContainer}>
          <Image source={{ uri: item.image }} style={styles.gridCardImage} />
          {!isSelected && (
            <View style={styles.gridImageOverlay}>
              <Ionicons name="add" size={24} color="#FFFFFF" />
            </View>
          )}
        </View>
        <View style={styles.gridCardFooter}>
          <Text style={styles.gridCardName} numberOfLines={1}>
            {item.name}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <PremiumScreen>
      <FlatList
        data={AVAILABLE_ITEMS}
        renderItem={renderAvailableItem}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={styles.gridRow}
        contentContainerStyle={styles.scrollPadding}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <View style={styles.headerBlock}>
            {/* Screen Header level with custom structural header block */}
            <View style={styles.topBar}>
              <SectionHeader
                title="Create Outfit"
                subtitle="Mix & match items from your wardrobe"
                style={styles.headerFlexOverride}
              />
              <TouchableOpacity style={styles.saveActionCircle} activeOpacity={0.8}>
                <Ionicons name="save-outline" size={20} color="#FAFAF9" />
              </TouchableOpacity>
            </View>

            {/* Canvas Input Controller framework */}
            <View style={styles.formSection}>
              <SectionTitle withBottomMargin>Outfit Details</SectionTitle>
              <TextInput
                placeholder="Name your creation (e.g., Casual Friday)"
                placeholderTextColor="#78716C"
                value={outfitName}
                onChangeText={setOutfitName}
                style={styles.textInputControl}
              />
            </View>

            {/* Dynamic Workspace / Canvas Preview Section */}
            <View style={styles.canvasSection}>
              <View style={styles.canvasHeader}>
                <MaterialCommunityIcons name="sparkles" size={14} color="#1C1917" style={styles.sparkleIcon} />
                <SectionTitle>Outfit Canvas</SectionTitle>
              </View>

              {selectedItems.length === 0 ? (
                <View style={styles.emptyStateContainer}>
                  <MaterialCommunityIcons name="hanger" size={32} color="#78716C" style={styles.emptyStateIcon} />
                  <Text style={styles.emptyStateText}>
                    Select garments from below to assemble your combination
                  </Text>
                </View>
              ) : (
                <ScrollView
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={styles.canvasHorizontalTrack}
                >
                  {selectedItems.map((item) => (
                    <View key={item.id} style={styles.previewCanvasCard}>
                      <Image source={{ uri: item.image }} style={styles.canvasCardImage} />
                      <TouchableOpacity
                        style={styles.removeBadgeButton}
                        onPress={() => handleRemoveItem(item.id)}
                        activeOpacity={0.7}
                      >
                        <Ionicons name="close-circle" size={20} color="#1C1917" />
                      </TouchableOpacity>
                      <View style={styles.canvasCardLabelContainer}>
                        <Text style={styles.canvasCardNameText} numberOfLines={1}>
                          {item.name}
                        </Text>
                      </View>
                    </View>
                  ))}
                </ScrollView>
              )}
            </View>

            {/* Section Split Title Separator */}
            <View style={styles.dividerHeader}>
              <SectionTitle>Wardrobe Items</SectionTitle>
            </View>
          </View>
        }
      />
    </PremiumScreen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAF9',
  },
  scrollPadding: {
    paddingHorizontal: 16,
    paddingBottom: 32,
  },
  headerBlock: {
    marginBottom: 8,
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingVertical: 16,
  },
  headerFlexOverride: {
    flex: 1,
    paddingVertical: 0,
  },
  saveActionCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#1C1917',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 16,
    marginTop: 2,
    shadowColor: '#1C1917',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
  },
  formSection: {
    marginVertical: 12,
  },
  textInputControl: {
    backgroundColor: '#F5F5F4',
    borderRadius: 16,
    height: 48,
    paddingHorizontal: 16,
    fontSize: 14,
    color: '#1C1917',
    borderWidth: 1,
    borderColor: '#E7E5E4',
  },
  canvasSection: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#E7E5E4',
    padding: 16,
    marginVertical: 12,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.02,
    shadowRadius: 3,
    elevation: 1,
  },
  canvasHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
  },
  sparkleIcon: {
    marginRight: 6,
  },
  emptyStateContainer: {
    height: 140,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  emptyStateIcon: {
    marginBottom: 8,
    opacity: 0.7,
  },
  emptyStateText: {
    fontSize: 13,
    color: '#78716C',
    textAlign: 'center',
    lineHeight: 18,
  },
  canvasHorizontalTrack: {
    gap: 12,
    paddingRight: 16,
  },
  previewCanvasCard: {
    width: 90,
    position: 'relative',
  },
  canvasCardImage: {
    width: 90,
    height: 120,
    borderRadius: 12,
    backgroundColor: '#F5F5F4',
  },
  removeBadgeButton: {
    position: 'absolute',
    top: -6,
    right: -6,
    zIndex: 10,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
  },
  canvasCardLabelContainer: {
    marginTop: 4,
    paddingHorizontal: 2,
  },
  canvasCardNameText: {
    fontSize: 11,
    color: '#78716C',
    textAlign: 'center',
  },
  dividerHeader: {
    marginTop: 24,
    marginBottom: 16,
  },
  gridRow: {
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  gridCard: {
    width: GRID_ITEM_WIDTH,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#F5F5F4',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.03,
    shadowRadius: 2,
    elevation: 1,
  },
  gridCardDisabled: {
    opacity: 0.4,
  },
  gridImageContainer: {
    width: '100%',
    height: GRID_ITEM_WIDTH * 1.33,
    backgroundColor: '#F5F5F4',
    position: 'relative',
  },
  gridCardImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  gridImageOverlay: {
    position: 'absolute',
    inset: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.04)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  gridCardFooter: {
    padding: 10,
  },
  gridCardName: {
    fontSize: 13,
    fontWeight: '400',
    color: '#1C1917',
    textAlign: 'center',
  },
});