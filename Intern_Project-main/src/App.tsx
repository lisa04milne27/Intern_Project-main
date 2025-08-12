import React, { useState } from 'react';
import { Droplets, BarChart3, Map, Radio, Download } from 'lucide-react';
import { useSensorData } from './hooks/useSensorData';
import { Dashboard } from './components/Dashboard';
import { MapView } from './components/MapView';
import { SensorsView } from './components/SensorsView';
import { ExportTab } from './components/ExportTab';
import { InfoPage } from './components/InfoPage';
import { DashboardStats } from './components/DashboardStats';

type ActiveTab = 'dashboard' | 'map' | 'sensors' | 'export' | 'info';

const navigationItems = [
  { id: 'dashboard' as const, label: 'Dashboard', icon: BarChart3 },
  { id: 'map' as const, label: 'Map', icon: Map },
  { id: 'sensors' as const, label: 'Sensors', icon: Radio },
  { id: 'export' as const, label: 'Export', icon: Download },
  {
    id: 'info' as const,
    label: 'Info',
    icon: () => (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
  },
];

function App() {
  const { sensors, isLoading, refreshData } = useSensorData();
  const [activeTab, setActiveTab] = useState<ActiveTab>('dashboard');

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard sensors={sensors} />;
      case 'map':
        return (
          <div className="space-y-6">
            <DashboardStats sensors={sensors} />
            <MapView sensors={sensors} />
          </div>
        );
      case 'sensors':
        return <SensorsView sensors={sensors} />;
      case 'export':
        return <ExportTab sensors={sensors} />;
      case 'info':
        return <InfoPage />;
      default:
        return <Dashboard sensors={sensors} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Left Sidebar */}
      <div className="w-64 bg-slate-700 text-white flex flex-col">
        {/* Logo/Brand */}
        <div className="p-6 border-b border-slate-600">
          <div className="flex items-center gap-3">
            <Droplets className="w-8 h-8 text-blue-400" />
            <h1 className="text-2xl font-bold text-blue-400">AMAZI</h1>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            {navigationItems.map((item) => (
              <li key={item.id}>
                <button
                  className={`flex items-center gap-3 w-full px-3 py-2 rounded-md text-left transition-colors ${
                    activeTab === item.id
                      ? 'bg-blue-500 text-white'
                      : 'hover:bg-slate-600'
                  }`}
                  onClick={() => setActiveTab(item.id)}
                >
                  <item.icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white shadow-sm border-b px-6 py-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-800">
              {navigationItems.find((item) => item.id === activeTab)?.label}
            </h2>
            <button
              onClick={refreshData}
              disabled={isLoading}
              className="flex items-center gap-2 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
            >
              {isLoading ? (
                <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8z"
                  />
                </svg>
              ) : (
                <span>Refresh</span>
              )}
            </button>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 p-6">{renderContent()}</main>
      </div>
    </div>
  );
}

export default App;