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

export const OnboardingSlide: React.FC<OnboardingSlideProps> = ({
  image,
  title,
  subtitle,
}) => (
  <View style={styles.slide}>
    <FastImage
      source={image}
      style={styles.image}
      resizeMode={FastImage.resizeMode.cover}
    />
    {/* <Text style={styles.title}>{title}</Text>
    <Text style={styles.subtitle}>{subtitle}</Text> */}
  </View>
);

const styles = StyleSheet.create({
  slide: {
    flex: 1,
  },
  image: {
    width: wp('100%'),
    height: hp('100%'),
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
