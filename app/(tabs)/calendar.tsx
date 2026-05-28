import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { PremiumScreen } from '../../components/ui/PremiumScreen';
import { PremiumCard } from '../../components/ui/PremiumCard';
import { PremiumTouchable } from '../../components/ui/PremiumTouchable';
import { PremiumButton } from '../../components/ui/PremiumButton';
import { SectionHeader } from '../../components/ui/SectionHeader';
import { SectionTitle } from '../../components/ui/SectionTitle';

const { width } = Dimensions.get('window');
const CALENDAR_DAY_WIDTH = (width - 48 - 36) / 7; // Precise layout alignment for the 7-day grid system

const DAYS_DATA = [
  { id: '1', date: '20', label: 'Mon', active: true, planned: true, fullDate: '2024-05-20', formattedDate: 'Monday, May 20' },
  { id: '2', date: '21', label: 'Tue', active: false, planned: true, fullDate: '2024-05-21', formattedDate: 'Tuesday, May 21' },
  { id: '3', date: '22', label: 'Wed', active: false, planned: false, fullDate: '2024-05-22', formattedDate: 'Wednesday, May 22' },
  { id: '4', date: '23', label: 'Thu', active: false, planned: true, fullDate: '2024-05-23', formattedDate: 'Thursday, May 23' },
  { id: '5', date: '24', label: 'Fri', active: false, planned: false, fullDate: '2024-05-24', formattedDate: 'Friday, May 24' },
  { id: '6', date: '25', label: 'Sat', active: false, planned: false, fullDate: '2024-05-25', formattedDate: 'Saturday, May 25' },
  { id: '7', date: '26', label: 'Sun', active: false, planned: false, fullDate: '2024-05-26', formattedDate: 'Sunday, May 26' },
];

const OUTFIT_PLANS: Record<string, { outfit: string; image: string; occasion: string }> = {
  '2024-05-20': {
    outfit: 'Casual Monday',
    image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=300&h=400&fit=crop',
    occasion: 'Work',
  },
  '2024-05-21': {
    outfit: 'Office Ready',
    image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=300&h=400&fit=crop',
    occasion: 'Meeting',
  },
  '2024-05-23': {
    outfit: 'Classic Denim',
    image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=300&h=400&fit=crop',
    occasion: 'Casual',
  },
};

const UPCOMING_EVENTS = [
  { id: '1', event: 'Product Launch Meeting', date: 'May 21, 2024', suggested: 'Office Ready', icon: 'briefcase-outline' },
  { id: '2', event: 'Friday Dinner Date', date: 'May 24, 2024', suggested: 'Weekend Vibes', icon: 'silverware-fork-knife' },
];

