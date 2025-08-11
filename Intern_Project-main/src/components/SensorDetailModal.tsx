import React from 'react';
import { TurbiditySensor } from '../types/sensor';
import { getTurbidityColor, getTurbidityDescription, formatTimeAgo } from '../utils/turbidityUtils';
import { X, Droplets, Battery, Thermometer, MapPin, Clock, Wifi, WifiOff, Settings } from 'lucide-react';

interface SensorDetailModalProps {
  sensor: TurbiditySensor | null;
  onClose: () => void;
}

export const SensorDetailModal: React.FC<SensorDetailModalProps> = ({ sensor, onClose }) => {
  if (!sensor) return null;
  
  const turbidityColor = getTurbidityColor(sensor.turbidity);
  
  const StatusIcon = sensor.status === 'online' ? Wifi : sensor.status === 'offline' ? WifiOff : Settings;
  const statusColor = sensor.status === 'online' ? 'text-green-600' : sensor.status === 'offline' ? 'text-red-600' : 'text-yellow-600';
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-semibold text-gray-800">{sensor.name}</h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>
        
        <div className="p-6 space-y-6">
          {/* Status Section */}
          <div className="flex items-center gap-3">
            <StatusIcon className={`w-6 h-6 ${statusColor}`} />
            <div>
              <p className="font-medium text-gray-800 capitalize">{sensor.status}</p>
              <p className="text-sm text-gray-500">Sensor Status</p>
            </div>
          </div>
          
          {/* Turbidity Section */}
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center gap-3 mb-2">
              <Droplets className="w-6 h-6 text-blue-500" />
              <div>
                <p className="font-semibold text-2xl" style={{ color: turbidityColor }}>
                  {sensor.turbidity} NTU
                </p>
                <p className="text-sm text-gray-600">Current Turbidity</p>
              </div>
            </div>
            <p className="text-sm text-gray-600 mt-2">
              {getTurbidityDescription(sensor.turbidity)}
            </p>
          </div>
          
          {/* Additional Metrics */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-orange-50 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-1">
                <Thermometer className="w-5 h-5 text-orange-500" />
                <span className="text-sm font-medium text-gray-700">Temperature</span>
              </div>
              <p className="text-lg font-semibold text-orange-600">
                {sensor.waterTemperature}°C
              </p>
            </div>
            
            <div className="bg-green-50 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-1">
                <Battery className="w-5 h-5 text-green-500" />
                <span className="text-sm font-medium text-gray-700">Battery</span>
              </div>
              <p className="text-lg font-semibold text-green-600">
                {sensor.batteryLevel}%
              </p>
            </div>
          </div>
          
          {/* Location & Time Info */}
          <div className="space-y-3 pt-4 border-t">
            <div className="flex items-center gap-3">
              <MapPin className="w-5 h-5 text-gray-500" />
              <div>
                <p className="font-medium text-gray-800">Location</p>
                <p className="text-sm text-gray-600">
                  {sensor.location.lat.toFixed(4)}, {sensor.location.lng.toFixed(4)}
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <Clock className="w-5 h-5 text-gray-500" />
              <div>
                <p className="font-medium text-gray-800">Last Updated</p>
                <p className="text-sm text-gray-600">
                  {formatTimeAgo(sensor.lastUpdated)} • {sensor.lastUpdated.toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};