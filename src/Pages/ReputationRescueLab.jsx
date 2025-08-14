import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Confetti from "react-confetti";
import NavbarPage from "../Components/NavbarPage";    // ✅ import your navbar
import FooterTeen from "../components/FooterTeen";     // ✅ import your footer

const allItems = [
  { label: "📍 Address: 123 Apple Street, London", risky: true },
  { label: "🎂 Birthday: Jan 15, 2010", risky: true },
  { label: "🏫 School: Riverdale High School", risky: true },
  { label: "🎵 Favorite Band: The Cyber Cats", risky: false },
  { label: "🐶 Pet’s Name: Bubbles", risky: false },
  { label: "📸 Profile Pic: Smiling selfie", risky: false },
  { label: "💬 Status: 'Alone at home tonight...'", risky: true },
  { label: "📞 Phone: 07812 345678", risky: true },
  { label: "📅 Last vacation: Bali, June 2023", risky: false },
  { label: "🧸 Favourite Toy: CyberDuck", risky: false },
  { label: "🏠 Home Location: Near Elm Park", risky: true },
];

const tips = {
  "📍 Address": "Sharing home addresses can lead to stalking or identity theft.",
  "🎂 Birthday": "Birthdays help scammers guess your password or ID.",
  "🏫 School": "Revealing school names makes it easier for strangers to find you.",
  "💬 Status": "Status like 'home alone' tells strangers you're vulnerable.",
  "📞 Phone": "Scammers can use your phone number for fake messages or calls.",
  "🏠 Home": "Revealing your area makes it easier to locate you.",
};

const shuffleItems = () =>
  [...allItems]
    .sort(() => 0.5 - Math.random())
    .slice(0, 7)
    .map((item, index) => ({ ...item, id: index + 1 }));

