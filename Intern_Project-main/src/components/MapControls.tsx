import React from 'react';
import { Clock, MapPin, Eye, EyeOff } from 'lucide-react';

interface MapControlsProps {
  showDischargeOverlay: boolean;
  onToggleDischargeOverlay: (show: boolean) => void;
  showHistoricalData: boolean;
  onToggleHistoricalData: (show: boolean) => void;
  historicalDataCount: number;
  selectedTimeRange: string;
  onTimeRangeChange: (range: string) => void;
}

export const MapControls: React.FC<MapControlsProps> = ({
  showHistoricalData,
  onToggleHistoricalData,
  historicalDataCount,
  selectedTimeRange,
  onTimeRangeChange,
  showDischargeOverlay,
  onToggleDischargeOverlay,
}) => {
  const timeRanges = [
    { value: '24h', label: 'Last 24 Hours' },
    { value: '7d', label: 'Last 7 Days' },
    { value: '30d', label: 'Last 30 Days' },
  ];

  return (
    <div className="absolute top-4 right-4 z-10 bg-white rounded-lg shadow-lg p-4 space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-gray-800">Map Controls</h3>
      </div>
      
      <div className="space-y-3">
        {/* Toggle Historical Data */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-gray-600" />
            <span className="text-sm text-gray-700">Historical Data</span>
          </div>
          <button
            onClick={() => onToggleHistoricalData(!showHistoricalData)}
            className={`flex items-center gap-1 px-3 py-1 rounded-md text-xs font-medium transition-colors ${
              showHistoricalData
                ? 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {showHistoricalData ? (
              <>
                <Eye className="w-3 h-3" />
                Visible
              </>
            ) : (
              <>
                <EyeOff className="w-3 h-3" />
                Hidden
              </>
            )}
          </button>
        </div>
        {/* Toggle Storm Overflow/Sewage Discharge Overlay */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-red-600" />
            <span className="text-sm text-gray-700">Storm/Sewage Discharge</span>
          </div>
          <button
            onClick={() => onToggleDischargeOverlay(!showDischargeOverlay)}
            className={`flex items-center gap-1 px-3 py-1 rounded-md text-xs font-medium transition-colors ${
              showDischargeOverlay
                ? 'bg-red-100 text-red-700 hover:bg-red-200'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {showDischargeOverlay ? (
              <>
                <Eye className="w-3 h-3" />
                Visible
              </>
            ) : (
              <>
                <EyeOff className="w-3 h-3" />
                Hidden
              </>
            )}
          </button>
        </div>

        {/* Time Range Selector */}
        {showHistoricalData && (
          <div className="space-y-2">
            <label className="text-xs text-gray-600 font-medium">Time Range</label>
            <select
              value={selectedTimeRange}
              onChange={(e) => onTimeRangeChange(e.target.value)}
              className="w-full text-xs border border-gray-300 rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {timeRanges.map((range) => (
                <option key={range.value} value={range.value}>
                  {range.label}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Data Count */}
        {showHistoricalData && (
          <div className="flex items-center gap-2 text-xs text-gray-600">
            <MapPin className="w-3 h-3" />
            <span>{historicalDataCount} historical points</span>
          </div>
        )}
      </div>

      {/* Legend */}
      <div className="border-t pt-3 space-y-2">
        <h4 className="text-xs font-semibold text-gray-700">Legend</h4>
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-blue-500"></div>
            <span className="text-xs text-gray-600">Current Sensor</span>
          </div>
          {showHistoricalData && (
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-green-500 opacity-80"></div>
              <span className="text-xs text-gray-600">Historical Reading</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};