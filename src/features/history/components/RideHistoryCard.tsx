import React from 'react';
import { TouchableOpacity, Text, View, StyleSheet } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Card } from '../../../components/Card';
import { colors } from '../../../theme/colors';
import { fontFamily, fontSize } from '../../../theme/typography';
import { Ride } from '../../../types/ride';
import { formatRideDate, formatRideTime } from '../../../utils/formatDate';
import { formatCurrency } from '../../../utils/formatFare';
import { formatAddress } from '../../../utils/locationHelpers';

interface RideHistoryCardProps {
  ride: Ride;
  onPress: () => void;
}

export const RideHistoryCard: React.FC<RideHistoryCardProps> = ({ ride, onPress }) => (
  <TouchableOpacity onPress={onPress} accessibilityLabel={'Ride on ' + formatRideDate(ride.createdAt)}>
    <Card style={styles.card}>
      <View style={styles.row}>
        <Text style={styles.date}>{formatRideDate(ride.createdAt)}</Text>
        <Text style={styles.fare}>{formatCurrency(ride.fare.totalFare, ride.fare.currency)}</Text>
      </View>
      <Text style={styles.time}>{formatRideTime(ride.createdAt)}</Text>
      <Text style={styles.address} numberOfLines={1}>{formatAddress(ride.pickup)} → {formatAddress(ride.destination)}</Text>
    </Card>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  card: {
    marginBottom: hp('1.5%'),
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  date: {
    fontFamily: fontFamily.semiBold,
    fontSize: fontSize.md,
    color: colors.textPrimary,
  },
  fare: {
    fontFamily: fontFamily.bold,
    fontSize: fontSize.md,
    color: colors.primary,
  },
  time: {
    fontFamily: fontFamily.regular,
    fontSize: fontSize.xs,
    color: colors.textHint,
    marginTop: hp('0.3%'),
  },
  address: {
    fontFamily: fontFamily.regular,
    fontSize: fontSize.sm,
    color: colors.textSecondary,
    marginTop: hp('0.8%'),
  },
});
