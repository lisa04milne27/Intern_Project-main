import { TurbiditySensor } from '../types/sensor';

export const mockSensors: TurbiditySensor[] = [
  {
    id: 'sensor-001',
    name: 'Sensor 1',
    location: { lat: 52.2082383, lng: 0.1157702 },
    turbidity: 12.5,
    status: 'online',
    lastUpdated: new Date(Date.now() - 5 * 60 * 1000), // 5 minutes ago
    batteryLevel: 87,
    waterTemperature: 18.5,
  },
  {
    id: 'sensor-002',
    name: 'Sensor 2',
    location: { lat: 52.2053, lng: 0.1192 },
    turbidity: 8.2,
    status: 'online',
    lastUpdated: new Date(Date.now() - 10 * 60 * 1000), // 10 minutes ago
    batteryLevel: 92,
    waterTemperature: 19.1,
  },
  {
    id: 'sensor-003',
    name: 'Sensor 3',
    location: { lat: 52.2100, lng: 0.1250 },
    turbidity: 15.7,
    status: 'online',
    lastUpdated: new Date(Date.now() - 15 * 60 * 1000), // 15 minutes ago
    batteryLevel: 78,
    waterTemperature: 17.8,
  },
  {
    id: 'sensor-004',
    name: 'Sensor 4',
    location: { lat: 52.2020, lng: 0.1100 },
    turbidity: 22.3,
    status: 'online',
    lastUpdated: new Date(Date.now() - 20 * 60 * 1000), // 20 minutes ago
    batteryLevel: 65,
    waterTemperature: 18.9,
  },
  {
    id: 'sensor-005',
    name: 'Sensor 5',
    location: { lat: 52.2150, lng: 0.1300 },
    turbidity: 6.1,
    status: 'online',
    lastUpdated: new Date(Date.now() - 25 * 60 * 1000), // 25 minutes ago
    batteryLevel: 89,
    waterTemperature: 19.5,
  },
  {
    id: 'sensor-006',
    name: 'Sensor 6',
    location: { lat: 52.2000, lng: 0.1050 },
    turbidity: 45.8,
    status: 'offline',
    lastUpdated: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
    batteryLevel: 23,
    waterTemperature: 16.2,
  },
  {
    id: 'sensor-007',
    name: 'Sensor 7',
    location: { lat: 52.2180, lng: 0.1350 },
    turbidity: 38.9,
    status: 'offline',
    lastUpdated: new Date(Date.now() - 3 * 60 * 60 * 1000), // 3 hours ago
    batteryLevel: 12,
    waterTemperature: 15.7,
  },
  {
    id: 'sensor-008',
    name: 'Sensor 8',
    location: { lat: 52.2070, lng: 0.1180 },
    turbidity: 11.4,
    status: 'online',
    lastUpdated: new Date(Date.now() - 8 * 60 * 1000), // 8 minutes ago
    batteryLevel: 94,
    waterTemperature: 18.3,
  },
  {
    id: 'sensor-009',
    name: 'Sensor 9',
    location: { lat: 52.2130, lng: 0.1280 },
    turbidity: 9.7,
    status: 'online',
    lastUpdated: new Date(Date.now() - 12 * 60 * 1000), // 12 minutes ago
    batteryLevel: 81,
    waterTemperature: 19.8,
  },
];