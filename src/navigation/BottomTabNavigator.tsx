import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { BottomTabParamList } from '../types/navigation';
import { colors } from '../theme/colors';
import { HomeMapScreen } from '../features/home/screens/HomeMapScreen';
import { RideHistoryScreen } from '../features/history/screens/RideHistoryScreen';
import { LoyaltyScreen } from '../features/loyalty/screens/LoyaltyScreen';
import { ProfileScreen } from '../features/profile/screens/ProfileScreen';

const Tab = createBottomTabNavigator<BottomTabParamList>();

const iconMap: Record<keyof BottomTabParamList, string> = {
  Home: 'home',
  History: 'time',
  Loyalty: 'gift',
  Profile: 'person',
};

export const BottomTabNavigator: React.FC = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      headerShown: false,
      tabBarActiveTintColor: colors.primary,
      tabBarInactiveTintColor: colors.textSecondary,
      tabBarStyle: {
        height: wp('16%'),
        paddingBottom: wp('2%'),
        paddingTop: wp('2%'),
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.06,
        shadowRadius: 6,
        elevation: 8,
      },
      tabBarIcon: ({ color, size }) => (
        <Icon name={iconMap[route.name as keyof BottomTabParamList]} color={color} size={size} />
      ),
    })}
  >
    <Tab.Screen name="Home" component={HomeMapScreen} />
    <Tab.Screen name="History" component={RideHistoryScreen} />
    <Tab.Screen name="Loyalty" component={LoyaltyScreen} />
    <Tab.Screen name="Profile" component={ProfileScreen} />
  </Tab.Navigator>
);
