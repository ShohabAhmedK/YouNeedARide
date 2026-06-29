import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { colors } from '../../../theme/colors';
import { radius } from '../../../theme/spacing';
import { mediumShadow } from '../../../theme/shadows';

interface FloatingNavButtonProps {
  onPress: () => void;
}

export const FloatingNavButton: React.FC<FloatingNavButtonProps> = ({ onPress }) => (
  <TouchableOpacity style={styles.button} onPress={onPress} accessibilityLabel="Center on my location">
    <Icon name="send-outline" size={wp('6%')} color={colors.textPrimary} style={styles.icon} />
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  button: {
    width: wp('13%'),
    height: wp('13%'),
    borderRadius: radius.md,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    ...mediumShadow,
  },
  icon: {
    transform: [{ rotate: '-45deg' }],
  },
});
