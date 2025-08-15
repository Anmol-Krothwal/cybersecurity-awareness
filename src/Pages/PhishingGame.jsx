import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Confetti from "react-confetti";
import { motion } from "framer-motion";
import { useTheme } from "../Components/Themecontext";
import NavbarPage from "../Components/NavbarPage";    // ✅ import your navbar
import FooterTeen from "../Components/FooterTeen"; 

const phishingQuestions = [
  {
    id: 1,
    email: {
      subject: "Monthly Newsletter - School Safety Tips",
      body: "Read about how to stay safe online at school.",
      from: "safety@school.org"
    },
    correct: "real",
    reason: "No links, known sender – seems safe."
  },
  {
    id: 2,
    email: {
      subject: "Claim your Amazon gift card now!",
      body: "You're the lucky winner. Redeem in the next 10 minutes.",
      from: "reward@amaz0nprize.net"
    },
    correct: "fake",
    reason: "Impersonates Amazon with a fake domain and urgency."
  },
  {
    id: 3,
    email: {
      subject: "🎬 Drama Club - Rehearsal Updates",
      body: "This week's rehearsal has moved to Room 203.",
      from: "drama@school.edu"
    },
    correct: "real",
    reason: "Normal message, school-related, no sketchy links."
  },
  {
    id: 4,
    email: {
      subject: "Urgent: Your student loan will be canceled!",
      body: "We urgently need you to log in using the link below to keep your student loan active.",
      from: "contact@studentloanuk.com"
    },
    correct: "fake",
    reason: "Urgent tone and suspicious link = classic phishing."
  },
  {
    id: 5,
    email: {
      subject: "🛑 Your Gmail storage is full",
      body: "Log in here to avoid losing your data.",
      from: "mail-support@google-checker.com"
    },
    correct: "fake",
    reason: "Fake support addresses and urgent tone = phishing."
  },
  {
    id: 6,
    email: {
      subject: "Your library books are overdue",
      body: "Please return them before Friday to avoid a fine.",
      from: "library@localedu.org"
    },
    correct: "real",
    reason: "Normal tone and believable context from a school address."
  },
  {
    id: 7,
    email: {
      subject: "🎁 You've won a free iPhone!",
      body: "Click here to claim your prize. Only 1 hour left!",
      from: "prizes@iphonedeals.win"
    },
    correct: "fake",
    reason: "Free gifts with urgency usually mean a scam."
  },
  {
    id: 8,
    email: {
      subject: "Important: COVID-19 Test Results",
      body: "Download your test results immediately from this link.",
      from: "covid-check@alerts.org"
    },
    correct: "fake",
    reason: "Phishing often uses health panic and unknown senders."
  },
  {
    id: 9,
    email: {
      subject: "🧾 School Canteen Menu 🍽️",
      body: "Check this week's lunch menu here.",
      from: "canteen@myschool.org"
    },
    correct: "real",
    reason: "Consistent with school communication, no urgency."
  },
  {
    id: 10,
    email: {
      subject: "You've been selected as a brand ambassador! 💼",
      body: "Fill out this form with your personal info to get started.",
      from: "collab@brand-partner.net"
    },
    correct: "fake",
    reason: "Unsolicited offers asking for personal info are suspicious."
  },
  {
    id: 11,
    email: {
      subject: "Minecraft Skin Pack Giveaway!",
      body: "Download your free skins by clicking this link.",
      from: "minecraft@freemcskins.co"
    },
    correct: "fake",
    reason: "Too good to be true + unknown domain = scam alert."
  },
  {
    id: 12,
    email: {
      subject: "Weekly Homework Update 📚",
      body: "Your teacher has uploaded your new homework for the week.",
      from: "homework@myschool.co.uk"
    },
    correct: "real",
    reason: "Context fits school communication. Sender looks legit."
  },
  {
    id: 13,
    email: {
      subject: "Suspicious login detected on your Fortnite account",
      body: "Please verify your login activity by clicking the link.",
      from: "security@epicgames-alert.com"
    },
    correct: "fake",
    reason: "Real alerts usually come from official domains."
  },
  {
    id: 14,
    email: {
      subject: "⚠️ Your Roblox account has been locked",
      body: "Click this link to unlock your account before it's permanently deleted.",
      from: "support@roblox-access.com"
    },
    correct: "fake",
    reason: "Scammers often fake popular platforms like Roblox."
  },
  {
    id: 15,
    email: {
      subject: "You’ve been added to a private Snapchat group",
      body: "Accept the invite by clicking the attachment.",
      from: "snapgroup@msg-invite.info"
    },
    correct: "fake",
    reason: "Random invite emails with attachments are often dangerous."
  }
]



