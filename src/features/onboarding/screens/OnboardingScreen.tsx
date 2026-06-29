import React, { useRef, useState } from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { ScreenWrapper } from '../../../components/ScreenWrapper';
import { Button } from '../../../components/Button';
import { OnboardingSlide } from '../components/OnboardingSlide';
import { PaginationDots } from '../components/PaginationDots';
import { AuthStackParamList } from '../../../types/navigation';

type Nav = StackNavigationProp<AuthStackParamList, 'Onboarding'>;

const slides = [
  {
    image: require('../../../assets/images/onboarding1.png'),
    title: 'Ride With Ease',
    subtitle: 'Book a ride in seconds and get matched with nearby drivers.',
  },
  {
    image: require('../../../assets/images/onboarding2.png'),
    title: 'Track In Real Time',
    subtitle: 'Watch your driver arrive and follow your trip live on the map.',
  },
  {
    image: require('../../../assets/images/onboarding3.png'),
    title: 'Earn Rewards',
    subtitle: 'Get loyalty discounts the more you ride with us.',
  },
];

export const OnboardingScreen: React.FC = () => {
  const navigation = useNavigation<Nav>();
  const listRef = useRef<FlatList>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const index = Math.round(e.nativeEvent.contentOffset.x / wp('100%'));
    setActiveIndex(index);
  };

  const handleNext = () => {
    if (activeIndex < slides.length - 1) {
      listRef.current?.scrollToIndex({ index: activeIndex + 1 });
    } else {
      navigation.replace('Login');
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        ref={listRef}
        data={slides}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={(_, i) => String(i)}
        onMomentumScrollEnd={handleScroll}
        renderItem={({ item }) => (
          <OnboardingSlide
            image={item.image}
            title={item.title}
            subtitle={item.subtitle}
          />
        )}
      />
      <View style={styles.footer}>
        <PaginationDots total={slides.length} activeIndex={activeIndex} />
        <View style={styles.buttonRow}>
          <Button
            title="Skip"
            variant="ghost"
            onPress={() => navigation.replace('Login')}
            style={styles.skipButton}
          />
          <Button
            title={activeIndex === slides.length - 1 ? 'Get Started' : 'Next'}
            onPress={handleNext}
            style={styles.nextButton}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    paddingHorizontal: wp('6%'),
    paddingBottom: hp('3%'),
    position: 'absolute',
    width: '100%',
    bottom: 0,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: hp('3%'),
  },
  skipButton: {
    flex: 1,
    marginRight: wp('2%'),
  },
  nextButton: {
    flex: 2,
  },
});
