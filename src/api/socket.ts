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
