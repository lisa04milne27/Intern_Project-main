import React, { useState } from 'react';
import { Dashboard } from './components/Dashboard';
import { MapView } from './components/MapView';
import { SensorsView } from './components/SensorsView';
import { useSensorData } from './hooks/useSensorData';
import { Droplets, RefreshCw, BarChart3, Map, Radio } from 'lucide-react';

type ActiveTab = 'dashboard' | 'map' | 'sensors';

function App() {
  const { sensors, isLoading, refreshData } = useSensorData();
  const [activeTab, setActiveTab] = useState<ActiveTab>('dashboard');

  const navigationItems = [
    { id: 'dashboard' as const, label: 'Dashboard', icon: BarChart3 },
    { id: 'map' as const, label: 'Map', icon: Map },
    { id: 'sensors' as const, label: 'Sensors', icon: Radio },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard sensors={sensors} />;
      case 'map':
        return <MapView sensors={sensors} />;
      case 'sensors':
        return <SensorsView sensors={sensors} />;
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
            {navigationItems.map((item) => {
              const Icon = item.icon;
              return (
                <li key={item.id}>
                  <button
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
                      activeTab === item.id
                        ? 'bg-slate-600 text-white'
                        : 'text-slate-300 hover:bg-slate-600 hover:text-white'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    {item.label}
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white shadow-sm border-b px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-semibold text-gray-800 capitalize">
                {activeTab}
              </h2>
            </div>
            <button
              onClick={refreshData}
              disabled={isLoading}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
            >
              <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
              Refresh
            </button>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 p-6">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}

export default App;