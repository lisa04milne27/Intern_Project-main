import React from 'react';
import { TurbiditySensor } from '../types/sensor';
import { getTurbidityLevel } from '../utils/turbidityUtils';
import { Droplets, Wifi, AlertTriangle } from 'lucide-react';

interface DashboardStatsProps {
  sensors: TurbiditySensor[];
}

export const DashboardStats: React.FC<DashboardStatsProps> = ({ sensors }) => {
  const onlineSensors = sensors.filter(s => s.status === 'online');

  const avgTurbidity = onlineSensors.length > 0 
    ? onlineSensors.reduce((sum, s) => sum + s.turbidity, 0) / onlineSensors.length 
    : 0;

  // Find sensor with highest turbidity
  const highestTurbiditySensor =
    sensors.length > 0
      ? sensors.reduce((max, s) => (s.turbidity > max.turbidity ? s : max), sensors[0])
      : null;

    // Find sensor with highest temperature
  const highestTemperatureSensor =
    sensors.length > 0
      ? sensors.reduce((max, s) => (s.waterTemperature > max.waterTemperature ? s : max), sensors[0])
      : null;

  const stats = [
    {
      title: 'Online Sensors',
      value: onlineSensors.length,
      total: sensors.length,
      icon: Wifi,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
    },
    {
      title: 'Avg Turbidity',
      value: avgTurbidity.toFixed(1),
      unit: 'NTU',
      icon: Droplets,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      title: 'Highest Turbidity',
      value: highestTurbiditySensor ? highestTurbiditySensor.turbidity : 'N/A',
      unit: highestTurbiditySensor ? 'NTU' : undefined,
      location: highestTurbiditySensor ? highestTurbiditySensor.name : '',
      icon: AlertTriangle,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
    },
    {
      title: 'Highest Temperature',
      value: highestTemperatureSensor ? highestTemperatureSensor.waterTemperature : 'N/A',
      unit: highestTemperatureSensor ? '°C' : undefined,
      location: highestTemperatureSensor ? highestTemperatureSensor.name : '',
      icon: AlertTriangle,
      color: 'text-pink-600',
      bgColor: 'bg-pink-50',
    },    
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {stats.map((stat, index) => (
        <div key={index} className={`${stat.bgColor} rounded-lg p-4 border border-gray-100`}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-gray-600 mb-1">{stat.title}</p>
              <div className="flex items-baseline gap-1">
                <p className={`text-xl font-bold ${stat.color}`}>
                  {stat.value}
                </p>
                {stat.unit && (
                  <span className="text-xs text-gray-500">{stat.unit}</span>
                )}
                {stat.total !== undefined && (
                  <span className="text-xs text-gray-400">/{stat.total}</span>
                )}
              </div>
              {/* Show location for highest turbidity */}
              {stat.title === 'Highest Turbidity' && stat.location && (
                <div className="text-xs text-gray-700 mt-1">
                  {stat.location}
                </div>
              )}
              {/* Show location for highest temperature */}
              {stat.title === 'Highest Temperature' && stat.location && (
                <div className="text-xs text-gray-700 mt-1">
                  {stat.location}
                </div>
              )}
            </div>
            <stat.icon className={`w-8 h-8 ${stat.color} opacity-80`} />
          </div>
        </div>
      ))}
    </div>
  );
}