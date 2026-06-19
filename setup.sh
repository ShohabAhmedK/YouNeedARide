#!/bin/bash
set -e

echo "Creating YouNeedARide Rider App structure..."

mkdir -p src/assets/fonts
mkdir -p src/assets/images
mkdir -p src/assets/icons
mkdir -p src/theme
mkdir -p src/types
mkdir -p src/store
mkdir -p src/api/hooks
mkdir -p src/constants
mkdir -p src/hooks
mkdir -p src/utils
mkdir -p src/components
mkdir -p src/navigation
mkdir -p src/features/onboarding/screens
mkdir -p src/features/onboarding/components
mkdir -p src/features/auth/screens
mkdir -p src/features/auth/components
mkdir -p src/features/home/screens
mkdir -p src/features/home/components
mkdir -p src/features/booking/screens
mkdir -p src/features/booking/components
mkdir -p src/features/tracking/screens
mkdir -p src/features/tracking/components
mkdir -p src/features/payment/screens
mkdir -p src/features/payment/components
mkdir -p src/features/rating/screens
mkdir -p src/features/rating/components
mkdir -p src/features/history/screens
mkdir -p src/features/history/components
mkdir -p src/features/loyalty/screens
mkdir -p src/features/loyalty/components
mkdir -p src/features/profile/screens
mkdir -p src/features/profile/components
mkdir -p src/features/chat/screens
mkdir -p src/features/chat/components
mkdir -p src/features/support/screens
mkdir -p src/features/support/components

echo "Writing theme files..."

cat > src/theme/colors.ts << 'EOF'
export const colors = {
  primary: '#1D9E75',
  primaryDark: '#0F6E56',
  primaryLight: '#E1F5EE',
  accentYellow: '#FFB800',
  background: '#FFFFFF',
  backgroundSecondary: '#F8F8F8',
  textPrimary: '#1A1A1A',
  textSecondary: '#666666',
  textHint: '#999999',
  border: '#E8E8E8',
  error: '#E24B4A',
  success: '#1D9E75',
  warning: '#EF9F27',
  white: '#FFFFFF',
  black: '#000000',
};

export const darkColors = {
  primary: '#1D9E75',
  primaryDark: '#0F6E56',
  primaryLight: '#163D33',
  accentYellow: '#FFB800',
  background: '#121212',
  backgroundSecondary: '#1E1E1E',
  textPrimary: '#F5F5F5',
  textSecondary: '#B3B3B3',
  textHint: '#7A7A7A',
  border: '#2C2C2C',
  error: '#E24B4A',
  success: '#1D9E75',
  warning: '#EF9F27',
  white: '#FFFFFF',
  black: '#000000',
};

export type ThemeColors = typeof colors;
EOF

cat > src/theme/typography.ts << 'EOF'
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';

export const fontFamily = {
  regular: 'Poppins-Regular',
  medium: 'Poppins-Medium',
  semiBold: 'Poppins-SemiBold',
  bold: 'Poppins-Bold',
};

export const fontSize = {
  xs: wp('2.8%'),
  sm: wp('3.2%'),
  md: wp('3.6%'),
  lg: wp('4%'),
  xl: wp('4.6%'),
  xxl: wp('5.5%'),
  xxxl: wp('7%'),
  display: wp('9%'),
};

export const fontWeight = {
  regular: '400' as const,
  medium: '500' as const,
  semiBold: '600' as const,
  bold: '700' as const,
};

export const typography = { fontFamily, fontSize, fontWeight };
EOF

cat > src/theme/spacing.ts << 'EOF'
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export const spacing = {
  xs: hp('0.5%'),
  sm: hp('1%'),
  md: hp('2%'),
  lg: hp('3%'),
  xl: hp('4%'),
  xxl: hp('6%'),
};

export const horizontalSpacing = {
  xs: wp('1%'),
  sm: wp('2%'),
  md: wp('4%'),
  lg: wp('6%'),
  xl: wp('8%'),
};

export const radius = {
  sm: wp('2%'),
  md: wp('3%'),
  lg: wp('5%'),
  xl: wp('8%'),
  round: wp('50%'),
};
EOF

cat > src/theme/shadows.ts << 'EOF'
import { Platform } from 'react-native';

export const lightShadow = Platform.select({
  ios: {
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 2,
  },
  android: { elevation: 2 },
});

export const mediumShadow = Platform.select({
  ios: {
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  android: { elevation: 6 },
});

export const heavyShadow = Platform.select({
  ios: {
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 16,
  },
  android: { elevation: 12 },
});

export const shadows = { lightShadow, mediumShadow, heavyShadow };
EOF

cat > src/theme/index.ts << 'EOF'
export * from './colors';
export * from './typography';
export * from './spacing';
export * from './shadows';
EOF

echo "Theme files done."

echo "Writing type files..."

cat > src/types/ride.ts << 'EOF'
export enum RideStatus {
  REQUESTED = 'REQUESTED',
  SEARCHING_FOR_DRIVER = 'SEARCHING_FOR_DRIVER',
  DRIVER_ASSIGNED = 'DRIVER_ASSIGNED',
  DRIVER_EN_ROUTE = 'DRIVER_EN_ROUTE',
  DRIVER_ARRIVED = 'DRIVER_ARRIVED',
  RIDE_STARTED = 'RIDE_STARTED',
  RIDE_COMPLETED = 'RIDE_COMPLETED',
  CANCELLED_BY_RIDER = 'CANCELLED_BY_RIDER',
  CANCELLED_BY_DRIVER = 'CANCELLED_BY_DRIVER',
  PAYMENT_PENDING = 'PAYMENT_PENDING',
  PAYMENT_COMPLETED = 'PAYMENT_COMPLETED',
}

export interface Location {
  latitude: number;
  longitude: number;
  address?: string;
  label?: string;
  notes?: string;
}

export interface FareBreakdown {
  baseFare: number;
  distanceRate: number;
  platformFee: number;
  discount?: number;
  totalFare: number;
  currency: string;
}

export interface Driver {
  id: string;
  name: string;
  photoUrl?: string;
  rating: number;
  vehicleMake: string;
  vehicleModel: string;
  vehicleColor: string;
  licensePlate: string;
  latitude?: number;
  longitude?: number;
  etaMinutes?: number;
}

export interface Ride {
  id: string;
  status: RideStatus;
  pickup: Location;
  destination: Location;
  fare: FareBreakdown;
  driver?: Driver;
  distanceKm: number;
  durationMinutes: number;
  createdAt: string;
  completedAt?: string;
  riderRating?: number;
  riderReview?: string;
  paymentMethodId?: string;
}
EOF

cat > src/types/user.ts << 'EOF'
export interface SavedLocation {
  id: string;
  label: string;
  address: string;
  latitude: number;
  longitude: number;
  type: 'home' | 'work' | 'other';
}

export interface Rider {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  profilePhotoUrl?: string;
  savedLocations: SavedLocation[];
  loyaltyRideCount: number;
  createdAt: string;
}
EOF

cat > src/types/payment.ts << 'EOF'
export type PaymentMethodType = 'credit_card' | 'debit_card' | 'cash';

export interface PaymentMethod {
  id: string;
  type: PaymentMethodType;
  brand?: string;
  last4?: string;
  isDefault: boolean;
  expiryMonth?: number;
  expiryYear?: number;
}

export interface Receipt {
  rideId: string;
  fare: number;
  platformFee: number;
  discount: number;
  totalCharged: number;
  paymentMethodId: string;
  paidAt: string;
}
EOF

cat > src/types/navigation.ts << 'EOF'
import { Location, Ride } from './ride';

export type AuthStackParamList = {
  Splash: undefined;
  Onboarding: undefined;
  RoleSelect: undefined;
  Login: undefined;
  Register: undefined;
  ForgotPassword: undefined;
  OtpVerify: { email: string };
  SetNewPassword: { email: string; otp: string };
};

export type BookingStackParamList = {
  SetPickup: undefined;
  SetDestination: { pickup: Location };
  ConfirmAddress: { pickup: Location; destination: Location };
  FareEstimate: { pickup: Location; destination: Location };
  FindingDriver: { rideId: string };
};

export type TrackingStackParamList = {
  RideTracking: { rideId: string };
  RideInProgress: { rideId: string };
};

export type PaymentStackParamList = {
  SelectPayment: { rideId: string };
  RideComplete: { ride: Ride };
};

export type MainStackParamList = {
  BottomTabs: undefined;
  RateDriver: { rideId: string };
  RideDetail: { rideId: string };
  Chat: { rideId: string; driverName: string };
  EditProfile: undefined;
  Support: undefined;
  Faq: undefined;
} & BookingStackParamList &
  TrackingStackParamList &
  PaymentStackParamList;

export type BottomTabParamList = {
  Home: undefined;
  History: undefined;
  Loyalty: undefined;
  Profile: undefined;
};

export type RootStackParamList = {
  Auth: undefined;
  Main: undefined;
};
EOF

echo "Type files done."

echo "Writing store files..."

cat > src/store/authStore.ts << 'EOF'
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Rider } from '../types/user';

interface AuthState {
  rider: Rider | null;
  token: string | null;
  isAuthenticated: boolean;
  setRider: (rider: Rider) => void;
  setToken: (token: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      rider: null,
      token: null,
      isAuthenticated: false,
      setRider: (rider) => set({ rider }),
      setToken: (token) => set({ token, isAuthenticated: !!token }),
      logout: () => set({ rider: null, token: null, isAuthenticated: false }),
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
EOF

cat > src/store/rideStore.ts << 'EOF'
import { create } from 'zustand';
import { Location, FareBreakdown, Ride } from '../types/ride';
import { PaymentMethod } from '../types/payment';

interface RideState {
  pickup: Location | null;
  destination: Location | null;
  fareEstimate: FareBreakdown | null;
  currentRide: Ride | null;
  selectedPaymentMethod: PaymentMethod | null;
  setPickup: (pickup: Location) => void;
  setDestination: (destination: Location) => void;
  setFareEstimate: (fare: FareBreakdown) => void;
  setCurrentRide: (ride: Ride | null) => void;
  setSelectedPaymentMethod: (method: PaymentMethod) => void;
  clearRide: () => void;
}

export const useRideStore = create<RideState>()((set) => ({
  pickup: null,
  destination: null,
  fareEstimate: null,
  currentRide: null,
  selectedPaymentMethod: null,
  setPickup: (pickup) => set({ pickup }),
  setDestination: (destination) => set({ destination }),
  setFareEstimate: (fareEstimate) => set({ fareEstimate }),
  setCurrentRide: (currentRide) => set({ currentRide }),
  setSelectedPaymentMethod: (selectedPaymentMethod) =>
    set({ selectedPaymentMethod }),
  clearRide: () =>
    set({
      pickup: null,
      destination: null,
      fareEstimate: null,
      currentRide: null,
      selectedPaymentMethod: null,
    }),
}));
EOF

echo "Store files done."

echo "Writing constants files..."

cat > src/constants/routes.ts << 'EOF'
export enum Routes {
  SPLASH = 'Splash',
  ONBOARDING = 'Onboarding',
  ROLE_SELECT = 'RoleSelect',
  LOGIN = 'Login',
  REGISTER = 'Register',
  FORGOT_PASSWORD = 'ForgotPassword',
  OTP_VERIFY = 'OtpVerify',
  SET_NEW_PASSWORD = 'SetNewPassword',

  AUTH = 'Auth',
  MAIN = 'Main',
  BOTTOM_TABS = 'BottomTabs',

  HOME = 'Home',
  HISTORY = 'History',
  LOYALTY = 'Loyalty',
  PROFILE = 'Profile',

  SET_PICKUP = 'SetPickup',
  SET_DESTINATION = 'SetDestination',
  CONFIRM_ADDRESS = 'ConfirmAddress',
  FARE_ESTIMATE = 'FareEstimate',
  FINDING_DRIVER = 'FindingDriver',

  RIDE_TRACKING = 'RideTracking',
  RIDE_IN_PROGRESS = 'RideInProgress',

  SELECT_PAYMENT = 'SelectPayment',
  RIDE_COMPLETE = 'RideComplete',

  RATE_DRIVER = 'RateDriver',
  RIDE_DETAIL = 'RideDetail',
  EDIT_PROFILE = 'EditProfile',
  CHAT = 'Chat',
  SUPPORT = 'Support',
  FAQ = 'Faq',
}
EOF

cat > src/constants/rideStatus.ts << 'EOF'
import { RideStatus } from '../types/ride';
import { colors } from '../theme/colors';

export const rideStatusLabel: Record<RideStatus, string> = {
  [RideStatus.REQUESTED]: 'Requested',
  [RideStatus.SEARCHING_FOR_DRIVER]: 'Finding Driver',
  [RideStatus.DRIVER_ASSIGNED]: 'Driver Assigned',
  [RideStatus.DRIVER_EN_ROUTE]: 'Driver En Route',
  [RideStatus.DRIVER_ARRIVED]: 'Driver Arrived',
  [RideStatus.RIDE_STARTED]: 'Ride Started',
  [RideStatus.RIDE_COMPLETED]: 'Ride Completed',
  [RideStatus.CANCELLED_BY_RIDER]: 'Cancelled by You',
  [RideStatus.CANCELLED_BY_DRIVER]: 'Cancelled by Driver',
  [RideStatus.PAYMENT_PENDING]: 'Payment Pending',
  [RideStatus.PAYMENT_COMPLETED]: 'Payment Completed',
};

export const rideStatusColor: Record<RideStatus, string> = {
  [RideStatus.REQUESTED]: colors.textSecondary,
  [RideStatus.SEARCHING_FOR_DRIVER]: colors.warning,
  [RideStatus.DRIVER_ASSIGNED]: colors.primary,
  [RideStatus.DRIVER_EN_ROUTE]: colors.primary,
  [RideStatus.DRIVER_ARRIVED]: colors.primary,
  [RideStatus.RIDE_STARTED]: colors.primaryDark,
  [RideStatus.RIDE_COMPLETED]: colors.success,
  [RideStatus.CANCELLED_BY_RIDER]: colors.error,
  [RideStatus.CANCELLED_BY_DRIVER]: colors.error,
  [RideStatus.PAYMENT_PENDING]: colors.warning,
  [RideStatus.PAYMENT_COMPLETED]: colors.success,
};
EOF

cat > src/constants/config.ts << 'EOF'
export const APP_NAME = 'YouNeedARide';
export const APP_VERSION = '1.0.0-alpha';

export const LOYALTY_MILESTONE_DISCOUNT = 50;
export const LOYALTY_MILESTONE_RESET = 100;
export const LOYALTY_DISCOUNT_PERCENTAGE = 50;

export const API_BASE_URL = 'https://api.youneedaride.com';
export const SOCKET_URL = 'https://socket.youneedaride.com';
EOF

echo "Constants files done."

echo "Writing api files..."

cat > src/api/client.ts << 'EOF'
import axios from 'axios';
import Config from 'react-native-config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAuthStore } from '../store/authStore';
import { API_BASE_URL } from '../constants/config';

export const apiClient = axios.create({
  baseURL: Config.API_BASE_URL || API_BASE_URL,
  timeout: 15000,
  headers: { 'Content-Type': 'application/json' },
});

apiClient.interceptors.request.use(async (config) => {
  const token = useAuthStore.getState().token;
  if (token) {
    config.headers.Authorization = 'Bearer ' + token;
  }
  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error?.response?.status === 401) {
      useAuthStore.getState().logout();
      await AsyncStorage.removeItem('auth-storage');
    }
    return Promise.reject(error);
  },
);
EOF

cat > src/api/queryClient.ts << 'EOF'
import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      retry: 2,
      refetchOnWindowFocus: false,
    },
    mutations: {
      retry: 0,
    },
  },
});
EOF

cat > src/api/socket.ts << 'EOF'
import { io, Socket } from 'socket.io-client';
import Config from 'react-native-config';
import { useAuthStore } from '../store/authStore';
import { SOCKET_URL } from '../constants/config';

let socket: Socket | null = null;

export const connectSocket = (): Socket => {
  const token = useAuthStore.getState().token;

  socket = io(Config.SOCKET_URL || SOCKET_URL, {
    transports: ['websocket'],
    auth: { token },
  });

  socket.on('connect', () => {
    console.log('Socket connected', socket?.id);
  });

  socket.on('disconnect', () => {
    console.log('Socket disconnected');
  });

  return socket;
};

