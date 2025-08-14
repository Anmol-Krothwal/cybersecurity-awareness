import React, { useState } from "react";

const NewsCard = ({ title, summary, category, date, image, fullText }) => {
  const [showModal, setShowModal] = useState(false);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title,
        text: summary,
        url: window.location.href,
      });
    } else {
      alert("Sharing not supported in this browser.");
    }
  };

  const handleSave = () => {
    alert("✅ News saved (you can implement localStorage or backend API to store it).");
  };

  return (
    <>
      <div
        className="bg-white rounded-xl shadow-lg p-4 hover:shadow-2xl transition-all cursor-pointer relative border-l-4 border-purple-300"
        onClick={() => setShowModal(true)}
      >
        <img src={image} alt={title} className="w-full h-48 sm:h-56 md:h-64 lg:h-72 xl:h-80 object-cover rounded-md mb-4" />
        <h2 className="text-lg font-bold text-gray-800">{title}</h2>
        <p className="text-gray-600">{summary}</p>
        <div className="text-sm text-purple-600 mt-2 flex justify-between items-center">
          <span>{category} • {date}</span>
          <span className="text-blue-600 underline hover:text-blue-800">🔊 Read Aloud</span>
        </div>
        <div className="flex space-x-2 mt-2">
          <span>👍</span>
          <span>😲</span>
          <span>⚠️</span>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-white w-[90%] md:w-[600px] rounded-xl p-6 shadow-lg relative animate-fade-in max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-3 right-4 text-2xl font-bold text-gray-500 hover:text-red-600"
            >
              &times;
            </button>
            <h2 className="text-2xl font-bold mb-2 text-purple-700">{title}</h2>
            <img src={image} alt={title} className="w-full max-h-[400px] md:max-h-[500px] object-cover rounded-xl shadow mb-4" />
            <p className="text-gray-700 mb-3 whitespace-pre-line">{fullText}</p>

            {/* Buttons */}
            <div className="flex gap-4 mt-4">
              
              <button onClick={handleShare} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                📤 Share
              </button>
            </div>

            <div className="text-right text-sm text-purple-600 mt-4">
              {category} • {date}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default NewsCard;