export default function CalendarScreen() {
  const [selectedDayId, setSelectedDayId] = useState('1');

  // Find metadata for current tracking slice
  const activeDayMeta = DAYS_DATA.find((d) => d.id === selectedDayId) || DAYS_DATA[0];
  const activePlan = OUTFIT_PLANS[activeDayMeta.fullDate];

  return (
    <PremiumScreen>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollLayout}>
        
        {/* Header Infrastructure Framework */}
        <View style={styles.headerStack}>
          <View style={styles.headerTopRow}>
            <SectionHeader
              title="Outfit Planner"
              subtitle="May 2024"
              style={styles.headerFlexOverride}
            />
            <PremiumTouchable style={styles.addButtonCircle} onPress={() => console.log('Create Plan Press', activeDayMeta.fullDate)}>
              <Ionicons name="add" size={24} color="#FAFAF9" />
            </PremiumTouchable>
          </View>

          {/* Horizontal Weekly Navigator Row Grid */}
          <View style={styles.calendarControlStrip}>
            <View style={styles.stripHeader}>
              <SectionTitle>This Week</SectionTitle>
              <View style={styles.chevronControls}>
                <PremiumTouchable style={styles.chevronInlineButton} onPress={() => console.log('Prev Week')}>
                  <Ionicons name="chevron-back" size={16} color="#1C1917" />
                </PremiumTouchable>
                <PremiumTouchable style={styles.chevronInlineButton} onPress={() => console.log('Next Week')}>
                  <Ionicons name="chevron-forward" size={16} color="#1C1917" />
                </PremiumTouchable>
              </View>
            </View>

            <View style={styles.daysRowLayout}>
              {DAYS_DATA.map((day) => {
                const isSelected = selectedDayId === day.id;
                return (
                  <PremiumTouchable
                    key={day.id}
                    onPress={() => setSelectedDayId(day.id)}
                    style={[
                      styles.dayGridCell,
                      isSelected ? styles.cellActive : styles.cellInactive,
                    ]}
                  >
                    <Text style={[styles.cellDayName, isSelected && styles.textActive]}>
                      {day.label}
                    </Text>
                    <Text style={[styles.cellDateValue, isSelected && styles.textActive]}>
                      {day.date}
                    </Text>
                    {day.planned && (
                      <View style={[styles.indicatorDot, isSelected ? styles.dotActive : styles.dotInactive]} />
                    )}
                  </PremiumTouchable>
                );
              })}
            </View>
          </View>
        </View>

        {/* Dynamic Section: Outfit Plan Preview Area */}
        <View style={styles.sectionContainer}>
          <SectionTitle withBottomMargin>Selected Outfit</SectionTitle>
          
          {activePlan ? (
            <PremiumCard style={styles.plannedOutfitCard} onPress={() => console.log('View Outfit Deep Link', activePlan.outfit)}>
              <View style={styles.cardImageContainer}>
                <Image source={{ uri: activePlan.image }} style={styles.outfitCoverImage} />
              </View>
              <View style={styles.cardDetailsPane}>
                <View style={styles.cardMetadataRow}>
                  <Text style={styles.outfitTitleText} numberOfLines={1}>
                    {activePlan.outfit}
                  </Text>
                  <View style={styles.categoryBadge}>
                    <Text style={styles.categoryBadgeText}>{activePlan.occasion}</Text>
                  </View>
                </View>
                <Text style={styles.cardScheduleTimelineText}>{activeDayMeta.formattedDate}</Text>
                
                <PremiumTouchable style={styles.inlineActionTextButton} onPress={() => console.log('Modify Plan Press', activeDayMeta.fullDate)}>
                  <Text style={styles.actionButtonText}>Modify Plan</Text>
                  <Ionicons name="arrow-forward" size={14} color="#1C1917" style={styles.actionButtonIcon} />
                </PremiumTouchable>
              </View>
            </PremiumCard>
          ) : (
            <View style={styles.emptyStateCardContainer}>
              <MaterialCommunityIcons name="calendar-blank" size={32} color="#78716C" style={styles.emptyStateIcon} />
              <Text style={styles.emptyStateHeading}>No outfit planned</Text>
              <Text style={styles.emptyStateBodyText}>
                Tap the add button or assign a wardrobe look to {activeDayMeta.label}, {activeDayMeta.date}
              </Text>
            </View>
          )}
        </View>

        {/* Section Infrastructure: Upcoming Events Stack Frame */}
        <View style={styles.sectionContainer}>
          <SectionTitle withBottomMargin>Upcoming Events</SectionTitle>
          <View style={styles.eventsVerticalStackLayout}>
            {UPCOMING_EVENTS.map((event) => (
              <PremiumCard 
                key={event.id} 
                style={styles.eventRowCard}
                onPress={() => console.log(`Event Context: ${event.event}`)}
              >
                <View style={styles.eventRowLeftBlock}>
                  <View style={styles.eventAccentBoxContainer}>
                    <MaterialCommunityIcons name={event.icon as any} size={18} color="#1C1917" />
                  </View>
                  <View style={styles.eventMetaTextBlock}>
                    <Text style={styles.eventNameMainText} numberOfLines={1}>
                      {event.event}
                    </Text>
                    <Text style={styles.eventDateSubText}>{event.date}</Text>
                  </View>
                </View>
                <View style={styles.suggestionTagBadge}>
                  <Text style={styles.suggestionTagText}>{event.suggested}</Text>
                </View>
              </PremiumCard>
            ))}
          </View>
        </View>

      </ScrollView>
    </PremiumScreen>
  );
}

