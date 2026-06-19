import React, { useState } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { ScreenWrapper } from '../../../components/ScreenWrapper';
import { Button } from '../../../components/Button';
import { PaymentMethodCard } from '../components/PaymentMethodCard';
import { usePaymentMethods } from '../../../api/hooks/usePaymentApi';
import { useRideDetail } from '../../../api/hooks/useRideApi';
import { useRideStore } from '../../../store/rideStore';
import { PaymentMethod } from '../../../types/payment';
import { MainStackParamList } from '../../../types/navigation';

type Nav = StackNavigationProp<MainStackParamList, 'SelectPayment'>;
type Rt = RouteProp<MainStackParamList, 'SelectPayment'>;

export const SelectPaymentScreen: React.FC = () => {
  const navigation = useNavigation<Nav>();
  const route = useRoute<Rt>();
  const { data: methods } = usePaymentMethods();
  const { data: ride } = useRideDetail(route.params.rideId);
  const setSelectedPaymentMethod = useRideStore((s) => s.setSelectedPaymentMethod);
  const [selectedId, setSelectedId] = useState<string | undefined>();

  const handleConfirm = () => {
    const method = methods?.find((m) => m.id === selectedId);
    if (method) setSelectedPaymentMethod(method);
    if (ride) navigation.navigate('RideComplete', { ride });
  };

  return (
    <ScreenWrapper>
      <View style={styles.container}>
        <FlatList
          data={methods || []}
          keyExtractor={(item) => item.id}
          renderItem={({ item }: { item: PaymentMethod }) => (
            <PaymentMethodCard method={item} selected={item.id === selectedId} onPress={() => setSelectedId(item.id)} />
          )}
        />
        <Button title="Confirm Payment" onPress={handleConfirm} disabled={!selectedId} style={styles.button} />
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
