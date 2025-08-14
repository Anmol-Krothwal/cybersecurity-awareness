import React, { useState, useEffect } from "react";
import Confetti from "react-confetti";
import { motion } from "framer-motion";
import NavbarAdult from "../../Components/NavbarAdult";
import FooterAdult from "../../Components/FooterAdult";

const initialState = {
  step: 0,
  score: 0,
  timer: 30,
  hintsUsed: 0,
  bookmarked: [],
  confidence: 50,
  showHint: false,
  explanation: "",
  selected: null,
  darkMode: false,
  responses: [],
  badges: [],
};

const scenarios = [
  {
    id: 1,
    difficulty: "Easy",
    communityCorrect: 84,
    optionA: {
      title: "Coach Leather Tote",
      price: "€180",
      description: "Authentic, gently used, includes receipt.",
      image: "/assets/Image/Scamtestitem/item1.jpg",
      isCorrect: true,
      clues: ["Includes receipt", "Fair market price"],
    },
    optionB: {
      title: "COACH BAG REAL!!",
      price: "€25",
      description: "Only today 25€!! No receipt. Fast ship!!!",
      image: "/assets/Image/Scamtestitem/item1.jpg",
      isCorrect: false,
      clues: ["All caps", "Too cheap", "No receipt"],
    },
    reasonCorrect: "This listing includes a receipt and realistic pricing, which shows transparency. It reflects a genuine second-hand sale.",
    reasonWrong: "Scammers often use urgent, flashy language and ultra-low prices. The missing receipt and exaggerated claims raise red flags.",
    hint: "Check for receipts or seller reviews.",
  },
  {
    id: 2,
    difficulty: "Easy",
    communityCorrect: 89,
    optionA: {
      title: "PlayStation 5 – €100 ONLY!",
      price: "€100",
      description: "New. Buy fast. DM now. Limited stock! ",
      image: "/assets/Image/Scamtestitem/item2fake.jpg",
      isCorrect: false,
      clues: ["Too cheap", "Urgent language"],
    },
    optionB: {
      title: "PS5 Bundle with Games ",
      price: "€480",
      description: "Barely used PS5 with 2 controllers and games.",
      image: "/assets/Image/Scamtestitem/item2real.jpg",
      isCorrect: true,
      clues: ["Complete bundle", "Reasonable price "],
    },
    reasonCorrect: "The bundle is priced within reason and provides clear details, including accessories and usage history.",
    reasonWrong: "Offers that push urgency and offer unrealistic prices are classic bait scams. Always compare with market value.",
    hint: "Compare the price with market value.",
  },
  {
    id: 3,
    difficulty: "Medium",
    communityCorrect: 76,
    optionA: {
      title: "iPhone 13 - New - €180",
      price: "€180",
      description: "Brand new, won in contest, quick deal only!",
      image: "/assets/Image/Scamtestitem/item3.jpeg",
      isCorrect: false,
      clues: ["Contest win", "Quick deal"],
    },
    optionB: {
      title: "iPhone 13 – 256GB ",
      price: "€580",
      description: " 6 months old, unlocked, box included.",
      image: "/assets/Image/Scamtestitem/item3.jpeg",
      isCorrect: true,
      clues: ["Unlocked", "Box included"],
    },
    reasonCorrect: "The seller offers verifiable details and packaging, making the offer more credible.",
    reasonWrong: "Sellers using 'contest win' or limited-time excuses often cannot back up the source of the item.",
    hint: "Avoid listings with no proof of ownership.",
  },
  {
    id: 4,
    difficulty: "Medium",
    communityCorrect: 71,
    optionA: {
      title: "Beats Headphones Studio3",
      price: "€120",
      description: "Boxed, barely used, receipt available.",
      image: "/assets/Image/Scamtestitem/item4.jpg",
      isCorrect: true,
      clues: ["Receipt available", "Boxed"],
    },
    optionB: {
      title: "BEATS HEADPHONES – ONLY €35",
      price: "€35",
      description: "No returns. Price final. Looks same as real.",
      image: "/assets/Image/Scamtestitem/item4.jpg",
      isCorrect: false,
      clues: ["Price final", "No returns"],
    },
    reasonCorrect: "The listing includes original packaging and proof of purchase, indicating a legitimate item.",
    reasonWrong: "Low price combined with 'no return' and vague claims is a classic sign of counterfeit goods.",
    hint: "Check for return policies and receipts.",
  },
  {
    id: 5,
    difficulty: "Hard",
    communityCorrect: 63,
    optionA: {
      title: "Office Chair Pro – Great Deal",
      price: "€110",
      description: "From old office. Pickup only. Cash now.",
      image: "/assets/Image/Scamtestitem/item51.jpg",
      isCorrect: false,
      clues: ["Cash only", "Pickup only"],
    },
    optionB: {
      title: "Ergonomic Office Chair",
      price: "€130",
      description: "Used 1 year, adjustable height, invoice available.",
      image: "/assets/Image/Scamtestitem/item5.jpg",
      isCorrect: true,
      clues: [" Invoice available", "Adjustable height"],
    },
    reasonCorrect: "This seller provides clear usage history and invoice – a trustworthy sign for office equipment.",
    reasonWrong: "Cash-only deals with no verification or flexibility often point to stolen or non-existent goods.",
    hint: "Avoid listings that demand instant pickup or cash.",
  },
  {
    id: 6,
    difficulty: "Easy",
    communityCorrect: 92,
    optionA: {
      title: "Kindle Paperwhite",
      price: "€80",
      description: "Lightly used, with charger, no scratches.",
      image: "/assets/Image/Scamtestitem/item6.jpg",
      isCorrect: true,
      clues: ["With charger", "No scratches"],
    },
    optionB: {
      title: "KINDLE JUST €15!!!",
      price: "€15",
      description: "Don’t ask questions. It works. First come.",
      image: "/assets/Image/Scamtestitem/item61.jpg",
      isCorrect: false,
      clues: ["All caps", "No details"],
    },
    reasonCorrect: "Seller offers full description and accessories. Price is appropriate for used tech in good condition.",
    reasonWrong: "The vague and pushy language, plus extreme low price, are strong indicators of a scam.",
    hint: "Look for complete descriptions and photos.",
  },
  {
    id: 7,
    difficulty: "Medium",
    communityCorrect: 75,
    optionA: {
      title: "Smartwatch – No Receipt",
      price: "€60",
      description: "Gifted. Don’t need it. No questions.",
      image: "/assets/Image/Scamtestitem/item71.jpg",
      isCorrect: false,
      clues: ["No receipt", "Gift excuse"],
    },
    optionB: {
      title: "Samsung Smartwatch",
      price: "€140",
      description: "Latest model. Comes with 2 straps & warranty.",
      image: "/assets/Image/Scamtestitem/item7.png",
      isCorrect: true,
      clues: ["Warranty", "Extra straps"],
    },
    reasonCorrect: "The seller includes warranty and extras, increasing trust and reliability in the listing.",
    reasonWrong: "Lack of receipt and vague 'gifted' excuse suggests they can't prove ownership. A common scam method.",
    hint: "Check for receipts, especially with electronics.",
  },
  {
    id: 8,
    difficulty: "Hard",
    communityCorrect: 59,
    optionA: {
      title: "MacBook Air M2",
      price: "€980",
      description: "Perfect condition, original box & receipt.",
      image: "/assets/Image/Scamtestitem/item8.jpeg",
      isCorrect: true,
      clues: ["Original box", "Receipt"],
    },
    optionB: {
      title: "Macbook – Don’t Ask How I Got It",
      price: "€350",
      description: "No box. No receipt. It works tho.",
      image: "/assets/Image/Scamtestitem/item81.jpeg",
      isCorrect: false,
      clues: ["No box", "Suspicious language"],
    },
    reasonCorrect: "Proper documentation, packaging, and a reasonable price point reflect genuine intent to sell.",
    reasonWrong: "Vague and shady language like 'don’t ask' signals illegitimacy and risk.",
    hint: "Avoid listings with red-flag phrases.",
  },
  {
    id: 9,
    difficulty: "Medium",
    communityCorrect: 77,
    optionA: {
      title: "Switch. Fast Buy Now.",
      price: "€90",
      description: "Game system. No time. Just take it.",
      image: "/assets/Image/Scamtestitem/item91.jpg",
      isCorrect: false,
      clues: ["Urgent", "Low detail"],
    },
    optionB: {
      title: "Nintendo Switch + Games",
      price: "€250",
      description: "Selling my Switch with 3 games & charger.",
      image: "/assets/Image/Scamtestitem/item9.jpg",
      isCorrect: true,
      clues: ["Games included", "With charger"],
    },
    reasonCorrect: "Bundle includes games, charger, and clear reason for sale. Price aligns with second-hand value.",
    reasonWrong: "Scam listings often omit details, rush the buyer, and use vague terms. This is a strong red flag.",
    hint: "More info usually means safer sellers.",
  },
  {
    id: 10,
    difficulty: "Hard",
    communityCorrect: 62,
    optionA: {
      title: "LG OLED 55” TV",
      price: "€600",
      description: "Genuine, 1-year old, remote & manual included.",
      image: "/assets/Image/Scamtestitem/item10.jpg",
      isCorrect: true,
      clues: ["Manual", "1-year old"],
    },
    optionB: {
      title: "TV FAST SALE",
      price: "€150",
      description: "No questions. Bring car. Pay now.",
      image: "/assets/Image/Scamtestitem/item101.jpg",
      isCorrect: false,
      clues: ["No questions", "Cash now"],
    },
    reasonCorrect: "Legitimate listing with full product info and accessories. Seller sounds reasonable and transparent.",
    reasonWrong: "When sellers say 'no questions' and want cash immediately, it’s often a scam trap.",
    hint: "Sellers with nothing to hide give details.",
  },
];

