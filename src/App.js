// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage'; // Import the HomePage component
import ScanPage from './pages/ScanPage';
import DatabasePage from './pages/DatabasePage';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          {/* Home page route */}
          <Route path="/" element={<HomePage />} />
          {/* Other routes */}
          <Route path="/scan" element={<ScanPage />} />
          <Route path="/database" element={<DatabasePage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
