import { TurbiditySensor } from '../types/sensor';

export interface mockHistoricalReadings {
  id: string;
  timestamp: Date;
  turbidity: number;
  location: {
    lat: number;
    lng: number;
  };
  sensorId: string;
}

// Generate mock historical data for each sensor
export const mockHistoricalData: mockHistoricalReadings[] = [
  {
    id: 'hist-1',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 1),
    turbidity: 45.2,
    location: { lat: 52.2053, lng: 0.1192 },
    sensorId: 'sensor-1',
  },
  {
    id: 'hist-2',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
    turbidity: 50.1,
    location: { lat: 52.2100, lng: 0.1200 },
    sensorId: 'sensor-1',
  },
  {
    id: 'hist-3',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 1),
    turbidity: 38.7,
    location: { lat: 52.2200, lng: 0.1300 },
    sensorId: 'sensor-2',
  },
  {
    id: 'hist-4',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
    turbidity: 42.3,
    location: { lat: 52.2250, lng: 0.1350 },
    sensorId: 'sensor-2',
  },
];