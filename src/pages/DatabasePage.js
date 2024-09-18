// src/pages/DatabasePage.js
import React from 'react';

const DatabasePage = () => {
  // Simulate some example stream data
  const streams = [
    { name: 'BBA', id: 'bba' },
    { name: 'BCA', id: 'bca' },
    { name: 'BCom', id: 'bcom' },
    { name: 'BSc', id: 'bsc' },
    { name: 'BA', id: 'ba' },
  ];

  const handleViewData = (streamId) => {
    alert(`View data for ${streamId}`);
    // This function should call an API to fetch data from the database for the selected stream
  };

  const handleUploadData = (streamId) => {
    alert(`Upload data for ${streamId}`);
    // This function should allow file upload (Excel/CSV) and update the database
  };

  const handleSendQR = (streamId) => {
    alert(`Send QR codes for ${streamId}`);
    // This function should trigger QR code generation and send them via WhatsApp
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl text-center mb-6">Manage Student Data</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {streams.map((stream) => (
          <div key={stream.id} className="bg-white shadow-md rounded-lg p-4 text-center">
            <h3 className="text-lg font-bold mb-4">{stream.name}</h3>
            <div className="flex flex-col gap-2">
              <button
                onClick={() => handleViewData(stream.id)}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                View Data
              </button>
              <button
                onClick={() => handleUploadData(stream.id)}
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
              >
                Upload Data
              </button>
              <button
                onClick={() => handleSendQR(stream.id)}
                className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600"
              >
                Send QR Codes
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DatabasePage;
