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
