import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

const activities = [
  {
    title: "🔍'Who's the Scammer?' ",
    description:
      "Uncover the scammer by analyzing messages, actions, and digital behavior in a fun detective-style game. Build your scam-spotting skills and earn rewards as you progress!",
    image: "/assets/Image/teenscover/thumb1.png",
    link: "/quizscammer",
    bgColor: "bg-blue-200",
  },
  {
    title: "📱 Scam Spotting Game ",
    description:
      "Dive into realistic social media DMs on platforms like TikTok and Snapchat. Decide which messages are safe and which are scams—can you trust your instincts?",
    image: "/assets/Image/teenscover/thumb2.png",
    link: "/scammerspotgame",
    bgColor: "bg-orange-200",
  },
  {
    title: "🕵️ Animation Videos",
    description:
      "Enjoy short, fun cartoons that explain phishing, impersonation, and online scams through stories teens can relate to. A perfect way to learn online safety the fun way!",
    image: "/assets/Image/teenscover/thumb3.png",
    link: "/video-player",
    bgColor: "bg-blue-200",
  },
  {
    title: "🔐 Fake vs Real Profile Challenge",
    description:
      "Compare social media profiles and spot the red flags that expose fake accounts. Sharpen your eye for detail in this interactive game of digital deduction!",
    image: "/assets/Image/teenscover/thumb4.png",
    link: "/fake-vs-real",
    bgColor: "bg-purple-200",
  },
  {
    title: "🎣 Report the Scammer Simulation",
    description:
      "Practice reporting scammers across platforms like Roblox, Discord, and gaming chats. Learn the correct steps and build confidence to take safe actions online.",
    image: "/assets/Image/teenscover/thumb5.png",
    link: "/Report-Scammer",
    bgColor: "bg-green-200",
  },
  {
    title: "🧩 Phishing Email Simulator",
    description:
      "Spot the difference between real and fake emails in this interactive challenge. Learn to identify phishing tactics like urgent language, strange links, and suspicious senders.",
    image: "/assets/Image/teenscover/thumb6.png",
    link: "/PhishingGame",
    bgColor: "bg-indigo-200",
  },
  {
    title: "📲 Cyber Truth or Dare Game",
    description:
      "Take on safe, digital dares and truths based on real-life cyber habits—like checking your privacy settings or reviewing old posts. A fun way to build safer online behavior!",
    image: "/assets/Image/teenscover/thumb7.png",
    link: "/Truth-Or-Dare-Game",
    bgColor: "bg-green-300",
  },
  {
    title: "⬇️ Reputation Rescue Lab",
    description:
      "Explore an overexposed online profile and remove risky personal details. Learn how to protect your digital footprint and build a safer online reputation.",
    image: "/assets/Image/teenscover/thumb8.png",
    link: "/ReputationRescueLab",
    bgColor: "bg-red-200",
  },
];

