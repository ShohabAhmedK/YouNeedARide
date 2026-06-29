import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import Animated, { useSharedValue, useAnimatedStyle, withRepeat, withTiming } from 'react-native-reanimated';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { ScreenWrapper } from '../../../components/ScreenWrapper';
import { Button } from '../../../components/Button';
import { MapViewComponent } from '../../home/components/MapViewComponent';
import { useCancelRide } from '../../../api/hooks/useRideApi';
import { colors } from '../../../theme/colors';
import { fontFamily, fontSize } from '../../../theme/typography';
import { MainStackParamList } from '../../../types/navigation';

type Nav = StackNavigationProp<MainStackParamList, 'FindingDriver'>;
type Rt = RouteProp<MainStackParamList, 'FindingDriver'>;

export const FindingDriverScreen: React.FC = () => {
  const navigation = useNavigation<Nav>();
  const route = useRoute<Rt>();
  const cancelRide = useCancelRide();
  const scale = useSharedValue(1);

  const pulseStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  useEffect(() => {
    scale.value = withRepeat(withTiming(1.4, { duration: 900 }), -1, true);

    const timer = setTimeout(() => {
      navigation.replace('RideTracking', { rideId: route.params.rideId });
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  const handleCancel = () => {
    cancelRide.mutate(route.params.rideId, {
      onSuccess: () => navigation.goBack(),
    });
  };

  return (
    <ScreenWrapper>
      <View style={styles.mapContainer}>
        <MapViewComponent latitude={37.7749} longitude={-122.4194} />
        <View style={styles.overlay}>
          <Animated.View style={[styles.pulse, pulseStyle]} />
          <View style={styles.centerDot} />
        </View>
      </View>
      <View style={styles.footer}>
        <Text style={styles.title}>Finding your driver</Text>
        <Text style={styles.subtitle}>This usually takes less than a minute</Text>
        <Button title="Cancel Request" variant="outline" onPress={handleCancel} loading={cancelRide.isPending} style={styles.button} />
      </View>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  mapContainer: {
    flex: 1,
  },
  overlay: {
    position: 'absolute',
    top: '45%',
    left: '45%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  pulse: {
    position: 'absolute',
    width: wp('14%'),
    height: wp('14%'),
    borderRadius: wp('7%'),
    backgroundColor: colors.primaryLight,
  },
  centerDot: {
    width: wp('4%'),
    height: wp('4%'),
    borderRadius: wp('2%'),
    backgroundColor: colors.primary,
  },
  footer: {
    paddingHorizontal: wp('6%'),
    paddingVertical: hp('3%'),
    alignItems: 'center',
  },
  title: {
    fontFamily: fontFamily.bold,
    fontSize: fontSize.lg,
    color: colors.textPrimary,
  },
  subtitle: {
    fontFamily: fontFamily.regular,
    fontSize: fontSize.sm,
    color: colors.textSecondary,
    marginTop: hp('0.5%'),
    marginBottom: hp('2%'),
  },
  button: {
    width: '100%',
  },
});
