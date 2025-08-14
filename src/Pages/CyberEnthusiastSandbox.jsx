import React, { useState, useEffect } from "react";
import NavbarEnthusiast from "../Components/NavbarEnthusiast";
import FooterEnthusiast from "../Components/FooterEnthusiast";

const levels = [
  {
    title: "Level 1: SQL Injection",
    question: "Enter input to bypass login authentication:",
    correctAnswer: "' OR '1'='1",
    hint:
      "Imagine a login form where your input is sent directly into a database query without checks. If you can make the query always true, you can bypass the password check. In SQL, '1'='1' is a condition that always returns true. If you wrap it with single quotes and combine it with an OR statement, you can trick the system. Some sites don’t sanitize special characters like quotes, which lets you manipulate the query. Your payload needs to blend into the existing SQL so it runs without errors. Focus on breaking out of the original input and injecting your own logic. This technique has been used in many real cyberattacks.",
    explanation:
      "SQL Injection is one of the most well-known web vulnerabilities, allowing attackers to modify database queries by inserting malicious input. In this example, `' OR '1'='1` bypasses login checks because it forces the WHERE clause to always be true. SQL Injection has been responsible for massive breaches, like the 2017 Equifax hack affecting 147 million people. Attackers can extract sensitive information, modify data, or even take control of the database server. Prevention includes parameterized queries (prepared statements), proper input validation, and least-privilege database accounts. Developers should avoid string concatenation in SQL at all costs. Security testing tools like SQLMap can detect these flaws, and Web Application Firewalls (WAFs) can block basic attempts. Regular audits and secure coding practices are critical to preventing this type of attack.",
    timeLimit: 30,
  },
  {
    title: "Level 2: Cross-Site Scripting (XSS)",
    question: "Inject a script to pop up an alert:",
    correctAnswer: "<script>alert('XSS')</script>",
    hint:
      "Think about cases where a website displays your input without checking it. If it’s possible to insert HTML, you might run your own JavaScript in the browser. The simplest test is to try an alert pop-up to confirm code execution. To succeed, you need to break out of any HTML restrictions. Use `<script>` tags to run your code. Some websites attempt to block these, but there are often workarounds. Your aim here is to prove code execution, not cause harm. This is the first step in identifying a dangerous security gap.",
    explanation:
      "Cross-Site Scripting (XSS) allows attackers to inject malicious scripts into web pages, executed in other users’ browsers. A harmless example is `<script>alert('XSS')</script>`, but real attackers might steal cookies, capture keystrokes, or redirect victims. There are three main types: stored XSS (saved on the server), reflected XSS (via URL parameters), and DOM-based XSS (via JavaScript logic). Famous platforms like eBay, Twitter, and even Google have patched XSS flaws in the past. Preventing XSS involves escaping user input, validating HTML output, and implementing a strong Content Security Policy (CSP). Developers should also sanitize user-generated content. Bug bounty programs often reward the discovery of such flaws because they can be extremely damaging when combined with phishing or account takeover attacks.",
    timeLimit: 40,
  },
  {
    title: "Level 3: Cross-Site Request Forgery (CSRF)",
    question: "Which input could bypass CSRF protection?",
    correctAnswer: "csrf-bypass-token",
    hint:
      "Websites need a way to verify that a request comes from the right source. They often use hidden security tokens in forms. If you can forge or guess that token, you might trick the site into accepting your request. CSRF works when a logged-in user clicks a malicious link or visits a site that silently sends a request on their behalf. Think of a hidden `<img>` or `<form>` that sends data without the user knowing. Weak or predictable tokens can make CSRF easy. Your goal is to identify that weak point.",
    explanation:
      "CSRF is a vulnerability where attackers trick authenticated users into performing actions without their consent. This could include transferring funds, changing account settings, or even deleting data. For example, if you’re logged into an online store and visit a malicious site, that site could submit an order using your session. Websites prevent this with anti-CSRF tokens, which must be unique, random, and validated. However, poorly implemented tokens can be guessed or reused, making them ineffective. Prevention includes SameSite cookies, token regeneration, and user re-authentication for sensitive actions. Educating users about phishing can also help, since CSRF often relies on luring victims to malicious pages.",
    timeLimit: 45,
  },
  {
    title: "Level 4: Insecure Direct Object Reference (IDOR)",
    question: "What might let you view another user's data?",
    correctAnswer: "user_id=2",
    hint:
      "Some sites use numeric IDs in URLs to fetch data. If there’s no permission check, changing the number might give you access to another user’s account. This is called Insecure Direct Object Reference. Many poorly secured web apps have this flaw. Your aim is to change the value in a way that might reveal sensitive info. Always think about how URLs or parameters relate to stored data.",
    explanation:
      "IDOR vulnerabilities occur when a website exposes a reference to an internal object, such as a file name or database ID, without properly checking if the user is authorized to access it. This is common in poorly secured APIs and web apps. An attacker could change `user_id=1` to `user_id=2` in the URL to access another account. Facebook once rewarded a bug bounty hunter for exploiting a similar flaw in their developer tools. Prevention includes enforcing access control checks server-side, using random identifiers instead of sequential IDs, and avoiding sensitive data exposure through query parameters. Automated scanners and penetration testing can help detect these flaws before they’re exploited.",
    timeLimit: 50,
  },
  {
    title: "Level 5: Insecure Deserialization",
    question: "What payload could exploit object deserialization?",
    correctAnswer: '{ "@type": "Exploit", "cmd": "calc.exe" }',
    hint:
      "Some applications save objects as data, then rebuild them later. If the rebuilding process doesn’t check the type or content, an attacker could insert dangerous commands. Think about ways to specify an object type that could trigger code execution. JSON or XML inputs are often targets. This attack can lead to remote code execution if the server runs the malicious payload. Your goal is to inject something that causes the app to perform unintended actions.",
    explanation:
      "Insecure Deserialization happens when untrusted data is used to recreate objects, allowing attackers to control the process. By specifying a malicious object type, they can trigger dangerous behavior, like running system commands. For example, `{ \"@type\": \"Exploit\", \"cmd\": \"calc.exe\" }` could cause the server to execute a command on Windows. The 2015 Apache Commons Collections vulnerability was a famous case where insecure deserialization led to remote code execution in many Java applications. Prevention includes using safe serialization formats, implementing strict type checks, and avoiding deserialization of untrusted data. Web Application Firewalls can also help detect suspicious serialized input. Security training for developers is essential because this flaw is less common but highly critical.",
    timeLimit: 55,
  },
  {
    title: "Level 6: Broken Access Control",
    question: "Guess the hidden admin dashboard path:",
    correctAnswer: "/admin",
    hint:
      "Some sites hide admin panels by using uncommon URLs. If there’s no login check, anyone who finds the path can access it. Security by obscurity is never enough. Try guessing common admin endpoints used by popular frameworks. Attackers often scan for these paths using automated tools. Even hidden pages need proper access restrictions.",
    explanation:
      "Broken Access Control is the top vulnerability in the OWASP Top 10 (2021) because it’s so common and impactful. It occurs when applications fail to enforce permissions properly, letting unauthorized users access restricted functions. Guessing `/admin` might reveal a control panel, and without authentication, it’s game over. Attackers use tools like DirBuster to find these hidden endpoints quickly. Prevention includes implementing role-based access controls, denying access by default, and ensuring sensitive paths always require authentication. Logging and monitoring can help detect unauthorized access attempts. Many major breaches have started from overlooked admin panels.",
    timeLimit: 60,
  },
  {
    title: "Level 7: Path Traversal",
    question: "Craft an input to read /etc/passwd file:",
    correctAnswer: "../../etc/passwd",
    hint:
      "Some applications take a file name from user input and open it. If there’s no check, you can use `../` to move up directories and access files outside the intended folder. Linux stores user account info in `/etc/passwd`. Path traversal attacks can also reveal config files with passwords. Your goal is to escape the intended directory and read a sensitive file.",
    explanation:
      "Path Traversal vulnerabilities allow attackers to read files outside the intended directory by manipulating file paths. For example, `../../etc/passwd` accesses a sensitive system file. If the app runs with high privileges, attackers could even read configuration files containing passwords or API keys. This flaw has been exploited in many IoT devices and web apps. Prevention includes sanitizing file paths, using whitelists for allowed files, and resolving paths before accessing them. Web servers like Apache and Nginx can also block directory traversal attempts. Regular security scanning and secure coding practices are vital for preventing this.",
    timeLimit: 65,
  },
  {
    title: "Level 8: Remote Code Execution (RCE)",
    question: "Enter a payload to run system commands:",
    correctAnswer: "; ls -la",
    hint:
      "If an application runs your input inside a system command, you might be able to add your own commands using special characters. In Linux, `;` lets you chain commands. A vulnerable file upload or ping tool might let you execute code. Your goal is to run something harmless but prove code execution is possible.",
    explanation:
      "Remote Code Execution (RCE) is one of the most severe vulnerabilities, allowing attackers to run arbitrary code on the target system. In this example, appending `; ls -la` to an input might make the server list files in the current directory. Famous RCE bugs include Shellshock (CVE-2014-6271) and Log4Shell (CVE-2021-44228). RCE can lead to full system compromise, data theft, or deployment of malware. Prevention includes avoiding unsafe command execution functions, validating and sanitizing input, and running applications with the least privileges possible. Security patches should be applied promptly, as RCE vulnerabilities are often exploited quickly after discovery.",
    timeLimit: 70,
  },
  {
    title: "Level 9: Directory Listing Exposure",
    question: "What URL path might show all files in a folder?",
    correctAnswer: "/uploads/",
    hint:
      "Some servers are set up to list all files in a folder if there’s no index page. This can reveal sensitive data or give attackers clues for further attacks. Try common folder names like `/uploads/`, `/backup/`, or `/files/`. Once inside, attackers can download files directly. Your goal is to find one such exposed directory.",
    explanation:
      "Directory Listing Exposure occurs when a web server allows users to see all files in a directory because indexing is enabled. For example, visiting `/uploads/` might reveal private documents or scripts. This can lead to sensitive data leaks, exposure of credentials, or exploitation of old backup files. Many CMS platforms like WordPress have had vulnerabilities where plugins left directories open. Prevention includes disabling directory indexing in the server configuration, restricting access to sensitive folders, and storing files outside the web root. Regular server audits and vulnerability scans can catch these issues early.",
    timeLimit: 50,
  },
  {
    title: "Level 10: Open Redirect",
    question: "Find a URL parameter that can redirect you to evil.com:",
    correctAnswer: "redirect=evil.com",
    hint:
      "Some websites take a URL as input and send users there after login or logout. If there’s no validation, you can send them anywhere, including malicious sites. Look for parameters like `redirect=` or `url=` in links. Open redirects are often used in phishing to make a link look safe. Your goal is to find such a parameter and change its destination.",
    explanation:
      "Open Redirect vulnerabilities let attackers redirect users to arbitrary websites. This is often used in phishing campaigns — the link looks legitimate but ultimately sends victims to a malicious site. For example, `site.com/login?redirect=evil.com` could take users to a fake login page. While not always directly harmful, open redirects can be chained with other attacks like XSS or credential theft. Prevention includes validating redirect URLs against a whitelist, using relative paths instead of full URLs, and warning users when leaving the site. Google and PayPal have both patched open redirect flaws in the past.",
    timeLimit: 45,
  }
];



