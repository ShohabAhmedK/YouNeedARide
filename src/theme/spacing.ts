import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export const spacing = {
  xs: hp('0.5%'),
  sm: hp('1%'),
  md: hp('2%'),
  lg: hp('3%'),
  xl: hp('4%'),
  xxl: hp('6%'),
};

export const horizontalSpacing = {
  xs: wp('1%'),
  sm: wp('2%'),
  md: wp('4%'),
  lg: wp('6%'),
  xl: wp('8%'),
};

export const radius = {
  sm: wp('2%'),
  md: wp('3%'),
  lg: wp('5%'),
  xl: wp('8%'),
  round: wp('50%'),
};
