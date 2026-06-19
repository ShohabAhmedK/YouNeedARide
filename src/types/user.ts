export interface SavedLocation {
  id: string;
  label: string;
  address: string;
  latitude: number;
  longitude: number;
  type: 'home' | 'work' | 'other';
}

export interface Rider {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  profilePhotoUrl?: string;
  savedLocations: SavedLocation[];
  loyaltyRideCount: number;
  createdAt: string;
}
