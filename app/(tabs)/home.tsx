import React, { useState } from 'react';
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
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

// Precise mapping of static assets and parameters from Figma React design code
const OCCASIONS = [
  { id: 1, label: 'All', active: true },
  { id: 2, label: 'Casual' },
  { id: 3, label: 'Work' },
  { id: 4, label: 'Party' },
  { id: 5, label: 'Sport' },
];

const RECOMMENDATIONS = [
  {
    id: 1,
    title: 'Summer Breeze',
    occasion: 'Casual',
    items: 4,
    likes: 234,
    image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=400&h=600&fit=crop',
  },
  {
    id: 2,
    title: 'Office Ready',
    occasion: 'Work',
    items: 3,
    likes: 189,
    image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400&h=600&fit=crop',
  },
];

const TRENDING_ITEMS = [
  { id: 1, name: 'Oversized Blazer', category: 'Trending' },
  { id: 2, name: 'Wide Leg Jeans', category: 'Popular' },
  { id: 3, name: 'Knit Cardigan', category: 'New' },
];

export default function HomeScreen() {
  const [activeOccasion, setActiveOccasion] = useState('All');

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        
        {/* Header Block Frame Layout */}
        <View style={styles.headerContainer}>
          <View style={styles.headerTop}>
            <View>
              <Text style={styles.title}>Good Morning</Text>
              <Text style={styles.subtitle}>Ready to style your day?</Text>
            </View>
            <TouchableOpacity style={styles.iconButton} activeOpacity={0.7}>
              <MaterialCommunityIcons name="sparkles" size={24} color="#1C1917" />
            </TouchableOpacity>
          </View>

          {/* Horizontal Badges Scroll Area */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.occasionsScroll}
          >
            {OCCASIONS.map((occasion) => {
              const isActive = activeOccasion === occasion.label;
              return (
                <TouchableOpacity
                  key={occasion.id}
                  onPress={() => setActiveOccasion(occasion.label)}
                  activeOpacity={0.8}
                  style={[
                    styles.badge,
                    isActive ? styles.badgeActive : styles.badgeInactive,
                  ]}
                >
                  <Text style={[styles.badgeText, isActive && styles.badgeTextActive]}>
                    {occasion.label}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>

        {/* Section Structure: Recommendations Grid */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recommended for You</Text>
            <TouchableOpacity activeOpacity={0.6}>
              <Text style={styles.seeAllButton}>See all</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.cardsStack}>
            {RECOMMENDATIONS.map((outfit) => (
              <View key={outfit.id} style={styles.outfitCard}>
                <View style={styles.imageWrapper}>
                  <Image source={{ uri: outfit.image }} style={styles.cardImage} />
                  
                  {/* Aspect Badge Absolute Placement Frame */}
                  <View style={styles.cardTag}>
                    <Text style={styles.cardTagText}>{outfit.occasion}</Text>
                  </View>

                  <View style={styles.actionsContainer}>
                    <TouchableOpacity style={styles.floatingActionButton} activeOpacity={0.8}>
                      <Ionicons name="heart-outline" size={18} color="#1C1917" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.floatingActionButton} activeOpacity={0.8}>
                      <Ionicons name="share-social-outline" size={18} color="#1C1917" />
                    </TouchableOpacity>
                  </View>
                </View>

                {/* Sub-Card Content Details Label Setup */}
                <View style={styles.cardDetails}>
                  <Text style={styles.cardTitle}>{outfit.title}</Text>
                  <View style={styles.cardMetadataRow}>
                    <Text style={styles.metadataText}>{outfit.items} items</Text>
                    <View style={styles.likesWrapper}>
                      <Ionicons name="heart-outline" size={14} color="#78716C" style={styles.heartIcon} />
                      <Text style={styles.metadataText}>{outfit.likes}</Text>
                    </View>
                  </View>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Section Structure: Editorial Tip Callout Banner */}
        <View style={styles.section}>
          <TouchableOpacity style={styles.bannerCard} activeOpacity={0.9}>
            <View style={styles.bannerContent}>
              <View style={styles.bannerTextContainer}>
                <View style={styles.bannerHeaderRow}>
                  <Ionicons name="bulb-outline" size={20} color="#FAFAF9" style={styles.bannerHeaderIcon} />
                  <Text style={styles.bannerTitle}>Style Tips & Trends</Text>
                </View>
                <Text style={styles.bannerSubtitle}>
                  Discover the latest fashion advice and styling guides
                </Text>
              </View>
              <MaterialCommunityIcons name="sparkles" size={26} color="#FAFAF9" style={styles.bannerSparkle} />
            </View>
          </TouchableOpacity>
        </View>

        {/* Section Structure: Trending Elements Shelf Grid */}
        <View style={styles.section}>
          <View style={styles.trendingHeaderRow}>
            <MaterialCommunityIcons name="trending-up" size={22} color="#1C1917" style={styles.trendingTitleIcon} />
            <Text style={styles.sectionTitle}>Trending Now</Text>
          </View>

          <View style={styles.trendingGrid}>
            {TRENDING_ITEMS.map((item) => (
              <View key={item.id} style={styles.trendingMiniCard}>
                <View style={styles.miniCardIconWrapper}>
                  <MaterialCommunityIcons name="sparkles" size={22} color="#78716C" />
                </View>
                <Text style={styles.miniCardName} numberOfLines={1}>
                  {item.name}
                </Text>
                <View style={styles.miniCardBadge}>
                  <Text style={styles.miniCardBadgeText}>{item.category}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAF9', // Derived token setup matching --background configuration variable
  },
  scrollContent: {
    paddingBottom: 40,
  },
  headerContainer: {
    backgroundColor: '#FAFAF9',
    borderBottomWidth: 1,
    borderColor: '#E7E5E4', // Derived from token value --border matching system guidelines
    paddingBottom: 16,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 16,
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: '300', // Matches tracking font-light token specification exactly
    color: '#1C1917',
    letterSpacing: 0.5,
  },
  subtitle: {
    fontSize: 14,
    color: '#78716C', // System configuration code mapping to --muted-foreground 
    marginTop: 2,
  },
  iconButton: {
    padding: 4,
  },
  occasionsScroll: {
    paddingHorizontal: 24,
    gap: 8,
  },
  badge: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 24, // Consistent design framework styling variables
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
  },
  badgeActive: {
    backgroundColor: '#1C1917', // Linked identifier setup matching structural palette
    borderColor: '#1C1917',
  },
  badgeInactive: {
    backgroundColor: 'transparent',
    borderColor: '#E7E5E4',
  },
  badgeText: {
    fontSize: 13,
    fontWeight: '500',
    color: '#1C1917',
  },
  badgeTextActive: {
    color: '#FAFAF9',
  },
  section: {
    paddingHorizontal: 24,
    marginTop: 28,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '500',
    color: '#1C1917',
  },
  seeAllButton: {
    fontSize: 14,
    color: '#1C1917',
    fontWeight: '400',
  },
  cardsStack: {
    gap: 16,
  },
  outfitCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#E7E5E4',
  },
  imageWrapper: {
    width: '100%',
    height: (width - 48) * 1.33, // High precision mathematical translation of aspect-[3/4] grid configuration properties
    backgroundColor: '#F5F5F4',
    position: 'relative',
  },
  cardImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  cardTag: {
    position: 'absolute',
    top: 12,
    left: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  cardTagText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#1C1917',
  },
  actionsContainer: {
    position: 'absolute',
    top: 12,
    right: 12,
    flexDirection: 'row',
    gap: 8,
  },
  floatingActionButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardDetails: {
    padding: 16,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1C1917',
    marginBottom: 4,
  },
  cardMetadataRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  metadataText: {
    fontSize: 14,
    color: '#78716C',
  },
  likesWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  heartIcon: {
    marginRight: 4,
  },
  bannerCard: {
    backgroundColor: '#1C1917',
    borderRadius: 16,
    padding: 24,
  },
  bannerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  bannerTextContainer: {
    flex: 1,
    paddingRight: 8,
  },
  bannerHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  bannerHeaderIcon: {
    marginRight: 8,
  },
  bannerTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#FAFAF9',
  },
  bannerSubtitle: {
    fontSize: 14,
    color: '#FAFAF9',
    opacity: 0.9,
    lineHeight: 20,
  },
  bannerSparkle: {
    opacity: 0.5,
  },
  trendingHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  trendingTitleIcon: {
    marginRight: 8,
  },
  trendingGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  trendingMiniCard: {
    flex: 1,
    backgroundColor: '#F5F5F4',
    borderRadius: 16,
    padding: 12,
    alignItems: 'center',
  },
  miniCardIconWrapper: {
    width: '100%',
    aspectRatio: 1,
    backgroundColor: '#E7E5E4',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  miniCardName: {
    fontSize: 12,
    fontWeight: '500',
    color: '#1C1917',
    marginBottom: 6,
    textAlign: 'center',
  },
  miniCardBadge: {
    borderWidth: 1,
    borderColor: '#E7E5E4',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
  },
  miniCardBadgeText: {
    fontSize: 10,
    color: '#78716C',
    fontWeight: '500',
  },
});