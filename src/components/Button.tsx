import React from 'react';
import {
  Text,
  StyleSheet,
  ActivityIndicator,
  ViewStyle,
  TextStyle,
} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { colors } from '../theme/colors';
import { fontFamily, fontSize } from '../theme/typography';
import { radius } from '../theme/spacing';

type Variant = 'primary' | 'secondary' | 'outline' | 'ghost';
type Size = 'sm' | 'md' | 'lg';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: Variant;
  size?: Size;
  loading?: boolean;
  disabled?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  style?: ViewStyle;
  textStyle?: TextStyle;
  accessibilityLabel?: string;
}

const sizeMap: Record<Size, { height: number; fontSize: number }> = {
  sm: { height: hp('4%'), fontSize: fontSize.sm },
  md: { height: hp('5%'), fontSize: fontSize.md },
  lg: { height: hp('6%'), fontSize: fontSize.lg },
};

export const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  leftIcon,
  rightIcon,
  style,
  textStyle,
  accessibilityLabel,
}) => {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePressIn = () => {
    scale.value = withTiming(0.95, { duration: 100 });
  };

  const handlePressOut = () => {
    scale.value = withTiming(1, { duration: 100 });
  };

  const isDisabled = disabled || loading;
  const variantStyle = variantStyles[variant];
  const dims = sizeMap[size];

  return (
    <TouchableWithoutFeedback
      onPress={isDisabled ? undefined : onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      accessibilityLabel={accessibilityLabel || title}
      accessibilityRole="button"
    >
      <Animated.View
        style={[
          styles.base,
          { height: dims.height, opacity: isDisabled ? 0.5 : 1 },
          variantStyle.container,
          style,
          animatedStyle,
        ]}
      >
        {loading ? (
          <ActivityIndicator
            color={variant === 'primary' ? colors.white : colors.primary}
          />
        ) : (
          <>
            {leftIcon}
            <Text
              style={[
                styles.text,
                { fontSize: dims.fontSize },
                variantStyle.text,
                textStyle,
              ]}
            >
              {title}
            </Text>
            {rightIcon}
          </>
        )}
      </Animated.View>
    </TouchableWithoutFeedback>
  );
};

const variantStyles: Record<
  Variant,
  { container: ViewStyle; text: TextStyle }
> = {
  primary: {
    container: { backgroundColor: colors.primary },
    text: { color: colors.white },
  },
  secondary: {
    container: { backgroundColor: colors.primaryLight },
    text: { color: colors.primaryDark },
  },
  outline: {
    container: {
      backgroundColor: 'transparent',
      borderWidth: 1,
      borderColor: colors.primary,
    },
    text: { color: colors.primary },
  },
  ghost: {
    container: { backgroundColor: 'transparent' },
    text: { color: colors.primary },
  },
};

const styles = StyleSheet.create({
  base: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: radius.md,
    paddingHorizontal: wp('4%'),
    gap: wp('2%'),
  },
  text: {
    fontFamily: fontFamily.semiBold,
  },
});
