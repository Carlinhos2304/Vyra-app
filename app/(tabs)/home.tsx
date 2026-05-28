import React, { useState, useEffect, useRef } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  Dimensions,
  Animated,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { PremiumScreen } from '../../components/ui/PremiumScreen';
import { PremiumCard } from '../../components/ui/PremiumCard';
import { PremiumTouchable } from '../../components/ui/PremiumTouchable';
import { SectionHeader } from '../../components/ui/SectionHeader';
import { SectionTitle } from '../../components/ui/SectionTitle'; 
import VyraLogo from '../../components/branding/VyraLogo';

const { width } = Dimensions.get('window');

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
    styleKey: 'Vyra Essentials',
    occasion: 'Casual',
    items: 4,
    likes: 234,
    image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=400&h=600&fit=crop',
  },
  {
    id: 2,
    title: 'Office Ready',
    styleKey: 'Tailored Linear',
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

  // Animation values using standard Refs
  const headerOpacity = useRef(new Animated.Value(0)).current;
  const headerTranslateY = useRef(new Animated.Value(-12)).current;

  const occasionsOpacity = useRef(new Animated.Value(0)).current;
  const occasionsTranslateY = useRef(new Animated.Value(8)).current;

  const recommendationsOpacity = useRef(new Animated.Value(0)).current;
  const recommendationsTranslateY = useRef(new Animated.Value(16)).current;

  const bannerOpacity = useRef(new Animated.Value(0)).current;
  const bannerTranslateX = useRef(new Animated.Value(16)).current;

  const trendingOpacity = useRef(new Animated.Value(0)).current;
  const trendingTranslateY = useRef(new Animated.Value(12)).current;

  useEffect(() => {
    // Premium staggered orchestration sequence
    Animated.stagger(100, [
      // 1. Reveal Header Title Block
      Animated.parallel([
        Animated.timing(headerOpacity, {
          toValue: 1,
          duration: 450,
          useNativeDriver: true,
        }),
        Animated.timing(headerTranslateY, {
          toValue: 0,
          duration: 450,
          useNativeDriver: true,
        }),
      ]),
      // 2. Reveal Horizontal Occasions Shelf
      Animated.parallel([
        Animated.timing(occasionsOpacity, {
          toValue: 1,
          duration: 400,
          useNativeDriver: true,
        }),
        Animated.timing(occasionsTranslateY, {
          toValue: 0,
          duration: 400,
          useNativeDriver: true,
        }),
      ]),
      // 3. Reveal Curated Outfits Stack
      Animated.parallel([
        Animated.timing(recommendationsOpacity, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(recommendationsTranslateY, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }),
      ]),
      // 4. Slide In Trend Banner
      Animated.parallel([
        Animated.timing(bannerOpacity, {
          toValue: 1,
          duration: 450,
          useNativeDriver: true,
        }),
        Animated.timing(bannerTranslateX, {
          toValue: 0,
          duration: 450,
          useNativeDriver: true,
        }),
      ]),
      // 5. Rise Trending Essentials Matrix
      Animated.parallel([
        Animated.timing(trendingOpacity, {
          toValue: 1,
          duration: 400,
          useNativeDriver: true,
        }),
        Animated.timing(trendingTranslateY, {
          toValue: 0,
          duration: 400,
          useNativeDriver: true,
        }),
      ]),
    ]).start();
  }, []);

  return (
    <PremiumScreen>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        
        {/* Header Block Frame Layout */}
        <Animated.View style={[
          styles.headerContainer, 
          { opacity: headerOpacity, transform: [{ translateY: headerTranslateY }] }
        ]}>
          <View style={styles.headerTop}>
            <View>
              <Text style={styles.title}>Good Morning</Text>
              <Text style={styles.subtitle}>Ready to style your day?</Text>
            </View>
            <PremiumTouchable style={styles.iconButton} onPress={() => console.log('Logo Press')}>
              <VyraLogo/>
            </PremiumTouchable>
          </View>

          {/* Horizontal Badges Scroll Area */}
          <Animated.View style={{ opacity: occasionsOpacity, transform: [{ translateY: occasionsTranslateY }] }}>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.occasionsScroll}
            >
              {OCCASIONS.map((occasion) => {
                const isActive = activeOccasion === occasion.label;
                return (
                  <PremiumTouchable
                    key={occasion.id}
                    onPress={() => setActiveOccasion(occasion.label)}
                    style={[
                      styles.badge,
                      isActive ? styles.badgeActive : styles.badgeInactive,
                    ]}
                  >
                    <Text style={[styles.badgeText, isActive && styles.badgeTextActive]}>
                      {occasion.label}
                    </Text>
                  </PremiumTouchable>
                );
              })}
            </ScrollView>
          </Animated.View>
        </Animated.View>

        {/* Section Structure: Recommendations Grid */}
        <Animated.View style={[
          styles.section, 
          { opacity: recommendationsOpacity, transform: [{ translateY: recommendationsTranslateY }] }
        ]}>
          <View style={styles.sectionHeaderRow}>
            <SectionHeader 
              title="Recommended for You" 
              subtitle="Curated daily based on your preferences"
              style={styles.headerFlexOverride}
            />
            <PremiumTouchable style={styles.seeAllWrapper} onPress={() => console.log('See All')}>
              <Text style={styles.seeAllButton}>See all</Text>
            </PremiumTouchable>
          </View>

          <View style={styles.cardsStack}>
            {RECOMMENDATIONS.map((outfit) => (
              <PremiumCard 
                key={outfit.id} 
                style={styles.outfitCard}
                onPress={() => console.log(`Maps to Outfit: ${outfit.title}`)}
              >
                <View style={styles.imageWrapper}>
                  <Image source={{ uri: outfit.image }} style={styles.cardImage} />
                  
                  {/* Aspect Badge Absolute Placement Frame */}
                  <View style={styles.cardTag}>
                    <Text style={styles.cardTagText}>{outfit.occasion}</Text>
                  </View>

                  <View style={styles.actionsContainer}>
                    <PremiumTouchable style={styles.floatingActionButton} onPress={() => console.log('Like Outfit')}>
                      <Ionicons name="heart-outline" size={18} color="#1C1917" />
                    </PremiumTouchable>
                    <PremiumTouchable style={styles.floatingActionButton} onPress={() => console.log('Share Outfit')}>
                      <Ionicons name="share-social-outline" size={18} color="#1C1917" />
                    </PremiumTouchable>
                  </View>
                </View>

                {/* Sub-Card Content Details Label Setup */}
                <View style={styles.cardDetails}>
                  <SectionTitle withBottomMargin>{outfit.styleKey}</SectionTitle>
                  <Text style={styles.cardTitle}>{outfit.title}</Text>
                  <View style={styles.cardMetadataRow}>
                    <Text style={styles.metadataText}>{outfit.items} items</Text>
                    <View style={styles.likesWrapper}>
                      <Ionicons name="heart-outline" size={14} color="#78716C" style={styles.heartIcon} />
                      <Text style={styles.metadataText}>{outfit.likes}</Text>
                    </View>
                  </View>
                </View>
              </PremiumCard>
            ))}
          </View>
        </Animated.View>

        {/* Section Structure: Editorial Tip Callout Banner */}
        <Animated.View style={[
          styles.section, 
          { opacity: bannerOpacity, transform: [{ translateX: bannerTranslateX }] }
        ]}>
          <PremiumCard style={styles.bannerCard} onPress={() => console.log('Tips Pressed')}>
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
          </PremiumCard>
        </Animated.View>

        {/* Section Structure: Trending Elements Shelf Grid */}
        <Animated.View style={[
          styles.section, 
          { opacity: trendingOpacity, transform: [{ translateY: trendingTranslateY }] }
        ]}>
          <View style={styles.trendingHeaderRow}>
            <MaterialCommunityIcons name="trending-up" size={16} color="#1C1917" style={styles.trendingTitleIcon} />
            <SectionTitle style={styles.headerFlexOverride}>Trending Now</SectionTitle>
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
        </Animated.View>

      </ScrollView>
    </PremiumScreen>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    paddingBottom: 40,
  },
  headerContainer: {
    backgroundColor: '#FAFAF9',
    borderBottomWidth: 1,
    borderColor: '#E7E5E4',
    paddingBottom: 16,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 16,
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: '300',
    color: '#1C1917',
    letterSpacing: 0.5,
  },
  subtitle: {
    fontSize: 14,
    color: '#78716C',
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
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
  },
  badgeActive: {
    backgroundColor: '#1C1917',
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
    paddingHorizontal: 16,
    marginTop: 24,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  headerFlexOverride: {
    flex: 1,
    paddingVertical: 0,
  },
  seeAllWrapper: {
    paddingLeft: 12,
    paddingTop: 2, 
  },
  seeAllButton: {
    fontSize: 12,
    color: '#1C1917',
    fontWeight: '500',
    letterSpacing: 0.5,
    textTransform: 'uppercase',
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
    width: '100%',
  },
  imageWrapper: {
    width: '100%',
    height: (width - 48) * 1.33,
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
    zIndex: 2,
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
    zIndex: 2,
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
    fontWeight: '400',
    color: '#1C1917',
    marginBottom: 6,
  },
  cardMetadataRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  metadataText: {
    fontSize: 13,
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
    borderWidth: 0,
    width: '100%',
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
    marginBottom: 14,
  },
  trendingTitleIcon: {
    marginRight: 6,
    color: '#1C1917',
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
    borderWidth: 0,
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