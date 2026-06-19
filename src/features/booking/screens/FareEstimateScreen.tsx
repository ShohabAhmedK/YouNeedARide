import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { ScreenWrapper } from '../../../components/ScreenWrapper';
import { Button } from '../../../components/Button';
import { Card } from '../../../components/Card';
import { FareBreakdownCard } from '../components/FareBreakdownCard';
import { MapViewComponent } from '../../home/components/MapViewComponent';
import { useFareEstimate, useRequestRide } from '../../../api/hooks/useRideApi';
import { useRideStore } from '../../../store/rideStore';
import { colors } from '../../../theme/colors';
import { fontFamily, fontSize } from '../../../theme/typography';
import { calculateDistance } from '../../../utils/locationHelpers';
import { MainStackParamList } from '../../../types/navigation';

type Nav = StackNavigationProp<MainStackParamList, 'FareEstimate'>;
type Rt = RouteProp<MainStackParamList, 'FareEstimate'>;

export const FareEstimateScreen: React.FC = () => {
  const navigation = useNavigation<Nav>();
  const route = useRoute<Rt>();
  const { pickup, destination } = route.params;
  const fareEstimateMutation = useFareEstimate();
  const requestRide = useRequestRide();
  const fareEstimate = useRideStore((s) => s.fareEstimate);
  const setFareEstimate = useRideStore((s) => s.setFareEstimate);
  const selectedPaymentMethod = useRideStore((s) => s.selectedPaymentMethod);
  const distanceKm = calculateDistance(pickup, destination);

  useEffect(() => {
    fareEstimateMutation.mutate({ pickup, destination }, {
      onSuccess: (data) => setFareEstimate(data),
    });
  }, []);

  const handleFindDrivers = () => {
    requestRide.mutate(
      { pickup, destination, paymentMethodId: selectedPaymentMethod?.id || 'cash' },
      {
        onSuccess: (ride) => navigation.navigate('FindingDriver', { rideId: ride.id }),
      },
    );
  };

  return (
    <ScreenWrapper>
      <View style={styles.mapContainer}>
        <MapViewComponent latitude={pickup.latitude} longitude={pickup.longitude} />
      </View>
      <ScrollView style={styles.card} contentContainerStyle={styles.cardContent}>
        <Text style={styles.heading}>Trip Estimate</Text>
        <View style={styles.statsRow}>
          <Text style={styles.statText}>{distanceKm.toFixed(1)} km</Text>
          <Text style={styles.statText}>{Math.round(distanceKm * 2.5)} min</Text>
        </View>
        {fareEstimate ? (
          <FareBreakdownCard fare={fareEstimate} />
        ) : (
          <Card><Text style={styles.loadingText}>Calculating fare...</Text></Card>
        )}
        <Button
          title="Find Drivers"
          onPress={handleFindDrivers}
          loading={requestRide.isPending}
          disabled={!fareEstimate}
          style={styles.button}
        />
      </ScrollView>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  mapContainer: {
    flex: 1,
  },
  card: {
    maxHeight: hp('45%'),
  },
  cardContent: {
    padding: wp('6%'),
  },
  heading: {
    fontFamily: fontFamily.bold,
    fontSize: fontSize.lg,
    color: colors.textPrimary,
    marginBottom: hp('1%'),
  },
  statsRow: {
    flexDirection: 'row',
    gap: wp('4%'),
    marginBottom: hp('2%'),
  },
  statText: {
    fontFamily: fontFamily.medium,
    fontSize: fontSize.sm,
    color: colors.textSecondary,
  },
  loadingText: {
    fontFamily: fontFamily.regular,
    fontSize: fontSize.sm,
    color: colors.textSecondary,
  },
  button: {
    marginTop: hp('2%'),
  },
});