const styles = StyleSheet.create({
  scrollLayout: {
    paddingHorizontal: 16,
    paddingBottom: 32,
  },
  headerStack: {
    marginBottom: 12,
  },
  headerTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingVertical: 16,
  },
  headerFlexOverride: {
    flex: 1,
    paddingVertical: 0,
  },
  addButtonCircle: {
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
  calendarControlStrip: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#E7E5E4',
    padding: 16,
    marginTop: 12,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.02,
    shadowRadius: 3,
    elevation: 1,
  },
  stripHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },
  chevronControls: {
    flexDirection: 'row',
    gap: 4,
  },
  chevronInlineButton: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#F5F5F4',
    justifyContent: 'center',
    alignItems: 'center',
  },
  daysRowLayout: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dayGridCell: {
    width: CALENDAR_DAY_WIDTH,
    paddingVertical: 10,
    borderRadius: 12,
    alignItems: 'center',
    position: 'relative',
  },
  cellActive: {
    backgroundColor: '#1C1917',
  },
  cellInactive: {
    backgroundColor: 'transparent',
  },
  cellDayName: {
    fontSize: 11,
    fontWeight: '500',
    color: '#78716C',
    marginBottom: 4,
  },
  cellDateValue: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1C1917',
  },
  textActive: {
    color: '#FAFAF9',
  },
  indicatorDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    position: 'absolute',
    bottom: 6,
  },
  dotActive: {
    backgroundColor: '#FAFAF9',
  },
  dotInactive: {
    backgroundColor: '#1C1917',
  },
  sectionContainer: {
    marginTop: 24,
  },
  plannedOutfitCard: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E7E5E4',
    overflow: 'hidden',
    padding: 0,
    width: '100%',
  },
  cardImageContainer: {
    width: 100,
    height: 130,
    backgroundColor: '#F5F5F4',
  },
  outfitCoverImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  cardDetailsPane: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
  },
  cardMetadataRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  outfitTitleText: {
    fontSize: 15,
    fontWeight: '500',
    color: '#1C1917',
    flex: 1,
    marginRight: 8,
  },
  categoryBadge: {
    borderWidth: 1,
    borderColor: '#E7E5E4',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
    backgroundColor: '#FAFAF9',
  },
  categoryBadgeText: {
    fontSize: 10,
    fontWeight: '500',
    color: '#78716C',
  },
  cardScheduleTimelineText: {
    fontSize: 13,
    color: '#78716C',
    marginBottom: 16,
  },
  inlineActionTextButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 2,
  },
  actionButtonText: {
    fontSize: 13,
    fontWeight: '500',
    color: '#1C1917',
  },
  actionButtonIcon: {
    marginLeft: 4,
  },
  emptyStateCardContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E7E5E4',
    borderStyle: 'dashed',
    padding: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyStateIcon: {
    marginBottom: 8,
    opacity: 0.6,
  },
  emptyStateHeading: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1C1917',
    marginBottom: 4,
  },
  emptyStateBodyText: {
    fontSize: 12,
    color: '#78716C',
    textAlign: 'center',
    lineHeight: 16,
    paddingHorizontal: 16,
  },
  eventsVerticalStackLayout: {
    gap: 10,
  },
  eventRowCard: {
    flexDirection: 'row',
    backgroundColor: '#F5F5F4',
    borderRadius: 16,
    padding: 14,
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#E7E5E4',
    width: '100%',
  },
  eventRowLeftBlock: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    paddingRight: 12,
  },
  eventAccentBoxContainer: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: '#E7E5E4',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  eventMetaTextBlock: {
    flex: 1,
  },
  eventNameMainText: {
    fontSize: 14,
    fontWeight: '400',
    color: '#1C1917',
    marginBottom: 2,
  },
  eventDateSubText: {
    fontSize: 12,
    color: '#78716C',
  },
  suggestionTagBadge: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E7E5E4',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  suggestionTagText: {
    fontSize: 11,
    fontWeight: '500',
    color: '#78716C',
  },
});