import React from 'react';
import { TurbiditySensor } from '../types/sensor';
import { formatTimeAgo } from '../utils/turbidityUtils';

interface SensorsViewProps {
  sensors: TurbiditySensor[];
}

export const SensorsView: React.FC<SensorsViewProps> = ({ sensors }) => {
  const getStatusBadge = (status: string) => {
    const baseClasses = "inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium";
    
    switch (status) {
      case 'online':
        return `${baseClasses} bg-green-100 text-green-800`;
      case 'offline':
        return `${baseClasses} bg-red-100 text-red-800`;
      case 'maintenance':
        return `${baseClasses} bg-yellow-100 text-yellow-800`;
      default:
        return `${baseClasses} bg-gray-100 text-gray-800`;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'online':
        return <div className="w-2 h-2 bg-green-500 rounded-full"></div>;
      case 'offline':
        return <div className="w-2 h-2 bg-red-500 rounded-full"></div>;
      case 'maintenance':
        return <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>;
      default:
        return <div className="w-2 h-2 bg-gray-500 rounded-full"></div>;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">Name</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">Status</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">Last update</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">Turbidity (NTU)</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">Temperature (°C)</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">Firmware version</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {sensors.map((sensor, index) => (
              <tr key={sensor.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4">
                  <div className="text-sm font-medium text-gray-900">{sensor.name}</div>
                </td>
                <td className="px-6 py-4">
                  <span className={getStatusBadge(sensor.status)}>
                    {getStatusIcon(sensor.status)}
                    <span className="capitalize">{sensor.status}</span>
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-900">
                    {sensor.lastUpdated.toLocaleDateString('en-GB')}
                  </div>
                  <div className="text-xs text-gray-500">
                    {formatTimeAgo(sensor.lastUpdated)}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm font-medium text-gray-900">
                    {sensor.turbidity}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm font-medium text-gray-900">
                    {sensor.waterTemperature}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-900">1.0.0</div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {sensors.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-500">No sensors found</div>
        </div>
      )}
    </div>
  );
};