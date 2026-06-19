import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Card } from '../../../components/Card';
import { colors } from '../../../theme/colors';
import { fontFamily, fontSize } from '../../../theme/typography';
import { FareBreakdown } from '../../../types/ride';
import { formatFareBreakdown } from '../../../utils/formatFare';

interface ReceiptSummaryProps {
  fare: FareBreakdown;
}

export const ReceiptSummary: React.FC<ReceiptSummaryProps> = ({ fare }) => {
  const formatted = formatFareBreakdown(fare);
  return (
    <Card>
      <Text style={styles.total}>{formatted.totalFare}</Text>
      <Text style={styles.label}>Total Charged</Text>
    </Card>
  );
};

const styles = StyleSheet.create({
  total: {
    fontFamily: fontFamily.bold,
    fontSize: fontSize.xxxl,
    color: colors.textPrimary,
    textAlign: 'center',
  },
  label: {
    fontFamily: fontFamily.regular,
    fontSize: fontSize.sm,
    color: colors.textSecondary,
    textAlign: 'center',
    marginTop: hp('0.5%'),
  },
});