export const disconnectSocket = (): void => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};

export const getSocket = (): Socket | null => socket;

export const SOCKET_EVENTS = {
  DRIVER_LOCATION_UPDATE: 'DRIVER_LOCATION_UPDATE',
  RIDE_STATUS_UPDATE: 'RIDE_STATUS_UPDATE',
  RIDE_COMPLETED: 'RIDE_COMPLETED',
};

export const onDriverLocationUpdate = (
  callback: (data: { rideId: string; latitude: number; longitude: number }) => void,
) => {
  socket?.on(SOCKET_EVENTS.DRIVER_LOCATION_UPDATE, callback);
};

export const onRideStatusUpdate = (
  callback: (data: { rideId: string; status: string }) => void,
) => {
  socket?.on(SOCKET_EVENTS.RIDE_STATUS_UPDATE, callback);
};

export const onRideCompleted = (
  callback: (data: { rideId: string }) => void,
) => {
  socket?.on(SOCKET_EVENTS.RIDE_COMPLETED, callback);
};
EOF

echo "Api client files done."

cat > src/api/hooks/useAuthApi.ts << 'EOF'
import { useMutation } from '@tanstack/react-query';
import { apiClient } from '../client';
import { Rider } from '../../types/user';

interface LoginPayload {
  email: string;
  password: string;
}

interface LoginResponse {
  rider: Rider;
  token: string;
}

interface RegisterPayload {
  fullName: string;
  email: string;
  phone: string;
  password: string;
}

export const useLogin = () =>
  useMutation({
    mutationFn: async (payload: LoginPayload) => {
      const { data } = await apiClient.post<LoginResponse>('/auth/login', payload);
      return data;
    },
  });

export const useRegister = () =>
  useMutation({
    mutationFn: async (payload: RegisterPayload) => {
      const { data } = await apiClient.post('/auth/register', payload);
      return data;
    },
  });

export const useVerifyOtp = () =>
  useMutation({
    mutationFn: async (payload: { email: string; otp: string }) => {
      const { data } = await apiClient.post('/auth/verify-otp', payload);
      return data;
    },
  });

export const useForgotPassword = () =>
  useMutation({
    mutationFn: async (payload: { email: string }) => {
      const { data } = await apiClient.post('/auth/forgot-password', payload);
      return data;
    },
  });

export const useResetPassword = () =>
  useMutation({
    mutationFn: async (payload: {
      email: string;
      otp: string;
      newPassword: string;
    }) => {
      const { data } = await apiClient.post('/auth/reset-password', payload);
      return data;
    },
  });
EOF

cat > src/api/hooks/useRideApi.ts << 'EOF'
import { useMutation, useQuery } from '@tanstack/react-query';
import { apiClient } from '../client';
import { Location, FareBreakdown, Ride } from '../../types/ride';

export const useFareEstimate = () =>
  useMutation({
    mutationFn: async (payload: { pickup: Location; destination: Location }) => {
      const { data } = await apiClient.post<FareBreakdown>(
        '/rides/fare-estimate',
        payload,
      );
      return data;
    },
  });

export const useRequestRide = () =>
  useMutation({
    mutationFn: async (payload: {
      pickup: Location;
      destination: Location;
      paymentMethodId: string;
    }) => {
      const { data } = await apiClient.post<Ride>('/rides', payload);
      return data;
    },
  });

export const useRideHistory = () =>
  useQuery({
    queryKey: ['ride-history'],
    queryFn: async () => {
      const { data } = await apiClient.get<Ride[]>('/rides/history');
      return data;
    },
  });

export const useRideDetail = (rideId: string) =>
  useQuery({
    queryKey: ['ride-detail', rideId],
    queryFn: async () => {
      const { data } = await apiClient.get<Ride>('/rides/' + rideId);
      return data;
    },
    enabled: !!rideId,
  });

export const useRateDriver = () =>
  useMutation({
    mutationFn: async (payload: {
      rideId: string;
      rating: number;
      review?: string;
    }) => {
      const { data } = await apiClient.post(
        '/rides/' + payload.rideId + '/rate',
        payload,
      );
      return data;
    },
  });

export const useCancelRide = () =>
  useMutation({
    mutationFn: async (rideId: string) => {
      const { data } = await apiClient.post('/rides/' + rideId + '/cancel');
      return data;
    },
  });
EOF

cat > src/api/hooks/usePaymentApi.ts << 'EOF'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '../client';
import { PaymentMethod } from '../../types/payment';

export const usePaymentMethods = () =>
  useQuery({
    queryKey: ['payment-methods'],
    queryFn: async () => {
      const { data } = await apiClient.get<PaymentMethod[]>('/payments/methods');
      return data;
    },
  });

export const useAddPaymentMethod = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload: { token: string }) => {
      const { data } = await apiClient.post<PaymentMethod>(
        '/payments/methods',
        payload,
      );
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['payment-methods'] });
    },
  });
};

export const useSetDefaultPayment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (paymentMethodId: string) => {
      const { data } = await apiClient.patch(
        '/payments/methods/' + paymentMethodId + '/default',
      );
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['payment-methods'] });
    },
  });
};
EOF

cat > src/api/hooks/useLoyaltyApi.ts << 'EOF'
import { useMutation, useQuery } from '@tanstack/react-query';
import { apiClient } from '../client';

interface LoyaltyProgress {
  rideCount: number;
  milestoneTarget: number;
  discountAvailable: boolean;
}

interface LoyaltyHistoryEntry {
  id: string;
  cycleCompletedAt: string;
  totalSaved: number;
}

export const useLoyaltyProgress = () =>
  useQuery({
    queryKey: ['loyalty-progress'],
    queryFn: async () => {
      const { data } = await apiClient.get<LoyaltyProgress>('/loyalty/progress');
      return data;
    },
  });

export const useLoyaltyHistory = () =>
  useQuery({
    queryKey: ['loyalty-history'],
    queryFn: async () => {
      const { data } = await apiClient.get<LoyaltyHistoryEntry[]>(
        '/loyalty/history',
      );
      return data;
    },
  });

export const useClaimReward = () =>
  useMutation({
    mutationFn: async () => {
      const { data } = await apiClient.post('/loyalty/claim');
      return data;
    },
  });
EOF

echo "Api hook files done."

echo "Writing utils files..."

cat > src/utils/formatFare.ts << 'EOF'
import { FareBreakdown } from '../types/ride';

export const formatCurrency = (amount: number, currency = 'USD'): string => {
  const symbol = currency === 'USD' ? '$' : currency + ' ';
  return symbol + amount.toFixed(2);
};

export const formatFareBreakdown = (fare: FareBreakdown) => ({
  baseFare: formatCurrency(fare.baseFare, fare.currency),
  distanceRate: formatCurrency(fare.distanceRate, fare.currency),
  platformFee: formatCurrency(fare.platformFee, fare.currency),
  discount: fare.discount ? formatCurrency(fare.discount, fare.currency) : null,
  totalFare: formatCurrency(fare.totalFare, fare.currency),
});
EOF

cat > src/utils/formatDate.ts << 'EOF'
const MONTHS = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
];

export const formatRideDate = (date: string | Date): string => {
  const d = new Date(date);
  return MONTHS[d.getMonth()] + ' ' + d.getDate() + ', ' + d.getFullYear();
};

export const formatRideTime = (date: string | Date): string => {
  const d = new Date(date);
  let hours = d.getHours();
  const minutes = d.getMinutes().toString().padStart(2, '0');
  const period = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12 || 12;
  return hours + ':' + minutes + ' ' + period;
};

export const formatRelativeTime = (date: string | Date): string => {
  const d = new Date(date);
  const now = new Date();
  const diffMs = now.getTime() - d.getTime();
  const diffMinutes = Math.floor(diffMs / (1000 * 60));
  const diffHours = Math.floor(diffMinutes / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffMinutes < 1) return 'Just now';
  if (diffMinutes < 60) return diffMinutes + ' minute' + (diffMinutes === 1 ? '' : 's') + ' ago';
  if (diffHours < 24) return diffHours + ' hour' + (diffHours === 1 ? '' : 's') + ' ago';
  if (diffDays < 30) return diffDays + ' day' + (diffDays === 1 ? '' : 's') + ' ago';
  return formatRideDate(d);
};
EOF

cat > src/utils/locationHelpers.ts << 'EOF'
import { Location } from '../types/ride';

export const calculateDistance = (loc1: Location, loc2: Location): number => {
  const R = 6371;
  const dLat = toRad(loc2.latitude - loc1.latitude);
  const dLon = toRad(loc2.longitude - loc1.longitude);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(loc1.latitude)) *
      Math.cos(toRad(loc2.latitude)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

const toRad = (value: number): number => (value * Math.PI) / 180;

export const formatAddress = (location: Location): string => {
  if (location.label) return location.label;
  if (location.address) {
    const parts = location.address.split(',');
    return parts.slice(0, 2).join(',').trim();
  }
  return location.latitude.toFixed(4) + ', ' + location.longitude.toFixed(4);
};

export const isValidCoordinate = (lat: number, lng: number): boolean =>
  lat >= -90 && lat <= 90 && lng >= -180 && lng <= 180 && !Number.isNaN(lat) && !Number.isNaN(lng);
EOF

cat > src/utils/validators.ts << 'EOF'
export const validateEmail = (email: string): boolean =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());

export const validatePhone = (phone: string): boolean =>
  /^\+?[0-9]{7,15}$/.test(phone.replace(/[\s-]/g, ''));

export const validatePassword = (password: string): boolean =>
  password.length >= 8 && /[A-Z]/.test(password) && /[0-9]/.test(password);
EOF

echo "Utils files done."

echo "Writing hooks files..."

cat > src/hooks/usePermissions.ts << 'EOF'
import { Platform, PermissionsAndroid } from 'react-native';
import Geolocation from 'react-native-geolocation-service';

export const requestLocationPermission = async (): Promise<boolean> => {
  if (Platform.OS === 'android') {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );
    return granted === PermissionsAndroid.RESULTS.GRANTED;
  }
  return new Promise((resolve) => {
    Geolocation.requestAuthorization('whenInUse').then((status) => {
      resolve(status === 'granted');
    });
  });
};

export const checkLocationPermission = async (): Promise<boolean> => {
  if (Platform.OS === 'android') {
    return PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );
  }
  return true;
};

export const requestNotificationPermission = async (): Promise<boolean> => {
  try {
    const messaging = require('@react-native-firebase/messaging').default;
    const authStatus = await messaging().requestPermission();
    return (
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL
    );
  } catch (e) {
    return false;
  }
};
EOF

cat > src/hooks/useAppTheme.ts << 'EOF'
import { useColorScheme } from 'react-native';
import { colors, darkColors } from '../theme/colors';

export const useAppTheme = () => {
  const scheme = useColorScheme();
  const isDark = scheme === 'dark';
  return {
    isDark,
    colors: isDark ? darkColors : colors,
  };
};
EOF

echo "Hooks files done."

echo "Writing component files..."

cat > src/components/Button.tsx << 'EOF'
import React from 'react';
import {
  Text,
  StyleSheet,
  ActivityIndicator,
  ViewStyle,
  TextStyle,
} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { colors } from '../theme/colors';
import { fontFamily, fontSize } from '../theme/typography';
import { radius } from '../theme/spacing';

type Variant = 'primary' | 'secondary' | 'outline' | 'ghost';
type Size = 'sm' | 'md' | 'lg';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: Variant;
  size?: Size;
  loading?: boolean;
  disabled?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  style?: ViewStyle;
  textStyle?: TextStyle;
  accessibilityLabel?: string;
}

const sizeMap: Record<Size, { height: number; fontSize: number }> = {
  sm: { height: hp('5%'), fontSize: fontSize.sm },
  md: { height: hp('6.5%'), fontSize: fontSize.md },
  lg: { height: hp('7.5%'), fontSize: fontSize.lg },
};

export const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  leftIcon,
  rightIcon,
  style,
  textStyle,
  accessibilityLabel,
}) => {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePressIn = () => {
    scale.value = withTiming(0.95, { duration: 100 });
  };

  const handlePressOut = () => {
    scale.value = withTiming(1, { duration: 100 });
  };

  const isDisabled = disabled || loading;
  const variantStyle = variantStyles[variant];
  const dims = sizeMap[size];

  return (
    <TouchableWithoutFeedback
      onPress={isDisabled ? undefined : onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      accessibilityLabel={accessibilityLabel || title}
      accessibilityRole="button"
    >
      <Animated.View
        style={[
          styles.base,
          { height: dims.height, opacity: isDisabled ? 0.5 : 1 },
          variantStyle.container,
          style,
          animatedStyle,
        ]}
      >
        {loading ? (
          <ActivityIndicator
            color={variant === 'primary' ? colors.white : colors.primary}
          />
        ) : (
          <>
            {leftIcon}
            <Text
              style={[
                styles.text,
                { fontSize: dims.fontSize },
                variantStyle.text,
                textStyle,
              ]}
            >
              {title}
            </Text>
            {rightIcon}
          </>
        )}
      </Animated.View>
    </TouchableWithoutFeedback>
  );
};

const variantStyles: Record<Variant, { container: ViewStyle; text: TextStyle }> = {
  primary: {
    container: { backgroundColor: colors.primary },
    text: { color: colors.white },
  },
  secondary: {
    container: { backgroundColor: colors.primaryLight },
    text: { color: colors.primaryDark },
  },
  outline: {
    container: {
      backgroundColor: 'transparent',
      borderWidth: 1,
      borderColor: colors.primary,
    },
    text: { color: colors.primary },
  },
  ghost: {
    container: { backgroundColor: 'transparent' },
    text: { color: colors.primary },
  },
};

const styles = StyleSheet.create({
  base: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: radius.md,
    paddingHorizontal: wp('4%'),
    gap: wp('2%'),
  },
  text: {
    fontFamily: fontFamily.semiBold,
  },
});
EOF

echo "Button.tsx done."

cat > src/components/Input.tsx << 'EOF'
import React, { useState } from 'react';
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  TextInputProps,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { colors } from '../theme/colors';
import { fontFamily, fontSize } from '../theme/typography';
import { radius } from '../theme/spacing';

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  isPassword?: boolean;
  leftIcon?: string;
  rightIcon?: string;
  onRightIconPress?: () => void;
}

export const Input = React.forwardRef<TextInput, InputProps>(
  ({ label, error, isPassword, leftIcon, rightIcon, onRightIconPress, style, ...rest }, ref) => {
    const [focused, setFocused] = useState(false);
    const [secure, setSecure] = useState(!!isPassword);

    return (
      <View style={styles.wrapper}>
        {label ? <Text style={styles.label}>{label}</Text> : null}
        <View
          style={[
            styles.inputContainer,
            { borderColor: error ? colors.error : focused ? colors.primary : colors.border },
          ]}
        >
          {leftIcon ? (
            <Icon name={leftIcon} size={wp('5%')} color={colors.textSecondary} style={styles.iconLeft} />
          ) : null}
          <TextInput
            ref={ref}
            style={[styles.input, style]}
            placeholderTextColor={colors.textHint}
            secureTextEntry={secure}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            accessibilityLabel={label}
            {...rest}
          />
          {isPassword ? (
            <TouchableOpacity
              onPress={() => setSecure((s) => !s)}
              accessibilityLabel={secure ? 'Show password' : 'Hide password'}
            >
              <Icon
                name={secure ? 'visibility-off' : 'visibility'}
                size={wp('5%')}
                color={colors.textSecondary}
              />
            </TouchableOpacity>
          ) : rightIcon ? (
            <TouchableOpacity onPress={onRightIconPress} accessibilityLabel="input action">
              <Icon name={rightIcon} size={wp('5%')} color={colors.textSecondary} />
            </TouchableOpacity>
          ) : null}
        </View>
        {error ? <Text style={styles.error}>{error}</Text> : null}
      </View>
    );
  },
);

Input.displayName = 'Input';

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: hp('2%'),
  },
  label: {
    fontFamily: fontFamily.medium,
    fontSize: fontSize.sm,
    color: colors.textPrimary,
    marginBottom: hp('0.8%'),
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: radius.md,
    height: hp('6.5%'),
    paddingHorizontal: wp('4%'),
    backgroundColor: colors.white,
  },
  iconLeft: {
    marginRight: wp('2%'),
  },
  input: {
    flex: 1,
    fontFamily: fontFamily.regular,
    fontSize: fontSize.md,
    color: colors.textPrimary,
  },
  error: {
    fontFamily: fontFamily.regular,
    fontSize: fontSize.xs,
    color: colors.error,
    marginTop: hp('0.5%'),
  },
});
EOF

