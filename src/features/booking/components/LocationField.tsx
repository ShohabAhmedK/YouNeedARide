import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { colors } from '../../../theme/colors';
import { fontFamily, fontSize } from '../../../theme/typography';
import { radius } from '../../../theme/spacing';

interface LocationFieldProps {
  icon: string;
  iconColor: string;
  label: string;
  value: string;
  placeholder?: string;
  autoFocus?: boolean;
  onChangeText: (text: string) => void;
}

export const LocationField: React.FC<LocationFieldProps> = ({
  icon,
  iconColor,
  label,
  value,
  placeholder,
  autoFocus,
  onChangeText,
}) => (
  <View style={styles.field}>
    <Icon name={icon} size={wp('6%')} color={iconColor} />
    <View style={styles.column}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={colors.textHint}
        autoFocus={autoFocus}
        accessibilityLabel={label}
      />
    </View>
    {value ? (
      <TouchableOpacity onPress={() => onChangeText('')} accessibilityLabel={`Clear ${label}`}>
        <View style={styles.clearButton}>
          <Icon name="close" size={wp('4%')} color={colors.textSecondary} />
        </View>
      </TouchableOpacity>
    ) : null}
  </View>
);

const styles = StyleSheet.create({
  field: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.lg,
    paddingHorizontal: wp('4%'),
    paddingVertical: hp('1.2%'),
    marginBottom: hp('1.5%'),
  },
  column: {
    flex: 1,
    marginLeft: wp('3%'),
  },
  label: {
    fontFamily: fontFamily.regular,
    fontSize: fontSize.sm,
    color: colors.textSecondary,
  },
  input: {
    fontFamily: fontFamily.semiBold,
    fontSize: fontSize.md,
    color: colors.textPrimary,
    padding: 0,
    marginTop: hp('0.2%'),
  },
  clearButton: {
    width: wp('7%'),
    height: wp('7%'),
    borderRadius: wp('3.5%'),
    backgroundColor: colors.backgroundSecondary,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
