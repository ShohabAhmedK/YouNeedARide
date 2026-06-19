import React from 'react';
import { StyleSheet } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { colors } from '../../../theme/colors';

interface DriverMarker {
  id: string;
  latitude: number;
  longitude: number;
}

interface MapViewComponentProps {
  latitude: number;
  longitude: number;
  drivers?: DriverMarker[];
}

export const MapViewComponent: React.FC<MapViewComponentProps> = ({ latitude, longitude, drivers = [] }) => (
  <MapView
    provider={PROVIDER_GOOGLE}
    style={styles.map}
    initialRegion={{
      latitude,
      longitude,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    }}
    showsUserLocation
    showsMyLocationButton
  >
    {drivers.map((driver) => (
      <Marker
        key={driver.id}
        coordinate={{ latitude: driver.latitude, longitude: driver.longitude }}
        pinColor={colors.primary}
        accessibilityLabel="Nearby driver"
      />
    ))}
  </MapView>
);

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
});
