// src/Pages/ScammerQuiz/ChatProfile.jsx
import React from 'react';

const ChatProfile = ({ profile, onSelect, isSelected }) => {
  const { id, name, message } = profile;

  return (
    <div
  className={`w-full max-w-xs p-4 rounded-xl shadow-lg transition-all duration-200 cursor-pointer ${
    isSelected ? 'border-4 border-green-500 bg-green-50' : 'bg-blue-50 hover:bg-blue-100'
  }`}
  onClick={() => onSelect(profile.id)}
>
  <h3 className="text-lg font-bold text-blue-700">{profile.name}</h3>
  <p className="text-sm mt-1">{profile.message}</p>
</div>
  );
};

export default ChatProfile;
