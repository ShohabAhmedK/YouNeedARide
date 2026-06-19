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
