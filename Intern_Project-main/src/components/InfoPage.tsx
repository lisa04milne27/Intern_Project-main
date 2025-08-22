import React from 'react';
import { Droplets, Thermometer, Battery, Wifi, BarChart3, MapPin, Info, AlertCircle } from 'lucide-react';

export const InfoPage: React.FC = () => {
  const metrics = [
    {
      icon: Droplets,
      title: 'Turbidity (NTU)',
      description: 'Nephelometric Turbidity Units measure water clarity by detecting light scattering caused by suspended particles.',
      calculation: 'Measured using nephelometric sensors that emit light and detect scattered light at 90° angle.',
      ranges: [
        { range: '0-4 NTU', level: 'Excellent', color: 'bg-green-100 text-green-800', description: 'Crystal clear water, suitable for all uses' },
        { range: '4-10 NTU', level: 'Good', color: 'bg-green-50 text-green-700', description: 'Clear water with minimal particles' },
        { range: '10-25 NTU', level: 'Moderate', color: 'bg-yellow-100 text-yellow-800', description: 'Slightly cloudy, may require treatment' },
        { range: '25-50 NTU', level: 'Poor', color: 'bg-orange-100 text-orange-800', description: 'Cloudy water with visible particles' },
        { range: '50+ NTU', level: 'Very Poor', color: 'bg-red-100 text-red-800', description: 'Highly turbid, requires immediate attention' },
      ]
    },
    {
      icon: Thermometer,
      title: 'Water Temperature (°C)',
      description: 'Temperature affects water quality, biological processes, and chemical reactions in water bodies.',
      calculation: 'Measured using calibrated thermistors or RTD sensors with ±0.1°C accuracy.',
      ranges: [
        { range: '0-4°C', level: 'Very Cold', color: 'bg-blue-100 text-blue-800', description: 'Near freezing, low biological activity' },
        { range: '4-15°C', level: 'Cold', color: 'bg-blue-50 text-blue-700', description: 'Cool water, moderate biological activity' },
        { range: '15-25°C', level: 'Optimal', color: 'bg-green-100 text-green-800', description: 'Ideal temperature range for most aquatic life' },
        { range: '25-30°C', level: 'Warm', color: 'bg-yellow-100 text-yellow-800', description: 'Warm water, increased biological activity' },
        { range: '30+°C', level: 'Hot', color: 'bg-red-100 text-red-800', description: 'High temperature, potential stress on aquatic life' },
      ]
    }
  ];

  const calculations = [
    {
      title: 'Overall Water Quality Score',
      formula: 'max(0, min(100, 100 - (Average Turbidity × 2)))',
      description: 'A composite score from 0-100 where higher values indicate better water quality. Based primarily on turbidity levels with adjustments for temperature and other factors.',
      example: 'If average turbidity is 15 NTU: 100 - (15 × 2) = 70/100'
    },
    {
      title: 'Turbidity Score',
      formula: 'max(0, min(100, 100 - Average Turbidity))',
      description: 'A normalized score where lower turbidity values result in higher scores. Used for dashboard visualization.',
      example: 'If turbidity is 25 NTU: 100 - 25 = 75/100'
    },
    {
      title: 'Predicted Bacteria Level',
      formula: 'Correlation model based on turbidity, temperature, and historical data',
      description: 'Uses statistical correlation between turbidity levels and bacterial contamination. Higher turbidity often correlates with increased bacterial presence.',
      example: 'Turbidity > 50 NTU typically indicates elevated bacteria risk'
    }
  ];

  const sensorStatuses = [
    {
      status: 'Online',
      icon: Wifi,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      description: 'Sensor is actively transmitting data and functioning normally. Data is current and reliable.'
    },
    {
      status: 'Offline',
      icon: Wifi,
      color: 'text-red-600',
      bgColor: 'bg-red-50',
      description: 'Sensor has lost communication. Could indicate power failure, connectivity issues, or hardware malfunction.'
    },
    {
      status: 'Maintenance',
      icon: AlertCircle,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50',
      description: 'Sensor is undergoing scheduled maintenance or calibration. Data may be temporarily unavailable.'
    }
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center gap-3 mb-4">
          <Info className="w-8 h-8 text-blue-500" />
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Metrics Information</h1>
            <p className="text-gray-600">Understanding turbidity sensor measurements and calculations</p>
          </div>
        </div>
      </div>

      {/* Sensor Metrics */}
      <div className="space-y-6">
        <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
          <BarChart3 className="w-6 h-6 text-blue-500" />
          Sensor Metrics
        </h2>
        
        {metrics.map((metric, index) => (
          <div key={index} className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-start gap-4 mb-4">
              <div className="p-3 bg-blue-50 rounded-lg">
                <metric.icon className="w-6 h-6 text-blue-600" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">{metric.title}</h3>
                <p className="text-gray-600 mb-3">{metric.description}</p>
                <div className="bg-gray-50 rounded-lg p-3 mb-4">
                  <h4 className="font-medium text-gray-700 mb-1">How it's calculated:</h4>
                  <p className="text-sm text-gray-600">{metric.calculation}</p>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="font-medium text-gray-700 mb-3">Interpretation Ranges:</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {metric.ranges.map((range, rangeIndex) => (
                  <div key={rangeIndex} className="border rounded-lg p-3">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-sm text-gray-700">{range.range}</span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${range.color}`}>
                        {range.level}
                      </span>
                    </div>
                    <p className="text-xs text-gray-600">{range.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Sensor Status */}
      <div className="space-y-6">
        <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
          <Wifi className="w-6 h-6 text-blue-500" />
          Sensor Status Indicators
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {sensorStatuses.map((status, index) => (
            <div key={index} className={`${status.bgColor} rounded-lg p-6 border`}>
              <div className="flex items-center gap-3 mb-3">
                <status.icon className={`w-6 h-6 ${status.color}`} />
                <h3 className="text-lg font-semibold text-gray-800">{status.status}</h3>
              </div>
              <p className="text-gray-700 text-sm">{status.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Data Collection */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <MapPin className="w-6 h-6 text-blue-500" />
          Data Collection & Updates
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold text-gray-800 mb-2">Update Frequency</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>• Real-time data: Every 5 seconds</li>
              <li>• Historical data: Stored every 15 minutes</li>
              <li>• Calibration: Performed monthly</li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-gray-800 mb-2">Data Accuracy</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>• Turbidity: ±2% or ±0.1 NTU</li>
              <li>• Temperature: ±0.1°C</li>
              <li>• GPS Location: ±3 meters</li>
            </ul>
          </div>
        </div>
        
        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
          <h4 className="font-medium text-blue-800 mb-2">Important Notes:</h4>
          <ul className="space-y-1 text-sm text-blue-700">
            <li>• Turbidity readings may fluctuate due to natural water movement and environmental conditions</li>
            <li>• Temperature variations are normal throughout the day and seasons</li>
            <li>• Sensors automatically calibrate but may require manual calibration in extreme conditions</li>
          </ul>
        </div>
      </div>
    </div>
  );
};