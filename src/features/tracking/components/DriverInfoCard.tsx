import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Avatar } from '../../../components/Avatar';
import { colors } from '../../../theme/colors';
import { fontFamily, fontSize } from '../../../theme/typography';
import { Driver } from '../../../types/ride';

interface DriverInfoCardProps {
  driver: Driver;
}

export const DriverInfoCard: React.FC<DriverInfoCardProps> = ({ driver }) => (
  <View style={styles.row}>
    <Avatar uri={driver.photoUrl} name={driver.name} size="md" />
    <View style={styles.info}>
      <Text style={styles.name}>{driver.name}</Text>
      <View style={styles.ratingRow}>
        <Icon name="star" size={wp('4%')} color={colors.accentYellow} />
        <Text style={styles.rating}>{driver.rating.toFixed(1)}</Text>
      </View>
      <Text style={styles.vehicle}>{driver.vehicleColor} {driver.vehicleMake} {driver.vehicleModel}</Text>
      <Text style={styles.plate}>{driver.licensePlate}</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
  },
  info: {
    marginLeft: wp('4%'),
    flex: 1,
  },
  name: {
    fontFamily: fontFamily.semiBold,
    fontSize: fontSize.lg,
    color: colors.textPrimary,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: hp('0.3%'),
  },
  rating: {
    marginLeft: wp('1%'),
    fontFamily: fontFamily.medium,
    fontSize: fontSize.sm,
    color: colors.textSecondary,
  },
  vehicle: {
    fontFamily: fontFamily.regular,
    fontSize: fontSize.sm,
    color: colors.textSecondary,
    marginTop: hp('0.5%'),
  },
  plate: {
    fontFamily: fontFamily.semiBold,
    fontSize: fontSize.sm,
    color: colors.textPrimary,
    marginTop: hp('0.2%'),
  },
});
