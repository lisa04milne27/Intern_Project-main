import React from 'react';
import { TurbiditySensor } from '../types/sensor';
import { Download, FileText } from 'lucide-react';

interface ExportTabProps {
  sensors: TurbiditySensor[];
}

export const ExportTab: React.FC<ExportTabProps> = ({ sensors }) => {
  const exportToCSV = () => {
    // Create CSV headers
    const headers = [
      'Sensor ID',
      'Sensor Name',
      'Latitude',
      'Longitude',
      'Turbidity (NTU)',
      'Status',
      'Battery Level (%)',
      'Water Temperature (°C)',
      'Last Updated'
    ];

    // Convert sensor data to CSV rows
    const csvData = sensors.map(sensor => [
      sensor.id,
      sensor.name,
      sensor.location.lat.toString(),
      sensor.location.lng.toString(),
      sensor.turbidity.toString(),
      sensor.status,
      sensor.batteryLevel.toString(),
      sensor.waterTemperature.toString(),
      sensor.lastUpdated.toISOString()
    ]);

    // Combine headers and data
    const csvContent = [headers, ...csvData]
      .map(row => row.map(field => `"${field}"`).join(','))
      .join('\n');

    // Create and download the file
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    
    link.setAttribute('href', url);
    link.setAttribute('download', `turbidity-sensors-${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const exportToJSON = () => {
    const jsonData = {
      exportDate: new Date().toISOString(),
      totalSensors: sensors.length,
      sensors: sensors.map(sensor => ({
        ...sensor,
        lastUpdated: sensor.lastUpdated.toISOString()
      }))
    };

    const blob = new Blob([JSON.stringify(jsonData, null, 2)], { 
      type: 'application/json;charset=utf-8;' 
    });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    
    link.setAttribute('href', url);
    link.setAttribute('download', `turbidity-sensors-${new Date().toISOString().split('T')[0]}.json`);
    link.style.visibility = 'hidden';
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const onlineSensors = sensors.filter(s => s.status === 'online');
  const avgTurbidity = onlineSensors.length > 0 
    ? onlineSensors.reduce((sum, s) => sum + s.turbidity, 0) / onlineSensors.length 
    : 0;

  return (
    <div className="space-y-6">
      <div>
        <h3 className="font-semibold text-gray-800 text-sm mb-3">Export Data</h3>
        <p className="text-xs text-gray-600 mb-4">
          Download current sensor data in various formats for analysis or reporting.
        </p>
      </div>

      {/* Export Summary */}
      <div className="bg-blue-50 rounded-lg p-4 border border-blue-100">
        <div className="flex items-center gap-2 mb-3">
          <FileText className="w-5 h-5 text-blue-600" />
          <h4 className="font-medium text-blue-800">Export Summary</h4>
        </div>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-blue-700">Total Sensors:</span>
            <span className="font-medium text-blue-800">{sensors.length}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-blue-700">Online Sensors:</span>
            <span className="font-medium text-blue-800">{onlineSensors.length}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-blue-700">Avg Turbidity:</span>
            <span className="font-medium text-blue-800">{avgTurbidity.toFixed(1)} NTU</span>
          </div>
          <div className="flex justify-between">
            <span className="text-blue-700">Export Date:</span>
            <span className="font-medium text-blue-800">{new Date().toLocaleDateString()}</span>
          </div>
        </div>
      </div>

      {/* Export Options */}
      <div className="space-y-3">
        <h4 className="font-medium text-gray-800 text-sm">Export Formats</h4>
        
        <button
          onClick={exportToCSV}
          className="w-full flex items-center gap-3 p-4 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 hover:border-gray-300 transition-colors"
        >
          <div className="flex-shrink-0">
            <Download className="w-5 h-5 text-green-600" />
          </div>
          <div className="flex-1 text-left">
            <p className="font-medium text-gray-800">CSV Format</p>
            <p className="text-xs text-gray-600">
              Comma-separated values, ideal for Excel and data analysis
            </p>
          </div>
        </button>

        <button
          onClick={exportToJSON}
          className="w-full flex items-center gap-3 p-4 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 hover:border-gray-300 transition-colors"
        >
          <div className="flex-shrink-0">
            <Download className="w-5 h-5 text-blue-600" />
          </div>
          <div className="flex-1 text-left">
            <p className="font-medium text-gray-800">JSON Format</p>
            <p className="text-xs text-gray-600">
              Structured data format, ideal for APIs and web applications
            </p>
          </div>
        </button>
      </div>

      {/* Data Fields Info */}
      <div className="bg-gray-50 rounded-lg p-4">
        <h4 className="font-medium text-gray-800 text-sm mb-3">Included Data Fields</h4>
        <div className="grid grid-cols-1 gap-2 text-xs">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            <span className="text-gray-600">Sensor ID & Name</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            <span className="text-gray-600">GPS Coordinates</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            <span className="text-gray-600">Turbidity Readings</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            <span className="text-gray-600">Status & Battery Level</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            <span className="text-gray-600">Water Temperature</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            <span className="text-gray-600">Last Updated Timestamp</span>
          </div>
        </div>
      </div>
    </div>
  );
};