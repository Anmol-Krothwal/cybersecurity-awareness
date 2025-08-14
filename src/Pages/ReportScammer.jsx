import React, { useState } from "react";
import { scenarios } from "../Data/scenario";
import ScenarioCard from "../Components/ReportScammer/ScenarioCard";
import FeedbackBox from "../Components/ReportScammer/FeedbackBox";
import ProgressBar from "../Components/ReportScammer/ProgressBar";
import Header from "../Components/ReportScammer/Header";

// ✅ Import Navbar and Footer
import NavbarPage from "../Components/NavbarPage";    // ✅ import your navbar
import FooterTeen from "../components/FooterTeen";     // ✅ import your footer

const ReportScammer = () => {
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState(null);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [wrong, setWrong] = useState(0);

  const scenario = scenarios[index];
  const isCorrect = selected === scenario.correctAnswer;

  const handleAnswer = (ans) => {
    setSelected(ans);
    if (ans === scenario.correctAnswer) {
      setScore((prev) => prev + 1);
    } else {
      setWrong((prev) => prev + 1);
    }
  };

  const restartGame = () => {
    setIndex(0);
    setSelected(null);
    setGameOver(false);
    setScore(0);
    setWrong(0);
  };

  const nextScenario = () => {
    setSelected(null);
    if (index + 1 < scenarios.length) {
      setIndex(index + 1);
    } else {
      setGameOver(true);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <NavbarPage /> {/* ✅ Top Navbar */}

      <div className="relative flex-grow bg-gradient-to-br from-blue-100 to-yellow-100 p-6 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 animate-pulse bg-[url('/assets/bg-pattern.svg')] bg-repeat z-0" />

        <div className="relative z-10">
          <Header />

          {!gameOver && (
            <>
              <ProgressBar current={index + (selected ? 1 : 0)} total={scenarios.length} />
              {selected ? (
                <FeedbackBox isCorrect={isCorrect} reason={scenario.reason} onNext={nextScenario} />
              ) : (
                <ScenarioCard scenario={scenario} onSelect={handleAnswer} />
              )}
            </>
          )}

          {gameOver && (
            <div className="text-center mt-10">
              {score > scenarios.length / 2 ? (
                <h2 className="text-3xl font-bold text-green-600 mb-4">
                  🎉 Great job! You completed the game!
                </h2>
              ) : (
                <h2 className="text-3xl font-bold text-red-600 mb-4">
                  😢 We're sorry! Try the game again.
                </h2>
              )}

              <div className="text-lg text-gray-800 mb-6">
                <p>✅ Correct Answers: <span className="font-bold">{score}</span></p>
                <p>❌ Incorrect Answers: <span className="font-bold">{wrong}</span></p>
                <p>📊 Total Score: <span className="font-bold">{score} / {scenarios.length}</span></p>
              </div>

              <button
                onClick={restartGame}
                className="bg-yellow-400 hover:bg-yellow-500 text-black px-6 py-3 rounded-full shadow-md"
              >
                🔁 Restart Game
              </button>
            </div>
          )}
        </div>
      </div>

      <FooterTeen/> {/* ✅ Bottom Footer */}
    </div>
  );
};

export default ReportScammer;
