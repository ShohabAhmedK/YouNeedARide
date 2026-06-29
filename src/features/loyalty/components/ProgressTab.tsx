import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Button } from '../../../components/Button';
import { colors } from '../../../theme/colors';
import { fontFamily, fontSize } from '../../../theme/typography';
import { radius } from '../../../theme/spacing';

interface ProgressTabProps {
  rideCount: number;
  target: number;
  milestone1Target: number;
  milestone2Target: number;
  canClaimMilestone1: boolean;
  onClaim: () => void;
  claiming: boolean;
}

export const ProgressTab: React.FC<ProgressTabProps> = ({
  rideCount,
  target,
  milestone1Target,
  milestone2Target,
  canClaimMilestone1,
  onClaim,
  claiming,
}) => {
  const ridesToNext = Math.max(target - rideCount, 0);
  const segment1Progress = Math.min(rideCount / milestone1Target, 1);
  const segment2Progress = Math.min(Math.max(rideCount - milestone1Target, 0) / (milestone2Target - milestone1Target), 1);
  const milestone1Reached = rideCount >= milestone1Target;
  const milestone2Reached = rideCount >= milestone2Target;

  return (
    <View style={styles.container}>
      <View style={styles.progressCard}>
        <View style={styles.topRow}>
          <View>
            <Text style={styles.cycleLabel}>Cycle 1 · Current Progress</Text>
            <View style={styles.countRow}>
              <Text style={styles.countValue}>{rideCount}</Text>
              <Text style={styles.countTarget}> /{target}</Text>
            </View>
            <Text style={styles.countSubtitle}>rides completed</Text>
          </View>
          <View style={styles.nextRewardBadge}>
            <Text style={styles.nextRewardLabel}>Next Reward</Text>
            <Text style={styles.nextRewardValue}>{ridesToNext} rides</Text>
          </View>
        </View>

        <View style={styles.labelsRow}>
          <Text style={styles.trackLabel}>Ride 0</Text>
          <Text style={styles.trackLabel}>{milestone1Target}</Text>
          <Text style={styles.trackLabel}>{milestone2Target}</Text>
        </View>
        <View style={styles.trackRow}>
          <View style={styles.track}>
            <View style={[styles.trackFill, { width: `${segment1Progress * 100}%` as `${number}%` }]} />
          </View>
          <View style={[styles.milestoneDot, milestone1Reached && styles.milestoneDotReached]}>
            <Icon name="check" size={wp('3.5%')} color={colors.white} />
          </View>
          <View style={styles.track}>
            <View style={[styles.trackFill, { width: `${segment2Progress * 100}%` as `${number}%` }]} />
          </View>
          <View style={[styles.milestoneDot, styles.milestoneDotEnd, milestone2Reached && styles.milestoneDotReached]}>
            <Icon name="check" size={wp('3.5%')} color={milestone2Reached ? colors.white : colors.primary} />
          </View>
        </View>
      </View>

      <View style={styles.milestoneRow}>
        <View style={[styles.milestoneCard, styles.milestoneCardActive]}>
          <View style={styles.milestoneHeaderRow}>
            <Text style={styles.milestoneHeaderActive}>Milestone 1</Text>
            <Text style={styles.milestoneHeaderActive}>{milestone1Target} Rides</Text>
          </View>
          <Text style={styles.milestonePercentActive}>50%</Text>
          <Text style={styles.milestoneSubtitleActive}>off next ride</Text>
          {canClaimMilestone1 ? (
            <Button
              title="Claim Now"
              onPress={onClaim}
              loading={claiming}
              variant="secondary"
              size="sm"
              style={styles.claimButton}
              textStyle={styles.claimButtonText}
            />
          ) : null}
        </View>
        <View style={styles.milestoneCard}>
          <View style={styles.milestoneHeaderRow}>
            <Text style={styles.milestoneHeader}>Milestone 2</Text>
            <Text style={styles.milestoneHeader}>{milestone2Target} Rides</Text>
          </View>
          <Text style={styles.milestonePercent}>50%</Text>
          <Text style={styles.milestoneSubtitle}>off next ride</Text>
          <Text style={styles.milestoneAway}>{Math.max(milestone2Target - rideCount, 0)} rides away</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: hp('1.5%'),
  },
  progressCard: {
    backgroundColor: colors.primary,
    borderRadius: radius.xl,
    padding: wp('5%'),
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  cycleLabel: {
    fontFamily: fontFamily.medium,
    fontSize: fontSize.xs,
    color: colors.white,
    opacity: 0.85,
    textTransform: 'uppercase',
    maxWidth: wp('40%'),
  },
  countRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginTop: hp('0.8%'),
  },
  countValue: {
    fontFamily: fontFamily.bold,
    fontSize: fontSize.display,
    color: colors.white,
  },
  countTarget: {
    fontFamily: fontFamily.medium,
    fontSize: fontSize.lg,
    color: colors.white,
    opacity: 0.85,
  },
  countSubtitle: {
    fontFamily: fontFamily.regular,
    fontSize: fontSize.sm,
    color: colors.white,
    opacity: 0.85,
  },
  nextRewardBadge: {
    backgroundColor: colors.primaryDark,
    borderRadius: radius.md,
    paddingHorizontal: wp('3%'),
    paddingVertical: hp('1.2%'),
    alignItems: 'center',
  },
  nextRewardLabel: {
    fontFamily: fontFamily.medium,
    fontSize: fontSize.xs,
    color: colors.white,
    opacity: 0.85,
    textTransform: 'uppercase',
    textAlign: 'center',
  },
  nextRewardValue: {
    fontFamily: fontFamily.bold,
    fontSize: fontSize.lg,
    color: colors.white,
    marginTop: hp('0.3%'),
  },
  labelsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: hp('3%'),
  },
  trackLabel: {
    fontFamily: fontFamily.medium,
    fontSize: fontSize.sm,
    color: colors.white,
  },
  trackRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: hp('0.8%'),
  },
  track: {
    flex: 1,
    height: hp('1.4%'),
    borderRadius: radius.round,
    backgroundColor: colors.primaryDark,
    overflow: 'hidden',
  },
  trackFill: {
    height: '100%',
    backgroundColor: colors.white,
    borderRadius: radius.round,
  },
  milestoneDot: {
    width: wp('7%'),
    height: wp('7%'),
    borderRadius: radius.round,
    backgroundColor: colors.primaryDark,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: wp('1%'),
  },
  milestoneDotEnd: {
    backgroundColor: colors.primaryLight,
  },
  milestoneDotReached: {
    backgroundColor: colors.accentYellow,
  },
  milestoneRow: {
    flexDirection: 'row',
    gap: wp('3%'),
    marginTop: hp('2%'),
  },
  milestoneCard: {
    flex: 1,
    backgroundColor: colors.backgroundSecondary,
    borderRadius: radius.lg,
    padding: wp('4%'),
  },
  milestoneCardActive: {
    backgroundColor: colors.accentYellow,
  },
  milestoneHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  milestoneHeader: {
    fontFamily: fontFamily.medium,
    fontSize: fontSize.xs,
    color: colors.textHint,
    textTransform: 'uppercase',
  },
  milestoneHeaderActive: {
    fontFamily: fontFamily.medium,
    fontSize: fontSize.xs,
    color: colors.white,
    textTransform: 'uppercase',
  },
  milestonePercent: {
    fontFamily: fontFamily.bold,
    fontSize: fontSize.xxl,
    color: colors.textHint,
    marginTop: hp('1%'),
  },
  milestonePercentActive: {
    fontFamily: fontFamily.bold,
    fontSize: fontSize.xxl,
    color: colors.white,
    marginTop: hp('1%'),
  },
  milestoneSubtitle: {
    fontFamily: fontFamily.regular,
    fontSize: fontSize.sm,
    color: colors.textHint,
  },
  milestoneSubtitleActive: {
    fontFamily: fontFamily.regular,
    fontSize: fontSize.sm,
    color: colors.white,
    opacity: 0.9,
  },
  milestoneAway: {
    fontFamily: fontFamily.regular,
    fontSize: fontSize.xs,
    color: colors.textHint,
    marginTop: hp('1.5%'),
  },
  claimButton: {
    backgroundColor: colors.white,
    marginTop: hp('1.5%'),
  },
  claimButtonText: {
    color: colors.accentYellow,
  },
});
