import React from "react";

const ProfileCard = ({ profile, onSelect, isSelected }) => {
  return (
    <div
      onClick={() => onSelect(profile.id)}
      className={`p-4 cursor-pointer rounded-2xl shadow-lg transition-all border-4 ${
        isSelected ? "border-orange-500 bg-yellow-100" : "border-transparent"
      }`}
    >
      <img
        src={profile.image}
        alt={profile.name}
        className="rounded-full w-32 h-32 mx-auto border-2 border-white"
      />
      <h3 className="text-xl font-bold text-center mt-2">{profile.name}</h3>
      <p className="text-center text-sm text-gray-600">{profile.caption}</p>
      <p className="text-center text-xs text-gray-500">
        {profile.mutuals} mutual friends
      </p>
    </div>
  );
};

export default ProfileCard;
