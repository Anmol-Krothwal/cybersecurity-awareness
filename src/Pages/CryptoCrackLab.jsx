import React, { useMemo, useState } from "react";
import NavbarEnthusiast from "../Components/NavbarEnthusiast";
import FooterEnthusiast from "../Components/FooterEnthusiast";

/* ---------------------- Utils ---------------------- */
// UTF-8 safe Base64
const b64encode = (s) => {
  try { return btoa(unescape(encodeURIComponent(s))); } catch { return ""; }
};
const b64decode = (s) => {
  try { return decodeURIComponent(escape(atob(s))); } catch { return ""; }
};

// Caesar
const caesarShift = (txt, k = 0) =>
  txt.replace(/[A-Za-z]/g, (c) => {
    const base = c <= "Z" ? 65 : 97;
    return String.fromCharCode(((c.charCodeAt(0) - base + k + 26 * 1000) % 26) + base);
  });

// Vigenère
const vig = (txt, key = "KEY", mode = "enc") => {
  if (!key) return txt;
  let j = 0;
  return txt.replace(/[A-Za-z]/g, (ch) => {
    const isU = ch <= "Z";
    const base = isU ? 65 : 97;
    const k = (key[j++ % key.length].toLowerCase().charCodeAt(0) - 97 + 26) % 26;
    const s = mode === "enc" ? k : -k;
    return String.fromCharCode(((ch.charCodeAt(0) - base + s + 26 * 1000) % 26) + base);
  });
};

// XOR (text with repeating key -> hex)
const xorHex = (text, key) => {
  if (!key) return "";
  const te = new TextEncoder().encode(text);
  const ke = new TextEncoder().encode(key);
  const out = te.map((b, i) => b ^ ke[i % ke.length]);
  return Array.from(out).map((b) => b.toString(16).padStart(2, "0")).join("");
};
const xorHexDecrypt = (hex, key) => {
  if (!key) return "";
  const bytes = hex.match(/[0-9a-f]{2}/gi)?.map((h) => parseInt(h, 16)) ?? [];
  const ke = new TextEncoder().encode(key);
  const out = bytes.map((b, i) => b ^ ke[i % ke.length]);
  return new TextDecoder().decode(Uint8Array.from(out));
};

// RSA tiny helpers (demo only)
const modexp = (b, e, m) => {
  let res = 1n, base = BigInt(b) % BigInt(m), exp = BigInt(e), mod = BigInt(m);
  while (exp > 0n) {
    if (exp & 1n) res = (res * base) % mod;
    base = (base * base) % mod;
    exp >>= 1n;
  }
  return res;
};
const egcd = (a, b) => (b === 0n ? [a, 1n, 0n] : (() => {
  const [g, x, y] = egcd(b, a % b);
  return [g, y, x - (a / b) * y];
})());
const modinv = (a, m) => {
  const [g, x] = egcd(BigInt(a), BigInt(m));
  if (g !== 1n) return null;
  let inv = x % BigInt(m);
  if (inv < 0n) inv += BigInt(m);
  return inv;
};
const sample = (arr) => arr[Math.floor(Math.random() * arr.length)];
const words = ["Security", "Crypto", "Attack", "Network", "Cipher", "Hash", "Signal", "Matrix", "Quantum"];
const plainWords = ["HELLO", "WORLD", "SECRET", "ATTACK", "VIGENERE", "CAESAR"];

/* ---------------------- Reusable UI ---------------------- */
const TabButton = ({ label, active, onClick }) => (
  <button
    className={`px-4 py-2 rounded-t-md ${active ? "bg-cyan-700 text-white" : "bg-slate-800 text-cyan-300 hover:bg-cyan-600"}`}
    onClick={onClick}
  >
    {label}
  </button>
);

