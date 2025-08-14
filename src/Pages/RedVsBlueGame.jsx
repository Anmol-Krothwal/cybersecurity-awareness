import React, { useState } from 'react';
import Confetti from 'react-confetti';
import { Tooltip as ReactTooltip } from 'react-tooltip';


const quizData = [
  {
    team: 'red',
    concept: 'SQL Injection (SQLi)',
    question: 'What is SQL Injection?',
    options: [
      { text: 'Encrypting SQL commands', isCorrect: false },
      { text: 'Manipulating input to run unintended queries', isCorrect: true },
      { text: 'Blocking SQL ports on firewalls', isCorrect: false },
    ],
    explanation: 'SQL Injection allows attackers to tamper with SQL queries.',
    action: 'Red Team exploited login with SQLi.',
    hint: 'Think about altering backend database logic with user input.',
  },
  {
    team: 'blue',
    concept: 'Web Application Firewall (WAF)',
    question: 'How does a WAF defend against SQLi?',
    options: [
      { text: 'Blocks unsafe input patterns', isCorrect: true },
      { text: 'Backs up the database', isCorrect: false },
      { text: 'Disables firewalls', isCorrect: false },
    ],
    explanation: 'WAFs filter requests and block known attacks.',
    action: 'Blue Team activated WAF.',
    hint: 'Focus on filtering malicious traffic.',
  },
  // Add more...
];

// Bonus question pool
const bonusQuestions = [
  {
    concept: 'Zero Trust',
    question: 'What’s a core principle of Zero Trust?',
    options: [
      { text: 'Never trust, always verify', isCorrect: true },
      { text: 'Trust internal devices by default', isCorrect: false },
      { text: 'Allow admin access to all', isCorrect: false },
    ],
    explanation: 'Zero Trust treats all access as untrusted by default.',
    hint: 'No implicit trust — everything is verified.',
  },
  {
    concept: 'XSS',
    question: 'What does XSS allow attackers to do?',
    options: [
      { text: 'Execute scripts in other users’ browsers', isCorrect: true },
      { text: 'Encrypt the server', isCorrect: false },
      { text: 'Block JavaScript', isCorrect: false },
    ],
    explanation: 'XSS injects malicious scripts to steal data or hijack sessions.',
    hint: 'Think of script tags inside user input.',
  },
];

const glossary = {
  SQLi: 'SQL Injection is a code injection technique used to manipulate backend queries.',
  CSRF: 'Cross-Site Request Forgery tricks users into executing unwanted actions.',
  XSS: 'Cross-Site Scripting lets attackers inject and execute malicious scripts.',
  WAF: 'Web Application Firewall filters and monitors HTTP requests.',
  MFA: 'Multi-Factor Authentication uses more than one verification method.',
};

