import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Card } from '../../../components/Card';
import { Divider } from '../../../components/Divider';
import { colors } from '../../../theme/colors';
import { fontFamily, fontSize } from '../../../theme/typography';
import { FareBreakdown } from '../../../types/ride';
import { formatFareBreakdown } from '../../../utils/formatFare';

interface FareBreakdownCardProps {
  fare: FareBreakdown;
}

export const FareBreakdownCard: React.FC<FareBreakdownCardProps> = ({ fare }) => {
  const formatted = formatFareBreakdown(fare);

  return (
    <Card>
      <Row label="Base Fare" value={formatted.baseFare} />
      <Row label="Distance Rate" value={formatted.distanceRate} />
      <Row label="Platform Fee" value={formatted.platformFee} />
      {formatted.discount ? <Row label="Discount" value={'-' + formatted.discount} /> : null}
      <Divider style={styles.divider} />
      <Row label="Total" value={formatted.totalFare} bold />
    </Card>
  );
};

const Row: React.FC<{ label: string; value: string; bold?: boolean }> = ({ label, value, bold }) => (
  <View style={styles.row}>
    <Text style={[styles.label, bold && styles.bold]}>{label}</Text>
    <Text style={[styles.value, bold && styles.bold]}>{value}</Text>
  </View>
);

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: hp('0.7%'),
  },
  label: {
    fontFamily: fontFamily.regular,
    fontSize: fontSize.sm,
    color: colors.textSecondary,
  },
  value: {
    fontFamily: fontFamily.medium,
    fontSize: fontSize.sm,
    color: colors.textPrimary,
  },
  bold: {
    fontFamily: fontFamily.bold,
    fontSize: fontSize.md,
    color: colors.textPrimary,
  },
  divider: {
    marginVertical: hp('1%'),
  },
});
