import React, { useState } from 'react';
import { TurbiditySensor } from '../types/sensor';
import { Download, FileText } from 'lucide-react';

interface ExportTabProps {
  sensors: TurbiditySensor[];
}

export const ExportTab: React.FC<ExportTabProps> = ({ sensors }) => {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [exportMessage, setExportMessage] = useState<string | null>(null);

  const toggleSensor = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((sid) => sid !== id) : [...prev, id]
    );
  };

  const selectAll = () => setSelectedIds(sensors.map((s) => s.id));
  const deselectAll = () => setSelectedIds([]);

  // Order sensors by numeric part of id (sensor 1 to 10)
  const orderedSensors = [...sensors].sort((a, b) => {
    const numA = parseInt(a.id.replace(/[^\d]/g, ''));
    const numB = parseInt(b.id.replace(/[^\d]/g, ''));
    return numA - numB;
  });
  const selectedSensors = orderedSensors.filter((s) => selectedIds.includes(s.id));

  const exportToCSV = () => {
    try {
      if (selectedSensors.length === 0) {
        setExportMessage('No sensors selected for export.');
        return;
      }
      const headers = [
        'Name',
        'Status',
        'Last Updated',
        'Longitude',
        'Latitude',
        'Temperature (°C)',
        'Turbidity (NTU)'
      ];
      const csvData = selectedSensors.map(sensor => [
        sensor.name,
        sensor.status,
        sensor.lastUpdated.toLocaleDateString('en-GB'),
        sensor.location.lng.toString(),
        sensor.location.lat.toString(),
        sensor.waterTemperature.toString(),
        sensor.turbidity.toString()
      ]);
      const csvContent = [headers, ...csvData]
        .map(row => row.map(field => `"${field}"`).join(','))
        .join('\n');
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      // @ts-ignore: msSaveOrOpenBlob is for IE
      if (window.navigator && (window.navigator as any).msSaveOrOpenBlob) {
        // For IE
        (window.navigator as any).msSaveOrOpenBlob(blob, `turbidity-sensors-${new Date().toISOString().split('T')[0]}.csv`);
      } else {
        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', `turbidity-sensors-${new Date().toISOString().split('T')[0]}.csv`);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        setTimeout(() => URL.revokeObjectURL(url), 1000);
      }
      setExportMessage('CSV export successful!');
    } catch (error) {
      setExportMessage('CSV export failed. Please try again.');
    }
    setTimeout(() => setExportMessage(null), 3000);
  };

  const exportToJSON = () => {
    try {
      if (selectedSensors.length === 0) {
        setExportMessage('No sensors selected for export.');
        return;
      }
      const jsonData = {
        exportDate: new Date().toISOString(),
        totalSensors: selectedSensors.length,
        sensors: selectedSensors.map(sensor => ({
          ...sensor,
          lastUpdated: sensor.lastUpdated.toISOString()
        }))
      };
      const blob = new Blob([JSON.stringify(jsonData, null, 2)], {
        type: 'application/json;charset=utf-8;'
      });
      const link = document.createElement('a');
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', `turbidity-sensors-${new Date().toISOString().split('T')[0]}.json`);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setTimeout(() => URL.revokeObjectURL(url), 1000);
      setExportMessage('JSON export successful!');
    } catch (error) {
      setExportMessage('JSON export failed. Please try again.');
    }
    setTimeout(() => setExportMessage(null), 3000);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
        <Download className="w-5 h-5 text-blue-500" />
        Export Sensor Data
      </h3>
      {exportMessage && (
        <div className="mb-2 text-sm text-center text-blue-700 bg-blue-100 rounded p-2">{exportMessage}</div>
      )}
      <div className="flex gap-4 mb-4">
        <button
          onClick={selectAll}
          className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 text-sm"
        >
          Select All
        </button>
        <button
          onClick={deselectAll}
          className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 text-sm"
        >
          Deselect All
        </button>
      </div>
      <div className="flex gap-4 mb-6">
        <button
          onClick={exportToCSV}
          disabled={selectedSensors.length === 0}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50"
        >
          <FileText className="w-4 h-4" />
          Export as CSV
        </button>
        <button
          onClick={exportToJSON}
          disabled={selectedSensors.length === 0}
          className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors disabled:opacity-50"
        >
          <Download className="w-4 h-4" />
          Export as JSON
        </button>
      </div>
      <div className="text-gray-700 text-sm mb-2">
        <strong>{selectedSensors.length}</strong> sensors selected for export.
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-xs">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-3 py-2"></th>
              <th className="px-3 py-2 text-left font-medium text-gray-700">Name</th>
              <th className="px-3 py-2 text-left font-medium text-gray-700">Status</th>
              <th className="px-3 py-2 text-left font-medium text-gray-700">Last Updated</th>
              <th className="px-3 py-2 text-left font-medium text-gray-700">Longitude</th>
              <th className="px-3 py-2 text-left font-medium text-gray-700">Latitude</th>
              <th className="px-3 py-2 text-left font-medium text-gray-700">Temperature (°C)</th>
              <th className="px-3 py-2 text-left font-medium text-gray-700">Turbidity (NTU)</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {orderedSensors.map(sensor => (
              <tr key={sensor.id}>
                <td className="px-3 py-2">
                  <input
                    type="checkbox"
                    checked={selectedIds.includes(sensor.id)}
                    onChange={() => toggleSensor(sensor.id)}
                  />
                </td>
                <td className="px-3 py-2">{sensor.name}</td>
                <td className="px-3 py-2 capitalize">{sensor.status}</td>
                <td className="px-3 py-2">{sensor.lastUpdated.toLocaleDateString('en-GB')}</td>
                <td className="px-3 py-2">{sensor.location.lng}</td>
                <td className="px-3 py-2">{sensor.location.lat}</td>
                <td className="px-3 py-2">{sensor.waterTemperature}</td>
                <td className="px-3 py-2">{sensor.turbidity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {sensors.length === 0 && (
        <div className="text-center py-8 text-gray-500">No sensors to export</div>
      )}
    </div>
  );
}