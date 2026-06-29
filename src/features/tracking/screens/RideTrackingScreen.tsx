import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/MaterialIcons';
import FastImage from 'react-native-fast-image';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { ScreenWrapper } from '../../../components/ScreenWrapper';
import { Card } from '../../../components/Card';
import { Button } from '../../../components/Button';
import { Avatar } from '../../../components/Avatar';
import { PaymentMethodSheet } from '../../../components/PaymentMethodSheet';
import { MapViewComponent } from '../../home/components/MapViewComponent';
import { useRideDetail } from '../../../api/hooks/useRideApi';
import { usePaymentMethods } from '../../../api/hooks/usePaymentApi';
import { useRideStore } from '../../../store/rideStore';
import { Ride, RideStatus } from '../../../types/ride';
import { PaymentMethod } from '../../../types/payment';
import { colors } from '../../../theme/colors';
import { fontFamily, fontSize } from '../../../theme/typography';
import { radius } from '../../../theme/spacing';
import { formatAddress } from '../../../utils/locationHelpers';
import { formatCurrency } from '../../../utils/formatFare';
import { MainStackParamList } from '../../../types/navigation';
import { ProfileHeaderBar } from '../../home/components/ProfileHeaderBar';

const dummyPaymentMethods: PaymentMethod[] = [
  { id: 'cash', type: 'cash', isDefault: true },
  { id: 'pm-mastercard', type: 'debit_card', brand: 'Mastercard', last4: '7742', isDefault: false },
  { id: 'pm-visa', type: 'debit_card', brand: 'Visa', last4: '7742', isDefault: false },
];

type Nav = StackNavigationProp<MainStackParamList, 'RideTracking'>;
type Rt = RouteProp<MainStackParamList, 'RideTracking'>;

const dummyRide: Ride = {
  id: 'mock-ride-id',
  status: RideStatus.DRIVER_EN_ROUTE,
  pickup: {
    latitude: 37.7749,
    longitude: -122.4194,
    label: '86th Washington Square South, New York, NY 10012, United States',
  },
  destination: {
    latitude: 37.7849,
    longitude: -122.4094,
    label: '8th Street, New York, NY 10012, United States',
  },
  fare: {
    baseFare: 4,
    distanceRate: 12,
    platformFee: 2,
    totalFare: 56,
    currency: 'USD',
  },
  driver: {
    id: 'mock-driver-id',
    name: 'Abram Mango',
    rating: 5,
    vehicleMake: 'Toyota',
    vehicleModel: 'Corolla',
    vehicleColor: 'White',
    licensePlate: 'ABC 1234',
    etaMinutes: 2,
  },
  distanceKm: 0.2,
  durationMinutes: 2,
  createdAt: new Date().toISOString(),
};