const KnowledgeBar = ({ correct, total }) => {
  const percent = Math.round((correct / total) * 100);
  return (
    <div className="mb-6">
      <p className="text-sm font-medium text-gray-800 mb-1">
        🎯 Knowledge Progress: {percent}%
      </p>
      <div className="w-full bg-gray-300 rounded-full h-3 overflow-hidden">
        <div
          className="bg-green-500 h-full transition-all duration-300 ease-in-out"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
};

// ✅ Glossary remains unchanged
const ScamGlossary = () => {
  const terms = {
    "Urgency Scam": "Pressures you to act quickly with threats or deals.",
    "No Reviews": "No verified buyer feedback.",
    "Too Cheap": "Unrealistically low price for product category.",
  };
  return (
    <div className="mt-10 bg-gray-100 p-4 rounded shadow">
      <h3 className="font-semibold mb-2">Scam Glossary</h3>
      <ul className="list-disc list-inside text-sm text-gray-800">
        {Object.entries(terms).map(([term, def]) => (
          <li key={term}>
            <strong>{term}</strong>: {def}
          </li>
        ))}
      </ul>
    </div>
  );
};

const MarketplaceScamTest = () => {
  const [state, setState] = useState(initialState);
  const scenario = scenarios[state.step];
  const isCompleted = state.step >= scenarios.length;

  useEffect(() => {
    if (state.timer > 0 && !state.selected) {
      const t = setTimeout(() => {
        setState((prev) => ({ ...prev, timer: prev.timer - 1 }));
      }, 1000);
      return () => clearTimeout(t);
    }
  }, [state.timer, state.selected]);

  const handleChoice = (key) => {
    const option = scenario[key];
    const correct = option.isCorrect;
    const newScore = correct ? state.score + 1 : state.score;

    const newResponses = [
      ...state.responses,
      {
        id: scenario.id,
        selected: key,
        correct,
        explanation: state.explanation,
        confidence: state.confidence,
        time: 30 - state.timer,
      },
    ];

    let badges = [...state.badges];
    if (correct) {
      const lastTwoCorrect = state.responses.slice(-2).every((r) => r.correct);
      if (lastTwoCorrect && !badges.includes("3-in-a-row")) {
        badges.push("3-in-a-row");
      }
    }

    setState((prev) => ({
      ...prev,
      selected: key,
      responses: newResponses,
      score: newScore,
      badges,
    }));

    setTimeout(() => {
      if (state.step + 1 < scenarios.length) {
        setState((prev) => ({
          ...initialState,
          step: prev.step + 1,
          score: newScore,
          badges,
          responses: newResponses,
        }));
      } else {
        setState((prev) => ({
          ...prev,
          selected: null,
          step: scenarios.length,
        }));
      }
    }, 3500);
  };

  const revealHint = () => {
    if (!state.showHint && state.hintsUsed < 1) {
      setState((prev) => ({
        ...prev,
        showHint: true,
        hintsUsed: prev.hintsUsed + 1,
      }));
    }
  };

  const handleBookmark = () => {
    if (!state.bookmarked.includes(scenario.id)) {
      setState((prev) => ({
        ...prev,
        bookmarked: [...prev.bookmarked, scenario.id],
      }));
    }
  };

  return (
    <div
      className="min-h-screen bg-center bg-no-repeat bg-cover"
      style={{
        backgroundImage: `url("/assets/Image/bg-1.jpg")`,
        backgroundSize: "contain",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "top center",
      }}
    >
      <div className="bg-white/50 min-h-screen flex flex-col text-gray-900">
        <NavbarAdult/>

        <main className="flex-grow px-4 py-4">
          <div className="max-w-7xl mx-auto">
            {!isCompleted ? (
              <>
                <KnowledgeBar correct={state.score} total={scenarios.length} />

                <p className="text-sm text-gray-600 mb-4">
                  Scenario {state.step + 1} of {scenarios.length} • Difficulty:{" "}
                  {scenario.difficulty} • Timer: {state.timer}s
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  {["optionA", "optionB"].map((key) => {
                    const opt = scenario[key];
                    const isSelected = state.selected === key;

                    return (
                      <motion.div
                        key={key}
                        whileHover={{ scale: 1.02 }}
                        className={`border rounded-lg shadow-md p-4 transition ${
                          isSelected
                            ? opt.isCorrect
                              ? "border-green-500 bg-green-50"
                              : "border-red-500 bg-red-50"
                            : "border-gray-300 bg-white"
                        }`}
                      >
                        <img
                          src={opt.image}
                          alt={opt.title}
                          className="h-48 w-full object-contain rounded mb-3"
                        />
                        <h3 className="font-bold mb-1">{opt.title}</h3>
                        <p className="text-indigo-700 font-semibold mb-2">
                          {opt.price}
                        </p>
                        <p className="text-sm mb-2">{opt.description}</p>
                        <div className="flex flex-wrap gap-2 text-xs mb-3">
                          {opt.clues.map((clue, i) => (
                            <span
                              key={i}
                              className={`px-2 py-1 rounded-full ${
                                opt.isCorrect
                                  ? "bg-green-100 text-green-800"
                                  : "bg-yellow-100 text-yellow-800"
                              }`}
                            >
                              {clue}
                            </span>
                          ))}
                        </div>
                        <button
                          onClick={() => handleChoice(key)}
                          disabled={state.selected}
                          className="mt-2 bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 text-sm"
                        >
                          I’d Buy This
                        </button>
                      </motion.div>
                    );
                  })}
                </div>

                {state.selected && (
                  <div
                    className={`p-4 rounded shadow text-sm mt-4 ${
                      scenario[state.selected].isCorrect
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {scenario[state.selected].isCorrect
                      ? `✅ ${scenario.reasonCorrect}`
                      : `❌ ${scenario.reasonWrong}`}
                  </div>
                )}

                <div className="flex items-center justify-between mb-6 text-sm mt-4">
                  <button
                    onClick={revealHint}
                    disabled={state.hintsUsed > 0}
                    className="underline text-indigo-600"
                  >
                    💡 {state.showHint ? "Hint used" : "Use Hint"}
                  </button>
                </div>

                {state.showHint && (
                  <div className="mb-4 bg-yellow-100 text-yellow-800 px-4 py-2 rounded shadow text-sm">
                    Hint: {scenario.hint}
                  </div>
                )}

                {/* ✅ Fixed Confidence Range */}
                <div className="mb-6">
                <label className="block text-sm font-medium text-gray-800 mb-1">
                  🧠 Confidence Level: {state.confidence}%
                </label>

                <input
                  type="range"
                  min="0"
                  max="100"
                  step="1"
                  value={state.confidence}
                  onChange={(e) =>
                    setState((prev) => ({
                      ...prev,
                      confidence: Number(e.target.value),
                    }))
                  }
                  className="w-full accent-indigo-600"
                />

                <div className="mt-2 text-sm text-gray-600">
                  {
                    state.confidence >= 80
                      ? "🔒 You're very confident in this choice!"
                      : state.confidence >= 50
                      ? "👍 You feel fairly confident."
                      : state.confidence >= 30
                      ? "😐 You're unsure about this option."
                      : "⚠️ You're not confident at all. Consider using a hint!"
                  }
                </div>
              </div>

              </>
            ) : (
              <>
                <h2 className="text-xl font-bold mb-4">
                  🎉 You finished the test!
                </h2>
                <p className="text-md mb-2">
                  Score: {state.score} / {scenarios.length}
                </p>
                <p className="text-sm text-gray-600 mb-4">
                  Badges: {state.badges.join(", ") || "None earned yet"}
                </p>

                <div className="mb-6">
                  <h3 className="font-semibold mb-2">Missed Scenarios:</h3>
                  <ul className="list-disc list-inside text-sm text-red-700">
                    {state.responses
                      .filter((r) => !r.correct)
                      .map((r, i) => (
                        <li key={i}>
                          Scenario #{r.id} – Confidence: {r.confidence}% – Time
                          Taken: {r.time}s
                        </li>
                      ))}
                  </ul>
                  <button
                    className="mt-4 text-indigo-600 underline"
                    onClick={() => alert("Download feature coming soon")}
                  >
                    📥 Download Top 10 Scam Signals
                  </button>
                </div>

                <ScamGlossary />

                <div className="flex flex-col md:flex-row items-center gap-4 mt-10">
                <button
                  onClick={() => setState(initialState)}
                  className="px-6 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
                >
                  🔁 Restart Test
                </button>

                <button
                  onClick={() => window.location.href = "/AdultAct"}
                  className="px-6 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
                >
                  🔙 Back to Activities
                </button>
              </div>
              </>
            )}
          </div>
        </main>

        <FooterAdult/>
      </div>
    </div>
  );
};

export default MarketplaceScamTest;