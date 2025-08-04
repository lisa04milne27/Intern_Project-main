import React from 'react';
import { TurbiditySensor } from '../types/sensor';
import { getTurbidityLevel } from '../utils/turbidityUtils';
import { Droplets, Wifi, WifiOff, Settings, TrendingUp } from 'lucide-react';

interface DashboardStatsProps {
  sensors: TurbiditySensor[];
}

export const DashboardStats: React.FC<DashboardStatsProps> = ({ sensors }) => {
  const onlineSensors = sensors.filter(s => s.status === 'online');
  const offlineSensors = sensors.filter(s => s.status === 'offline');
  const maintenanceSensors = sensors.filter(s => s.status === 'maintenance');
  
  const avgTurbidity = onlineSensors.length > 0 
    ? onlineSensors.reduce((sum, s) => sum + s.turbidity, 0) / onlineSensors.length 
    : 0;
    
  const excellentCount = sensors.filter(s => getTurbidityLevel(s.turbidity) === 'excellent').length;
  const poorCount = sensors.filter(s => ['poor', 'very-poor'].includes(getTurbidityLevel(s.turbidity))).length;
  
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
      title: 'Offline Sensors',
      value: offlineSensors.length,
      total: sensors.length,
      icon: WifiOff,
      color: 'text-red-600',
      bgColor: 'bg-red-50',
    },
    {
      title: 'Maintenance',
      value: maintenanceSensors.length,
      total: sensors.length,
      icon: Settings,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50',
    },
    {
      title: 'Avg Turbidity',
      value: avgTurbidity.toFixed(1),
      unit: 'NTU',
      icon: Droplets,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
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
                {stat.total && (
                  <span className="text-xs text-gray-400">/{stat.total}</span>
                )}
              </div>
            </div>
            <stat.icon className={`w-8 h-8 ${stat.color} opacity-80`} />
          </div>
        </div>
      ))}
    </div>
  );
};