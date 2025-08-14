import React, { useState, useEffect } from "react";
import {
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaYoutube,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
  FaLightbulb,
} from "react-icons/fa";

// Backend base (same as teens footer)
const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:5000";

// Local fallback if API not reachable
const LOCAL_FALLBACK_TIPS = [
  { title: "Stay Alert!", text: "Avoid clicking links from unknown sources." },
  { title: "Keep Info Private", text: "Don’t overshare personal info online." },
  { title: "Use Strong Passwords", text: "Include symbols and numbers." },
  { title: "Update Devices", text: "Keep software and apps up-to-date." },
];

const newsItems = [
  {
    id: 1,
    title: "🌐 Global Phishing Scam Targets Microsoft Users",
    brief: "Cybercriminals launched a widespread phishing campaign...",
    full: "Cybercriminals launched a phishing campaign impersonating Microsoft security alerts, tricking users into clicking malicious links. The fake emails warned of unusual login attempts and directed users to a convincing but fraudulent sign-in page to steal credentials.",
    image: "/assets/Image/ms1.jpeg",
  },
  {
    id: 2,
    title: "🏛 Ransomware Attack Hits UK Universities",
    brief: "A ransomware attack disrupted academic research in UK universities...",
    full: "A coordinated ransomware attack disrupted multiple UK universities, locking researchers out of critical data. Investigations suggest attackers exploited weak VPN configurations. Emergency protocols were activated and backups restored.",
    image: "/assets/Image/uni1.jpg",
  },
];