cat > src/components/Avatar.tsx << 'EOF'
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import FastImage from 'react-native-fast-image';
import {
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import { colors } from '../theme/colors';
import { fontFamily, fontSize } from '../theme/typography';

type Size = 'sm' | 'md' | 'lg';

interface AvatarProps {
  uri?: string;
  name?: string;
  size?: Size;
  showOnlineIndicator?: boolean;
}

const sizeMap: Record<Size, number> = {
  sm: wp('10%'),
  md: wp('14%'),
  lg: wp('22%'),
};

const getInitials = (name?: string): string => {
  if (!name) return '?';
  const parts = name.trim().split(' ');
  if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
  return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
};

export const Avatar: React.FC<AvatarProps> = ({ uri, name, size = 'md', showOnlineIndicator }) => {
  const dimension = sizeMap[size];

  return (
    <View style={{ width: dimension, height: dimension }}>
      {uri ? (
        <FastImage
          source={{ uri }}
          style={[styles.image, { width: dimension, height: dimension, borderRadius: dimension / 2 }]}
          resizeMode={FastImage.resizeMode.cover}
        />
      ) : (
        <View
          style={[
            styles.fallback,
            { width: dimension, height: dimension, borderRadius: dimension / 2 },
          ]}
        >
          <Text style={[styles.initials, { fontSize: dimension * 0.35 }]}>{getInitials(name)}</Text>
        </View>
      )}
      {showOnlineIndicator ? (
        <View style={[styles.onlineDot, { width: dimension * 0.28, height: dimension * 0.28, borderRadius: dimension * 0.14 }]} />
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    backgroundColor: '#F0F0F0',
  },
  fallback: {
    backgroundColor: colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  initials: {
    fontFamily: fontFamily.semiBold,
    color: colors.primaryDark,
  },
  onlineDot: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: colors.success,
    borderWidth: 2,
    borderColor: colors.white,
  },
});
EOF

echo "Input.tsx, Avatar.tsx done."

cat > src/components/Card.tsx << 'EOF'
import React from 'react';
import { View, ViewStyle, StyleSheet } from 'react-native';
import { colors } from '../theme/colors';
import { spacing, radius } from '../theme/spacing';
import { mediumShadow } from '../theme/shadows';

interface CardProps {
  children: React.ReactNode;
  style?: ViewStyle;
  padded?: boolean;
}

export const Card: React.FC<CardProps> = ({ children, style, padded = true }) => (
  <View style={[styles.card, padded && styles.padding, style]}>{children}</View>
);

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.white,
    borderRadius: radius.md,
    ...mediumShadow,
  },
  padding: {
    padding: spacing.md,
  },
});
EOF

cat > src/components/Divider.tsx << 'EOF'
import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { colors } from '../theme/colors';
import { fontFamily, fontSize } from '../theme/typography';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';

interface DividerProps {
  label?: string;
  style?: ViewStyle;
}

export const Divider: React.FC<DividerProps> = ({ label, style }) => {
  if (!label) {
    return <View style={[styles.line, style]} />;
  }
  return (
    <View style={[styles.row, style]}>
      <View style={styles.line} />
      <Text style={styles.label}>{label}</Text>
      <View style={styles.line} />
    </View>
  );
};

const styles = StyleSheet.create({
  line: {
    flex: 1,
    height: 1,
    backgroundColor: colors.border,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  label: {
    marginHorizontal: wp('3%'),
    fontFamily: fontFamily.regular,
    fontSize: fontSize.sm,
    color: colors.textHint,
  },
});
EOF

cat > src/components/Badge.tsx << 'EOF'
import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { fontFamily, fontSize } from '../theme/typography';
import { colors } from '../theme/colors';

interface BadgeProps {
  label: string;
  color?: string;
  backgroundColor?: string;
  style?: ViewStyle;
}

export const Badge: React.FC<BadgeProps> = ({
  label,
  color = colors.white,
  backgroundColor = colors.primary,
  style,
}) => (
  <View style={[styles.badge, { backgroundColor }, style]}>
    <Text style={[styles.text, { color }]}>{label}</Text>
  </View>
);

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: wp('3%'),
    paddingVertical: wp('1%'),
    borderRadius: wp('4%'),
    alignSelf: 'flex-start',
  },
  text: {
    fontFamily: fontFamily.medium,
    fontSize: fontSize.xs,
  },
});
EOF

cat > src/components/ScreenWrapper.tsx << 'EOF'
import React from 'react';
import {
  StatusBar,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ViewStyle,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../theme/colors';

interface ScreenWrapperProps {
  children: React.ReactNode;
  backgroundColor?: string;
  statusBarStyle?: 'dark-content' | 'light-content';
  withKeyboardAvoiding?: boolean;
  style?: ViewStyle;
}

export const ScreenWrapper: React.FC<ScreenWrapperProps> = ({
  children,
  backgroundColor = colors.background,
  statusBarStyle = 'dark-content',
  withKeyboardAvoiding = false,
  style,
}) => {
  const content = (
    <SafeAreaView style={[styles.container, { backgroundColor }, style]}>
      <StatusBar barStyle={statusBarStyle} backgroundColor={backgroundColor} />
      {children}
    </SafeAreaView>
  );

  if (withKeyboardAvoiding) {
    return (
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        {content}
      </KeyboardAvoidingView>
    );
  }

  return content;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  flex: {
    flex: 1,
  },
});
EOF

cat > src/components/Loader.tsx << 'EOF'
import React from 'react';
import { View, ActivityIndicator, Text, StyleSheet, Modal } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { colors } from '../theme/colors';
import { fontFamily, fontSize } from '../theme/typography';

interface LoaderProps {
  visible: boolean;
  message?: string;
}

export const Loader: React.FC<LoaderProps> = ({ visible, message }) => {
  if (!visible) return null;
  return (
    <Modal transparent visible={visible} animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.box}>
          <ActivityIndicator size="large" color={colors.primary} />
          {message ? <Text style={styles.message}>{message}</Text> : null}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    backgroundColor: colors.white,
    borderRadius: wp('3%'),
    padding: wp('6%'),
    alignItems: 'center',
    minWidth: wp('40%'),
  },
  message: {
    marginTop: wp('3%'),
    fontFamily: fontFamily.medium,
    fontSize: fontSize.sm,
    color: colors.textPrimary,
  },
});
EOF

cat > src/components/index.ts << 'EOF'
export * from './Button';
export * from './Input';
export * from './Loader';
export * from './Avatar';
export * from './Badge';
export * from './Card';
export * from './Divider';
export * from './ScreenWrapper';
EOF

echo "All shared components done."

echo "Writing navigation files..."

cat > src/navigation/types.ts << 'EOF'
export * from '../types/navigation';
EOF

cat > src/navigation/AuthNavigator.tsx << 'EOF'
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { AuthStackParamList } from '../types/navigation';
import { SplashScreen } from '../features/onboarding/screens/SplashScreen';
import { OnboardingScreen } from '../features/onboarding/screens/OnboardingScreen';
import { RoleSelectScreen } from '../features/onboarding/screens/RoleSelectScreen';
import { LoginScreen } from '../features/auth/screens/LoginScreen';
import { RegisterScreen } from '../features/auth/screens/RegisterScreen';
import { ForgotPasswordScreen } from '../features/auth/screens/ForgotPasswordScreen';
import { OtpVerifyScreen } from '../features/auth/screens/OtpVerifyScreen';
import { SetNewPasswordScreen } from '../features/auth/screens/SetNewPasswordScreen';

const Stack = createStackNavigator<AuthStackParamList>();

export const AuthNavigator: React.FC = () => (
  <Stack.Navigator initialRouteName="Splash" screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Splash" component={SplashScreen} />
    <Stack.Screen name="Onboarding" component={OnboardingScreen} />
    <Stack.Screen name="RoleSelect" component={RoleSelectScreen} />
    <Stack.Screen name="Login" component={LoginScreen} />
    <Stack.Screen name="Register" component={RegisterScreen} />
    <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
    <Stack.Screen name="OtpVerify" component={OtpVerifyScreen} />
    <Stack.Screen name="SetNewPassword" component={SetNewPasswordScreen} />
  </Stack.Navigator>
);
EOF

cat > src/navigation/BottomTabNavigator.tsx << 'EOF'
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
EOF

echo "Auth/BottomTab navigators done."

cat > src/navigation/MainNavigator.tsx << 'EOF'
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
EOF

cat > src/navigation/RootNavigator.tsx << 'EOF'
import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { useAuthStore } from '../store/authStore';
import { AuthNavigator } from './AuthNavigator';
import { MainNavigator } from './MainNavigator';
import { Loader } from '../components/Loader';

export const RootNavigator: React.FC = () => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setChecking(false), 300);
    return () => clearTimeout(timer);
  }, []);

  if (checking) {
    return <Loader visible message="Loading..." />;
  }

  return (
    <NavigationContainer>
      {isAuthenticated ? <MainNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
};
EOF

echo "Main/Root navigators done."

echo "Writing onboarding feature files..."

cat > src/features/onboarding/screens/SplashScreen.tsx << 'EOF'
import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import FastImage from 'react-native-fast-image';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { colors } from '../../../theme/colors';
import { AuthStackParamList } from '../../../types/navigation';

type Nav = StackNavigationProp<AuthStackParamList, 'Splash'>;

export const SplashScreen: React.FC = () => {
  const navigation = useNavigation<Nav>();
  const opacity = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  useEffect(() => {
    opacity.value = withTiming(1, { duration: 600 });
    const timer = setTimeout(() => {
      navigation.replace('Onboarding');
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <Animated.View style={animatedStyle}>
        <FastImage
          source={require('../../../assets/images/logo.png')}
          style={styles.logo}
          resizeMode={FastImage.resizeMode.contain}
          accessibilityLabel="YouNeedARide logo"
        />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: wp('40%'),
    height: wp('40%'),
  },
});
EOF

cat > src/features/onboarding/components/PaginationDots.tsx << 'EOF'
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { colors } from '../../../theme/colors';

interface PaginationDotsProps {
  total: number;
  activeIndex: number;
}

export const PaginationDots: React.FC<PaginationDotsProps> = ({ total, activeIndex }) => (
  <View style={styles.row}>
    {Array.from({ length: total }).map((_, i) => (
      <View
        key={i}
        style={[
          styles.dot,
          { backgroundColor: i === activeIndex ? colors.primary : colors.border },
          i === activeIndex && styles.activeDot,
        ]}
      />
    ))}
  </View>
);

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dot: {
    width: wp('2%'),
    height: wp('2%'),
    borderRadius: wp('1%'),
    marginHorizontal: wp('1%'),
  },
  activeDot: {
    width: wp('5%'),
  },
});
EOF

cat > src/features/onboarding/components/OnboardingSlide.tsx << 'EOF'
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import FastImage from 'react-native-fast-image';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { colors } from '../../../theme/colors';
import { fontFamily, fontSize } from '../../../theme/typography';

interface OnboardingSlideProps {
  image: number;
  title: string;
  subtitle: string;
}

export const OnboardingSlide: React.FC<OnboardingSlideProps> = ({ image, title, subtitle }) => (
  <View style={styles.slide}>
    <FastImage source={image} style={styles.image} resizeMode={FastImage.resizeMode.contain} />
    <Text style={styles.title}>{title}</Text>
    <Text style={styles.subtitle}>{subtitle}</Text>
  </View>
);

const styles = StyleSheet.create({
  slide: {
    width: wp('100%'),
    alignItems: 'center',
    paddingHorizontal: wp('8%'),
  },
  image: {
    width: wp('80%'),
    height: hp('35%'),
    marginBottom: hp('4%'),
  },
  title: {
    fontFamily: fontFamily.bold,
    fontSize: fontSize.xxl,
    color: colors.textPrimary,
    textAlign: 'center',
    marginBottom: hp('1.5%'),
  },
  subtitle: {
    fontFamily: fontFamily.regular,
    fontSize: fontSize.md,
    color: colors.textSecondary,
    textAlign: 'center',
  },
});
EOF

echo "Onboarding slide/dot components done."

cat > src/features/onboarding/screens/OnboardingScreen.tsx << 'EOF'
import React, { useRef, useState } from 'react';
import { View, FlatList, StyleSheet, NativeSyntheticEvent, NativeScrollEvent } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { ScreenWrapper } from '../../../components/ScreenWrapper';
import { Button } from '../../../components/Button';
import { OnboardingSlide } from '../components/OnboardingSlide';
import { PaginationDots } from '../components/PaginationDots';
import { AuthStackParamList } from '../../../types/navigation';

type Nav = StackNavigationProp<AuthStackParamList, 'Onboarding'>;

const slides = [
  {
    image: require('../../../assets/images/onboarding1.png'),
    title: 'Ride With Ease',
    subtitle: 'Book a ride in seconds and get matched with nearby drivers.',
  },
  {
    image: require('../../../assets/images/onboarding2.png'),
    title: 'Track In Real Time',
    subtitle: 'Watch your driver arrive and follow your trip live on the map.',
  },
  {
    image: require('../../../assets/images/onboarding3.png'),
    title: 'Earn Rewards',
    subtitle: 'Get loyalty discounts the more you ride with us.',
  },
];

export const OnboardingScreen: React.FC = () => {
  const navigation = useNavigation<Nav>();
  const listRef = useRef<FlatList>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const index = Math.round(e.nativeEvent.contentOffset.x / wp('100%'));
    setActiveIndex(index);
  };

  const handleNext = () => {
    if (activeIndex < slides.length - 1) {
      listRef.current?.scrollToIndex({ index: activeIndex + 1 });
    } else {
      navigation.replace('RoleSelect');
    }
  };

  return (
    <ScreenWrapper>
      <FlatList
        ref={listRef}
        data={slides}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={(_, i) => String(i)}
        onMomentumScrollEnd={handleScroll}
        renderItem={({ item }) => (
          <OnboardingSlide image={item.image} title={item.title} subtitle={item.subtitle} />
        )}
      />
      <View style={styles.footer}>
        <PaginationDots total={slides.length} activeIndex={activeIndex} />
        <View style={styles.buttonRow}>
          <Button
            title="Skip"
            variant="ghost"
            onPress={() => navigation.replace('RoleSelect')}
            style={styles.skipButton}
          />
          <Button
            title={activeIndex === slides.length - 1 ? 'Get Started' : 'Next'}
            onPress={handleNext}
            style={styles.nextButton}
          />
        </View>
      </View>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  footer: {
    paddingHorizontal: wp('6%'),
    paddingBottom: hp('3%'),
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: hp('3%'),
  },
  skipButton: {
    flex: 1,
    marginRight: wp('2%'),
  },
  nextButton: {
    flex: 2,
  },
});
EOF

cat > src/features/onboarding/screens/RoleSelectScreen.tsx << 'EOF'
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { ScreenWrapper } from '../../../components/ScreenWrapper';
import { Button } from '../../../components/Button';
import { colors } from '../../../theme/colors';
import { fontFamily, fontSize } from '../../../theme/typography';
import { radius } from '../../../theme/spacing';
import { AuthStackParamList } from '../../../types/navigation';

type Nav = StackNavigationProp<AuthStackParamList, 'RoleSelect'>;

type Role = 'rider' | 'driver';

