import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { ScreenWrapper } from '../../../components/ScreenWrapper';
import { Button } from '../../../components/Button';
import { useRideStore } from '../../../store/rideStore';
import { colors } from '../../../theme/colors';
import { fontFamily, fontSize } from '../../../theme/typography';
import { radius } from '../../../theme/spacing';
import { heavyShadow } from '../../../theme/shadows';
import { LOYALTY_MILESTONE_RESET } from '../../../constants/config';
import { formatAddress } from '../../../utils/locationHelpers';
import { formatCurrency } from '../../../utils/formatFare';
import { MainStackParamList } from '../../../types/navigation';

type Nav = StackNavigationProp<MainStackParamList, 'RideComplete'>;
type Rt = RouteProp<MainStackParamList, 'RideComplete'>;

const RIDE_COUNT = 73;

export const RideCompleteScreen: React.FC = () => {
  const navigation = useNavigation<Nav>();
  const route = useRoute<Rt>();
  const { ride } = route.params;
  const clearRide = useRideStore((s) => s.clearRide);
  const scale = useSharedValue(0);
  const [rating, setRating] = useState(0);
  const progress = Math.min(RIDE_COUNT / LOYALTY_MILESTONE_RESET, 1);

  useEffect(() => {
    scale.value = withSpring(1);
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handleDone = () => {
    clearRide();
    navigation.navigate('HomeMapScreen');
  };

  return (
    <ScreenWrapper>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()} accessibilityLabel="Go back">
        <Icon name="arrow-back" size={wp('5.5%')} color={colors.textPrimary} />
      </TouchableOpacity>

      <View style={styles.container}>
        <Animated.View style={[styles.checkCircle, animatedStyle]}>
          <Icon name="check" size={wp('8%')} color={colors.white} />
        </Animated.View>

        <View style={styles.ticket}>
          <View style={[styles.notch, styles.notchLeft]} />
          <View style={[styles.notch, styles.notchRight]} />

          <View style={styles.titlePill}>
            <Text style={styles.titleText}>Ride Completed</Text>
          </View>

          <View style={styles.dashedLine} />

          <Text style={styles.totalLabel}>Total Payment</Text>
          <Text style={styles.totalValue}>{formatCurrency(ride.fare.totalFare, ride.fare.currency)}</Text>

          <View style={styles.milestoneBox}>
            <View style={styles.milestoneTextColumn}>
              <Text style={styles.milestoneLabel}>Milestone Progress</Text>
              <Text style={styles.milestoneValue}>{RIDE_COUNT}/{LOYALTY_MILESTONE_RESET} Rides</Text>
              <View style={styles.track}>
                <View style={[styles.fill, { width: `${progress * 100}%` as `${number}%` }]} />
              </View>
            </View>
            <Icon name="emoji-events" size={wp('7%')} color={colors.primary} />
          </View>

          <View style={styles.routeBox}>
            <Text style={styles.routeLabel}>Route</Text>
            <Text style={styles.addressLabel}>From</Text>
            <Text style={styles.addressText} numberOfLines={2}>{formatAddress(ride.pickup)}</Text>
            <Text style={[styles.addressLabel, styles.whereLabel]}>Where</Text>
            <Text style={styles.addressText} numberOfLines={2}>{formatAddress(ride.destination)}</Text>
          </View>

          <View style={styles.dashedLine} />

          <Text style={styles.summaryHeading}>Summary</Text>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Fare</Text>
            <Text style={styles.summaryValue}>{formatCurrency(ride.fare.baseFare + ride.fare.distanceRate)}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Platform Fee</Text>
            <Text style={styles.summaryValue}>{formatCurrency(ride.fare.platformFee)}</Text>
          </View>
          <View style={styles.summaryDivider} />
          <View style={styles.summaryRow}>
            <Text style={styles.summaryTotalLabel}>Total</Text>
            <Text style={styles.summaryTotalValue}>{formatCurrency(ride.fare.totalFare, ride.fare.currency)}</Text>
          </View>

          <View style={styles.starsRow}>
            {[1, 2, 3, 4, 5].map((value) => (
              <TouchableOpacity key={value} onPress={() => setRating(value)} accessibilityLabel={value + ' star'}>
                <Icon
                  name={value <= rating ? 'star' : 'star-border'}
                  size={wp('8%')}
                  color={value <= rating ? colors.accentYellow : colors.border}
                  style={styles.star}
                />
              </TouchableOpacity>
            ))}
          </View>
        </View>


      </View>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  backButton: {
    position: 'absolute',
    top: hp('5%'),
    left: wp('5%'),
    width: wp('11%'),
    height: wp('11%'),
    borderRadius: radius.round,
    backgroundColor: colors.backgroundSecondary,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2,
  },
  container: {
    flex: 1,
    paddingHorizontal: wp('6%'),
    paddingTop: hp('8%'),
    alignItems: 'center',
  },
  checkCircle: {
    position: 'absolute',
    top: hp('4%'),
    width: wp('16%'),
    height: wp('16%'),
    borderRadius: radius.round,
    backgroundColor: colors.success,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 4,
    borderColor: colors.white,
    zIndex: 2,
    ...heavyShadow,
  },
  ticket: {
    width: '100%',
    backgroundColor: colors.white,
    borderRadius: radius.xl,
    paddingHorizontal: wp('5%'),
    paddingTop: hp('4%'),
    paddingBottom: hp('2%'),
    alignItems: 'center',
    ...heavyShadow,
  },
  notch: {
    position: 'absolute',
    top: '38%',
    width: wp('6%'),
    height: wp('6%'),
    borderRadius: radius.round,
    backgroundColor: colors.background,
  },
  notchLeft: {
    left: -wp('3%'),
  },
  notchRight: {
    right: -wp('3%'),
  },
  titlePill: {
    width: '100%',
    backgroundColor: colors.backgroundSecondary,
    borderRadius: radius.md,
    paddingVertical: hp('1.8%'),
    alignItems: 'center',
  },
  titleText: {
    fontFamily: fontFamily.bold,
    fontSize: fontSize.xl,
    color: colors.textPrimary,
  },
  dashedLine: {
    width: '100%',
    borderTopWidth: 1,
    borderStyle: 'dashed',
    borderColor: colors.border,
    marginVertical: hp('1%'),
  },
  totalLabel: {
    fontFamily: fontFamily.regular,
    fontSize: fontSize.sm,
    color: colors.textSecondary,
  },
  totalValue: {
    fontFamily: fontFamily.bold,
    fontSize: fontSize.display,
    color: colors.textPrimary,
    marginTop: hp('0.5%'),
    marginBottom: hp('2%'),
  },
  milestoneBox: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    padding: wp('4%'),
    marginBottom: hp('0.5%'),
  },
  milestoneTextColumn: {
    flex: 1,
    marginRight: wp('3%'),
  },
  milestoneLabel: {
    fontFamily: fontFamily.regular,
    fontSize: fontSize.sm,
    color: colors.textSecondary,
  },
  milestoneValue: {
    fontFamily: fontFamily.bold,
    fontSize: fontSize.lg,
    color: colors.textPrimary,
    marginTop: hp('0.3%'),
    marginBottom: hp('1%'),
  },
  track: {
    height: hp('1%'),
    backgroundColor: colors.border,
    borderRadius: hp('0.5%'),
    overflow: 'hidden',
  },
  fill: {
    height: '100%',
    backgroundColor: colors.primary,
  },
  routeBox: {
    width: '100%',
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    padding: wp('4%'),
  },
  routeLabel: {
    fontFamily: fontFamily.regular,
    fontSize: fontSize.sm,
    color: colors.textSecondary,
    marginBottom: hp('0.5%'),
  },
  addressLabel: {
    fontFamily: fontFamily.regular,
    fontSize: fontSize.xs,
    color: colors.textHint,
  },
  whereLabel: {
    marginTop: hp('1.2%'),
  },
  addressText: {
    fontFamily: fontFamily.medium,
    fontSize: fontSize.sm,
    color: colors.textPrimary,
    marginTop: hp('0.2%'),
  },
  summaryHeading: {
    width: '100%',
    fontFamily: fontFamily.bold,
    fontSize: fontSize.lg,
    color: colors.textPrimary,
    marginBottom: hp('1%'),
  },
  summaryRow: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: hp('0.6%'),
  },
  summaryLabel: {
    fontFamily: fontFamily.regular,
    fontSize: fontSize.sm,
    color: colors.textSecondary,
  },
  summaryValue: {
    fontFamily: fontFamily.medium,
    fontSize: fontSize.sm,
    color: colors.textSecondary,
  },
  summaryDivider: {
    width: '100%',
    height: 1,
    backgroundColor: colors.border,
    marginVertical: hp('0.8%'),
  },
  summaryTotalLabel: {
    fontFamily: fontFamily.bold,
    fontSize: fontSize.md,
    color: colors.textPrimary,
  },
  summaryTotalValue: {
    fontFamily: fontFamily.bold,
    fontSize: fontSize.md,
    color: colors.textPrimary,
  },
  starsRow: {
    flexDirection: 'row',
    marginTop: hp('2.5%'),
  },
  star: {
    marginHorizontal: wp('1%'),
  },
  rateButton: {
    width: '100%',
    marginTop: hp('2.5%'),
  },
  doneButton: {
    width: '100%',
    marginTop: hp('1.5%'),
  },
});
