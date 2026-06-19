import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import FastImage from 'react-native-fast-image';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { colors } from '../../../theme/colors';
import { fontFamily, fontSize } from '../../../theme/typography';

interface OnboardingSlideProps {
  image: number;
  title: string;
  subtitle: string;
}

export const OnboardingSlide: React.FC<OnboardingSlideProps> = ({ image, title, subtitle }) => (
  <View style={styles.slide}>
    <FastImage source={image} style={styles.image} resizeMode={FastImage.resizeMode.contain} />
    <Text style={styles.title}>{title}</Text>
    <Text style={styles.subtitle}>{subtitle}</Text>
  </View>
);

const styles = StyleSheet.create({
  slide: {
    width: wp('100%'),
    alignItems: 'center',
    paddingHorizontal: wp('8%'),
  },
  image: {
    width: wp('80%'),
    height: hp('35%'),
    marginBottom: hp('4%'),
  },
  title: {
    fontFamily: fontFamily.bold,
    fontSize: fontSize.xxl,
    color: colors.textPrimary,
    textAlign: 'center',
    marginBottom: hp('1.5%'),
  },
  subtitle: {
    fontFamily: fontFamily.regular,
    fontSize: fontSize.md,
    color: colors.textSecondary,
    textAlign: 'center',
  },
});
