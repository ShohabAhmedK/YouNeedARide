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
