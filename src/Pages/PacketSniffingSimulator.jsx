import React, { useEffect, useMemo, useRef, useState } from "react";
import { Pie } from "react-chartjs-2";
import { Chart, ArcElement, Tooltip, Legend } from "chart.js";
import Confetti from "react-confetti";
import NavbarEnthusiast from "../Components/NavbarEnthusiast";
import FooterEnthusiast from "../Components/FooterEnthusiast";

Chart.register(ArcElement, Tooltip, Legend);

/** ---------- DATA ---------- */
const allPackets = [
  { time: "0.001", src: "192.168.1.10", dst: "192.168.1.1", protocol: "HTTP", info: "GET /login" },
  { time: "0.045", src: "192.168.1.10", dst: "192.168.1.1", protocol: "HTTP", info: "POST /login user=admin" },
  { time: "0.203", src: "192.168.1.1", dst: "192.168.1.10", protocol: "HTTP", info: "200 OK Set-Cookie" },
  { time: "0.301", src: "192.168.1.10", dst: "8.8.8.8", protocol: "DNS", info: "Query: google.com" },
  { time: "0.450", src: "8.8.8.8", dst: "192.168.1.10", protocol: "DNS", info: "Response: 142.250.190.78" },
  { time: "0.610", src: "192.168.1.10", dst: "142.250.190.78", protocol: "TLSv1.3", info: "Client Hello" },
  { time: "0.790", src: "142.250.190.78", dst: "192.168.1.10", protocol: "TLSv1.3", info: "Server Hello" },
  { time: "0.900", src: "192.168.1.10", dst: "192.168.1.1", protocol: "HTTP", info: "Credit Card: 4111-1111-1111-1111" },
  { time: "1.010", src: "192.168.1.10", dst: "10.0.0.5", protocol: "FTP", info: "USER anonymous" },
  { time: "1.120", src: "10.0.0.5", dst: "192.168.1.10", protocol: "FTP", info: "331 Password required" },
  { time: "1.260", src: "192.168.1.10", dst: "10.0.0.5", protocol: "FTP", info: "PASS anonymous@domain.com" },
  { time: "1.380", src: "10.0.0.5", dst: "192.168.1.10", protocol: "FTP", info: "230 Login successful" },
  { time: "1.460", src: "192.168.1.10", dst: "192.168.1.100", protocol: "SMTP", info: "MAIL FROM:<user@example.com>" },
  { time: "1.510", src: "192.168.1.100", dst: "192.168.1.10", protocol: "SMTP", info: "250 OK" },
  { time: "1.600", src: "192.168.1.10", dst: "192.168.1.100", protocol: "SMTP", info: "RCPT TO:<admin@example.com>" },
  { time: "1.730", src: "192.168.1.10", dst: "192.168.1.1", protocol: "HTTP", info: "GET /dashboard" },
  { time: "1.830", src: "192.168.1.1", dst: "192.168.1.10", protocol: "HTTP", info: "Set-Cookie: sessionid=abcd1234" },
  { time: "1.960", src: "192.168.1.10", dst: "10.10.10.1", protocol: "ICMP", info: "Echo (ping) request" },
  { time: "2.010", src: "10.10.10.1", dst: "192.168.1.10", protocol: "ICMP", info: "Echo reply" },
  { time: "2.150", src: "192.168.1.10", dst: "172.16.0.1", protocol: "HTTPS", info: "POST /login" },
  { time: "2.270", src: "172.16.0.1", dst: "192.168.1.10", protocol: "HTTPS", info: "302 Redirect" },
  { time: "2.350", src: "192.168.1.10", dst: "192.168.1.1", protocol: "HTTP", info: "GET /profile picture" },
  { time: "2.420", src: "192.168.1.1", dst: "192.168.1.10", protocol: "HTTP", info: "Content-Type: image/jpeg" },
  { time: "2.560", src: "192.168.1.10", dst: "192.168.1.50", protocol: "DNS", info: "Query: api.bank.com" },
  { time: "2.610", src: "192.168.1.50", dst: "192.168.1.10", protocol: "DNS", info: "Response: 198.51.100.5" },
  { time: "2.740", src: "192.168.1.10", dst: "198.51.100.5", protocol: "HTTPS", info: "GET /transactions" },
  { time: "2.850", src: "198.51.100.5", dst: "192.168.1.10", protocol: "HTTPS", info: "200 OK JSON response" },
  { time: "2.920", src: "192.168.1.10", dst: "192.168.1.1", protocol: "HTTP", info: "Authorization: Bearer abc.def.ghi" },
  { time: "3.030", src: "192.168.1.1", dst: "192.168.1.10", protocol: "HTTP", info: "403 Forbidden" },
  { time: "3.140", src: "192.168.1.10", dst: "8.8.4.4", protocol: "DNS", info: "Query: malwaredomain.com" },
];