export const RoleSelectScreen: React.FC = () => {
  const navigation = useNavigation<Nav>();
  const [role, setRole] = useState<Role>('rider');

  const handleContinue = () => {
    navigation.replace('Login');
  };

  return (
    <ScreenWrapper>
      <View style={styles.container}>
        <Text style={styles.title}>How will you use the app?</Text>
        <TouchableOpacity
          style={[styles.card, role === 'rider' && styles.cardSelected]}
          onPress={() => setRole('rider')}
          accessibilityLabel="I'm a Rider"
        >
          <Icon name="person" size={wp('8%')} color={role === 'rider' ? colors.primary : colors.textSecondary} />
          <Text style={[styles.cardText, role === 'rider' && styles.cardTextSelected]}>I'm a Rider</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.card, role === 'driver' && styles.cardSelected]}
          onPress={() => setRole('driver')}
          accessibilityLabel="I'm a Driver"
        >
          <Icon name="directions-car" size={wp('8%')} color={role === 'driver' ? colors.primary : colors.textSecondary} />
          <Text style={[styles.cardText, role === 'driver' && styles.cardTextSelected]}>I'm a Driver</Text>
        </TouchableOpacity>
        <Button title="Continue" onPress={handleContinue} style={styles.continueButton} />
      </View>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: wp('6%'),
    paddingTop: hp('6%'),
  },
  title: {
    fontFamily: fontFamily.bold,
    fontSize: fontSize.xxl,
    color: colors.textPrimary,
    marginBottom: hp('4%'),
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    padding: wp('5%'),
    marginBottom: hp('2%'),
  },
  cardSelected: {
    borderColor: colors.primary,
    backgroundColor: colors.primaryLight,
  },
  cardText: {
    fontFamily: fontFamily.medium,
    fontSize: fontSize.lg,
    color: colors.textSecondary,
    marginLeft: wp('4%'),
  },
  cardTextSelected: {
    color: colors.primaryDark,
  },
  continueButton: {
    marginTop: hp('4%'),
  },
});
EOF

echo "Onboarding screens done."

echo "Writing auth feature files..."

cat > src/features/auth/components/AuthHeader.tsx << 'EOF'
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import FastImage from 'react-native-fast-image';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { colors } from '../../../theme/colors';
import { fontFamily, fontSize } from '../../../theme/typography';

interface AuthHeaderProps {
  title: string;
  subtitle?: string;
}

export const AuthHeader: React.FC<AuthHeaderProps> = ({ title, subtitle }) => (
  <View style={styles.container}>
    <FastImage
      source={require('../../../assets/images/logo.png')}
      style={styles.logo}
      resizeMode={FastImage.resizeMode.contain}
    />
    <Text style={styles.title}>{title}</Text>
    {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
  </View>
);

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginBottom: hp('3%'),
  },
  logo: {
    width: wp('20%'),
    height: wp('20%'),
    marginBottom: hp('2%'),
  },
  title: {
    fontFamily: fontFamily.bold,
    fontSize: fontSize.xxl,
    color: colors.textPrimary,
  },
  subtitle: {
    fontFamily: fontFamily.regular,
    fontSize: fontSize.sm,
    color: colors.textSecondary,
    marginTop: hp('0.5%'),
  },
});
EOF

cat > src/features/auth/components/SocialLoginButtons.tsx << 'EOF'
import React from 'react';
import { View, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Button } from '../../../components/Button';
import { colors } from '../../../theme/colors';

interface SocialLoginButtonsProps {
  onGooglePress?: () => void;
  onFacebookPress?: () => void;
}

export const SocialLoginButtons: React.FC<SocialLoginButtonsProps> = ({
  onGooglePress,
  onFacebookPress,
}) => (
  <View style={styles.row}>
    <Button
      title="Google"
      variant="outline"
      onPress={onGooglePress || (() => {})}
      leftIcon={<Icon name="logo-google" size={wp('5%')} color={colors.textPrimary} />}
      style={styles.button}
    />
    <Button
      title="Facebook"
      variant="outline"
      onPress={onFacebookPress || (() => {})}
      leftIcon={<Icon name="logo-facebook" size={wp('5%')} color={colors.textPrimary} />}
      style={styles.button}
    />
  </View>
);

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    gap: wp('3%'),
    marginTop: hp('2%'),
  },
  button: {
    flex: 1,
  },
});
EOF

echo "Auth components done."

cat > src/features/auth/screens/LoginScreen.tsx << 'EOF'
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { ScreenWrapper } from '../../../components/ScreenWrapper';
import { Input } from '../../../components/Input';
import { Button } from '../../../components/Button';
import { Divider } from '../../../components/Divider';
import { AuthHeader } from '../components/AuthHeader';
import { SocialLoginButtons } from '../components/SocialLoginButtons';
import { useLogin } from '../../../api/hooks/useAuthApi';
import { useAuthStore } from '../../../store/authStore';
import { colors } from '../../../theme/colors';
import { fontFamily, fontSize } from '../../../theme/typography';
import { AuthStackParamList } from '../../../types/navigation';

type Nav = StackNavigationProp<AuthStackParamList, 'Login'>;

const schema = z.object({
  email: z.string().email('Enter a valid email'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

type FormData = z.infer<typeof schema>;

export const LoginScreen: React.FC = () => {
  const navigation = useNavigation<Nav>();
  const login = useLogin();
  const setRider = useAuthStore((s) => s.setRider);
  const setToken = useAuthStore((s) => s.setToken);

  const { control, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { email: '', password: '' },
  });

  const onSubmit = (data: FormData) => {
    login.mutate(data, {
      onSuccess: (res) => {
        setRider(res.rider);
        setToken(res.token);
      },
    });
  };

  return (
    <ScreenWrapper withKeyboardAvoiding>
      <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
        <AuthHeader title="Welcome Back" subtitle="Login to continue your ride" />
        <Controller
          control={control}
          name="email"
          render={({ field: { value, onChange } }) => (
            <Input
              label="Email"
              placeholder="you@example.com"
              leftIcon="email"
              autoCapitalize="none"
              keyboardType="email-address"
              value={value}
              onChangeText={onChange}
              error={errors.email?.message}
            />
          )}
        />
        <Controller
          control={control}
          name="password"
          render={({ field: { value, onChange } }) => (
            <Input
              label="Password"
              placeholder="Enter password"
              leftIcon="lock"
              isPassword
              value={value}
              onChangeText={onChange}
              error={errors.password?.message}
            />
          )}
        />
        <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
          <Text style={styles.forgotText}>Forgot Password?</Text>
        </TouchableOpacity>
        <Button
          title="Login"
          onPress={handleSubmit(onSubmit)}
          loading={login.isPending}
          style={styles.loginButton}
        />
        <Divider label="OR" style={styles.divider} />
        <SocialLoginButtons />
        <View style={styles.registerRow}>
          <Text style={styles.registerText}>Don't have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Register')}>
            <Text style={styles.registerLink}>Register</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: wp('6%'),
    paddingTop: hp('8%'),
    paddingBottom: hp('4%'),
  },
  forgotText: {
    alignSelf: 'flex-end',
    fontFamily: fontFamily.medium,
    fontSize: fontSize.sm,
    color: colors.primary,
    marginBottom: hp('2%'),
  },
  loginButton: {
    marginTop: hp('1%'),
  },
  divider: {
    marginVertical: hp('3%'),
  },
  registerRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: hp('4%'),
  },
  registerText: {
    fontFamily: fontFamily.regular,
    fontSize: fontSize.sm,
    color: colors.textSecondary,
  },
  registerLink: {
    fontFamily: fontFamily.semiBold,
    fontSize: fontSize.sm,
    color: colors.primary,
  },
});
EOF

echo "LoginScreen done."

cat > src/features/auth/screens/RegisterScreen.tsx << 'EOF'
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { ScreenWrapper } from '../../../components/ScreenWrapper';
import { Input } from '../../../components/Input';
import { Button } from '../../../components/Button';
import { AuthHeader } from '../components/AuthHeader';
import { useRegister } from '../../../api/hooks/useAuthApi';
import { colors } from '../../../theme/colors';
import { fontFamily, fontSize } from '../../../theme/typography';
import { AuthStackParamList } from '../../../types/navigation';

type Nav = StackNavigationProp<AuthStackParamList, 'Register'>;

const schema = z
  .object({
    fullName: z.string().min(2, 'Enter your full name'),
    email: z.string().email('Enter a valid email'),
    phone: z.string().min(7, 'Enter a valid phone number'),
    password: z.string().min(8, 'Password must be at least 8 characters'),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

type FormData = z.infer<typeof schema>;

export const RegisterScreen: React.FC = () => {
  const navigation = useNavigation<Nav>();
  const register = useRegister();
  const [agreed, setAgreed] = useState(false);

  const { control, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { fullName: '', email: '', phone: '', password: '', confirmPassword: '' },
  });

  const onSubmit = (data: FormData) => {
    register.mutate(data, {
      onSuccess: () => {
        navigation.navigate('OtpVerify', { email: data.email });
      },
    });
  };

  return (
    <ScreenWrapper withKeyboardAvoiding>
      <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
        <AuthHeader title="Create Account" subtitle="Sign up to start riding" />
        <Controller
          control={control}
          name="fullName"
          render={({ field: { value, onChange } }) => (
            <Input label="Full Name" placeholder="John Doe" leftIcon="person" value={value} onChangeText={onChange} error={errors.fullName?.message} />
          )}
        />
        <Controller
          control={control}
          name="email"
          render={({ field: { value, onChange } }) => (
            <Input label="Email" placeholder="you@example.com" leftIcon="email" autoCapitalize="none" keyboardType="email-address" value={value} onChangeText={onChange} error={errors.email?.message} />
          )}
        />
        <Controller
          control={control}
          name="phone"
          render={({ field: { value, onChange } }) => (
            <Input label="Phone Number" placeholder="+1 555 000 1234" leftIcon="phone" keyboardType="phone-pad" value={value} onChangeText={onChange} error={errors.phone?.message} />
          )}
        />
        <Controller
          control={control}
          name="password"
          render={({ field: { value, onChange } }) => (
            <Input label="Password" placeholder="Create password" leftIcon="lock" isPassword value={value} onChangeText={onChange} error={errors.password?.message} />
          )}
        />
        <Controller
          control={control}
          name="confirmPassword"
          render={({ field: { value, onChange } }) => (
            <Input label="Confirm Password" placeholder="Re-enter password" leftIcon="lock" isPassword value={value} onChangeText={onChange} error={errors.confirmPassword?.message} />
          )}
        />
        <TouchableOpacity style={styles.checkboxRow} onPress={() => setAgreed((a) => !a)} accessibilityLabel="Agree to terms">
          <Icon name={agreed ? 'check-box' : 'check-box-outline-blank'} size={wp('5%')} color={agreed ? colors.primary : colors.textHint} />
          <Text style={styles.checkboxText}>I agree to the Terms of Service and Privacy Policy</Text>
        </TouchableOpacity>
        <Button title="Register" onPress={handleSubmit(onSubmit)} loading={register.isPending} disabled={!agreed} style={styles.registerButton} />
        <View style={styles.loginRow}>
          <Text style={styles.loginText}>Already have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={styles.loginLink}>Login</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: wp('6%'),
    paddingTop: hp('6%'),
    paddingBottom: hp('4%'),
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: hp('3%'),
  },
  checkboxText: {
    flex: 1,
    marginLeft: wp('2%'),
    fontFamily: fontFamily.regular,
    fontSize: fontSize.xs,
    color: colors.textSecondary,
  },
  registerButton: {
    marginBottom: hp('2%'),
  },
  loginRow: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  loginText: {
    fontFamily: fontFamily.regular,
    fontSize: fontSize.sm,
    color: colors.textSecondary,
  },
  loginLink: {
    fontFamily: fontFamily.semiBold,
    fontSize: fontSize.sm,
    color: colors.primary,
  },
});
EOF

echo "RegisterScreen done."

cat > src/features/auth/screens/ForgotPasswordScreen.tsx << 'EOF'
import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { ScreenWrapper } from '../../../components/ScreenWrapper';
import { Input } from '../../../components/Input';
import { Button } from '../../../components/Button';
import { AuthHeader } from '../components/AuthHeader';
import { useForgotPassword } from '../../../api/hooks/useAuthApi';
import { AuthStackParamList } from '../../../types/navigation';

type Nav = StackNavigationProp<AuthStackParamList, 'ForgotPassword'>;

const schema = z.object({
  email: z.string().email('Enter a valid email'),
});

type FormData = z.infer<typeof schema>;

export const ForgotPasswordScreen: React.FC = () => {
  const navigation = useNavigation<Nav>();
  const forgotPassword = useForgotPassword();

  const { control, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { email: '' },
  });

  const onSubmit = (data: FormData) => {
    forgotPassword.mutate(data, {
      onSuccess: () => {
        navigation.navigate('OtpVerify', { email: data.email });
      },
    });
  };

  return (
    <ScreenWrapper withKeyboardAvoiding>
      <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
        <AuthHeader title="Forgot Password" subtitle="Enter your email to receive a reset code" />
        <Controller
          control={control}
          name="email"
          render={({ field: { value, onChange } }) => (
            <Input label="Email" placeholder="you@example.com" leftIcon="email" autoCapitalize="none" keyboardType="email-address" value={value} onChangeText={onChange} error={errors.email?.message} />
          )}
        />
        <Button title="Send Reset Code" onPress={handleSubmit(onSubmit)} loading={forgotPassword.isPending} style={styles.button} />
      </ScrollView>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: wp('6%'),
    paddingTop: hp('8%'),
  },
  button: {
    marginTop: hp('1%'),
  },
});
EOF

cat > src/features/auth/screens/OtpVerifyScreen.tsx << 'EOF'
import React, { useEffect, useRef, useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { ScreenWrapper } from '../../../components/ScreenWrapper';
import { Button } from '../../../components/Button';
import { AuthHeader } from '../components/AuthHeader';
import { useVerifyOtp } from '../../../api/hooks/useAuthApi';
import { colors } from '../../../theme/colors';
import { fontFamily, fontSize } from '../../../theme/typography';
import { radius } from '../../../theme/spacing';
import { AuthStackParamList } from '../../../types/navigation';

type Nav = StackNavigationProp<AuthStackParamList, 'OtpVerify'>;
type Rt = RouteProp<AuthStackParamList, 'OtpVerify'>;

const OTP_LENGTH = 6;

export const OtpVerifyScreen: React.FC = () => {
  const navigation = useNavigation<Nav>();
  const route = useRoute<Rt>();
  const verifyOtp = useVerifyOtp();
  const [digits, setDigits] = useState<string[]>(Array(OTP_LENGTH).fill(''));
  const [countdown, setCountdown] = useState(30);
  const inputs = useRef<Array<TextInput | null>>([]);

  useEffect(() => {
    if (countdown <= 0) return;
    const timer = setTimeout(() => setCountdown((c) => c - 1), 1000);
    return () => clearTimeout(timer);
  }, [countdown]);

  const handleChange = (text: string, index: number) => {
    const next = [...digits];
    next[index] = text.slice(-1);
    setDigits(next);
    if (text && index < OTP_LENGTH - 1) {
      inputs.current[index + 1]?.focus();
    }
  };

  const handleVerify = () => {
    const otp = digits.join('');
    verifyOtp.mutate(
      { email: route.params.email, otp },
      {
        onSuccess: () => {
          navigation.navigate('SetNewPassword', { email: route.params.email, otp });
        },
      },
    );
  };

  return (
    <ScreenWrapper>
      <View style={styles.container}>
        <AuthHeader title="Verify Code" subtitle={'Enter the 6-digit code sent to ' + route.params.email} />
        <View style={styles.otpRow}>
          {digits.map((digit, index) => (
            <TextInput
              key={index}
              ref={(ref) => { inputs.current[index] = ref; }}
              style={styles.otpBox}
              value={digit}
              onChangeText={(text) => handleChange(text, index)}
              keyboardType="number-pad"
              maxLength={1}
              accessibilityLabel={'OTP digit ' + (index + 1)}
            />
          ))}
        </View>
        <TouchableOpacity disabled={countdown > 0} onPress={() => setCountdown(30)}>
          <Text style={styles.resendText}>
            {countdown > 0 ? 'Resend code in ' + countdown + 's' : 'Resend Code'}
          </Text>
        </TouchableOpacity>
        <Button title="Verify" onPress={handleVerify} loading={verifyOtp.isPending} style={styles.button} />
      </View>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: wp('6%'),
    paddingTop: hp('8%'),
  },
  otpRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: hp('3%'),
  },
  otpBox: {
    width: wp('12%'),
    height: wp('12%'),
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.sm,
    textAlign: 'center',
    fontFamily: fontFamily.semiBold,
    fontSize: fontSize.xl,
    color: colors.textPrimary,
  },
  resendText: {
    textAlign: 'center',
    fontFamily: fontFamily.medium,
    fontSize: fontSize.sm,
    color: colors.primary,
    marginBottom: hp('3%'),
  },
  button: {
    marginTop: hp('1%'),
  },
});
EOF

echo "ForgotPassword/OtpVerify screens done."

