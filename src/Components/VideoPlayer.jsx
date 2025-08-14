import React from 'react';

const VideoPlayer = ({ onVideoEnd }) => {
  return (
    <div className="w-full flex justify-center items-center">
      <video
        controls
        onEnded={onVideoEnd}
        className="w-full h-auto md:w-[90%] rounded-xl shadow-xl"
        style={{ maxHeight: '360px', objectFit: 'contain' }}
      >
        <source
          src="/assets/Video/scamspotvideo1.mp4"
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default VideoPlayer;
