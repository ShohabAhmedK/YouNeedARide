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
