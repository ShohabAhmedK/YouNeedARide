import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { MainStackParamList } from '../types/navigation';
import { BottomTabNavigator } from './BottomTabNavigator';
import { SetPickupScreen } from '../features/booking/screens/SetPickupScreen';
import { SetDestinationScreen } from '../features/booking/screens/SetDestinationScreen';
import { ConfirmAddressScreen } from '../features/booking/screens/ConfirmAddressScreen';
import { FareEstimateScreen } from '../features/booking/screens/FareEstimateScreen';
import { FindingDriverScreen } from '../features/booking/screens/FindingDriverScreen';
import { RideTrackingScreen } from '../features/tracking/screens/RideTrackingScreen';
import { RideInProgressScreen } from '../features/tracking/screens/RideInProgressScreen';
import { SelectPaymentScreen } from '../features/payment/screens/SelectPaymentScreen';
import { RideCompleteScreen } from '../features/payment/screens/RideCompleteScreen';
import { RateDriverScreen } from '../features/rating/screens/RateDriverScreen';
import { RideDetailScreen } from '../features/history/screens/RideDetailScreen';
import { EditProfileScreen } from '../features/profile/screens/EditProfileScreen';
import { ChatScreen } from '../features/chat/screens/ChatScreen';
import { SupportScreen } from '../features/support/screens/SupportScreen';
import { FaqScreen } from '../features/support/screens/FaqScreen';

const Stack = createStackNavigator<MainStackParamList>();

export const MainNavigator: React.FC = () => (
  <Stack.Navigator initialRouteName="BottomTabs" screenOptions={{ headerShown: false }}>
    <Stack.Screen name="BottomTabs" component={BottomTabNavigator} />
    <Stack.Screen name="SetPickup" component={SetPickupScreen} />
    <Stack.Screen name="SetDestination" component={SetDestinationScreen} />
    <Stack.Screen name="ConfirmAddress" component={ConfirmAddressScreen} />
    <Stack.Screen name="FareEstimate" component={FareEstimateScreen} />
    <Stack.Screen name="FindingDriver" component={FindingDriverScreen} />
    <Stack.Screen name="RideTracking" component={RideTrackingScreen} />
    <Stack.Screen name="RideInProgress" component={RideInProgressScreen} />
    <Stack.Screen name="SelectPayment" component={SelectPaymentScreen} />
    <Stack.Screen name="RideComplete" component={RideCompleteScreen} />
    <Stack.Screen name="RateDriver" component={RateDriverScreen} />
    <Stack.Screen name="RideDetail" component={RideDetailScreen} />
    <Stack.Screen name="EditProfile" component={EditProfileScreen} />
    <Stack.Screen name="Chat" component={ChatScreen} />
    <Stack.Screen name="Support" component={SupportScreen} />
    <Stack.Screen name="Faq" component={FaqScreen} />
  </Stack.Navigator>
);
