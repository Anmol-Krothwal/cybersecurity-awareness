import React, { useState } from 'react';
import NavbarPage from '../Components/NavbarPage';
import FooterTeen from '../Components/FooterTeen';
import VideoGallery from '../Components/VideoGallery';

const VideoPlayerPage = () => {
  const [isDark, setIsDark] = useState(false);

  const toggleDarkMode = () => setIsDark(!isDark);

  return (
    <div className={`${isDark ? 'bg-gray-900 text-white' : 'bg-gradient-to-br from-blue-100 via-pink-100 to-yellow-100 text-black'} min-h-screen font-[Comic_Sans_MS,cursive]`}>
      <NavbarPage />

      <div className="flex justify-between items-center px-6 py-4">
        <h1 className="text-3xl font-extrabold">🎬 Animated Videos</h1>
        <button
          onClick={toggleDarkMode}
          className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-xl transition"
        >
          {isDark ? '☀️ Light Mode' : '🌙 Dark Mode'}
        </button>
      </div>

      <main className="px-4 sm:px-6 lg:px-10 py-6 max-w-7xl mx-auto">
        <VideoGallery isDark={isDark} />
      </main>

      <FooterTeen />
    </div>
  );
};

export default VideoPlayerPage;
