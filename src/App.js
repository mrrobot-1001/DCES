import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import ScanPage from './pages/ScanPage';
import DatabasePage from './pages/DatabasePage'; // Import the DatabasePage

function App() {
  return (
    <Router>
      <div className="App min-h-screen bg-cover bg-center flex flex-col">
        <Navbar />
        <div className="flex-1 flex flex-col items-center justify-center px-4">
          {/* Welcome message section */}
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-800 mb-4 text-center drop-shadow-lg">
            Welcome to the DCES
          </h2>
          <p className="text-lg sm:text-xl md:text-2xl text-gray-700 text-center max-w-2xl mb-8">
            Your gateway to an efficient and organized entry system for Disha College. Scan QR codes and manage student data with ease!
          </p>
        </div>
        <Routes>
          <Route path="/scan" element={<ScanPage />} />
          <Route path="/database" element={<DatabasePage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
