import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Icon } from 'leaflet';
import { Sensor } from '../../types/sensor';
import { getWaterQualityLevel, getQualityColor, getQualityLabel } from '../../utils/waterQuality';
import 'leaflet/dist/leaflet.css';

interface WaterQualityMapProps {
  sensor: Sensor;
  className?: string;
}

// Create custom marker icons for different quality levels
const createCustomIcon = (color: string) => new Icon({
  iconUrl: `data:image/svg+xml;base64,${btoa(`
    <svg width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
      <circle cx="16" cy="16" r="14" fill="${color}" stroke="white" stroke-width="3"/>
      <circle cx="16" cy="16" r="6" fill="white" opacity="0.8"/>
    </svg>
  `)}`,
  iconSize: [32, 32],
  iconAnchor: [16, 16],
  popupAnchor: [0, -16],
});

export default function WaterQualityMap({ sensor, className = '' }: WaterQualityMapProps) {
  const qualityLevel = getWaterQualityLevel(sensor.lastReading);
  const qualityColor = getQualityColor(qualityLevel);
  const qualityLabel = getQualityLabel(qualityLevel);
  
  const customIcon = createCustomIcon(qualityColor);

  return (
    <div className={`relative ${className}`}>
      <MapContainer
        center={[sensor.location.lat, sensor.location.lng]}
        zoom={15}
        style={{ height: '100%', width: '100%' }}
        className="rounded-lg shadow-lg"
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker
          position={[sensor.location.lat, sensor.location.lng]}
          icon={customIcon}
        >
          <Popup>
            <div className="p-2 min-w-[250px]">
              <h3 className="font-bold text-lg mb-2">{sensor.name}</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Status:</span>
                  <span className={`capitalize px-2 py-1 rounded text-xs font-medium ${
                    sensor.status === 'online' ? 'bg-green-100 text-green-800' :
                    sensor.status === 'offline' ? 'bg-red-100 text-red-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {sensor.status}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Water Quality:</span>
                  <span 
                    className="px-2 py-1 rounded text-xs font-medium text-white"
                    style={{ backgroundColor: qualityColor }}
                  >
                    {qualityLabel}
                  </span>
                </div>
                <hr className="my-2" />
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <span className="text-gray-600">pH:</span>
                    <span className="font-medium ml-1">{sensor.lastReading.ph.toFixed(1)}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Temp:</span>
                    <span className="font-medium ml-1">{sensor.lastReading.temperature.toFixed(1)}°C</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Turbidity:</span>
                    <span className="font-medium ml-1">{sensor.lastReading.turbidity.toFixed(1)} NTU</span>
                  </div>
                  <div>
                    <span className="text-gray-600">DO:</span>
                    <span className="font-medium ml-1">{sensor.lastReading.dissolvedOxygen.toFixed(1)} mg/L</span>
                  </div>
                </div>
              </div>
            </div>
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}