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
