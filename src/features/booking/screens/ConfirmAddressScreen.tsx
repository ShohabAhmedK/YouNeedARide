import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { ScreenWrapper } from '../../../components/ScreenWrapper';
import { Button } from '../../../components/Button';
import { Card } from '../../../components/Card';
import { PickupNotesInput } from '../components/PickupNotesInput';
import { MapViewComponent } from '../../home/components/MapViewComponent';
import { useFareEstimate } from '../../../api/hooks/useRideApi';
import { useRideStore } from '../../../store/rideStore';
import { colors } from '../../../theme/colors';
import { fontFamily, fontSize } from '../../../theme/typography';
import { radius } from '../../../theme/spacing';
import {
  formatAddress,
  calculateDistance,
} from '../../../utils/locationHelpers';
import { formatCurrency } from '../../../utils/formatFare';
import { MainStackParamList } from '../../../types/navigation';
import FastImage from 'react-native-fast-image';
import { ProfileHeaderBar } from '../../home/components/ProfileHeaderBar';

type Nav = StackNavigationProp<MainStackParamList, 'ConfirmAddress'>;
type Rt = RouteProp<MainStackParamList, 'ConfirmAddress'>;

export const ConfirmAddressScreen: React.FC = () => {
  const navigation = useNavigation<Nav>();
  const route = useRoute<Rt>();
  const { pickup, destination } = route.params;
  const [notes, setNotes] = useState('');
  const fareEstimateMutation = useFareEstimate();
  const fareEstimate = useRideStore(s => s.fareEstimate);
  const setFareEstimate = useRideStore(s => s.setFareEstimate);
  const selectedPaymentMethod = useRideStore(s => s.selectedPaymentMethod);
  const distanceKm = calculateDistance(pickup, destination);

  let paymentIcon = require('../../../assets/icons/PaymentIcons.png');
  let CarIcon = require('../../../assets/icons/Car.png');

  useEffect(() => {
    fareEstimateMutation.mutate(
      { pickup, destination },
      {
        onSuccess: data => setFareEstimate(data),
      },
    );
  }, []);

  const handleContinue = () => {
    navigation.navigate('FareEstimate', {
      pickup: { ...pickup, notes },
      destination,
    });
  };

  return (
    <View style={styles.container}>
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
        <View style={styles.handle} />

        <View style={styles.content}>
          <Text style={styles.heading}>Confirm Address</Text>

          <View style={styles.addressBox}>
            <View style={styles.addressRow}>
              <View style={styles.pinColumn}>
                <Icon name="place" size={wp('6%')} color={colors.primary} />
                <View style={styles.dottedLine} />
              </View>

              <View style={styles.addressTextColumn}>
                <Text style={styles.addressLabel}>From</Text>
                <Text style={styles.addressText} numberOfLines={2}>
                  86th Washington Square South, New York, NY 10012, United
                  States
                </Text>
              </View>
            </View>

            <View style={styles.addressRow}>
              <View style={styles.pinColumn}>
                <Icon name="place" size={wp('6%')} color={colors.primary} />
              </View>
              <View style={styles.addressTextColumn}>
                <Text style={styles.addressLabel}>Where</Text>
                <Text style={styles.addressText} numberOfLines={2}>
                  8th Street, New York, NY 10012, United States{' '}
                </Text>
              </View>
            </View>

            <View style={styles.statsRow}>
              <FastImage
                source={CarIcon}
                style={{ height: 40, width: 70 }}
                resizeMode="contain"
              />

              <View style={styles.statColumn}>
                <Text style={styles.statLabel}>DISTANCE</Text>
                <Text style={styles.statValue}>{distanceKm.toFixed(1)} km</Text>
              </View>
              <View style={styles.statColumn}>
                <Text style={styles.statLabel}>TIME</Text>
                <Text style={styles.statValue}>
                  {Math.round(distanceKm * 2.5)} min
                </Text>
              </View>
              <View style={styles.statColumn}>
                <Text style={styles.statLabel}>PRICE</Text>
                <Text style={styles.statValue}>$56.00</Text>
              </View>
            </View>
          </View>

          <View style={styles.paymentRow}>
            <FastImage
              source={paymentIcon}
              style={{ height: 30, width: 45 }}
              resizeMode="contain"
            />
            <Button
              title="Find Drivers"
              onPress={handleContinue}
              loading={fareEstimateMutation.isPending}
              style={styles.button}
            />
          </View>
        </View>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mapContainer: {
    flex: 1,
  },
  card: {
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    borderTopLeftRadius: radius.xl,
    borderTopRightRadius: radius.xl,
  },
  handle: {
    alignSelf: 'center',
    width: wp('12%'),
    height: hp('0.5%'),
    borderRadius: radius.round,
    backgroundColor: colors.border,
    marginTop: hp('1.2%'),
  },
  content: {
    paddingHorizontal: wp('3%'),
    paddingTop: hp('1.5%'),
    paddingBottom: hp('2%'),
  },
  heading: {
    fontFamily: fontFamily.bold,
    fontWeight: '700',
    fontSize: 20,
    lineHeight: 20,
    letterSpacing: -0.8,
    color: colors.textPrimary,
    marginBottom: hp('1.5%'),
  },
  addressBox: {
    backgroundColor: colors.backgroundSecondary,
    borderRadius: radius.md,
    padding: wp('3%'),
    marginBottom: hp('1.5%'),
  },
  addressRow: {
    flexDirection: 'row',
  },
  pinColumn: {
    alignItems: 'center',
    width: wp('6%'),
  },
  dottedLine: {
    flex: 1,
    minHeight: hp('1.5%'),
    borderLeftWidth: 2,
    borderStyle: 'dotted',
    borderColor: colors.textSecondary,
  },
  addressTextColumn: {
    flex: 1,
    marginLeft: wp('1%'),
    paddingBottom: hp('1.5%'),
  },
  addressLabel: {
    fontFamily: fontFamily.regular,
    fontSize: fontSize.xs,
    color: colors.textHint,
  },
  addressText: {
    fontFamily: fontFamily.gilroyRegular,
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 14,
    letterSpacing: -0.56,
    color: colors.textPrimary,
    marginTop: hp('0.2%'),
  },
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: hp('0.5%'),
    marginBottom: hp('1.5%'),
  },
  statColumn: {
    flex: 1,
    alignItems: 'center',
  },
  statLabel: {
    fontFamily: fontFamily.semiBold,
    fontWeight: '600',
    fontSize: 13,
    lineHeight: 13,
    letterSpacing: 0,
    textAlign: 'center',
    textTransform: 'uppercase',
    color: colors.textHint,
  },
  statValue: {
    fontFamily: fontFamily.bold,
    fontWeight: '700',
    fontSize: 15,
    lineHeight: 15,
    letterSpacing: 0,
    textAlign: 'center',
    color: colors.textPrimary,
    marginTop: hp('0.3%'),
  },
  paymentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: hp('1.5%'),
  },
  paymentText: {
    fontFamily: fontFamily.medium,
    fontSize: fontSize.sm,
    color: colors.textSecondary,
    marginLeft: wp('2%'),
  },
  button: {
    width: wp('75'),
  },
});