const Quiz = ({ questions }) => {
  const [started, setStarted] = useState(false);
  const [i, setI] = useState(0);
  const [sel, setSel] = useState(null);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);
  const q = questions[i];

  const pick = (idx) => {
    if (sel !== null) return;
    setSel(idx);
    const ok = idx === q.answer;
    if (ok) setScore((s) => s + 1);
    setTimeout(() => {
      if (i + 1 < questions.length) {
        setI((x) => x + 1);
        setSel(null);
      } else setDone(true);
    }, 1100);
  };

  const restart = () => {
    setStarted(false); setI(0); setSel(null); setScore(0); setDone(false);
  };

  if (!started)
    return (
      <button onClick={() => setStarted(true)} className="bg-cyan-600 hover:bg-cyan-700 px-4 py-2 rounded">
        ▶️ Start Quiz
      </button>
    );

  if (done)
    return (
      <div className="mt-3 bg-black border border-emerald-500 rounded p-4">
        <div className="text-emerald-300 font-semibold">Score: {score}/{questions.length}</div>
        <button onClick={restart} className="mt-2 bg-slate-700 hover:bg-slate-600 px-3 py-2 rounded">🔁 Restart</button>
      </div>
    );

  return (
    <div className="mt-3">
      <h4 className="text-cyan-200 font-semibold mb-2">{q.question}</h4>
      {q.options.map((opt, idx) => (
        <button
          key={idx}
          onClick={() => pick(idx)}
          className={`block w-full mb-2 p-2 rounded ${
            sel !== null ? (idx === q.answer ? "bg-green-600" : sel === idx ? "bg-red-600" : "bg-slate-700") : "bg-slate-700 hover:bg-slate-600"
          }`}
        >
          {opt}
        </button>
      ))}
      {sel !== null && <div className="text-xs text-yellow-200 mt-1 italic">{q.explanation}</div>}
    </div>
  );
};

/* ---------------------- Challenge Engine ---------------------- */
const nextChallenge = (type) => {
  switch (type) {
    case "base64": {
      const mode = Math.random() < 0.5 ? "decode" : "encode";
      const value = mode === "decode" ? b64encode(sample(words)) : sample(words);
      return { type, mode, value };
    }
    case "caesar": {
      const p = sample(plainWords);
      const k = Math.floor(Math.random() * 25) + 1;
      return { type, k, plain: p, cipher: caesarShift(p, k) };
    }
    case "vigenere": {
      const p = sample(plainWords);
      const key = sample(["KEY", "LOCK", "SECRET"]);
      return { type, key, plain: p, cipher: vig(p, key, "enc") };
    }
    case "xor": {
      const p = sample(["attack at dawn", "crypto fun", "xor power"]);
      const key = sample(["KEY", "DOG", "FOX"]);
      return { type, key, plain: p, hex: xorHex(p, key) };
    }
    case "rsa": {
      const primes = [3, 5, 7, 11, 13, 17, 19];
      let p = sample(primes), q = sample(primes);
      while (q === p) q = sample(primes);
      const n = p * q;
      const phi = (p - 1) * (q - 1);
      const e = [3, 5, 7].find((x) => phi % x !== 0) || 3;
      const d = Number(modinv(BigInt(e), BigInt(phi)));
      const m = Math.floor(Math.random() * (n - 2)) + 2;
      const c = Number(modexp(m, e, n));
      return { type, p, q, e, d, n, m, c, mode: Math.random() < 0.5 ? "encrypt" : "decrypt" };
    }
    default:
      return null;
  }
};

