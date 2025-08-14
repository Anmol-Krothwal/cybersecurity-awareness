import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

const activities = [
  {
    title: "Website Exploitation Sandbox ",
    description:
      "Practice identifying and exploiting common website vulnerabilities in a safe, virtual environment. Learn hands-on techniques for SQL injection, XSS, and more—without legal risks.",
    image: "/assets/Image/teenscover/thumb24.png",
    link: "/CyberEnthusiastSandbox",
    bgColor: "bg-red",
  },
  {
    title: "Network Reconnaissance Simulator ",
    description:
      "Simulate scanning networks, mapping hosts, and discovering services using ethical hacking tools. Build your reconnaissance skills while analyzing realistic network topologies.",
    image: "/assets/Image/teenscover/thumb25.png",
    link: "/NetworkSimulator",
    bgColor: "bg-white",
  },
  {
    title: "Packet Sniffing Simulator ",
    description:
      "Capture and analyze simulated network traffic to identify credentials, malware, and suspicious activity. Perfect for learning Wireshark-style packet analysis in a guided setting.",
    image: "/assets/Image/teenscover/thumb26.png",
    link: "/PacketSniffingSimulator",
    bgColor: "bg-white",
  },
  {
    title: "Forensic File Hunt ",
    description:
      "Search through digital evidence files for hidden clues using metadata analysis, hex viewers, and timeline reconstruction. Experience real-world digital forensics investigation challenges.",
    image: "/assets/Image/teenscover/thumb27.png",
    link: "/ForensicFileHunt",
    bgColor: "bg-white",
  },
  {
    title: "CryptoCrack Lab ",
    description:
      "Learn and break classic and modern ciphers through interactive challenges. From Caesar shifts to RSA puzzles, test your cryptography and code-breaking skills.",
    image: "/assets/Image/teenscover/thumb28.png",
    link: "/CryptoCrackLab",
    bgColor: "bg-white",
  },
  {
    title: "Malware Lab Escape Room ",
    description:
      "Work through reverse engineering clues, log analysis, and encoded payloads to ‘escape’ the virtual malware lab. Gamified learning meets real malware analysis concepts.",
    image: "/assets/Image/teenscover/thumb29.png",
    link: "/MalwareEscapeRoom",
    bgColor: "bg-white",
  },
  {
    title: "IoT Hacking Sandbox ",
    description:
      "Explore vulnerabilities in simulated smart home devices like cameras, thermostats, and locks. Practice exploiting weak firmware and insecure protocols in a safe lab.",
    image: "/assets/Image/teenscover/thumb30.png",
    link: "/IoTHackingSandbox",
    bgColor: "bg-white",
  },
];

const tagColors = {
  New: "bg-cyan-50 text-cyan-700 border-cyan-200",
  "In progress": "bg-amber-50 text-amber-700 border-amber-200",
  Completed: "bg-emerald-50 text-emerald-700 border-emerald-200",
};

const FAV_KEY = "adult_favs_v1";
const PROG_KEY = "adult_prog_v1";

