import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Header from './components/Header';
import IndicatorCard from './components/IndicatorCard';
import SummaryCard from './components/SummaryCard';

function App() {
  // Use useState to manage the dynamic data for the indicators
  const [indicators, setIndicators] = useState([
    { id: 1, icon: '💧', title: 'Moisture', subtitle: 'Soil Water Content', value: 72, unit: '%', status: 'Optimal', statusColor: 'green', progressWidth: 72, target: '60-80%', colorName: 'blue', base: 72, range: 5 },
    { id: 2, icon: '🌿', title: 'Nitrogen', subtitle: 'N Content (ppm)', value: 45, unit: ' ppm', status: 'Low', statusColor: 'yellow', progressWidth: 45, target: '50-100 ppm', colorName: 'green', base: 45, range: 3 },
    { id: 3, icon: '⚡', title: 'Potassium', subtitle: 'K Content (ppm)', value: 180, unit: ' ppm', status: 'Good', statusColor: 'green', progressWidth: 85, target: '150-250 ppm', colorName: 'purple', base: 180, range: 8 },
    { id: 4, icon: '🦴', title: 'Calcium', subtitle: 'Ca Content (ppm)', value: 320, unit: ' ppm', status: 'Excellent', statusColor: 'green', progressWidth: 90, target: '200-400 ppm', colorName: 'orange', base: 320, range: 10 },
  ]);

  // Use useEffect to simulate real-time data updates
  useEffect(() => {
    const interval = setInterval(() => {
      setIndicators(prevIndicators => 
        prevIndicators.map(indicator => {
          const variation = (Math.random() - 0.5) * indicator.range;
          const newValue = Math.round(indicator.base + variation);
          return { ...indicator, value: newValue };
        })
      );
    }, 5000); // Update every 5 seconds

    // Cleanup function to clear the interval when the component unmounts
    return () => clearInterval(interval);
  }, []); // Empty dependency array ensures this effect runs only once on mount

  return (
    <div className="bg-gradient-to-br from-slate-50 to-blue-50 min-h-screen">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Header />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {indicators.map(indicator => (
            <IndicatorCard 
              key={indicator.id}
              icon={indicator.icon}
              title={indicator.title}
              subtitle={indicator.subtitle}
              value={indicator.value}
              unit={indicator.unit}
              status={indicator.status}
              statusColor={indicator.statusColor}
              progressWidth={indicator.progressWidth}
              target={indicator.target}
              colorName={indicator.colorName}
            />
          ))}
        </div>
        <SummaryCard />
      </main>
    </div>
  );
}

export default App;