/* ---------------------- Modes ---------------------- */
const Base64Mode = () => {
  const [plain, setPlain] = useState("Security");
  const [b64, setB64] = useState(b64encode("Security"));

  // Challenge state
  const [ch, setCh] = useState(nextChallenge("base64"));
  const [ans, setAns] = useState("");

  const doEncode = () => setB64(b64encode(plain));
  const doDecode = () => setPlain(b64decode(b64));

  const submit = () => {
    const expected = ch.mode === "decode" ? b64decode(ch.value) : b64encode(ch.value);
    alert(expected === ans.trim() ? "✅ Correct!" : `❌ Wrong. Expected: ${expected}`);
    // Clear answer and change question immediately
    setAns("");
    setCh(nextChallenge("base64"));
  };

const quiz = [
  { question: 'What does the “MD5” hash function primarily provide?', options: ['Encryption', 'Integrity verification', 'Compression'], answer: 1, explanation: 'MD5 verifies data integrity but is weak for security.' },
  { question: 'Which file extension is most suspicious for containing malware?', options: ['.txt', '.exe', '.png'], answer: 1, explanation: 'Executables can run code and are often used to deliver malware.' },
  { question: 'What is the main purpose of RSA in digital forensics?', options: ['File compression', 'Asymmetric encryption', 'Image editing'], answer: 1, explanation: 'RSA enables public/private key cryptography.' },
  { question: 'What does “steganography” mean in cybersecurity?', options: ['Hiding data within other files', 'Encrypting network packets', 'Deleting malware traces'], answer: 0, explanation: 'It hides data inside files like images or audio.' },
  { question: 'In a hex dump, what does the value “4D 5A” signify?', options: ['JPEG image header', 'Windows executable header', 'PDF file header'], answer: 1, explanation: '0x4D 0x5A = “MZ”, the DOS header for PE executables.' },
  { question: 'What does “chmod 777” do in Linux?', options: ['Removes all permissions', 'Gives full permissions to everyone', 'Hides a file from root'], answer: 1, explanation: 'Grants read/write/execute to all users — risky.' },
  { question: 'Which algorithm is stronger for hashing?', options: ['SHA-256', 'MD5', 'They are equal'], answer: 0, explanation: 'SHA-256 is more secure and collision-resistant than MD5.' },
  { question: 'What’s the main danger of “double file extensions” (e.g., photo.jpg.exe)?', options: ['They slow the system', 'They trick users into running malware', 'They improve performance'], answer: 1, explanation: 'They disguise executables as harmless files.' },
  { question: 'In RSA, how are public and private keys related?', options: ['Identical', 'Mathematically linked but different', 'Random and unrelated'], answer: 1, explanation: 'They form a pair where one encrypts and the other decrypts.' },
  { question: 'VirusTotal shows 40/70 detections. What does this suggest?', options: ['Likely harmless file', 'Likely malicious file', 'File too large to scan'], answer: 1, explanation: 'Many detections indicate strong likelihood of malware.' },
  { question: 'What does the Base64 string "U2VjdXJpdHk=" decode to?', options: ['Encrypted', 'Security', 'Base64'], answer: 1, explanation: '"U2VjdXJpdHk=" → "Security".' },
  { question: 'Primary purpose of Base64?', options: ['Encryption', 'Obfuscation', 'Binary-to-text encoding'], answer: 2, explanation: 'It safely encodes binary data as ASCII.' },
  { question: 'Which Linux command shows running processes?', options: ['ls', 'ps', 'cat'], answer: 1, explanation: '`ps` lists active processes on the system.' },
  { question: 'Which port is typically used for HTTPS traffic?', options: ['80', '443', '21'], answer: 1, explanation: 'Port 443 is the default for HTTPS.' },
  { question: 'What does high entropy in a file usually indicate?', options: ['Plaintext data', 'Encryption or compression', 'File is unused'], answer: 1, explanation: 'High entropy suggests encrypted or compressed content.' },
  { question: 'What does “PK” in a file header often indicate?', options: ['PDF file', 'ZIP archive', 'PE executable'], answer: 1, explanation: '"PK" is the signature for ZIP-based formats (e.g., DOCX, APK).' },
  { question: 'What is the default key size for modern RSA for strong security?', options: ['512 bits', '2048 bits', '4096 bits'], answer: 1, explanation: '2048 bits is the widely recommended secure RSA key length.' },
  { question: 'In digital signatures, what ensures message integrity?', options: ['Public key', 'Hash function', 'Private key'], answer: 1, explanation: 'A hash function ensures the message hasn’t been altered.' },
  { question: 'Which forensic artifact stores browser history in Chrome?', options: ['places.sqlite', 'History', 'webcache.dat'], answer: 1, explanation: 'Chrome stores history in the "History" SQLite DB.' },
  { question: 'Which protocol transmits credentials in plain text if not secured?', options: ['HTTPS', 'SSH', 'FTP'], answer: 2, explanation: 'FTP sends data unencrypted unless secured with FTPS/SFTP.' }
];



  return (
    <div>
      <h3 className="text-xl font-bold text-cyan-400 mb-2">📘 Base64</h3>
      <div className="grid md:grid-cols-2 gap-3">
        <div className="bg-slate-900 p-3 rounded border border-cyan-700">
          <label className="text-sm text-cyan-200">Plaintext</label>
          <textarea className="w-full bg-slate-800 rounded p-2 mt-1" rows={4} value={plain} onChange={(e) => setPlain(e.target.value)} />
          <div className="flex gap-2 mt-2">
            <button onClick={doEncode} className="bg-cyan-600 hover:bg-cyan-700 px-3 py-1 rounded">Encode →</button>
            <button onClick={doDecode} className="bg-slate-700 hover:bg-slate-600 px-3 py-1 rounded">← Decode</button>
          </div>
        </div>
        <div className="bg-slate-900 p-3 rounded border border-cyan-700">
          <label className="text-sm text-cyan-200">Base64</label>
          <textarea className="w-full bg-slate-800 rounded p-2 mt-1" rows={4} value={b64} onChange={(e) => setB64(e.target.value)} />
        </div>
      </div>

      {/* Challenge */}
      <div className="mt-4 bg-black border border-cyan-700 rounded p-3">
        <div className="text-cyan-200 mb-2">
          🔎 Challenge: {ch.mode === "decode" ? `Decode "${ch.value}"` : `Encode "${ch.value}"`}
        </div>
        <div className="flex gap-2">
          <input className="flex-1 bg-slate-800 rounded p-2" placeholder="Your answer…" value={ans} onChange={(e) => setAns(e.target.value)} />
          <button onClick={submit} className="bg-emerald-600 hover:bg-emerald-700 px-3 rounded">Submit</button>
          <button onClick={() => { setAns(""); setCh(nextChallenge("base64")); }} className="bg-slate-700 hover:bg-slate-600 px-3 rounded">Skip</button>
        </div>
      </div>

      <div className="mt-5">
        <h4 className="text-cyan-300 font-semibold">🧪 Quick Quiz</h4>
        <Quiz questions={quiz} />
      </div>
    </div>
  );
};

