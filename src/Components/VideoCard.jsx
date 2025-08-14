import React from 'react';

const VideoCard = ({ video, onSelect }) => {
  return (
    <div
      className="flex mb-4 cursor-pointer hover:bg-gray-800 p-2 rounded"
      onClick={() => onSelect(video)}
    >
      <img
        src={video.thumbnail}
        alt={video.title}
        className="w-28 h-16 object-cover rounded mr-3"
      />
      <div>
        <h3 className="text-white font-bold text-sm">{video.title}</h3>
        <p className="text-gray-400 text-xs">{video.description}</p>
      </div>
    </div>
  );
};

export default VideoCard;
