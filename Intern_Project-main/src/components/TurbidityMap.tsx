import React from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import { TurbiditySensor } from '../types/sensor';
import { SensorMarker } from './SensorMarker';
import { HistoricalMarker } from './HistoricalMarker';
import 'leaflet/dist/leaflet.css';

interface TurbidityMapProps {
  sensors: TurbiditySensor[];
  selectedSensor: TurbiditySensor | null;
  onSensorSelect: (sensor: TurbiditySensor) => void;
  historicalReadings?: Array<{
    id: string;
    timestamp: Date;
    turbidity: number;
    location: {
      lat: number;
      lng: number;
    };
    sensorId: string;
  }>;
  showHistoricalData?: boolean;
  onHistoricalReadingSelect?: (reading: any) => void;
}

export const TurbidityMap: React.FC<TurbidityMapProps> = ({
  sensors,
  selectedSensor,
  onSensorSelect,
  historicalReadings = [],
  showHistoricalData = false,
  onHistoricalReadingSelect,
}) => {
  const center =
    sensors.length > 0
      ? [sensors[0].location.lat, sensors[0].location.lng] as [number, number]
      : [52.2053, 0.1192] as [number, number];

  // Color scale: bright green (lowest) to bright red (highest)
  const sorted = [...sensors].sort((a, b) => a.turbidity - b.turbidity);
  const minTurbidity = sorted[0]?.turbidity ?? 0;
  const maxTurbidity = sorted[sorted.length - 1]?.turbidity ?? 100;
  // Interpolate color to match gradient bar (green → yellow → red)
  function interpolateColor(color1: [number, number, number], color2: [number, number, number], t: number) {
    return `rgb(${Math.round(color1[0] + (color2[0] - color1[0]) * t)},${Math.round(color1[1] + (color2[1] - color1[1]) * t)},${Math.round(color1[2] + (color2[2] - color1[2]) * t)})`;
  }
  const green: [number, number, number] = [16, 185, 129];   // #10B981
  const yellow: [number, number, number] = [250, 204, 21];  // #FACC15
  const red: [number, number, number] = [220, 38, 38];      // #DC2626
  const getColor = (turbidity: number) => {
    if (maxTurbidity === minTurbidity) return 'rgb(16,185,129)';
    const ratio = (turbidity - minTurbidity) / (maxTurbidity - minTurbidity);
    if (ratio <= 0.5) {
      // Green to yellow
      return interpolateColor(green, yellow, ratio * 2);
    } else {
      // Yellow to red
      return interpolateColor(yellow, red, (ratio - 0.5) * 2);
    }
  };
  return (
    <div className="h-full w-full rounded-lg overflow-hidden shadow-lg relative">
      {/* Legend overlay with gradient bar */}
      <div className="absolute top-4 right-4 z-[1000] bg-white bg-opacity-90 rounded shadow px-4 py-3 flex flex-col items-center border border-gray-300 min-w-[220px]">
        <div className="font-semibold mb-2 text-gray-800">Turbidity (NTU)</div>
        <div className="w-40 h-4 rounded-full mb-2 border border-gray-300" style={{
          background: 'linear-gradient(to right, #10B981 0%, #FACC15 50%, #DC2626 100%)'
        }}></div>
        <div className="flex justify-between w-40 text-xs text-gray-600">
          <span>Low<br />{minTurbidity.toFixed(1)}</span>
          <span>Medium</span>
          <span>High<br />{maxTurbidity.toFixed(1)}</span>
        </div>
      </div>
      <MapContainer
        center={center}
        zoom={11}
        style={{ height: '100%', width: '100%' }}
        className="z-0"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {sensors.map((sensor) => (
          <SensorMarker
            key={sensor.id}
            sensor={sensor}
            onSensorClick={onSensorSelect}
            color={getColor(sensor.turbidity)}
          />
        ))}
        {showHistoricalData &&
          historicalReadings.map((reading) => (
            <HistoricalMarker
              key={reading.id}
              reading={reading}
              onReadingClick={onHistoricalReadingSelect}
            />
          ))}
      </MapContainer>
    </div>
  );
}