import React, { useState, useMemo } from 'react';
import { TurbidityMap } from './TurbidityMap';
import { MapControls } from './MapControls';
import { TurbiditySensor } from '../types/sensor';
import { mockHistoricalData } from '../data/mockHistoricalData';
import { subDays, isWithinInterval } from 'date-fns';

interface EnhancedTurbidityMapProps {
  sensors: TurbiditySensor[];
  selectedSensor: TurbiditySensor | null;
  onSensorSelect: (sensor: TurbiditySensor) => void;
}

export const EnhancedTurbidityMap: React.FC<EnhancedTurbidityMapProps> = ({
  sensors,
  selectedSensor,
  onSensorSelect,
}) => {
  const [showHistoricalData, setShowHistoricalData] = useState(true);
  const [selectedTimeRange, setSelectedTimeRange] = useState('7d');
  const [selectedHistoricalReading, setSelectedHistoricalReading] = useState<any>(null);

  // Filter historical readings based on time range
  const filteredHistoricalReadings = useMemo(() => {
    const now = new Date();
    let startDate: Date;

    switch (selectedTimeRange) {
      case '24h':
        startDate = subDays(now, 1);
        break;
      case '7d':
        startDate = subDays(now, 7);
        break;
      case '30d':
        startDate = subDays(now, 30);
        break;
      default:
        startDate = subDays(now, 7);
    }

    return mockHistoricalData.filter(reading =>
      isWithinInterval(reading.timestamp, { start: startDate, end: now })
    );
  }, [selectedTimeRange]);

  const handleHistoricalReadingSelect = (reading: any) => {
    setSelectedHistoricalReading(reading);
    console.log('Selected historical reading:', reading);
  };

  return (
    <div className="relative h-full w-full">
      <TurbidityMap
        sensors={sensors}
        selectedSensor={selectedSensor}
        onSensorSelect={onSensorSelect}
        historicalReadings={filteredHistoricalReadings}
        showHistoricalData={showHistoricalData}
        onHistoricalReadingSelect={handleHistoricalReadingSelect}
      />

      <MapControls
        showHistoricalData={showHistoricalData}
        onToggleHistoricalData={setShowHistoricalData}
        historicalDataCount={filteredHistoricalReadings.length}
        selectedTimeRange={selectedTimeRange}
        onTimeRangeChange={setSelectedTimeRange}
      />

      {/* Historical Reading Details Panel */}
      {selectedHistoricalReading && (
        <div className="absolute bottom-4 left-4 bg-white rounded-lg shadow-lg p-4 max-w-sm z-10">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-semibold text-gray-800">Historical Reading Details</h3>
            <button
              onClick={() => setSelectedHistoricalReading(null)}
              className="text-gray-400 hover:text-gray-600"
            >
              ×
            </button>
          </div>
          <div className="space-y-2 text-xs">
            <div className="grid grid-cols-2 gap-2">
              <div>
                <span className="text-gray-600">Date:</span>
                <div className="font-medium">
                  {new Date(selectedHistoricalReading.timestamp).toLocaleDateString()}
                </div>
              </div>
              <div>
                <span className="text-gray-600">Time:</span>
                <div className="font-medium">
                  {new Date(selectedHistoricalReading.timestamp).toLocaleTimeString()}
                </div>
              </div>
              <div>
                <span className="text-gray-600">Turbidity:</span>
                <div className="font-medium">{selectedHistoricalReading.turbidity.toFixed(1)} NTU</div>
              </div>
              <div>
                <span className="text-gray-600">Sensor:</span>
                <div className="font-medium">{selectedHistoricalReading.sensorId}</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}