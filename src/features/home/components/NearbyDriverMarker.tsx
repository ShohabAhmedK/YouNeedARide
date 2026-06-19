import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Marker } from 'react-native-maps';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { colors } from '../../../theme/colors';

interface NearbyDriverMarkerProps {
  latitude: number;
  longitude: number;
}

export const NearbyDriverMarker: React.FC<NearbyDriverMarkerProps> = ({ latitude, longitude }) => (
  <Marker coordinate={{ latitude, longitude }} accessibilityLabel="Driver location">
    <View style={styles.marker}>
      <Icon name="directions-car" size={wp('5%')} color={colors.white} />
    </View>
  </Marker>
);

const styles = StyleSheet.create({
  marker: {
    width: wp('9%'),
    height: wp('9%'),
    borderRadius: wp('4.5%'),
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: colors.white,
  },
});
