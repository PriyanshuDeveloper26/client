// import React, { useState } from 'react';

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
    <div className="max-w-md mx-auto px-8 py-7.5 bg-opacity-10 backdrop-blur-sm border border-white/20 rounded-3xl shadow-xl text-white font-sans text-center">
      <h2 className="mb-5 text-2xl">Forgot Password</h2>
      <form className="flex flex-col gap-3.75">
        <input
          type="email"
          placeholder="Enter your email"
          required
          className="px-3 py-3 rounded-lg border-none outline-none text-base"
        />
        {/* <button type="submit">
          Send Reset Link
        </button> */}
        <motion.button
          initial={false}
          animate={{ scale: 1 }}
          whileTap={{ scale: 0.8 }}
          onClick={() => {}}
          className="px-3 py-3 bg-darkcyan text-white rounded-lg font-bold cursor-pointer hover:bg-[#040330] hover:shadow-lg hover:shadow-white/50 transition-all duration-300"
        >
          Send Reset Link
        </motion.button>
      </form>
      {/* {message && <p>{message}</p>} */}
    </div>
  );
};

export default ForgotPassword;
