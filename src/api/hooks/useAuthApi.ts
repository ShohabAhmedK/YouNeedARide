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
