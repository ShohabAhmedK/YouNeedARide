import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { MapViewComponent } from '../components/MapViewComponent';
import { ProfileHeaderBar } from '../components/ProfileHeaderBar';
import { CenterPickupPin } from '../components/CenterPickupPin';
import { FloatingNavButton } from '../components/FloatingNavButton';
import { PickupDestinationBar } from '../components/PickupDestinationBar';
import { LoyaltyRewardCard } from '../components/LoyaltyRewardCard';
import { Card } from '../../../components/Card';
import { RecentLocationRow } from '../../../components/RecentLocationRow';
import { useAuthStore } from '../../../store/authStore';
import { MainStackParamList } from '../../../types/navigation';

type Nav = StackNavigationProp<MainStackParamList, 'HomeMapScreen'>;

const PICKUP_COORDS = { latitude: 37.7749, longitude: -122.4194, address: 'Plot ST 8' };

export const HomeMapScreen: React.FC = () => {
  const navigation = useNavigation<Nav>();
  const rider = useAuthStore(s => s.rider);

  const goToDestination = () =>
    navigation.navigate('SetDestination', { pickup: PICKUP_COORDS });

  return (
    <View style={styles.container}>
      <ProfileHeaderBar
        name={rider?.fullName}
        photoUrl={rider?.profilePhotoUrl}
        onPress={() => navigation.navigate('ProfileScreen')}
      />
      <View style={styles.mapArea}>
        <MapViewComponent
          latitude={PICKUP_COORDS.latitude}
          longitude={PICKUP_COORDS.longitude}
          drivers={[]}
        />
        <CenterPickupPin address={PICKUP_COORDS.address} onPress={goToDestination} />
        <View style={styles.navButton}>
          <FloatingNavButton onPress={() => {}} />
        </View>
      </View>

      <Card style={styles.bottomSheet}>
        <View style={styles.handle} />
        <PickupDestinationBar onPress={goToDestination} />
        <RecentLocationRow
          icon="history"
          title="Oak Valley"
          address="3742 Oak Valley, Apt 4B Atlanta, GA 30305..."
          onPress={goToDestination}
        />
        <RecentLocationRow
          icon="adjust"
          title="Oak Valley"
          address="3742 Oak Valley, Apt 4B Atlanta, GA 30305..."
          onPress={goToDestination}
        />
        <View style={styles.rewardSpacer}>
          <LoyaltyRewardCard
            rideCount={rider?.loyaltyRideCount || 0}
            onPress={() => navigation.navigate('Loyalty')}
          />
        </View>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mapArea: {
    flex: 1,
  },
  navButton: {
    position: 'absolute',
    bottom: hp('3%'),
    right: wp('5%'),
  },
  bottomSheet: {
    // position: 'absolute',
    width: '100%',
    bottom: 0,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
  },
  handle: {
    alignSelf: 'center',
    width: wp('10%'),
    height: hp('0.5%'),
    borderRadius: hp('0.5%'),
    backgroundColor: '#D8D8D8',
    marginBottom: hp('1.5%'),
  },
  rewardSpacer: {
    marginTop: hp('1.5%'),
  },
});