export default function CyberEnthusiastSandbox() {
  const [currentLevel, setCurrentLevel] = useState(0);
  const [unlockedLevels, setUnlockedLevels] = useState(
    Array(levels.length).fill(false).map((_, i) => i === 0)
  );
  const [userAnswer, setUserAnswer] = useState("");
  const [showHint, setShowHint] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [timer, setTimer] = useState(levels[0].timeLimit);
  const [timeUp, setTimeUp] = useState(false);
  const [score, setScore] = useState(0);

  // Timer countdown
  useEffect(() => {
    if (!showExplanation && !timeUp && timer > 0) {
      const interval = setInterval(() => setTimer((t) => t - 1), 1000);
      return () => clearInterval(interval);
    } else if (timer === 0 && !showExplanation) {
      setTimeUp(true);
    }
  }, [timer, showExplanation, timeUp]);

  const handleSubmit = () => {
    if (userAnswer.trim() === levels[currentLevel].correctAnswer.trim()) {
      const nextUnlocked = [...unlockedLevels];
      if (currentLevel + 1 < levels.length) {
        nextUnlocked[currentLevel + 1] = true;
      }
      setUnlockedLevels(nextUnlocked);
      setScore((prev) => prev + 100);
      setShowExplanation(true);
    } else {
      alert("❌ Incorrect! Try again.");
    }
  };

  const handleRetry = () => {
    setTimer(levels[currentLevel].timeLimit);
    setUserAnswer("");
    setTimeUp(false);
    setShowExplanation(false);
  };

  const goToNextLevel = () => {
    if (currentLevel + 1 < levels.length) {
      setCurrentLevel(currentLevel + 1);
      setShowExplanation(false);
      setTimeUp(false);
      setUserAnswer("");
      setTimer(levels[currentLevel + 1].timeLimit);
    }
  };

  const handleLevelClick = (index) => {
    if (unlockedLevels[index]) {
      setCurrentLevel(index);
      setShowExplanation(false);
      setTimeUp(false);
      setUserAnswer("");
      setTimer(levels[index].timeLimit);
    }
  };

  return (
    <>
      <NavbarEnthusiast />
      <div className="min-h-screen bg-black text-green-400 font-mono p-6 relative">
        {/* Animated cyber grid */}
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle,#0ff_1px,transparent_1px)] [background-size:20px_20px] animate-pulse pointer-events-none"></div>

        <h1 className="text-4xl font-bold text-center text-cyan-400 mb-6 drop-shadow-[0_0_10px_#00ffff]">
          🧠 Cyber Enthusiast Sandbox
        </h1>

        {/* HUD */}
        <div className="flex justify-between items-center mb-6 bg-gray-900 p-4 rounded-lg border border-cyan-400 shadow-lg">
          <span>Level: {currentLevel + 1}/{levels.length}</span>
          <span>⏳ Time Left: {timer}s</span>
          <span>🏆 Score: {score}</span>
        </div>

        <div className="flex gap-6">
          {/* Level selector */}
          <div className="flex flex-col gap-3 w-40">
            {levels.map((_, i) => (
              <button
                key={i}
                onClick={() => handleLevelClick(i)}
                disabled={!unlockedLevels[i]}
                className={`p-3 rounded-md border transition ${
                  currentLevel === i
                    ? "bg-cyan-500 text-black"
                    : unlockedLevels[i]
                    ? "bg-gray-800 hover:bg-gray-700 text-white"
                    : "bg-gray-900 text-gray-500 cursor-not-allowed"
                }`}
              >
                {unlockedLevels[i] ? `Level ${i + 1}` : `🔒 Level ${i + 1}`}
              </button>
            ))}
          </div>

          {/* Challenge area */}
          <div className="flex-1 bg-gray-900 p-6 rounded-lg border border-cyan-400 shadow-lg">
            <h2 className="text-xl font-bold mb-4 text-cyan-300">
              {levels[currentLevel].title}
            </h2>
            <p className="mb-4">{levels[currentLevel].question}</p>

            <button
              onClick={() => setShowHint(!showHint)}
              className="mb-3 px-3 py-1 bg-yellow-500 text-black rounded hover:bg-yellow-400"
            >
              {showHint ? "Hide Hint" : "Show Hint"}
            </button>
            {showHint && (
              <div className="p-3 mb-4 bg-gray-800 border border-yellow-400 rounded">
                💡 {levels[currentLevel].hint}
              </div>
            )}

            {!showExplanation && !timeUp && (
              <>
                <input
                  type="text"
                  value={userAnswer}
                  onChange={(e) => setUserAnswer(e.target.value)}
                  placeholder="Your answer here"
                  className="w-full p-2 bg-black border border-cyan-500 text-white rounded mb-3"
                />
                <button
                  className="px-4 py-2 bg-green-500 text-black rounded hover:bg-green-400"
                  onClick={handleSubmit}
                >
                  Submit
                </button>
              </>
            )}

            {timeUp && (
              <div className="p-4 bg-red-900 border border-red-500 rounded">
                <h3 className="text-lg font-bold">⏰ Time’s Up!</h3>
                <p>{levels[currentLevel].explanation}</p>
                <button
                  onClick={handleRetry}
                  className="mt-3 px-3 py-1 bg-blue-500 text-black rounded hover:bg-blue-400"
                >
                  Retry
                </button>
              </div>
            )}

            {showExplanation && (
              <div className="p-4 bg-green-900 border border-green-500 rounded">
                <h3 className="text-lg font-bold">✅ Correct!</h3>
                <p>{levels[currentLevel].explanation}</p>
                {currentLevel + 1 < levels.length && (
                  <button
                    onClick={goToNextLevel}
                    className="mt-3 px-3 py-1 bg-cyan-500 text-black rounded hover:bg-cyan-400"
                  >
                    Next Level
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
      <FooterEnthusiast />
    </>
  );
}
