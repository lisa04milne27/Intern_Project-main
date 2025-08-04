import React, { useEffect } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import { TurbiditySensor } from '../types/sensor';
import { SensorMarker } from './SensorMarker';
import 'leaflet/dist/leaflet.css';

interface TurbidityMapProps {
  sensors: TurbiditySensor[];
  selectedSensor: TurbiditySensor | null;
  onSensorSelect: (sensor: TurbiditySensor) => void;
}

export const TurbidityMap: React.FC<TurbidityMapProps> = ({
  sensors,
  selectedSensor,
  onSensorSelect,
}) => {
  const center = sensors.length > 0 
    ? [sensors[0].location.lat, sensors[0].location.lng] as [number, number]
    : [40.7128, -74.0060] as [number, number];

  return (
    <div className="h-full w-full rounded-lg overflow-hidden shadow-lg">
      <MapContainer
        center={center}
        zoom={11}
        style={{ height: '100%', width: '100%' }}
        className="z-0"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        {sensors.map((sensor) => (
          <SensorMarker
            key={sensor.id}
            sensor={sensor}
            onSensorClick={onSensorSelect}
          />
        ))}
      </MapContainer>
    </div>
  );
};