cat > src/features/auth/screens/SetNewPasswordScreen.tsx << 'EOF'
import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { ScreenWrapper } from '../../../components/ScreenWrapper';
import { Input } from '../../../components/Input';
import { Button } from '../../../components/Button';
import { AuthHeader } from '../components/AuthHeader';
import { useResetPassword } from '../../../api/hooks/useAuthApi';
import { AuthStackParamList } from '../../../types/navigation';

type Nav = StackNavigationProp<AuthStackParamList, 'SetNewPassword'>;
type Rt = RouteProp<AuthStackParamList, 'SetNewPassword'>;

const schema = z
  .object({
    newPassword: z.string().min(8, 'Password must be at least 8 characters'),
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

type FormData = z.infer<typeof schema>;

export const SetNewPasswordScreen: React.FC = () => {
  const navigation = useNavigation<Nav>();
  const route = useRoute<Rt>();
  const resetPassword = useResetPassword();

  const { control, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { newPassword: '', confirmPassword: '' },
  });

  const onSubmit = (data: FormData) => {
    resetPassword.mutate(
      { email: route.params.email, otp: route.params.otp, newPassword: data.newPassword },
      {
        onSuccess: () => {
          navigation.navigate('Login');
        },
      },
    );
  };

  return (
    <ScreenWrapper withKeyboardAvoiding>
      <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
        <AuthHeader title="Set New Password" subtitle="Your old password will be invalidated" />
        <Controller
          control={control}
          name="newPassword"
          render={({ field: { value, onChange } }) => (
            <Input label="New Password" placeholder="Enter new password" leftIcon="lock" isPassword value={value} onChangeText={onChange} error={errors.newPassword?.message} />
          )}
        />
        <Controller
          control={control}
          name="confirmPassword"
          render={({ field: { value, onChange } }) => (
            <Input label="Confirm Password" placeholder="Re-enter password" leftIcon="lock" isPassword value={value} onChangeText={onChange} error={errors.confirmPassword?.message} />
          )}
        />
        <Button title="Update Password" onPress={handleSubmit(onSubmit)} loading={resetPassword.isPending} style={styles.button} />
      </ScrollView>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: wp('6%'),
    paddingTop: hp('8%'),
  },
  button: {
    marginTop: hp('1%'),
  },
});
EOF

echo "SetNewPasswordScreen done."

echo "Writing home feature files..."

cat > src/features/home/components/MapViewComponent.tsx << 'EOF'
import React from 'react';
import { StyleSheet } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { colors } from '../../../theme/colors';

interface DriverMarker {
  id: string;
  latitude: number;
  longitude: number;
}

interface MapViewComponentProps {
  latitude: number;
  longitude: number;
  drivers?: DriverMarker[];
}

export const MapViewComponent: React.FC<MapViewComponentProps> = ({ latitude, longitude, drivers = [] }) => (
  <MapView
    provider={PROVIDER_GOOGLE}
    style={styles.map}
    initialRegion={{
      latitude,
      longitude,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    }}
    showsUserLocation
    showsMyLocationButton
  >
    {drivers.map((driver) => (
      <Marker
        key={driver.id}
        coordinate={{ latitude: driver.latitude, longitude: driver.longitude }}
        pinColor={colors.primary}
        accessibilityLabel="Nearby driver"
      />
    ))}
  </MapView>
);

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
});
EOF

cat > src/features/home/components/NearbyDriverMarker.tsx << 'EOF'
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
EOF

cat > src/features/home/components/RewardProgressBar.tsx << 'EOF'
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { colors } from '../../../theme/colors';
import { fontFamily, fontSize } from '../../../theme/typography';
import { LOYALTY_MILESTONE_RESET } from '../../../constants/config';

interface RewardProgressBarProps {
  rideCount: number;
}

export const RewardProgressBar: React.FC<RewardProgressBarProps> = ({ rideCount }) => {
  const progress = Math.min(rideCount / LOYALTY_MILESTONE_RESET, 1);

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Text style={styles.label}>Reward Points</Text>
        <Text style={styles.count}>{rideCount}/{LOYALTY_MILESTONE_RESET} rides</Text>
      </View>
      <View style={styles.track}>
        <View style={[styles.fill, { width: (progress * 100) + '%' }]} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: wp('1%'),
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: hp('0.8%'),
  },
  label: {
    fontFamily: fontFamily.medium,
    fontSize: fontSize.sm,
    color: colors.textPrimary,
  },
  count: {
    fontFamily: fontFamily.regular,
    fontSize: fontSize.xs,
    color: colors.textSecondary,
  },
  track: {
    height: hp('1%'),
    backgroundColor: colors.border,
    borderRadius: hp('0.5%'),
    overflow: 'hidden',
  },
  fill: {
    height: '100%',
    backgroundColor: colors.primary,
  },
});
EOF

cat > src/features/home/components/PickupDestinationBar.tsx << 'EOF'
import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { colors } from '../../../theme/colors';
import { fontFamily, fontSize } from '../../../theme/typography';
import { radius } from '../../../theme/spacing';
import { mediumShadow } from '../../../theme/shadows';

interface PickupDestinationBarProps {
  onPress: () => void;
}

export const PickupDestinationBar: React.FC<PickupDestinationBarProps> = ({ onPress }) => (
  <TouchableOpacity style={styles.bar} onPress={onPress} accessibilityLabel="Where to?">
    <Icon name="search" size={wp('5%')} color={colors.textSecondary} />
    <Text style={styles.text}>Where to?</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  bar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: radius.md,
    height: hp('6.5%'),
    paddingHorizontal: wp('4%'),
    ...mediumShadow,
  },
  text: {
    marginLeft: wp('3%'),
    fontFamily: fontFamily.medium,
    fontSize: fontSize.md,
    color: colors.textPrimary,
  },
});
EOF

echo "Home components done."

cat > src/features/home/screens/HomeMapScreen.tsx << 'EOF'
import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/Ionicons';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { MapViewComponent } from '../components/MapViewComponent';
import { PickupDestinationBar } from '../components/PickupDestinationBar';
import { RewardProgressBar } from '../components/RewardProgressBar';
import { Avatar } from '../../../components/Avatar';
import { Card } from '../../../components/Card';
import { useAuthStore } from '../../../store/authStore';
import { colors } from '../../../theme/colors';
import { MainStackParamList } from '../../../types/navigation';

type Nav = StackNavigationProp<MainStackParamList, 'BottomTabs'>;

export const HomeMapScreen: React.FC = () => {
  const navigation = useNavigation<Nav>();
  const rider = useAuthStore((s) => s.rider);

  return (
    <View style={styles.container}>
      <MapViewComponent latitude={37.7749} longitude={-122.4194} drivers={[]} />
      <View style={styles.topRow}>
        <Avatar uri={rider?.profilePhotoUrl} name={rider?.fullName} size="sm" />
        <TouchableOpacity style={styles.notificationButton} accessibilityLabel="Notifications">
          <Icon name="notifications-outline" size={wp('6%')} color={colors.textPrimary} />
        </TouchableOpacity>
      </View>
      <Card style={styles.bottomSheet}>
        <PickupDestinationBar onPress={() => navigation.navigate('SetDestination', { pickup: { latitude: 37.7749, longitude: -122.4194 } })} />
        <View style={styles.rewardSpacer}>
          <RewardProgressBar rideCount={rider?.loyaltyRideCount || 0} />
        </View>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topRow: {
    position: 'absolute',
    top: hp('6%'),
    left: wp('5%'),
    right: wp('5%'),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  notificationButton: {
    width: wp('11%'),
    height: wp('11%'),
    borderRadius: wp('5.5%'),
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomSheet: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    paddingBottom: hp('4%'),
  },
  rewardSpacer: {
    marginTop: hp('2%'),
  },
});
EOF

echo "HomeMapScreen done."

echo "Writing booking feature components..."

cat > src/features/booking/components/SavedLocationItem.tsx << 'EOF'
import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { colors } from '../../../theme/colors';
import { fontFamily, fontSize } from '../../../theme/typography';
import { SavedLocation } from '../../../types/user';

interface SavedLocationItemProps {
  location: SavedLocation;
  onPress: (location: SavedLocation) => void;
}

const iconMap: Record<SavedLocation['type'], string> = {
  home: 'home',
  work: 'work',
  other: 'place',
};

export const SavedLocationItem: React.FC<SavedLocationItemProps> = ({ location, onPress }) => (
  <TouchableOpacity style={styles.row} onPress={() => onPress(location)} accessibilityLabel={location.label}>
    <Icon name={iconMap[location.type]} size={wp('5%')} color={colors.primary} />
    <Text style={styles.label}>{location.label}</Text>
    <Text style={styles.address} numberOfLines={1}>{location.address}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: hp('1.5%'),
  },
  label: {
    marginLeft: wp('3%'),
    fontFamily: fontFamily.medium,
    fontSize: fontSize.md,
    color: colors.textPrimary,
    width: wp('18%'),
  },
  address: {
    flex: 1,
    fontFamily: fontFamily.regular,
    fontSize: fontSize.sm,
    color: colors.textSecondary,
  },
});
EOF

cat > src/features/booking/components/PickupNotesInput.tsx << 'EOF'
import React from 'react';
import { Input } from '../../../components/Input';

interface PickupNotesInputProps {
  value: string;
  onChangeText: (text: string) => void;
}

export const PickupNotesInput: React.FC<PickupNotesInputProps> = ({ value, onChangeText }) => (
  <Input
    label="Pickup Notes"
    placeholder="Gate code, landmark, building..."
    leftIcon="note"
    value={value}
    onChangeText={onChangeText}
  />
);
EOF

cat > src/features/booking/components/FareBreakdownCard.tsx << 'EOF'
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Card } from '../../../components/Card';
import { Divider } from '../../../components/Divider';
import { colors } from '../../../theme/colors';
import { fontFamily, fontSize } from '../../../theme/typography';
import { FareBreakdown } from '../../../types/ride';
import { formatFareBreakdown } from '../../../utils/formatFare';

interface FareBreakdownCardProps {
  fare: FareBreakdown;
}

export const FareBreakdownCard: React.FC<FareBreakdownCardProps> = ({ fare }) => {
  const formatted = formatFareBreakdown(fare);

  return (
    <Card>
      <Row label="Base Fare" value={formatted.baseFare} />
      <Row label="Distance Rate" value={formatted.distanceRate} />
      <Row label="Platform Fee" value={formatted.platformFee} />
      {formatted.discount ? <Row label="Discount" value={'-' + formatted.discount} /> : null}
      <Divider style={styles.divider} />
      <Row label="Total" value={formatted.totalFare} bold />
    </Card>
  );
};

const Row: React.FC<{ label: string; value: string; bold?: boolean }> = ({ label, value, bold }) => (
  <View style={styles.row}>
    <Text style={[styles.label, bold && styles.bold]}>{label}</Text>
    <Text style={[styles.value, bold && styles.bold]}>{value}</Text>
  </View>
);

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: hp('0.7%'),
  },
  label: {
    fontFamily: fontFamily.regular,
    fontSize: fontSize.sm,
    color: colors.textSecondary,
  },
  value: {
    fontFamily: fontFamily.medium,
    fontSize: fontSize.sm,
    color: colors.textPrimary,
  },
  bold: {
    fontFamily: fontFamily.bold,
    fontSize: fontSize.md,
    color: colors.textPrimary,
  },
  divider: {
    marginVertical: hp('1%'),
  },
});
EOF

echo "Booking components done."

echo "Writing booking screens..."

cat > src/features/booking/screens/SetPickupScreen.tsx << 'EOF'
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
    navigation.navigate('SetDestination', { pickup: { latitude: location.latitude, longitude: location.longitude, address: location.address } });
  };

  const handleConfirm = () => {
    setPickup({ latitude: 37.7749, longitude: -122.4194, address });
    navigation.navigate('SetDestination', { pickup: { latitude: 37.7749, longitude: -122.4194, address } });
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
EOF

cat > src/features/booking/screens/SetDestinationScreen.tsx << 'EOF'
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
EOF

echo "SetPickup/SetDestination screens done."

cat > src/features/booking/screens/ConfirmAddressScreen.tsx << 'EOF'
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
EOF

cat > src/features/booking/screens/FareEstimateScreen.tsx << 'EOF'
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { ScreenWrapper } from '../../../components/ScreenWrapper';
import { Button } from '../../../components/Button';
import { Card } from '../../../components/Card';
import { FareBreakdownCard } from '../components/FareBreakdownCard';
import { MapViewComponent } from '../../home/components/MapViewComponent';
import { useFareEstimate, useRequestRide } from '../../../api/hooks/useRideApi';
import { useRideStore } from '../../../store/rideStore';
import { colors } from '../../../theme/colors';
import { fontFamily, fontSize } from '../../../theme/typography';
import { calculateDistance } from '../../../utils/locationHelpers';
import { MainStackParamList } from '../../../types/navigation';

type Nav = StackNavigationProp<MainStackParamList, 'FareEstimate'>;
type Rt = RouteProp<MainStackParamList, 'FareEstimate'>;

export const FareEstimateScreen: React.FC = () => {
  const navigation = useNavigation<Nav>();
  const route = useRoute<Rt>();
  const { pickup, destination } = route.params;
  const fareEstimateMutation = useFareEstimate();
  const requestRide = useRequestRide();
  const fareEstimate = useRideStore((s) => s.fareEstimate);
  const setFareEstimate = useRideStore((s) => s.setFareEstimate);
  const selectedPaymentMethod = useRideStore((s) => s.selectedPaymentMethod);
  const distanceKm = calculateDistance(pickup, destination);

  useEffect(() => {
    fareEstimateMutation.mutate({ pickup, destination }, {
      onSuccess: (data) => setFareEstimate(data),
    });
  }, []);

  const handleFindDrivers = () => {
    requestRide.mutate(
      { pickup, destination, paymentMethodId: selectedPaymentMethod?.id || 'cash' },
      {
        onSuccess: (ride) => navigation.navigate('FindingDriver', { rideId: ride.id }),
      },
    );
  };

  return (
    <ScreenWrapper>
      <View style={styles.mapContainer}>
        <MapViewComponent latitude={pickup.latitude} longitude={pickup.longitude} />
      </View>
      <ScrollView style={styles.card} contentContainerStyle={styles.cardContent}>
        <Text style={styles.heading}>Trip Estimate</Text>
        <View style={styles.statsRow}>
          <Text style={styles.statText}>{distanceKm.toFixed(1)} km</Text>
          <Text style={styles.statText}>{Math.round(distanceKm * 2.5)} min</Text>
        </View>
        {fareEstimate ? (
          <FareBreakdownCard fare={fareEstimate} />
        ) : (
          <Card><Text style={styles.loadingText}>Calculating fare...</Text></Card>
        )}
        <Button
          title="Find Drivers"
          onPress={handleFindDrivers}
          loading={requestRide.isPending}
          disabled={!fareEstimate}
          style={styles.button}
        />
      </ScrollView>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  mapContainer: {
    flex: 1,
  },
  card: {
    maxHeight: hp('45%'),
  },
  cardContent: {
    padding: wp('6%'),
  },
  heading: {
    fontFamily: fontFamily.bold,
    fontSize: fontSize.lg,
    color: colors.textPrimary,
    marginBottom: hp('1%'),
  },
  statsRow: {
    flexDirection: 'row',
    gap: wp('4%'),
    marginBottom: hp('2%'),
  },
  statText: {
    fontFamily: fontFamily.medium,
    fontSize: fontSize.sm,
    color: colors.textSecondary,
  },
  loadingText: {
    fontFamily: fontFamily.regular,
    fontSize: fontSize.sm,
    color: colors.textSecondary,
  },
  button: {
    marginTop: hp('2%'),
  },
});
EOF

echo "ConfirmAddress/FareEstimate screens done."

cat > src/features/booking/screens/FindingDriverScreen.tsx << 'EOF'
import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import Animated, { useSharedValue, useAnimatedStyle, withRepeat, withTiming } from 'react-native-reanimated';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { ScreenWrapper } from '../../../components/ScreenWrapper';
import { Button } from '../../../components/Button';
import { MapViewComponent } from '../../home/components/MapViewComponent';
import { useCancelRide } from '../../../api/hooks/useRideApi';
import { onRideStatusUpdate } from '../../../api/socket';
import { colors } from '../../../theme/colors';
import { fontFamily, fontSize } from '../../../theme/typography';
import { MainStackParamList } from '../../../types/navigation';

type Nav = StackNavigationProp<MainStackParamList, 'FindingDriver'>;
type Rt = RouteProp<MainStackParamList, 'FindingDriver'>;

export const FindingDriverScreen: React.FC = () => {
  const navigation = useNavigation<Nav>();
  const route = useRoute<Rt>();
  const cancelRide = useCancelRide();
  const scale = useSharedValue(1);

  const pulseStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  useEffect(() => {
    scale.value = withRepeat(withTiming(1.4, { duration: 900 }), -1, true);

    onRideStatusUpdate((data) => {
      if (data.rideId === route.params.rideId && data.status === 'DRIVER_ASSIGNED') {
        navigation.replace('RideTracking', { rideId: route.params.rideId });
      }
    });
  }, []);

  const handleCancel = () => {
    cancelRide.mutate(route.params.rideId, {
      onSuccess: () => navigation.goBack(),
    });
  };

  return (
    <ScreenWrapper>
      <View style={styles.mapContainer}>
        <MapViewComponent latitude={37.7749} longitude={-122.4194} />
        <View style={styles.overlay}>
          <Animated.View style={[styles.pulse, pulseStyle]} />
          <View style={styles.centerDot} />
        </View>
      </View>
      <View style={styles.footer}>
        <Text style={styles.title}>Finding your driver</Text>
        <Text style={styles.subtitle}>This usually takes less than a minute</Text>
        <Button title="Cancel Request" variant="outline" onPress={handleCancel} loading={cancelRide.isPending} style={styles.button} />
      </View>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  mapContainer: {
    flex: 1,
  },
  overlay: {
    position: 'absolute',
    top: '45%',
    left: '45%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  pulse: {
    position: 'absolute',
    width: wp('14%'),
    height: wp('14%'),
    borderRadius: wp('7%'),
    backgroundColor: colors.primaryLight,
  },
  centerDot: {
    width: wp('4%'),
    height: wp('4%'),
    borderRadius: wp('2%'),
    backgroundColor: colors.primary,
  },
  footer: {
    paddingHorizontal: wp('6%'),
    paddingVertical: hp('3%'),
    alignItems: 'center',
  },
  title: {
    fontFamily: fontFamily.bold,
    fontSize: fontSize.lg,
    color: colors.textPrimary,
  },
  subtitle: {
    fontFamily: fontFamily.regular,
    fontSize: fontSize.sm,
    color: colors.textSecondary,
    marginTop: hp('0.5%'),
    marginBottom: hp('2%'),
  },
  button: {
    width: '100%',
  },
});
EOF

echo "FindingDriverScreen done."

echo "Writing tracking feature components..."

cat > src/features/tracking/components/DriverInfoCard.tsx << 'EOF'
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
EOF

cat > src/features/tracking/components/RideStatusBar.tsx << 'EOF'
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { fontFamily, fontSize } from '../../../theme/typography';
import { radius } from '../../../theme/spacing';
import { colors } from '../../../theme/colors';
import { RideStatus } from '../../../types/ride';
import { rideStatusLabel, rideStatusColor } from '../../../constants/rideStatus';

interface RideStatusBarProps {
  status: RideStatus;
}

export const RideStatusBar: React.FC<RideStatusBarProps> = ({ status }) => (
  <View style={[styles.bar, { backgroundColor: rideStatusColor[status] + '20' }]}>
    <View style={[styles.dot, { backgroundColor: rideStatusColor[status] }]} />
    <Text style={[styles.text, { color: rideStatusColor[status] }]}>{rideStatusLabel[status]}</Text>
  </View>
);

const styles = StyleSheet.create({
  bar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: wp('4%'),
    paddingVertical: hp('1%'),
    borderRadius: radius.md,
    alignSelf: 'flex-start',
  },
  dot: {
    width: wp('2%'),
    height: wp('2%'),
    borderRadius: wp('1%'),
    marginRight: wp('2%'),
  },
  text: {
    fontFamily: fontFamily.semiBold,
    fontSize: fontSize.sm,
  },
});
EOF