const sensitiveKeywords = [
  "password",
  "credit card",
  "token",
  "login",
  "bearer",
  "authorization",
  "sessionid",
  "set-cookie",
  "user=",
  "pass",
  "rcpt",
  "mail from",
  "post",
  "card",
];

const availableIPs = [
  "All IPs",
  "192.168.1.10",
  "192.168.1.1",
  "8.8.8.8",
  "142.250.190.78",
  "10.0.0.5",
  "192.168.1.100",
  "10.10.10.1",
  "172.16.0.1",
  "192.168.1.50",
  "198.51.100.5",
  "8.8.4.4",
];

const quizQuestions = [
  { question: "Which protocol is encrypted?", options: ["HTTP", "DNS", "TLSv1.3"], answer: 2 },
  { question: "What tool mimics this view?", options: ["Excel", "Wireshark", "VS Code"], answer: 1 },
  { question: "What’s dangerous about plain HTTP?", options: ["It is expensive", "It leaks sensitive data", "It improves SEO"], answer: 1 },
  { question: "What does DNS stand for?", options: ["Data Network Service", "Domain Name System", "Digital Node Server"], answer: 1 },
  { question: "Which of these protocols commonly uses port 443?", options: ["FTP", "TLS", "SMTP"], answer: 1 },
  { question: "What is a packet?", options: ["A virus", "A unit of data sent over a network", "A type of Wi-Fi"], answer: 1 },
  { question: "Why is HTTPS safer than HTTP?", options: ["It’s faster", "It’s open source", "It uses encryption"], answer: 2 },
  { question: "Which protocol is used for sending emails?", options: ["SMTP", "DNS", "SSH"], answer: 0 },
  { question: "What is the main risk of unencrypted traffic?", options: ["Data loss", "Password leaks", "Faster speed"], answer: 1 },
  { question: "What color highlights sensitive data in this simulator?", options: ["Blue", "Red", "Green"], answer: 1 },
  { question: 'What is a "Client Hello" in TLS?', options: ["A ping signal", "An initial handshake message", "An error message"], answer: 1 },
  { question: "What does a hex dump show?", options: ["Graphic layout", "Binary-to-text data", "JavaScript logs"], answer: 1 },
  { question: "Public Wi-Fi best practice?", options: ["Use HTTP only", "Disable firewall", "Use a VPN"], answer: 2 },
  { question: "Which tool captures live packets?", options: ["Slack", "Wireshark", "Notepad++"], answer: 1 },
  { question: "Active sniffing indicator?", options: ["Slow Wi-Fi", "Duplicate ARP requests", "More ads"], answer: 1 },
  { question: "Why inspect metadata?", options: ["To boost graphics", "Analyze behavior & threats", "Clean memory"], answer: 1 },
  { question: "Role of destination IP?", options: ["Origin", "Final delivery address", "Router IP"], answer: 1 },
  { question: "PII means…", options: ["Packet Inspection Interface", "Personally Identifiable Information", "Public Internet Interface"], answer: 1 },
];

const learningPoints = [
  {
    title: "1. What is Packet Sniffing?",
    content:
      'Packet sniffing intercepts and examines data packets traveling across a network. Tools like Wireshark or tcpdump log traffic for analysis—great for troubleshooting, risky when abused.',
  },
  {
    title: "2. How Does Packet Sniffing Work?",
    content:
      "Interfaces switch to promiscuous mode to listen to all frames on the local segment. Packets are decoded to readable protocol layers (L2/L3/L4/L7).",
  },
  {
    title: "3. Real-World Threats",
    content:
      "On insecure networks, attackers can capture credentials, cookies, and tokens over HTTP or weak TLS, leading to account takeovers and fraud.",
  },
  {
    title: "4. Detecting Sniffers",
    content:
      "Look for odd ARP, NICs in promiscuous mode, or suspicious endpoints. IDS/IPS and NetFlow help spot anomalies.",
  },
  {
    title: "5. Protection",
    content:
      "Prefer HTTPS, enforce HSTS, use VPN on public Wi-Fi, segment networks, and harden TLS.",
  },
  {
    title: "6. Ethical Uses",
    content:
      "Blue teams trace malware C2, validate encryption policies, and debug performance using sniffers responsibly.",
  },
];