const CaesarMode = () => {
  const [text, setText] = useState("HELLO");
  const [shift, setShift] = useState(3);
  const [out, setOut] = useState(caesarShift("HELLO", 3));

  // Challenge
  const [ch, setCh] = useState(nextChallenge("caesar"));
  const [ans, setAns] = useState("");

  const run = () => setOut(caesarShift(text, Number(shift)));

  const submit = () => {
    const expected = ch.cipher;
    alert(ans.trim().toUpperCase() === expected ? "✅ Correct!" : `❌ Wrong. Expected: ${expected}`);
    setAns("");
    setCh(nextChallenge("caesar"));
  };

  const quiz = [
    { question: 'Caesar shift of "B" with key +2?', options: ["D", "C", "A"], answer: 0, explanation: "B→C(+1)→D(+2)." },
    { question: 'Decrypt "KHOOR" shift -3', options: ["HELLO", "WORLD", "SCORE"], answer: 0, explanation: "Reverse by -3 → HELLO." }
  ];

  return (
    <div>
      <h3 className="text-xl font-bold text-yellow-400 mb-2">🔐 Caesar</h3>
      <div className="grid md:grid-cols-3 gap-3">
        <textarea className="bg-slate-800 rounded p-2" rows={4} value={text} onChange={(e) => setText(e.target.value)} />
        <div className="bg-slate-900 rounded p-3 border border-yellow-600">
          <div className="text-sm">Shift: <span className="font-semibold">{shift}</span></div>
          <input type="range" min="-13" max="13" value={shift} onChange={(e) => setShift(e.target.value)} className="w-full mt-2" />
          <button onClick={run} className="mt-2 bg-yellow-500 hover:bg-yellow-600 px-3 py-1 rounded w-full">Run</button>
        </div>
        <textarea className="bg-slate-800 rounded p-2" rows={4} value={out} onChange={(e) => setOut(e.target.value)} />
      </div>

      <div className="mt-4 bg-black border border-yellow-600 rounded p-3">
        <div className="text-yellow-100 mb-2">
          🔎 Challenge: Encode "{ch.plain}" with shift {ch.k}
        </div>
        <div className="flex gap-2">
          <input className="flex-1 bg-slate-800 rounded p-2" placeholder="Cipher…" value={ans} onChange={(e) => setAns(e.target.value)} />
          <button onClick={submit} className="bg-emerald-600 hover:bg-emerald-700 px-3 rounded">Submit</button>
          <button onClick={() => { setAns(""); setCh(nextChallenge("caesar")); }} className="bg-slate-700 hover:bg-slate-600 px-3 rounded">Skip</button>
        </div>
      </div>

      <div className="mt-5">
        <h4 className="text-yellow-300 font-semibold">🧪 Quick Quiz</h4>
        <Quiz questions={quiz} />
      </div>
    </div>
  );
};

