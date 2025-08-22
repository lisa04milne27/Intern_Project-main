import { useState, useEffect } from 'react';
import { TurbiditySensor } from '../types/sensor';
import { mockSensors } from '../data/mockSensors';

export const useSensorData = () => {
  const [sensors, setSensors] = useState<TurbiditySensor[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  
  // Always use the latest mockSensors data on mount
  useEffect(() => {
    setSensors(mockSensors);
    const interval = setInterval(() => {
      setSensors(currentSensors => 
        currentSensors.map(sensor => {
          // Only update online sensors
          if (sensor.status !== 'online') return sensor;
          // Small random variations in turbidity (±0.5 NTU)
          const turbidityChange = (Math.random() - 0.5) * 1;
          const newTurbidity = Math.max(0, sensor.turbidity + turbidityChange);
          // Small temperature variations (±0.2°C)
          const tempChange = (Math.random() - 0.5) * 0.4;
          const newTemperature = sensor.waterTemperature + tempChange;
          return {
            ...sensor,
            turbidity: Math.round(newTurbidity * 10) / 10,
            waterTemperature: Math.round(newTemperature * 10) / 10,
            lastUpdated: new Date(),
          };
        })
      );
    }, 5000); // Update every 5 seconds
    return () => clearInterval(interval);
  }, []);
  
  const refreshData = async () => {
    setIsLoading(true);
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsLoading(false);
  };
  
  return {
    sensors,
    isLoading,
    refreshData,
  };
};