/** ---------- HELPERS ---------- */
const isSensitive = (text) =>
  sensitiveKeywords.some((w) => text.toLowerCase().includes(w));

const generateHexDump = (text) => {
  const lines = [];
  for (let i = 0; i < text.length; i += 16) {
    const chunk = text.slice(i, i + 16);
    const hex = chunk
      .split("")
      .map((c) => c.charCodeAt(0).toString(16).padStart(2, "0"))
      .join(" ");
    const ascii = chunk.replace(/[^\x20-\x7E]/g, ".");
    lines.push(`${i.toString(16).padStart(4, "0")}  ${hex.padEnd(48)}  ${ascii}`);
  }
  return lines.join("\n");
};

const chipClasses =
  "px-3 py-1 rounded-full border border-cyan-500 text-cyan-200 hover:bg-cyan-700/30 transition cursor-pointer";

/** ---------- MISSIONS (mini-CTF) ---------- */
const missions = [
  {
    id: "cc",
    title: "Find leaked Credit Card",
    hint: "Plain HTTP carrying obvious PII.",
    validator: (p) => p.protocol === "HTTP" && /credit\s*card|4111-1111-1111-1111/i.test(p.info),
    reward: 100,
  },
  {
    id: "ftp",
    title: "Spot plaintext FTP creds",
    hint: "Look for USER/PASS over FTP.",
    validator: (p) => p.protocol === "FTP" && /(USER|PASS)/i.test(p.info),
    reward: 100,
  },
  {
    id: "cookie",
    title: "Identify session cookie",
    hint: "Look for Set-Cookie or sessionid.",
    validator: (p) => p.protocol === "HTTP" && /(set-cookie|sessionid)/i.test(p.info),
    reward: 100,
  },
  {
    id: "token",
    title: "Catch a Bearer token",
    hint: "Authorization header on HTTP.",
    validator: (p) => p.protocol === "HTTP" && /authorization:\s*bearer/i.test(p.info),
    reward: 100,
  },
  {
    id: "dns-bad",
    title: "Flag a suspicious DNS query",
    hint: "The domain name is a giveaway.",
    validator: (p) => p.protocol === "DNS" && /malwaredomain\.com/i.test(p.info),
    reward: 100,
  },
];

