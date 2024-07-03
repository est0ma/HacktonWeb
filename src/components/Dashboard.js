import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Dashboard = () => {
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchNfcData = async () => {
      try {
        // Assuming the NFC reader sends a request to the backend with NFC data
        const response = await axios.get('/api/nfc/read');
        if (response.data.authenticated) {
          setMessage('Connexion autorisée');
        } else {
          setMessage('Connexion refusée');
        }
      } catch (error) {
        console.error('Error reading NFC data', error);
      }
    };

    fetchNfcData();
  }, []);

  return (
    <div>
      <h1>Dashboard</h1>
      <p>{message}</p>
    </div>
  );
};

export default Dashboard;