// Shuffle helper
const shuffleArray = (arr) => {
  const shuffled = [...arr];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

const PhishingQuiz = () => {
  const navigate = useNavigate();
  const { theme, setTheme, themeStyles } = useTheme();

  const [questions, setQuestions] = useState(shuffleArray(phishingQuestions));
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const current = questions[index];
  const progressPercent = ((index + 1) / questions.length) * 100;

  const handleAnswer = (answer) => {
    setSelected(answer);
    if (answer === current.correct) {
      setScore((prev) => prev + 1);
    }
  };

  const nextQuestion = () => {
    if (index + 1 < questions.length) {
      setIndex(index + 1);
      setSelected(null);
    } else {
      setShowResult(true);
    }
  };

  const restart = () => {
    setQuestions(shuffleArray(phishingQuestions));
    setIndex(0);
    setSelected(null);
    setScore(0);
    setShowResult(false);
  };

  const handleExit = () => {
    navigate("/TeensAct");
  };

  if (showResult) {
    let badge = "";
    if (score >= 10) badge = "🥇 Phishing Pro";
    else if (score >= 5) badge = "🥈 Smart Scanner";
    else badge = "🥉 Beginner Defender";

    return (
      <>
        <NavbarPage/>
        <div className={`min-h-screen bg-gradient-to-br ${themeStyles[theme]} p-10`}>
          {score >= 10 && <Confetti />}
          <h1 className="text-4xl font-bold text-green-600 mb-4">🎉 Quiz Complete!</h1>
          <p className="text-xl mb-2">Your Score: {score}/{questions.length}</p>
          <p className="text-lg font-semibold text-blue-700 mt-4">Badge Earned: {badge}</p>
          <div className="flex gap-6 mt-6">
            <button onClick={restart} className="px-6 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600">
              🔁 Restart Quiz
            </button>
            <button onClick={handleExit} className="px-6 py-2 bg-red-500 text-white rounded-full hover:bg-red-600">
              🚪 Exit to Activities
            </button>
          </div>
        </div>
        <FooterTeen/>
      </>
    );
  }

  return (
  <div className="min-h-screen flex flex-col">
    <NavbarPage/>

    <div className={`w-full py-2 bg-gradient-to-br ${themeStyles[theme]}`}>
      <h1 className="text-4xl md:text-5xl font-extrabold text-purple-800 text-center">
        🎣 Phishing Email Simulator
      </h1>
    </div>

    <div className={`flex-grow bg-gradient-to-br ${themeStyles[theme]} px-4 pt-16 pb-16 flex flex-col items-center relative`}>
      {/* Theme Switcher */}
      <div className="absolute top-5 right-5 space-x-2 text-sm">
        <button onClick={() => setTheme("cyber")} className="px-3 py-1 bg-blue-500 text-white rounded">Cyber</button>
        <button onClick={() => setTheme("rainbow")} className="px-3 py-1 bg-pink-400 text-white rounded">Rainbow</button>
        <button onClick={() => setTheme("hacker")} className="px-3 py-1 bg-black text-green-400 border border-green-400 rounded">Hacker</button>
      </div>

      {/* Progress bar */}
      <div className="w-full max-w-6xl bg-gray-200 rounded-full h-4 mb-8">
        <div
          className="bg-green-400 h-4 rounded-full transition-all duration-300"
          style={{ width: `${progressPercent}%` }}
        ></div>
      </div>

      {/* Layout */}
      <div className="w-full max-w-6xl flex flex-col md:flex-row gap-6">
        {/* Left panel */}
        <div className={`flex-1 rounded-xl p-6 ${theme === "hacker" ? "bg-gray-950 text-green-300 border border-green-500" : "bg-white text-black shadow-lg"}`}>
          <p className="text-sm text-gray-500 mb-1 text-right">
            Question {index + 1} of {questions.length}
          </p>
          <h2 className="text-xl font-bold text-purple-700 mb-2">📧 Subject:</h2>
          <p>{current.email.subject}</p>

          <h3 className="text-lg font-semibold text-purple-700 mt-4">📬 From:</h3>
          <p>{current.email.from}</p>

          <h3 className="text-lg font-semibold text-purple-700 mt-4">📜 Message:</h3>
          <p>{current.email.body}</p>

          <div className="mt-4 bg-blue-100 p-2 rounded text-sm text-blue-800 shadow-inner">
            💡 Tip: Don’t click links in strange emails!
          </div>

          <div className="mt-6 flex gap-6 justify-center">
            <motion.button
              whileTap={{ scale: 0.9 }}
              whileHover={{ scale: 1.05 }}
              className={`px-6 py-2 rounded-full font-semibold ${theme === "hacker" ? (selected === "real" ? "bg-green-800 text-white" : "bg-gray-800 text-green-400 border border-green-500") : (selected === "real" ? "bg-green-300 text-white" : "bg-gray-200 text-black")}`}
              onClick={() => handleAnswer("real")}
              disabled={selected}
            >
              ✅ Real
            </motion.button>

            <motion.button
              whileTap={{ scale: 0.9 }}
              whileHover={{ scale: 1.05 }}
              className={`px-6 py-2 rounded-full font-semibold ${theme === "hacker" ? (selected === "fake" ? "bg-red-800 text-white" : "bg-gray-800 text-pink-400 border border-pink-500") : (selected === "fake" ? "bg-red-300 text-white" : "bg-gray-200 text-black")}`}
              onClick={() => handleAnswer("fake")}
              disabled={selected}
            >
              ❌ Fake
            </motion.button>
          </div>
        </div>

        {/* Right panel */}
        <div className={`md:w-[40%] rounded-xl shadow-lg p-6 flex flex-col justify-center ${theme === "hacker" ? "bg-gray-900 text-green-300 border-l-4 border-green-500" : "bg-yellow-50 text-gray-800 border-l-4 border-yellow-300"}`}>
          {selected ? (
            <>
              <h2 className="text-lg font-semibold mb-2">
                {selected === current.correct ? "✅ You're Right!" : "❌ Oops! That’s incorrect."}
              </h2>
              <p className="text-sm text-gray-700 mb-4">{current.reason}</p>
              <button
                onClick={nextQuestion}
                className="mt-auto bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600"
              >
                Next →
              </button>
            </>
          ) : (
            <p className="text-gray-500 text-sm text-center">
              💬 Select an answer to see feedback here!
            </p>
          )}
        </div>
      </div>
    </div>

    <FooterTeen/>
  </div>
);

};

export default PhishingQuiz;