/** ---------- COMPONENT ---------- */
const PacketSniffingSimulator = () => {
  // Tabs
  const [activeTab, setActiveTab] = useState("Simulator");

  // Capture engine
  const [capturing, setCapturing] = useState(false);
  const [paused, setPaused] = useState(false);
  const [speed, setSpeed] = useState(1); // 0.25-2x
  const [i, setI] = useState(0);
  const [captured, setCaptured] = useState([]); // array of packets
  const tickRef = useRef(null);

  // Filters & selection
  const [selectedIP, setSelectedIP] = useState("All IPs");
  const [searchTerm, setSearchTerm] = useState("");
  const [protocolFilters, setProtocolFilters] = useState(new Set()); // empty = all
  const [stealthMode, setStealthMode] = useState(false); // hide sensitive text
  const [selectedPacket, setSelectedPacket] = useState(null);

  // Quiz
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizStep, setQuizStep] = useState(0);
  const [quizScore, setQuizScore] = useState(0);
  const [quizComplete, setQuizComplete] = useState(false);

  // Missions
  const [completedMissions, setCompletedMissions] = useState(new Set());
  const missionScore = useMemo(
    () =>
      missions.reduce(
        (sum, m) => sum + (completedMissions.has(m.id) ? m.reward : 0),
        0
      ),
    [completedMissions]
  );

  // Threat feed
  const threats = useMemo(
    () =>
      captured
        .filter((p) => isSensitive(`${p.protocol} ${p.info}`))
        .slice(-5)
        .reverse(),
    [captured]
  );

  // Live chart from captured only (feels real-time)
  const chartData = useMemo(() => {
    const counts = captured.reduce((acc, p) => {
      acc[p.protocol] = (acc[p.protocol] || 0) + 1;
      return acc;
    }, {});
    return {
      labels: Object.keys(counts),
      datasets: [
        {
          label: "Traffic by Protocol",
          data: Object.values(counts),
          backgroundColor: ["#0ea5e9", "#10b981", "#f59e0b", "#ef4444", "#6366f1", "#f43f5e", "#22d3ee"],
          borderWidth: 1,
        },
      ],
    };
  }, [captured]);

  /** Capture loop */
  useEffect(() => {
    if (!capturing || paused) return;
    if (i >= allPackets.length) {
      setCapturing(false);
      setTimeout(() => setShowQuiz(true), 600);
      return;
    }
    const interval = 900 / speed; // base 900ms per pkt
    tickRef.current = setTimeout(() => {
      setCaptured((prev) => [...prev, allPackets[i]]);
      setI((prev) => prev + 1);
    }, interval);
    return () => clearTimeout(tickRef.current);
  }, [capturing, paused, i, speed]);

  /** Keyboard shortcuts: s=start/pause, r=reset, f=focus search */
  useEffect(() => {
    const onKey = (e) => {
      if (e.key.toLowerCase() === "s") {
        if (!capturing) handleStart();
        else setPaused((p) => !p);
      } else if (e.key.toLowerCase() === "r") {
        handleReset();
      } else if (e.key.toLowerCase() === "f") {
        document.getElementById("pss-search")?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [capturing]);

  /** Handlers */
  const handleStart = () => {
    setCapturing(true);
    setPaused(false);
    setI(0);
    setCaptured([]);
    setShowQuiz(false);
    setQuizStep(0);
    setQuizScore(0);
    setQuizComplete(false);
    setSelectedPacket(null);
    setCompletedMissions(new Set());
  };

  const handleReset = () => {
    setCapturing(false);
    setPaused(false);
    setI(0);
    setCaptured([]);
    setShowQuiz(false);
    setQuizStep(0);
    setQuizScore(0);
    setQuizComplete(false);
    setSelectedPacket(null);
    setCompletedMissions(new Set());
  };

  const handleAnswer = (picked) => {
    if (picked === quizQuestions[quizStep].answer) setQuizScore((s) => s + 1);
    if (quizStep + 1 < quizQuestions.length) setQuizStep((s) => s + 1);
    else {
      setShowQuiz(false);
      setQuizComplete(true);
    }
  };

  const toggleProtocol = (proto) => {
    setProtocolFilters((prev) => {
      const n = new Set(prev);
      if (n.has(proto)) n.delete(proto);
      else n.add(proto);
      return n;
    });
  };

  const filteredPackets = useMemo(() => {
    return allPackets.filter((p) => {
      const ipOk =
        selectedIP === "All IPs" || p.src === selectedIP || p.dst === selectedIP;
      const searchOk =
        !searchTerm ||
        `${p.protocol} ${p.info}`.toLowerCase().includes(searchTerm.toLowerCase());
      const protoOk = protocolFilters.size === 0 || protocolFilters.has(p.protocol);
      return ipOk && searchOk && protoOk;
    });
  }, [selectedIP, searchTerm, protocolFilters]);

  const onRowClick = (p) => {
    setSelectedPacket(p);
    // mission auto-check
    missions.forEach((m) => {
      if (!completedMissions.has(m.id) && m.validator(p)) {
        const next = new Set(completedMissions);
        next.add(m.id);
        setCompletedMissions(next);
      }
    });
  };

  const masked = (text) =>
    stealthMode && isSensitive(text) ? text.replace(/[A-Za-z0-9]/g, "•") : text;

  const exportCaptured = () => {
    const blob = new Blob([JSON.stringify(captured, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "captured_packets.json";
    a.click();
    URL.revokeObjectURL(url);
  };

  const protocols = Array.from(new Set(allPackets.map((p) => p.protocol)));

  return (
    <>
       <NavbarEnthusiast/>
    <div className="min-h-screen bg-[#070b16] p-6 text-green-400 font-mono">
      {(quizComplete || completedMissions.size >= missions.length) && <Confetti />}
      <div className="max-w-7xl mx-auto bg-[#0f172a] rounded-2xl shadow-xl border border-cyan-500/60 p-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-bold text-cyan-300">Packet Sniffing Lab</h1>
            <p className="text-green-300/90">Capture, filter, investigate, complete missions, and earn your badge.</p>
          </div>
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 rounded-lg bg-cyan-900/40 border border-cyan-700 text-cyan-200">
              🏅 Score: {missionScore + quizScore * 10}
            </span>
            <span className="px-3 py-1 rounded-lg bg-emerald-900/40 border border-emerald-700 text-emerald-200">
              🎯 Missions: {completedMissions.size}/{missions.length}
            </span>
            <span className="px-3 py-1 rounded-lg bg-indigo-900/40 border border-indigo-700 text-indigo-200">
              📊 Quiz: {quizScore}/{quizQuestions.length}
            </span>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-2 mb-6">
          {["Simulator", "Investigate", "Learn", "Live Chart"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`py-2 px-4 rounded-md border ${
                activeTab === tab
                  ? "bg-cyan-600 text-white"
                  : "border-cyan-500 hover:bg-cyan-700 hover:text-white"
              } transition-all`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* --- SIMULATOR --- */}
        {activeTab === "Simulator" && (
          <>
            {/* Controls */}
            <div className="grid md:grid-cols-3 gap-4 mb-4">
              <div className="flex items-center gap-2">
                <button
                  onClick={handleStart}
                  disabled={capturing && !paused}
                  className="bg-cyan-600 hover:bg-cyan-700 disabled:opacity-50 text-white font-semibold py-2 px-4 rounded-lg"
                >
                  {capturing ? (paused ? "Resume (S)" : "Capturing…") : "Start Capture (S)"}
                </button>
                <button
                  onClick={() => setPaused((p) => !p)}
                  disabled={!capturing}
                  className="bg-amber-600 hover:bg-amber-700 disabled:opacity-50 text-white font-semibold py-2 px-4 rounded-lg"
                >
                  {paused ? "Pause Off" : "Pause (S)"}
                </button>
                <button
                  onClick={handleReset}
                  className="bg-rose-600 hover:bg-rose-700 text-white font-semibold py-2 px-4 rounded-lg"
                >
                  Reset (R)
                </button>
              </div>

              <div className="flex items-center gap-3">
                <label className="text-cyan-200">Speed</label>
                <input
                  type="range"
                  min="0.25"
                  max="2"
                  step="0.25"
                  value={speed}
                  onChange={(e) => setSpeed(parseFloat(e.target.value))}
                  className="w-40 accent-cyan-400"
                />
                <span className="text-cyan-300">{speed.toFixed(2)}×</span>
              </div>

              <div className="flex items-center gap-3 justify-between md:justify-end">
                <div className="flex items-center gap-2">
                  <input
                    id="stealth"
                    type="checkbox"
                    checked={stealthMode}
                    onChange={(e) => setStealthMode(e.target.checked)}
                    className="accent-cyan-400"
                  />
                  <label htmlFor="stealth" className="text-cyan-200">
                    Stealth mode (mask sensitive)
                  </label>
                </div>
                <button
                  onClick={exportCaptured}
                  className="bg-slate-800 hover:bg-slate-700 border border-cyan-700 text-cyan-200 py-2 px-4 rounded-lg"
                >
                  ⬇️ Export JSON
                </button>
              </div>
            </div>

            {/* Timeline */}
            <div className="w-full bg-gray-700 h-2 rounded-full mb-3">
              <div
                className="bg-green-400 h-2 transition-all"
                style={{ width: `${(i / allPackets.length) * 100}%` }}
              />
            </div>
            <div className="flex items-center gap-3 mb-4">
              <input
                type="range"
                min={0}
                max={allPackets.length}
                value={i}
                onChange={(e) => {
                  const idx = parseInt(e.target.value, 10);
                  setI(idx);
                  setCaptured(allPackets.slice(0, idx));
                }}
                className="w-full accent-emerald-400"
              />
              <span className="text-cyan-300 text-sm">pkt {i}/{allPackets.length}</span>
            </div>

            {/* Console & Threats */}
            <div className="grid lg:grid-cols-3 gap-4">
              <div className="lg:col-span-2">
                <div className="bg-black h-64 overflow-y-auto border border-green-500 p-4 rounded-lg mb-4">
                  {captured.length === 0 ? (
                    <p className="text-center text-gray-400">Press Start to begin capturing…</p>
                  ) : (
                    captured.map((p, idx) => (
                      <div
                        key={idx}
                        className={`mb-1 cursor-pointer ${isSensitive(`${p.protocol} ${p.info}`) ? "text-red-400" : "text-green-300"}`}
                        onClick={() => onRowClick(p)}
                      >
                        [{p.time}] {p.src} → {p.dst} {p.protocol} — {masked(p.info)}
                      </div>
                    ))
                  )}
                </div>

                {/* Missions */}
                <div className="bg-[#0b1224] border border-cyan-700 rounded-lg p-4">
                  <h3 className="text-cyan-300 font-semibold mb-3">🎯 Missions</h3>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {missions.map((m) => (
                      <div
                        key={m.id}
                        className={`p-3 rounded-lg border ${
                          completedMissions.has(m.id)
                            ? "border-emerald-600 bg-emerald-900/30"
                            : "border-cyan-600 bg-cyan-900/20"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-cyan-200">{m.title}</span>
                          <span className="text-xs text-emerald-300">+{m.reward}</span>
                        </div>
                        <div className="text-xs text-cyan-300/70 mt-1">Hint: {m.hint}</div>
                        {completedMissions.has(m.id) && (
                          <div className="text-emerald-300 text-xs mt-2">✅ Completed</div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Threat feed */}
              <div className="bg-[#0b1224] border border-rose-700 rounded-lg p-4">
                <h3 className="text-rose-300 font-semibold mb-3">⚠️ Threat Alerts</h3>
                {threats.length === 0 ? (
                  <div className="text-rose-200/70 text-sm">No sensitive findings (yet)…</div>
                ) : (
                  <ul className="space-y-2">
                    {threats.map((p, k) => (
                      <li key={k} className="text-rose-200 text-sm">
                        [{p.time}] {p.protocol} — {masked(p.info)}
                      </li>
                    ))}
                  </ul>
                )}
                <div className="mt-4 text-xs text-rose-200/70">
                  Tip: Red items are potential PII, credentials, tokens, or cookies in transit.
                </div>
              </div>
            </div>

            {/* Quiz trigger */}
            {showQuiz && (
              <div className="bg-[#0b1224] border border-cyan-700 rounded-lg p-6 mt-6">
                <h2 className="text-xl text-cyan-400 mb-4 text-center">🧪 Knowledge Check</h2>
                <p className="text-lg mb-3 font-semibold">{quizQuestions[quizStep].question}</p>
                <div className="grid sm:grid-cols-3 gap-3">
                  {quizQuestions[quizStep].options.map((opt, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleAnswer(idx)}
                      className="w-full bg-cyan-700 hover:bg-cyan-800 text-white py-2 px-4 rounded-md"
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {quizComplete && (
              <div className="text-center text-cyan-200 mt-6 font-semibold text-lg">
                🎉 Quiz complete! You scored {quizScore}/{quizQuestions.length}.
                <div className="text-green-300 mt-2 italic">
                  Badge unlocked: <span className="not-italic font-bold">Sniffer Level 1</span>
                </div>
              </div>
            )}
          </>
        )}

        {/* --- INVESTIGATE (Wireshark-like table) --- */}
        {activeTab === "Investigate" && (
          <>
            {/* Filters */}
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <label className="text-cyan-300 font-semibold">Filter by IP:</label>
              <select
                value={selectedIP}
                onChange={(e) => setSelectedIP(e.target.value)}
                className="bg-gray-800 border border-cyan-500 text-white px-4 py-2 rounded-md"
              >
                {availableIPs.map((ip) => (
                  <option key={ip}>{ip}</option>
                ))}
              </select>

              <input
                id="pss-search"
                type="text"
                placeholder="Search info/protocol…"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-gray-800 border border-cyan-500 text-white px-4 py-2 rounded-md flex-1"
              />

              <div className="flex items-center gap-2">
                <input
                  id="stealth2"
                  type="checkbox"
                  checked={stealthMode}
                  onChange={(e) => setStealthMode(e.target.checked)}
                  className="accent-cyan-400"
                />
                <label htmlFor="stealth2" className="text-cyan-200">Mask sensitive</label>
              </div>
            </div>

            {/* Protocol chips */}
            <div className="flex flex-wrap gap-2 mb-3">
              {protocols.map((proto) => (
                <button
                  key={proto}
                  onClick={() => toggleProtocol(proto)}
                  className={`${chipClasses} ${
                    protocolFilters.has(proto) ? "bg-cyan-700/50" : ""
                  }`}
                >
                  {proto}
                </button>
              ))}
              <button
                onClick={() => setProtocolFilters(new Set())}
                className={`${chipClasses} border-emerald-500 text-emerald-200`}
              >
                Clear
              </button>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-sm border border-cyan-600 rounded-lg">
                <thead className="bg-cyan-800 text-white">
                  <tr>
                    <th className="p-2">Time</th>
                    <th className="p-2">Source</th>
                    <th className="p-2">Destination</th>
                    <th className="p-2">Protocol</th>
                    <th className="p-2">Info</th>
                  </tr>
                </thead>
                <tbody className="bg-black text-green-300">
                  {filteredPackets.map((p, idx) => {
                    const sensitive = isSensitive(`${p.protocol} ${p.info}`);
                    return (
                      <tr
                        key={idx}
                        className={`cursor-pointer hover:bg-green-800 ${
                          sensitive ? "bg-red-900 text-white font-semibold" : ""
                        }`}
                        onClick={() => onRowClick(p)}
                      >
                        <td className="p-2">{p.time}</td>
                        <td className="p-2">{p.src}</td>
                        <td className="p-2">{p.dst}</td>
                        <td className="p-2">{p.protocol}</td>
                        <td className="p-2">{masked(p.info)}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Packet modal */}
            {selectedPacket && (
              <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
                <div className="bg-[#0d1326] text-green-300 border border-cyan-500 p-6 rounded-xl w-[92%] max-w-3xl">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-xl font-bold text-cyan-300">
                      Packet Detail — {selectedPacket.protocol}
                    </h3>
                    <button
                      onClick={() => setSelectedPacket(null)}
                      className="bg-cyan-700 hover:bg-cyan-800 text-white px-3 py-1 rounded-md"
                    >
                      Close
                    </button>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-black p-3 rounded-lg border border-cyan-700/50">
                      <h4 className="text-cyan-200 font-semibold mb-2">Summary</h4>
                      <div className="text-sm space-y-1">
                        <div><span className="text-cyan-400">Time:</span> {selectedPacket.time}</div>
                        <div><span className="text-cyan-400">Source:</span> {selectedPacket.src}</div>
                        <div><span className="text-cyan-400">Destination:</span> {selectedPacket.dst}</div>
                        <div><span className="text-cyan-400">Protocol:</span> {selectedPacket.protocol}</div>
                        <div><span className="text-cyan-400">Info:</span> {masked(selectedPacket.info)}</div>
                        <div className="mt-2 text-xs text-rose-300">
                          {isSensitive(`${selectedPacket.protocol} ${selectedPacket.info}`) ? "⚠️ Potentially sensitive" : "✅ No obvious sensitivity"}
                        </div>
                      </div>
                    </div>
                    <div className="bg-black p-3 rounded-lg border border-cyan-700/50">
                      <h4 className="text-cyan-200 font-semibold mb-2">Hex Dump (payload)</h4>
                      <pre className="text-xs overflow-x-auto whitespace-pre-wrap">
                        {generateHexDump(selectedPacket.info)}
                      </pre>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </>
        )}

        {/* --- LEARN --- */}
        {activeTab === "Learn" && (
          <div>
            {learningPoints.map((point, idx) => (
              <div key={idx} className="mb-4">
                <h3 className="text-lg text-cyan-300 font-semibold">{point.title}</h3>
                <p className="text-green-200">{point.content}</p>
              </div>
            ))}
            <div className="mt-4 text-xs text-cyan-300/70">
              Pro tip: Try toggling Stealth Mode (masking) and protocol filters to mimic blue-team workflows.
            </div>
          </div>
        )}

        {/* --- LIVE CHART --- */}
        {activeTab === "Live Chart" && (
          <div className="bg-black p-6 rounded-lg">
            <h2 className="text-cyan-300 text-xl mb-4 text-center">📊 Live Protocol Distribution</h2>
            <div className="max-w-md mx-auto">
              <Pie data={chartData} />
            </div>
            <div className="text-center text-xs text-cyan-300/70 mt-3">
              Chart reflects only packets captured so far (use Start/Timeline).
            </div>
          </div>
        )}
      </div>
    </div>
     <FooterEnthusiast/>
    </>
  );
};

export default PacketSniffingSimulator;
