import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";

const activities = [
  {
    title: "Clickable Scam Email Samples",
    description:
      "Explore realistic scam emails where you can click on highlighted elements to uncover common red flags. Learn how to spot fake links, urgency tricks, and suspicious sender addresses.",
    image: "/assets/Image/teenscover/thumb17.png",
    link: "/ScamEmailTrainer",
    bgColor: "bg-gray-100",
  },
  {
    title: "Scam Vocabulary Memory Game",
    description:
      "Match scam-related terms with their meanings in this memory-style game. Reinforce key words like phishing, spoofing, and baiting through fun repetition.",
    image: "/assets/Image/teenscover/thumb18.png",
    link: "/ScamMemoryGame",
    bgColor: "bg-slate-200",
  },
  {
    title: "Tech Support Scam Simulator",
    description:
      "Experience a fake tech support call scenario and decide how to respond. Practice identifying lies, pressure tactics, and urgent requests for remote access.",
    image: "/assets/Image/teenscover/thumb19.png",
    link: "/TechSupportScamSimulator",
    bgColor: "bg-gray-200",
  },
  {
    title: "Personal Story Corner",
    description:
      "Watch and read real experiences of people who were scammed. Learn from their mistakes and discover how they recovered and became safer online.",
    image: "/assets/Image/teenscover/thumb20.png",
    link: "/PersonalStoryCorner",
    bgColor: "bg-slate-100",
  },
  {
    title: "Live Webinar Alerts",
    description:
      "Sign up for monthly Zoom webinars with digital safety experts. Get reminders via email or SMS and join live Q&A sessions on trending cyber threats.",
    image: "/assets/Image/teenscover/thumb21.png",
    link: "/LiveWebinars",
    bgColor: "bg-gray-300",
  },
  {
    title: "Safety Certificate Quiz",
    description:
      "Complete a short quiz to test your cybersecurity knowledge and earn a certificate. Great for families or community groups wanting to assess their skills.",
    image: "/assets/Image/teenscover/thumb22.png",
    link: "/SafetyQuiz",
    bgColor: "bg-slate-300",
  },
  {
    title: "Tutorial Videos",
    description:
      "Watch short, step-by-step videos explaining how to stay safe online. Topics include spotting scams, setting passwords, and avoiding fake links.",
    image: "/assets/Image/teenscover/thumb23.png",
    link: "/OlderAdultVideoGallery",
    bgColor: "bg-gray-100",
  },
];