const VigenereMode = () => {
  const [plain, setPlain] = useState("HELLO");
  const [key, setKey] = useState("KEY");
  const [cipher, setCipher] = useState(vig("HELLO", "KEY", "enc"));

  // Challenge
  const [ch, setCh] = useState(nextChallenge("vigenere"));
  const [ans, setAns] = useState("");

  const enc = () => setCipher(vig(plain, key, "enc"));
  const dec = () => setPlain(vig(cipher, key, "dec"));

  const submit = () => {
    const expected = ch.cipher;
    alert(ans.trim().toUpperCase() === expected ? "✅ Correct!" : `❌ Wrong. Expected: ${expected}`);
    setAns("");
    setCh(nextChallenge("vigenere"));
  };

  const quiz = [
    { question: 'Plain "HELLO", key "KEY" → ?', options: ["RIJVS", "HFNLP", "KHOOR"], answer: 0, explanation: "Vigenère shifts per key → RIJVS." },
    { question: "Why stronger than Caesar?", options: ["Random numbers", "Multiple shifts from keyword", "Binary only"], answer: 1, explanation: "Polyalphabetic shifts." }
  ];

  return (
    <div>
      <h3 className="text-xl font-bold text-purple-400 mb-2">🔐 Vigenère</h3>
      <div className="grid md:grid-cols-3 gap-3">
        <div className="bg-slate-900 p-3 rounded border border-purple-600">
          <label className="text-sm">Plain</label>
          <textarea className="w-full bg-slate-800 rounded p-2 mt-1" rows={4} value={plain} onChange={(e) => setPlain(e.target.value)} />
          <label className="text-sm mt-2 block">Key</label>
          <input className="w-full bg-slate-800 rounded p-2" value={key} onChange={(e) => setKey(e.target.value)} />
          <div className="flex gap-2 mt-2">
            <button onClick={enc} className="bg-purple-500 hover:bg-purple-600 px-3 py-1 rounded">Encrypt →</button>
            <button onClick={dec} className="bg-slate-700 hover:bg-slate-600 px-3 py-1 rounded">← Decrypt</button>
          </div>
        </div>
        <div className="md:col-span-2">
          <label className="text-sm">Cipher</label>
          <textarea className="w-full bg-slate-800 rounded p-2" rows={4} value={cipher} onChange={(e) => setCipher(e.target.value)} />
        </div>
      </div>

      <div className="mt-4 bg-black border border-purple-600 rounded p-3">
        <div className="text-purple-100 mb-2">
          🔎 Challenge: Encode "{ch.plain}" with key "{ch.key}"
        </div>
        <div className="flex gap-2">
          <input className="flex-1 bg-slate-800 rounded p-2" placeholder="Cipher…" value={ans} onChange={(e) => setAns(e.target.value)} />
          <button onClick={submit} className="bg-emerald-600 hover:bg-emerald-700 px-3 rounded">Submit</button>
          <button onClick={() => { setAns(""); setCh(nextChallenge("vigenere")); }} className="bg-slate-700 hover:bg-slate-600 px-3 rounded">Skip</button>
        </div>
      </div>

      <div className="mt-5">
        <h4 className="text-purple-300 font-semibold">🧪 Quick Quiz</h4>
        <Quiz questions={quiz} />
      </div>
    </div>
  );
};

