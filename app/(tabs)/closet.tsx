import React, { useState, useEffect, useRef } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Dimensions,
  FlatList,
  Image,
  Animated,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { PremiumScreen } from '../../components/ui/PremiumScreen';
import { PremiumCard } from '../../components/ui/PremiumCard';
import { PremiumTouchable } from '../../components/ui/PremiumTouchable';
import { StaggeredListWrapper } from '../../constants/motion/StaggeredListWrapper';
import { SectionHeader } from '../../components/ui/SectionHeader'; 
import { SectionTitle } from '../../components/ui/SectionTitle';

const { width } = Dimensions.get('window');
const CARD_WIDTH = (width - 44) / 2;

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

  // Top header elements animation tokens
  const entryHeaderOpacity = useRef(new Animated.Value(0)).current;
  const entryHeaderTranslateY = useRef(new Animated.Value(-10)).current;
  
  const searchBarOpacity = useRef(new Animated.Value(0)).current;
  const searchBarTranslateY = useRef(new Animated.Value(12)).current;

  const filtersOpacity = useRef(new Animated.Value(0)).current;
  const filtersTranslateY = useRef(new Animated.Value(8)).current;

  // Empty state scale tracking
  const emptyScaleAnim = useRef(new Animated.Value(0.95)).current;
  const emptyOpacityAnim = useRef(new Animated.Value(0)).current;

  // Dynamic search and filter processing mapping
  const filteredGarments = GARMENTS_DATA.filter((garment) => {
    const matchesCategory = activeCategory === 'All' || garment.category === activeCategory;
    const matchesQuery = garment.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         garment.brand.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesQuery;
  });

  useEffect(() => {
    // Structural layout entrance stagger chain
    Animated.stagger(90, [
      Animated.parallel([
        Animated.timing(entryHeaderOpacity, { toValue: 1, duration: 400, useNativeDriver: true }),
        Animated.timing(entryHeaderTranslateY, { toValue: 0, duration: 400, useNativeDriver: true }),
      ]),
      Animated.parallel([
        Animated.timing(searchBarOpacity, { toValue: 1, duration: 400, useNativeDriver: true }),
        Animated.timing(searchBarTranslateY, { toValue: 0, duration: 400, useNativeDriver: true }),
      ]),
      Animated.parallel([
        Animated.timing(filtersOpacity, { toValue: 1, duration: 350, useNativeDriver: true }),
        Animated.timing(filtersTranslateY, { toValue: 0, duration: 350, useNativeDriver: true }),
      ]),
    ]).start();
  }, []);

  // Trigger smooth arrival metrics when empty configuration states map true
  useEffect(() => {
    if (filteredGarments.length === 0) {
      Animated.parallel([
        Animated.timing(emptyOpacityAnim, { toValue: 1, duration: 400, useNativeDriver: true }),
        Animated.spring(emptyScaleAnim, { toValue: 1, tension: 25, friction: 7, useNativeDriver: true }),
      ]).start();
    } else {
      emptyOpacityAnim.setValue(0);
      emptyScaleAnim.setValue(0.95);
    }
  }, [filteredGarments.length]);

  const renderItem = ({ item, index }: { item: typeof GARMENTS_DATA[0]; index: number }) => (
    <StaggeredListWrapper index={index}>
      <PremiumCard 
        style={styles.card}
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
          <Image source={{ uri: item.image }} style={styles.imageGarmentImage} />
          <View style={[styles.colorIndicator, { backgroundColor: item.color }]} />
        </View>

        <View style={styles.cardInfo}>
          <SectionTitle withBottomMargin>{item.brand}</SectionTitle>
          
          <Text style={styles.garmentName} numberOfLines={1}>
            {item.name}
          </Text>

          <View style={styles.rowMetadata}>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{item.category}</Text>
            </View>
          </View>
        </View>
      </PremiumCard>
    </StaggeredListWrapper>
  );

  return (
    <PremiumScreen>
      <FlatList
        data={filteredGarments}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={styles.gridRow}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        // Forces re-stagger layout recalculation gracefully when structural categories flip
        extraData={activeCategory} 
        ListHeaderComponent={
          <View style={styles.headerStack}>
            {/* Title Block Area with Premium Layout System */}
            <Animated.View style={[
              styles.titleRow,
              { opacity: entryHeaderOpacity, transform: [{ translateY: entryHeaderTranslateY }] }
            ]}>
              <SectionHeader 
                title="My Closet" 
                subtitle={`${GARMENTS_DATA.length} items catalogued`}
                style={styles.headerFlexOverride}
              />
              <PremiumTouchable style={styles.actionAddButton} onPress={() => console.log('Add Item')}>
                <Feather name="plus" size={22} color="#FAFAF9" />
              </PremiumTouchable>
            </Animated.View>

            {/* Global Input Controller Framework */}
            <Animated.View style={[
              styles.searchContainer,
              { opacity: searchBarOpacity, transform: [{ translateY: searchBarTranslateY }] }
            ]}>
              <Feather name="search" size={18} color="#78716C" style={styles.searchIcon} />
              <TextInput
                placeholder="Search your wardrobe..."
                placeholderTextColor="#78716C"
                style={styles.textInput}
                value={searchQuery}
                onChangeText={setSearchQuery}
              />
              <PremiumTouchable style={styles.filterButton} onPress={() => console.log('Filter')}>
                <MaterialCommunityIcons name="filter-variant" size={20} color="#1C1917" />
              </PremiumTouchable>
            </Animated.View>

            {/* Horizontal Filter Row Layout */}
            <Animated.View style={[
              styles.categoryScroller,
              { opacity: filtersOpacity, transform: [{ translateY: filtersTranslateY }] }
            ]}>
              <FlatList
                horizontal
                data={CATEGORIES}
                keyExtractor={(item) => item.id}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.categoriesContent}
                renderItem={({ item }) => {
                  const isActive = activeCategory === item.id;
                  return (
                    <PremiumTouchable
                      onPress={() => setActiveCategory(item.id)}
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
                    </PremiumTouchable>
                  );
                }}
              />
            </Animated.View>
          </View>
        }
        ListEmptyComponent={
          <Animated.View style={[
            styles.emptyStateContainer, 
            { opacity: emptyOpacityAnim, transform: [{ scale: emptyScaleAnim }] }
          ]}>
            <View style={styles.emptyIconCircle}>
              <MaterialCommunityIcons name="hanger" size={28} color="#78716C" />
            </View>
            <Text style={styles.emptyStateTitle}>No pieces match</Text>
            <Text style={styles.emptyStateSubtitle}>
              Try re-adjusting your active text queries or structural tags.
            </Text>
          </Animated.View>
        }
      />
    </PremiumScreen>
  );
}

const styles = StyleSheet.create({
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
    alignItems: 'flex-start',
    paddingVertical: 16,
  },
  headerFlexOverride: {
    flex: 1,
    paddingVertical: 0,
  },
  actionAddButton: {
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
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F4',
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
    borderColor: '#E7E5E4',
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
    padding: 0,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 3,
    elevation: 1,
  },
  imageWrapper: {
    width: '100%',
    height: CARD_WIDTH * 1.28,
    backgroundColor: '#F5F5F4',
    position: 'relative',
  },
  imageGarmentImage: {
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
    fontWeight: '400',
    color: '#1C1917',
    marginBottom: 8,
  },
  rowMetadata: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
  emptyStateContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 64,
    paddingHorizontal: 32,
  },
  emptyIconCircle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#F5F5F4',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  emptyStateTitle: {
    fontSize: 15,
    fontWeight: '500',
    color: '#1C1917',
    marginBottom: 6,
  },
  emptyStateSubtitle: {
    fontSize: 13,
    color: '#78716C',
    textAlign: 'center',
    lineHeight: 18,
  },
});