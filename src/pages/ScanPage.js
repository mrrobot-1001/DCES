import React, { useState, useEffect } from 'react';
import { QrReader } from 'react-qr-reader';

const ScanPage = () => {
  const [qrData, setQrData] = useState(null);
  const [isScanned, setIsScanned] = useState(false);
  const [totalScanned, setTotalScanned] = useState(0);

  useEffect(() => {
    // Cleanup function to stop the camera stream when component is unmounted
    return () => {
      const videoElement = document.querySelector('video');
      if (videoElement && videoElement.srcObject) {
        const stream = videoElement.srcObject;
        const tracks = stream.getTracks();
        tracks.forEach((track) => track.stop()); // Stop each track
      }
    };
  }, []); // Runs only on unmount

  // Function to handle QR code scan
  const handleScan = (data) => {
    if (data) {
      setQrData(data);
      setIsScanned(true);
      setTotalScanned(totalScanned + 1);

      // Simulate checking if QR code has already been scanned
      // In the real app, you'd make an API call here to verify with the backend
      const alreadyScanned = Math.random() < 0.5; // Randomly simulate already scanned status
      if (alreadyScanned) {
        alert('This QR code has already been scanned!');
      } else {
        alert('QR code scanned successfully!');
      }
    }
  };

  // Function to handle scan errors
  const handleError = (err) => {
    console.error(err);
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl text-center mb-6">QR Code Scanner</h2>
      <div className="flex flex-col items-center">
        <div className="w-full max-w-md">
          <QrReader
            constraints={{ facingMode: 'environment' }} // Ensures the back camera is used
            onResult={(result, error) => {
              if (!!result) {
                handleScan(result?.text);
              }

              if (!!error) {
                handleError(error);
              }
            }}
            style={{ width: '100%' }}
          />
        </div>
        <div className="mt-4">
          <h3 className="text-lg">Scanned QR Data: {qrData ? qrData : 'No QR code scanned yet'}</h3>
          <h3 className="text-lg">Total QR Codes Scanned: {totalScanned}</h3>
        </div>
      </div>
    </div>
  );
};

export default ScanPage;
