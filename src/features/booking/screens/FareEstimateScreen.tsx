import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import FastImage from 'react-native-fast-image';
import { Button } from '../../../components/Button';
import { Card } from '../../../components/Card';
import { radius } from '../../../theme/spacing';
import { heavyShadow } from '../../../theme/shadows';

import { MapViewComponent } from '../../home/components/MapViewComponent';
import { useFareEstimate, useRequestRide } from '../../../api/hooks/useRideApi';
import { useRideStore } from '../../../store/rideStore';
import { colors } from '../../../theme/colors';
import { fontFamily } from '../../../theme/typography';
import { calculateDistance } from '../../../utils/locationHelpers';
import { MainStackParamList } from '../../../types/navigation';
import { ProfileHeaderBar } from '../../home/components/ProfileHeaderBar';

type Nav = StackNavigationProp<MainStackParamList, 'FareEstimate'>;
type Rt = RouteProp<MainStackParamList, 'FareEstimate'>;

export const FareEstimateScreen: React.FC = () => {
  const navigation = useNavigation<Nav>();
  const route = useRoute<Rt>();
  const { pickup, destination } = route.params;
  const requestRide = useRequestRide();
  const fareEstimate = useRideStore(s => s.fareEstimate);
  const selectedPaymentMethod = useRideStore(s => s.selectedPaymentMethod);
  const distanceKm = calculateDistance(pickup, destination);

  let FindingDriver = require('../../../assets/icons/finding.png');

  const handleFindDrivers = () => {
    navigation.navigate('FindingDriver', { rideId: '1' });
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      handleFindDrivers();
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.mapContainer}>
      <ProfileHeaderBar
        name={''}
        photoUrl={''}
        onPress={() => navigation.navigate('EditProfile')}
      />
      <View style={styles.mapContainer}>
        <MapViewComponent
          latitude={pickup.latitude}
          longitude={pickup.longitude}
        />
      </View>

      <Card style={styles.card} padded={false}>
        <FastImage
          source={FindingDriver}
          style={styles.image}
          resizeMode="contain"
        />
        <Text style={styles.title}>Finding Drivers</Text>
        <Text style={styles.subTitle}>
          We’re searching for available drivers near your office location.
        </Text>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  mapContainer: {
    flex: 1,
  },
  card: {
    borderRadius: radius.lg,
    padding: 20,
    paddingBottom: 40,
    position: 'absolute',
    bottom: 40,
    width: '96%',
    alignSelf: 'center',
  },

  button: {
    marginTop: hp('2%'),
  },
  image: {
    height: hp('9%'),
    width: wp('18'),
  },
  title: {
    fontFamily: fontFamily.gilroySemiBold,
    fontWeight: '600',
    fontSize: 24,
    lineHeight: 24,
    letterSpacing: -0.96,
    color: colors.textPrimary,
    marginTop: 10,
  },
  subTitle: {
    fontFamily: fontFamily.gilroyRegular,
    fontWeight: '400',
    fontSize: 12,
    lineHeight: 20,
    letterSpacing: -0.48,
    color: colors.textSecondary,
    marginTop: 10,
  },
});
