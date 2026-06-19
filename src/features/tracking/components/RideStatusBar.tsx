import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { fontFamily, fontSize } from '../../../theme/typography';
import { radius } from '../../../theme/spacing';
import { colors } from '../../../theme/colors';
import { RideStatus } from '../../../types/ride';
import { rideStatusLabel, rideStatusColor } from '../../../constants/rideStatus';

interface RideStatusBarProps {
  status: RideStatus;
}

export const RideStatusBar: React.FC<RideStatusBarProps> = ({ status }) => (
  <View style={[styles.bar, { backgroundColor: rideStatusColor[status] + '20' }]}>
    <View style={[styles.dot, { backgroundColor: rideStatusColor[status] }]} />
    <Text style={[styles.text, { color: rideStatusColor[status] }]}>{rideStatusLabel[status]}</Text>
  </View>
);

const styles = StyleSheet.create({
  bar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: wp('4%'),
    paddingVertical: hp('1%'),
    borderRadius: radius.md,
    alignSelf: 'flex-start',
  },
  dot: {
    width: wp('2%'),
    height: wp('2%'),
    borderRadius: wp('1%'),
    marginRight: wp('2%'),
  },
  text: {
    fontFamily: fontFamily.semiBold,
    fontSize: fontSize.sm,
  },
});
