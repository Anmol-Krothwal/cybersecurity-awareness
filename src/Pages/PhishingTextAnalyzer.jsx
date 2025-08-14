import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import NavbarAdult from "../Components/NavbarAdult";
import FooterAdult from "../Components/FooterAdult";

const phishingExamples = [
  {
    title: "Royal Mail Parcel",
    message: "Royal Mail: Your parcel is waiting. Pay £1.99: http://rm-redirect.co.uk",
  },
  {
    title: "Amazon Suspension",
    message: "Amazon: Your account has been suspended. Login: http://amazon-alert-secure.com",
  },
  {
    title: "You've Won!",
    message: "Congrats! You've won a $500 gift card. Click: http://free-gift.biz",
  },
  {
    title: "Bank Lock Alert",
    message: "HSBC: Your account is locked. Verify: http://secure-hsbc-login.net",
  },
  {
    title: "Netflix Billing Issue",
    message: "Netflix: Your payment failed. Update your info to avoid service interruption: http://netflix-update.info",
  },
  {
    title: "Apple ID Accessed",
    message: "Apple: Your Apple ID was used to sign in from a new device. Confirm now: http://apple-security-alert.com",
  },
  {
    title: "COVID-19 Booster",
    message: "NHS: You’re eligible for a COVID-19 booster. Book now: http://nhs-covid-booster.uk",
  },
  {
    title: "Facebook Friend Request",
    message: "You have 3 new friend requests. Log in now to view: http://fb-social-alert.com",
  },
  {
    title: "HMRC Tax Refund",
    message: "HMRC: You are eligible for a £1250 tax refund. Submit details: http://gov-uk-taxrefund.com",
  },
  {
    title: "PayPal Unauthorized Access",
    message: "PayPal: We noticed unusual login activity. Resolve it here: http://paypal-securelogin.com",
  },
  {
    title: "Instagram Copyright Violation",
    message: "Instagram: Your post violated copyright. Avoid suspension: http://insta-appeal-center.com",
  },
  {
    title: "Amazon Delivery Missed",
    message: "Amazon: We missed you! Reschedule your delivery here: http://amazon-retrack-order.com",
  },
  {
    title: "Lottery Winner",
    message: "Congratulations! Your number was selected in our £10,000 draw. Claim now: http://lucky-prize.uk",
  },
  {
    title: "Urgent Google Account Alert",
    message: "Google: A new device tried to sign in. Verify identity: http://google-security-check.net",
  },
  {
    title: "Job Offer Scam",
    message: "We reviewed your CV and would like to offer £400/day. Apply now: http://remote-hiring.net",
  },
];

const redFlags = [
  { keyword: "http", reason: "Suspicious URL detected" },
  { keyword: "parcel", reason: "Urgency tactic (delivery scam)" },
  { keyword: "won", reason: "Too-good-to-be-true offer" },
  { keyword: "account", reason: "Account compromise scare" },
  { keyword: "login", reason: "Credential phishing attempt" },
  { keyword: "click", reason: "Urgent call to action" },
  { keyword: "£", reason: "Request for money/payment" },
  { keyword: "verify", reason: "Verification bait" },
  { keyword: "urgent", reason: "Fear-based urgency" },
];

const PhishingTextAnalyzer = () => {
  const [input, setInput] = useState("");
  const [result, setResult] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [animatedFlags, setAnimatedFlags] = useState([]);

  useEffect(() => {
    let timer;
    if (result.length > 0) {
      setAnimatedFlags([]);
      timer = setTimeout(() => setAnimatedFlags(result), 300);
    }
    return () => clearTimeout(timer);
  }, [result]);

  const analyzeMessage = () => {
    const findings = redFlags
      .filter((flag) => input.toLowerCase().includes(flag.keyword.toLowerCase()))
      .map((flag) => flag.reason);

    if (!input.trim()) {
      setShowSuggestions(true);
      setResult([]);
      return;
    }

    setShowSuggestions(false);
    setResult(findings);
  };

  const handleExampleClick = (text) => {
    setInput(text);
    setResult([]);
    setShowSuggestions(false);
  };

  const clearAll = () => {
    setInput("");
    setResult([]);
    setShowSuggestions(false);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <NavbarAdult /> {/* ✅ Navbar Added */}
    <main className="flex-grow bg-gradient-to-br from-gray-100 to-blue-50 p-8 pb-16">
      <h1 className="text-5xl text-center font-extrabold text-gray-900 mb-6 p-4">
        🧠 Phishing Text Analyzer
      </h1>

      <div className="flex flex-col lg:flex-row gap-6 max-w-7xl mx-auto">
        {/* Examples List */}
        <div className="lg:w-1/3 bg-white rounded-xl p-4 shadow-md max-h-[500px] overflow-y-auto">
          <h2 className="text-lg font-bold text-gray-800 mb-3">📋 Example Messages</h2>
          <ul className="space-y-3">
            {phishingExamples.map((ex, idx) => (
              <li
                key={idx}
                onClick={() => handleExampleClick(ex.message)}
                className="cursor-pointer bg-gray-50 hover:bg-gray-200 p-3 rounded-md border border-indigo-200"
              >
                <strong className="block text-blue-700">{ex.title}</strong>
                <p className="text-xs text-gray-700 mt-1">{ex.message}</p>
              </li>
            ))}
          </ul>
        </div>

        {/* Analyzer Area */}
        <div className="lg:w-2/3 bg-white p-6 rounded-xl shadow-md relative">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="✍️ Paste or type a suspicious message here..."
            rows={5}
            className="w-full p-4 rounded-lg border border-gray-300 shadow focus:ring-2 focus:ring-gray-500 focus:outline-none"
          />

          <div className="flex flex-wrap gap-3 mt-4">
            <button
              onClick={analyzeMessage}
              className="bg-indigo-600 text-white px-5 py-2 rounded-lg font-semibold hover:bg-indigo-700 transition"
            >
              🔍 Analyze
            </button>
            <button
              onClick={clearAll}
              className="bg-gray-300 text-gray-800 px-5 py-2 rounded-lg font-medium hover:bg-gray-400 transition"
            >
              ❌ Clear All
            </button>
            <a
              href="/phishing-tips.pdf"
              download
              className="bg-green-600 text-white px-5 py-2 rounded-lg hover:bg-green-700 transition"
            >
              📄 Download Tips
            </a>
          </div>

          {/* Suggestions */}
          {showSuggestions && (
            <div className="mt-6 text-yellow-700 bg-yellow-100 p-4 border-l-4 border-yellow-400 rounded-md">
              <strong>💡 Did you mean?</strong>
              <p className="mt-1">
                Try one of the phishing examples on the left or describe a suspicious message you've received.
              </p>
            </div>
          )}

          {/* Results */}
          <AnimatePresence>
            {animatedFlags.length > 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="mt-6 bg-indigo-50 border-l-4 border-indigo-600 p-4 rounded-md text-indigo-800"
              >
                <h3 className="font-bold text-lg mb-2">⚠️ Detected Red Flags:</h3>
                <ul className="list-disc pl-6 space-y-1">
                  {animatedFlags.map((flag, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.2 }}
                    >
                      {flag}
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      
    
     </main>
    <FooterAdult /> {/* ✅ Footer Added */}
    </div>
    
  );
};

export default PhishingTextAnalyzer;
