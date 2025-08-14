import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const activities = [
  {
    title: "Marketplace Scam Test",
    description: "Explore fake product listings and buyer-seller chats to test your ability to detect online shopping scams. Strengthen your judgment for safe digital purchases.",
    image: "/assets/Image/teenscover/thumb9.png",
    link: "/MarketplaceScamTest",
    bgColor: "bg-gray-100",
  },
  {
    title: "Cyber Ninja Activity",
    description: "Sharpen your reflexes in a fast-paced challenge where you slice through cybersecurity threats like fake links and suspicious terms. Gamify your learning experience.",
    image: "/assets/Image/teenscover/thumb10.png",
    link: "/CyberNinja",
    bgColor: "bg-slate-200",
  },
  {
    title: "Chatbot Mentor",
    description: "Engage with an interactive chatbot that guides you through real-life security dilemmas. Get tailored advice on passwords, privacy, and scam prevention.",
    image: "/assets/Image/teenscover/thumb11.png",
    link: "/ChatbotMentor",
    bgColor: "bg-gray-200",
  },
  {
    title: "Digital Danger Decisions",
    description: "Watch realistic dramatizations of digital fraud cases and social engineering. Learn how to recognize warning signs and apply prevention strategies.",
    image: "/assets/Image/teenscover/thumb12.png",
    link: "/ScenarioVideos",
    bgColor: "bg-slate-100",
  },
  {
    title: "Phishing Text Analyzer",
    description: "Analyze SMS messages and notifications to uncover hidden phishing attempts. Understand how language and urgency are used to trick users.",
    image: "/assets/Image/teenscover/thumb13.png",
    link: "/PhishingTextAnalyzer",
    bgColor: "bg-gray-300",
  },
  {
    title: "Investment Scam Tester",
    description: "Review online investment offers and identify red flags commonly used in scams. Learn how to evaluate legitimacy and protect your financial decisions.",
    image: "/assets/Image/teenscover/thumb14.png",
    link: "/InvestmentScamTester",
    bgColor: "bg-slate-300",
  },
  {
    title: "Monthly Scam Trend Reports",
    description: "Stay informed with up-to-date reports on the latest scam trends targeting adults. Learn how scammers adapt and what precautions to take.",
    image: "/assets/Image/teenscover/thumb15.png",
    link: "/ScamReportsPage",
    bgColor: "bg-gray-100",
  },
  {
    title: "CV Scam Detector",
    description: "Review job listings and recruiter messages to detect employment scams. Understand how fraudsters exploit job seekers and how to stay protected.",
    image: "/assets/Image/teenscover/thumb16.png",
    link: "/cv-scam-detector",
    bgColor: "bg-slate-200",
  },
];

const ActivitiesGrid = () => {
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();

  const handleClick = (activity) => {
    if (activity.title === "CV Scam Detector") {
      setShowPopup(true);
      setTimeout(() => {
        setShowPopup(false);
        navigate("/AdultAct");
      }, 2500); // 1.5 seconds
    } else {
      navigate(activity.link);
    }
  };
  return (
    <section className="p-10 bg-gradient-to-br from-gray-50 to-gray-200 min-h-screen">
      <h2 className="text-4xl font-bold text-center text-gray-800 mb-12 tracking-tight">
        Explore Cybersecurity Training Activities
      </h2>

      <div className="flex flex-wrap justify-center gap-8">
        {activities.map((act, index) => (
          <div
          key={index}
          onClick={() => handleClick(act)}
          className={`relative group w-[320px] h-[280px] ${act.bgColor} rounded-2xl shadow-md border border-gray-300 overflow-hidden transition-transform duration-300 hover:scale-105 hover:shadow-lg cursor-pointer`}
        >
              {/* Image */}
              <img
                src={act.image}
                alt={act.title}
                className="w-full object-contain border-b border-gray-300 z-0"
              />

              {/* Title */}
              <div className="px-4 py-3 text-lg font-semibold text-center text-gray-800">
                {act.title}
              </div>

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-black bg-opacity-70 z-10 flex flex-col justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-white text-center px-4">
                <p className="mb-4 text-sm">{act.description}</p>
                <button className="bg-white text-gray-800 font-semibold px-5 py-2 rounded-md hover:bg-gray-200 transition">
                  Start Activity
                </button>
              </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded-xl text-center shadow-lg max-w-sm">
            <h2 className="text-2xl font-bold text-orange-600 mb-3">🚧 Coming Soon!</h2>
            <p className="text-gray-700">You’ll be redirected to the home page shortly.</p>
          </div>
        </div>
      )}
    </section>
  );
};

export default ActivitiesGrid;