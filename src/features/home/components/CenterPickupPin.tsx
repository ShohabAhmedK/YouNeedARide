import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { colors } from '../../../theme/colors';
import { fontFamily, fontSize } from '../../../theme/typography';
import { radius } from '../../../theme/spacing';

interface CenterPickupPinProps {
  address: string;
  onPress?: () => void;
}

export const CenterPickupPin: React.FC<CenterPickupPinProps> = ({ address, onPress }) => (
  <View style={styles.container} pointerEvents="box-none">
    <TouchableOpacity style={styles.tooltip} onPress={onPress} accessibilityLabel="Where from?">
      <View>
        <Text style={styles.tooltipLabel}>Where from?</Text>
        <Text style={styles.tooltipAddress} numberOfLines={1}>{address}</Text>
      </View>
      <Icon name="chevron-right" size={wp('6%')} color={colors.white} />
    </TouchableOpacity>
    <View style={styles.pin}>
      <Icon name="person" size={wp('6%')} color={colors.textPrimary} />
    </View>
    <View style={styles.stem} />
  </View>
);

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: '36%',
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  tooltip: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.textPrimary,
    borderRadius: radius.md,
    paddingHorizontal: wp('4%'),
    paddingVertical: hp('1.2%'),
    minWidth: wp('55%'),
    marginBottom: hp('1%'),
  },
  tooltipLabel: {
    fontFamily: fontFamily.regular,
    fontSize: fontSize.xs,
    color: colors.textHint,
  },
  tooltipAddress: {
    fontFamily: fontFamily.semiBold,
    fontSize: fontSize.md,
    color: colors.white,
    marginTop: hp('0.2%'),
  },
  pin: {
    width: wp('14%'),
    height: wp('14%'),
    borderRadius: radius.md,
    borderWidth: 2,
    borderColor: colors.textPrimary,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stem: {
    width: 3,
    height: hp('1.8%'),
    backgroundColor: colors.textPrimary,
  },
});
