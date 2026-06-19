import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { colors } from '../../../theme/colors';
import { fontFamily, fontSize } from '../../../theme/typography';

interface ProfileMenuItemProps {
  icon: string;
  label: string;
  onPress: () => void;
  destructive?: boolean;
}

export const ProfileMenuItem: React.FC<ProfileMenuItemProps> = ({ icon, label, onPress, destructive }) => (
  <TouchableOpacity style={styles.row} onPress={onPress} accessibilityLabel={label}>
    <Icon name={icon} size={wp('5.5%')} color={destructive ? colors.error : colors.textSecondary} />
    <Text style={[styles.label, destructive && styles.destructiveLabel]}>{label}</Text>
    {!destructive ? <Icon name="chevron-right" size={wp('5%')} color={colors.textHint} /> : null}
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: hp('1.8%'),
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  label: {
    flex: 1,
    marginLeft: wp('4%'),
    fontFamily: fontFamily.medium,
    fontSize: fontSize.md,
    color: colors.textPrimary,
  },
  destructiveLabel: {
    color: colors.error,
  },
});