const ReputationRescueLab = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState(shuffleItems());
  const [removedIds, setRemovedIds] = useState([]);
  const [score, setScore] = useState(0);
  const [wrongClicks, setWrongClicks] = useState(0);
  const [shakeId, setShakeId] = useState(null);
  const [pulseId, setPulseId] = useState(null);
  const [gameOver, setGameOver] = useState(false);
  const [gameWon, setGameWon] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(5);

  const riskyCount = items.filter((i) => i.risky).length;

  useEffect(() => {
    if (!gameStarted || gameOver || gameWon) return;
    if (timeLeft === 0) {
      setGameOver(true);
      return;
    }
    const timer = setTimeout(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearTimeout(timer);
  }, [timeLeft, gameStarted, gameOver, gameWon]);

  const handleClick = (item) => {
    if (removedIds.includes(item.id)) return;

    if (item.risky) {
      setRemovedIds([...removedIds, item.id]);
      setScore((prev) => prev + 1);
      setPulseId(item.id);
      setTimeout(() => setPulseId(null), 300);
    } else {
      setWrongClicks((prev) => prev + 1);
      setShakeId(item.id);
      setTimeout(() => setShakeId(null), 400);
    }

    setItems(shuffleItems());
    setTimeLeft(5);
  };

  const resetGame = () => {
    setItems(shuffleItems());
    setRemovedIds([]);
    setScore(0);
    setWrongClicks(0);
    setGameOver(false);
    setGameWon(false);
    setTimeLeft(5);
    setGameStarted(true);
  };

  useEffect(() => {
    if (score === riskyCount && riskyCount > 0) {
      setGameWon(true);
    }
    if (wrongClicks >= 5) {
      setGameOver(true);
    }
  }, [score, wrongClicks, riskyCount]);

  if (!gameStarted) {
    return (
      <div className="flex items-center justify-center h-screen bg-blue-50 relative overflow-hidden">
        <div className="text-center z-10">
          <h1 className="text-4xl font-bold text-purple-700 mb-4">🧽 Reputation Rescue Lab</h1>
          <p className="text-lg text-gray-700 mb-6">Click START to begin. You have 5 seconds per move!</p>
          <button
            onClick={resetGame}
            className="px-6 py-3 bg-purple-600 text-white font-bold rounded-full shadow-lg hover:bg-purple-700"
          >
            🚀 Start Game
          </button>
        </div>
        <div className="balloons z-0">
          {Array.from({ length: 15 }).map((_, i) => (
            <span key={i} style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${5 + Math.random() * 5}s`
            }} />
          ))}
        </div>
      </div>
    );
  }

  return (
  <div className="min-h-screen flex flex-col font-sans bg-gradient-to-b from-[#d0d9ff] via-blue-300 to-[#4b007d]">
    <NavbarPage /> {/* ✅ Navbar */}

    <div className="flex-grow p-4 md:p-10 relative overflow-hidden">
      {(gameOver || gameWon) && (
        <div className="fixed inset-0 bg-black bg-opacity-80 z-50 flex flex-col justify-center items-center text-center text-white">
          {gameWon && <Confetti />}
          <h2 className="text-4xl font-bold mb-4">
            {gameWon ? "🎉 You’re a Cyber Hero!" : "⏰ Time's Up!"}
          </h2>
          <p className="text-xl mb-4">
            {gameWon
              ? "You removed all risky info!"
              : "You didn’t act in time or used all chances."}
          </p>
          <div className="flex gap-4">
            <button
              onClick={resetGame}
              className="px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded-full text-white font-bold shadow-md"
            >
              🔁 Play Again
            </button>
            <button
              onClick={() => navigate("/TeensAct")}
              className="px-6 py-3 bg-gray-400 hover:bg-gray-500 rounded-full text-white font-bold shadow-md"
            >
              🚪 Exit to Activities
            </button>
          </div>
        </div>
      )}

      {/* Balloons background */}
      <div className="balloons z-0 absolute top-0 left-0 w-full h-full pointer-events-none">
        {Array.from({ length: 15 }).map((_, i) => (
          <span key={i} style={{
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 4}s`,
            animationDuration: `${5 + Math.random() * 5}s`
          }} />
        ))}
      </div>

      {/* Game UI */}
      <div className="grid md:grid-cols-2 gap-6 max-w-6xl mx-auto relative z-10">
        {/* Profile Section */}
        <div className="bg-white p-6 rounded-xl shadow-xl space-y-3 min-h-[500px] flex flex-col justify-between">
          <h2 className="text-xl font-bold text-purple-800 mb-2">🧑 Mock Teen Profile</h2>
          <div className="space-y-3">
            {items.map((item) => (
              <div
                key={item.id}
                onClick={() => handleClick(item)}
                title={
                  item.risky
                    ? Object.entries(tips).find(([key]) =>
                        item.label.includes(key)
                      )?.[1] || "This might be risky info."
                    : ""
                }
                className={`p-3 rounded-md text-base cursor-pointer transition-all duration-300 ${
                  removedIds.includes(item.id)
                    ? "line-through text-gray-400 bg-gray-100"
                    : item.risky
                    ? "bg-red-100 text-red-700 hover:bg-red-200"
                    : "bg-green-100 text-green-700 hover:bg-green-200"
                } ${shakeId === item.id ? "animate-shake" : ""} ${
                  pulseId === item.id ? "animate-pulse bg-green-200" : ""
                }`}
              >
                {item.label}
              </div>
            ))}
          </div>
        </div>

        {/* Score/Info Section */}
        <div className="bg-white px-6 py-4 rounded-xl shadow-xl min-h-[500px] flex flex-col justify-center gap-2">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold text-purple-800 mb-2">
              🧽 Reputation Rescue Lab
            </h1>
            <p className="text-gray-600 text-base mb-4">
              Remove risky info. You have 5 seconds per move ⏱️
            </p>
            <div className="text-lg font-bold text-purple-700">
              ⭐ Stars Earned: {score} / {riskyCount}
            </div>
            <div className="text-lg font-semibold text-red-600 mb-2">
              ❌ Wrong Clicks Left: {5 - wrongClicks}
            </div>
            <div className="text-lg font-semibold text-blue-600 mb-2">
              ⏳ Time Left: {timeLeft}s
            </div>
            <div className="w-full h-6 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-yellow-400 text-white font-bold text-xs flex items-center justify-center transition-all duration-500"
                style={{ width: `${(score / riskyCount) * 100}%` }}
              >
                {score === riskyCount ? "🎉 Done!" : "Progress"}
              </div>
            </div>
            <p className="text-lg font-semibold text-center mt-4">
              {score === 0 && "😐 Just Starting..."}
              {score === 1 && "🙂 Warming Up..."}
              {score === 2 && "😎 Smart Clicks!"}
              {score === 3 && "🕵️ Almost There!"}
              {score >= riskyCount && "🛡️ Cyber Hero!"}
            </p>
          </div>
        </div>
      </div>
    </div>

    <FooterTeen /> {/* ✅ Footer */}
  </div>
);

};

export default ReputationRescueLab;
