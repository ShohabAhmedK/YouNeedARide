import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { colors } from '../../../theme/colors';
import { fontFamily, fontSize } from '../../../theme/typography';
import { radius } from '../../../theme/spacing';

interface LoyaltyRewardCardProps {
  rideCount: number;
  onPress?: () => void;
}

const TIERS = [
  { name: 'Bronze', min: 0 },
  { name: 'Silver', min: 25 },
  { name: 'Gold', min: 50 },
  { name: 'Platinum', min: 100 },
  { name: 'Diamond', min: 150 },
];

export const LoyaltyRewardCard: React.FC<LoyaltyRewardCardProps> = ({ rideCount, onPress }) => {
  const tierIndex = TIERS.reduce((acc, tier, i) => (rideCount >= tier.min ? i : acc), 0);
  const currentTier = TIERS[tierIndex];
  const nextTier = TIERS[tierIndex + 1];
  const progress = nextTier
    ? (rideCount - currentTier.min) / (nextTier.min - currentTier.min)
    : 1;

  return (
    <TouchableOpacity style={styles.card} onPress={onPress} disabled={!onPress} accessibilityLabel="Reward points">
      <View style={styles.headerRow}>
        <Icon name="emoji-events" size={wp('5.5%')} color={colors.primary} />
        <Text style={styles.title}>Reward Points</Text>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{currentTier.name}</Text>
        </View>
        <View style={styles.spacer} />
        <Text style={styles.count}>
          {rideCount}
          <Text style={styles.countTotal}> /{nextTier ? nextTier.min : currentTier.min}</Text>
        </Text>
      </View>
      <View style={styles.track}>
        <View style={[styles.fill, { width: `${Math.min(progress, 1) * 100}%` }]} />
      </View>
      <View style={styles.footerRow}>
        <View style={styles.stars}>
          {TIERS.map((_, i) => (
            <Icon
              key={i}
              name={i <= tierIndex ? 'star' : 'star-border'}
              size={wp('4.2%')}
              color={i <= tierIndex ? colors.primary : colors.border}
              style={styles.star}
            />
          ))}
        </View>
        {nextTier ? (
          <View style={styles.nextRow}>
            <Text style={styles.nextText}>{nextTier.min - rideCount} rides to {nextTier.name}</Text>
            <Icon name="chevron-right" size={wp('4.5%')} color={colors.textSecondary} />
          </View>
        ) : null}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    borderWidth: 1.5,
    borderColor: colors.primary,
    borderRadius: radius.lg,
    backgroundColor: colors.white,
    padding: wp('4%'),
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontFamily: fontFamily.semiBold,
    fontSize: fontSize.md,
    color: colors.textPrimary,
    marginLeft: wp('2%'),
  },
  badge: {
    backgroundColor: colors.primaryLight,
    borderRadius: radius.round,
    paddingHorizontal: wp('2.5%'),
    paddingVertical: hp('0.3%'),
    marginLeft: wp('2%'),
  },
  badgeText: {
    fontFamily: fontFamily.semiBold,
    fontSize: fontSize.xs,
    color: colors.primaryDark,
  },
  spacer: {
    flex: 1,
  },
  count: {
    fontFamily: fontFamily.bold,
    fontSize: fontSize.lg,
    color: colors.textPrimary,
  },
  countTotal: {
    fontFamily: fontFamily.regular,
    fontSize: fontSize.sm,
    color: colors.textSecondary,
  },
  track: {
    height: hp('1%'),
    backgroundColor: colors.border,
    borderRadius: radius.round,
    overflow: 'hidden',
    marginTop: hp('1.5%'),
  },
  fill: {
    height: '100%',
    backgroundColor: colors.primary,
    borderRadius: radius.round,
  },
  footerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: hp('1.2%'),
  },
  stars: {
    flexDirection: 'row',
  },
  star: {
    marginRight: wp('0.5%'),
  },
  nextRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  nextText: {
    fontFamily: fontFamily.regular,
    fontSize: fontSize.sm,
    color: colors.textSecondary,
  },
});
