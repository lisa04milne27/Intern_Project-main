import React from 'react';
import { TurbiditySensor } from '../types/sensor';
import { getTurbidityColor, getTurbidityDescription, formatTimeAgo } from '../utils/turbidityUtils';
import { Droplets, Battery, Thermometer, MapPin, Clock } from 'lucide-react';
import { useTTNData } from '../hooks/useTTNData';

interface SensorCardProps {
  sensor: TurbiditySensor;
  onSelect: (sensor: TurbiditySensor) => void;
  isSelected: boolean;
}

  const ttnData = useTTNData();
  const ttnSensor = ttnData?.uplink_message?.decoded_payload;
  const turbidity = ttnSensor?.turbidity ?? sensor.turbidity;
  const temperature = ttnSensor?.temperature ?? sensor.waterTemperature;
  const location = ttnData?.location ?? sensor.location;
  const turbidityColor = getTurbidityColor(turbidity);

  return (
    <div
      className={`bg-white rounded-lg p-4 shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer border-l-4 ${
        isSelected ? 'ring-2 ring-blue-500 shadow-lg' : ''
      }`}
      style={{ borderLeftColor: turbidityColor }}
      onClick={() => onSelect(sensor)}
    >
      <div className="flex items-start justify-between mb-3">
        <h3 className="font-semibold text-gray-800 text-sm">{sensor.name}</h3>
        <div className="flex items-center gap-1">
          <div 
            className={`w-2 h-2 rounded-full ${
              sensor.status === 'online' ? 'bg-green-500' : 
              sensor.status === 'offline' ? 'bg-red-500' : 'bg-yellow-500'
            }`}
          />
          <span className="text-xs text-gray-500 capitalize">{sensor.status}</span>
        </div>
      </div>
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <Droplets className="w-3 h-3 text-blue-500" />
          <span className="text-xs text-gray-600">Turbidity:</span>
          <span className="text-sm font-medium" style={{ color: turbidityColor }}>
            {turbidity} NTU
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Thermometer className="w-3 h-3 text-orange-500" />
          <span className="text-xs text-gray-600">Temp:</span>
          <span className="text-sm">{temperature}°C</span>
        </div>
        <div className="flex items-center gap-2">
          <MapPin className="w-3 h-3 text-green-500" />
          <span className="text-xs text-gray-600">Location:</span>
          <span className="text-sm font-medium">Lat {location.lat}, Lng {location.lng}</span>
        </div>
        <div className="flex items-center gap-2">
          <Battery className="w-3 h-3 text-green-500" />
          <span className="text-xs text-gray-600">Battery:</span>
          <span className="text-sm">{sensor.batteryLevel}%</span>
        </div>
        <div className="flex items-center gap-2">
          <Clock className="w-3 h-3 text-gray-400" />
          <span className="text-xs text-gray-500">{formatTimeAgo(sensor.lastUpdated)}</span>
        </div>
      </div>
    </div>
  );
};