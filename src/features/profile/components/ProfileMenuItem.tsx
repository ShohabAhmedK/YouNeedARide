import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { colors } from '../../../theme/colors';
import { fontFamily } from '../../../theme/typography';
import { radius } from '../../../theme/spacing';

interface ProfileMenuItemProps {
  icon: string;
  label: string;
  onPress: () => void;
  destructive?: boolean;
}

export const ProfileMenuItem: React.FC<ProfileMenuItemProps> = ({ icon, label, onPress, destructive }) => (
  <TouchableOpacity
    style={[styles.row, destructive && styles.rowDestructive]}
    onPress={onPress}
    accessibilityLabel={label}
  >
    <Icon
      name={icon}
      size={wp('6%')}
      color={destructive ? colors.white : colors.primary}
    />
    <Text style={[styles.label, destructive && styles.destructiveLabel]}>{label}</Text>
    <Icon name="chevron-right" size={wp('5.5%')} color={destructive ? colors.white : colors.textHint} />
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.backgroundSecondary,
    borderRadius: radius.lg,
    paddingHorizontal: wp('4%'),
    paddingVertical: hp('1.8%'),
    marginBottom: hp('1.5%'),
  },
  rowDestructive: {
    backgroundColor: colors.error,
  },
  label: {
    flex: 1,
    marginLeft: wp('4%'),
    fontFamily: fontFamily.gilroyMedium,
    fontWeight: '500',
    fontSize: 14,
    lineHeight: 14,
    letterSpacing: -0.28,
    color: colors.textPrimary,
  },
  destructiveLabel: {
    color: colors.white,
    marginLeft: wp('4%'),
  },
});
