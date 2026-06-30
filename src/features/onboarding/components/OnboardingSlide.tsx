import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import FastImage from 'react-native-fast-image';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { colors } from '../../../theme/colors';
import { fontFamily } from '../../../theme/typography';

interface OnboardingSlideProps {
  image: number;
  title: string;
  subtitle: string;
}

export const OnboardingSlide: React.FC<OnboardingSlideProps> = ({
  image,
  title,
  subtitle,
}) => (
  <View style={styles.slide}>
    <FastImage
      source={image}
      style={StyleSheet.absoluteFill}
      resizeMode={FastImage.resizeMode.cover}
    />
    <View style={styles.textBlock}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtitle}>{subtitle}</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  slide: {
    width: wp('100%'),
    height: hp('100%'),
  },
  textBlock: {
    position: 'absolute',
    bottom: hp('17%'),
    left: 0,
    right: 0,
    paddingHorizontal: wp('6%'),
  },
  title: {
    fontFamily: fontFamily.bold,
    fontSize: wp('7%'),
    color: colors.white,
    marginBottom: hp('1.5%'),
    textShadowColor: 'rgba(0,0,0,0.4)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 4,
  },
  subtitle: {
    fontFamily: fontFamily.regular,
    fontSize: wp('3.8%'),
    color: colors.white,
    lineHeight: wp('5.5%'),
    opacity: 0.88,
    textShadowColor: 'rgba(0,0,0,0.4)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 4,
  },
});
