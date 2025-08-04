export interface TurbiditySensor {
  id: string;
  name: string;
  location: {
    lat: number;
    lng: number;
  };
  turbidity: number; // NTU (Nephelometric Turbidity Units)
  status: 'online' | 'offline' | 'maintenance';
  lastUpdated: Date;
  batteryLevel: number;
  waterTemperature: number;
}

export interface SensorReading {
  id: string;
  sensorId: string;
  turbidity: number;
  timestamp: Date;
  waterTemperature: number;
}