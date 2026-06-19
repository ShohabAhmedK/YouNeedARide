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
