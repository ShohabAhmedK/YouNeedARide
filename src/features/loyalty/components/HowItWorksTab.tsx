import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { colors } from '../../../theme/colors';
import { fontFamily, fontSize } from '../../../theme/typography';
import { radius } from '../../../theme/spacing';
import { LOYALTY_MILESTONE_DISCOUNT, LOYALTY_MILESTONE_RESET, LOYALTY_DISCOUNT_PERCENTAGE } from '../../../constants/config';

const steps = [
  {
    title: 'Complete ' + LOYALTY_MILESTONE_DISCOUNT + ' rides',
    description:
      'Once you hit ' + LOYALTY_MILESTONE_DISCOUNT + ' rides in your current cycle, you unlock a ' +
      LOYALTY_DISCOUNT_PERCENTAGE + '% discount on your very next ride.',
  },
  {
    title: 'Claim your discount',
    description: "Tap 'Claim Now' on Milestone 1. The discount is automatically applied at checkout on your next booking.",
  },
  {
    title: 'Complete ' + LOYALTY_MILESTONE_RESET + ' rides',
    description:
      'At ride ' + LOYALTY_MILESTONE_RESET + ', you earn a second ' + LOYALTY_DISCOUNT_PERCENTAGE +
      '% discount. Claim it the same way — then your cycle resets to zero.',
  },
  {
    title: 'Cycle resets',
    description: 'After ' + LOYALTY_MILESTONE_RESET + ' rides your counter resets. Start a new cycle and earn the same discounts all over again.',
  },
];

export const HowItWorksTab: React.FC = () => (
  <View style={styles.container}>
    <View style={styles.introCard}>
      <Text style={styles.introTitle}>Rider Loyalty Reward Program</Text>
      <Text style={styles.introText}>
        Earn milestone discounts as you ride. No subscription, no fees — just rewards for being a loyal rider.
      </Text>
    </View>

    <Text style={styles.sectionLabel}>How It Works</Text>
    {steps.map((step, index) => (
      <View key={step.title} style={[styles.stepRow, index === steps.length - 1 && styles.stepRowLast]}>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{index + 1}</Text>
        </View>
        <View style={styles.stepTextColumn}>
          <Text style={styles.stepTitle}>{step.title}</Text>
          <Text style={styles.stepDescription}>{step.description}</Text>
        </View>
      </View>
    ))}
  </View>
);

const styles = StyleSheet.create({
  container: {
    paddingTop: hp('1.5%'),
  },
  introCard: {
    backgroundColor: colors.backgroundSecondary,
    borderRadius: radius.lg,
    padding: wp('5%'),
    marginBottom: hp('2.5%'),
  },
  introTitle: {
    fontFamily: fontFamily.bold,
    fontSize: fontSize.xl,
    color: colors.textPrimary,
    marginBottom: hp('1%'),
  },
  introText: {
    fontFamily: fontFamily.regular,
    fontSize: fontSize.md,
    color: colors.textSecondary,
    lineHeight: hp('2.6%'),
  },
  sectionLabel: {
    fontFamily: fontFamily.medium,
    fontSize: fontSize.sm,
    color: colors.textHint,
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: hp('1.5%'),
  },
  stepRow: {
    flexDirection: 'row',
    paddingBottom: hp('2%'),
    marginBottom: hp('2%'),
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  stepRowLast: {
    borderBottomWidth: 0,
    marginBottom: 0,
    paddingBottom: 0,
  },
  badge: {
    width: wp('9%'),
    height: wp('9%'),
    borderRadius: radius.round,
    backgroundColor: colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: wp('4%'),
  },
  badgeText: {
    fontFamily: fontFamily.bold,
    fontSize: fontSize.md,
    color: colors.primary,
  },
  stepTextColumn: {
    flex: 1,
  },
  stepTitle: {
    fontFamily: fontFamily.bold,
    fontSize: fontSize.lg,
    color: colors.textPrimary,
    marginBottom: hp('0.5%'),
  },
  stepDescription: {
    fontFamily: fontFamily.regular,
    fontSize: fontSize.sm,
    color: colors.textSecondary,
    lineHeight: hp('2.2%'),
  },
});
