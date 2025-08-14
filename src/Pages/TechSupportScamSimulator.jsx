import React, { useState, useEffect } from "react";
import NavbarSenior from "../Components/NavbarSenior";
import FooterSenior from "../Components/FooterSenior";

const scenarios = [
  {
    id: 1,
    avatar: "/assets/Image/users/user-1.jpg",
    audio: "Your computer has been infected with multiple viruses.",
    question: "What would you do?",
    options: [
      { text: "Give remote access", isSafe: false },
      { text: "Hang up immediately", isSafe: true },
    ],
    explanation:
      "Scammers often use fear to convince you to give them control of your device. They may pretend to run scans and then demand money. Always hang up if unsure and never let unknown callers access your device.",
  },
  {
    id: 2,
    avatar: "/assets/Image/users/user-2.jpg",
    audio: "We’re calling from Microsoft Support. We’ve detected a threat.",
    question: "What should you say?",
    options: [
      { text: "Ask for a case ID and call Microsoft directly", isSafe: true },
      { text: "Follow their instructions", isSafe: false },
    ],
    explanation:
      "Tech companies like Microsoft will never cold call you about issues. This is a well-known scam to trick users into giving away control or paying for fake services.",
  },
  {
    id: 3,
    avatar: "/assets/Image/users/user-3.jpg",
    audio: "We noticed unusual activity on your banking app.",
    question: "What action is best?",
    options: [
      { text: "Click the link they texted", isSafe: false },
      { text: "Call your bank directly from their official number", isSafe: true },
    ],
    explanation:
      "Never trust links or numbers sent via unsolicited calls or texts. Scammers spoof phone numbers and pretend to be banks. Always use your bank's official website or helpline.",
  },
  {
    id: 4,
    avatar: "/assets/Image/users/user-4.jpg",
    audio: "You’ve won a support refund. We need your card details.",
    question: "Is this safe?",
    options: [
      { text: "Share card details", isSafe: false },
      { text: "Refuse and hang up", isSafe: true },
    ],
    explanation:
      "No legitimate company will ask for card details over the phone for a refund. This is a classic refund scam tactic. Be cautious of unexpected refund offers.",
  },
  {
    id: 5,
    avatar: "/assets/Image/users/user-5.jpg",
    audio: "We're updating your software. Please enter the code we sent.",
    question: "What should you do?",
    options: [
      { text: "Ignore the message and contact your provider", isSafe: true },
      { text: "Type the code immediately", isSafe: false },
    ],
    explanation:
      "These codes can give scammers access to your accounts. They pretend to be services like Google or your bank. Always confirm directly through official channels.",
  },
  {
    id: 6,
    avatar: "/assets/Image/users/user-6.jpg",
    audio: "We are from your internet provider. Your router is infected.",
    question: "What should you ask?",
    options: [
      { text: "Let them fix the router", isSafe: false },
      { text: "Hang up and call the provider yourself", isSafe: true },
    ],
    explanation:
      "Scammers often pretend to be from your ISP to gain device access. Don’t trust these calls unless you initiated the conversation. Always verify independently.",
  },
  {
    id: 7,
    avatar: "/assets/Image/users/user-7.jpg",
    audio: "Your email account will be suspended. Verify now to avoid issues.",
    question: "What do you do?",
    options: [
      { text: "Click their verification link", isSafe: false },
      { text: "Log in via the official site to check", isSafe: true },
    ],
    explanation:
      "Fake urgency is used to steal your login credentials. Do not click suspicious links. Always verify directly by logging in through the real service provider’s website.",
  },
  {
    id: 8,
    avatar: "/assets/Image/users/user-8.jpg",
    audio: "A large purchase was made using your card. Press 1 to dispute.",
    question: "What should you do?",
    options: [
      { text: "Press 1 and speak with an agent", isSafe: false },
      { text: "Hang up and call your bank directly", isSafe: true },
    ],
    explanation:
      "This is a voice phishing scam. If you receive such calls, don’t interact. Contact your card provider using a trusted number, not the one they give you.",
  },
  {
    id: 9,
    avatar: "/assets/Image/users/user-9.jpg",
    audio: "We’re the National Crime Agency. You’re under investigation.",
    question: "What's the right move?",
    options: [
      { text: "Share your personal info to clear it up", isSafe: false },
      { text: "Refuse to engage and report it", isSafe: true },
    ],
    explanation:
      "No real crime agency will call you and demand personal details or payment. This is an intimidation scam. Stay calm and report the call.",
  },
  {
    id: 10,
    avatar: "/assets/Image/users/user-10.jpg",
    audio: "You missed a court summons and will be arrested unless you pay now.",
    question: "How do you respond?",
    options: [
      { text: "Follow payment instructions", isSafe: false },
      { text: "End the call and speak to legal advisors", isSafe: true },
    ],
    explanation:
      "Threatening legal action is a scare tactic. Official legal notices are not sent by random calls. Always speak to a trusted legal source before acting.",
  },
];

