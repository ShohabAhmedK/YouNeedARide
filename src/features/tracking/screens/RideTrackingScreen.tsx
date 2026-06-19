import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { ScreenWrapper } from '../../../components/ScreenWrapper';
import { Card } from '../../../components/Card';
import { MapViewComponent } from '../../home/components/MapViewComponent';
import { DriverInfoCard } from '../components/DriverInfoCard';
import { RideStatusBar } from '../components/RideStatusBar';
import { ETADisplay } from '../components/ETADisplay';
import { ChatCallButtons } from '../components/ChatCallButtons';
import { useRideDetail } from '../../../api/hooks/useRideApi';
import { onRideStatusUpdate } from '../../../api/socket';
import { RideStatus } from '../../../types/ride';
import { MainStackParamList } from '../../../types/navigation';

type Nav = StackNavigationProp<MainStackParamList, 'RideTracking'>;
type Rt = RouteProp<MainStackParamList, 'RideTracking'>;

export const RideTrackingScreen: React.FC = () => {
  const navigation = useNavigation<Nav>();
  const route = useRoute<Rt>();
  const { data: ride } = useRideDetail(route.params.rideId);

  useEffect(() => {
    onRideStatusUpdate((data) => {
      if (data.rideId === route.params.rideId && data.status === 'RIDE_STARTED') {
        navigation.replace('RideInProgress', { rideId: route.params.rideId });
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
        <View style={styles.spacer} />
        {ride.driver ? <DriverInfoCard driver={ride.driver} /> : null}
        <View style={styles.bottomRow}>
          {ride.driver?.etaMinutes ? <ETADisplay etaMinutes={ride.driver.etaMinutes} /> : <View />}
          <ChatCallButtons
            onChatPress={() => navigation.navigate('Chat', { rideId: ride.id, driverName: ride.driver?.name || 'Driver' })}
            phoneNumber={undefined}
          />
        </View>
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
  spacer: {
    height: hp('2%'),
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: hp('2%'),
  },
});
