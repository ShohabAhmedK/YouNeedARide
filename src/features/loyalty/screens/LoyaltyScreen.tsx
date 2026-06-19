import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { ScreenWrapper } from '../../../components/ScreenWrapper';
import { ProgressTab } from '../components/ProgressTab';
import { HowItWorksTab } from '../components/HowItWorksTab';
import { HistoryTab } from '../components/HistoryTab';
import { useLoyaltyProgress, useLoyaltyHistory, useClaimReward } from '../../../api/hooks/useLoyaltyApi';
import { colors } from '../../../theme/colors';
import { fontFamily, fontSize } from '../../../theme/typography';

type TabKey = 'progress' | 'howItWorks' | 'history';

const tabs: { key: TabKey; label: string }[] = [
  { key: 'progress', label: 'Progress' },
  { key: 'howItWorks', label: 'How It Works' },
  { key: 'history', label: 'History' },
];

export const LoyaltyScreen: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabKey>('progress');
  const { data: progress } = useLoyaltyProgress();
  const { data: history } = useLoyaltyHistory();
  const claimReward = useClaimReward();

  return (
    <ScreenWrapper>
      <View style={styles.container}>
        <Text style={styles.title}>Reward Points</Text>
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
        {activeTab === 'progress' ? (
          <ProgressTab
            rideCount={progress?.rideCount || 0}
            canClaim={!!progress?.discountAvailable}
            onClaim={() => claimReward.mutate()}
            claiming={claimReward.isPending}
          />
        ) : null}
        {activeTab === 'howItWorks' ? <HowItWorksTab /> : null}
        {activeTab === 'history' ? <HistoryTab history={history || []} /> : null}
      </View>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: wp('6%'),
    paddingTop: hp('3%'),
  },
  title: {
    fontFamily: fontFamily.bold,
    fontSize: fontSize.xl,
    color: colors.textPrimary,
    marginBottom: hp('2%'),
  },
  tabRow: {
    flexDirection: 'row',
    backgroundColor: colors.backgroundSecondary,
    borderRadius: wp('3%'),
    padding: wp('1%'),
  },
  tabButton: {
    flex: 1,
    paddingVertical: hp('1.2%'),
    alignItems: 'center',
    borderRadius: wp('2.5%'),
  },
  tabButtonActive: {
    backgroundColor: colors.white,
  },
  tabLabel: {
    fontFamily: fontFamily.medium,
    fontSize: fontSize.sm,
    color: colors.textSecondary,
  },
  tabLabelActive: {
    color: colors.primary,
  },
});