const ActivitiesGrid = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const [progress, setProgress] = useState({});
  const [q, setQ] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [onlyFavs, setOnlyFavs] = useState(false);
  const [density, setDensity] = useState(100); // 90–115
  const navigate = useNavigate();

  // Load persisted state
  useEffect(() => {
    try {
      const f = JSON.parse(localStorage.getItem(FAV_KEY) || "[]");
      const p = JSON.parse(localStorage.getItem(PROG_KEY) || "{}");
      if (Array.isArray(f)) setFavorites(f);
      if (p && typeof p === "object") setProgress(p);
    } catch {}
  }, []);
  // Persist on change
  useEffect(() => {
    try { localStorage.setItem(FAV_KEY, JSON.stringify(favorites)); } catch {}
  }, [favorites]);
  useEffect(() => {
    try { localStorage.setItem(PROG_KEY, JSON.stringify(progress)); } catch {}
  }, [progress]);

  const cycleProgress = (title) => {
    const order = ["New", "In progress", "Completed"];
    const current = progress[title] || "New";
    const next = order[(order.indexOf(current) + 1) % order.length];
    setProgress((p) => ({ ...p, [title]: next }));
  };

  const toggleFav = (title) => {
    setFavorites((f) =>
      f.includes(title) ? f.filter((t) => t !== title) : [...f, title]
    );
  };

  const handleClick = (activity) => {
    if (navigator?.vibrate) navigator.vibrate(8);
    if (activity.title === "CV Scam Detector") {
      setShowPopup(true);
      setTimeout(() => {
        setShowPopup(false);
        navigate("/AdultAct");
      }, 2500);
    } else {
      navigate(activity.link);
    }
  };

  const filtered = useMemo(() => {
    const term = q.trim().toLowerCase();
    return activities
      .filter((a) => {
        if (onlyFavs && !favorites.includes(a.title)) return false;
        if (statusFilter !== "All" && (progress[a.title] || "New") !== statusFilter)
          return false;
        if (!term) return true;
        return (
          a.title.toLowerCase().includes(term) ||
          a.description.toLowerCase().includes(term)
        );
      })
      .sort((a, b) => a.title.localeCompare(b.title));
  }, [q, onlyFavs, statusFilter, favorites, progress]);

  // gentle 3D tilt (respects reduced motion)
  const prefersReduced =
    typeof window !== "undefined" &&
    window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;

  const tilt = (e, el) => {
    if (!el || prefersReduced) return;
    const r = el.getBoundingClientRect();
    const x = e.clientX - r.left;
    const y = e.clientY - r.top;
    const rx = ((y - r.height / 2) / r.height) * -4;
    const ry = ((x - r.width / 2) / r.width) * 4;
    el.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) translateZ(0)`;
  };
  const resetTilt = (el) => {
    if (!el) return;
    el.style.transform = "perspective(900px) rotateX(0) rotateY(0)";
  };

  return (
    <section
      className="min-h-screen px-6 py-12 bg-gradient-to-b from-gray-50 to-gray-100"
      style={{ fontSize: `${density}%` }}
    >
      <div className="max-w-6xl mx-auto">
        <header className="mb-6 md:mb-8">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900 text-center">
            Professional Activities for{" "}
            <span className="text-cyan-700">Cyber Enthusiasts</span>
          </h2>
          <p className="mt-3 text-gray-600 text-center">
            Hands-on modules focused on real techniques, clear outcomes, and best practices.
          </p>
        </header>

        {/* Controls */}
        <div className="mb-8 flex flex-col md:flex-row items-stretch md:items-center gap-3">
          <div className="flex-1 flex items-center gap-2">
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search modules (e.g., wireshark, forensics, XSS)…"
              className="w-full rounded-xl border border-gray-300 bg-white px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
              aria-label="Search activities"
            />
            <button
              onClick={() => setQ("")}
              className="px-3 py-2 rounded-lg border border-gray-300 bg-white hover:bg-gray-50"
              title="Clear search"
            >
              Clear
            </button>
          </div>

          <div className="flex items-center gap-2">
            <label className="text-sm text-gray-600">Status</label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="rounded-xl border border-gray-300 bg-white px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
            >
              <option>All</option>
              <option>New</option>
              <option>In progress</option>
              <option>Completed</option>
            </select>

            <button
              onClick={() => setOnlyFavs((v) => !v)}
              className={`rounded-xl px-3 py-2 border shadow-sm ${
                onlyFavs
                  ? "bg-yellow-50 border-yellow-200 text-yellow-700"
                  : "bg-white border-gray-300 text-gray-700"
              }`}
              title="Toggle favorites filter"
            >
              {onlyFavs ? "★ Favorites" : "☆ Favorites"}
            </button>

            <div className="flex items-center gap-2 ml-2">
              <span className="text-sm text-gray-600">Density</span>
              <input
                type="range"
                min={90}
                max={115}
                step={5}
                value={density}
                onChange={(e) => setDensity(parseInt(e.target.value, 10))}
                aria-label="Card density"
              />
            </div>
          </div>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((act) => (
            <Card
              key={act.title}
              act={act}
              isFav={favorites.includes(act.title)}
              badge={progress[act.title] || "New"}
              onFav={() => toggleFav(act.title)}
              onBadge={() => cycleProgress(act.title)}
              onOpen={() => handleClick(act)}
              tilt={tilt}
              resetTilt={resetTilt}
            />
          ))}
        </div>
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

const Card = ({
  act,
  isFav,
  badge,
  onFav,
  onBadge,
  onOpen,
  tilt,
  resetTilt,
}) => {
  const [cardEl, setCardEl] = useState(null);
  const [ripples, setRipples] = useState([]);

  const onCardClick = (e) => {
    const rect = cardEl?.getBoundingClientRect();
    if (rect) {
      setRipples((r) => [
        ...r,
        { x: e.clientX - rect.left, y: e.clientY - rect.top, id: Date.now() },
      ]);
      setTimeout(() => setRipples((r) => r.slice(1)), 500);
    }
    onOpen();
  };

  const onKey = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onOpen();
    }
    // Quick shortcuts for power users (doesn't change base behavior)
    if (e.key.toLowerCase() === "f") {
      e.preventDefault();
      onFav();
    }
    if (e.key === ".") {
      e.preventDefault();
      onBadge();
    }
  };

  return (
    <div
      ref={setCardEl}
      role="button"
      tabIndex={0}
      onKeyDown={onKey}
      onClick={onCardClick}
      onMouseMove={(e) => tilt(e, cardEl)}
      onMouseLeave={() => resetTilt(cardEl)}
      className={`relative group ${act.bgColor} rounded-2xl overflow-hidden cursor-pointer
      border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300`}
      style={{ transformStyle: "preserve-3d" }}
    >
      {/* Image with bottom badge & save */}
      <div className="h-50 w-full overflow-hidden relative">
        <img
          src={act.image}
          alt={act.title}
          className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-[1.03]"
          draggable="false"
        />

        {/* Bottom badge */}
        <div className="absolute bottom-2 left-3 z-20">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onBadge();
            }}
            className={`rounded-full border px-2.5 py-1 text-[11px] font-semibold ${tagColors[badge]}`}
            title="Click to update status (.)"
          >
            {badge}
          </button>
        </div>

        {/* Save button */}
        <div className="absolute bottom-2 right-3 z-20">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onFav();
            }}
            className="rounded-full border border-gray-300 bg-white/90 px-2.5 py-1 text-[12px] font-medium text-gray-700 hover:bg-white"
            aria-label="Toggle favorite"
            title="Toggle favorite (F)"
          >
            {isFav ? "★ Saved" : "☆ Save"}
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900">{act.title}</h3>
        <p className="mt-1 text-sm text-gray-600 line-clamp-4">{act.description}</p>

        <div className="mt-4 flex items-center justify-between">
          <span className="text-xs text-gray-500">Click to open</span>
          <span className="inline-flex items-center text-sm font-semibold text-cyan-700">
            Start →
          </span>
        </div>
      </div>

      {/* Ripple effect */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {ripples.map((r) => (
          <span
            key={r.id}
            className="absolute block w-2 h-2 rounded-full bg-cyan-400/30 animate-[ripple_0.5s_ease-out]"
            style={{ left: r.x, top: r.y, transform: "translate(-50%, -50%)" }}
          />
        ))}
      </div>

      {/* Hover outline */}
      <span className="pointer-events-none absolute inset-0 rounded-2xl ring-0 group-hover:ring-1 ring-cyan-300/60 transition" />

      {/* Ripple animation + reduced motion */}
      <style>{`
        @keyframes ripple {
          0% { transform: translate(-50%, -50%) scale(0); opacity: 0.6; }
          100% { transform: translate(-50%, -50%) scale(16); opacity: 0; }
        }
        @media (prefers-reduced-motion: reduce) {
          .group:hover img { transform: none !important; }
        }
      `}</style>
    </div>
  );
};

export default ActivitiesGrid;