cat > src/features/tracking/components/ETADisplay.tsx << 'EOF'
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
EOF

cat > src/features/tracking/components/ChatCallButtons.tsx << 'EOF'
import React from 'react';
import { View, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { colors } from '../../../theme/colors';

interface ChatCallButtonsProps {
  onChatPress: () => void;
  phoneNumber?: string;
}

export const ChatCallButtons: React.FC<ChatCallButtonsProps> = ({ onChatPress, phoneNumber }) => (
  <View style={styles.row}>
    <TouchableOpacity
      style={styles.button}
      onPress={() => phoneNumber && Linking.openURL('tel:' + phoneNumber)}
      accessibilityLabel="Call driver"
    >
      <Icon name="call" size={wp('5.5%')} color={colors.primary} />
    </TouchableOpacity>
    <TouchableOpacity style={styles.button} onPress={onChatPress} accessibilityLabel="Chat with driver">
      <Icon name="chatbubble-ellipses" size={wp('5.5%')} color={colors.primary} />
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    gap: wp('3%'),
  },
  button: {
    width: wp('12%'),
    height: wp('12%'),
    borderRadius: wp('6%'),
    backgroundColor: colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
EOF

echo "Tracking components done."

echo "Writing tracking screens..."

cat > src/features/tracking/screens/RideTrackingScreen.tsx << 'EOF'
import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { ScreenWrapper } from '../../../components/ScreenWrapper';
import { Card } from '../../../components/Card';
import { MapViewComponent } from '../../home/components/MapViewComponent';
import { DriverInfoCard } from '../components/DriverInfoCard';
import { RideStatusBar } from '../components/RideStatusBar';
import { ETADisplay } from '../components/ETADisplay';
import { ChatCallButtons } from '../components/ChatCallButtons';
import { useRideDetail } from '../../../api/hooks/useRideApi';
import { onRideStatusUpdate } from '../../../api/socket';
import { RideStatus } from '../../../types/ride';
import { MainStackParamList } from '../../../types/navigation';

type Nav = StackNavigationProp<MainStackParamList, 'RideTracking'>;
type Rt = RouteProp<MainStackParamList, 'RideTracking'>;

export const RideTrackingScreen: React.FC = () => {
  const navigation = useNavigation<Nav>();
  const route = useRoute<Rt>();
  const { data: ride } = useRideDetail(route.params.rideId);

  useEffect(() => {
    onRideStatusUpdate((data) => {
      if (data.rideId === route.params.rideId && data.status === 'RIDE_STARTED') {
        navigation.replace('RideInProgress', { rideId: route.params.rideId });
      }
    });
  }, []);

  if (!ride) return null;

  return (
    <ScreenWrapper>
      <View style={styles.mapContainer}>
        <MapViewComponent latitude={ride.pickup.latitude} longitude={ride.pickup.longitude} />
      </View>
      <Card style={styles.card}>
        <RideStatusBar status={ride.status} />
        <View style={styles.spacer} />
        {ride.driver ? <DriverInfoCard driver={ride.driver} /> : null}
        <View style={styles.bottomRow}>
          {ride.driver?.etaMinutes ? <ETADisplay etaMinutes={ride.driver.etaMinutes} /> : <View />}
          <ChatCallButtons
            onChatPress={() => navigation.navigate('Chat', { rideId: ride.id, driverName: ride.driver?.name || 'Driver' })}
            phoneNumber={undefined}
          />
        </View>
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
  spacer: {
    height: hp('2%'),
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: hp('2%'),
  },
});
EOF

cat > src/features/tracking/screens/RideInProgressScreen.tsx << 'EOF'
import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { ScreenWrapper } from '../../../components/ScreenWrapper';
import { Card } from '../../../components/Card';
import { MapViewComponent } from '../../home/components/MapViewComponent';
import { RideStatusBar } from '../components/RideStatusBar';
import { useRideDetail } from '../../../api/hooks/useRideApi';
import { onRideCompleted } from '../../../api/socket';
import { colors } from '../../../theme/colors';
import { fontFamily, fontSize } from '../../../theme/typography';
import { MainStackParamList } from '../../../types/navigation';

type Nav = StackNavigationProp<MainStackParamList, 'RideInProgress'>;
type Rt = RouteProp<MainStackParamList, 'RideInProgress'>;

export const RideInProgressScreen: React.FC = () => {
  const navigation = useNavigation<Nav>();
  const route = useRoute<Rt>();
  const { data: ride } = useRideDetail(route.params.rideId);

  useEffect(() => {
    onRideCompleted((data) => {
      if (data.rideId === route.params.rideId) {
        navigation.navigate('SelectPayment', { rideId: route.params.rideId });
      }
    });
  }, []);

  if (!ride) return null;

  return (
    <ScreenWrapper>
      <View style={styles.mapContainer}>
        <MapViewComponent latitude={ride.pickup.latitude} longitude={ride.pickup.longitude} />
      </View>
      <Card style={styles.card}>
        <RideStatusBar status={ride.status} />
        <Text style={styles.distance}>{ride.distanceKm.toFixed(1)} km to destination</Text>
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
  distance: {
    fontFamily: fontFamily.medium,
    fontSize: fontSize.sm,
    color: colors.textSecondary,
    marginTop: hp('1.5%'),
  },
});
EOF

echo "Tracking screens done."

echo "Writing payment feature files..."

cat > src/features/payment/components/PaymentMethodCard.tsx << 'EOF'
import React from 'react';
import { TouchableOpacity, Text, View, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { colors } from '../../../theme/colors';
import { fontFamily, fontSize } from '../../../theme/typography';
import { radius } from '../../../theme/spacing';
import { PaymentMethod } from '../../../types/payment';

interface PaymentMethodCardProps {
  method: PaymentMethod;
  selected: boolean;
  onPress: () => void;
}

const iconMap: Record<PaymentMethod['type'], string> = {
  credit_card: 'credit-card',
  debit_card: 'credit-card',
  cash: 'attach-money',
};

export const PaymentMethodCard: React.FC<PaymentMethodCardProps> = ({ method, selected, onPress }) => (
  <TouchableOpacity
    style={[styles.card, selected && styles.cardSelected]}
    onPress={onPress}
    accessibilityLabel={method.type + (method.last4 ? ' ending ' + method.last4 : '')}
  >
    <Icon name={iconMap[method.type]} size={wp('6%')} color={selected ? colors.primary : colors.textSecondary} />
    <View style={styles.info}>
      <Text style={styles.label}>
        {method.type === 'cash' ? 'Cash' : (method.brand || 'Card') + ' •••• ' + method.last4}
      </Text>
      {method.isDefault ? <Text style={styles.defaultText}>Default</Text> : null}
    </View>
    {selected ? <Icon name="check-circle" size={wp('5.5%')} color={colors.primary} /> : null}
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    padding: wp('4%'),
    marginBottom: hp('1.5%'),
  },
  cardSelected: {
    borderColor: colors.primary,
    backgroundColor: colors.primaryLight,
  },
  info: {
    flex: 1,
    marginLeft: wp('3%'),
  },
  label: {
    fontFamily: fontFamily.medium,
    fontSize: fontSize.md,
    color: colors.textPrimary,
  },
  defaultText: {
    fontFamily: fontFamily.regular,
    fontSize: fontSize.xs,
    color: colors.textHint,
  },
});
EOF

cat > src/features/payment/components/ReceiptSummary.tsx << 'EOF'
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Card } from '../../../components/Card';
import { colors } from '../../../theme/colors';
import { fontFamily, fontSize } from '../../../theme/typography';
import { FareBreakdown } from '../../../types/ride';
import { formatFareBreakdown } from '../../../utils/formatFare';

interface ReceiptSummaryProps {
  fare: FareBreakdown;
}

export const ReceiptSummary: React.FC<ReceiptSummaryProps> = ({ fare }) => {
  const formatted = formatFareBreakdown(fare);
  return (
    <Card>
      <Text style={styles.total}>{formatted.totalFare}</Text>
      <Text style={styles.label}>Total Charged</Text>
    </Card>
  );
};

const styles = StyleSheet.create({
  total: {
    fontFamily: fontFamily.bold,
    fontSize: fontSize.xxxl,
    color: colors.textPrimary,
    textAlign: 'center',
  },
  label: {
    fontFamily: fontFamily.regular,
    fontSize: fontSize.sm,
    color: colors.textSecondary,
    textAlign: 'center',
    marginTop: hp('0.5%'),
  },
});
EOF

echo "Payment components done."

cat > src/features/payment/screens/SelectPaymentScreen.tsx << 'EOF'
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
EOF

cat > src/features/payment/screens/RideCompleteScreen.tsx << 'EOF'
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';
import { useEffect } from 'react';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { ScreenWrapper } from '../../../components/ScreenWrapper';
import { Button } from '../../../components/Button';
import { ReceiptSummary } from '../components/ReceiptSummary';
import { RewardProgressBar } from '../../home/components/RewardProgressBar';
import { useRideStore } from '../../../store/rideStore';
import { colors } from '../../../theme/colors';
import { fontFamily, fontSize } from '../../../theme/typography';
import { MainStackParamList } from '../../../types/navigation';

type Nav = StackNavigationProp<MainStackParamList, 'RideComplete'>;
type Rt = RouteProp<MainStackParamList, 'RideComplete'>;

export const RideCompleteScreen: React.FC = () => {
  const navigation = useNavigation<Nav>();
  const route = useRoute<Rt>();
  const { ride } = route.params;
  const clearRide = useRideStore((s) => s.clearRide);
  const scale = useSharedValue(0);

  useEffect(() => {
    scale.value = withSpring(1);
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handleDone = () => {
    clearRide();
    navigation.navigate('BottomTabs');
  };

  return (
    <ScreenWrapper>
      <View style={styles.container}>
        <Animated.View style={[styles.checkCircle, animatedStyle]}>
          <Icon name="check" size={wp('10%')} color={colors.white} />
        </Animated.View>
        <Text style={styles.title}>Ride Completed</Text>
        <ReceiptSummary fare={ride.fare} />
        <View style={styles.rewardSpacer}>
          <RewardProgressBar rideCount={73} />
        </View>
        <Button title="Rate Driver" onPress={() => navigation.navigate('RateDriver', { rideId: ride.id })} style={styles.rateButton} />
        <Button title="Done" variant="outline" onPress={handleDone} />
      </View>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: wp('6%'),
    paddingTop: hp('6%'),
    alignItems: 'center',
  },
  checkCircle: {
    width: wp('20%'),
    height: wp('20%'),
    borderRadius: wp('10%'),
    backgroundColor: colors.success,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: hp('2%'),
  },
  title: {
    fontFamily: fontFamily.bold,
    fontSize: fontSize.xl,
    color: colors.textPrimary,
    marginBottom: hp('3%'),
  },
  rewardSpacer: {
    width: '100%',
    marginVertical: hp('3%'),
  },
  rateButton: {
    width: '100%',
    marginBottom: hp('1.5%'),
  },
});
EOF

echo "Payment screens done."

echo "Writing rating feature files..."

cat > src/features/rating/components/StarRating.tsx << 'EOF'
import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { colors } from '../../../theme/colors';

interface StarRatingProps {
  rating: number;
  onChange: (rating: number) => void;
}

export const StarRating: React.FC<StarRatingProps> = ({ rating, onChange }) => (
  <View style={styles.row}>
    {[1, 2, 3, 4, 5].map((value) => (
      <TouchableOpacity key={value} onPress={() => onChange(value)} accessibilityLabel={value + ' star'}>
        <Icon
          name={value <= rating ? 'star' : 'star-border'}
          size={wp('10%')}
          color={colors.accentYellow}
          style={styles.star}
        />
      </TouchableOpacity>
    ))}
  </View>
);

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  star: {
    marginHorizontal: wp('1%'),
  },
});
EOF

cat > src/features/rating/screens/RateDriverScreen.tsx << 'EOF'
import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { ScreenWrapper } from '../../../components/ScreenWrapper';
import { Input } from '../../../components/Input';
import { Button } from '../../../components/Button';
import { StarRating } from '../components/StarRating';
import { useRateDriver } from '../../../api/hooks/useRideApi';
import { colors } from '../../../theme/colors';
import { fontFamily, fontSize } from '../../../theme/typography';
import { MainStackParamList } from '../../../types/navigation';

