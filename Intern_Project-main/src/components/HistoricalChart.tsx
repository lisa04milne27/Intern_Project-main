import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Calendar, TrendingUp } from 'lucide-react';
import { SensorReading } from '../../types/sensor';
import { format, subDays, isWithinInterval } from 'date-fns';

interface HistoricalChartProps {
  readings: SensorReading[];
  className?: string;
}

type TimeRange = '24h' | '7d' | '30d';

export default function HistoricalChart({ readings, className = '' }: HistoricalChartProps) {
  const [selectedRange, setSelectedRange] = useState<TimeRange>('7d');
  const [selectedMetric, setSelectedMetric] = useState<string>('ph');

  const now = new Date();
  const getRangeDate = (range: TimeRange) => {
    switch (range) {
      case '24h': return subDays(now, 1);
      case '7d': return subDays(now, 7);
      case '30d': return subDays(now, 30);
    }
  };

  const filteredReadings = readings.filter(reading =>
    isWithinInterval(reading.timestamp, {
      start: getRangeDate(selectedRange),
      end: now
    })
  );

  const chartData = filteredReadings.map(reading => ({
    timestamp: format(reading.timestamp, selectedRange === '24h' ? 'HH:mm' : 'MMM dd'),
    ph: reading.ph,
    turbidity: reading.turbidity,
    temperature: reading.temperature,
    dissolvedOxygen: reading.dissolvedOxygen,
    conductivity: reading.conductivity,
  }));

  const metrics = {
    ph: { label: 'pH Level', color: '#3B82F6', unit: '' },
    turbidity: { label: 'Turbidity', color: '#10B981', unit: 'NTU' },
    temperature: { label: 'Temperature', color: '#F59E0B', unit: '°C' },
    dissolvedOxygen: { label: 'Dissolved Oxygen', color: '#8B5CF6', unit: 'mg/L' },
    conductivity: { label: 'Conductivity', color: '#EF4444', unit: 'μS/cm' },
  };

  return (
    <div className={`bg-white rounded-lg shadow-lg p-6 ${className}`}>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
        <div className="flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-gray-600" />
          <h3 className="text-xl font-bold text-gray-900">Historical Data</h3>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-gray-600" />
            <select
              value={selectedRange}
              onChange={(e) => setSelectedRange(e.target.value as TimeRange)}
              className="border border-gray-300 rounded-lg px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="24h">Last 24 Hours</option>
              <option value="7d">Last 7 Days</option>
              <option value="30d">Last 30 Days</option>
            </select>
          </div>
          
          <select
            value={selectedMetric}
            onChange={(e) => setSelectedMetric(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {Object.entries(metrics).map(([key, metric]) => (
              <option key={key} value={key}>{metric.label}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis 
              dataKey="timestamp" 
              stroke="#666"
              fontSize={12}
              tick={{ fill: '#666' }}
            />
            <YAxis 
              stroke="#666"
              fontSize={12}
              tick={{ fill: '#666' }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'white',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
              }}
              formatter={(value: number) => [
                `${value.toFixed(2)} ${metrics[selectedMetric as keyof typeof metrics].unit}`,
                metrics[selectedMetric as keyof typeof metrics].label
              ]}
            />
            <Legend />
            <Line
              type="monotone"
              dataKey={selectedMetric}
              stroke={metrics[selectedMetric as keyof typeof metrics].color}
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 4, stroke: metrics[selectedMetric as keyof typeof metrics].color, strokeWidth: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}