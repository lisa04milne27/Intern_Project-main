import React, { useState } from 'react';
import { TurbidityMap } from './components/TurbidityMap';
import { SensorCard } from './components/SensorCard';
import { DashboardStats } from './components/DashboardStats';
import { ExportTab } from './components/ExportTab';
import { SensorDetailModal } from './components/SensorDetailModal';
import { useSensorData } from './hooks/useSensorData';
import { TurbiditySensor } from './types/sensor';
import { Droplets, RefreshCw, Menu, X, BarChart3, Download } from 'lucide-react';

function App() {
  const { sensors, isLoading, refreshData } = useSensorData();
  const [selectedSensor, setSelectedSensor] = useState<TurbiditySensor | null>(null);
  const [detailModalSensor, setDetailModalSensor] = useState<TurbiditySensor | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'sensors' | 'export'>('sensors');

  const handleSensorSelect = (sensor: TurbiditySensor) => {
    setSelectedSensor(sensor);
    setDetailModalSensor(sensor);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <Droplets className="w-8 h-8 text-blue-600" />
              <div>
                <h1 className="text-xl font-bold text-gray-900">TurbidityWatch</h1>
                <p className="text-sm text-gray-500">Water Quality Monitoring Dashboard</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={refreshData}
                disabled={isLoading}
                className="flex items-center gap-2 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
              >
                <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
                <span className="hidden sm:inline">Refresh</span>
              </button>

              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="lg:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
              >
                {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex h-[calc(100vh-4rem)]">
        {/* Sidebar */}
        <div className={`
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
          fixed lg:relative inset-y-0 left-0 z-30 w-80 bg-white shadow-lg border-r
          transition-transform duration-300 ease-in-out lg:transition-none
          flex flex-col
        `}>
          <div className="p-4 flex-1 overflow-y-auto">
            <DashboardStats sensors={sensors} />

            {/* Tab Navigation */}
            <div className="flex bg-gray-100 rounded-lg p-1 mb-4">
              <button
                onClick={() => setActiveTab('sensors')}
                className={`flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeTab === 'sensors'
                    ? 'bg-white text-blue-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                <BarChart3 className="w-4 h-4" />
                Sensors
              </button>
              <button
                onClick={() => setActiveTab('export')}
                className={`flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeTab === 'export'
                    ? 'bg-white text-blue-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                <Download className="w-4 h-4" />
                Export
              </button>
            </div>

            {/* Tab Content */}
            {activeTab === 'sensors' ? (
              <div className="space-y-3">
                <h3 className="font-semibold text-gray-800 text-sm mb-3">
                  Sensor Locations ({sensors.length})
                </h3>

                {sensors.map((sensor) => (
                  <SensorCard
                    key={sensor.id}
                    sensor={sensor}
                    onSelect={handleSensorSelect}
                    isSelected={selectedSensor?.id === sensor.id}
                  />
                ))}
              </div>
            ) : (
              <ExportTab sensors={sensors} />
            )}
          </div>
        </div>

        {/* Overlay for mobile sidebar */}
        {sidebarOpen && (
          <div 
            className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-20"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Main Content - Map */}
        <div className="flex-1 p-4">
          <div className="h-full bg-white rounded-lg shadow-sm">
            <TurbidityMap
              sensors={sensors}
              selectedSensor={selectedSensor}
              onSensorSelect={handleSensorSelect}
            />
          </div>
        </div>
      </div>

      {/* Sensor Detail Modal */}
      <SensorDetailModal
        sensor={detailModalSensor}
        onClose={() => setDetailModalSensor(null)}
      />
    </div>
  );
}

export default App;
