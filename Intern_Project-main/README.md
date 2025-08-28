# River Quality Monitoring Dashboard

## Overview

This project is a full-stack IoT solution for real-time river water quality monitoring. It combines Arduino LoRaWAN sensors, The Things Stack network server, a Node.js/Express backend, and a modern React dashboard to visualise and manage environmental data.

## Features

- **Dashboard:** View live sensor statistics, including online/offline status, average and highest turbidity, and highest temperature with location.
- **Interactive Map:** Visualise sensor locations and historical turbidity readings using Leaflet.
- **Sensor Management:** Inspect detailed sensor data and status.
- **Export Data:** Download sensor data as CSV or JSON for further analysis.
- **TTN Integration:** Receives real-time data from Arduino LoRa devices via The Things Stack webhook.
- **Historical Data Visualization:** Explore historical turbidity trends and readings.
- **Responsive UI:** Built with React and Tailwind CSS for a modern, adaptive experience.

## Architecture

- **Hardware:** Arduino LoRaWAN modules collect turbidity and temperature data.
- **Network:** Data is transmitted via LoRaWAN to The Things Stack.
- **Backend:** Express.js server receives webhook uplinks, stores the latest payloads, and exposes REST endpoints.
- **Frontend:** React app displays live and historical data, sensor status, and interactive maps.

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- npm
- [ngrok](https://ngrok.com/), [localtunnel](https://localtunnel.github.io/www/), or [cloudflared](https://developers.cloudflare.com/cloudflare-one/connections/connect-apps/install-and-setup/tunnel-guide/local/) for tunneling webhook traffic
- The Things Stack Sandbox account
(Intern Group 2025 account can be found at... 
Username: internttp2025@gmail.com
Password: S3Lr4LYAUP9q::R)

### Installation

1. **Clone the repository:**
   ```sh
   git clone <repo-url>
   cd Intern_Project-main
   ```

2. **Install dependencies:**
   ```sh
   npm install
   ```

3. **Start the Express backend:**
   ```sh
   node src/server/express.js
   ```

4. **Expose your backend for TTN webhooks (choose one):**
   - **ngrok:** `ngrok http 3001`
   - **localtunnel:** `npx localtunnel --port 3001`
   - **cloudflared:** `cloudflared tunnel --url http://localhost:3001`

5. **Configure The Things Stack webhook:**
   - Set the webhook URL to your tunnel’s public URL + `/api/ttn`
   - Example: `https://your-tunnel-url/api/ttn`

6. **Start the React frontend:**
   ```sh
   npm run dev
   ```

7. **Access the dashboard:**
   - Visit `http://localhost:5173` in your browser.

## Simulating Uplinks

- Use the TTN Console’s "Simulate Uplink" feature or run the provided `simulateUplinks.ts` script to send mock sensor data to your webhook endpoint.

## Project Structure

```
Intern_Project-main/
├── src/
│   ├── components/      # React components
│   ├── data/            # Mock data and utilities
│   ├── hooks/           # Custom React hooks
│   ├── server/          # Express backend and simulation scripts
│   ├── types/           # TypeScript interfaces
│   ├── utils/           # Utility functions
│   ├── App.tsx          # Main React app
│   └── main.tsx         # React entry point
├── public/              # Static assets
├── package.json
├── README.md
└── ...
```

## Customisation

- Add new sensors in `src/data/mockSensors.ts`.
- Adjust map settings and UI in `src/components/`.
- Extend backend logic in `src/server/express.js`.

## Troubleshooting

- **Webhook not receiving data:** Ensure your tunnel is running and the webhook URL is correct.
- **Import errors:** Use correct file extensions and check TypeScript configuration.
- **Tunnel issues:** Try a different tunneling service if one is blocked.

## License

This project is for educational and demonstration purposes.

---

**Contact:**  
For questions or support, please contact the project author (Emily Kanagasabay, TTP Intern Group 2025).