import React, { useState } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
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

type Nav = StackNavigationProp<MainStackParamList, 'SetDestination'>;
type Rt = RouteProp<MainStackParamList, 'SetDestination'>;

export const SetDestinationScreen: React.FC = () => {
  const navigation = useNavigation<Nav>();
  const route = useRoute<Rt>();
  const rider = useAuthStore((s) => s.rider);
  const setDestination = useRideStore((s) => s.setDestination);
  const [address, setAddress] = useState('');

  const goNext = (destination: { latitude: number; longitude: number; address?: string; label?: string }) => {
    setDestination(destination);
    navigation.navigate('ConfirmAddress', { pickup: route.params.pickup, destination });
  };

  const handleSelectSaved = (location: SavedLocation) => {
    goNext({ latitude: location.latitude, longitude: location.longitude, address: location.address, label: location.label });
  };

  const handleConfirm = () => {
    goNext({ latitude: 37.78, longitude: -122.43, address });
  };

  return (
    <ScreenWrapper>
      <View style={styles.container}>
        <Input label="Destination" placeholder="Where are you going?" leftIcon="place" value={address} onChangeText={setAddress} />
        <FlatList
          data={rider?.savedLocations || []}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <SavedLocationItem location={item} onPress={handleSelectSaved} />}
        />
        <Button title="Confirm Destination" onPress={handleConfirm} disabled={!address} style={styles.button} />
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
