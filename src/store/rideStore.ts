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