// single card with tilt, shine, ripple (no functionality change)
const ActivityCard = ({ act, index, linkRef }) => {
  const cardRef = useRef(null);
  const [tilt, setTilt] = useState({ rx: 0, ry: 0, ox: 0.5, oy: 0.5 });

  const onMove = (e) => {
    const el = cardRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = e.clientX - r.left;
    const y = e.clientY - r.top;
    const ox = x / r.width;
    const oy = y / r.height;
    const ry = (ox - 0.5) * 10; // rotateY
    const rx = -(oy - 0.5) * 10; // rotateX
    setTilt({ rx, ry, ox, oy });
  };
  const onLeave = () => setTilt({ rx: 0, ry: 0, ox: 0.5, oy: 0.5 });

  // ripple
  const onClick = (e) => {
    const el = cardRef.current;
    if (!el) return;
    const ripple = document.createElement("span");
    const rect = el.getBoundingClientRect();
    ripple.className =
      "pointer-events-none absolute -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/60 animate-[ripple_700ms_ease-out] will-change-transform";
    const size = Math.max(rect.width, rect.height) * 1.2;
    ripple.style.width = `${size}px`;
    ripple.style.height = `${size}px`;
    ripple.style.left = `${e.clientX - rect.left}px`;
    ripple.style.top = `${e.clientY - rect.top}px`;
    el.appendChild(ripple);
    setTimeout(() => ripple.remove(), 700);
  };

  return (
    <Link
      ref={linkRef}
      to={act.link || "#"}
      aria-label={`${act.title} — open activity`}
      className="focus:outline-none"
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") e.currentTarget.click();
      }}
    >
      <div
        ref={cardRef}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        onClick={onClick}
        className={`relative group w-[300px] h-[280px] ${act.bgColor} rounded-3xl shadow-xl border-4 border-white overflow-hidden transition-transform duration-300 hover:scale-110 hover:shadow-2xl cursor-pointer focus-within:ring-4 focus-within:ring-indigo-300`}
        style={{
          transform: `perspective(800px) rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)`,
          transformStyle: "preserve-3d",
        }}
      >
        {/* glossy shine */}
        <div
          className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            background: `radial-gradient(
              circle at ${tilt.ox * 100}% ${tilt.oy * 100}%,
              rgba(255,255,255,0.45),
              rgba(255,255,255,0.12) 30%,
              rgba(255,255,255,0) 55%
            )`,
          }}
        />

        {/* animated gradient ring on hover */}
        <div className="pointer-events-none absolute inset-0 rounded-[20px] opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="absolute -inset-[2px] rounded-[22px] bg-gradient-to-r from-indigo-400 via-pink-400 to-yellow-300 animate-[spin_6s_linear_infinite] blur-[6px]" />
        </div>

        {/* image */}
        <img
          src={act.image}
          alt={act.title}
          className="w-full h-48 object-cover rounded-t-2xl border-b-4 border-white"
          draggable="false"
        />

        {/* title */}
        <div className="px-4 pt-3 text-lg font-extrabold text-center text-gray-800">
          {act.title}
        </div>

        {/* “New” pulse badge for first two items (no data change) */}
        {index < 2 && (
          <span className="absolute top-2 left-2 z-10 rounded-full bg-green-600 text-white text-xs font-bold px-2 py-1 animate-[pulse_1.6s_ease-in-out_infinite]">
            New
          </span>
        )}

        {/* hover overlay (unchanged behavior) */}
        <div className="absolute inset-0 bg-black bg-opacity-70 flex flex-col justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-white text-center px-4">
          <p className="mb-4 text-sm">{act.description}</p>
          <button
            className="flex items-center gap-2 bg-white text-purple-700 font-bold px-5 py-2 rounded-full shadow-lg hover:bg-purple-100 transition scale-95 group-hover:scale-100"
            type="button"
          >
            <span>Start 🚀</span>
          </button>
        </div>
      </div>
    </Link>
  );
};

const ActivitiesGrid = () => {
  const [focusIndex, setFocusIndex] = useState(0);
  const linkRefs = useRef([]);

  // keyboard navigation for the grid
  useEffect(() => {
    const onKey = (e) => {
      if (["INPUT", "TEXTAREA"].includes(e.target.tagName)) return;
      if (e.key === "ArrowRight") {
        setFocusIndex((i) => (i + 1) % activities.length);
      } else if (e.key === "ArrowLeft") {
        setFocusIndex((i) => (i - 1 + activities.length) % activities.length);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    linkRefs.current[focusIndex]?.focus();
  }, [focusIndex]);

  return (
    <section className="p-10 bg-gradient-to-br from-yellow-50 to-blue-100 min-h-screen">
      <h2 className="text-4xl font-extrabold text-center text-purple-800 mb-10 drop-shadow-lg">
        🎉 Explore Cyber Fun – Just for You!
      </h2>

      <div className="flex flex-wrap justify-center gap-8 motion-reduce:transform-none">
        {activities.map((act, index) => (
          <ActivityCard
            key={index}
            act={act}
            index={index}
            linkRef={(el) => (linkRefs.current[index] = el)}
          />
        ))}
      </div>

      {/* tiny CSS for custom animations */}
      <style>{`
        @keyframes spin { from { transform: rotate(0deg) } to { transform: rotate(360deg) } }
        @keyframes pulse { 0%,100% { transform: scale(1); opacity: 1 } 50% { transform: scale(1.05); opacity: .8 } }
        @keyframes ripple { from { transform: scale(0); opacity: .6 } to { transform: scale(1); opacity: 0 } }
        @media (prefers-reduced-motion: reduce) {
          .animate-[spin_6s_linear_infinite],
          .animate-[pulse_1.6s_ease-in-out_infinite],
          .animate-[ripple_700ms_ease-out] { animation: none !important; }
          .hover\\:scale-110:hover { transform: none !important; }
        }
      `}</style>
    </section>
  );
};

export default ActivitiesGrid;
