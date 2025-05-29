// import React, { useState } from 'react';
import "./Forgot_password.css";
import { motion } from "framer-motion";

const ForgotPassword = () => {
//   const [email, setEmail] = useState('');
//   const [message, setMessage] = useState('');
//   const [loading, setLoading] = useState(false);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setMessage('');

//     try {
//       const res = await fetch('http://localhost:5000/api/auth/forgot-password', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ email }),
//       });

//       const data = await res.json();
//       setMessage(data.message || 'Check your email for a reset link');
//     } catch (error) {
//       setMessage('Something went wrong. Please try again.');
//     }

//     setLoading(false);
//   };

  return (
    <div className="forgot-password-container">
      <h2>Forgot Password</h2>
      <form>
        <input
          type="email"
          placeholder="Enter your email"
          required
        />
        {/* <button type="submit">
          Send Reset Link
        </button> */}
        <motion.button
          initial={false}
          animate={{ scale: 1 }}
          whileTap={{ scale: 0.8 }}
          onClick={() => {}}
        >
          Send Reset Link
        </motion.button>
      </form>
      {/* {message && <p>{message}</p>} */}
    </div>
  );
};

export default ForgotPassword;
