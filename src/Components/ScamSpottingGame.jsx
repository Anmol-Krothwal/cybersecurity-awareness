import React, { useState } from 'react';

const messages = [
  {
    id: 1,
    text: "👀 Hey! I made a fan edit of you! Click this link.",
    isScam: true,
    explanation: "Scam – Random links from strangers can be dangerous."
  },
  {
    id: 2,
    text: "🎮 Let's play Minecraft! Add me!",
    isScam: false,
    explanation: "Safe – Just sharing a username is okay."
  },
  {
    id: 3,
    text: "📦 You won a free iPhone! Just pay shipping.",
    isScam: true,
    explanation: "Scam – Fake prize offers often trick you."
  },
  {
    id: 4,
    text: "🚨 You were tagged in a video! Open fast!",
    isScam: true,
    explanation: "Scam – Fear-based messages with links are risky."
  },
  {
    id: 5,
    text: "🤝 Want to collab on a dance video?",
    isScam: false,
    explanation: "Safe – Just a friendly collab request."
  },
  {
    id: 6,
    text: "🎥 This took hours! Please like. [weirdlink.biz]",
    isScam: true,
    explanation: "Scam – Unknown link alert!"
  },
  {
    id: 7,
    text: "💫 Follow me and I’ll follow back!",
    isScam: false,
    explanation: "Safe – Common friendly message."
  },
  {
    id: 8,
    text: "🏆 Help me win a contest, just log in here ❤️",
    isScam: true,
    explanation: "Scam – Trying to steal your login."
  },
  {
    id: 9,
    text: "😱 Look what someone posted about you. [link]",
    isScam: true,
    explanation: "Scam – Plays with fear and curiosity."
  },
  {
    id: 10,
    text: "🎁 Get a free Roblox skin! [scamurl.com]",
    isScam: true,
    explanation: "Scam – Freebies = Malware!"
  },
  {
    id: 11,
    text: "📢 Can you like my video? It’s on my profile!",
    isScam: false,
    explanation: "Safe – No link, no risk."
  },
  {
    id: 12,
    text: "💸 Win $500! Just send your phone number!",
    isScam: true,
    explanation: "Scam – Wants your personal info."
  },
  {
    id: 13,
    text: "🤨 Are you in this video? [sneakyurl.ru]",
    isScam: true,
    explanation: "Scam – A trick to make you panic-click."
  },
  {
    id: 14,
    text: "🔥 That dance you did was amazing!",
    isScam: false,
    explanation: "Safe – Just a compliment."
  },
  {
    id: 15,
    text: "😭 I'm quitting social media. Help me transfer my coins?",
    isScam: true,
    explanation: "Scam – Emotional tricks for access."
  },
];

const ScamSpottingGame = () => {
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const current = messages[index];

  const handleChoice = (choice) => {
    const correct =
      (choice === "scam" && current.isScam) ||
      (choice === "safe" && !current.isScam);
    if (correct) setScore(score + 1);
    setSelected(choice);
  };

  const handleNext = () => {
    if (index + 1 < messages.length) {
      setIndex(index + 1);
      setSelected(null);
    } else {
      setShowResult(true);
    }
  };

  const restartGame = () => {
    setIndex(0);
    setSelected(null);
    setScore(0);
    setShowResult(false);
  };

  return (
    <div className="text-center mt-10 px-4 md:px-8">
      <h2 className="text-3xl font-bold text-purple-600 mb-6">🧠 Scam Spotting Game</h2>

      {showResult ? (
        <div className="bg-yellow-100 p-6 rounded-xl shadow-lg">
          <p className="text-lg font-semibold text-green-700 mb-4">
            🎉 You spotted {score} out of {messages.length} messages correctly!
          </p>
          <button
            onClick={restartGame}
            className="bg-purple-600 text-white px-6 py-3 rounded-full hover:bg-purple-800 transition"
          >
            🔁 Play Again
          </button>
        </div>
      ) : (
        <div>
          <div className="bg-blue-100 p-6 rounded-xl shadow-xl w-full md:w-3/4 mx-auto mb-4 border-2 border-blue-300">
            <p className="text-lg font-medium">📩 Message {index + 1}:</p>
            <div className="bg-white rounded-xl p-4 mt-2 shadow-inner text-lg font-mono">
              {current.text}
            </div>
          </div>

          {!selected ? (
            <div className="space-x-4 mt-4">
              <button
                onClick={() => handleChoice("safe")}
                className="bg-green-500 text-white px-6 py-3 rounded-full hover:bg-green-600 transition"
              >
                ✅ Safe
              </button>
              <button
                onClick={() => handleChoice("scam")}
                className="bg-red-500 text-white px-6 py-3 rounded-full hover:bg-red-600 transition"
              >
                ❌ Scam
              </button>
            </div>
          ) : (
            <div className="mt-6">
              <p className="text-xl font-bold">
                {selected === (current.isScam ? "scam" : "safe")
                  ? "🎯 You got it right!"
                  : "🙈 Oops! That was incorrect."}
              </p>
              <p className="text-md mt-2 text-gray-700 italic">{current.explanation}</p>
              <button
                onClick={handleNext}
                className="mt-4 bg-yellow-500 text-white px-6 py-2 rounded-full hover:bg-yellow-600 transition"
              >
                👉 Next
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ScamSpottingGame;
