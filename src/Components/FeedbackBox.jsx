import React from "react";

const FeedbackBox = ({ correct, reason }) => {
  return (
    <div className="mt-6 bg-yellow-100 border border-yellow-400 text-yellow-800 p-4 rounded-lg flex items-center gap-4 justify-center text-lg">
      <img
        src="/assets/Image/owl.png"
        alt="Owl mascot"
        className="w-16 h-16 hidden md:block"
      />
      <span>
        {correct ? "✅ Correct!" : "❌ Wrong!"} {reason}
      </span>
    </div>
  );
};

export default FeedbackBox;
