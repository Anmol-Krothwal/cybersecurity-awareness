import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Line, Pie } from "react-chartjs-2";
import NavbarEnthusiast from "../Components/NavbarEnthusiast";
import FooterEnthusiast from "../Components/FooterEnthusiast";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  CategoryScale,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(LineElement, PointElement, LinearScale, Title, CategoryScale, ArcElement, Tooltip, Legend);

/* ------------------- YOUR DATA (unchanged) ------------------- */
const forensicDataSets = {
  "Data Set 1": {
    metadata:
      "Owner: Admin\nSuspicious file: invoice.exe\nCreated: 2023-05-01\nModified: 2023-06-15\nAccessed: 2023-07-01",
    hexDump: "4D 5A 90 00 03 00 00 00 04 00 00 00 FF FF 00 00 B8 00 00 00\n... (truncated)",
    timeline: "May 1: Created\nJune 15: Modified\nJuly 1: Suspicious Activity\nJuly 2: Unknown Login",
    hashes: "MD5: abc123...\nSHA256: def456...",
    strings: "http://malicious.com\n/bin/sh\n%APPDATA%",
    virusTotal: "6/70 engines flagged\nLabels: Trojan.Generic\nScan Date: 2023-07-03",
    funFact: "💡 Malware often pretends to be documents using names like \"invoice.pdf.exe\".",
    fileTree: [
      { folder: "Documents", files: ["resume.pdf", "invoice.exe"] },
      { folder: "Downloads", files: ["game.zip", "install.bat"] },
    ],
    permissions: [
      { file: "invoice.exe", owner: "admin", permission: "rwxr-xr--" },
      { file: "resume.pdf", owner: "user1", permission: "rw-r--r--" },
    ],
    hashMatchResult: '✅ Match Found: invoice.exe matches signature "Trojan.Generic.ABC"',
    timelineEvents: [
      { date: "2023-05-01", event: "File Created" },
      { date: "2023-06-15", event: "File Modified" },
      { date: "2023-07-01", event: "Malware Detected" },
      { date: "2023-07-02", event: "Unknown Login" },
    ],
    fileTypesStats: {
      labels: [".exe", ".pdf", ".zip", ".bat"],
      data: [1, 2, 1, 1],
    },
  },

  "iPhone 6s Backup": {
    metadata:
      "Owner: SarahW\nSuspicious file: backup_restore.sh\nCreated: 2022-11-01\nModified: 2023-01-12\nAccessed: 2023-01-15",
    hexDump: "62 61 63 6B 75 70 5F 72 65 73 74 6F 72 65 2E 73 68\n... (truncated)",
    timeline:
      "Nov 1: Backup Created\nJan 12: Modified by unknown script\nJan 15: Unauthorized access from foreign IP",
    hashes: "MD5: a1f2e3c4d5...\nSHA256: f2c5a8b3de...",
    strings: "restore.sh\n/private/var/mobile/Containers/Data\n--decrypt\nhttps://backup-restore.io",
    virusTotal: "14/70 engines flagged\nLabels: Trojan.BackupStealer\nScan Date: 2023-01-20",
    funFact: "💡 Mobile backups can contain everything from messages to app tokens. Encrypt your backups!",
    fileTree: [
      { folder: "iOS_Backups", files: ["contacts.db", "chat.db", "backup_restore.sh"] },
      { folder: "Photos", files: ["vacation1.jpg", "selfie.png"] },
    ],
    permissions: [
      { file: "backup_restore.sh", owner: "mobile", permission: "rwxr-xr-x" },
      { file: "chat.db", owner: "mobile", permission: "rw-------" },
    ],
    hashMatchResult: "❌ No match: backup_restore.sh is unknown but has malicious patterns.",
    timelineEvents: [
      { date: "2022-11-01", event: "Backup Initiated" },
      { date: "2023-01-12", event: "Script Modified Files" },
      { date: "2023-01-15", event: "Foreign IP Access Detected" },
    ],
    fileTypesStats: {
      labels: [".sh", ".db", ".jpg", ".png"],
      data: [1, 2, 1, 1],
    },
  },
};

const tabList = [
  "Case Overview",
  "Metadata",
  "Hex Dump",
  "Timeline",
  "File Hashes",
  "Strings",
  "VirusTotal",
  "File Tree",
  "Permissions",
  "Hash Checker",
  "IOC / Regex Hunt",
  "YARA-lite",
  "Entropy Scan",
  "Timeline Chart",
  "File Types",
];

