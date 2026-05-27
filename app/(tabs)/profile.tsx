import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  Switch,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { PremiumScreen } from '../../components/ui/PremiumScreen';
import { SectionHeader } from '../../components/ui/SectionHeader';
import { SectionTitle } from '../../components/ui/SectionTitle';

const { width } = Dimensions.get('window');

// Mock data strictly matching the schema and text metrics of the Figma model export
const STATS = [
  { id: 1, label: 'Garments', value: '48', icon: 'hanger' },
  { id: 2, label: 'Outfits', value: '23', icon: 'sparkles' },
  { id: 3, label: 'This Week', value: '7', icon: 'calendar-blank' },
];

const STYLE_PREFERENCES = ['Minimalist', 'Casual', 'Elegant', 'Street Style'];

const MENU_SECTIONS = [
  {
    title: 'Preferences',
    items: [
      { id: 1, label: 'Style Quiz', icon: 'sparkles', type: 'chevron' },
      { id: 2, label: 'Notifications', icon: 'bell-outline', type: 'chevron' },
      { id: 3, label: 'Dark Mode', icon: 'moon-waning-crescent', type: 'toggle' },
    ],
  },
  {
    title: 'My Activity',
    items: [
      { id: 4, label: 'Favorites', icon: 'heart-outline', type: 'chevron', badge: '12' },
      { id: 5, label: 'Sharing History', icon: 'share-variant-outline', type: 'chevron' },
    ],
  },
  {
    title: 'Support',
    items: [
      { id: 6, label: 'Help & Feedback', icon: 'help-circle-outline', type: 'chevron' },
      { id: 7, label: 'Log Out', icon: 'logout', type: 'action', danger: true },
    ],
  },
];

