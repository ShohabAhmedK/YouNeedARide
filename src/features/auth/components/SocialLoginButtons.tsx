import React from 'react';
import { View, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Button } from '../../../components/Button';
import { colors } from '../../../theme/colors';

interface SocialLoginButtonsProps {
  onGooglePress?: () => void;
  onFacebookPress?: () => void;
}

export const SocialLoginButtons: React.FC<SocialLoginButtonsProps> = ({
  onGooglePress,
  onFacebookPress,
}) => (
  <View style={styles.row}>
    <Button
      title="Google"
      variant="outline"
      onPress={onGooglePress || (() => {})}
      leftIcon={<Icon name="logo-google" size={wp('5%')} color={colors.textPrimary} />}
      style={styles.button}
    />
    <Button
      title="Facebook"
      variant="outline"
      onPress={onFacebookPress || (() => {})}
      leftIcon={<Icon name="logo-facebook" size={wp('5%')} color={colors.textPrimary} />}
      style={styles.button}
    />
  </View>
);

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    gap: wp('3%'),
    marginTop: hp('2%'),
  },
  button: {
    flex: 1,
  },
});
