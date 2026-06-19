import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { ScreenWrapper } from '../../../components/ScreenWrapper';
import { Input } from '../../../components/Input';
import { Button } from '../../../components/Button';
import { StarRating } from '../components/StarRating';
import { useRateDriver } from '../../../api/hooks/useRideApi';
import { colors } from '../../../theme/colors';
import { fontFamily, fontSize } from '../../../theme/typography';
import { MainStackParamList } from '../../../types/navigation';

type Nav = StackNavigationProp<MainStackParamList, 'RateDriver'>;
type Rt = RouteProp<MainStackParamList, 'RateDriver'>;

export const RateDriverScreen: React.FC = () => {
  const navigation = useNavigation<Nav>();
  const route = useRoute<Rt>();
  const rateDriver = useRateDriver();
  const [rating, setRating] = useState(5);
  const [review, setReview] = useState('');

  const handleSubmit = () => {
    rateDriver.mutate(
      { rideId: route.params.rideId, rating, review },
      { onSuccess: () => navigation.navigate('BottomTabs') },
    );
  };

  return (
    <ScreenWrapper>
      <View style={styles.container}>
        <Text style={styles.title}>Rate Your Driver</Text>
        <Text style={styles.subtitle}>How was your trip?</Text>
        <StarRating rating={rating} onChange={setRating} />
        <Input
          label="Feedback (optional)"
          placeholder="Tell us about your experience"
          value={review}
          onChangeText={setReview}
          multiline
          style={styles.reviewInput}
        />
        <Button title="Submit Rating" onPress={handleSubmit} loading={rateDriver.isPending} style={styles.button} />
      </View>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: wp('6%'),
    paddingTop: hp('6%'),
  },
  title: {
    fontFamily: fontFamily.bold,
    fontSize: fontSize.xl,
    color: colors.textPrimary,
    textAlign: 'center',
  },
  subtitle: {
    fontFamily: fontFamily.regular,
    fontSize: fontSize.sm,
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: hp('3%'),
  },
  reviewInput: {
    height: hp('12%'),
    textAlignVertical: 'top',
  },
  button: {
    marginTop: hp('2%'),
  },
});
