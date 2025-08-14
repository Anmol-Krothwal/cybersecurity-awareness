import React, { useState, useEffect } from "react";
import confetti from "canvas-confetti";
import NavbarSenior from "../Components/NavbarSenior";
import FooterSenior from "../Components/FooterSenior";

const terms = [
  { id: 1, term: "Phishing", definition: "Fake messages asking for personal info." },
  { id: 2, term: "Vishing", definition: "Scam calls pretending to be official." },
  { id: 3, term: "Smishing", definition: "Scam texts with malicious links." },
  { id: 4, term: "Malware", definition: "Malicious software that harms devices." },
  { id: 5, term: "Ransomware", definition: "Malware demanding payment to restore files." },
  { id: 6, term: "Spoofing", definition: "Faking identity to gain trust." },
];

const shuffleCards = () => {
  const cards = terms.flatMap((item) => [
    { ...item, isTerm: true, key: `${item.id}-term` },
    { ...item, isTerm: false, key: `${item.id}-def` },
  ]);
  return cards.sort(() => Math.random() - 0.5);
};

const ScamMemoryGame = () => {
  const [cards, setCards] = useState(shuffleCards());
  const [flipped, setFlipped] = useState([]);
  const [matched, setMatched] = useState([]);
  const [explanations, setExplanations] = useState([]);
  const [startTime] = useState(Date.now());
  const [timer, setTimer] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [speechEnabled, setSpeechEnabled] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!gameOver) {
        setTimer(Math.floor((Date.now() - startTime) / 1000));
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [startTime, gameOver]);

  useEffect(() => {
    if (matched.length === terms.length) {
      confetti();
      setGameOver(true);
    }
  }, [matched]);

  const speak = (text) => {
    if (!speechEnabled) return;
    const utter = new SpeechSynthesisUtterance(text);
    utter.lang = "en-GB";
    window.speechSynthesis.speak(utter);
  };

  const handleFlip = (card) => {
    if (flipped.length === 2 || flipped.find((c) => c.key === card.key)) return;

    speak(card.isTerm ? card.term : card.definition);
    const newFlipped = [...flipped, card];
    setFlipped(newFlipped);

    if (newFlipped.length === 2) {
      const [first, second] = newFlipped;
      if (first.id === second.id && first.isTerm !== second.isTerm) {
        setMatched((prev) => [...prev, first.id]);
        setExplanations((prev) => [...prev, first]);
      }
      setTimeout(() => setFlipped([]), 1000);
    }
  };

  const isFlipped = (card) => flipped.find((f) => f.key === card.key);
  const isMatched = (card) => matched.includes(card.id);

  const restartGame = () => {
    window.speechSynthesis.cancel();
    setCards(shuffleCards());
    setFlipped([]);
    setMatched([]);
    setExplanations([]);
    setGameOver(false);
    setSpeechEnabled(true);
    setTimer(0);
  };

  return (
  <>
    <NavbarSenior />
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-50 text-gray-800 pt-4 md:pt-6 pb-2 px-4 text-lg">
      <div className="flex-1 max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-12 text-center">
          🧠 Scam Vocabulary Memory Game
        </h1>

        <div className="flex flex-col sm:flex-row items-center justify-between mb-4">
          <div className="text-lg mb-2 sm:mb-0">⏱ Time: {timer}s</div>
          <button
            className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
            onClick={() => {
              if (speechEnabled) {
                window.speechSynthesis.cancel();
                setSpeechEnabled(false);
              } else {
                setSpeechEnabled(true);
              }
            }}
          >
            {speechEnabled ? "🔇 Stop Speech" : "🔊 Enable Speech"}
          </button>
        </div>

        <div className="w-full bg-gray-300 rounded h-4 mb-4">
          <div
            className="bg-green-500 h-4 rounded"
            style={{ width: `${(matched.length / terms.length) * 100}%` }}
          ></div>
        </div>

        {/* Bigger, more readable cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 mb-8">
          {cards.map((card) => (
            <button
              key={card.key}
              onClick={() => handleFlip(card)}
              disabled={isMatched(card)}
              className={`p-4 rounded-xl shadow-lg min-h-[100px] text-2xl transition ${
                isMatched(card)
                  ? "bg-green-200 cursor-default"
                  : isFlipped(card)
                  ? "bg-white border-4 border-blue-400"
                  : "bg-blue-100 hover:bg-blue-200"
              }`}
              aria-label={
                card.isTerm
                  ? `Term card: ${card.term}`
                  : `Definition card: ${card.definition}`
              }
            >
              {isFlipped(card) || isMatched(card)
                ? card.isTerm
                  ? card.term
                  : card.definition
                : "❓"}
            </button>
          ))}
        </div>

        {gameOver && (
          <div className="text-center mt-6 space-y-4">
            <h2 className="text-2xl font-bold text-green-700">
              🎉 Game Completed in {timer} seconds!
            </h2>
            <button
              onClick={restartGame}
              className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
            >
              🔄 Restart Game
            </button>
            <button
              onClick={() => (window.location.href = "/activities")}
              className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 ml-2"
            >
              🔙 Back to Activities
            </button>
          </div>
        )}
      </div>

      <div className="w-full md:w-1/3 mt-8 md:mt-0 md:ml-6">
        <h2 className="text-2xl font-semibold mb-4">✅ Matched Tips</h2>
        <ul className="text-md space-y-3">
          {explanations.map((card) => (
            <li
              key={card.id}
              className="bg-white border-l-4 border-green-500 p-3 rounded shadow"
            >
              <strong>{card.term}</strong>: {card.definition}
            </li>
          ))}
        </ul>
      </div>
    </div>
    <FooterSenior />
  </>
);

};

export default ScamMemoryGame;
