import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { colors } from '../../../theme/colors';
import { fontFamily, fontSize } from '../../../theme/typography';

interface ETADisplayProps {
  etaMinutes: number;
}

export const ETADisplay: React.FC<ETADisplayProps> = ({ etaMinutes }) => (
  <View style={styles.row}>
    <Icon name="schedule" size={wp('4.5%')} color={colors.primary} />
    <Text style={styles.text}>{etaMinutes} min away</Text>
  </View>
);

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    marginLeft: wp('1.5%'),
    fontFamily: fontFamily.semiBold,
    fontSize: fontSize.sm,
    color: colors.primary,
  },
});
