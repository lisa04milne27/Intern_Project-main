import React from 'react';
import { Marker, Popup } from 'react-leaflet';
import { Icon } from 'leaflet';
import { TurbiditySensor } from '../../types/sensor';
import { format } from 'date-fns';

interface HistoricalMarkerProps {
  reading: {
    id: string;
    timestamp: Date;
    turbidity: number;
    location: {
      lat: number;
      lng: number;
    };
    sensorId: string;
  };
  onReadingClick?: (reading: any) => void;
}

// Create custom icon for historical data points
const createHistoricalIcon = (turbidity: number) => {
  const getColor = (value: number) => {
    if (value < 1) return '#10B981'; // Green - excellent
    if (value < 5) return '#F59E0B'; // Yellow - moderate
    if (value < 10) return '#F97316'; // Orange - poor
    return '#EF4444'; // Red - very poor
  };

  const color = getColor(turbidity);
  
  return new Icon({
    iconUrl: `data:image/svg+xml;base64,${btoa(`
      <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="10" fill="${color}" stroke="white" stroke-width="2" opacity="0.8"/>
        <circle cx="12" cy="12" r="4" fill="white" opacity="0.9"/>
        <text x="12" y="16" text-anchor="middle" fill="${color}" font-size="8" font-weight="bold">H</text>
      </svg>
    `)}`,
    iconSize: [24, 24],
    iconAnchor: [12, 12],
    popupAnchor: [0, -12],
  });
};

export const HistoricalMarker: React.FC<HistoricalMarkerProps> = ({
  reading,
  onReadingClick,
}) => {
  const historicalIcon = createHistoricalIcon(reading.turbidity);

  const getTurbidityLevel = (value: number) => {
    if (value < 1) return 'Excellent';
    if (value < 5) return 'Moderate';
    if (value < 10) return 'Poor';
    return 'Very Poor';
  };

  return (
    <Marker
      position={[reading.location.lat, reading.location.lng]}
      icon={historicalIcon}
      eventHandlers={{
        click: () => onReadingClick?.(reading),
      }}
    >
      <Popup>
        <div className="p-2 min-w-[200px]">
          <h4 className="font-bold text-sm mb-2 text-gray-800">
            Historical Reading
          </h4>
          <div className="space-y-1 text-xs">
            <div className="flex justify-between">
              <span className="text-gray-600">Date:</span>
              <span className="font-medium">
                {format(reading.timestamp, 'MMM dd, yyyy')}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Time:</span>
              <span className="font-medium">
                {format(reading.timestamp, 'HH:mm')}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Turbidity:</span>
              <span className="font-medium">{reading.turbidity.toFixed(1)} NTU</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Quality:</span>
              <span className="font-medium text-xs px-2 py-1 rounded" 
                    style={{ 
                      backgroundColor: createHistoricalIcon(reading.turbidity).options.iconUrl?.includes('#10B981') ? '#10B981' :
                                     createHistoricalIcon(reading.turbidity).options.iconUrl?.includes('#F59E0B') ? '#F59E0B' :
                                     createHistoricalIcon(reading.turbidity).options.iconUrl?.includes('#F97316') ? '#F97316' : '#EF4444',
                      color: 'white'
                    }}>
                {getTurbidityLevel(reading.turbidity)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Sensor ID:</span>
              <span className="font-medium">{reading.sensorId}</span>
            </div>
          </div>
        </div>
      </Popup>
    </Marker>
  );
};