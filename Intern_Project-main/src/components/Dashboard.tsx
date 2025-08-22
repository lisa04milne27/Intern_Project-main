import React from 'react';
import { TurbiditySensor } from '../types/sensor';
import { getTurbidityLevel } from '../utils/turbidityUtils';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

import { useTTNData } from '../hooks/useTTNData';

function TTNStatus() {
  const ttnData = useTTNData();
  if (!ttnData) return <div>Waiting for TTN data...</div>;
  return (
    <div>
      <h3>Latest TTN Data</h3>
      <pre>{JSON.stringify(ttnData, null, 2)}</pre>
    </div>
  );
}

interface DashboardProps {
  sensors: TurbiditySensor[];
}

export const Dashboard: React.FC<DashboardProps> = ({ sensors }) => {
  const onlineSensors = sensors.filter(s => s.status === 'online');
  
  // Calculate overall water quality score (0-100)
    const ttnData = useTTNData();
    // Use TTN data if available, otherwise fallback to first online sensor
    const latestSensor = ttnData?.uplink_message?.decoded_payload
      ? {
          turbidity: ttnData.uplink_message.decoded_payload.turbidity,
          waterTemperature: ttnData.uplink_message.decoded_payload.temperature,
          location: ttnData.location || sensors[0]?.location || { lat: 0, lng: 0 },
        }
      : sensors[0];
    const avgTurbidity = latestSensor?.turbidity || 0;
    const avgTemperature = latestSensor?.waterTemperature || 0;
    const location = latestSensor?.location || { lat: 0, lng: 0 };
  
  const waterQualityScore = Math.max(0, Math.min(100, 100 - (avgTurbidity * 2)));
  
  // Generate mock data for the past 24 hours
  const generateHourlyData = () => {
    const data = [];
    const now = new Date();
    
    for (let i = 23; i >= 0; i--) {
      const time = new Date(now.getTime() - i * 60 * 60 * 1000);
      const hour = time.getHours();
      const minute = time.getMinutes();
      
      // Generate realistic temperature data (16-20°C with some variation)
      const baseTemp = 18;
      const tempVariation = Math.sin(hour / 24 * Math.PI * 2) * 2 + Math.random() * 0.5;
      const temperature = baseTemp + tempVariation;
      
      // Generate turbidity data (e.g., 10-150 NTU)
      const baseTurbidity = 40;
      const turbidityVariation = Math.sin((hour + 3) / 24 * Math.PI * 2) * 30 + Math.random() * 20;
      const turbidity = baseTurbidity + turbidityVariation;

      data.push({
        time: `${hour.toString().padStart(2, '0')}:${minute < 30 ? '00' : '30'}`,
        temperature: Math.round(temperature * 10) / 10,
        turbidity: Math.round(turbidity * 10) / 10,
      });
    }
    
    return data;
  };

  // Generate past 7 days water quality data
  const generateWeeklyQuality = () => {
    const qualities = [];
    const colors = ['#10B981', '#22C55E', '#F59E0B', '#EF4444', '#DC2626'];
    
    for (let i = 6; i >= 0; i--) {
      const qualityIndex = Math.floor(Math.random() * 5);
      qualities.push(colors[qualityIndex]);
    }
    
    return qualities;
  };

  const hourlyData = generateHourlyData();
  const weeklyQualities = generateWeeklyQuality();
  
  // Calculate turbidity score (0-100, higher is better)
  const turbidityScore = Math.max(0, Math.min(100, 100 - avgTurbidity));

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Project Overview */}
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Project Overview</h3>
          <div className="flex items-left justify-left">
            <div className="relative w-69 h-32">
            <ul className="space-y-6 text-sm text-gray-600">
            <li>Welcome to Project Amazi, the TTP Intern Impact Project 2025!</li>
            <li>See real time data on water quality from a IoT network of loggers along the River Cam.</li>
            </ul>
            </div>
          </div>
        </div>

        {/* Past 7 Days */}
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Past 7 days</h3>
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="flex gap-1">
                {weeklyQualities.map((color, index) => (
                  <div
                    key={index}
                    className="w-8 h-4 rounded-sm"
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            </div>
            <div className="flex justify-between text-sm text-gray-500">
              <span>D-7</span>
              <span>Today</span>
            </div>
            
            <div className="mt-6">
              <h4 className="text-sm font-medium text-gray-700 mb-2">Predicted bacteria level</h4>
              <div className="flex items-center gap-2 mb-2">
                <div className="flex-1 h-2 bg-gradient-to-r from-green-500 via-yellow-500 to-red-500 rounded-full relative">
                  <div 
                    className="absolute top-0 w-0.5 h-4 bg-gray-800 -mt-1"
                    style={{ left: '15%' }}
                  />
                </div>
              </div>
              <div className="flex justify-between text-xs text-gray-500">
                <span>0</span>
                <span>3</span>
                <span>7</span>
                <span>10</span>
              </div>
            </div>
          </div>
        </div>

        {/* Site Navigation */}
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Site Navigation</h3>
          <div className="flex items-center justify-left">
            <div className="relative w-64 h-32">
              <ul className="space-y-2 text-sm text-gray-600">
                <li>Use the tabs to navigate between pages:</li>
                <li>• Map: view live geographical data</li>
                <li>• Sensors: stream live readings</li>
                <li>• Export: access raw csv sensor data</li>
                <li>• Info: learn measurement context</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Row - Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Temperature Chart */}
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-800">Average Temperature</h3>
            <span className="text-sm text-gray-500">°C</span>
          </div>
          <div className="mb-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <span className="text-sm text-gray-600">Temperature</span>
            </div>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={hourlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis 
                  dataKey="time" 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: '#9CA3AF' }}
                />
                <YAxis 
                  domain={[10, 25]}
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: '#9CA3AF' }}
                />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'white',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="temperature" 
                  stroke="#3B82F6" 
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Turbidity Chart */}
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-800">Average Turbidity</h3>
            <span className="text-sm text-gray-500">NTU</span>
          </div>
          <div className="mb-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <span className="text-sm text-gray-600">Turbidity</span>
            </div>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={hourlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis 
                  dataKey="time" 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: '#9CA3AF' }}
                />
                <YAxis 
                  domain={[0, 200]}
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: '#9CA3AF' }}
                />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'white',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="turbidity" 
                  stroke="#3B82F6" 
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};