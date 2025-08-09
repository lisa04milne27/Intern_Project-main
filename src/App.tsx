@@ .. @@
 import { TurbidityMap } from './components/TurbidityMap';
 import { SensorCard } from './components/SensorCard';
 import { DashboardStats } from './components/DashboardStats';
+import { ExportTab } from './components/ExportTab';
 import { SensorDetailModal } from './components/SensorDetailModal';
 import { useSensorData } from './hooks/useSensorData';
 import { TurbiditySensor } from './types/sensor';
-import { Droplets, RefreshCw, Menu, X } from 'lucide-react';
+import { Droplets, RefreshCw, Menu, X, BarChart3, Download } from 'lucide-react';

 function App() {
   const { sensors, isLoading, refreshData } = useSensorData();
   const [selectedSensor, setSelectedSensor] = useState<TurbiditySensor | null>(null);
   const [detailModalSensor, setDetailModalSensor] = useState<TurbiditySensor | null>(null);
   const [sidebarOpen, setSidebarOpen] = useState(false);
+  const [activeTab, setActiveTab] = useState<'sensors' | 'export'>('sensors');

   const handleSensorSelect = (sensor: TurbiditySensor) => {
@@ .. @@
         `}>
           <div className="p-4 flex-1 overflow-y-auto">
             <DashboardStats sensors={sensors} />
             
-            <div className="space-y-3">
-              <h3 className="font-semibold text-gray-800 text-sm mb-3">
-                Sensor Locations ({sensors.length})
-              </h3>
-              
-              {sensors.map((sensor) => (
-                <SensorCard
-                  key={sensor.id}
-                  sensor={sensor}
-                  onSelect={handleSensorSelect}
-                  isSelected={selectedSensor?.id === sensor.id}
-                />
-              ))}
+            {/* Tab Navigation */}
+            <div className="flex bg-gray-100 rounded-lg p-1 mb-4">
+              <button
+                onClick={() => setActiveTab('sensors')}
+                className={\`flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
+                  activeTab === 'sensors'
+                    ? 'bg-white text-blue-600 shadow-sm'
+                    : 'text-gray-600 hover:text-gray-800'
+                }`}
+              >
+                <BarChart3 className="w-4 h-4" />
+                Sensors
+              </button>
+              <button
+                onClick={() => setActiveTab('export')}
+                className={`flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
+                  activeTab === 'export'
+                    ? 'bg-white text-blue-600 shadow-sm'
+                    : 'text-gray-600 hover:text-gray-800'
+                }`}
+              >
+                <Download className="w-4 h-4" />
+                Export
+              </button>
             </div>
+            
+            {/* Tab Content */}
+            {activeTab === 'sensors' ? (
+              <div className="space-y-3">
+                <h3 className="font-semibold text-gray-800 text-sm mb-3">
+                  Sensor Locations ({sensors.length})
+                </h3>
+                
+                {sensors.map((sensor) => (
+                  <SensorCard
+                    key={sensor.id}
+                    sensor={sensor}
+                    onSelect={handleSensorSelect}
+                    isSelected={selectedSensor?.id === sensor.id}
+                  />
+                ))}
+              </div>
+            ) : (
+              <ExportTab sensors={sensors} />
+            )}
           </div>
         </div>