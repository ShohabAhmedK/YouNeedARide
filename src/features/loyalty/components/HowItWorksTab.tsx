import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Card } from '../../../components/Card';
import { colors } from '../../../theme/colors';
import { fontFamily, fontSize } from '../../../theme/typography';
import { LOYALTY_MILESTONE_DISCOUNT, LOYALTY_DISCOUNT_PERCENTAGE } from '../../../constants/config';

const steps = [
  'Complete rides to build your loyalty progress.',
  'At ' + LOYALTY_MILESTONE_DISCOUNT + ' rides, unlock a ' + LOYALTY_DISCOUNT_PERCENTAGE + '% discount on your next ride.',
  'At 100 rides, your reward cycle resets and you start earning again.',
];

export const HowItWorksTab: React.FC = () => (
  <View style={styles.container}>
    {steps.map((step, index) => (
      <Card key={index} style={styles.card}>
        <View style={styles.row}>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{index + 1}</Text>
          </View>
          <Text style={styles.stepText}>{step}</Text>
        </View>
      </Card>
    ))}
  </View>
);

const styles = StyleSheet.create({
  container: {
    paddingTop: hp('2%'),
  },
  card: {
    marginBottom: hp('1.5%'),
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  badge: {
    width: wp('8%'),
    height: wp('8%'),
    borderRadius: wp('4%'),
    backgroundColor: colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: wp('3%'),
  },
  badgeText: {
    fontFamily: fontFamily.bold,
    fontSize: fontSize.sm,
    color: colors.primaryDark,
  },
  stepText: {
    flex: 1,
    fontFamily: fontFamily.regular,
    fontSize: fontSize.sm,
    color: colors.textPrimary,
  },
});
