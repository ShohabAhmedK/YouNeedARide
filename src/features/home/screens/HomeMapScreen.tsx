import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/Ionicons';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { MapViewComponent } from '../components/MapViewComponent';
import { PickupDestinationBar } from '../components/PickupDestinationBar';
import { RewardProgressBar } from '../components/RewardProgressBar';
import { Avatar } from '../../../components/Avatar';
import { Card } from '../../../components/Card';
import { useAuthStore } from '../../../store/authStore';
import { colors } from '../../../theme/colors';
import { MainStackParamList } from '../../../types/navigation';

type Nav = StackNavigationProp<MainStackParamList, 'BottomTabs'>;

export const HomeMapScreen: React.FC = () => {
  const navigation = useNavigation<Nav>();
  const rider = useAuthStore((s) => s.rider);

  return (
    <View style={styles.container}>
      <MapViewComponent latitude={37.7749} longitude={-122.4194} drivers={[]} />
      <View style={styles.topRow}>
        <Avatar uri={rider?.profilePhotoUrl} name={rider?.fullName} size="sm" />
        <TouchableOpacity style={styles.notificationButton} accessibilityLabel="Notifications">
          <Icon name="notifications-outline" size={wp('6%')} color={colors.textPrimary} />
        </TouchableOpacity>
      </View>
      <Card style={styles.bottomSheet}>
        <PickupDestinationBar onPress={() => navigation.navigate('SetDestination', { pickup: { latitude: 37.7749, longitude: -122.4194 } })} />
        <View style={styles.rewardSpacer}>
          <RewardProgressBar rideCount={rider?.loyaltyRideCount || 0} />
        </View>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topRow: {
    position: 'absolute',
    top: hp('6%'),
    left: wp('5%'),
    right: wp('5%'),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  notificationButton: {
    width: wp('11%'),
    height: wp('11%'),
    borderRadius: wp('5.5%'),
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomSheet: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    paddingBottom: hp('4%'),
  },
  rewardSpacer: {
    marginTop: hp('2%'),
  },
});
