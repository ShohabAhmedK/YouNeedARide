import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { colors } from '../../../theme/colors';
import { fontFamily, fontSize } from '../../../theme/typography';
import { radius } from '../../../theme/spacing';

interface PickupDestinationBarProps {
  onPress: () => void;
}

export const PickupDestinationBar: React.FC<PickupDestinationBarProps> = ({ onPress }) => (
  <TouchableOpacity style={styles.bar} onPress={onPress} accessibilityLabel="Where to?">
    <Icon name="map-pin" size={wp('4%')} color={colors.primary} />
    <Text style={styles.text}>Where to?</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  bar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    height: hp('6.5%'),
    paddingHorizontal: wp('4%'),
  },
  text: {
    marginLeft: wp('3%'),
    fontFamily: fontFamily.medium,
    fontSize: fontSize.md,
    color: colors.textSecondary,
  },
});
