import React, { useState } from 'react';
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  TextInputProps,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { colors } from '../theme/colors';
import { fontFamily, fontSize } from '../theme/typography';
import { radius } from '../theme/spacing';

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  isPassword?: boolean;
  leftIcon?: string;
  rightIcon?: string;
  onRightIconPress?: () => void;
  variant?: 'outline' | 'filled';
}

export const Input = React.forwardRef<TextInput, InputProps>(
  ({ label, error, isPassword, leftIcon, rightIcon, onRightIconPress, variant = 'outline', style, ...rest }, ref) => {
    const [focused, setFocused] = useState(false);
    const [secure, setSecure] = useState(!!isPassword);

    const isFilled = variant === 'filled';

    return (
      <View style={styles.wrapper}>
        {label ? <Text style={styles.label}>{label}</Text> : null}
        <View
          style={[
            styles.inputContainer,
            isFilled
              ? {
                  borderWidth: 0,
                  backgroundColor: colors.backgroundSecondary,
                }
              : { borderColor: error ? colors.error : focused ? colors.primary : colors.border },
          ]}
        >
          {leftIcon ? (
            <Icon name={leftIcon} size={wp('5%')} color={colors.textSecondary} style={styles.iconLeft} />
          ) : null}
          <TextInput
            ref={ref}
            style={[styles.input, style]}
            placeholderTextColor={colors.textHint}
            secureTextEntry={secure}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            accessibilityLabel={label}
            {...rest}
          />
          {isPassword ? (
            <TouchableOpacity
              onPress={() => setSecure((s) => !s)}
              accessibilityLabel={secure ? 'Show password' : 'Hide password'}
            >
              <Icon
                name={secure ? 'visibility-off' : 'visibility'}
                size={wp('5%')}
                color={colors.textSecondary}
              />
            </TouchableOpacity>
          ) : rightIcon ? (
            <TouchableOpacity onPress={onRightIconPress} accessibilityLabel="input action">
              <Icon name={rightIcon} size={wp('5%')} color={colors.textSecondary} />
            </TouchableOpacity>
          ) : null}
        </View>
        {error ? <Text style={styles.error}>{error}</Text> : null}
      </View>
    );
  },
);

Input.displayName = 'Input';

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: hp('2%'),
  },
  label: {
    fontFamily: fontFamily.gilroyRegular,
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 14,
    letterSpacing: 14 * -0.04,
    color: colors.textPrimary,
    marginBottom: hp('0.8%'),
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: radius.md,
    height: hp('5.5%'),
    paddingHorizontal: wp('4%'),
    backgroundColor: colors.white,
  },
  iconLeft: {
    marginRight: wp('2%'),
  },
  input: {
    flex: 1,
    fontFamily: fontFamily.regular,
    fontSize: fontSize.md,
    color: colors.textPrimary,
  },
  error: {
    fontFamily: fontFamily.regular,
    fontSize: fontSize.xs,
    color: colors.error,
    marginTop: hp('0.5%'),
  },
});