const XORMode = () => {
  const [plain, setPlain] = useState("attack at dawn");
  const [key, setKey] = useState("KEY");
  const [hex, setHex] = useState(xorHex("attack at dawn", "KEY"));

  // Challenge
  const [ch, setCh] = useState(nextChallenge("xor"));
  const [ans, setAns] = useState("");

  const enc = () => setHex(xorHex(plain, key));
  const dec = () => setPlain(xorHexDecrypt(hex, key));

  const submit = () => {
    const expected = ch.hex;
    alert(ans.trim().toLowerCase() === expected ? "✅ Correct!" : `❌ Wrong. Expected hex: ${expected}`);
    setAns("");
    setCh(nextChallenge("xor"));
  };

  const quiz = [
    { question: "Why is XOR used in crypto toys?", options: ["Compression", "Parity", "Reversible & simple"], answer: 2, explanation: "Same op encrypt/decrypt with same key." },
    { question: "1 XOR 1 equals…", options: ["0", "1", "Undefined"], answer: 0, explanation: "Same bits → 0." }
  ];

  return (
    <div>
      <h3 className="text-xl font-bold text-pink-400 mb-2">🔑 XOR</h3>
      <div className="grid md:grid-cols-3 gap-3">
        <div className="bg-slate-900 p-3 rounded border border-pink-600">
          <label className="text-sm">Plain</label>
          <textarea className="w-full bg-slate-800 rounded p-2 mt-1" rows={4} value={plain} onChange={(e) => setPlain(e.target.value)} />
          <label className="text-sm mt-2 block">Key</label>
          <input className="w-full bg-slate-800 rounded p-2" value={key} onChange={(e) => setKey(e.target.value)} />
          <div className="flex gap-2 mt-2">
            <button onClick={enc} className="bg-pink-500 hover:bg-pink-600 px-3 py-1 rounded">Encrypt → hex</button>
            <button onClick={dec} className="bg-slate-700 hover:bg-slate-600 px-3 py-1 rounded">← Decrypt</button>
          </div>
        </div>
        <div className="md:col-span-2">
          <label className="text-sm">Hex</label>
          <textarea className="w-full bg-slate-800 rounded p-2" rows={4} value={hex} onChange={(e) => setHex(e.target.value)} />
        </div>
      </div>

      <div className="mt-4 bg-black border border-pink-600 rounded p-3">
        <div className="text-pink-100 mb-2">
          🔎 Challenge: XOR "{ch.plain}" with key "{ch.key}" → hex
        </div>
        <div className="flex gap-2">
          <input className="flex-1 bg-slate-800 rounded p-2" placeholder="hex…" value={ans} onChange={(e) => setAns(e.target.value)} />
          <button onClick={submit} className="bg-emerald-600 hover:bg-emerald-700 px-3 rounded">Submit</button>
          <button onClick={() => { setAns(""); setCh(nextChallenge("xor")); }} className="bg-slate-700 hover:bg-slate-600 px-3 rounded">Skip</button>
        </div>
      </div>

      <div className="mt-5">
        <h4 className="text-pink-300 font-semibold">🧪 Quick Quiz</h4>
        <Quiz questions={quiz} />
      </div>
    </div>
  );
};