const quizQuestions = [
  {
    question: "Which file header typically indicates a Windows PE executable?",
    options: ["%PDF-", "MZ", "PK"],
    answer: 1,
    explanation: 'PE files start with the DOS header "MZ".'
  },
  {
    question: "In forensics, MAC times most commonly refer to…",
    options: ["Modified, Accessed, Created", "Modified, Archived, Copied", "Moved, Allocated, Cleared"],
    answer: 0,
    explanation: "MAC = Modified, Accessed, Created timestamps."
  },
  {
    question: "Why compute MD5/SHA-256 for a suspect file?",
    options: ["To verify integrity/identify known samples", "To increase file size", "To obfuscate the file"],
    answer: 0,
    explanation: "Hashes help integrity checks and matching against threat intel."
  },
  {
    question: "VirusTotal shows 1/70 detections. What’s the right approach?",
    options: ["Guaranteed malware—immediately delete", "Treat as suspicious; corroborate with other evidence", "Safe file—no further action"],
    answer: 1,
    explanation: "Low detections can be false positives; investigate further."
  },
  {
    question: "Which of these looks most like a network IOC?",
    options: ["/usr/local/bin/tool", "http://malicious.com", "%APPDATA%"],
    answer: 1,
    explanation: "Suspicious domains/URLs are classic network IOCs."
  },
  {
    question: "What’s suspicious about “invoice.pdf.exe”?",
    options: ["Nothing unusual", "Double extension meant to disguise an executable", "It’s too small"],
    answer: 1,
    explanation: "Attackers use double extensions to trick users."
  },
  {
    question: "High entropy in a payload most likely indicates…",
    options: ["Plaintext configuration", "Compression/encryption/packing", "Clean coding style"],
    answer: 1,
    explanation: "Packed or encrypted data has higher entropy."
  },
  {
    question: "Which backup artifact likely stores chat messages on iOS?",
    options: ["contacts.db", "chat.db", "selfie.png"],
    answer: 1,
    explanation: "Chats are commonly stored in a database like chat.db."
  },
  {
    question: "A common Windows persistence location is…",
    options: ["HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Run", "/etc/hosts", "C:\\Windows\\Temp (auto-cleans)"],
    answer: 0,
    explanation: "The Run key launches programs at user logon."
  },
  {
    question: "Which pattern can indicate Base64-encoded data?",
    options: ["Looks like a URL", "A–Z/a–z/0–9/+ and often ends with '=' or '=='", "Only hex digits 0–9 A–F"],
    answer: 1,
    explanation: "Base64 uses A–Z, a–z, 0–9, +, / and may pad with '='."
  }
];


/* ------------------- NEW: Missions (mini-CTF) ------------------- */
const missions = [
  {
    id: "double-ext",
    title: "Spot a double extension",
    hint: "Look for .pdf.exe disguises.",
    validate: (d) =>
      /pdf\.exe/i.test(d.metadata) || /pdf\.exe/i.test(d.strings) || /invoice\.exe/i.test(d.metadata),
    reward: 100,
  },
  {
    id: "vt-flag",
    title: "Confirm VirusTotal flags",
    hint: "Engines flagged the sample.",
    validate: (d) => /\b\d+\/\d+\b/.test(d.virusTotal) || /flagged/i.test(d.virusTotal),
    reward: 100,
  },
  {
    id: "persistence",
    title: "Find persistence clue",
    hint: "Install scripts, bat files, or autoruns.",
    validate: (d) => /install\.bat/i.test(d.strings) || /install\.bat/i.test(JSON.stringify(d.fileTree)),
    reward: 100,
  },
  {
    id: "network-ioc",
    title: "Identify network IOC",
    hint: "Suspicious domain/URL.",
    validate: (d) => /(malicious\.com|backup-restore\.io)/i.test(d.strings),
    reward: 100,
  },
];

/* ------------------- Helpers ------------------- */
const bytesFromHexDump = (hexDump) => {
  // extracts bytes from the first line only if truncated, still fine for demo
  const firstLine = hexDump.split("\n")[0];
  const hexes = firstLine.split(/\s+/).filter((h) => /^[0-9A-Fa-f]{2}$/.test(h));
  return hexes.map((h) => parseInt(h, 16));
};

const shannonEntropy = (arr) => {
  if (!arr.length) return 0;
  const freq = new Map();
  arr.forEach((b) => freq.set(b, (freq.get(b) || 0) + 1));
  let H = 0;
  const n = arr.length;
  for (const [, count] of freq) {
    const p = count / n;
    H += -p * Math.log2(p);
  }
  return H; // 0..8 for bytes
};