type Nav = StackNavigationProp<MainStackParamList, 'RateDriver'>;
type Rt = RouteProp<MainStackParamList, 'RateDriver'>;

export const RateDriverScreen: React.FC = () => {
  const navigation = useNavigation<Nav>();
  const route = useRoute<Rt>();
  const rateDriver = useRateDriver();
  const [rating, setRating] = useState(5);
  const [review, setReview] = useState('');

  const handleSubmit = () => {
    rateDriver.mutate(
      { rideId: route.params.rideId, rating, review },
      { onSuccess: () => navigation.navigate('BottomTabs') },
    );
  };

  return (
    <ScreenWrapper>
      <View style={styles.container}>
        <Text style={styles.title}>Rate Your Driver</Text>
        <Text style={styles.subtitle}>How was your trip?</Text>
        <StarRating rating={rating} onChange={setRating} />
        <Input
          label="Feedback (optional)"
          placeholder="Tell us about your experience"
          value={review}
          onChangeText={setReview}
          multiline
          style={styles.reviewInput}
        />
        <Button title="Submit Rating" onPress={handleSubmit} loading={rateDriver.isPending} style={styles.button} />
      </View>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: wp('6%'),
    paddingTop: hp('6%'),
  },
  title: {
    fontFamily: fontFamily.bold,
    fontSize: fontSize.xl,
    color: colors.textPrimary,
    textAlign: 'center',
  },
  subtitle: {
    fontFamily: fontFamily.regular,
    fontSize: fontSize.sm,
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: hp('3%'),
  },
  reviewInput: {
    height: hp('12%'),
    textAlignVertical: 'top',
  },
  button: {
    marginTop: hp('2%'),
  },
});
EOF

echo "Rating feature done."

echo "Writing history feature files..."

cat > src/features/history/components/RideHistoryCard.tsx << 'EOF'
import React from 'react';
import { TouchableOpacity, Text, View, StyleSheet } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Card } from '../../../components/Card';
import { colors } from '../../../theme/colors';
import { fontFamily, fontSize } from '../../../theme/typography';
import { Ride } from '../../../types/ride';
import { formatRideDate, formatRideTime } from '../../../utils/formatDate';
import { formatCurrency } from '../../../utils/formatFare';
import { formatAddress } from '../../../utils/locationHelpers';

interface RideHistoryCardProps {
  ride: Ride;
  onPress: () => void;
}

export const RideHistoryCard: React.FC<RideHistoryCardProps> = ({ ride, onPress }) => (
  <TouchableOpacity onPress={onPress} accessibilityLabel={'Ride on ' + formatRideDate(ride.createdAt)}>
    <Card style={styles.card}>
      <View style={styles.row}>
        <Text style={styles.date}>{formatRideDate(ride.createdAt)}</Text>
        <Text style={styles.fare}>{formatCurrency(ride.fare.totalFare, ride.fare.currency)}</Text>
      </View>
      <Text style={styles.time}>{formatRideTime(ride.createdAt)}</Text>
      <Text style={styles.address} numberOfLines={1}>{formatAddress(ride.pickup)} → {formatAddress(ride.destination)}</Text>
    </Card>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  card: {
    marginBottom: hp('1.5%'),
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  date: {
    fontFamily: fontFamily.semiBold,
    fontSize: fontSize.md,
    color: colors.textPrimary,
  },
  fare: {
    fontFamily: fontFamily.bold,
    fontSize: fontSize.md,
    color: colors.primary,
  },
  time: {
    fontFamily: fontFamily.regular,
    fontSize: fontSize.xs,
    color: colors.textHint,
    marginTop: hp('0.3%'),
  },
  address: {
    fontFamily: fontFamily.regular,
    fontSize: fontSize.sm,
    color: colors.textSecondary,
    marginTop: hp('0.8%'),
  },
});
EOF

cat > src/features/history/screens/RideHistoryScreen.tsx << 'EOF'
import React from 'react';
import { View, FlatList, StyleSheet, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { ScreenWrapper } from '../../../components/ScreenWrapper';
import { RideHistoryCard } from '../components/RideHistoryCard';
import { useRideHistory } from '../../../api/hooks/useRideApi';
import { colors } from '../../../theme/colors';
import { fontFamily, fontSize } from '../../../theme/typography';
import { MainStackParamList } from '../../../types/navigation';

type Nav = StackNavigationProp<MainStackParamList, 'RideDetail'>;

export const RideHistoryScreen: React.FC = () => {
  const navigation = useNavigation<Nav>();
  const { data: rides, isLoading } = useRideHistory();

  return (
    <ScreenWrapper>
      <View style={styles.container}>
        <Text style={styles.title}>Ride History</Text>
        <FlatList
          data={rides || []}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <RideHistoryCard ride={item} onPress={() => navigation.navigate('RideDetail', { rideId: item.id })} />
          )}
          ListEmptyComponent={!isLoading ? <Text style={styles.empty}>No rides yet</Text> : null}
        />
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
  title: {
    fontFamily: fontFamily.bold,
    fontSize: fontSize.xl,
    color: colors.textPrimary,
    marginBottom: hp('2%'),
  },
  empty: {
    fontFamily: fontFamily.regular,
    fontSize: fontSize.sm,
    color: colors.textSecondary,
    textAlign: 'center',
    marginTop: hp('10%'),
  },
});
EOF

cat > src/features/history/screens/RideDetailScreen.tsx << 'EOF'
import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { useRoute, RouteProp } from '@react-navigation/native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { ScreenWrapper } from '../../../components/ScreenWrapper';
import { Card } from '../../../components/Card';
import { RideStatusBar } from '../../tracking/components/RideStatusBar';
import { FareBreakdownCard } from '../../booking/components/FareBreakdownCard';
import { useRideDetail } from '../../../api/hooks/useRideApi';
import { colors } from '../../../theme/colors';
import { fontFamily, fontSize } from '../../../theme/typography';
import { formatRideDate, formatRideTime } from '../../../utils/formatDate';
import { formatAddress } from '../../../utils/locationHelpers';
import { MainStackParamList } from '../../../types/navigation';

type Rt = RouteProp<MainStackParamList, 'RideDetail'>;

export const RideDetailScreen: React.FC = () => {
  const route = useRoute<Rt>();
  const { data: ride } = useRideDetail(route.params.rideId);

  if (!ride) return null;

  return (
    <ScreenWrapper>
      <ScrollView contentContainerStyle={styles.container}>
        <RideStatusBar status={ride.status} />
        <Card style={styles.card}>
          <Text style={styles.dateText}>{formatRideDate(ride.createdAt)} at {formatRideTime(ride.createdAt)}</Text>
          <Text style={styles.address}>From: {formatAddress(ride.pickup)}</Text>
          <Text style={styles.address}>To: {formatAddress(ride.destination)}</Text>
        </Card>
        <FareBreakdownCard fare={ride.fare} />
      </ScrollView>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: wp('6%'),
    paddingTop: hp('3%'),
    paddingBottom: hp('4%'),
  },
  card: {
    marginVertical: hp('2%'),
  },
  dateText: {
    fontFamily: fontFamily.semiBold,
    fontSize: fontSize.md,
    color: colors.textPrimary,
    marginBottom: hp('1%'),
  },
  address: {
    fontFamily: fontFamily.regular,
    fontSize: fontSize.sm,
    color: colors.textSecondary,
    marginTop: hp('0.3%'),
  },
});
EOF

echo "History feature done."

echo "Writing loyalty feature files..."

cat > src/features/loyalty/components/MilestoneCard.tsx << 'EOF'
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Card } from '../../../components/Card';
import { colors } from '../../../theme/colors';
import { fontFamily, fontSize } from '../../../theme/typography';

interface MilestoneCardProps {
  rideCount: number;
  target: number;
}

export const MilestoneCard: React.FC<MilestoneCardProps> = ({ rideCount, target }) => {
  const progress = Math.min(rideCount / target, 1);

  return (
    <Card style={styles.card}>
      <View style={styles.circle}>
        <Text style={styles.circleText}>{rideCount}/{target}</Text>
        <Text style={styles.circleLabel}>rides</Text>
      </View>
      <Icon name="emoji-events" size={wp('8%')} color={colors.accentYellow} style={styles.icon} />
      <Text style={styles.progressText}>{Math.round(progress * 100)}% to your next reward</Text>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    alignItems: 'center',
    paddingVertical: hp('4%'),
  },
  circle: {
    width: wp('35%'),
    height: wp('35%'),
    borderRadius: wp('17.5%'),
    borderWidth: 6,
    borderColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  circleText: {
    fontFamily: fontFamily.bold,
    fontSize: fontSize.xl,
    color: colors.textPrimary,
  },
  circleLabel: {
    fontFamily: fontFamily.regular,
    fontSize: fontSize.xs,
    color: colors.textSecondary,
  },
  icon: {
    marginTop: hp('2%'),
  },
  progressText: {
    fontFamily: fontFamily.medium,
    fontSize: fontSize.sm,
    color: colors.textSecondary,
    marginTop: hp('1%'),
  },
});
EOF

cat > src/features/loyalty/components/ProgressTab.tsx << 'EOF'
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Button } from '../../../components/Button';
import { MilestoneCard } from './MilestoneCard';
import { LOYALTY_MILESTONE_RESET } from '../../../constants/config';

interface ProgressTabProps {
  rideCount: number;
  canClaim: boolean;
  onClaim: () => void;
  claiming: boolean;
}

export const ProgressTab: React.FC<ProgressTabProps> = ({ rideCount, canClaim, onClaim, claiming }) => (
  <View style={styles.container}>
    <MilestoneCard rideCount={rideCount} target={LOYALTY_MILESTONE_RESET} />
    {canClaim ? (
      <Button title="Claim Now" onPress={onClaim} loading={claiming} style={styles.claimButton} />
    ) : null}
  </View>
);

const styles = StyleSheet.create({
  container: {
    paddingTop: hp('2%'),
  },
  claimButton: {
    marginTop: hp('2%'),
  },
});
EOF

cat > src/features/loyalty/components/HowItWorksTab.tsx << 'EOF'
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Card } from '../../../components/Card';
import { colors } from '../../../theme/colors';
import { fontFamily, fontSize } from '../../../theme/typography';
import { LOYALTY_MILESTONE_DISCOUNT, LOYALTY_DISCOUNT_PERCENTAGE } from '../../../constants/config';

const steps = [
  'Complete rides to build your loyalty progress.',
  'At ' + LOYALTY_MILESTONE_DISCOUNT + ' rides, unlock a ' + LOYALTY_DISCOUNT_PERCENTAGE + '% discount on your next ride.',
  'At 100 rides, your reward cycle resets and you start earning again.',
];

export const HowItWorksTab: React.FC = () => (
  <View style={styles.container}>
    {steps.map((step, index) => (
      <Card key={index} style={styles.card}>
        <View style={styles.row}>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{index + 1}</Text>
          </View>
          <Text style={styles.stepText}>{step}</Text>
        </View>
      </Card>
    ))}
  </View>
);

const styles = StyleSheet.create({
  container: {
    paddingTop: hp('2%'),
  },
  card: {
    marginBottom: hp('1.5%'),
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  badge: {
    width: wp('8%'),
    height: wp('8%'),
    borderRadius: wp('4%'),
    backgroundColor: colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: wp('3%'),
  },
  badgeText: {
    fontFamily: fontFamily.bold,
    fontSize: fontSize.sm,
    color: colors.primaryDark,
  },
  stepText: {
    flex: 1,
    fontFamily: fontFamily.regular,
    fontSize: fontSize.sm,
    color: colors.textPrimary,
  },
});
EOF

echo "Loyalty tab components (1/2) done."

cat > src/features/loyalty/components/HistoryTab.tsx << 'EOF'
import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Card } from '../../../components/Card';
import { colors } from '../../../theme/colors';
import { fontFamily, fontSize } from '../../../theme/typography';
import { formatRideDate } from '../../../utils/formatDate';
import { formatCurrency } from '../../../utils/formatFare';

interface HistoryEntry {
  id: string;
  cycleCompletedAt: string;
  totalSaved: number;
}

interface HistoryTabProps {
  history: HistoryEntry[];
}

export const HistoryTab: React.FC<HistoryTabProps> = ({ history }) => (
  <FlatList
    data={history}
    keyExtractor={(item) => item.id}
    contentContainerStyle={styles.container}
    ListEmptyComponent={<Text style={styles.empty}>No completed cycles yet</Text>}
    renderItem={({ item }) => (
      <Card style={styles.card}>
        <Text style={styles.date}>Cycle completed {formatRideDate(item.cycleCompletedAt)}</Text>
        <Text style={styles.saved}>Saved {formatCurrency(item.totalSaved)}</Text>
      </Card>
    )}
  />
);

const styles = StyleSheet.create({
  container: {
    paddingTop: hp('2%'),
  },
  card: {
    marginBottom: hp('1.5%'),
  },
  date: {
    fontFamily: fontFamily.medium,
    fontSize: fontSize.sm,
    color: colors.textPrimary,
  },
  saved: {
    fontFamily: fontFamily.semiBold,
    fontSize: fontSize.md,
    color: colors.primary,
    marginTop: hp('0.5%'),
  },
  empty: {
    fontFamily: fontFamily.regular,
    fontSize: fontSize.sm,
    color: colors.textSecondary,
    textAlign: 'center',
    marginTop: hp('6%'),
  },
});
EOF

cat > src/features/loyalty/screens/LoyaltyScreen.tsx << 'EOF'
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { ScreenWrapper } from '../../../components/ScreenWrapper';
import { ProgressTab } from '../components/ProgressTab';
import { HowItWorksTab } from '../components/HowItWorksTab';
import { HistoryTab } from '../components/HistoryTab';
import { useLoyaltyProgress, useLoyaltyHistory, useClaimReward } from '../../../api/hooks/useLoyaltyApi';
import { colors } from '../../../theme/colors';
import { fontFamily, fontSize } from '../../../theme/typography';

type TabKey = 'progress' | 'howItWorks' | 'history';

const tabs: { key: TabKey; label: string }[] = [
  { key: 'progress', label: 'Progress' },
  { key: 'howItWorks', label: 'How It Works' },
  { key: 'history', label: 'History' },
];

