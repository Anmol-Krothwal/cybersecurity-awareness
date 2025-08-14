import React from "react";

const emojiLevels = ["🐣", "🧠", "🛡️", "🧑‍💻", "🚀"];

const ProgressBar = ({ current, total }) => {
  const level = Math.min(
    Math.floor((current / total) * emojiLevels.length),
    emojiLevels.length - 1
  );

  return (
    <div className="w-full mb-4 text-center">
      <div className="text-2xl mb-1">Level: {emojiLevels[level]}</div>
      <div className="w-full bg-gray-300 h-4 rounded-full">
        <div
          className="bg-green-500 h-4 rounded-full transition-all"
          style={{ width: `${(current / total) * 100}%` }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;
