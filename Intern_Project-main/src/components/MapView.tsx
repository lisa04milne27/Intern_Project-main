import React, { useState } from 'react';
import { TurbidityMap } from './TurbidityMap';
import { SensorDetailModal } from './SensorDetailModal';
import { TurbiditySensor } from '../types/sensor';

interface MapViewProps {
  sensors: TurbiditySensor[];
}

export const MapView: React.FC<MapViewProps> = ({ sensors }) => {
  const [selectedSensor, setSelectedSensor] = useState<TurbiditySensor | null>(null);
  const [detailModalSensor, setDetailModalSensor] = useState<TurbiditySensor | null>(null);
  const [showDischargeOverlay, setShowDischargeOverlay] = useState(false);

  const handleSensorSelect = (sensor: TurbiditySensor) => {
    setSelectedSensor(sensor);
    setDetailModalSensor(sensor);
  };

  return (
    <div className="h-full">
      <div className="h-[calc(100vh-10rem)] bg-white rounded-lg shadow-sm relative">
        {/* Centered filter toggle button for discharge overlay */}
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-20 flex justify-center w-full pointer-events-none">
          <button
            className={`px-4 py-2 rounded-md text-xs font-medium shadow transition-colors pointer-events-auto ${
              showDischargeOverlay
                ? 'bg-red-100 text-red-700 hover:bg-red-200'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
            onClick={() => setShowDischargeOverlay((v) => !v)}
          >
            {showDischargeOverlay ? 'Hide Storm/Sewage Discharge Overlay' : 'Show Storm/Sewage Discharge Overlay'}
          </button>
        </div>
        <TurbidityMap
          sensors={sensors}
          selectedSensor={selectedSensor}
          onSensorSelect={handleSensorSelect}
          showDischargeOverlay={showDischargeOverlay}
        />
      </div>

      {/* Sensor Detail Modal */}
      <SensorDetailModal
        sensor={detailModalSensor}
        onClose={() => setDetailModalSensor(null)}
      />
    </div>
  );
};