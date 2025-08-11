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

  const handleSensorSelect = (sensor: TurbiditySensor) => {
    setSelectedSensor(sensor);
    setDetailModalSensor(sensor);
  };

  return (
    <div className="h-full">
      <div className="h-[calc(100vh-12rem)] bg-white rounded-lg shadow-sm">
        <TurbidityMap
          sensors={sensors}
          selectedSensor={selectedSensor}
          onSensorSelect={handleSensorSelect}
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