const RSAMode = () => {
  // tiny demo keys
  const [p, setP] = useState(3);
  const [q, setQ] = useState(11);
  const n = p * q;
  const phi = (p - 1) * (q - 1);
  const [e, setE] = useState(3);
  const d = useMemo(() => Number(modinv(BigInt(e), BigInt(phi)) ?? 0), [e, phi]);

  const [m, setM] = useState(4);
  const [c, setC] = useState(Number(modexp(m, e, n)));

  // Challenge
  const [ch, setCh] = useState(nextChallenge("rsa"));
  const [ans, setAns] = useState("");

  const recalcC = () => setC(Number(modexp(m, e, n)));
  const decryptToM = () => setM(Number(modexp(c, d || 1, n)));

  const submit = () => {
    // If mode is "encrypt": expect c, else expect m (number)
    const expected = ch.mode === "encrypt" ? Number(modexp(ch.m, ch.e, ch.n)) : Number(modexp(ch.c, ch.d, ch.n));
    const given = Number(ans);
    alert(given === expected ? "✅ Correct!" : `❌ Wrong. Expected: ${expected}`);
    setAns("");
    setCh(nextChallenge("rsa"));
  };

  const quiz = [
    { question: "In RSA, the public key is used to…", options: ["Decrypt", "Encrypt", "Pick primes"], answer: 1, explanation: "Public encrypts, private decrypts." },
    { question: "RSA’s security comes from…", options: ["Symmetry", "Hashes", "Factoring large semiprimes"], answer: 2, explanation: "Hard integer factorization problem." }
  ];

  return (
    <div>
      <h3 className="text-xl font-bold text-red-400 mb-2">🔐 RSA (Tiny Demo)</h3>

      <div className="grid md:grid-cols-3 gap-3">
        <div className="bg-slate-900 rounded p-3 border border-red-600">
          <div className="text-sm font-semibold text-red-200 mb-1">Keys</div>
          <label className="text-xs">p</label>
          <input className="w-full bg-slate-800 rounded p-1 mb-2" type="number" value={p} onChange={(e) => setP(parseInt(e.target.value || 0))} />
          <label className="text-xs">q</label>
          <input className="w-full bg-slate-800 rounded p-1 mb-2" type="number" value={q} onChange={(e) => setQ(parseInt(e.target.value || 0))} />
          <div className="text-xs text-red-200 mt-1">n = {n} • φ(n) = {phi}</div>
          <label className="text-xs mt-2 block">e</label>
          <input className="w-full bg-slate-800 rounded p-1" type="number" value={e} onChange={(ev) => setE(parseInt(ev.target.value || 0))} />
          <div className="text-xs text-red-200 mt-1">d = {d || "(not invertible)"}</div>
        </div>

        <div className="bg-slate-900 rounded p-3 border border-red-600">
          <div className="text-sm font-semibold text-red-200 mb-1">Encrypt (c = m^e mod n)</div>
          <label className="text-xs">m (number &lt; n)</label>
          <input className="w-full bg-slate-800 rounded p-1 mb-2" type="number" value={m} onChange={(e) => setM(parseInt(e.target.value || 0))} />
          <button onClick={recalcC} className="bg-red-500 hover:bg-red-600 px-2 py-1 rounded">Encrypt</button>
          <div className="text-xs mt-2">c = <span className="text-emerald-300">{c}</span></div>
        </div>

        <div className="bg-slate-900 rounded p-3 border border-red-600">
          <div className="text-sm font-semibold text-red-200 mb-1">Decrypt (m = c^d mod n)</div>
          <label className="text-xs">c</label>
          <input className="w-full bg-slate-800 rounded p-1 mb-2" type="number" value={c} onChange={(e) => setC(parseInt(e.target.value || 0))} />
          <button onClick={decryptToM} className="bg-slate-700 hover:bg-slate-600 px-2 py-1 rounded">Decrypt</button>
          <div className="text-xs mt-2">m = <span className="text-emerald-300">{m}</span></div>
        </div>
      </div>

      <div className="mt-4 bg-black border border-red-600 rounded p-3">
        <div className="text-red-100 mb-2">
          🔎 Challenge: {ch.mode === "encrypt"
            ? `Encrypt m=${ch.m} with e=${ch.e}, n=${ch.n}`
            : `Decrypt c=${ch.c} with d=${ch.d}, n=${ch.n}`}
        </div>
        <div className="flex gap-2">
          <input className="flex-1 bg-slate-800 rounded p-2" placeholder={ch.mode === "encrypt" ? "c (number)" : "m (number)"} value={ans} onChange={(e) => setAns(e.target.value)} />
          <button onClick={submit} className="bg-emerald-600 hover:bg-emerald-700 px-3 rounded">Submit</button>
          <button onClick={() => { setAns(""); setCh(nextChallenge("rsa")); }} className="bg-slate-700 hover:bg-slate-600 px-3 rounded">Skip</button>
        </div>
      </div>

      <div className="mt-5">
        <h4 className="text-red-300 font-semibold">🧪 Quick Quiz</h4>
        <Quiz questions={quiz} />
      </div>
    </div>
  );
};

