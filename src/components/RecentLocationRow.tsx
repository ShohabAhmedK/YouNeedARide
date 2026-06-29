import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { colors } from '../theme/colors';
import { fontFamily, fontSize } from '../theme/typography';

interface RecentLocationRowProps {
  icon: string;
  title: string;
  address: string;
  onPress: () => void;
}

export const RecentLocationRow: React.FC<RecentLocationRowProps> = ({ icon, title, address, onPress }) => (
  <TouchableOpacity style={styles.row} onPress={onPress} accessibilityLabel={title}>
    <Icon name={icon} size={wp('6%')} color={colors.textPrimary} />
    <View style={styles.column}>
      <Text style={styles.title} numberOfLines={1}>{title}</Text>
      <Text style={styles.address} numberOfLines={1}>{address}</Text>
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: hp('1.5%'),
  },
  column: {
    marginLeft: wp('4%'),
    flex: 1,
  },
  title: {
    fontFamily: fontFamily.semiBold,
    fontSize: fontSize.md,
    color: colors.textPrimary,
  },
  address: {
    fontFamily: fontFamily.regular,
    fontSize: fontSize.sm,
    color: colors.textSecondary,
    marginTop: hp('0.2%'),
  },
});
