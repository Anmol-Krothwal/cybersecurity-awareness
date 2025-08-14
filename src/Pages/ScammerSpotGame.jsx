import React, { useState } from 'react';
import VideoPlayer from '../Components/VideoPlayer';
import ScamSpottingGame from '../Components/ScamSpottingGame';
import NavbarPage from "../Components/NavbarPage";
import FooterTeen from "../components/FooterTeen";

const ScammerSpotGame = () => {
  const [videoCompleted, setVideoCompleted] = useState(false);

  const handleVideoEnd = () => {
    setVideoCompleted(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-pink-100 to-yellow-100 font-[Comic_Sans_MS,cursive]">
      {/* ✅ Navbar */}
      <NavbarPage />

      <div className="px-4 sm:px-6 lg:px-10 py-6 max-w-7xl mx-auto">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-center text-purple-700 mb-8 drop-shadow-lg">
          🧠 <span className="bg-yellow-200 rounded-xl px-4 py-2">Scam Spotting Game</span>
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* LEFT - Quiz or Prompt */}
          <div className="bg-white rounded-2xl shadow-xl p-6 min-h-[300px] flex items-center justify-center text-center">
            {!videoCompleted ? (
              <p className="text-lg sm:text-xl font-bold text-gray-700 animate-pulse">
                ⏳ Please watch the video first to unlock the quiz.
              </p>
            ) : (
              <ScamSpottingGame />
            )}
          </div>

          {/* RIGHT - Video */}
          <div className="bg-white rounded-2xl shadow-xl p-4 flex items-center justify-center">
            <VideoPlayer onVideoEnd={handleVideoEnd} />
          </div>
        </div>
      </div>

      {/* ✅ Footer */}
      <FooterTeen />
    </div>
  );
};

export default ScammerSpotGame;