const ActivitiesGrid = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [visited, setVisited] = useState(new Set());
  const [speakingIndex, setSpeakingIndex] = useState(null);
  const [fontScale, setFontScale] = useState(110); // start slightly larger for readability
  const navigate = useNavigate();

  const clampedScale = useMemo(
    () => Math.min(140, Math.max(90, fontScale)),
    [fontScale]
  );

  const speak = (index) => {
    try {
      if (!("speechSynthesis" in window)) return;
      // stop any ongoing speech
      window.speechSynthesis.cancel();

      const a = activities[index];
      if (!a) return;

      const utter = new SpeechSynthesisUtterance(
        `${a.title}. ${a.description}`
      );
      utter.rate = 0.95;
      utter.pitch = 1;
      utter.onstart = () => setSpeakingIndex(index);
      utter.onend = () => setSpeakingIndex(null);
      utter.onerror = () => setSpeakingIndex(null);

      window.speechSynthesis.speak(utter);
    } catch {
      /* no-op */
    }
  };

  const stopSpeak = () => {
    try {
      if ("speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
    } catch {
      /* no-op */
    } finally {
      setSpeakingIndex(null);
    }
  };

  const handleClick = (activity, index) => {
    // subtle haptic feedback on mobile
    if (navigator?.vibrate) navigator.vibrate(8);

    // stop any TTS before leaving
    stopSpeak();

    if (activity.title === "CV Scam Detector") {
      setShowPopup(true);
      setTimeout(() => {
        setShowPopup(false);
        navigate("/AdultAct");
      }, 2500);
    } else {
      // mark as visited (UI-only) without altering navigation logic
      setVisited((prev) => new Set(prev).add(index));
      navigate(activity.link);
    }
  };

  return (
    <section
      className="p-8 md:p-12 bg-gradient-to-br from-gray-50 to-gray-200 min-h-screen"
      style={{ fontSize: `${clampedScale}%` }}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4 px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
          Cyber Safety Made Easy for Seniors
        </h2>

        {/* Readability controls */}
        <div className="flex items-center gap-2" aria-label="Text size controls">
          <button
            type="button"
            onClick={() => setFontScale((s) => Math.max(90, s - 10))}
            className="px-3 py-2 rounded-lg bg-white border border-gray-300 shadow hover:shadow-md focus:outline-none focus:ring-2 focus:ring-orange-500"
            title="Decrease text size"
            aria-label="Decrease text size"
          >
            A–
          </button>
          <button
            type="button"
            onClick={() => setFontScale((s) => Math.min(140, s + 10))}
            className="px-3 py-2 rounded-lg bg-white border border-gray-300 shadow hover:shadow-md focus:outline-none focus:ring-2 focus:ring-orange-500"
            title="Increase text size"
            aria-label="Increase text size"
          >
            A+
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-10 px-4 flex flex-wrap justify-center gap-y-12 gap-x-16">
        {activities.map((act, index) => {
          const isVisited = visited.has(index);
          const isSpeaking = speakingIndex === index;

          return (
            <div
              key={index}
              className={`relative w-[360px] ${act.bgColor} rounded-2xl shadow-lg border border-gray-300 p-6 flex flex-col items-center text-center space-y-4 transition-transform duration-200 hover:shadow-2xl hover:-translate-y-1 focus-within:shadow-2xl`}
            >
              {/* Visited badge */}
              {isVisited && (
                <span
                  className="absolute top-3 right-3 text-xs font-semibold bg-green-600 text-white px-2 py-1 rounded-full shadow"
                  aria-label="Visited"
                >
                  ✓ Visited
                </span>
              )}

              <img
                src={act.image}
                alt={`Image for ${act.title}`}
                className="w-full h-60 object-contain rounded-md border border-gray-200 bg-white"
                title={act.title}
                draggable="false"
              />

              <h3 className="text-2xl font-bold text-gray-900">{act.title}</h3>

              <p className="text-lg text-gray-700 leading-relaxed">
                {act.description}
              </p>

              {/* Card actions: Listen / Open */}
              <div className="flex w-full gap-3">
                <button
                  type="button"
                  onClick={() => (isSpeaking ? stopSpeak() : speak(index))}
                  className={`flex-1 flex items-center justify-center gap-2 rounded-xl border border-gray-300 bg-white px-4 py-3 shadow hover:shadow-md focus:outline-none focus:ring-2 focus:ring-orange-500 ${
                    isSpeaking ? "ring-2 ring-orange-500" : ""
                  }`}
                  aria-pressed={isSpeaking}
                  aria-label={isSpeaking ? "Stop reading" : "Listen to description"}
                  title={isSpeaking ? "Stop reading" : "Listen"}
                >
                  {isSpeaking ? "⏹ Stop" : "🎧 Listen"}
                </button>

                <button
                  className="flex-1 bg-orange-600 hover:bg-orange-700 text-white text-lg py-3 rounded-xl shadow focus:outline-none focus:ring-2 focus:ring-orange-500 active:scale-[0.99] transition"
                  onClick={() => handleClick(act, index)}
                  aria-label={`Open ${act.title}`}
                  title={`Open ${act.title}`}
                >
                  Open Activity
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Popup for Coming Soon */}
      {showPopup && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
          role="dialog"
          aria-live="polite"
          aria-label="Coming soon"
        >
          <div className="bg-white p-8 rounded-xl text-center shadow-lg max-w-sm">
            <h2 className="text-2xl font-bold text-orange-600 mb-3">🚧 Coming Soon!</h2>
            <p className="text-gray-700 text-lg">
              You’ll be redirected to the home page shortly.
            </p>
          </div>
        </div>
      )}
    </section>
  );
};

export default ActivitiesGrid;