export const RideTrackingScreen: React.FC = () => {
  const navigation = useNavigation<Nav>();
  const route = useRoute<Rt>();
  const { data } = useRideDetail(route.params.rideId);
  const { data: paymentMethods } = usePaymentMethods();
  const ride = data || dummyRide;
  const [status, setStatus] = useState<RideStatus>(ride.status);
  const [paymentSheetVisible, setPaymentSheetVisible] = useState(false);
  const selectedPaymentMethod = useRideStore((s) => s.selectedPaymentMethod);
  const setSelectedPaymentMethod = useRideStore((s) => s.setSelectedPaymentMethod);

  useEffect(() => {
    const timer = setTimeout(() => {
      setStatus(RideStatus.RIDE_COMPLETED);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.mapContainer}>
      <ProfileHeaderBar
        name={'User Name'}
        photoUrl={''}
        onPress={() => navigation.navigate('EditProfile')}
      />
      <View style={styles.mapContainer}>
        <MapViewComponent latitude={37.7749} longitude={-122.4194} />
      </View>

      <Card style={styles.card} padded={false}>
        <View style={styles.handle} />

        <View style={styles.content}>
          <Text style={styles.heading}>
            {status === RideStatus.RIDE_COMPLETED ? 'Arrived to the destination' : 'Ride Details'}
          </Text>

          <View style={styles.box}>
            {ride.driver ? (
              <View style={styles.driverRow}>
                <Avatar
                  uri={ride.driver.photoUrl}
                  name={ride.driver.name}
                  size="sm"
                />
                <View style={styles.driverInfo}>
                  <Text style={styles.driverName}>{ride.driver.name}</Text>
                  <View style={styles.starsRow}>
                    {[1, 2, 3, 4, 5].map(value => (
                      <Icon
                        key={value}
                        name={
                          value <= Math.round(ride.driver!.rating)
                            ? 'star'
                            : 'star-border'
                        }
                        size={wp('3.5%')}
                        color={colors.primary}
                      />
                    ))}
                  </View>
                </View>
                <TouchableOpacity
                  style={styles.actionButton}
                  accessibilityLabel="Call driver"
                >
                  <Icon name="call" size={wp('5%')} color={colors.white} />
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.actionButton}
                  accessibilityLabel="Chat with driver"
                  onPress={() =>
                    navigation.navigate('Chat', {
                      rideId: ride.id,
                      driverName: ride.driver?.name || 'Driver',
                    })
                  }
                >
                  <Icon
                    name="chat-bubble"
                    size={wp('4.5%')}
                    color={colors.white}
                  />
                </TouchableOpacity>
              </View>
            ) : null}

            <View style={styles.addressRow}>
              <View style={styles.pinColumn}>
                <Icon name="place" size={wp('4.5%')} color={colors.primary} />
                <View style={styles.dottedLine} />
              </View>
              <View style={styles.addressTextColumn}>
                <Text style={styles.addressLabel}>From</Text>
                <Text style={styles.addressText} numberOfLines={2}>
                  {formatAddress(ride.pickup)}
                </Text>
              </View>
            </View>

            <View style={styles.addressRow}>
              <View style={styles.pinColumn}>
                <Icon
                  name="place"
                  size={wp('4.5%')}
                  color={colors.accentYellow}
                />
              </View>
              <View style={styles.addressTextColumn}>
                <Text style={styles.addressLabel}>Where</Text>
                <Text style={styles.addressText} numberOfLines={2}>
                  {formatAddress(ride.destination)}
                </Text>
              </View>
            </View>

            {status === RideStatus.RIDE_COMPLETED ? (
              <Button
                title="Pay $2.50"
                onPress={() => setPaymentSheetVisible(true)}
                style={styles.payButton}
              />
            ) : (
              <View style={styles.statsRow}>
                <FastImage
                  source={require('../../../assets/icons/Car.png')}
                  style={styles.carIcon}
                  resizeMode="contain"
                />
                <View style={styles.statColumn}>
                  <Text style={styles.statLabel}>DISTANCE</Text>
                  <Text style={styles.statValue}>
                    {ride.distanceKm.toFixed(1)} km
                  </Text>
                </View>
                <View style={styles.statColumn}>
                  <Text style={styles.statLabel}>TIME</Text>
                  <Text style={styles.statValue}>{ride.durationMinutes} min</Text>
                </View>
                <View style={styles.statColumn}>
                  <Text style={styles.statLabel}>PRICE</Text>
                  <Text style={styles.statValue}>
                    {formatCurrency(ride.fare.totalFare, ride.fare.currency)}
                  </Text>
                </View>
              </View>
            )}
          </View>
        </View>
      </Card>

      <PaymentMethodSheet
        visible={paymentSheetVisible}
        onClose={() => setPaymentSheetVisible(false)}
        methods={paymentMethods || dummyPaymentMethods}
        selectedId={selectedPaymentMethod?.id}
        onSelect={(method) => {
          setSelectedPaymentMethod(method);
          setPaymentSheetVisible(false);
          navigation.navigate('RideComplete', { ride: { ...ride, paymentMethodId: method.id } });
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
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
  box: {
    backgroundColor: colors.backgroundSecondary,
    borderRadius: radius.md,
    padding: wp('4%'),
  },
  driverRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: hp('1.5%'),
  },
  driverInfo: {
    flex: 1,
    marginLeft: wp('3%'),
  },
  driverName: {
    fontFamily: fontFamily.semiBold,
    fontWeight: '600',
    fontSize: 14,
    lineHeight: 14,
    letterSpacing: 0,
    color: colors.textPrimary,
  },
  starsRow: {
    flexDirection: 'row',
    marginTop: hp('0.3%'),
  },
  actionButton: {
    width: wp('10%'),
    height: wp('10%'),
    borderRadius: radius.md,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: wp('2%'),
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
  },
  carIcon: {
    width: wp('16%'),
    height: hp('4%'),
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
  payButton: {
    marginTop: hp('0.5%'),
  },
});
