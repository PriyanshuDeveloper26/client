// import React from 'react';

// const UserProfile = () => {
//   const user = {
//     name: "Jane Doe",
//     email: "jane@example.com",
//     role: "Administrator"
//   };

//   return (
//     <div className="ml-[240px] mr-4 mt-4 min-h-screen flex items-center justify-center">
//       <div className="bg-green-400/10 backdrop-blur-xl rounded-3xl p-10 text-center text-white shadow-lg max-w-[320px] w-full">
//         <h2>{user.name}</h2>
//         <p>{user.email}</p>
//         <p className="text-sm text-gray-400 mt-2">{user.role}</p>
//         <button className="mt-5 px-5 py-2.5 bg-green-400/15 rounded-xl text-white hover:bg-green-400/30 transition-colors duration-300">Edit Profile</button>
//       </div>
//     </div>
//   );
// };

// export default UserProfile;


import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const UserProfile = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState(localStorage.getItem("name") || "");
  const [newUsername, setNewUsername] = useState("");
  const [password] = useState("********"); // masked for display only
  const [responsemessage, setResponseMessage] = useState("");

  const handleUsernameChange = () => {
    if (newUsername.trim()) {
      setUsername(newUsername);
      setNewUsername("");
      localStorage.setItem("name", newUsername);
      setResponseMessage("✅ Username changed successfully!");
      setTimeout(() => navigate("/dashboard"), 2000);
    }
  };



  return (
    <div className="ml-[240px] mr-4 mt-4 min-h-screen flex items-center justify-center px-4">
      <div className="bg-white bg-opacity-10 backdrop-blur-md p-8 rounded-2xl shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-bold text-green-400 mb-6 text-center">User Profile</h2>

        <div className="space-y-4 text-sm text-white">
          <div>
            <label className="block mb-1 text-gray-300">Current Username</label>
            <div className="bg-gray-800 px-4 py-2 rounded-md border border-gray-600">{username}</div>
          </div>

          <div>
            <label className="block mb-1 text-gray-300">Password</label>
            <div className="bg-gray-800 px-4 py-2 rounded-md border border-gray-600">{password}</div>
          </div>

          <div>
            <label className="block mb-1 text-gray-300">Change Username</label>
            <input
              type="text"
              value={newUsername}
              onChange={(e) => setNewUsername(e.target.value)}
              className="w-full px-4 py-2 rounded-md bg-gray-900 border border-gray-700 text-white placeholder-gray-400"
              placeholder="Enter new username"
            />
          </div>

          <button
            onClick={handleUsernameChange}
            className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2 rounded-md mt-2 transition-all"
          >
            Update Username
          </button>
          {responsemessage && (
            <p className="text-sm text-green-400 mt-2 text-center">{responsemessage}</p>
          )
          }
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
