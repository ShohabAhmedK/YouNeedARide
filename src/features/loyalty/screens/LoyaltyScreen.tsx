import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { ScreenWrapper } from '../../../components/ScreenWrapper';
import { ProgressTab } from '../components/ProgressTab';
import { HowItWorksTab } from '../components/HowItWorksTab';
import { HistoryTab } from '../components/HistoryTab';
import { useLoyaltyProgress, useLoyaltyHistory, useClaimReward } from '../../../api/hooks/useLoyaltyApi';
import { colors } from '../../../theme/colors';
import { fontFamily, fontSize } from '../../../theme/typography';
import { radius } from '../../../theme/spacing';

type TabKey = 'progress' | 'howItWorks' | 'history';

const tabs: { key: TabKey; label: string }[] = [
  { key: 'progress', label: 'Progress' },
  { key: 'howItWorks', label: 'How It Works' },
  { key: 'history', label: 'History' },
];

const MILESTONE_TARGET_1 = 50;
const MILESTONE_TARGET_2 = 100;

export const LoyaltyScreen: React.FC = () => {
  const navigation = useNavigation();
  const [activeTab, setActiveTab] = useState<TabKey>('progress');
  const { data: progress } = useLoyaltyProgress();
  const { data: history } = useLoyaltyHistory();
  const claimReward = useClaimReward();

  const rideCount = progress?.rideCount ?? 73;
  const target = progress?.milestoneTarget ?? MILESTONE_TARGET_2;
  const canClaimMilestone1 = progress?.discountAvailable ?? rideCount >= MILESTONE_TARGET_1;

  return (
    <ScreenWrapper>
      <View style={styles.headerRow}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()} accessibilityLabel="Go back">
          <Icon name="arrow-back" size={wp('5.5%')} color={colors.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Reward Points</Text>
        <View style={styles.backButton} />
      </View>

      <View style={styles.tabRow}>
        {tabs.map((tab) => (
          <TouchableOpacity
            key={tab.key}
            style={[styles.tabButton, activeTab === tab.key && styles.tabButtonActive]}
            onPress={() => setActiveTab(tab.key)}
            accessibilityLabel={tab.label}
          >
            <Text style={[styles.tabLabel, activeTab === tab.key && styles.tabLabelActive]}>{tab.label}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView contentContainerStyle={styles.container}>
        {activeTab === 'progress' ? (
          <ProgressTab
            rideCount={rideCount}
            target={target}
            milestone1Target={MILESTONE_TARGET_1}
            milestone2Target={MILESTONE_TARGET_2}
            canClaimMilestone1={canClaimMilestone1}
            onClaim={() => claimReward.mutate()}
            claiming={claimReward.isPending}
          />
        ) : null}
        {activeTab === 'howItWorks' ? <HowItWorksTab /> : null}
        {activeTab === 'history' ? (
          <HistoryTab
            rideCount={rideCount}
            history={history || []}
            canClaimMilestone1={canClaimMilestone1}
            milestone1Target={MILESTONE_TARGET_1}
            milestone2Target={MILESTONE_TARGET_2}
          />
        ) : null}
      </ScrollView>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: wp('5%'),
    paddingTop: hp('1%'),
    paddingBottom: hp('1.5%'),
  },
  backButton: {
    width: wp('11%'),
    height: wp('11%'),
    borderRadius: radius.round,
    backgroundColor: colors.backgroundSecondary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontFamily: fontFamily.bold,
    fontSize: fontSize.xl,
    color: colors.textPrimary,
  },
  tabRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingHorizontal: wp('5%'),
    marginBottom: hp('1%'),
  },
  tabButton: {
    paddingVertical: hp('1.2%'),
    paddingHorizontal: wp('4%'),
    borderRadius: radius.lg,
    marginHorizontal: wp('1%'),
  },
  tabButtonActive: {
    backgroundColor: colors.primary,
  },
  tabLabel: {
    fontFamily: fontFamily.medium,
    fontSize: fontSize.lg,
    color: colors.textHint,
  },
  tabLabelActive: {
    fontFamily: fontFamily.bold,
    color: colors.white,
  },
  container: {
    paddingHorizontal: wp('5%'),
    paddingBottom: hp('4%'),
  },
});
