// import React, { useState } from 'react';
// import { useParams } from 'react-router-dom';
import "./Reset_password.css";

const ResetPassword = () => {
  //   const { token } = useParams();
  //   const [password, setPassword] = useState('');
  //   const [message, setMessage] = useState('');

  //   const handleReset = async (e) => {
  //     e.preventDefault();
  //     try {
  //       const res = await fetch(`http://localhost:5000/api/reset-password/${token}`, {
  //         method: 'POST',
  //         headers: { 'Content-Type': 'application/json' },
  //         body: JSON.stringify({ password }),
  //       });

  //       const data = await res.json();
  //       setMessage(data.message);
  //     } catch (error) {
  //       setMessage('Failed to reset password');
  //     }
  //   };

  return (
    <div className="reset-password-container">
      <h2>Reset Your Password</h2>
      <form>
        <input type="password" placeholder="Enter new password" required />
        <button type="submit">Reset Password</button>
      </form>
      {/* {message && <p>{message}</p>} */}
    </div>
  );
};

export default ResetPassword;
