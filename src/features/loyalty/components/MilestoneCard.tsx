import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Card } from '../../../components/Card';
import { colors } from '../../../theme/colors';
import { fontFamily, fontSize } from '../../../theme/typography';

interface MilestoneCardProps {
  rideCount: number;
  target: number;
}

export const MilestoneCard: React.FC<MilestoneCardProps> = ({ rideCount, target }) => {
  const progress = Math.min(rideCount / target, 1);

  return (
    <Card style={styles.card}>
      <View style={styles.circle}>
        <Text style={styles.circleText}>{rideCount}/{target}</Text>
        <Text style={styles.circleLabel}>rides</Text>
      </View>
      <Icon name="emoji-events" size={wp('8%')} color={colors.accentYellow} style={styles.icon} />
      <Text style={styles.progressText}>{Math.round(progress * 100)}% to your next reward</Text>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    alignItems: 'center',
    paddingVertical: hp('4%'),
  },
  circle: {
    width: wp('35%'),
    height: wp('35%'),
    borderRadius: wp('17.5%'),
    borderWidth: 6,
    borderColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  circleText: {
    fontFamily: fontFamily.bold,
    fontSize: fontSize.xl,
    color: colors.textPrimary,
  },
  circleLabel: {
    fontFamily: fontFamily.regular,
    fontSize: fontSize.xs,
    color: colors.textSecondary,
  },
  icon: {
    marginTop: hp('2%'),
  },
  progressText: {
    fontFamily: fontFamily.medium,
    fontSize: fontSize.sm,
    color: colors.textSecondary,
    marginTop: hp('1%'),
  },
});
