import React, { useState, useEffect } from 'react';

const DatabasePage = () => {
  const [selectedStream, setSelectedStream] = useState(null);
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const [showUploadForm, setShowUploadForm] = useState(false);
  const [formData, setFormData] = useState({ name: '', phone_number: '' });
  const [loginData, setLoginData] = useState({ username: '', password: '' });
  const [loginError, setLoginError] = useState('');
  const [students, setStudents] = useState([]);
  const [showTable, setShowTable] = useState(false);

  const streams = [
    { name: 'BBA', id: 'bba' },
    { name: 'BCA', id: 'bca' },
    { name: 'BCom', id: 'bcom' },
    { name: 'BSc', id: 'bsc' },
    { name: 'BA', id: 'ba' },
  ];

  // Handle Upload button click (opens login popup first)
  const handleUploadData = (streamId) => {
    setSelectedStream(streamId);
    setShowLoginPopup(true); // Show login popup
  };

  // Handle login submission
  const handleLoginSubmit = (e) => {
    e.preventDefault();

    const { username, password } = loginData;

    // Call the backend login API
    fetch('http://localhost:5000/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }), // Send login credentials
    })
      .then((response) => {
        if (response.ok) {
          // If login is successful
          setShowLoginPopup(false);
          setShowUploadForm(true); // Show upload form
          setLoginError('');
        } else {
          // Handle login failure
          return response.json().then((data) => setLoginError(data.message || 'Invalid credentials'));
        }
      })
      .catch((error) => {
        console.error('Error:', error);
        setLoginError('Server error, please try again later');
      });
  };

  // Handle student form submission
  const handleSubmitStudentForm = (e) => {
    e.preventDefault();
    const dataToSend = {
      ...formData,
      stream: selectedStream, // Add stream field to data
    };

    // Make a POST request to add the student
    fetch('http://localhost:5000/api/students', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dataToSend),
    })
      .then((response) => response.json())
      .then((data) => {
        alert('Student data added successfully!');
        setShowUploadForm(false);
        setFormData({ name: '', phone_number: '' }); // Reset form
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  // Fetch students of the selected stream and display in table
  const handleViewData = (streamId) => {
    setSelectedStream(streamId);
    fetch(`http://localhost:5000/api/students?stream=${streamId}`)
      .then((response) => response.json())
      .then((data) => {
        setStudents(data);
        setShowTable(true); // Show the table with students data
      })
      .catch((error) => {
        console.error('Error fetching student data:', error);
      });
  };

  // Handle Send QR button
  const handleSendQR = () => {
    fetch(`http://localhost:5000/api/sendQR?stream=${selectedStream}`, {
      method: 'POST',
    })
      .then((response) => {
        if (response.ok) {
          alert('QR codes sent successfully!');
        } else {
          alert('Failed to send QR codes');
        }
      })
      .catch((error) => {
        console.error('Error sending QR codes:', error);
      });
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
                onClick={() => handleUploadData(stream.id)}
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
              >
                Upload Data
              </button>
              <button
                onClick={() => handleViewData(stream.id)}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                View Data
              </button>
              <button
                onClick={handleSendQR}
                className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600"
              >
                Send QR Codes
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Student Data Table */}
      {showTable && (
        <div className="mt-6">
          <h3 className="text-xl mb-4">Student Data for {selectedStream.toUpperCase()}</h3>
          <table className="min-w-full bg-white border">
            <thead>
              <tr>
                <th className="py-2 border">Name</th>
                <th className="py-2 border">Phone Number</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student) => (
                <tr key={student.id}>
                  <td className="py-2 border px-4">{student.name}</td>
                  <td className="py-2 border px-4">{student.phone_number}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Login Popup */}
      {showLoginPopup && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex justify-center items-center">
          <div className="bg-white p-6 rounded shadow-lg">
            <h3 className="text-xl mb-4">Login to Upload Data</h3>
            {loginError && <p className="text-red-500 mb-4">{loginError}</p>}
            <form onSubmit={handleLoginSubmit}>
              <div className="mb-4">
                <label className="block">Username:</label>
                <input
                  type="text"
                  value={loginData.username}
                  onChange={(e) => setLoginData({ ...loginData, username: e.target.value })}
                  className="border p-2 rounded w-full"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block">Password:</label>
                <input
                  type="password"
                  value={loginData.password}
                  onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                  className="border p-2 rounded w-full"
                  required
                />
              </div>
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Login
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Upload Form Popup */}
      {showUploadForm && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex justify-center items-center">
          <div className="bg-white p-6 rounded shadow-lg">
            <h3 className="text-xl mb-4">Add Student for {selectedStream.toUpperCase()}</h3>
            <form onSubmit={handleSubmitStudentForm}>
              <div className="mb-4">
                <label className="block">Name:</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="border p-2 rounded w-full"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block">Phone Number:</label>
                <input
                  type="text"
                  value={formData.phone_number}
                  onChange={(e) => setFormData({ ...formData, phone_number: e.target.value })}
                  className="border p-2 rounded w-full"
                  required
                />
              </div>
              <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
                Submit
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default DatabasePage;
