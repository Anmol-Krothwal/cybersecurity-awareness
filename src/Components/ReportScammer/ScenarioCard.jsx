import React from "react";

const ScenarioCard = ({ scenario, onSelect }) => (
  <div className="bg-white p-6 rounded-lg shadow-md max-w-2xl mx-auto mb-6">
    <h3 className="text-xl font-bold mb-3">Platform: {scenario.platform}</h3>

    <div className="bg-gradient-to-br from-sky-50 to-sky-100 border p-4 rounded-lg shadow-inner mb-4">
      {scenario.chat.map((msg, idx) => (
        <div key={idx} className="flex items-center gap-2 my-2">
          <img src="/assets/Image/users/default.jpg" className="h-8 w-8 rounded-full" alt="" />
          <p className="bg-white px-3 py-1 rounded-xl shadow text-sm">
            <strong>{msg.user}</strong>: {msg.text}
          </p>
        </div>
      ))}
    </div>

    <div className="flex justify-center gap-6">
      <button
        onClick={() => onSelect("Report")}
        className="transition transform active:scale-95 bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-full"
      >
        🚨 Report
      </button>
      <button
        onClick={() => onSelect("Ignore")}
        className="transition transform active:scale-95 bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-full"
      >
        👋 Ignore
      </button>
    </div>
  </div>
);

export default ScenarioCard;
