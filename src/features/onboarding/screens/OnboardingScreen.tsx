import React, { useRef, useState } from 'react';
import {
  View,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
// @ts-ignore
import Icon from 'react-native-vector-icons/MaterialIcons';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { OnboardingSlide } from '../components/OnboardingSlide';
import { PaginationDots } from '../components/PaginationDots';
import { AuthStackParamList } from '../../../types/navigation';
import { colors } from '../../../theme/colors';
import { radius } from '../../../theme/spacing';

type Nav = StackNavigationProp<AuthStackParamList, 'Onboarding'>;

const slides = [
  {
    image: require('../../../assets/images/onboarding1.png'),
    title: 'Travel Your Way\nRelax in a Luxurious Ride',
    subtitle:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy.",
  },
  {
    image: require('../../../assets/images/onboarding2.png'),
    title: 'Travel Your Way\nRelax in a Luxurious Ride',
    subtitle:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy.",
  },
  {
    image: require('../../../assets/images/onboarding3.png'),
    title: 'Are you a Rider or Driver',
    subtitle: 'Please select your type to continue',
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
      setActiveIndex(activeIndex + 1);
    } else {
      navigation.replace('Login');
    }
  };

  return (
    <View style={styles.root}>
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
      <View style={styles.bottomBar}>
        <PaginationDots total={slides.length} activeIndex={activeIndex} />
        <TouchableOpacity
          style={styles.arrowButton}
          onPress={handleNext}
          accessibilityLabel={activeIndex === slides.length - 1 ? 'Get Started' : 'Next slide'}
        >
          <Icon name="arrow-forward" size={wp('6%')} color={colors.white} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#000',
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: hp('15%'),
    backgroundColor: '#000',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: wp('7%'),
    paddingBottom: hp('3%'),
  },
  arrowButton: {
    width: wp('14%'),
    height: wp('14%'),
    borderRadius: radius.lg,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
