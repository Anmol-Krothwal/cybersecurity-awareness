import React, { useState } from 'react';
import NavbarSenior from "../Components/NavbarSenior";
import FooterSenior from "../Components/FooterSenior";

const videoData = [
  { id: 1,  title: 'How to Spot any Fake & Spoofed Email', thumbnail: '/assets/Image/oldvideothumb/thumb1.png',        url: 'https://www.youtube.com/watch?v=hF1bIT1ym4g' },
  { id: 2,  title: 'Understanding Phone Scams',            thumbnail: '/assets/Image/oldvideothumb/thumb2.png',       url: 'https://www.youtube.com/watch?v=5zlnI3Bzslo' },
  { id: 3,  title: 'Safe Online Shopping Tips',            thumbnail: '/assets/Image/oldvideothumb/thumb3.png',        url: 'https://www.youtube.com/watch?v=cWcNQgPiqhc' },
  { id: 4,  title: 'What is Two-Step Verification?',       thumbnail: '/assets/Image/oldvideothumb/thumb4.png',       url: 'https://www.youtube.com/watch?v=4umI2BDQURk' },
  { id: 5,  title: 'Creating Strong Passwords',            thumbnail: '/assets/Image/oldvideothumb/thumb5.png',    url: 'https://www.youtube.com/watch?v=h_WZk-_TWh0' },
  { id: 6,  title: 'Avoiding Tech Support Scams',          thumbnail: '/assets/Image/oldvideothumb/thumb6.png', url: 'https://www.youtube.com/watch?v=QOSFk1OBuCY' },
  { id: 7,  title: 'How to Report a Scam',                 thumbnail: '/assets/Image/oldvideothumb/thumb7.png',  url: 'https://www.youtube.com/watch?v=wb-FaJmjJaI' },
  { id: 8,  title: 'Recognizing Fake Websites',            thumbnail: '/assets/Image/oldvideothumb/thumb8.png', url: 'https://www.youtube.com/watch?v=6_QX12szXTM' },
  { id: 9,  title: 'Protecting Personal Information',      thumbnail: '/assets/Image/oldvideothumb/thumb9.png',         url: 'https://www.youtube.com/watch?v=6M8CMOq8VPo' },
  { id: 10, title: 'Scam Text Messages Explained',         thumbnail: '/assets/Image/oldvideothumb/thumb10.png',     url: 'https://www.youtube.com/watch?v=ykP-9gFkIcs' },
  { id: 11, title: 'Avoiding Lottery and Prize Scams',     thumbnail: '/assets/Image/oldvideothumb/thumb11.png',      url: 'https://www.youtube.com/watch?v=vyzFNQMYK48' },
  { id: 12, title: 'Spotting Fake Social Media Profiles',  thumbnail: '/assets/Image/oldvideothumb/thumb12.png',  url: 'https://www.youtube.com/watch?v=ucKR4ta5oTU' },
  { id: 13, title: 'How to Recognize Romance Scams',       thumbnail: '/assets/Image/oldvideothumb/thumb13.png',      url: 'https://www.youtube.com/watch?v=0l8nh_XwAVs' },
  { id: 14, title: 'How to Block and Report Spam Calls',   thumbnail: '/assets/Image/oldvideothumb/thumb14.png',     url: 'https://www.youtube.com/watch?v=5e-pZ0f9Jh8' },
  { id: 15, title: 'Using Public Wi-Fi Safely',            thumbnail: '/assets/Image/oldvideothumb/thumb15.png',   url: 'https://www.youtube.com/watch?v=ApF_hjyx6pA' },
  { id: 16, title: 'How to Recognize Fake Charity Appeals',thumbnail: '/assets/Image/oldvideothumb/thumb16.png',   url: 'https://www.youtube.com/watch?v=k58nbjGLezg' },
  { id: 17, title: 'Updating Your Devices for Security',   thumbnail: '/assets/Image/oldvideothumb/thumb17.png',       url: 'https://www.youtube.com/watch?v=RZyQtlbbsl0' },
];

/* --- helper: convert any youtube link/ID to a safe embed URL --- */
const getYouTubeId = (input) => {
  if (!input) return "";
  // already an ID?
  if (/^[a-zA-Z0-9_-]{11}$/.test(input)) return input;
  try {
    const u = new URL(input);
    if (u.hostname.includes("youtu.be")) return u.pathname.slice(1);        // youtu.be/<id>
    if (u.searchParams.get("v")) return u.searchParams.get("v");            // watch?v=<id>
    const parts = u.pathname.split("/");
    const i = parts.indexOf("embed");
    if (i !== -1 && parts[i + 1]) return parts[i + 1];                      // /embed/<id>
  } catch {}
  return "";
};

const toEmbedUrl = (input) => {
  const id = getYouTubeId(input);
  if (!id) return "";
  const origin = typeof window !== "undefined" ? window.location.origin : "";
  return `https://www.youtube-nocookie.com/embed/${id}?rel=0&modestbranding=1&autoplay=1&origin=${encodeURIComponent(origin)}`;
};

const OlderAdultVideoGallery = () => {
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [visibleCount, setVisibleCount] = useState(8); // show first 8 videos

  const handleCloseModal = () => setSelectedVideo(null);
  const handleLoadMore = () => setVisibleCount((prev) => prev + 8);

  return (
    <>
      <NavbarSenior />
      <div className="p-8 min-h-screen bg-[#f2f2f2]">
        <h1 className="text-4xl text-blue-900 font-extrabold text-center mb-8">
          Digital Safety Tutorials for Older Adults
        </h1>

        <div className="max-w-7xl mx-auto px-6">
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {videoData.slice(0, visibleCount).map((video) => (
              <div
                key={video.id}
                className="bg-white rounded-lg shadow-md cursor-pointer hover:scale-105 transition-all"
                onClick={() => setSelectedVideo(video.url)} // unchanged behavior
              >
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="rounded-t-lg w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h2 className="text-xl font-bold text-blue-700">{video.title}</h2>
                </div>
              </div>
            ))}
          </div>

          {visibleCount < videoData.length && (
            <div className="flex justify-center mt-8">
              <button
                onClick={handleLoadMore}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
              >
                Load More
              </button>
            </div>
          )}
        </div>

        {selectedVideo && (
          <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 px-4">
            <div className="relative bg-white rounded-xl p-4 max-w-4xl w-full shadow-lg">
              <button
                onClick={handleCloseModal}
                className="absolute top-3 right-3 text-white bg-red-600 hover:bg-red-700 p-2 rounded-full text-xl font-bold z-50"
              >
                ✖
              </button>

              <div className="aspect-w-16 aspect-h-9 w-full rounded-lg overflow-hidden">
                <iframe
                  className="w-full h-[480px]"
                  src={toEmbedUrl(selectedVideo)}  /* <<< convert to valid embed */
                  title="Tutorial Video"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  referrerPolicy="strict-origin-when-cross-origin"
                />
                {/* Optional fallback link if an embed is blocked by the uploader/CSP */}
                {!toEmbedUrl(selectedVideo) && (
                  <a
                    href={selectedVideo}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-4 inline-flex items-center justify-center rounded-lg bg-blue-600 px-4 py-2 text-white"
                  >
                    Open on YouTube
                  </a>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
      <FooterSenior />
    </>
  );
};

export default OlderAdultVideoGallery;
