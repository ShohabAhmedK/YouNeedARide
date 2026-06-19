import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { colors } from '../../../theme/colors';
import { fontFamily, fontSize } from '../../../theme/typography';
import { LOYALTY_MILESTONE_RESET } from '../../../constants/config';

interface RewardProgressBarProps {
  rideCount: number;
}

export const RewardProgressBar: React.FC<RewardProgressBarProps> = ({ rideCount }) => {
  const progress = Math.min(rideCount / LOYALTY_MILESTONE_RESET, 1);

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Text style={styles.label}>Reward Points</Text>
        <Text style={styles.count}>{rideCount}/{LOYALTY_MILESTONE_RESET} rides</Text>
      </View>
      <View style={styles.track}>
        <View style={[styles.fill, { width: (progress * 100) + '%' }]} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: wp('1%'),
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: hp('0.8%'),
  },
  label: {
    fontFamily: fontFamily.medium,
    fontSize: fontSize.sm,
    color: colors.textPrimary,
  },
  count: {
    fontFamily: fontFamily.regular,
    fontSize: fontSize.xs,
    color: colors.textSecondary,
  },
  track: {
    height: hp('1%'),
    backgroundColor: colors.border,
    borderRadius: hp('0.5%'),
    overflow: 'hidden',
  },
  fill: {
    height: '100%',
    backgroundColor: colors.primary,
  },
});
