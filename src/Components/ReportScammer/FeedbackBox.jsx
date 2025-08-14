import React from "react";

const FeedbackBox = ({ isCorrect, reason, onNext }) => (
  <div
    className={`p-6 rounded-lg max-w-xl mx-auto text-center shadow-md ${
      isCorrect ? "bg-green-100" : "bg-red-100"
    }`}
  >
    <div className="text-4xl mb-2">{isCorrect ? "🎉" : "⚠️"}</div>
    <h2
      className={`text-2xl font-bold ${
        isCorrect ? "text-green-700" : "text-red-700"
      }`}
    >
      {isCorrect ? "Correct!" : "Oops!"}
    </h2>
    <p className="text-gray-800 my-2">{reason}</p>
    <button
      onClick={onNext}
      className="mt-4 bg-purple-600 hover:bg-purple-700 text-white px-5 py-2 rounded-full"
    >
      Next →
    </button>
  </div>
);

export default FeedbackBox;
