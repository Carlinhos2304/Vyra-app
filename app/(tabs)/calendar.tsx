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
const CALENDAR_DAY_WIDTH = (width - 48 - 36) / 7; // Precise layout alignment for the 7-day grid system

// Authentic mock data structure extracted and mapped from the source Figma component configuration code
const WEEK_DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

const DAYS_DATA = [
  { id: '1', date: '20', label: 'Mon', active: true, planned: true },
  { id: '2', date: '21', label: 'Tue', active: false, planned: true },
  { id: '3', date: '22', label: 'Wed', active: false, planned: false },
  { id: '4', date: '23', label: 'Thu', active: false, planned: true },
  { id: '5', date: '24', label: 'Fri', active: false, planned: false },
  { id: '6', date: '25', label: 'Sat', active: false, planned: false },
  { id: '7', date: '26', label: 'Sun', active: false, planned: false },
];

const OUTFIT_PLAN = {
  '2024-05-20': {
    outfit: 'Casual Monday',
    image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=300&h=400&fit=crop',
    occasion: 'Work',
  },
};

const UPCOMING_EVENTS = [
  { id: '1', event: 'Product Launch Meeting', date: 'May 21, 2024', suggested: 'Office Ready' },
  { id: '2', event: 'Friday Dinner Date', date: 'May 24, 2024', suggested: 'Weekend Vibes' },
];

export default function CalendarScreen() {
  const [selectedDay, setSelectedDay] = useState('1');

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollLayout}>
        
        {/* Header Infrastructure Framework */}
        <View style={styles.headerStack}>
          <View style={styles.headerTopRow}>
            <View>
              <Text style={styles.titleText}>Outfit Planner</Text>
              <Text style={styles.subtitleText}>May 2024</Text>
            </View>
            <TouchableOpacity style={styles.addButtonCircle} activeOpacity={0.8}>
              <Ionicons name="add" size={24} color="#FAFAF9" />
            </TouchableOpacity>
          </View>

          {/* Horizontal Weekly Navigator Row Grid */}
          <View style={styles.calendarControlStrip}>
            <View style={styles.stripHeader}>
              <Text style={styles.stripLabelText}>This Week</Text>
              <View style={styles.chevronControls}>
                <TouchableOpacity style={styles.chevronInlineButton} activeOpacity={0.6}>
                  <Ionicons name="chevron-back" size={16} color="#1C1917" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.chevronInlineButton} activeOpacity={0.6}>
                  <Ionicons name="chevron-forward" size={16} color="#1C1917" />
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.daysRowLayout}>
              {DAYS_DATA.map((day) => {
                const isSelected = selectedDay === day.id;
                return (
                  <TouchableOpacity
                    key={day.id}
                    onPress={() => setSelectedDay(day.id)}
                    activeOpacity={0.8}
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
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        </View>

        {/* Dynamic Section: Outfit Plan Preview Area */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionHeaderHeading}>Selected Outfit</Text>
          
          {selectedDay === '1' ? (
            <View style={styles.plannedOutfitCard}>
              <View style={styles.cardImageContainer}>
                <Image source={{ uri: OUTFIT_PLAN['2024-05-20'].image }} style={styles.outfitCoverImage} />
              </View>
              <View style={styles.cardDetailsPane}>
                <View style={styles.cardMetadataRow}>
                  <Text style={styles.outfitTitleText}>{OUTFIT_PLAN['2024-05-20'].outfit}</Text>
                  <View style={styles.categoryBadge}>
                    <Text style={styles.categoryBadgeText}>{OUTFIT_PLAN['2024-05-20'].occasion}</Text>
                  </View>
                </View>
                <Text style={styles.cardScheduleTimelineText}>Monday, May 20</Text>
                
                <TouchableOpacity style={styles.inlineActionTextButton} activeOpacity={0.7}>
                  <Text style={styles.actionButtonText}>Modify Plan</Text>
                  <Ionicons name="arrow-forward" size={14} color="#1C1917" style={styles.actionButtonIcon} />
                </TouchableOpacity>
              </View>
            </View>
          ) : (
            <View style={styles.emptyStateCardContainer}>
              <MaterialCommunityIcons name="calendar-blank" size={32} color="#78716C" style={styles.emptyStateIcon} />
              <Text style={styles.emptyStateHeading}>No outfit planned</Text>
              <Text style={styles.emptyStateBodyText}>Tap the add button or assign a wardrobe look to this date slot</Text>
            </View>
          )}
        </View>

        {/* Section Infrastructure: Upcoming Events Stack Frame */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionHeaderHeading}>Upcoming Events</Text>
          <View style={styles.eventsVerticalStackLayout}>
            {UPCOMING_EVENTS.map((event) => (
              <View key={event.id} style={styles.eventRowCard}>
                <View style={styles.eventRowLeftBlock}>
                  <View style={styles.eventAccentBoxContainer}>
                    <MaterialCommunityIcons name="briefcase-outline" size={18} color="#1C1917" />
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
    backgroundColor: '#FAFAF9', // Architectural sync parameters binding to core --background layout rules
  },
  scrollLayout: {
    paddingHorizontal: 24,
    paddingBottom: 32,
  },
  headerStack: {
    marginBottom: 12,
  },
  headerTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
  },
  titleText: {
    fontSize: 24,
    fontWeight: '400', // Premium light-weight typography matching theme architecture setup
    color: '#1C1917',
    letterSpacing: 0.5,
  },
  subtitleText: {
    fontSize: 14,
    color: '#78716C', // System parameter assignment derived from --muted-foreground 
    marginTop: 2,
  },
  addButtonCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#1C1917', // Linked core interface identifier configuration variable
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#1C1917',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
  },
  calendarControlStrip: {
    backgroundColor: '#FFFFFF', // Corresponds systematically with --card layout variables
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
  stripLabelText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1C1917',
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
  sectionHeaderHeading: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1C1917',
    marginBottom: 12,
  },
  plannedOutfitCard: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E7E5E4',
    overflow: 'hidden',
  },
  cardImageContainer: {
    width: 100,
    height: 130, // Precise aspect control system matching aspect-[3/4] configuration guidelines
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
    backgroundColor: '#F5F5F4', // Conforming explicitly with --secondary styling specifications
    borderRadius: 16,
    padding: 14,
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#E7E5E4',
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
    fontWeight: '500',
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