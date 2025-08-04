import { TurbiditySensor } from '../types/sensor';

export const mockSensors: TurbiditySensor[] = [
  {
    id: 'sensor-001',
    name: 'Cambridge City Centre',
    location: { lat: 52.2053, lng: 0.1218 },
    turbidity: 2.3,
    status: 'online',
    lastUpdated: new Date(),
    batteryLevel: 87,
    waterTemperature: 18.5,
  },
  {
    id: 'sensor-002',
    name: 'Chesterton',
    location: { lat: 52.2185, lng: 0.1414 },
    turbidity: 15.7,
    status: 'online',
    lastUpdated: new Date(Date.now() - 300000),
    batteryLevel: 64,
    waterTemperature: 19.2,
  },
  {
    id: 'sensor-003',
    name: 'Grantchester',
    location: { lat: 52.1860, lng: 0.1030 },
    turbidity: 45.2,
    status: 'online',
    lastUpdated: new Date(Date.now() - 120000),
    batteryLevel: 92,
    waterTemperature: 17.8,
  },
];
