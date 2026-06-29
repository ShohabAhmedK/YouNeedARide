import { widthPercentageToDP as wp } from 'react-native-responsive-screen';

export const fontFamily = {
  regular: 'Poppins-Regular',
  medium: 'Poppins-Medium',
  semiBold: 'Poppins-SemiBold',
  bold: 'Poppins-Bold',
  gilroyRegular: 'Gilroy-Regular',
  gilroyMedium: 'Gilroy-Medium',
  gilroySemiBold: 'Gilroy-SemiBold',
};

export const fontSize = {
  xs: wp('2.8%'),
  sm: wp('3.2%'),
  md: wp('3.6%'),
  lg: wp('4%'),
  xl: wp('4.6%'),
  xxl: wp('5.5%'),
  xxxl: wp('7%'),
  display: wp('9%'),
};

export const fontWeight = {
  regular: '400' as const,
  medium: '500' as const,
  semiBold: '600' as const,
  bold: '700' as const,
};

export const typography = { fontFamily, fontSize, fontWeight };
