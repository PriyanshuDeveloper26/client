import React from 'react';

const UserProfile = () => {
  const user = {
    name: "Jane Doe",
    email: "jane@example.com",
    role: "Administrator"
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-cover bg-center overflow-hidden" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1496307042754-b4aa456c4a2d?auto=format&fit=crop&w=1600&q=80)' }}>
      <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-10 text-center text-white shadow-lg max-w-[320px] w-full">
        <h2>{user.name}</h2>
        <p>{user.email}</p>
        <p className="text-sm text-gray-400 mt-2">{user.role}</p>
        <button className="mt-5 px-5 py-2.5 bg-white/15 rounded-xl text-white hover:bg-white/30 transition-colors duration-300">Edit Profile</button>
      </div>
    </div>
  );
};

export default UserProfile;
