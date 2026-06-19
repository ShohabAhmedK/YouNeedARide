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
