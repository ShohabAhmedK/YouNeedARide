import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { ScreenWrapper } from '../../../components/ScreenWrapper';
import { Card } from '../../../components/Card';
import { MapViewComponent } from '../../home/components/MapViewComponent';
import { RideStatusBar } from '../components/RideStatusBar';
import { useRideDetail } from '../../../api/hooks/useRideApi';
import { onRideCompleted } from '../../../api/socket';
import { colors } from '../../../theme/colors';
import { fontFamily, fontSize } from '../../../theme/typography';
import { MainStackParamList } from '../../../types/navigation';

type Nav = StackNavigationProp<MainStackParamList, 'RideInProgress'>;
type Rt = RouteProp<MainStackParamList, 'RideInProgress'>;

export const RideInProgressScreen: React.FC = () => {
  const navigation = useNavigation<Nav>();
  const route = useRoute<Rt>();
  const { data: ride } = useRideDetail(route.params.rideId);

  useEffect(() => {
    onRideCompleted((data) => {
      if (data.rideId === route.params.rideId) {
        navigation.navigate('SelectPayment', { rideId: route.params.rideId });
      }
    });
  }, []);

  if (!ride) return null;

  return (
    <ScreenWrapper>
      <View style={styles.mapContainer}>
        <MapViewComponent latitude={ride.pickup.latitude} longitude={ride.pickup.longitude} />
      </View>
      <Card style={styles.card}>
        <RideStatusBar status={ride.status} />
        <Text style={styles.distance}>{ride.distanceKm.toFixed(1)} km to destination</Text>
      </Card>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  mapContainer: {
    flex: 1,
  },
  card: {
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  distance: {
    fontFamily: fontFamily.medium,
    fontSize: fontSize.sm,
    color: colors.textSecondary,
    marginTop: hp('1.5%'),
  },
});
