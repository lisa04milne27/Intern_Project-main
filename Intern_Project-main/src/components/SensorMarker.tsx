import React from 'react';
import { Marker, Popup } from 'react-leaflet';
import { Icon, divIcon } from 'leaflet';
import { TurbiditySensor } from '../types/sensor';
import { getTurbidityColor, getTurbidityDescription, formatTimeAgo } from '../utils/turbidityUtils';
import { Droplets, Battery, Thermometer, Clock } from 'lucide-react';

interface SensorMarkerProps {
  sensor: TurbiditySensor;
  onSensorClick: (sensor: TurbiditySensor) => void;
}

export const SensorMarker: React.FC<SensorMarkerProps> = ({ sensor, onSensorClick }) => {
  const color = getTurbidityColor(sensor.turbidity);
  
  const customIcon = divIcon({
    html: `
      <div style="
        width: 24px;
        height: 24px;
        border-radius: 50%;
        background-color: ${color};
        border: 3px solid white;
        box-shadow: 0 2px 4px rgba(0,0,0,0.2);
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
      ">
        ${sensor.status === 'offline' ? '<div style="width: 8px; height: 8px; background: #6B7280; border-radius: 50%;"></div>' : ''}
        ${sensor.status === 'maintenance' ? '<div style="width: 8px; height: 8px; background: #F59E0B; border-radius: 50%;"></div>' : ''}
      </div>
    `,
    className: 'custom-marker',
    iconSize: [24, 24],
    iconAnchor: [12, 12],
  });

  return (
    <Marker
      position={[sensor.location.lat, sensor.location.lng]}
      icon={customIcon}
      eventHandlers={{
        click: () => onSensorClick(sensor),
      }}
    >
      <Popup>
        <div className="p-2 min-w-[250px]">
          <h3 className="font-semibold text-lg mb-2">{sensor.name}</h3>
          
          <div className="space-y-2 text-sm">
            <div className="flex items-center gap-2">
              <Droplets className="w-4 h-4 text-blue-500" />
              <span className="font-medium">Turbidity:</span>
              <span style={{ color }}>{sensor.turbidity} NTU</span>
            </div>
            
            <div className="text-xs text-gray-600 mb-2">
              {getTurbidityDescription(sensor.turbidity)}
            </div>
            
            <div className="flex items-center gap-2">
              <Thermometer className="w-4 h-4 text-orange-500" />
              <span className="font-medium">Temperature:</span>
              <span>{sensor.waterTemperature}°C</span>
            </div>
            
            <div className="flex items-center gap-2">
              <Battery className="w-4 h-4 text-green-500" />
              <span className="font-medium">Battery:</span>
              <span>{sensor.batteryLevel}%</span>
            </div>
            
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-gray-500" />
              <span className="font-medium">Last Update:</span>
              <span>{formatTimeAgo(sensor.lastUpdated)}</span>
            </div>
            
            <div className="mt-2 pt-2 border-t">
              <div className="flex items-center gap-2">
                <div 
                  className={`w-2 h-2 rounded-full ${
                    sensor.status === 'online' ? 'bg-green-500' : 
                    sensor.status === 'offline' ? 'bg-red-500' : 'bg-yellow-500'
                  }`}
                />
                <span className="text-xs capitalize font-medium">{sensor.status}</span>
              </div>
            </div>
          </div>
        </div>
      </Popup>
    </Marker>
  );
};