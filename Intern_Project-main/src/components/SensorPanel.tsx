import React from 'react';
import { Activity, Thermometer, Droplets, Zap, Eye } from 'lucide-react';
import { Sensor } from '../../types/sensor';
import { getWaterQualityLevel, getQualityColor, getQualityLabel } from '../../utils/waterQuality';
import { format } from 'date-fns';

interface SensorPanelProps {
  sensor: Sensor;
  className?: string;
}

export default function SensorPanel({ sensor, className = '' }: SensorPanelProps) {
  const qualityLevel = getWaterQualityLevel(sensor.lastReading);
  const qualityColor = getQualityColor(qualityLevel);
  const qualityLabel = getQualityLabel(qualityLevel);

  const metrics = [
    {
      icon: Activity,
      label: 'pH Level',
      value: sensor.lastReading.ph.toFixed(2),
      unit: '',
      ideal: '6.5-8.5',
    },
    {
      icon: Eye,
      label: 'Turbidity',
      value: sensor.lastReading.turbidity.toFixed(1),
      unit: 'NTU',
      ideal: '<1',
    },
    {
      icon: Thermometer,
      label: 'Temperature',
      value: sensor.lastReading.temperature.toFixed(1),
      unit: '°C',
      ideal: '18-25',
    },
    {
      icon: Droplets,
      label: 'Dissolved Oxygen',
      value: sensor.lastReading.dissolvedOxygen.toFixed(1),
      unit: 'mg/L',
      ideal: '>5',
    },
    {
      icon: Zap,
      label: 'Conductivity',
      value: sensor.lastReading.conductivity.toFixed(0),
      unit: 'μS/cm',
      ideal: '200-500',
    },
  ];

  return (
    <div className={`bg-white rounded-lg shadow-lg p-6 ${className}`}>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">{sensor.name}</h2>
          <p className="text-gray-600">
            Last updated: {format(sensor.lastReading.timestamp, 'MMM dd, yyyy HH:mm')}
          </p>
        </div>
        <div className="flex flex-col items-end">
          <div className="flex items-center gap-2">
            <div 
              className="w-3 h-3 rounded-full animate-pulse"
              style={{ backgroundColor: sensor.status === 'online' ? '#10B981' : '#EF4444' }}
            />
            <span className={`text-sm font-medium capitalize ${
              sensor.status === 'online' ? 'text-green-600' : 'text-red-600'
            }`}>
              {sensor.status}
            </span>
          </div>
          <div 
            className="px-3 py-1 rounded-full text-white text-sm font-medium mt-2"
            style={{ backgroundColor: qualityColor }}
          >
            {qualityLabel}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {metrics.map((metric, index) => (
          <div key={index} className="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-white rounded-lg shadow-sm">
                <metric.icon className="w-5 h-5 text-gray-600" />
              </div>
              <span className="text-sm font-medium text-gray-700">{metric.label}</span>
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-bold text-gray-900">{metric.value}</span>
              <span className="text-sm text-gray-600">{metric.unit}</span>
            </div>
            <div className="text-xs text-gray-500 mt-1">
              Ideal: {metric.ideal}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}