const Footer = () => {
  // --- Tips from backend (with fallback)
  const [tips, setTips] = useState(LOCAL_FALLBACK_TIPS);
  const [tipsLoading, setTipsLoading] = useState(true);
  const [tipsError, setTipsError] = useState("");

  // --- UI state (same functionality)
  const [tipIndex, setTipIndex] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [activeNews, setActiveNews] = useState(null);
  const [fadeTip, setFadeTip] = useState(true);

  // Suggest form
  const [suggestTitle, setSuggestTitle] = useState("");
  const [suggestText, setSuggestText] = useState("");
  const [submitting, setSubmitting] = useState(false);

  // Fetch tips from backend
  useEffect(() => {
    let alive = true;
    const loadTips = async () => {
      try {
        setTipsLoading(true);
        setTipsError("");
        const r = await fetch(`${API_BASE}/api/tips`);
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        const data = await r.json();
        if (alive && Array.isArray(data?.tips) && data.tips.length) {
          setTips(data.tips);
        }
      } catch (e) {
        setTipsError("Couldn’t load tips (showing defaults).");
      } finally {
        if (alive) setTipsLoading(false);
      }
    };
    loadTips();
    const id = setInterval(loadTips, 60000); // refresh each minute for newly approved tips
    return () => {
      alive = false;
      clearInterval(id);
    };
  }, []);

  // Rotate tips every 5s with fade
  useEffect(() => {
    const id = setInterval(() => {
      setFadeTip(false);
      setTimeout(() => {
        setTipIndex((i) => (i + 1) % tips.length);
        setFadeTip(true);
      }, 250);
    }, 5000);
    return () => clearInterval(id);
  }, [tips.length]);

  const currentTip = tips[tips.length ? tipIndex % tips.length : 0];

  // Submit suggestion → /api/tips (approved:false)
  const submitSuggestion = async () => {
    if (!suggestTitle.trim() || !suggestText.trim()) {
      alert("Please add both a Title and a Tip.");
      return;
    }
    try {
      setSubmitting(true);
      const r = await fetch(`${API_BASE}/api/tips`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: suggestTitle.trim(),
          text: suggestText.trim(),
        }),
      });
      if (!r.ok) throw new Error(`HTTP ${r.status}`);
      alert("Thanks! Your tip was sent for review.");
      setSuggestTitle("");
      setSuggestText("");
      setShowModal(false);
    } catch (e) {
      alert("Couldn’t submit right now. Please try later.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <footer className="bg-gradient-to-br from-gray-800 to-gray-600 text-white pt-10 px-6 md:px-16 pb-6 rounded-none">
      <div className="flex flex-col lg:flex-row justify-between gap-8">
        {/* Left Column */}
        <div className="space-y-4">
          <img
            src="/assets/Image/Logo_Dark.png"
            alt="Logo"
            className="w-40 mb-8 bg-white p-2 rounded-full shadow-lg hover:scale-105 transition-transform"
          />
          <div className="flex items-start gap-2">
            <FaMapMarkerAlt className="text-orange-400 mt-1" />
            <span>Sheffield, United Kingdom</span>
          </div>
          <div className="flex items-start gap-2">
            <FaPhoneAlt className="text-orange-400 mt-1" />
            <span>+44-7901000000</span>
          </div>
          <div className="flex items-start gap-2">
            <FaEnvelope className="text-orange-400 mt-1" />
            <span>info@cyberguidehub.com</span>
          </div>
          <div className="flex gap-4 mt-3 text-2xl">
            {[FaFacebook, FaInstagram, FaTwitter, FaYoutube].map((Icon, i) => (
              <Icon
                key={i}
                tabIndex={0}
                className="cursor-pointer hover:scale-110 hover:text-blue-300 transition-transform focus:outline-none focus:ring-2 focus:ring-blue-300 rounded-full"
              />
            ))}
          </div>
        </div>

        {/* Center Column - Tips */}
        <div className="flex-1 space-y-3">
          <h2 className="text-xl font-bold mb-2 flex items-center gap-2">
            ✨ Tips & Lingo for a Safer Web
          </h2>
          <div
            className={`bg-gray-500 rounded-xl p-4 shadow-lg transition-opacity duration-300 ${
              fadeTip ? "opacity-100" : "opacity-0"
            }`}
          >
            <p className="text-lg font-bold flex items-center gap-2">
              <FaLightbulb className="text-yellow-300 animate-bounce" />
              {tipsLoading ? "Loading tips…" : currentTip?.title || "Tip"}
            </p>
            <p className="text-sm text-white/90">
              {tipsLoading ? "Please wait" : currentTip?.text || ""}
            </p>
            {tipsError && (
              <p className="mt-2 text-xs text-yellow-200">{tipsError}</p>
            )}
          </div>
          <div className="bg-gray-500 rounded-xl p-4 shadow-lg">
            <p className="text-lg font-bold flex items-center gap-2">🧠 Cyber Slang</p>
            <p className="text-sm">
              <strong>Phishing:</strong> Fake emails or messages that try to steal info.
            </p>
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="mt-3 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-full shadow-lg flex items-center gap-2 transform hover:scale-105 transition-transform"
          >
            💬 Suggest a Tip
          </button>
        </div>

        {/* Right Column - News */}
        <div className="flex-1">
          <h2 className="text-xl font-bold mb-2 flex items-center gap-2">
            📰 Cyber Crime Updates
          </h2>
          <div className="space-y-3">
            {newsItems.map((item) => (
              <div
                key={item.id}
                onClick={() => setActiveNews(item)}
                className="relative group rounded-xl overflow-hidden cursor-pointer"
              >
                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-300 z-10">
                  <span className="text-white text-sm font-semibold bg-black/60 px-3 py-1 rounded-lg">
                    🔍 Click to read more
                  </span>
                </div>

                <div className="bg-gray-500 p-3 flex items-start gap-3 rounded-xl shadow-lg">
                  <img
                    src={item.image}
                    alt="News"
                    className="w-16 h-16 rounded-md object-cover transform group-hover:scale-110 transition-transform duration-300"
                  />
                  <div>
                    <p className="font-semibold text-sm">{item.title}</p>
                    <p className="text-sm text-white/80">{item.brief}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer Links */}
      <div className="flex flex-col md:flex-row justify-between items-center border-t border-white/30 mt-8 pt-4 text-sm text-white/70">
        <p>© CyberGuideHub. All Rights Reserved 2025. Licensing</p>
        <div className="space-x-4 mt-2 md:mt-0">
          <a href="#" className="hover:text-white">Terms of Service</a>
          <a href="#" className="hover:text-white">Privacy Policy</a>
        </div>
      </div>

      {/* Modal for Suggest Tip */}
      {showModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50 animate-fadeIn">
          <div className="bg-white rounded-xl p-6 max-w-md w-full text-black shadow-2xl transform animate-scaleIn">
            <h3 className="text-xl font-bold mb-3">💡 Suggest a Tip</h3>
            <input
              type="text"
              value={suggestTitle}
              onChange={(e) => setSuggestTitle(e.target.value)}
              placeholder="Short title (e.g., Use 2FA)"
              className="w-full p-3 border border-gray-300 rounded-md mb-3"
            />
            <textarea
              className="w-full p-3 border border-gray-300 rounded-md mb-4"
              rows={4}
              value={suggestText}
              onChange={(e) => setSuggestText(e.target.value)}
              placeholder="Write your tip idea here..."
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded"
                disabled={submitting}
              >
                Cancel
              </button>
              <button
                onClick={submitSuggestion}
                disabled={submitting}
                className="px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 rounded disabled:opacity-60"
              >
                {submitting ? "Submitting..." : "Submit"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* News Details Modal */}
      {activeNews && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50 animate-fadeIn">
          <div className="bg-white text-black rounded-xl p-6 max-w-lg w-full relative shadow-2xl transform animate-scaleIn">
            <button
              onClick={() => setActiveNews(null)}
              className="absolute top-3 right-4 text-2xl text-red-500"
            >
              ✖
            </button>
            <img
              src={activeNews.image}
              alt="news full"
              className="w-full h-48 object-cover rounded mb-4"
            />
            <h3 className="text-xl font-bold mb-2">{activeNews.title}</h3>
            <p className="text-sm">{activeNews.full}</p>
          </div>
        </div>
      )}

      {/* Animations */}
      <style>{`
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes scaleIn { from { transform: scale(0.95); opacity: 0; } to { transform: scale(1); opacity: 1; } }
        .animate-fadeIn { animation: fadeIn 0.25s ease forwards; }
        .animate-scaleIn { animation: scaleIn 0.25s ease forwards; }
      `}</style>
    </footer>
  );
};

export default Footer;
