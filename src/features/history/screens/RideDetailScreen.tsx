import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { useRoute, RouteProp } from '@react-navigation/native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { ScreenWrapper } from '../../../components/ScreenWrapper';
import { Card } from '../../../components/Card';
import { RideStatusBar } from '../../tracking/components/RideStatusBar';
import { FareBreakdownCard } from '../../booking/components/FareBreakdownCard';
import { useRideDetail } from '../../../api/hooks/useRideApi';
import { colors } from '../../../theme/colors';
import { fontFamily, fontSize } from '../../../theme/typography';
import { formatRideDate, formatRideTime } from '../../../utils/formatDate';
import { formatAddress } from '../../../utils/locationHelpers';
import { MainStackParamList } from '../../../types/navigation';

type Rt = RouteProp<MainStackParamList, 'RideDetail'>;

export const RideDetailScreen: React.FC = () => {
  const route = useRoute<Rt>();
  const { data: ride } = useRideDetail(route.params.rideId);

  if (!ride) return null;

  return (
    <ScreenWrapper>
      <ScrollView contentContainerStyle={styles.container}>
        <RideStatusBar status={ride.status} />
        <Card style={styles.card}>
          <Text style={styles.dateText}>{formatRideDate(ride.createdAt)} at {formatRideTime(ride.createdAt)}</Text>
          <Text style={styles.address}>From: {formatAddress(ride.pickup)}</Text>
          <Text style={styles.address}>To: {formatAddress(ride.destination)}</Text>
        </Card>
        <FareBreakdownCard fare={ride.fare} />
      </ScrollView>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: wp('6%'),
    paddingTop: hp('3%'),
    paddingBottom: hp('4%'),
  },
  card: {
    marginVertical: hp('2%'),
  },
  dateText: {
    fontFamily: fontFamily.semiBold,
    fontSize: fontSize.md,
    color: colors.textPrimary,
    marginBottom: hp('1%'),
  },
  address: {
    fontFamily: fontFamily.regular,
    fontSize: fontSize.sm,
    color: colors.textSecondary,
    marginTop: hp('0.3%'),
  },
});
