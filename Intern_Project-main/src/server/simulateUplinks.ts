import fetch from 'node-fetch';
import { mockSensors } from '../data/mockSensors.ts';

const webhookUrl = 'http://localhost:3001/api/ttn';
mockSensors.forEach(sensor => {
  const payload = {
    end_device_ids: {
      device_id: sensor.id,
      application_ids: {
        application_id: 'river-quality-tracker'
      }
    },
    uplink_message: {
      f_port: 1,
      frm_payload: 'AA==',
      decoded_payload: {
        turbidity: sensor.turbidity,
        temperature: sensor.waterTemperature
      },
      rx_metadata: [],
      settings: {},
      received_at: new Date().toISOString()
    }
  };

  fetch(webhookUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  })
    .then(res => console.log(`Sent uplink for ${sensor.id}: ${res.status}`))
    .catch(err => console.error(`Error sending uplink for ${sensor.id}:`, err));
});