const highlight = (text, term) => {
  if (!term) return text;
  const parts = text.split(new RegExp(`(${term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`, "ig"));
  return parts.map((p, i) =>
    i % 2 === 1 ? (
      <mark key={i} className="bg-yellow-400 text-black rounded px-1">
        {p}
      </mark>
    ) : (
      p
    )
  );
};

const toCSV = (rows) => {
  const esc = (v) => `"${String(v).replace(/"/g, '""')}"`;
  return rows.map((r) => r.map(esc).join(",")).join("\n");
};

const digest = async (algo, text) => {
  const enc = new TextEncoder().encode(text);
  const hash = await crypto.subtle.digest(algo, enc);
  return Array.from(new Uint8Array(hash))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
};

/* ------------------- Component ------------------- */
const ForensicFileHunt = () => {
  const [selectedDataset, setSelectedDataset] = useState("Data Set 1");
  const [activeTab, setActiveTab] = useState("Case Overview");

  // Quiz
  const [quizStarted, setQuizStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [score, setScore] = useState(0);
  const [quizFeedback, setQuizFeedback] = useState("");
  const [showRecap, setShowRecap] = useState(false);
  const [timer, setTimer] = useState(20);

  // New interactivity
  const [evidence, setEvidence] = useState([]); // {type, content}
  const [searchTerm, setSearchTerm] = useState("");
  const [openFolders, setOpenFolders] = useState({});
  const [selectedFilePreview, setSelectedFilePreview] = useState(null);

  // Hash Lab
  const [hashInput, setHashInput] = useState("");
  const [hashMD5, setHashMD5] = useState("");
  const [hashSHA, setHashSHA] = useState("");
  const [verifyResult, setVerifyResult] = useState("");

  // Missions
  const [completedMissions, setCompletedMissions] = useState(new Set());

  // Entropy
  const currentData = forensicDataSets[selectedDataset];
  const hexBytes = useMemo(() => bytesFromHexDump(currentData.hexDump), [currentData]);
  const entropy = useMemo(() => shannonEntropy(hexBytes), [hexBytes]);

  // Keyboard shortcuts
  useEffect(() => {
    const onKey = (e) => {
      const k = e.key.toLowerCase();
      if (k === "s") setQuizStarted(true);
      if (k === "f") document.getElementById("ffh-search")?.focus();
      if (k === "r") resetAll();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Quiz timer
  useEffect(() => {
    if (!quizStarted || selectedOption !== null || showRecap) return;
    const t = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          clearInterval(t);
          setQuizFeedback(`⏰ Time's up! ${quizQuestions[currentQuestion].explanation}`);
          setTimeout(nextQ, 1500);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(t);
  }, [quizStarted, selectedOption, currentQuestion, showRecap]);

  // Auto-validate missions on dataset change
  useEffect(() => {
    const done = new Set();
    missions.forEach((m) => {
      if (m.validate(currentData)) done.add(m.id);
    });
    setCompletedMissions(done);
  }, [currentData]);

  const addEvidence = (type, content) => {
    const item = { id: crypto.randomUUID(), type, content, dataset: selectedDataset, ts: new Date().toISOString() };
    setEvidence((prev) => [item, ...prev]);
  };

  const toggleFolder = (folderName) => {
    setOpenFolders((prev) => ({ ...prev, [folderName]: !prev[folderName] }));
  };

  const handleAnswer = (i) => {
    if (selectedOption !== null) return;
    setSelectedOption(i);
    const q = quizQuestions[currentQuestion];
    const isCorrect = i === q.answer;
    if (isCorrect) {
      setScore((s) => s + 1);
      setQuizFeedback(`✅ Correct! ${q.explanation}`);
    } else {
      setQuizFeedback(`❌ Incorrect. ${q.explanation}`);
    }
    setTimeout(nextQ, 1200);
  };

  const nextQ = () => {
    setSelectedOption(null);
    setQuizFeedback("");
    setTimer(20);
    if (currentQuestion + 1 < quizQuestions.length) setCurrentQuestion((x) => x + 1);
    else setShowRecap(true);
  };

  const resetAll = () => {
    setActiveTab("Case Overview");
    setQuizStarted(false);
    setCurrentQuestion(0);
    setSelectedOption(null);
    setScore(0);
    setQuizFeedback("");
    setShowRecap(false);
    setTimer(20);
    setEvidence([]);
    setSearchTerm("");
    setHashInput("");
    setHashMD5("");
    setHashSHA("");
    setVerifyResult("");
    setOpenFolders({});
    setSelectedFilePreview(null);
  };

  const computeHashes = async () => {
    setHashMD5(await digest("MD5", hashInput).catch(() => "md5-not-supported"));
    setHashSHA(await digest("SHA-256", hashInput));
  };

  const verifyAgainstDataset = () => {
    const target = (currentData.hashes || "").toLowerCase();
    const md5ok = hashMD5 && target.includes(hashMD5.slice(0, 8)); // loose compare (demo)
    const shaok = hashSHA && target.includes(hashSHA.slice(0, 8));
    setVerifyResult(md5ok || shaok ? "✅ Partial match (demo) – investigate further." : "❌ No match.");
  };

  const exportReport = () => {
    const report = {
      dataset: selectedDataset,
      missions: Array.from(completedMissions),
      score,
      entropy,
      evidence,
      when: new Date().toISOString(),
    };
    const blob = new Blob([JSON.stringify(report, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `forensic_report_${selectedDataset.replace(/\s+/g, "_")}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const exportCSV = () => {
    const rows = [["Timestamp", "Dataset", "Type", "Content"]];
    evidence.forEach((e) => rows.push([e.ts, e.dataset, e.type, e.content]));
    const blob = new Blob([toCSV(rows)], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "evidence.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  const stringsList = currentData.strings.split("\n");
  const metaLines = currentData.metadata.split("\n");
  const hexLines = currentData.hexDump.split("\n");

  /* ----------- Charts ----------- */
  const entropyData = useMemo(() => {
    // synthesize multiple window entropies from first line bytes for demo
    const windows = [];
    for (let k = 1; k <= Math.min(10, hexBytes.length); k++) {
      windows.push(shannonEntropy(hexBytes.slice(0, k)));
    }
    return {
      labels: windows.map((_, i) => `Win ${i + 1}`),
      datasets: [
        {
          label: "Entropy",
          data: windows,
          borderColor: "#22d3ee",
          backgroundColor: "rgba(34, 211, 238, 0.25)",
          tension: 0.2,
        },
      ],
    };
  }, [hexBytes]);

  const fileTypePie = {
    labels: currentData.fileTypesStats.labels,
    datasets: [
      {
        label: "File Types",
        data: currentData.fileTypesStats.data,
        backgroundColor: ["#38bdf8", "#facc15", "#f472b6", "#a3e635"],
      },
    ],
  };

  /* ----------- Tab Renderer ----------- */
  const renderTab = () => {
    switch (activeTab) {
      case "Case Overview":
        return (
          <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-3">
              <span className="px-3 py-1 rounded bg-cyan-900/40 border border-cyan-700 text-cyan-200">
                🏅 Missions: {completedMissions.size}/{missions.length}
              </span>
              <span className="px-3 py-1 rounded bg-emerald-900/40 border border-emerald-700 text-emerald-200">
                🧪 Quiz: {score}/{quizQuestions.length}
              </span>
              <span className="px-3 py-1 rounded bg-indigo-900/40 border border-indigo-700 text-indigo-200">
                🔥 Entropy: {entropy.toFixed(2)}
              </span>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-3 bg-black rounded border border-cyan-700">
                <h4 className="text-cyan-200 font-semibold mb-2">🎯 Missions</h4>
                <ul className="space-y-2">
                  {missions.map((m) => (
                    <li
                      key={m.id}
                      className={`p-2 rounded border ${
                        completedMissions.has(m.id)
                          ? "border-emerald-600 bg-emerald-900/20"
                          : "border-cyan-700 bg-cyan-900/20"
                      }`}
                    >
                      <div className="flex justify-between">
                        <span className="text-cyan-100">{m.title}</span>
                        <span className="text-xs text-emerald-300">+{m.reward}</span>
                      </div>
                      <div className="text-xs text-cyan-300/70 mt-1">Hint: {m.hint}</div>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="p-3 bg-black rounded border border-cyan-700">
                <h4 className="text-cyan-200 font-semibold mb-2">📋 Evidence Board</h4>
                {evidence.length === 0 ? (
                  <div className="text-cyan-300/70 text-sm">No evidence yet. Add from any tab.</div>
                ) : (
                  <ul className="space-y-2 max-h-48 overflow-auto">
                    {evidence.map((e) => (
                      <li key={e.id} className="text-sm">
                        <span className="text-emerald-300">{e.type}:</span> {e.content}
                      </li>
                    ))}
                  </ul>
                )}
                <div className="flex gap-2 mt-3">
                  <button onClick={exportReport} className="px-3 py-1 bg-slate-800 border border-cyan-700 rounded">
                    ⬇️ Export Report (JSON)
                  </button>
                  <button onClick={exportCSV} className="px-3 py-1 bg-slate-800 border border-cyan-700 rounded">
                    ⬇️ Evidence CSV
                  </button>
                </div>
              </div>
            </div>
            <div className="text-xs text-cyan-300/70">
              Shortcuts: <kbd className="px-1 bg-slate-700 rounded">S</kbd> start quiz,{" "}
              <kbd className="px-1 bg-slate-700 rounded">F</kbd> focus search,{" "}
              <kbd className="px-1 bg-slate-700 rounded">R</kbd> reset.
            </div>
          </div>
        );

      case "Metadata":
        return (
          <div>
            <div className="flex items-center gap-2 mb-3">
              <input
                id="ffh-search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search metadata…"
                className="bg-gray-800 border border-cyan-600 text-white px-3 py-2 rounded w-full"
              />
              <button
                onClick={() => addEvidence("Metadata", `Suspicious: ${searchTerm || "manual flag"}`)}
                className="px-3 py-2 bg-cyan-700 hover:bg-cyan-800 rounded"
              >
                ➕ Add to Evidence
              </button>
            </div>
            <div className="whitespace-pre-wrap">{highlight(currentData.metadata, searchTerm)}</div>
          </div>
        );

      case "Hex Dump":
        return (
          <div>
            <div className="flex items-center gap-2 mb-3">
              <input
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search hex/ascii…"
                className="bg-gray-800 border border-cyan-600 text-white px-3 py-2 rounded w-full"
              />
              <button
                onClick={() => addEvidence("Hex", `Found pattern: ${searchTerm}`)}
                className="px-3 py-2 bg-cyan-700 hover:bg-cyan-800 rounded"
              >
                ➕ Evidence
              </button>
            </div>
            <div className="text-xs space-y-1">
              {hexLines.map((l, i) => (
                <div key={i} className="font-mono">
                  {highlight(l, searchTerm)}
                </div>
              ))}
            </div>
          </div>
        );

      case "Timeline":
        return (
          <div className="space-y-3">
            {currentData.timeline.split("\n").map((t, i) => (
              <div key={i} className="p-2 rounded bg-slate-800 border border-cyan-700">
                {t}
                <button
                  onClick={() => addEvidence("Timeline", t)}
                  className="ml-3 text-xs px-2 py-1 bg-cyan-700 rounded"
                >
                  Tag
                </button>
              </div>
            ))}
          </div>
        );

      case "File Hashes":
        return (
          <div className="space-y-2">
            <div className="whitespace-pre-wrap">{currentData.hashes}</div>
            <button
              onClick={() => addEvidence("Hashes", currentData.hashes)}
              className="px-3 py-2 bg-cyan-700 hover:bg-cyan-800 rounded"
            >
              ➕ Add to Evidence
            </button>
          </div>
        );

      case "Strings":
        return (
          <div>
            <div className="flex items-center gap-2 mb-3">
              <input
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="grep… URL, path, key"
                className="bg-gray-800 border border-cyan-600 text-white px-3 py-2 rounded w-full"
              />
              <button
                onClick={() => addEvidence("Strings", `IOC: ${searchTerm}`)}
                className="px-3 py-2 bg-cyan-700 hover:bg-cyan-800 rounded"
              >
                ➕ Evidence
              </button>
            </div>
            <ul className="space-y-1">
              {stringsList.map((s, i) => (
                <li key={i} className="text-sm">
                  {highlight(s, searchTerm)}
                </li>
              ))}
            </ul>
          </div>
        );

      case "VirusTotal":
        return (
          <div className="space-y-2">
            <div className="whitespace-pre-wrap">{currentData.virusTotal}</div>
            <button
              onClick={() => addEvidence("VirusTotal", currentData.virusTotal)}
              className="px-3 py-2 bg-cyan-700 hover:bg-cyan-800 rounded"
            >
              ➕ Add to Evidence
            </button>
          </div>
        );

      case "File Tree":
        return (
          <div>
            {currentData.fileTree.map((dir, i) => (
              <div key={i} className="mb-2">
                <button className="text-cyan-400 font-bold" onClick={() => toggleFolder(dir.folder)}>
                  {openFolders[dir.folder] ? "▼" : "▶"} {dir.folder}
                </button>
                {openFolders[dir.folder] && (
                  <ul className="ml-5 text-white list-disc mt-1">
                    {dir.files.map((f, idx) => (
                      <li key={idx} className="flex items-center justify-between">
                        <span className="cursor-pointer" onClick={() => setSelectedFilePreview(f)}>
                          📄 {f}
                        </span>
                        <button
                          onClick={() => addEvidence("File", f)}
                          className="text-xs px-2 py-1 bg-cyan-700 rounded"
                        >
                          Tag
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
            {selectedFilePreview && (
              <div className="mt-3 p-3 bg-black rounded border border-cyan-700">
                <div className="text-cyan-200 font-semibold mb-1">Preview: {selectedFilePreview}</div>
                <div className="text-sm text-green-300/90">
                  {/\.pdf$/i.test(selectedFilePreview)
                    ? "PDF header (pseudo): %PDF-1.5 …"
                    : /\.exe$/i.test(selectedFilePreview)
                    ? "MZ header detected. PE32 executable (pseudo preview)…"
                    : /\.bat$/i.test(selectedFilePreview)
                    ? "Batch script sample: @echo off\ncopy payload.exe %APPDATA%\\payload.exe"
                    : /\.db$/i.test(selectedFilePreview)
                    ? "SQLite DB (pseudo). Tables: messages, contacts…"
                    : "Binary/unknown preview…"}
                </div>
              </div>
            )}
          </div>
        );

      case "Permissions":
        return (
          <table className="w-full text-left">
            <thead>
              <tr className="text-cyan-200">
                <th className="p-2">File</th>
                <th className="p-2">Owner</th>
                <th className="p-2">Permissions</th>
                <th className="p-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {currentData.permissions.map((p, i) => (
                <tr key={i} className="border-t border-cyan-900">
                  <td className="p-2">{p.file}</td>
                  <td className="p-2">{p.owner}</td>
                  <td className="p-2">{p.permission}</td>
                  <td className="p-2">
                    <button
                      onClick={() => addEvidence("Permissions", `${p.file} ${p.permission}`)}
                      className="text-xs px-2 py-1 bg-cyan-700 rounded"
                    >
                      Tag
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        );

      case "Hash Checker":
        return (
          <div className="space-y-3">
            <div className="text-sm text-cyan-200">
              Dataset claims: <span className="whitespace-pre-wrap">{currentData.hashMatchResult}</span>
            </div>
            <textarea
              value={hashInput}
              onChange={(e) => setHashInput(e.target.value)}
              placeholder="Paste content to hash (demo text)…"
              className="w-full h-24 bg-gray-800 border border-cyan-700 rounded p-2"
            />
            <div className="flex flex-wrap items-center gap-2">
              <button onClick={computeHashes} className="px-3 py-2 bg-cyan-700 hover:bg-cyan-800 rounded">
                Compute MD5 / SHA-256
              </button>
              {hashMD5 && <span className="text-xs">MD5: {hashMD5.slice(0, 16)}…</span>}
              {hashSHA && <span className="text-xs">SHA-256: {hashSHA.slice(0, 16)}…</span>}
              <button onClick={verifyAgainstDataset} className="px-3 py-2 bg-emerald-700 rounded">
                Verify against dataset
              </button>
              {verifyResult && <span className="text-xs">{verifyResult}</span>}
              <button
                onClick={() =>
                  addEvidence("Hash", `MD5:${hashMD5.slice(0, 10)} SHA256:${hashSHA.slice(0, 10)}`)
                }
                className="px-3 py-2 bg-slate-800 border border-cyan-700 rounded"
              >
                ➕ Evidence
              </button>
            </div>
          </div>
        );

      case "IOC / Regex Hunt":
        return (
          <div>
            <div className="flex items-center gap-2 mb-3">
              <input
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Regex / IOC (e.g., https?://[^\\s]+)"
                className="bg-gray-800 border border-cyan-600 text-white px-3 py-2 rounded w-full"
              />
              <button
                onClick={() => addEvidence("IOC", `Pattern: ${searchTerm}`)}
                className="px-3 py-2 bg-cyan-700 hover:bg-cyan-800 rounded"
              >
                ➕ Evidence
              </button>
            </div>
            <div className="grid md:grid-cols-3 gap-3">
              <div className="p-3 bg-black rounded border border-cyan-700">
                <div className="font-semibold text-cyan-200 mb-2">Metadata</div>
                <div className="text-sm whitespace-pre-wrap">{highlight(currentData.metadata, searchTerm)}</div>
              </div>
              <div className="p-3 bg-black rounded border border-cyan-700">
                <div className="font-semibold text-cyan-200 mb-2">Strings</div>
                <div className="text-sm">{stringsList.map((s, i) => <div key={i}>{highlight(s, searchTerm)}</div>)}</div>
              </div>
              <div className="p-3 bg-black rounded border border-cyan-700">
                <div className="font-semibold text-cyan-200 mb-2">Hex (text side)</div>
                <div className="text-xs">{hexLines.map((l, i) => <div key={i}>{highlight(l, searchTerm)}</div>)}</div>
              </div>
            </div>
          </div>
        );

      case "YARA-lite":
        return (
          <YaraLite
            onAddEvidence={(txt) => addEvidence("YARA", txt)}
            candidateText={[currentData.metadata, currentData.strings, currentData.virusTotal].join("\n")}
          />
        );

      case "Entropy Scan":
        return (
          <div className="bg-black p-4 rounded border border-cyan-700">
            <div className="text-sm text-cyan-200 mb-2">
              Approx. Payload Entropy: <span className="text-emerald-300">{entropy.toFixed(2)}</span>{" "}
              (0=low, 8=high)
            </div>
            <div className="max-w-xl">
              <Line
                data={entropyData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  scales: { y: { suggestedMin: 0, suggestedMax: 8 } },
                  plugins: { legend: { display: false } },
                }}
                height={220}
              />
            </div>
            <div className="text-xs text-cyan-300/70 mt-2">
              High entropy can indicate compression or encryption (packed payloads).
            </div>
          </div>
        );

      case "Timeline Chart":
        return (
          <div className="bg-white p-4 rounded max-w-[520px] mx-auto">
            <Line
              data={{
                labels: currentData.timelineEvents.map((e) => e.date),
                datasets: [
                  {
                    label: "Events",
                    data: currentData.timelineEvents.map((_, i) => i + 1),
                    borderColor: "blue",
                    backgroundColor: "lightblue",
                  },
                ],
              }}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: { title: { display: true, text: "Event Timeline" }, legend: { display: false } },
              }}
              height={300}
            />
          </div>
        );

      case "File Types":
        return (
          <div className="bg-white p-4 rounded w-full max-w-md mx-auto" style={{ height: "400px" }}>
            <Pie
              data={fileTypePie}
              options={{ responsive: true, maintainAspectRatio: false, plugins: { legend: { position: "bottom" } } }}
            />
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <>
      <NavbarEnthusiast />
      <div className="min-h-screen bg-slate-900 text-green-300 p-6 font-mono">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-4">
          <div>
            <h1 className="text-4xl text-cyan-400 font-bold">🧬 Forensic File Hunt</h1>
            <p className="text-green-300/90">Hunt indicators, tag evidence, complete missions, export your case.</p>
          </div>
          <div className="flex items-center gap-2">
            <select
              value={selectedDataset}
              onChange={(e) => setSelectedDataset(e.target.value)}
              className="bg-gray-800 p-2 text-white rounded border border-cyan-500"
            >
              {Object.keys(forensicDataSets).map((key) => (
                <option key={key}>{key}</option>
              ))}
            </select>
            <button onClick={resetAll} className="px-3 py-2 bg-rose-700 hover:bg-rose-800 rounded">
              Reset
            </button>
          </div>
        </div>

        {/* Layout */}
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Tabs */}
          <div className="w-full lg:w-72 max-h-[520px] overflow-y-auto bg-slate-800 p-4 rounded border border-cyan-500">
            <h2 className="text-cyan-300 font-bold mb-3 text-lg">📂 Forensics Tabs</h2>
            {tabList.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`w-full text-left mb-2 py-2 px-3 rounded ${
                  activeTab === tab ? "bg-cyan-600 text-white" : "bg-slate-700 text-cyan-300 hover:bg-cyan-700"
                }`}
              >
                {tab}
              </button>
            ))}
            <div className="mt-3 text-xs text-cyan-300/70">
              Tip: Add evidence from any tab to fill the board & report.
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 bg-black p-4 rounded-lg border border-cyan-500 min-h-[280px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.25 }}
              >
                {renderTab()}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Evidence sidebar (collapsible on mobile could be added later) */}
          <div className="w-full lg:w-80 bg-[#0b1224] p-4 rounded border border-cyan-700">
            <h3 className="text-cyan-300 font-semibold mb-2">📋 Evidence Board</h3>
            {evidence.length === 0 ? (
              <div className="text-cyan-300/70 text-sm">No evidence yet.</div>
            ) : (
              <ul className="space-y-2 max-h-[420px] overflow-auto">
                {evidence.map((e) => (
                  <li key={e.id} className="text-sm">
                    <div className="text-emerald-300">{e.type}</div>
                    <div className="text-green-200/90 break-words">{e.content}</div>
                    <div className="text-[10px] text-cyan-400/60">{new Date(e.ts).toLocaleString()}</div>
                  </li>
                ))}
              </ul>
            )}
            <div className="flex gap-2 mt-3">
              <button onClick={exportReport} className="px-3 py-1 bg-slate-800 border border-cyan-700 rounded">
                ⬇️ JSON
              </button>
              <button onClick={exportCSV} className="px-3 py-1 bg-slate-800 border border-cyan-700 rounded">
                ⬇️ CSV
              </button>
            </div>
          </div>
        </div>

        {/* Fun fact */}
        <div className="mt-4 p-3 bg-yellow-100 text-yellow-900 rounded border border-yellow-400">
          <strong>{currentData.funFact}</strong>
        </div>

        {/* Quiz */}
        <div className="mt-6 bg-[#1e293b] border border-cyan-500 rounded-lg p-6">
          <h2 className="text-xl font-bold text-cyan-300 mb-2">🧠 Forensics Quiz</h2>
          {!quizStarted ? (
            <button
              onClick={() => setQuizStarted(true)}
              className="bg-cyan-700 text-white px-4 py-2 rounded hover:bg-cyan-800"
            >
              ▶️ Start Quiz
            </button>
          ) : showRecap ? (
            <>
              <p className="text-cyan-200 font-semibold">🎉 Final Score: {score}/{quizQuestions.length}</p>
              <ul className="text-yellow-100 list-disc ml-6 mt-2 mb-4">
                {quizQuestions.map((q, i) => (
                  <li key={i}>{q.explanation}</li>
                ))}
              </ul>
              <button onClick={resetAll} className="mt-2 bg-green-700 text-white px-4 py-2 rounded hover:bg-green-800">
                🔁 Restart
              </button>
            </>
          ) : (
            <>
              <div className="text-yellow-300 mb-2">⏱ Time Left: {timer}s</div>
              <p className="text-green-200 font-semibold">{quizQuestions[currentQuestion].question}</p>
              {quizQuestions[currentQuestion].options.map((opt, i) => (
                <button
                  key={i}
                  onClick={() => handleAnswer(i)}
                  className={`block w-full my-2 px-4 py-2 rounded text-left ${
                    selectedOption === i
                      ? i === quizQuestions[currentQuestion].answer
                        ? "bg-green-600"
                        : "bg-red-600"
                      : "bg-cyan-700 hover:bg-cyan-800"
                  } text-white`}
                  disabled={selectedOption !== null}
                >
                  {opt}
                </button>
              ))}
              {quizFeedback && <p className="mt-2 italic text-white">{quizFeedback}</p>}
            </>
          )}
        </div>
      </div>
      <FooterEnthusiast />
    </>
  );
};

/* ------------------- YARA-lite component ------------------- */
const YaraLite = ({ candidateText, onAddEvidence }) => {
  const [rule, setRule] = useState('rule demo { strings: $s1 = "invoice" ascii nocase condition: $s1 }');
  const [result, setResult] = useState("");

  const runRule = () => {
    // ultra-simplified: extract quoted strings after `strings:`
    const strings = Array.from(rule.matchAll(/"([^"]+)"/g)).map((m) => m[1]);
    if (strings.length === 0) {
      setResult("No strings found in rule.");
      return;
    }
    const hits = strings.filter((s) => new RegExp(s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i").test(candidateText));
    if (hits.length) {
      setResult(`✅ Match! Strings hit: ${hits.join(", ")}`);
      onAddEvidence(`YARA-lite hit: ${hits.join(", ")}`);
    } else {
      setResult("❌ No match.");
    }
  };

  return (
    <div className="space-y-2">
      <div className="text-sm text-cyan-200 mb-2">
        Paste a tiny rule; this demo checks quoted strings against case text.
      </div>
      <textarea
        value={rule}
        onChange={(e) => setRule(e.target.value)}
        className="w-full h-32 bg-gray-800 border border-cyan-700 rounded p-2"
      />
      <div className="flex items-center gap-2">
        <button onClick={runRule} className="px-3 py-2 bg-cyan-700 hover:bg-cyan-800 rounded">
          ▶️ Run
        </button>
        {result && <span className="text-sm">{result}</span>}
      </div>
    </div>
  );
};

export default ForensicFileHunt;
