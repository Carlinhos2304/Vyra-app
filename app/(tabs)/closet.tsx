import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  Dimensions,
  FlatList,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { router } from 'expo-router';

const { width } = Dimensions.get('window');
const CARD_WIDTH = (width - 44) / 2;

// 1. Declare the data array constant exactly where the compiler can find it
const GARMENTS_DATA = [
  {
    id: '1',
    name: 'White Linen Shirt',
    category: 'Tops',
    brand: 'Zara',
    color: '#FFFFFF',
    image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=300&h=400&fit=crop',
  },
  {
    id: '2',
    name: 'Blue Denim Jeans',
    category: 'Bottoms',
    brand: "Levi's",
    color: '#0000FF',
    image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=300&h=400&fit=crop',
  },
  {
    id: '3',
    name: 'Black Blazer',
    category: 'Tops',
    brand: 'H&M',
    color: '#000000',
    image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=300&h=400&fit=crop',
  },
  {
    id: '4',
    name: 'Summer Dress',
    category: 'Dresses',
    brand: 'Mango',
    color: '#FF3366',
    image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=300&h=400&fit=crop',
  },
];

const CATEGORIES = [
  { id: 'All', label: 'All', icon: 'shopping' },
  { id: 'Tops', label: 'Tops', icon: 'tshirt-crew' },
  { id: 'Bottoms', label: 'Bottoms', icon: 'human-legs' },
  { id: 'Dresses', label: 'Dresses', icon: 'clippy' },
];

export default function ClosetScreen() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  // 2. The type annotation now cleanly resolves using indexing safely
  const renderItem = ({ item }: { item: typeof GARMENTS_DATA[0] }) => (
    <TouchableOpacity
      style={styles.card}
      activeOpacity={0.9}
      onPress={() =>
        router.push({
          pathname: 'clothing/[id]',
          params: {
            id: item.id,
            name: item.name,
            brand: item.brand,
            category: item.category,
            image: item.image,
            color: item.color,
          },
        })
      }
    >
      <View style={styles.imageWrapper}>
        <Image source={{ uri: item.image }} style={styles.garmentImage} />
        <View style={[styles.colorIndicator, { backgroundColor: item.color }]} />
      </View>

      <View style={styles.cardInfo}>
        <Text style={styles.garmentName} numberOfLines={1}>
          {item.name}
        </Text>

        <View style={styles.rowMetadata}>
          <Text style={styles.brandText}>{item.brand}</Text>

          <View style={styles.badge}>
            <Text style={styles.badgeText}>{item.category}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* List Header Components wrapped inside FlatList header props to guarantee scroll synchronization */}
      <FlatList
        data={GARMENTS_DATA}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={styles.gridRow}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <View style={styles.headerStack}>
            {/* Title Block Area */}
            <View style={styles.titleRow}>
              <View>
                <Text style={styles.heading}>My Closet</Text>
                <Text style={styles.itemsCounter}>{GARMENTS_DATA.length} items</Text>
              </View>
              <TouchableOpacity style={styles.actionAddButton} activeOpacity={0.8}>
                <Feather name="plus" size={22} color="#FAFAF9" />
              </TouchableOpacity>
            </View>

            {/* Global Input Controller Framework */}
            <View style={styles.searchContainer}>
              <Feather name="search" size={18} color="#78716C" style={styles.searchIcon} />
              <TextInput
                placeholder="Search your wardrobe..."
                placeholderTextColor="#78716C"
                style={styles.textInput}
                value={searchQuery}
                onChangeText={setSearchQuery}
              />
              <TouchableOpacity style={styles.filterButton} activeOpacity={0.7}>
                <MaterialCommunityIcons name="filter-variant" size={20} color="#1C1917" />
              </TouchableOpacity>
            </View>

            {/* Horizontal Filter Row Layout */}
            <View style={styles.categoryScroller}>
              <FlatList
                horizontal
                data={CATEGORIES}
                keyExtractor={(item) => item.id}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.categoriesContent}
                renderItem={({ item }) => {
                  const isActive = activeCategory === item.id;
                  return (
                    <TouchableOpacity
                      onPress={() => setActiveCategory(item.id)}
                      activeOpacity={0.8}
                      style={[
                        styles.categoryTab,
                        isActive ? styles.categoryTabActive : styles.categoryTabInactive,
                      ]}
                    >
                      <MaterialCommunityIcons
                        name={item.icon as any}
                        size={16}
                        color={isActive ? '#FAFAF9' : '#1C1917'}
                        style={styles.categoryIcon}
                      />
                      <Text
                        style={[
                          styles.categoryLabel,
                          isActive ? styles.categoryLabelActive : styles.categoryLabelInactive,
                        ]}
                      >
                        {item.label}
                      </Text>
                    </TouchableOpacity>
                  );
                }}
              />
            </View>
          </View>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAF9', // Matches background token from theme.css
  },
  listContainer: {
    paddingHorizontal: 16,
    paddingBottom: 32,
  },
  headerStack: {
    marginBottom: 8,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
  },
  heading: {
    fontSize: 24,
    fontWeight: '400', // Matches Light styling from web spec
    color: '#1C1917',
    letterSpacing: 0.5,
  },
  itemsCounter: {
    fontSize: 14,
    color: '#78716C',
    marginTop: 2,
  },
  actionAddButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#1C1917', // Primary token implementation
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#1C1917',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F4', // Secondary background config token
    borderRadius: 16,
    height: 48,
    paddingHorizontal: 14,
    marginVertical: 12,
  },
  searchIcon: {
    marginRight: 10,
  },
  textInput: {
    flex: 1,
    fontSize: 15,
    color: '#1C1917',
  },
  filterButton: {
    padding: 6,
  },
  categoryScroller: {
    marginHorizontal: -16,
    marginBottom: 16,
  },
  categoriesContent: {
    paddingHorizontal: 16,
    gap: 8,
    paddingVertical: 4,
  },
  categoryTab: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 24,
    borderWidth: 1,
  },
  categoryTabActive: {
    backgroundColor: '#1C1917',
    borderColor: '#1C1917',
  },
  categoryTabInactive: {
    backgroundColor: 'transparent',
    borderColor: '#E7E5E4', // Border configuration element
  },
  categoryIcon: {
    marginRight: 6,
  },
  categoryLabel: {
    fontSize: 13,
    fontWeight: '500',
  },
  categoryLabelActive: {
    color: '#FAFAF9',
  },
  categoryLabelInactive: {
    color: '#1C1917',
  },
  gridRow: {
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  card: {
    width: CARD_WIDTH,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#F5F5F4',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 3,
    elevation: 1,
  },
  imageWrapper: {
    width: '100%',
    height: CARD_WIDTH * 1.28, // Calculated 3:4 aspect-ratio emulation framework
    backgroundColor: '#F5F5F4',
    position: 'relative',
  },
  garmentImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  colorIndicator: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: '#FFFFFF',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.15,
    shadowRadius: 2,
    elevation: 2,
  },
  cardInfo: {
    padding: 12,
  },
  garmentName: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1C1917',
    marginBottom: 6,
  },
  rowMetadata: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  brandText: {
    fontSize: 12,
    color: '#78716C',
  },
  badge: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#E7E5E4',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
  },
  badgeText: {
    fontSize: 10,
    fontWeight: '500',
    color: '#78716C',
  },
});