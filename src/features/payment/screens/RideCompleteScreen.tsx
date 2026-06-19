import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';
import { useEffect } from 'react';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { ScreenWrapper } from '../../../components/ScreenWrapper';
import { Button } from '../../../components/Button';
import { ReceiptSummary } from '../components/ReceiptSummary';
import { RewardProgressBar } from '../../home/components/RewardProgressBar';
import { useRideStore } from '../../../store/rideStore';
import { colors } from '../../../theme/colors';
import { fontFamily, fontSize } from '../../../theme/typography';
import { MainStackParamList } from '../../../types/navigation';

type Nav = StackNavigationProp<MainStackParamList, 'RideComplete'>;
type Rt = RouteProp<MainStackParamList, 'RideComplete'>;

export const RideCompleteScreen: React.FC = () => {
  const navigation = useNavigation<Nav>();
  const route = useRoute<Rt>();
  const { ride } = route.params;
  const clearRide = useRideStore((s) => s.clearRide);
  const scale = useSharedValue(0);

  useEffect(() => {
    scale.value = withSpring(1);
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handleDone = () => {
    clearRide();
    navigation.navigate('BottomTabs');
  };

  return (
    <ScreenWrapper>
      <View style={styles.container}>
        <Animated.View style={[styles.checkCircle, animatedStyle]}>
          <Icon name="check" size={wp('10%')} color={colors.white} />
        </Animated.View>
        <Text style={styles.title}>Ride Completed</Text>
        <ReceiptSummary fare={ride.fare} />
        <View style={styles.rewardSpacer}>
          <RewardProgressBar rideCount={73} />
        </View>
        <Button title="Rate Driver" onPress={() => navigation.navigate('RateDriver', { rideId: ride.id })} style={styles.rateButton} />
        <Button title="Done" variant="outline" onPress={handleDone} />
      </View>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: wp('6%'),
    paddingTop: hp('6%'),
    alignItems: 'center',
  },
  checkCircle: {
    width: wp('20%'),
    height: wp('20%'),
    borderRadius: wp('10%'),
    backgroundColor: colors.success,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: hp('2%'),
  },
  title: {
    fontFamily: fontFamily.bold,
    fontSize: fontSize.xl,
    color: colors.textPrimary,
    marginBottom: hp('3%'),
  },
  rewardSpacer: {
    width: '100%',
    marginVertical: hp('3%'),
  },
  rateButton: {
    width: '100%',
    marginBottom: hp('1.5%'),
  },
});
