import mqtt from 'mqtt';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

const client = mqtt.connect(process.env.MQTT_HOST!, {
  username: process.env.MQTT_USERNAME!,
  password: process.env.MQTT_PASSWORD!,
});

client.on('connect', () => {
  console.log('✅ Connected to The Things Stack MQTT');
  client.subscribe('v3/river-water-quality/devices/+/up');
});

client.on('message', (_, message) => {
  const payload = JSON.parse(message.toString());
  const decoded = payload.uplink_message.decoded_payload;

  const updatedSensor = {
    id: 'sensor-001',
    name: 'Current Location',
    location: { lat: decoded.latitude, lng: decoded.longitude },
    turbidity: decoded.turbidity,
    status: 'online',
    lastUpdated: new Date(),
    waterTemperature: decoded.temperature,
  };

  const filePath = path.join(__dirname, 'mockSensors.ts');
  const fileContent = `import { TurbiditySensor } from '../types/sensor';

export const mockSensors: TurbiditySensor[] = [
  ${JSON.stringify(updatedSensor, null, 2)}
];`;

  fs.writeFileSync(filePath, fileContent);
  console.log('📁 mockSensors.ts updated with new data');
});