const TechSupportScamSimulator = () => {
  const [step, setStep] = useState(0);
  const [selected, setSelected] = useState(null);
  const [speechEnabled, setSpeechEnabled] = useState(true);

  const current = scenarios[step];

  useEffect(() => {
    if (speechEnabled && current) speak(current.audio);
  }, [step, speechEnabled]);

  const speak = (text) => {
    const utter = new SpeechSynthesisUtterance(text);
    utter.lang = "en-GB";
    window.speechSynthesis.cancel(); // Stop any ongoing speech
    window.speechSynthesis.speak(utter);
  };

  const handleOption = (option) => {
    setSelected(option);
    if (speechEnabled) speak(option.explanation || option.text);
  };

  const nextStep = () => {
    if (step < scenarios.length - 1) {
      setSelected(null);
      setStep((prev) => prev + 1);
    } else {
      setSelected(null);
      setStep(scenarios.length); // End
    }
  };

  const restartSimulation = () => {
    setStep(0);
    setSelected(null);
  };

  return (
    <>
    <NavbarSenior />
    <div className="min-h-screen bg-blue-50 text-gray-900 p-6 flex flex-col items-center text-lg md:text-xl">
      <h1 className="text-3xl md:text-4xl font-bold mb-6 text-center">
        🎧 Tech Support Scam Simulator
      </h1>

      {step < scenarios.length ? (
        <div className="bg-white p-6 rounded-lg shadow-md max-w-2xl w-full text-center">
          <img
            src={current.avatar}
            alt="Caller"
            className="w-28 h-28 rounded-full mx-auto mb-4 border border-gray-400"
          />
          <p className="text-xl font-semibold mb-3">📞 {current.audio}</p>
          <p className="mb-4">{current.question}</p>

          <div className="space-y-3 text-left">
            {current.options.map((option, i) => (
              <button
                key={i}
                onClick={() => handleOption(option)}
                className={`block w-full px-4 py-3 rounded border ${
                  selected
                    ? option.isSafe
                      ? "bg-green-200 border-green-500"
                      : "bg-red-200 border-red-500"
                    : "bg-gray-100 hover:bg-blue-100"
                }`}
                aria-label={`Option: ${option.text}`}
              >
                {option.text}
              </button>
            ))}
          </div>

          {selected && (
            <div className="mt-6 bg-yellow-100 p-4 rounded border-l-4 border-yellow-600">
              <p className="mb-3">
                <strong>💡 Tip:</strong> {current.explanation}
              </p>
              <button
                className="mt-2 px-4 py-2 bg-blue-600 text-white rounded"
                onClick={nextStep}
              >
                Next Scenario
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="bg-white p-6 rounded-lg shadow-md max-w-2xl w-full text-center">
          <h2 className="text-2xl font-bold mb-4">🎉 Simulation Complete</h2>
          <p className="mb-4 text-lg">
            Great job! You've learned how to handle tech support scam calls.
            Always stop, think, and verify before sharing information.
          </p>
          <div className="flex justify-center gap-4 mt-6 flex-wrap">
            <button
              className="px-4 py-2 bg-green-600 text-white rounded"
              onClick={restartSimulation}
            >
              🔁 Restart Simulation
            </button>
            <button
              className="px-4 py-2 bg-gray-300 text-gray-900 rounded"
              onClick={() => window.location.href = "/activities"}
            >
              🧭 Back to Activities
            </button>
          </div>
        </div>
      )}

      <div className="mt-6">
        <button
          className="text-blue-600 underline text-lg"
          onClick={() => {
            window.speechSynthesis.cancel();
            setSpeechEnabled((prev) => !prev);
          }}
        >
          {speechEnabled ? "🔇 Disable Voice" : "🔊 Enable Voice"}
        </button>
      </div>
    </div>
     <FooterSenior />
  </>
  );
};

export default TechSupportScamSimulator;
