import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { fontFamily, fontSize } from '../theme/typography';
import { colors } from '../theme/colors';

interface BadgeProps {
  label: string;
  color?: string;
  backgroundColor?: string;
  style?: ViewStyle;
}

export const Badge: React.FC<BadgeProps> = ({
  label,
  color = colors.white,
  backgroundColor = colors.primary,
  style,
}) => (
  <View style={[styles.badge, { backgroundColor }, style]}>
    <Text style={[styles.text, { color }]}>{label}</Text>
  </View>
);

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: wp('3%'),
    paddingVertical: wp('1%'),
    borderRadius: wp('4%'),
    alignSelf: 'flex-start',
  },
  text: {
    fontFamily: fontFamily.medium,
    fontSize: fontSize.xs,
  },
});
