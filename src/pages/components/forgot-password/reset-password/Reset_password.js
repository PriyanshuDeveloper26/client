// import React, { useState } from 'react';
// import { useParams } from 'react-router-dom';


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
    <div className="max-w-md mx-auto px-8 py-7.5 bg-opacity-10 backdrop-blur-sm border border-white/20 rounded-3xl shadow-xl text-white font-sans text-center">
      <h2 className="mb-5 text-2xl">Reset Your Password</h2>
      <form className="flex flex-col gap-3.75">
        <input type="password" placeholder="Enter new password" required className="px-3 py-3 rounded-lg border-none outline-none text-base" />
        <button type="submit" className="px-3 py-3 bg-[#00bfa6] text-white rounded-lg font-bold cursor-pointer hover:bg-[#009e8a] transition-color duration-300">Reset Password</button>
      </form>
      {/* {message && <p>{message}</p>} */}
    </div>
  );
};

export default ResetPassword;