export const LoyaltyScreen: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabKey>('progress');
  const { data: progress } = useLoyaltyProgress();
  const { data: history } = useLoyaltyHistory();
  const claimReward = useClaimReward();

  return (
    <ScreenWrapper>
      <View style={styles.container}>
        <Text style={styles.title}>Reward Points</Text>
        <View style={styles.tabRow}>
          {tabs.map((tab) => (
            <TouchableOpacity
              key={tab.key}
              style={[styles.tabButton, activeTab === tab.key && styles.tabButtonActive]}
              onPress={() => setActiveTab(tab.key)}
              accessibilityLabel={tab.label}
            >
              <Text style={[styles.tabLabel, activeTab === tab.key && styles.tabLabelActive]}>{tab.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
        {activeTab === 'progress' ? (
          <ProgressTab
            rideCount={progress?.rideCount || 0}
            canClaim={!!progress?.discountAvailable}
            onClaim={() => claimReward.mutate()}
            claiming={claimReward.isPending}
          />
        ) : null}
        {activeTab === 'howItWorks' ? <HowItWorksTab /> : null}
        {activeTab === 'history' ? <HistoryTab history={history || []} /> : null}
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
  title: {
    fontFamily: fontFamily.bold,
    fontSize: fontSize.xl,
    color: colors.textPrimary,
    marginBottom: hp('2%'),
  },
  tabRow: {
    flexDirection: 'row',
    backgroundColor: colors.backgroundSecondary,
    borderRadius: wp('3%'),
    padding: wp('1%'),
  },
  tabButton: {
    flex: 1,
    paddingVertical: hp('1.2%'),
    alignItems: 'center',
    borderRadius: wp('2.5%'),
  },
  tabButtonActive: {
    backgroundColor: colors.white,
  },
  tabLabel: {
    fontFamily: fontFamily.medium,
    fontSize: fontSize.sm,
    color: colors.textSecondary,
  },
  tabLabelActive: {
    color: colors.primary,
  },
});
EOF

echo "Loyalty feature done."

echo "Writing profile feature files..."

cat > src/features/profile/components/ProfileMenuItem.tsx << 'EOF'
import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { colors } from '../../../theme/colors';
import { fontFamily, fontSize } from '../../../theme/typography';

interface ProfileMenuItemProps {
  icon: string;
  label: string;
  onPress: () => void;
  destructive?: boolean;
}

export const ProfileMenuItem: React.FC<ProfileMenuItemProps> = ({ icon, label, onPress, destructive }) => (
  <TouchableOpacity style={styles.row} onPress={onPress} accessibilityLabel={label}>
    <Icon name={icon} size={wp('5.5%')} color={destructive ? colors.error : colors.textSecondary} />
    <Text style={[styles.label, destructive && styles.destructiveLabel]}>{label}</Text>
    {!destructive ? <Icon name="chevron-right" size={wp('5%')} color={colors.textHint} /> : null}
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: hp('1.8%'),
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  label: {
    flex: 1,
    marginLeft: wp('4%'),
    fontFamily: fontFamily.medium,
    fontSize: fontSize.md,
    color: colors.textPrimary,
  },
  destructiveLabel: {
    color: colors.error,
  },
});
EOF

cat > src/features/profile/screens/ProfileScreen.tsx << 'EOF'
import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { ScreenWrapper } from '../../../components/ScreenWrapper';
import { Avatar } from '../../../components/Avatar';
import { ProfileMenuItem } from '../components/ProfileMenuItem';
import { useAuthStore } from '../../../store/authStore';
import { colors } from '../../../theme/colors';
import { fontFamily, fontSize } from '../../../theme/typography';
import { MainStackParamList } from '../../../types/navigation';

type Nav = StackNavigationProp<MainStackParamList, 'EditProfile'>;

export const ProfileScreen: React.FC = () => {
  const navigation = useNavigation<Nav>();
  const rider = useAuthStore((s) => s.rider);
  const logout = useAuthStore((s) => s.logout);

  return (
    <ScreenWrapper>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.navigate('EditProfile')} accessibilityLabel="Edit profile photo">
            <Avatar uri={rider?.profilePhotoUrl} name={rider?.fullName} size="lg" />
            <View style={styles.editBadge}>
              <Icon name="edit" size={wp('3.5%')} color={colors.white} />
            </View>
          </TouchableOpacity>
          <Text style={styles.name}>{rider?.fullName}</Text>
          <Text style={styles.email}>{rider?.email}</Text>
          <Text style={styles.phone}>{rider?.phone}</Text>
        </View>
        <ProfileMenuItem icon="person" label="Personal Information" onPress={() => navigation.navigate('EditProfile')} />
        <ProfileMenuItem icon="notifications" label="Notifications" onPress={() => {}} />
        <ProfileMenuItem icon="payment" label="Payment Methods" onPress={() => {}} />
        <ProfileMenuItem icon="help" label="Help/Support" onPress={() => navigation.navigate('Support')} />
        <ProfileMenuItem icon="logout" label="Logout" onPress={logout} destructive />
      </ScrollView>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: wp('6%'),
    paddingTop: hp('3%'),
    paddingBottom: hp('4%'),
  },
  header: {
    alignItems: 'center',
    marginBottom: hp('3%'),
  },
  editBadge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: wp('6%'),
    height: wp('6%'),
    borderRadius: wp('3%'),
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: colors.white,
  },
  name: {
    fontFamily: fontFamily.bold,
    fontSize: fontSize.lg,
    color: colors.textPrimary,
    marginTop: hp('1.5%'),
  },
  email: {
    fontFamily: fontFamily.regular,
    fontSize: fontSize.sm,
    color: colors.textSecondary,
    marginTop: hp('0.3%'),
  },
  phone: {
    fontFamily: fontFamily.regular,
    fontSize: fontSize.sm,
    color: colors.textSecondary,
  },
});
EOF

cat > src/features/profile/screens/EditProfileScreen.tsx << 'EOF'
import React, { useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { ScreenWrapper } from '../../../components/ScreenWrapper';
import { Input } from '../../../components/Input';
import { Button } from '../../../components/Button';
import { Avatar } from '../../../components/Avatar';
import { useAuthStore } from '../../../store/authStore';

export const EditProfileScreen: React.FC = () => {
  const navigation = useNavigation();
  const rider = useAuthStore((s) => s.rider);
  const [fullName, setFullName] = useState(rider?.fullName || '');
  const [phone, setPhone] = useState(rider?.phone || '');

  const handleSave = () => {
    navigation.goBack();
  };

  return (
    <ScreenWrapper withKeyboardAvoiding>
      <ScrollView contentContainerStyle={styles.container}>
        <Avatar uri={rider?.profilePhotoUrl} name={rider?.fullName} size="lg" />
        <Input label="Full Name" value={fullName} onChangeText={setFullName} leftIcon="person" style={styles.inputSpacer} />
        <Input label="Phone Number" value={phone} onChangeText={setPhone} leftIcon="phone" keyboardType="phone-pad" />
        <Button title="Save Changes" onPress={handleSave} style={styles.button} />
      </ScrollView>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: wp('6%'),
    paddingTop: hp('4%'),
    alignItems: 'center',
  },
  inputSpacer: {
    marginTop: hp('3%'),
  },
  button: {
    width: '100%',
    marginTop: hp('2%'),
  },
});
EOF

echo "Profile feature done."

echo "Writing chat feature files..."

cat > src/features/chat/components/MessageBubble.tsx << 'EOF'
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { colors } from '../../../theme/colors';
import { fontFamily, fontSize } from '../../../theme/typography';
import { radius } from '../../../theme/spacing';
import { formatRideTime } from '../../../utils/formatDate';

interface MessageBubbleProps {
  text: string;
  timestamp: string;
  isMine: boolean;
}

export const MessageBubble: React.FC<MessageBubbleProps> = ({ text, timestamp, isMine }) => (
  <View style={[styles.row, isMine ? styles.rowMine : styles.rowTheirs]}>
    <View style={[styles.bubble, isMine ? styles.bubbleMine : styles.bubbleTheirs]}>
      <Text style={[styles.text, isMine ? styles.textMine : styles.textTheirs]}>{text}</Text>
      <Text style={[styles.time, isMine ? styles.timeMine : styles.timeTheirs]}>{formatRideTime(timestamp)}</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  row: {
    marginVertical: hp('0.5%'),
  },
  rowMine: {
    alignItems: 'flex-end',
  },
  rowTheirs: {
    alignItems: 'flex-start',
  },
  bubble: {
    maxWidth: wp('75%'),
    borderRadius: radius.md,
    paddingHorizontal: wp('4%'),
    paddingVertical: hp('1%'),
  },
  bubbleMine: {
    backgroundColor: colors.primary,
  },
  bubbleTheirs: {
    backgroundColor: colors.backgroundSecondary,
  },
  text: {
    fontFamily: fontFamily.regular,
    fontSize: fontSize.sm,
  },
  textMine: {
    color: colors.white,
  },
  textTheirs: {
    color: colors.textPrimary,
  },
  time: {
    fontFamily: fontFamily.regular,
    fontSize: fontSize.xs,
    marginTop: hp('0.3%'),
  },
  timeMine: {
    color: colors.white,
    opacity: 0.7,
  },
  timeTheirs: {
    color: colors.textHint,
  },
});
EOF

cat > src/features/chat/components/ChatInput.tsx << 'EOF'
import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { colors } from '../../../theme/colors';
import { fontFamily, fontSize } from '../../../theme/typography';
import { radius } from '../../../theme/spacing';

interface ChatInputProps {
  onSend: (text: string) => void;
}

export const ChatInput: React.FC<ChatInputProps> = ({ onSend }) => {
  const [text, setText] = useState('');

  const handleSend = () => {
    if (!text.trim()) return;
    onSend(text.trim());
    setText('');
  };

  return (
    <View style={styles.row}>
      <TextInput
        style={styles.input}
        value={text}
        onChangeText={setText}
        placeholder="Type a message..."
        placeholderTextColor={colors.textHint}
        accessibilityLabel="Chat message input"
      />
      <TouchableOpacity style={styles.sendButton} onPress={handleSend} accessibilityLabel="Send message">
        <Icon name="send" size={wp('5%')} color={colors.white} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: wp('4%'),
    paddingVertical: hp('1.5%'),
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  input: {
    flex: 1,
    backgroundColor: colors.backgroundSecondary,
    borderRadius: radius.lg,
    paddingHorizontal: wp('4%'),
    height: hp('5.5%'),
    fontFamily: fontFamily.regular,
    fontSize: fontSize.sm,
    color: colors.textPrimary,
    marginRight: wp('3%'),
  },
  sendButton: {
    width: wp('11%'),
    height: wp('11%'),
    borderRadius: wp('5.5%'),
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
EOF

cat > src/features/chat/screens/ChatScreen.tsx << 'EOF'
import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { useRoute, RouteProp } from '@react-navigation/native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { ScreenWrapper } from '../../../components/ScreenWrapper';
import { MessageBubble } from '../components/MessageBubble';
import { ChatInput } from '../components/ChatInput';
import { colors } from '../../../theme/colors';
import { fontFamily, fontSize } from '../../../theme/typography';
import { MainStackParamList } from '../../../types/navigation';

type Rt = RouteProp<MainStackParamList, 'Chat'>;

interface Message {
  id: string;
  text: string;
  timestamp: string;
  isMine: boolean;
}

export const ChatScreen: React.FC = () => {
  const route = useRoute<Rt>();
  const [messages, setMessages] = useState<Message[]>([]);

  const handleSend = (text: string) => {
    setMessages((prev) => [
      ...prev,
      { id: String(Date.now()), text, timestamp: new Date().toISOString(), isMine: true },
    ]);
  };

  return (
    <ScreenWrapper withKeyboardAvoiding>
      <View style={styles.header}>
        <Text style={styles.headerText}>{route.params.driverName}</Text>
      </View>
      <FlatList
        data={messages}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => <MessageBubble text={item.text} timestamp={item.timestamp} isMine={item.isMine} />}
      />
      <ChatInput onSend={handleSend} />
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: wp('6%'),
    paddingVertical: hp('2%'),
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  headerText: {
    fontFamily: fontFamily.semiBold,
    fontSize: fontSize.lg,
    color: colors.textPrimary,
  },
  list: {
    paddingHorizontal: wp('4%'),
    paddingVertical: hp('1%'),
  },
});
EOF

echo "Chat feature done."

echo "Writing support feature files..."

cat > src/features/support/components/FaqItem.tsx << 'EOF'
import React, { useState } from 'react';
import { TouchableOpacity, Text, View, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { colors } from '../../../theme/colors';
import { fontFamily, fontSize } from '../../../theme/typography';

interface FaqItemProps {
  question: string;
  answer: string;
}

export const FaqItem: React.FC<FaqItemProps> = ({ question, answer }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <TouchableOpacity style={styles.container} onPress={() => setExpanded((e) => !e)} accessibilityLabel={question}>
      <View style={styles.row}>
        <Text style={styles.question}>{question}</Text>
        <Icon name={expanded ? 'expand-less' : 'expand-more'} size={wp('5.5%')} color={colors.textSecondary} />
      </View>
      {expanded ? <Text style={styles.answer}>{answer}</Text> : null}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    paddingVertical: hp('1.8%'),
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  question: {
    flex: 1,
    fontFamily: fontFamily.medium,
    fontSize: fontSize.md,
    color: colors.textPrimary,
    marginRight: wp('2%'),
  },
  answer: {
    fontFamily: fontFamily.regular,
    fontSize: fontSize.sm,
    color: colors.textSecondary,
    marginTop: hp('1%'),
  },
});
EOF

cat > src/features/support/screens/SupportScreen.tsx << 'EOF'
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { ScreenWrapper } from '../../../components/ScreenWrapper';
import { Card } from '../../../components/Card';
import { colors } from '../../../theme/colors';
import { fontFamily, fontSize } from '../../../theme/typography';
import { MainStackParamList } from '../../../types/navigation';

type Nav = StackNavigationProp<MainStackParamList, 'Faq'>;

export const SupportScreen: React.FC = () => {
  const navigation = useNavigation<Nav>();

  return (
    <ScreenWrapper>
      <View style={styles.container}>
        <Text style={styles.title}>Help Center</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Faq')} accessibilityLabel="View FAQs">
          <Card style={styles.card}>
            <View style={styles.row}>
              <Icon name="quiz" size={wp('6%')} color={colors.primary} />
              <Text style={styles.cardText}>FAQs</Text>
            </View>
          </Card>
        </TouchableOpacity>
        <TouchableOpacity accessibilityLabel="Report an issue">
          <Card style={styles.card}>
            <View style={styles.row}>
              <Icon name="report-problem" size={wp('6%')} color={colors.primary} />
              <Text style={styles.cardText}>Report Issue / Feedback</Text>
            </View>
          </Card>
        </TouchableOpacity>
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
  title: {
    fontFamily: fontFamily.bold,
    fontSize: fontSize.xl,
    color: colors.textPrimary,
    marginBottom: hp('2%'),
  },
  card: {
    marginBottom: hp('1.5%'),
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardText: {
    marginLeft: wp('3%'),
    fontFamily: fontFamily.medium,
    fontSize: fontSize.md,
    color: colors.textPrimary,
  },
});
EOF

cat > src/features/support/screens/FaqScreen.tsx << 'EOF'
import React from 'react';
import { ScrollView, Text, StyleSheet } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { ScreenWrapper } from '../../../components/ScreenWrapper';
import { FaqItem } from '../components/FaqItem';
import { colors } from '../../../theme/colors';
import { fontFamily, fontSize } from '../../../theme/typography';

const faqs = [
  { question: 'How do I request a ride?', answer: 'Set your pickup and destination on the Home screen, review the fare, and tap Request Ride.' },
  { question: 'How is the fare calculated?', answer: 'Fare is based on base fare, distance rate, and a platform fee, shown before you confirm your ride.' },
  { question: 'How does the loyalty program work?', answer: 'Every 50 rides unlocks a discount on your next ride, and the cycle resets after 100 rides.' },
  { question: 'What payment methods are supported?', answer: 'Credit cards, debit cards, and cash depending on availability in your area.' },
];

export const FaqScreen: React.FC = () => (
  <ScreenWrapper>
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Frequently Asked Questions</Text>
      {faqs.map((faq, index) => (
        <FaqItem key={index} question={faq.question} answer={faq.answer} />
      ))}
    </ScrollView>
  </ScreenWrapper>
);

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: wp('6%'),
    paddingTop: hp('3%'),
    paddingBottom: hp('4%'),
  },
  title: {
    fontFamily: fontFamily.bold,
    fontSize: fontSize.xl,
    color: colors.textPrimary,
    marginBottom: hp('2%'),
  },
});
EOF

echo "Support feature done."

echo "Writing placeholder assets and env files..."

touch src/assets/images/logo.png
touch src/assets/images/onboarding1.png
touch src/assets/images/onboarding2.png
touch src/assets/images/onboarding3.png
touch src/assets/fonts/Poppins-Regular.ttf
touch src/assets/fonts/Poppins-Medium.ttf
touch src/assets/fonts/Poppins-SemiBold.ttf
touch src/assets/fonts/Poppins-Bold.ttf

cat > .env.example << 'EOF'
API_BASE_URL=https://api.youneedaride.com
SOCKET_URL=https://socket.youneedaride.com
GOOGLE_MAPS_API_KEY=your_google_maps_api_key
EOF

echo ""
echo "================================================="
echo " YouNeedARide Rider App scaffolding complete!"
echo "================================================="
echo ""
echo "Installing dependencies..."

npm install zustand @tanstack/react-query axios \
socket.io-client \
@react-native-async-storage/async-storage \
@react-navigation/native @react-navigation/stack \
@react-navigation/bottom-tabs \
react-native-screens react-native-safe-area-context \
react-native-gesture-handler react-native-reanimated \
react-native-maps react-native-fast-image \
react-native-vector-icons react-native-config \
react-hook-form zod @hookform/resolvers \
react-native-responsive-screen \
react-native-geolocation-service \
@react-native-firebase/app \
@react-native-firebase/messaging

npm install -D @types/react-native-vector-icons

echo ""
echo "================================================="
echo " Setup complete! Next steps:"
echo " 1. cd ios && pod install && cd .. (iOS only)"
echo " 2. Replace placeholder files in src/assets/fonts and src/assets/images"
echo " 3. Copy .env.example to .env and fill in your values"
echo " 4. npx react-native run-android / run-ios"
echo "================================================="
