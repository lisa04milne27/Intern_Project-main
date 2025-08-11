import { TurbiditySensor } from '../types/sensor';

export const mockSensors: TurbiditySensor[] = [
  {
    id: 'sensor-001',
    name: 'Current Location',
    location: { lat: 52.2082383, lng: 0.1157702 },
    turbidity: 57,
    status: 'online',
    lastUpdated: new Date(),
    batteryLevel: 87,
    waterTemperature: 18.5,
  },

  
];
