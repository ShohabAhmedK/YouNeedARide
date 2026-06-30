import React, { useState } from 'react';
import {
  View,
  FlatList,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
} from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { LocationField } from '../components/LocationField';
import { RecentLocationRow } from '../../../components/RecentLocationRow';
import { useAuthStore } from '../../../store/authStore';
import { useRideStore } from '../../../store/rideStore';
import { colors } from '../../../theme/colors';
import { radius } from '../../../theme/spacing';
import { SavedLocation } from '../../../types/user';
import { MainStackParamList } from '../../../types/navigation';

type Nav = StackNavigationProp<MainStackParamList, 'SetDestination'>;
type Rt = RouteProp<MainStackParamList, 'SetDestination'>;

const DEMO_RECENTS = [
  { label: 'Oak Valley', address: '3742 Oak Valley, Apt 4B Atlanta, GA 30305...', icon: 'history' },
  { label: 'Oak Valley', address: '3742 Oak Valley, Apt 4B Atlanta, GA 30305...', icon: 'adjust' },
];

export const SetDestinationScreen: React.FC = () => {
  const navigation = useNavigation<Nav>();
  const route = useRoute<Rt>();
  const rider = useAuthStore((s) => s.rider);
  const setDestination = useRideStore((s) => s.setDestination);
  const [from, setFrom] = useState(route.params.pickup.address || '');
  const [to, setTo] = useState('');

  const goNext = (destination: { latitude: number; longitude: number; address?: string; label?: string }) => {
    setDestination(destination);
    navigation.replace('ConfirmAddress', {
      pickup: { ...route.params.pickup, address: from },
      destination,
    });
  };

  const handleSelectSaved = (location: SavedLocation) => {
    goNext({ latitude: location.latitude, longitude: location.longitude, address: location.address, label: location.label });
  };

  const handleSelectRecent = (address: string) => {
    setTo(address);
    goNext({ latitude: 37.78, longitude: -122.43, address });
  };

  const savedLocations = rider?.savedLocations || [];

  return (
    <View style={styles.overlay}>
      <TouchableWithoutFeedback onPress={() => navigation.goBack()} accessibilityLabel="Dismiss">
        <View style={styles.backdrop} />
      </TouchableWithoutFeedback>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <View style={styles.sheet}>
          <View style={styles.handle} />
          <LocationField
            icon="person"
            iconColor={colors.textPrimary}
            label="From"
            value={from}
            onChangeText={setFrom}
            placeholder="Pickup location"
          />
          <LocationField
            icon="radio-button-checked"
            iconColor={colors.primary}
            label="To"
            value={to}
            onChangeText={setTo}
            placeholder="Where to?"
            autoFocus
          />
          {savedLocations.length > 0 ? (
            <FlatList
              data={savedLocations}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <RecentLocationRow icon="place" title={item.label} address={item.address} onPress={() => handleSelectSaved(item)} />
              )}
            />
          ) : (
            DEMO_RECENTS.map((item, i) => (
              <RecentLocationRow
                key={i}
                icon={item.icon}
                title={item.label}
                address={item.address}
                onPress={() => handleSelectRecent(item.address)}
              />
            ))
          )}
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  backdrop: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  sheet: {
    minHeight: hp('80%'),
    backgroundColor: colors.white,
    borderTopLeftRadius: radius.xl,
    borderTopRightRadius: radius.xl,
    paddingHorizontal: wp('6%'),
    paddingTop: hp('1.5%'),
    paddingBottom: hp('4%'),
  },
  handle: {
    alignSelf: 'center',
    width: wp('10%'),
    height: hp('0.5%'),
    borderRadius: hp('0.5%'),
    backgroundColor: '#D8D8D8',
    marginBottom: hp('2%'),
  },
});
