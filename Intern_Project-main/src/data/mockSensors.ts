import type { TurbiditySensor } from '../types/sensor.ts';

export const mockSensors: TurbiditySensor[] = [
  {
    id: 'sensor-010',
    name: 'Sensor 10',
    location: { lat: 52.212594, lng: 0.120016 }, // User provided point
    turbidity: 52,
    status: 'online',
    lastUpdated: new Date(),
    waterTemperature: 17.6,
  },
  {
    id: 'sensor-009',
    name: 'Sensor 9',
    location: { lat: 52.193370, lng: 0.113725 }, // User provided point
    turbidity: 49,
    status: 'online',
    lastUpdated: new Date(),
    waterTemperature: 16.9,
  },
  {
    id: 'sensor-008',
    name: 'Sensor 8',
    location: { lat: 52.206431, lng: 0.113938 }, // User provided point
    turbidity: 53,
    status: 'offline',
    lastUpdated: new Date(),
    waterTemperature: 17.4,
  },
  {
    id: 'sensor-007',
    name: 'Sensor 7',
    location: { lat: 52.201783, lng: 0.115586 }, // User provided point
    turbidity: 47,
    status: 'offline',
    lastUpdated: new Date(),
    waterTemperature: 17.0,
  },
  {
    id: 'sensor-006',
    name: 'Sensor 6',
    location: { lat: 52.211626, lng: 0.129384 }, // User provided point
    turbidity: 50,
    status: 'maintenance',
    lastUpdated: new Date(),
    waterTemperature: 17.8,
  },
  {
    id: 'sensor-001',
    name: 'Sensor 1',
    location: { lat: 52.190591, lng: 0.104566 }, // User provided point
    turbidity: 60,
    status: 'online',
    lastUpdated: new Date(),
    waterTemperature: 18.5,
  },
  {
    id: 'sensor-002',
    name: 'Sensor 2',
    location: { lat: 52.181721, lng: 0.098732 }, // User provided point
    turbidity: 45,
    status: 'offline',
    lastUpdated: new Date(),
    waterTemperature: 17.2,
  },
  {
    id: 'sensor-003',
    name: 'Sensor 3',
    location: { lat: 52.2082, lng: 0.1157 }, // River Cam at St John's College
    turbidity: 72,
    status: 'maintenance',
    lastUpdated: new Date(),
    waterTemperature: 19.0,
  },
  {
    id: 'sensor-004',
    name: 'Sensor 4',
    location: { lat: 52.220000, lng: 0.155244 }, // User provided point
    turbidity: 55,
    status: 'online',
    lastUpdated: new Date(),
    waterTemperature: 16.8,
  },
  {
    id: 'sensor-005',
    name: 'Sensor 5',
    location: { lat: 52.212892, lng: 0.142584 }, // User provided point
    turbidity: 38,
    status: 'online',
    lastUpdated: new Date(),
    waterTemperature: 18.0,
  },
];