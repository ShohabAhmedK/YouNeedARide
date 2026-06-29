import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { colors } from '../../../theme/colors';
import { fontFamily, fontSize } from '../../../theme/typography';
import { radius } from '../../../theme/spacing';
import { formatRideDate } from '../../../utils/formatDate';
import { formatCurrency } from '../../../utils/formatFare';

interface HistoryEntry {
  id: string;
  cycleCompletedAt: string;
  totalSaved: number;
}

interface HistoryTabProps {
  rideCount: number;
  history: HistoryEntry[];
  canClaimMilestone1: boolean;
  milestone1Target: number;
  milestone2Target: number;
}

const dummyHistory: HistoryEntry[] = [
  { id: 'cycle-1', cycleCompletedAt: '2026-03-02', totalSaved: 20.9 },
];

export const HistoryTab: React.FC<HistoryTabProps> = ({
  rideCount,
  history,
  canClaimMilestone1,
  milestone1Target,
  milestone2Target,
}) => {
  const cycles = history.length ? history : dummyHistory;
  const totalSaved = cycles.reduce((sum, cycle) => sum + cycle.totalSaved, 0);
  const discountsUsed = cycles.length * 2;
  const currentCycleNumber = cycles.length + 1;

  return (
    <View style={styles.container}>
      <View style={styles.statsRow}>
        <View style={[styles.statCard, styles.statCardGold]}>
          <Text style={styles.statLabel}>Total Rides</Text>
          <Text style={styles.statValue}>{rideCount}</Text>
        </View>
        <View style={[styles.statCard, styles.statCardGreen]}>
          <Text style={styles.statLabel}>Discounts Used</Text>
          <Text style={styles.statValue}>{discountsUsed}</Text>
        </View>
      </View>

      <View style={styles.totalSavedCard}>
        <Text style={styles.statLabel}>Total Saved</Text>
        <Text style={styles.totalSavedValue}>{formatCurrency(totalSaved)}</Text>
      </View>

      <Text style={styles.sectionLabel}>Cycle {currentCycleNumber} · In Progress</Text>
      <View style={styles.currentCycleCard}>
        <View style={styles.milestoneRow}>
          <View style={[styles.statusIcon, canClaimMilestone1 && styles.statusIconReady]}>
            <Icon name="auto-awesome" size={wp('4.5%')} color={canClaimMilestone1 ? colors.primary : colors.textHint} />
          </View>
          <Text style={styles.milestoneRowLabel}>Milestone 1 · Ride {milestone1Target}</Text>
          <Text style={[styles.milestoneStatus, canClaimMilestone1 && styles.milestoneStatusReady]}>
            {canClaimMilestone1 ? 'Ready to claim' : Math.max(milestone1Target - rideCount, 0) + ' rides away'}
          </Text>
        </View>
        <View style={styles.milestoneDivider} />
        <View style={styles.milestoneRow}>
          <View style={styles.statusIcon}>
            <Icon name="schedule" size={wp('4.5%')} color={colors.textHint} />
          </View>
          <Text style={styles.milestoneRowLabel}>Milestone 2 · Ride {milestone2Target}</Text>
          <Text style={styles.milestoneStatus}>{Math.max(milestone2Target - rideCount, 0)} rides away</Text>
        </View>
      </View>

      <Text style={styles.sectionLabel}>Past Cycles</Text>
      {cycles.map((cycle, index) => {
        const milestone1Amount = cycle.totalSaved * 0.4;
        const milestone2Amount = cycle.totalSaved - milestone1Amount;
        const cycleNumber = index + 1;
        return (
          <View key={cycle.id} style={styles.pastCycleCard}>
            <View style={styles.pastCycleHeader}>
              <Text style={styles.pastCycleTitle}>Cycle {cycleNumber}</Text>
              <Text style={styles.pastCycleSaved}>Saved {formatCurrency(cycle.totalSaved)}</Text>
            </View>
            <View style={styles.pastCycleRow}>
              <View>
                <Text style={styles.pastCycleMilestoneLabel}>Milestone 1 · {milestone1Target} rides</Text>
                <Text style={styles.pastCycleDate}>{formatRideDate(cycle.cycleCompletedAt)}</Text>
              </View>
              <View style={styles.pastCycleAmountRow}>
                <Icon name="local-offer" size={wp('4%')} color={colors.primary} />
                <Text style={styles.pastCycleAmount}>-{formatCurrency(milestone1Amount)}</Text>
              </View>
            </View>
            <View style={styles.pastCycleDivider} />
            <View style={styles.pastCycleRow}>
              <View>
                <Text style={styles.pastCycleMilestoneLabel}>Milestone 2 · {milestone2Target} rides</Text>
                <Text style={styles.pastCycleDate}>{formatRideDate(cycle.cycleCompletedAt)}</Text>
              </View>
              <View style={styles.pastCycleAmountRow}>
                <Icon name="local-offer" size={wp('4%')} color={colors.primary} />
                <Text style={styles.pastCycleAmount}>-{formatCurrency(milestone2Amount)}</Text>
              </View>
            </View>
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: hp('1.5%'),
  },
  statsRow: {
    flexDirection: 'row',
    gap: wp('3%'),
  },
  statCard: {
    flex: 1,
    borderRadius: radius.lg,
    padding: wp('4%'),
  },
  statCardGold: {
    backgroundColor: colors.accentYellow,
  },
  statCardGreen: {
    backgroundColor: colors.primary,
  },
  statLabel: {
    fontFamily: fontFamily.medium,
    fontSize: fontSize.sm,
    color: colors.white,
    opacity: 0.9,
  },
  statValue: {
    fontFamily: fontFamily.bold,
    fontSize: fontSize.xxxl,
    color: colors.white,
    marginTop: hp('0.5%'),
  },
  totalSavedCard: {
    backgroundColor: colors.warning,
    borderRadius: radius.lg,
    padding: wp('4%'),
    marginTop: hp('1.5%'),
    marginBottom: hp('2.5%'),
  },
  totalSavedValue: {
    fontFamily: fontFamily.bold,
    fontSize: fontSize.xxxl,
    color: colors.white,
    marginTop: hp('0.5%'),
  },
  sectionLabel: {
    fontFamily: fontFamily.medium,
    fontSize: fontSize.sm,
    color: colors.textHint,
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: hp('1.2%'),
  },
  currentCycleCard: {
    backgroundColor: colors.backgroundSecondary,
    borderRadius: radius.lg,
    paddingHorizontal: wp('4%'),
    marginBottom: hp('2.5%'),
  },
  milestoneRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: hp('1.8%'),
  },
  milestoneDivider: {
    height: 1,
    backgroundColor: colors.border,
  },
  statusIcon: {
    width: wp('9%'),
    height: wp('9%'),
    borderRadius: radius.round,
    backgroundColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: wp('3%'),
  },
  statusIconReady: {
    backgroundColor: colors.primaryLight,
  },
  milestoneRowLabel: {
    flex: 1,
    fontFamily: fontFamily.medium,
    fontSize: fontSize.md,
    color: colors.textPrimary,
  },
  milestoneStatus: {
    fontFamily: fontFamily.medium,
    fontSize: fontSize.sm,
    color: colors.textHint,
  },
  milestoneStatusReady: {
    fontFamily: fontFamily.semiBold,
    color: colors.primary,
  },
  pastCycleCard: {
    backgroundColor: colors.white,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: 'hidden',
    marginBottom: hp('2%'),
  },
  pastCycleHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.primary,
    paddingHorizontal: wp('4%'),
    paddingVertical: hp('1.5%'),
  },
  pastCycleTitle: {
    fontFamily: fontFamily.bold,
    fontSize: fontSize.lg,
    color: colors.white,
  },
  pastCycleSaved: {
    fontFamily: fontFamily.bold,
    fontSize: fontSize.md,
    color: colors.white,
  },
  pastCycleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: wp('4%'),
    paddingVertical: hp('1.5%'),
  },
  pastCycleMilestoneLabel: {
    fontFamily: fontFamily.medium,
    fontSize: fontSize.md,
    color: colors.textPrimary,
  },
  pastCycleDate: {
    fontFamily: fontFamily.regular,
    fontSize: fontSize.xs,
    color: colors.textHint,
    marginTop: hp('0.3%'),
  },
  pastCycleAmountRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  pastCycleAmount: {
    fontFamily: fontFamily.bold,
    fontSize: fontSize.md,
    color: colors.primary,
    marginLeft: wp('1.5%'),
  },
  pastCycleDivider: {
    height: 1,
    backgroundColor: colors.border,
    marginHorizontal: wp('4%'),
  },
});