/* ---------------------- CTF Mode (Bonus) ---------------------- */
const CTFMode = () => {
  const types = ["base64", "caesar", "vigenere", "xor", "rsa"];
  const [ch, setCh] = useState(nextChallenge(sample(types)));
  const [ans, setAns] = useState("");
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);

  const renderPrompt = () => {
    switch (ch.type) {
      case "base64": return ch.mode === "decode" ? `Decode: ${ch.value}` : `Encode: ${ch.value}`;
      case "caesar": return `Caesar: encode "${ch.plain}" with shift ${ch.k}`;
      case "vigenere": return `Vigenère: encode "${ch.plain}" with key "${ch.key}"`;
      case "xor": return `XOR to hex: "${ch.plain}" with key "${ch.key}"`;
      case "rsa": return ch.mode === "encrypt"
        ? `RSA encrypt m=${ch.m} with e=${ch.e}, n=${ch.n}`
        : `RSA decrypt c=${ch.c} with d=${ch.d}, n=${ch.n}`;
      default: return "";
    }
  };

  const expectedAnswer = () => {
    switch (ch.type) {
      case "base64": return ch.mode === "decode" ? b64decode(ch.value) : b64encode(ch.value);
      case "caesar": return ch.cipher;
      case "vigenere": return ch.cipher;
      case "xor": return ch.hex.toLowerCase();
      case "rsa": return ch.mode === "encrypt"
        ? String(Number(modexp(ch.m, ch.e, ch.n)))
        : String(Number(modexp(ch.c, ch.d, ch.n)));
      default: return "";
    }
  };

  const submit = () => {
    const exp = expectedAnswer();
    const ok = (ch.type === "xor")
      ? ans.trim().toLowerCase() === exp
      : ans.trim().toUpperCase() === exp.toUpperCase();
    alert(ok ? "✅ Correct!" : `❌ Wrong. Expected: ${exp}`);
    setAns("");
    setScore((s) => s + (ok ? 10 : 0));
    setStreak((t) => (ok ? t + 1 : 0));
    setCh(nextChallenge(sample(types)));
  };

  return (
    <div className="bg-[#0b1324] border border-cyan-700 rounded p-4">
      <div className="flex items-center gap-3 mb-2">
        <span className="px-2 py-1 rounded bg-cyan-900/40 border border-cyan-700 text-cyan-200">Score: {score}</span>
        <span className="px-2 py-1 rounded bg-emerald-900/40 border border-emerald-700 text-emerald-200">Streak: {streak}</span>
        <button
          onClick={() => { setScore(0); setStreak(0); setAns(""); setCh(nextChallenge(sample(types))); }}
          className="ml-auto bg-slate-700 hover:bg-slate-600 px-3 py-1 rounded"
        >
          Reset
        </button>
      </div>
      <div className="text-cyan-200 mb-2">🏁 {renderPrompt()}</div>
      <div className="flex gap-2">
        <input className="flex-1 bg-slate-800 rounded p-2" placeholder="Your answer…" value={ans} onChange={(e) => setAns(e.target.value)} />
        <button onClick={submit} className="bg-emerald-600 hover:bg-emerald-700 px-3 rounded">Submit</button>
        <button onClick={() => { setAns(""); setCh(nextChallenge(sample(types))); }} className="bg-slate-700 hover:bg-slate-600 px-3 rounded">Skip</button>
      </div>
      <div className="text-xs text-cyan-300/70 mt-2">+10 points per correct answer. Input clears & next challenge loads after every submit.</div>
    </div>
  );
};

/* ---------------------- Main ---------------------- */
const CryptoCrackLab = () => {
  const [tab, setTab] = useState("Base64");
  const tabs = useMemo(() => ["Base64", "Caesar", "Vigenere", "XOR", "RSA", "CTF"], []);

  return (
    <div className="min-h-screen flex flex-col bg-slate-900 text-white ">
      {/* Header */}
      <NavbarEnthusiast />

      {/* Content */}
      <main className="flex-1 p-6">
        <h1 className="text-2xl font-bold text-cyan-300 mb-4">🧠 CryptoCrack Lab</h1>

        {/* Tabs */}
        <div className="flex flex-wrap gap-2 mb-4 border-b border-cyan-700">
          {tabs.map((t) => (
            <TabButton key={t} label={t} active={tab === t} onClick={() => setTab(t)} />
          ))}
        </div>

        <div className="bg-slate-800 p-6 rounded-lg border border-cyan-700 shadow-lg">
          {tab === "Base64" && <Base64Mode />}
          {tab === "Caesar" && <CaesarMode />}
          {tab === "Vigenere" && <VigenereMode />}
          {tab === "XOR" && <XORMode />}
          {tab === "RSA" && <RSAMode />}
          {tab === "CTF" && <CTFMode />}
        </div>
      </main>

      {/* Footer (fixed and only once) */}
      <FooterEnthusiast />
    </div>
  );
};

export default CryptoCrackLab;
