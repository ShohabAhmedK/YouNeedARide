import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { colors } from '../../../theme/colors';
import { fontFamily, fontSize } from '../../../theme/typography';
import { SavedLocation } from '../../../types/user';

interface SavedLocationItemProps {
  location: SavedLocation;
  onPress: (location: SavedLocation) => void;
}

const iconMap: Record<SavedLocation['type'], string> = {
  home: 'home',
  work: 'work',
  other: 'place',
};

export const SavedLocationItem: React.FC<SavedLocationItemProps> = ({ location, onPress }) => (
  <TouchableOpacity style={styles.row} onPress={() => onPress(location)} accessibilityLabel={location.label}>
    <Icon name={iconMap[location.type]} size={wp('5%')} color={colors.primary} />
    <Text style={styles.label}>{location.label}</Text>
    <Text style={styles.address} numberOfLines={1}>{location.address}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: hp('1.5%'),
  },
  label: {
    marginLeft: wp('3%'),
    fontFamily: fontFamily.medium,
    fontSize: fontSize.md,
    color: colors.textPrimary,
    width: wp('18%'),
  },
  address: {
    flex: 1,
    fontFamily: fontFamily.regular,
    fontSize: fontSize.sm,
    color: colors.textSecondary,
  },
});