const RedVsBlueLearnGame = () => {
  const [turnIndex, setTurnIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [log, setLog] = useState([]);
  const [recap, setRecap] = useState([]);
  const [gameEnded, setGameEnded] = useState(false);

  const isBonusRound = (turnIndex + 1) % 5 === 0;
  const question = isBonusRound
    ? bonusQuestions[Math.floor((turnIndex / 5) % bonusQuestions.length)]
    : quizData[turnIndex % quizData.length];
  const handleAnswer = (isCorrect) => {
    setSelected(isCorrect);
    setShowExplanation(true);
    setShowHint(false);

    if (isCorrect) {
      const points = isBonusRound ? 2 : 1;
      setScore(score + points);
      if (!isBonusRound) {
        const logMsg = `${question.team === 'red' ? 'Red Team' : 'Blue Team'}: ${question.action}`;
        setLog((prev) => [...prev, logMsg]);
      }
      setShowConfetti(true);
    }

    setRecap((prev) => [
      ...prev,
      {
        concept: question.concept,
        correct: isCorrect,
        isBonus: isBonusRound,
      },
    ]);

    setTimeout(() => {
      setShowConfetti(false);
      nextTurn();
    }, 2500);
  };

  const nextTurn = () => {
    const isLastTurn = turnIndex + 1 >= quizData.length + Math.floor(quizData.length / 5);
    if (isLastTurn) {
      setGameEnded(true);
    } else {
      setTurnIndex((prev) => prev + 1);
      setSelected(null);
      setShowExplanation(false);
    }
  };

  const glossaryTooltip = (text) => {
    const keys = Object.keys(glossary);
    for (let key of keys) {
      const re = new RegExp(`\\b${key}\\b`, 'gi');
      text = text.replace(
        re,
        `<span data-tip="${glossary[key]}" class="underline text-yellow-300 cursor-help">${key}</span>`
      );
    }
    return text;
  };

  const resetGame = () => {
    setTurnIndex(0);
    setScore(0);
    setSelected(null);
    setShowExplanation(false);
    setShowConfetti(false);
    setShowHint(false);
    setLog([]);
    setRecap([]);
    setGameEnded(false);
  };

  return (
    <div className="min-h-screen bg-black text-white px-6 py-10 flex flex-col items-center font-mono">
      <ReactTooltip multiline={true} place="top" effect="solid" />

      {showConfetti && <Confetti numberOfPieces={120} recycle={false} />}
      <h1 className="text-4xl font-bold mb-4 text-center">
        Red vs Blue: Cybersecurity Simulation
      </h1>

      {!gameEnded ? (
        <>
          <p className="text-green-400 text-center mb-4">
            {isBonusRound ? '🎯 BONUS ROUND! Reversed Roles!' : 'Answer the question to continue'}
          </p>

          <div className="w-full max-w-3xl bg-gray-900 p-6 rounded-lg border border-green-500">
            <h2 className="text-xl text-center mb-4">
              {question.team === 'red' ? '🔴 Red Team' : '🔵 Blue Team'} – {question.concept}
            </h2>
            <p
              className="mb-4"
              dangerouslySetInnerHTML={{ __html: glossaryTooltip(question.question) }}
            ></p>

            <button
              onClick={() => setShowHint(!showHint)}
              className="mb-3 text-sm text-blue-300 hover:text-blue-100 underline"
            >
              {showHint ? 'Hide Hint' : '💡 Show Hint'}
            </button>

            {showHint && (
              <div className="text-yellow-300 mb-4 text-sm bg-gray-800 px-3 py-2 rounded border border-yellow-500">
                Hint: {question.hint}
              </div>
            )}

            <div className="flex flex-col gap-3">
              {question.options.map((opt, idx) => (
                <button
                  key={idx}
                  className={`px-4 py-2 rounded-md text-left border transition-all ${
                    selected !== null
                      ? opt.isCorrect
                        ? 'bg-green-600 border-green-400'
                        : 'bg-red-600 border-red-400'
                      : 'bg-gray-800 hover:bg-gray-700 border-gray-600'
                  }`}
                  onClick={() => selected === null && handleAnswer(opt.isCorrect)}
                  disabled={selected !== null}
                >
                  {opt.text}
                </button>
              ))}
            </div>

            {showExplanation && (
              <div className="mt-4 p-4 rounded-md bg-gray-800 border border-yellow-400 text-yellow-300 text-sm">
                <strong>Explanation:</strong> {question.explanation}
              </div>
            )}
          </div>

          <div className="mt-6 text-sm text-gray-400">
            ✅ Score: {score} / {quizData.length + Math.floor(quizData.length / 5) * 2}
          </div>
        </>
      ) : (
        <>
          <h2 className="text-2xl text-green-400 mb-4">📘 What You Learned</h2>
          <div className="bg-gray-900 p-5 rounded-lg border border-green-500 w-full max-w-3xl text-sm">
            {recap.map((item, i) => (
              <div
                key={i}
                className={`mb-2 ${
                  item.correct ? 'text-green-400' : 'text-red-400'
                }`}
              >
                {item.isBonus ? '🎯 Bonus – ' : ''}{item.concept}: {item.correct ? 'Correct' : 'Incorrect'}
              </div>
            ))}
          </div>

          <div className="mt-6">
            <button
              onClick={resetGame}
              className="px-5 py-2 bg-green-600 hover:bg-green-700 rounded text-white"
            >
              🔁 Play Again
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default RedVsBlueLearnGame;
