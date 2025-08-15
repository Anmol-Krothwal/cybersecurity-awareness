import React, { useState } from 'react';
import ChatProfile from './ChatProfile';
import questions from './questions';
import NavbarPage from '/src/Components/NavbarPage';
import FooterTeen from '/src/Components/FooterTeen';

// 🔁 Shuffle utility
const shuffleArray = (array) => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

const ScammerQuiz = () => {
  const [shuffledQuestions, setShuffledQuestions] = useState(shuffleArray(questions));
  const [current, setCurrent] = useState(0);
  const [selectedId, setSelectedId] = useState(null);
  const [result, setResult] = useState('');
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const question = shuffledQuestions[current];

  const handleSelect = (id) => {
    if (selectedId !== null) return; // prevent multiple selections

    setSelectedId(id);
    const selected = question.profiles.find((p) => p.id === id);
    const correct = selected.isScammer;

    if (correct) setScore(score + 1);

    setResult(
      correct
        ? '🎉 Great job! You caught the scammer!'
        : '😬 Oops! That’s not the scammer.'
    );
  };

  const handleNext = () => {
    if (current + 1 < shuffledQuestions.length) {
      setCurrent(current + 1);
      setSelectedId(null);
      setResult('');
    } else {
      setFinished(true);
    }
  };

  const handleRestart = () => {
    setShuffledQuestions(shuffleArray(questions));
    setCurrent(0);
    setSelectedId(null);
    setResult('');
    setScore(0);
    setFinished(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-100 via-yellow-100 to-blue-100 font-[Comic Sans MS,cursive]">
      {/* Navbar */}
      <NavbarPage />

      <div className="w-full max-w-5xl mx-auto px-4 py-6">
        <div className="bg-white rounded-3xl shadow-xl p-6 sm:p-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-center text-pink-600 mb-4">
            🕵️‍♀️ Who's the Scammer?
          </h1>

          {finished ? (
            <div className="text-center mt-6 space-y-3">
              <h2 className="text-2xl text-green-700 font-bold">🎉 Quiz Complete!</h2>
              <p className="text-lg text-purple-800">
                You caught <strong>{score}</strong> out of <strong>{shuffledQuestions.length}</strong> scammers!
              </p>
              <button
                onClick={handleRestart}
                className="bg-indigo-500 hover:bg-indigo-600 text-white px-6 py-2 rounded-full text-sm shadow-md"
              >
                🔁 Restart
              </button>
            </div>
          ) : (
            <>
              <h2 className="text-lg sm:text-xl text-center text-blue-900 mb-4 font-semibold">
                💬 School Group Chat - Question {current + 1}
              </h2>

              {/* Two left, two right layout */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-4">
                {question.profiles.map((profile) => (
                  <div key={profile.id} className="flex justify-center">
                    <ChatProfile
                      profile={profile}
                      onSelect={handleSelect}
                      isSelected={selectedId === profile.id}
                    />
                  </div>
                ))}
              </div>

              {result && (
                <>
                  <div className="bg-yellow-100 rounded-xl text-center text-gray-800 p-3 font-medium shadow-sm">
                    {result}
                  </div>
                  <div className="text-center mt-4">
                    <button
                      onClick={handleNext}
                      className="bg-pink-500 hover:bg-pink-600 text-white px-5 py-2 rounded-full shadow-md text-sm"
                    >
                      ➡️ Next Question
                    </button>
                  </div>
                </>
              )}
            </>
          )}
        </div>
      </div>

      {/* Footer */}
      <FooterTeen />
    </div>
  );
};

export default ScammerQuiz;
