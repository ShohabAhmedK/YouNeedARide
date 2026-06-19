import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { ScreenWrapper } from '../../../components/ScreenWrapper';
import { Button } from '../../../components/Button';
import { Card } from '../../../components/Card';
import { PickupNotesInput } from '../components/PickupNotesInput';
import { MapViewComponent } from '../../home/components/MapViewComponent';
import { colors } from '../../../theme/colors';
import { fontFamily, fontSize } from '../../../theme/typography';
import { formatAddress } from '../../../utils/locationHelpers';
import { MainStackParamList } from '../../../types/navigation';

type Nav = StackNavigationProp<MainStackParamList, 'ConfirmAddress'>;
type Rt = RouteProp<MainStackParamList, 'ConfirmAddress'>;

export const ConfirmAddressScreen: React.FC = () => {
  const navigation = useNavigation<Nav>();
  const route = useRoute<Rt>();
  const { pickup, destination } = route.params;
  const [notes, setNotes] = useState('');

  const handleContinue = () => {
    navigation.navigate('FareEstimate', {
      pickup: { ...pickup, notes },
      destination,
    });
  };

  return (
    <ScreenWrapper>
      <View style={styles.mapContainer}>
        <MapViewComponent latitude={pickup.latitude} longitude={pickup.longitude} />
      </View>
      <Card style={styles.card}>
        <Text style={styles.heading}>Confirm Trip</Text>
        <View style={styles.addressRow}>
          <View style={[styles.dot, { backgroundColor: colors.primary }]} />
          <Text style={styles.addressText} numberOfLines={1}>{formatAddress(pickup)}</Text>
        </View>
        <View style={styles.addressRow}>
          <View style={[styles.dot, { backgroundColor: colors.accentYellow }]} />
          <Text style={styles.addressText} numberOfLines={1}>{formatAddress(destination)}</Text>
        </View>
        <PickupNotesInput value={notes} onChangeText={setNotes} />
        <Button title="Continue" onPress={handleContinue} />
      </Card>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  mapContainer: {
    flex: 1,
  },
  card: {
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  heading: {
    fontFamily: fontFamily.bold,
    fontSize: fontSize.lg,
    color: colors.textPrimary,
    marginBottom: hp('1.5%'),
  },
  addressRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: hp('1%'),
  },
  dot: {
    width: wp('2.5%'),
    height: wp('2.5%'),
    borderRadius: wp('1.25%'),
    marginRight: wp('3%'),
  },
  addressText: {
    flex: 1,
    fontFamily: fontFamily.regular,
    fontSize: fontSize.sm,
    color: colors.textPrimary,
  },
});
