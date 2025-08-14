import React, { useState } from 'react';

const videoList = [
  {
    title: 'Bob and the Phishing Email',
    description: 'Follow Bob’s journey as he encounters a suspicious email. Understand the warning signs of phishing scams.',
    src: '/assets/Video/player/video1.mp4',
    thumbnail: '/assets/Image/Teenvideoplayer/img1.png',
  },
  {
    title: 'Cyber Security – Digital Cutout Animation',
    description: 'A fun, animated look at how cyber threats appear online. Watch kids react to hackers and learn to protect themselves.',
    src: '/assets/Video/player/video2.mp4',
    thumbnail: '/assets/Image/Teenvideoplayer/img2.png',
  },
  {
    title: 'Cyber Security Awareness – Think Before You Click',
    description: 'Every click counts! Learn the dangers of suspicious links. This video reminds kids to pause and think before tapping.',
    src: '/assets/Video/player/video3.mp4',
    thumbnail: '/assets/Image/Teenvideoplayer/img3.png',
  },
  {
    title: ' Cybersecurity Definitions for Kids',
    description: 'Big concepts, simple words! Learn basic cybersecurity terms like password, firewall, and phishing.',
    src: '/assets/Video/player/video4.mp4',
    thumbnail: '/assets/Image/Teenvideoplayer/img4.png',
  },
  {
    title: 'Hacking – Protect Yourself from Hackers',
    description: 'Hackers are tricky—but you can outsmart them! Discover how to stay protected from cyber intruders. ',
    src: '/assets/Video/player/video5.mp4',
    thumbnail: '/assets/Image/Teenvideoplayer/img5.png',
  },
  {
    title: 'Cybercrime for Newbies',
    description: 'A beginner-friendly guide to understanding cybercrime. Learn about the types of online threats out there. ',
    src: '/assets/Video/player/video6.mp4',
    thumbnail: '/assets/Image/Teenvideoplayer/img6.png',
  },
  {
    title: 'How to Mitigate Ice Phishing Attacks',
    description: 'Ice phishing is cool—but dangerous! Learn how cybercriminals lure victims using fake crypto approvals. ',
    src: '/assets/Video/player/video7.mp4',
    thumbnail: '/assets/Image/Teenvideoplayer/img7.png',
  },
  {
    title: 'Spotting Phishing and Spam Emails',
    description: 'Not every message is what it seems. Learn how to identify fake emails that try to trick you.',
    src: '/assets/Video/player/video8.mp4',
    thumbnail: '/assets/Image/Teenvideoplayer/img8.png',
  },
  {
    title: ' Pause, Think and Act – Cyber Security Awareness',
    description: 'Take a moment before acting online. This video teaches a simple 3-step rule: pause, think, then act.',
    src: '/assets/Video/player/video9.mp4',
    thumbnail: '/assets/Image/Teenvideoplayer/img9.png',
  },
  {
    title: 'Online Privacy for Kids',
    description: 'Learn how to keep your personal data safe online. Explore essential internet safety rules for kids.',
    src: '/assets/Video/player/video10.mp4',
    thumbnail: '/assets/Image/Teenvideoplayer/img10.png',
  },
  {
    title: 'Phishing, Vishing, and Smishing',
    description: 'Learn the difference between phishing (email), vishing (voice calls), and smishing (SMS scams). ',
    src: '/assets/Video/player/video11.mp4',
    thumbnail: '/assets/Image/Teenvideoplayer/img11.png',
  },
  {
    title: 'Safe Web Browsing',
    description: 'Learn how to browse the internet securely! Use strong passwords, look for the lock icon 🔒 in the URL bar, and avoid suspicious links. Be a smart surfer—stay alert online!',
    src: '/assets/Video/player/video12.mp4',
    thumbnail: '/assets/Image/Teenvideoplayer/img12.png',
  },
  {
    title: 'What is Identity Theft?',
    description: 'Identity theft happens when someone steals your personal data, like your name or card details, to commit fraud. Discover how to safeguard your identity and avoid becoming a target.',
    src: '/assets/Video/player/video13.mp4',
    thumbnail: '/assets/Image/Teenvideoplayer/img13.png',
  },
  {
    title: 'What is a Digital Footprint?',
    description: 'Every time you go online, you leave a trail—your digital footprint. Understand what data you’re sharing and how it can be used. Think before you post or click!',
    src: '/assets/Video/player/video14.mp4',
    thumbnail: '/assets/Image/Teenvideoplayer/img14.png',
  },
  {
    title: ' Zero-Day Attacks',
    description: 'Zero-day attacks exploit unknown vulnerabilities before developers have time to patch them. These attacks are dangerous because they are invisible to most security tools. ',
    src: '/assets/Video/player/video15.mp4',
    thumbnail: '/assets/Image/Teenvideoplayer/img15.png',
  },
];

const VideoGallery = ({ isDark }) => {
  const [selectedVideo, setSelectedVideo] = useState(videoList[0]);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredVideos = videoList.filter(video =>
    video.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col md:flex-row gap-6">
      {/* LEFT: Video Player */}
      <div className={`flex-1 rounded-2xl p-4 ${isDark ? 'bg-gray-800' : 'bg-white'} shadow-xl`}>
        <video
          key={selectedVideo.src}
          src={selectedVideo.src}
          controls
          autoPlay
          className="rounded-lg w-full h-[280px] sm:h-[350px] md:h-[420px] object-cover shadow-md"
        />
        <div className="mt-4">
          <h3 className="text-xl font-bold">{selectedVideo.title}</h3>
          <p className={`${isDark ? 'text-gray-300' : 'text-gray-600'}`}>{selectedVideo.description}</p>
        </div>
      </div>

      {/* RIGHT: Thumbnails + Search */}
      <div className={`w-full md:w-80 p-4 rounded-2xl ${isDark ? 'bg-gray-700 text-white' : 'bg-white text-black'} shadow-md`}>
        <input
          type="text"
          placeholder="Search video by title"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={`w-full p-2 mb-4 rounded border ${isDark ? 'bg-gray-600 text-white border-gray-500' : 'bg-white text-black border-gray-300'}`}
        />
        <div className="overflow-y-auto max-h-[70vh] pr-1 space-y-4">
          {filteredVideos.map((video, index) => (
            <div
              key={index}
              onClick={() => setSelectedVideo(video)}
              className={`flex gap-3 cursor-pointer items-center hover:bg-purple-200 dark:hover:bg-purple-700 p-2 rounded transition`}
            >
              <img
                src={video.thumbnail}
                alt={video.title}
                className="w-16 h-16 object-cover rounded-md shadow"
              />
              <div className="text-sm">
                <h4 className="font-bold leading-tight">{video.title}</h4>
                <p className="text-xs opacity-70">{video.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VideoGallery;
