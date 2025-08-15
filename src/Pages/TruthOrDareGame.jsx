// src/Pages/TruthOrDareGame.jsx
import React, { useState } from "react";
import InteractiveChallenge from "../Components/InteractiveChallenge";
import Confetti from 'react-confetti';
import { useWindowSize } from '@react-hook/window-size';
import NavbarPage from "../Components/NavbarPage";    
import FooterTeen from "../Components/FooterTeen";     

const allChallenges = {
  truth: [
    { title: "Have you ever clicked a link from a stranger? (yes/no)" },
    { title: "Have you used the same password for more than 1 app? (yes/no)" },
    { title: "Do you think your online friends are always trustworthy? (yes/no)" },
    { title: "Have you shared your birthday publicly online? (yes/no)" },
    { title: "Have you posted your home address online? (yes/no)" },
    { title: "Have you told someone your school name on a game chat? (yes/no)" },
    { title: "Have you skipped updating your apps because it's boring? (yes/no)" },
    { title: "Have you accepted a follow request from someone you don't know? (yes/no)" },
    { title: "Have you downloaded an app without asking an adult? (yes/no)" },
    { title: "Have you ever used public Wi-Fi without a password? (yes/no)" }
  ],
  dare: [
    {
      title: "Pick the strongest password:",
      options: ["password123", "M@ncy2024!", "abc123"]
    },
    {
      title: "Choose a safe photo to post online:",
      options: [
        "A picture in school uniform showing school name",
        "A close-up selfie at home",
        "A drawing or pet photo without location"
      ]
    },
    {
      title: "Choose what you should do before clicking a suspicious link:",
      options: [
        "Click and see where it goes",
        "Ignore or check with an adult",
        "Share it with friends"
      ]
    },
    {
      title: "Select the best way to remember your passwords:",
      options: [
        "Write them on a sticky note",
        "Tell them to a friend",
        "Use a password manager"
      ]
    },
    {
      title: "Pick the safest group chat setting:",
      options: [
        "Anyone can join",
        "Only invited friends can join",
        "Link posted on social media"
      ]
    },
    {
      title: "What should you do if someone online makes you uncomfortable?",
      options: [
        "Block and report them",
        "Keep chatting but stay quiet",
        "Give them another chance"
      ]
    },
    {
      title: "Choose the safest username:",
      options: [
        "Tommy123_London",
        "GamerGirl12",
        "SparkleRainbow42"
      ]
    },
    {
      title: "Pick what to do if your friend sends a sketchy link:",
      options: [
        "Click it quickly before it expires",
        "Ask them if it's safe and check with an adult",
        "Forward it to other friends"
      ]
    },
    {
      title: "Select what info is safe to share on your profile:",
      options: [
        "Your favorite cartoon character",
        "Your full home address",
        "Your school timetable"
      ]
    },
    {
      title: "Choose the best action if you're cyberbullied:",
      options: [
        "Ignore it and hope it stops",
        "Take screenshots and tell a trusted adult",
        "Start bullying them back"
      ]
    }
  ]
};


const TruthOrDareGame = () => {
  const [width, height] = useWindowSize();
  const [current, setCurrent] = useState(null);
  const [turns, setTurns] = useState(0);
  const [score, setScore] = useState({ correct: 0, incorrect: 0 });
  const [gameOver, setGameOver] = useState(false);

  const getRandom = (type) => {
    const items = allChallenges[type];
    const random = items[Math.floor(Math.random() * items.length)];
    setCurrent({ type, challenge: random });
  };

  const handleScoreUpdate = (isCorrect) => {
    setScore((prev) => ({
      correct: isCorrect ? prev.correct + 1 : prev.correct,
      incorrect: !isCorrect ? prev.incorrect + 1 : prev.incorrect
    }));

    setTurns((prev) => {
      const updatedTurns = prev + 1;
      if (updatedTurns >= 10) setGameOver(true);
      return updatedTurns;
    });
  };

  const restartGame = () => {
    setScore({ correct: 0, incorrect: 0 });
    setTurns(0);
    setGameOver(false);
    setCurrent(null);
  };

  const nextQuestion = () => {
    setCurrent(null);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <NavbarPage/> {/* ✅ Navbar */}

      <div className="flex-grow bg-gradient-to-br from-blue-100 to-pink-100 p-8 flex flex-col items-center justify-start text-center">
        <h1 className="text-4xl font-extrabold mb-6 text-purple-800 drop-shadow-lg">
          🎲 Cyber Truth or Dare Game
        </h1>

        {gameOver ? (
          <div className="relative">
            {score.correct >= 3 && <Confetti width={width} height={height} numberOfPieces={300} />}

            <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-xl relative z-10">
              <h2 className="text-3xl font-bold text-purple-700 mb-4">🎉 Game Over!</h2>
              <p className="text-lg">
                ✅ Correct Answers: {score.correct} <br />
                ❌ Unsafe Choices: {score.incorrect}
              </p>
              <p className="mt-4 text-xl font-semibold">
                {score.correct >= 3
                  ? "🌟 Great job! You’re a Cyber Star!"
                  : "😅 Oops! Try again and stay cyber safe!"}
              </p>
              <button
                onClick={restartGame}
                className="mt-6 bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-full text-lg"
              >
                🔁 Restart Game
              </button>
            </div>
          </div>
        ) : (
          <>
            <div className="flex gap-4 mb-6">
              <button
                onClick={() => getRandom("truth")}
                className="bg-purple-500 hover:bg-purple-600 text-white px-6 py-3 rounded-full text-xl"
              >
                Pick Truth
              </button>
              <button
                onClick={() => getRandom("dare")}
                className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-full text-xl"
              >
                Pick Dare
              </button>
            </div>

            {current && (
              <InteractiveChallenge
                type={current.type}
                challenge={current.challenge}
                updateScore={handleScoreUpdate}
                onNextQuestion={nextQuestion}
              />
            )}

            <div className="mt-8 text-lg font-semibold">
              🧠 Correct: {score.correct} | 🚨 Unsafe: {score.incorrect} | 🔢 Turns: {turns}/10
            </div>
          </>
        )}
      </div>

      <FooterTeen/> {/* ✅ Footer */}
    </div>
  );
};

export default TruthOrDareGame;