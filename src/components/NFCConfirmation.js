import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function NFCConfirmation({ user }) {
  const [nfcConfirmed, setNfcConfirmed] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const res = await axios.post('http://localhost:5000/api/auth/nfc-confirm', { email: user.email, nfcId: user.nfcId });
        if (res.data.success) {
          setNfcConfirmed(true);
          clearInterval(interval);
          navigate('/dashboard');
        }
      } catch (error) {
        console.error('NFC confirmation failed:', error);
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [user, navigate]);

  return (
    <div className="nfc-confirmation">
      <h2>Waiting for NFC Confirmation</h2>
      <p>Please scan your NFC card to continue.</p>
      {nfcConfirmed && <p>NFC confirmed! Redirecting...</p>}
    </div>
  );
}

export default NFCConfirmation;