export default function ProfileScreen() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  return (
    <PremiumScreen>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        
        {/* Header Block Frame Layout */}
        <View style={styles.headerRow}>
          <SectionHeader 
            title="Profile" 
            style={styles.headerFlexOverride}
          />
          <TouchableOpacity style={styles.settingsIconButton} activeOpacity={0.7}>
            <Ionicons name="settings-outline" size={22} color="#1C1917" />
          </TouchableOpacity>
        </View>

        {/* User Card Identity Layout Block */}
        <View style={styles.profileHero}>
          <Image
            source={{ uri: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop' }}
            style={styles.avatarImage}
          />
          <Text style={styles.profileName}>Sarah Jenkins</Text>
          <Text style={styles.profileEmail}>sarah.jenkins@stylesync.app</Text>
        </View>

        {/* Stats Shelf Layout Framework */}
        <View style={styles.statsRowGrid}>
          {STATS.map((stat) => (
            <View key={stat.id} style={styles.statMiniCard}>
              <MaterialCommunityIcons name={stat.icon as any} size={20} color="#78716C" style={styles.statIcon} />
              <Text style={styles.statValueText}>{stat.value}</Text>
              <Text style={styles.statLabelText}>{stat.label}</Text>
            </View>
          ))}
        </View>

        {/* Style Tag Preferences Layout Section */}
        <View style={styles.sectionBlock}>
          <SectionTitle withBottomMargin>Style Preferences</SectionTitle>
          <View style={styles.tagsContainerRow}>
            {STYLE_PREFERENCES.map((preference, index) => (
              <View key={index} style={styles.preferenceTagBadge}>
                <Text style={styles.preferenceTagText}>{preference}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Options List Group Navigation Menus */}
        {MENU_SECTIONS.map((section, sectionIdx) => (
          <View key={sectionIdx} style={styles.sectionBlock}>
            <SectionTitle withBottomMargin>{section.title}</SectionTitle>
            <View style={styles.menuGroupCard}>
              {section.items.map((item, itemIdx) => {
                const isLastItem = itemIdx === section.items.length - 1;
                return (
                  <View key={item.id}>
                    <TouchableOpacity
                      activeOpacity={item.type === 'toggle' ? 1 : 0.7}
                      style={styles.menuRowItem}
                    >
                      <View style={styles.menuRowLeftBlock}>
                        <MaterialCommunityIcons
                          name={item.icon as any}
                          size={20}
                          color={item.danger ? '#DC2626' : '#78716C'}
                          style={styles.menuItemIcon}
                        />
                        <Text style={[styles.menuItemLabel, item.danger && styles.dangerItemLabel]}>
                          {item.label}
                        </Text>
                        {item.badge && (
                          <View style={styles.counterBadge}>
                            <Text style={styles.counterBadgeText}>{item.badge}</Text>
                          </View>
                        )}
                      </View>

                      {item.type === 'toggle' && (
                        <Switch
                          value={isDarkMode}
                          onValueChange={setIsDarkMode}
                          trackColor={{ false: '#D6D3D1', true: '#1C1917' }}
                          thumbColor="#FFFFFF"
                          ios_backgroundColor="#D6D3D1"
                        />
                      )}

                      {item.type === 'chevron' && (
                        <Ionicons name="chevron-forward" size={18} color="#78716C" />
                      )}
                    </TouchableOpacity>
                    {!isLastItem && <View style={styles.rowDividerSeparator} />}
                  </View>
                );
              })}
            </View>
          </View>
        ))}

        {/* Continuous App Platform Brand Footer Layout */}
        <View style={styles.appFooterDetailsContainer}>
          <Text style={styles.footerBrandText}>VYRA v1.0.0</Text>
          <Text style={styles.footerSecondaryText}>Made with love for fashion lovers</Text>
        </View>

      </ScrollView>
    </PremiumScreen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAF9',
  },
  scrollContent: {
    paddingBottom: 48,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingHorizontal: 16,
    paddingTop: 16,
    marginBottom: 20,
  },
  headerFlexOverride: {
    flex: 1,
    paddingVertical: 0,
  },
  settingsIconButton: {
    padding: 4,
    marginTop: 2,
  },
  profileHero: {
    alignItems: 'center',
    marginBottom: 28,
  },
  avatarImage: {
    width: 88,
    height: 88,
    borderRadius: 44,
    backgroundColor: '#F5F5F4',
    marginBottom: 14,
  },
  profileName: {
    fontSize: 20,
    fontWeight: '500',
    color: '#1C1917',
    marginBottom: 4,
  },
  profileEmail: {
    fontSize: 14,
    color: '#78716C',
  },
  statsRowGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    gap: 12,
    marginBottom: 28,
  },
  statMiniCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    paddingVertical: 14,
    paddingHorizontal: 8,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E7E5E4',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.02,
    shadowRadius: 3,
    elevation: 1,
  },
  statIcon: {
    marginBottom: 6,
  },
  statValueText: {
    fontSize: 18,
    fontWeight: '500',
    color: '#1C1917',
    marginBottom: 2,
  },
  statLabelText: {
    fontSize: 11,
    color: '#78716C',
    fontWeight: '500',
  },
  sectionBlock: {
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  tagsContainerRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  preferenceTagBadge: {
    backgroundColor: '#F5F5F4',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#E7E5E4',
  },
  preferenceTagText: {
    fontSize: 13,
    fontWeight: '500',
    color: '#1C1917',
  },
  menuGroupCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E7E5E4',
    overflow: 'hidden',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.02,
    shadowRadius: 2,
    elevation: 1,
  },
  menuRowItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 14,
    paddingHorizontal: 16,
    height: 52,
  },
  menuRowLeftBlock: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  menuItemIcon: {
    marginRight: 12,
    width: 22,
    textAlign: 'center',
  },
  menuItemLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1C1917',
  },
  dangerItemLabel: {
    color: '#DC2626',
  },
  counterBadge: {
    backgroundColor: '#F5F5F4',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
    marginLeft: 8,
  },
  counterBadgeText: {
    fontSize: 11,
    fontWeight: '500',
    color: '#78716C',
  },
  rowDividerSeparator: {
    height: 1,
    backgroundColor: '#F5F5F4',
    marginLeft: 50,
  },
  appFooterDetailsContainer: {
    marginTop: 16,
    paddingBottom: 12,
    alignItems: 'center',
  },
  footerBrandText: {
    fontSize: 12,
    color: '#78716C',
    fontWeight: '400',
  },
  footerSecondaryText: {
    fontSize: 11,
    color: '#78716C',
    opacity: 0.8,
    marginTop: 4,
  },
});