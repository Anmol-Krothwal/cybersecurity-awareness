// src/Components/InteractiveChallenge.jsx
import React, { useState } from "react";

const InteractiveChallenge = ({ type, challenge, updateScore, onNextQuestion }) => {
  const [feedback, setFeedback] = useState("");
  const [input, setInput] = useState("");

  const handleDare = (option) => {
    let correct = false;
    if (
      option === "M@ncy2024!" ||
      option.toLowerCase().includes("drawing") ||
      option.toLowerCase().includes("ignore")
    ) {
      setFeedback("✅ 🎉 Great choice! You’re staying safe online.");
      correct = true;
    } else {
      setFeedback("❌ 🚫 Try again. That choice can be risky.");
    }

    updateScore(correct);

    // Move to next question after short delay
    setTimeout(() => {
      setFeedback("");
      onNextQuestion();
    }, 1500);
  };

  const handleTruth = () => {
    const answer = input.trim().toLowerCase();

    if (!answer) {
      setFeedback("⚠️ Please type your answer before submitting.");
      return;
    }

    if (answer !== "yes" && answer !== "no") {
      setFeedback("❗ Please answer with 'yes' or 'no' only.");
      return;
    }

    if (answer === "yes") {
      setFeedback("⚠️ 🧐 Be cautious next time.");
      updateScore(false);
    } else {
      setFeedback("✅ 🌟 Awesome! You're making smart decisions.");
      updateScore(true);
    }

    setInput("");

    // Move to next question after short delay
    setTimeout(() => {
      setFeedback("");
      onNextQuestion();
    }, 1500);
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-md max-w-xl w-full mt-6">
      <h2 className="text-xl font-bold mb-4">
        {type.toUpperCase()}: {challenge.title}
      </h2>

      {type === "dare" && (
        <div className="space-y-2">
          {challenge.options.map((option, idx) => (
            <button
              key={idx}
              onClick={() => handleDare(option)}
              className="block w-full bg-blue-200 hover:bg-blue-300 p-2 rounded-md"
            >
              {option}
            </button>
          ))}
        </div>
      )}

      {type === "truth" && (
        <div>
          <input
            type="text"
            placeholder="Type 'yes' or 'no'..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="w-full p-2 border mt-2 rounded-md"
          />
          <button
            onClick={handleTruth}
            className="bg-purple-500 text-white mt-3 px-4 py-2 rounded-md"
            disabled={!input.trim()}
          >
            Submit
          </button>
        </div>
      )}

      {feedback && <p className="mt-4 text-lg font-semibold">{feedback}</p>}
    </div>
  );
};

export default InteractiveChallenge;
