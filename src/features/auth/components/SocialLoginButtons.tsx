import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { colors } from '../../../theme/colors';
import { fontFamily, fontSize } from '../../../theme/typography';
import { radius } from '../../../theme/spacing';

interface SocialLoginButtonsProps {
  onGooglePress?: () => void;
  onFacebookPress?: () => void;
}

export const SocialLoginButtons: React.FC<SocialLoginButtonsProps> = ({
  onGooglePress,
  onFacebookPress,
}) => (
  <View style={styles.column}>
    <TouchableOpacity
      style={styles.row}
      onPress={onGooglePress || (() => {})}
      accessibilityLabel="Continue with Google"
      accessibilityRole="button"
    >
      <Icon name="logo-google" size={wp('5.5%')} color="#EA4335" />
      <Text style={styles.text}>Continue with Google</Text>
    </TouchableOpacity>
    <TouchableOpacity
      style={styles.row}
      onPress={onFacebookPress || (() => {})}
      accessibilityLabel="Continue with Facebook"
      accessibilityRole="button"
    >
      <Icon name="logo-facebook" size={wp('5.5%')} color="#1877F2" />
      <Text style={styles.text}>Continue with Facebook</Text>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  column: {
    gap: hp('1.5%'),
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: wp('3%'),
    height: hp('5.5%'),
    borderRadius: radius.md,
    backgroundColor: colors.backgroundSecondary,
  },
  text: {
    fontFamily: fontFamily.semiBold,
    fontSize: fontSize.md,
    color: colors.textPrimary,
  },
});
