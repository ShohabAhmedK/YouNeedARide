import React, { useState } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { ScreenWrapper } from '../../../components/ScreenWrapper';
import { Input } from '../../../components/Input';
import { Button } from '../../../components/Button';
import { SavedLocationItem } from '../components/SavedLocationItem';
import { useAuthStore } from '../../../store/authStore';
import { useRideStore } from '../../../store/rideStore';
import { SavedLocation } from '../../../types/user';
import { MainStackParamList } from '../../../types/navigation';

type Nav = StackNavigationProp<MainStackParamList, 'SetPickup'>;

export const SetPickupScreen: React.FC = () => {
  const navigation = useNavigation<Nav>();
  const rider = useAuthStore((s) => s.rider);
  const setPickup = useRideStore((s) => s.setPickup);
  const [address, setAddress] = useState('');

  const handleSelectSaved = (location: SavedLocation) => {
    setPickup({ latitude: location.latitude, longitude: location.longitude, address: location.address, label: location.label });
    navigation.replace('SetDestination', { pickup: { latitude: location.latitude, longitude: location.longitude, address: location.address } });
  };

  const handleConfirm = () => {
    setPickup({ latitude: 37.7749, longitude: -122.4194, address });
    navigation.replace('SetDestination', { pickup: { latitude: 37.7749, longitude: -122.4194, address } });
  };

  return (
    <ScreenWrapper>
      <View style={styles.container}>
        <Input label="Pickup Location" placeholder="Enter pickup address" leftIcon="my-location" value={address} onChangeText={setAddress} />
        <FlatList
          data={rider?.savedLocations || []}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <SavedLocationItem location={item} onPress={handleSelectSaved} />}
        />
        <Button title="Confirm Pickup" onPress={handleConfirm} disabled={!address} style={styles.button} />
      </View>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: wp('6%'),
    paddingTop: hp('3%'),
  },
  button: {
    marginTop: hp('2%'),
  },
});
