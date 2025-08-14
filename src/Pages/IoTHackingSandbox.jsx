import React, { useState, useEffect } from 'react';
import NavbarEnthusiast from "../Components/NavbarEnthusiast";
import FooterEnthusiast from "../Components/FooterEnthusiast";

/* -------- Glossary -------- */
const glossary = [
  { term: "Default Credentials", tip: "Pre-configured username/password, often admin:admin" },
  { term: "Base64", tip: "Binary-to-text encoding — easy to decode, not encryption" },
  { term: "Port", tip: "Logical access point for network services (e.g., 22/SSH, 80/HTTP)" },
  { term: "2FA", tip: "Two-Factor Authentication — adds a second check after password" },
  { term: "Packet Sniffing", tip: "Capturing network traffic to inspect contents/metadata" },
  { term: "HTTPS", tip: "HTTP over TLS — encrypts traffic to prevent interception" },
  { term: "MQTT", tip: "Lightweight IoT messaging protocol (often 1883/8883)" },
];

/* -------- 10 Devices (each with full educational content) -------- */
const initialDevices = [
  /* 1) Security Camera — Default Credentials */
  {
    id: 'camera',
    name: 'Security Camera',
    image: '📷',
    vulnerability: 'Default Credentials',
    gameType: 'terminal',
    gameData: {
      correct: 'admin:admin',
      tip: 'Over 30% of IoT breaches are due to unchanged default passwords.',
      defense: 'Change default credentials and enforce strong, unique passwords.',
      explanationHeader: "🔑 Exploiting Default Credentials",
      explanationText:
        "Many cameras ship with predictable logins like admin:admin or admin:1234.\n" +
        "Attackers scan the internet (e.g., Shodan) to find exposed panels.\n" +
        "No vulnerability is needed when owners never change defaults.\n" +
        "Once logged in, attackers can view streams or change settings.\n" +
        "Always change defaults on first boot and disable remote access.\n" +
        "Use strong passwords and consider 2FA if available.",
      logs: [
        "[LOG] Probe: http://192.168.0.15/admin",
        "[LOG] Banner: 'VendorCam v2.1 WebUI'",
        "[LOG] Trying credential pair: admin:admin",
        "[LOG] Authentication: SUCCESS (HTTP 302 → /dashboard)",
        "[LOG] Exporting config: /config/backup.cfg",
        "[LOG] RTSP endpoint discovered: rtsp://192.168.0.15/live",
        "[LOG] Snapshot saved: /loot/cam01.jpg",
        "[LOG] User list downloaded (2 accounts)",
        "[LOG] Audit note: default creds left unchanged",
        "[LOG] Attack session ended",
      ],
      hint:
        "Try the most common username/password combos first.\n" +
        "Check vendor manuals for default credentials.\n" +
        "Login panels often accept admin:admin on fresh installs.\n" +
        "If that fails, admin:1234 is common on legacy devices.\n" +
        "Strong unique passwords shut this door completely.",
      explanation:
        "Default credentials are a classic misconfiguration.\n" +
        "Adversaries don’t need zero-days when logins are predictable.\n" +
        "Internet scans + credential dictionaries = mass compromise.\n" +
        "Changing defaults and enforcing strong passwords is essential.\n" +
        "Disable remote access, or whitelist trusted IPs only.\n" +
        "Enable 2FA if supported to mitigate credential reuse.\n" +
        "Review logs regularly for suspicious logins and exports.\n" +
        "Use device inventory to catch forgotten default accounts.\n" +
        "Network segmentation limits access to admin panels.\n" +
        "This challenge demonstrates why secure setup matters most.",
    },
  },

  /* 2) Smart Thermostat — Open Debug Port */
  {
    id: 'thermostat',
    name: 'Smart Thermostat',
    image: '🌡️',
    vulnerability: 'Open Debug Port',
    gameType: 'portmatch',
    gameData: {
      ports: ['22', '2323', '80', '443'],
      answer: '2323',
      tip: 'Open debug/Telnet ports are prime takeover paths for botnets.',
      defense: 'Disable unused services and restrict access with firewall rules.',
      explanationHeader: "🛠 Open Debug/Telnet Ports",
      explanationText:
        "Debug or maintenance ports often remain enabled in production.\n" +
        "Telnet (sometimes on 2323) can allow unauthenticated access.\n" +
        "Mirai-like botnets brute-force weak/blank passwords at scale.\n" +
        "Banner grabbing reveals firmware and build details.\n" +
        "Port audits and service hardening close these gaps.\n" +
        "Least privilege network rules keep devices safe.",
      logs: [
        "[LOG] Nmap scan: open ports detected 22, 80, 443, 2323",
        "[LOG] Service banner (2323): 'Thermo Debug Console'",
        "[LOG] Telnet connect: welcome prompt shown",
        "[LOG] Authentication: not required (maintenance mode)",
        "[LOG] Running 'sysinfo' ...",
        "[LOG] Firmware: 1.0.2-rc (build 5421)",
        "[LOG] Dumping /etc/passwd (read-only)",
        "[LOG] Pulling /var/log/heatd.log",
        "[LOG] Exfil saved: /loot/thermo-debug.zip",
        "[LOG] Session terminated",
      ],
      hint:
        "Scan all ports, not only the usual suspects.\n" +
        "Look for Telnet or vendor consoles on odd ports like 2323.\n" +
        "Banners often betray debug builds or modes.\n" +
        "Debug consoles can skip auth entirely.\n" +
        "Firewall off unused services to reduce attack surface.",
      explanation:
        "An exposed debug port is an operational oversight.\n" +
        "It bypasses normal auth controls by design (for engineers).\n" +
        "Attackers abuse it for device introspection and takeover.\n" +
        "Inventory + port scans catch unintended exposures early.\n" +
        "Disable Telnet; prefer SSH with keys if remote access is needed.\n" +
        "Restrict management interfaces to a secure admin VLAN.\n" +
        "Automate audits in CI/CD for firmware/service settings.\n" +
        "Use EDR/IDS for anomaly detection on management ports.\n" +
        "Patch firmware to remove debug backdoors permanently.\n" +
        "This challenge shows how a single open port breaks trust.",
    },
  },

  /* 3) Baby Monitor — Unencrypted Stream (Base64 credentials) */
  {
    id: 'baby_monitor',
    name: 'Baby Monitor',
    image: '🍼',
    vulnerability: 'Unencrypted Stream',
    gameType: 'packet',
    gameData: {
      encoded: typeof btoa === 'function' ? btoa('admin123') : 'YWRtaW4xMjM=',
      answer: 'admin123',
      tip: 'Credentials in Base64 over HTTP are not protected. Always use TLS.',
      defense: 'Enforce HTTPS/TLS and avoid transmitting secrets in plaintext.',
      explanationHeader: "📡 Unencrypted Transmission",
      explanationText:
        "Older devices send credentials/streams without encryption.\n" +
        "Attackers nearby can sniff Wi-Fi and recover secrets.\n" +
        "Base64 is an encoding, not a security control.\n" +
        "Wireshark filters quickly surface auth blobs.\n" +
        "TLS ensures confidentiality and integrity in transit.\n" +
        "Rotate credentials exposed over insecure channels.",
      logs: [
        "[LOG] Capturing wlan0 traffic...",
        "[LOG] HTTP POST /login detected",
        "[LOG] Header: Authorization: Basic YWRtaW4xMjM=",
        "[LOG] Decoding Base64 → 'admin123'",
        "[LOG] Session cookie: sid=7f2c3a;",
        "[LOG] RTSP /live/stream.sdp accessible",
        "[LOG] Saving stream to /loot/monitor.mp4",
        "[LOG] Unencrypted auth confirmed in capture",
        "[LOG] Report: encryption absent on device firmware",
        "[LOG] Case closed with remediation advice",
      ],
      hint:
        "Decode the Base64 blob from the packet.\n" +
        "Basic auth is just base64(user:pass).\n" +
        "If it’s readable, it’s not secure.\n" +
        "TLS is required to protect credentials.\n" +
        "Check for HTTPS redirects/strict policies.",
      explanation:
        "Plain HTTP leaks credentials to anyone on the path.\n" +
        "Base64 protects against encoding issues, not attackers.\n" +
        "Sniffers capture Authorization headers effortlessly.\n" +
        "TLS encrypts the transport, preventing interception.\n" +
        "Device UI should force HTTPS and HSTS.\n" +
        "Password rotation is mandatory after exposure.\n" +
        "Use unique credentials per device to limit blast radius.\n" +
        "Monitor for leaked secrets in logs and SIEM.\n" +
        "Educate users: public Wi-Fi + HTTP = danger.\n" +
        "This level shows why encoding ≠ security.",
    },
  },

  /* 4) Smart Plug — Weak Configuration (choose secure settings) */
  {
    id: 'smart_plug',
    name: 'Smart Plug',
    image: '🔌',
    vulnerability: 'Weak Configuration',
    gameType: 'dragdrop',
    gameData: {
      options: ['Enable 2FA', 'Allow guest access', 'Use HTTPS', 'Disable firewall'],
      correct: ['Enable 2FA', 'Use HTTPS'],
      tip: 'Harden configs: drop guest access, require TLS, enable MFA.',
      defense: 'Enforce secure defaults and review configs regularly.',
      explanationHeader: "⚙️ Misconfiguration Risks",
      explanationText:
        "Default/weak settings grant attackers easy wins.\n" +
        "Guest access bypasses identity; disable it outright.\n" +
        "TLS protects panel credentials and device commands.\n" +
        "Firewalls should stay enabled to block unsolicited traffic.\n" +
        "Periodic config audits catch regressions.\n" +
        "Least privilege reduces lateral movement.",
      logs: [
        "[LOG] Policy check: guest account = ENABLED",
        "[LOG] Web admin page served over HTTP",
        "[LOG] TLS cert: not configured",
        "[LOG] 2FA status: DISABLED",
        "[LOG] Firewall: OFF (UPnP rule added)",
        "[LOG] Attacker accessed /admin without login",
        "[LOG] Device schedule modified remotely",
        "[LOG] Cloud sync token harvested",
        "[LOG] Config snapshot stored to /loot/plug.json",
        "[LOG] Compliance score: 22/100 (CRITICAL)",
      ],
      hint:
        "Pick options that increase authentication strength.\n" +
        "Prioritize encrypted management sessions.\n" +
        "Guest access is inconsistent with security.\n" +
        "Firewalls should stay enabled, not disabled.\n" +
        "Aim for settings that resist trivial abuse.",
      explanation:
        "Security posture starts with correct configuration.\n" +
        "2FA stops password-only takeovers cold.\n" +
        "HTTPS protects creds and prevents command tampering.\n" +
        "Guest access and disabled firewalls are anti-patterns.\n" +
        "Automate baseline checks into device onboarding.\n" +
        "Rollback risky changes via config management.\n" +
        "Don’t expose admin UIs beyond trusted networks.\n" +
        "Log & alert on policy drift and failed hardening.\n" +
        "Vendor defaults should be reviewed immediately.\n" +
        "This challenge teaches secure-by-default thinking.",
    },
  },

  /* 5) Smart Doorbell — Broadcasted Credentials (sniff before timer ends) */
  {
    id: 'doorbell',
    name: 'Smart Doorbell',
    image: '🚪',
    vulnerability: 'Broadcasted Credentials',
    gameType: 'sniffing',
    gameData: {
      correctCode: 'cyber123',
      tip: 'Plaintext credentials can be sniffed in seconds. Use encryption.',
      defense: 'Force TLS on onboarding and rotate leaked secrets immediately.',
      explanationHeader: "🔓 Plaintext Credential Leakage",
      explanationText:
        "Some devices leak secrets during pairing or updates.\n" +
        "Mobile apps may send passwords via HTTP.\n" +
        "Nearby attackers sniff traffic and reuse tokens.\n" +
        "Short timers pressure responders; rotate keys fast.\n" +
        "WPA2/3 + TLS reduces these exposures.\n" +
        "Design onboarding to avoid broadcast secrets.",
      logs: [
        "[LOG] Sniffer armed on channel 6",
        "[LOG] HTTP POST /api/login observed",
        "[LOG] user=admin&pass=cyber123",
        "[LOG] 200 OK; Set-Cookie: session=ab12cd",
        "[LOG] Mobile app fetch /doorbell/live",
        "[LOG] Snapshot endpoint reveals still images",
        "[LOG] Attacker replayed cookie to API",
        "[LOG] Session hijack successful",
        "[LOG] SOC alerted via anomaly on new IP",
        "[LOG] Keys rotated; sessions invalidated",
      ],
      hint:
        "Act quickly — the timer simulates a brief capture window.\n" +
        "Credentials often appear in POST bodies over HTTP.\n" +
        "Try the obvious code seen in the capture.\n" +
        "If wrong, think about typical weak choices.\n" +
        "Encryption would prevent this entire scenario.",
      explanation:
        "Broadcasting secrets is a severe engineering flaw.\n" +
        "Assume local adversaries during onboarding flows.\n" +
        "TLS + certificate pinning protects mobile-to-device traffic.\n" +
        "Rotate credentials and invalidate sessions after exposure.\n" +
        "Use short-lived provisioning tokens, not raw passwords.\n" +
        "Log device pairing events for incident response.\n" +
        "Segment IoT from corporate/guest networks.\n" +
        "Test onboarding with red-team sniffers pre-release.\n" +
        "Educate users to update apps/devices promptly.\n" +
        "This level shows why secure onboarding matters.",
    },
  },

  /* 6) Smart TV — Outdated Firmware (terminal: command) */
  {
    id: 'smart_tv',
    name: 'Smart TV',
    image: '📺',
    vulnerability: 'Outdated Firmware',
    gameType: 'terminal',
    gameData: {
      correct: 'update firmware',
      tip: 'Known CVEs target old builds; patching closes public exploits.',
      defense: 'Enable auto-updates, validate sources, and apply security patches.',
      explanationHeader: "🧩 Outdated Firmware Risks",
      explanationText:
        "Unpatched TVs run web engines with known bugs.\n" +
        "Attackers exploit CVEs via browser/streaming apps.\n" +
        "Code exec can pivot to LAN via TV integrations.\n" +
        "Firmware should verify signatures and roll back safely.\n" +
        "Auto-updates limit time-to-patch exposure.\n" +
        "Inventory versions to find laggards quickly.",
      logs: [
        "[LOG] Version check: TV firmware v2.0.1 (latest v2.2.0)",
        "[LOG] Known CVE: remote code execution in webview",
        "[LOG] Malicious appstore listing attempted",
        "[LOG] Download blocked by parental controls",
        "[LOG] DNS request to roguecdn[.]ex",
        "[LOG] Update channel reachable, signed manifest OK",
        "[LOG] Downloading patch bundle (120 MB)",
        "[LOG] Applying delta; verifying signature",
        "[LOG] Reboot scheduled for 02:00",
        "[LOG] Patch status: SUCCESS",
      ],
      hint:
        "Think remediation, not exploitation.\n" +
        "What action mitigates known public exploits?\n" +
        "Use vendor update channels and signatures.\n" +
        "Avoid sideloading from untrusted sources.\n" +
        "Enter the maintenance command you’d run.",
      explanation:
        "Unpatched devices are low-hanging fruit for attackers.\n" +
        "RCE bugs in media engines enable living-room footholds.\n" +
        "Signed updates reduce supply-chain tampering risk.\n" +
        "Auto-update windows keep exposure minimal.\n" +
        "Delta patches lower bandwidth and downtime.\n" +
        "Reboots should be scheduled to minimize disruption.\n" +
        "Fleet managers must track versions across sites.\n" +
        "Block rogue domains in DNS/secure web gateways.\n" +
        "User prompts should nudge critical security updates.\n" +
        "This level encourages a patch-first mindset.",
    },
  },

  /* 7) Smart Fridge — Weak API Key (packet: decode) */
  {
    id: 'smart_fridge',
    name: 'Smart Fridge',
    image: '🥶',
    vulnerability: 'Weak API Key',
    gameType: 'packet',
    gameData: {
      encoded: typeof btoa === 'function' ? btoa('apikey12345') : 'YXBpa2V5MTIzNDU=',
      answer: 'apikey12345',
      tip: 'Hard-coded or short API keys are easily discovered and reused.',
      defense: 'Use strong, rotated tokens and never hard-code secrets.',
      explanationHeader: "🔐 API Key Exposure",
      explanationText:
        "Firmware sometimes embeds keys in plaintext.\n" +
        "Traffic captures or strings analysis reveals them.\n" +
        "Static keys allow cross-tenant data access.\n" +
        "Rotate keys and scope permissions tightly.\n" +
        "Prefer OAuth/OIDC rather than static secrets.\n" +
        "Secret scanning should run pre-release.",
      logs: [
        "[LOG] GET /inventory with header X-API-KEY: YXBpa2V5MTIzNDU=",
        "[LOG] Decoded key → 'apikey12345'",
        "[LOG] Access to /orders granted (200)",
        "[LOG] Bulk export initiated by unknown device",
        "[LOG] Rate limit exceeded; throttling engaged",
        "[LOG] Alert: key reused from different IPs",
        "[LOG] Key revoked by backend after anomaly",
        "[LOG] Rotation issued to registered apps",
        "[LOG] Device update required to fetch new key",
        "[LOG] Postmortem scheduled with vendor",
      ],
      hint:
        "Decode the header; don’t assume encryption.\n" +
        "Short, human-readable keys are a red flag.\n" +
        "Check multiple endpoints for the same key.\n" +
        "Rotation and scoping limit damage.\n" +
        "Enter the exact decoded value.",
      explanation:
        "Static API keys are brittle and leak easily.\n" +
        "Compromise enables unauthorized API calls and scraping.\n" +
        "Server-side anomaly detection caught multi-IP reuse.\n" +
        "Revocation + rotation is the immediate response.\n" +
        "Devices should fetch short-lived tokens securely.\n" +
        "Permissions must be least-privilege per role.\n" +
        "Build pipelines should block committed secrets.\n" +
        "Firmware should store secrets in secure elements.\n" +
        "Customer data requires defense-in-depth, not one key.\n" +
        "This level shows why secret hygiene matters.",
    },
  },

  /* 8) Smart Light — Unauthenticated MQTT Control (portmatch) */
  {
    id: 'smart_light',
    name: 'Smart Light',
    image: '💡',
    vulnerability: 'Unauthenticated MQTT',
    gameType: 'portmatch',
    gameData: {
      ports: ['1883', '8883', '80', '443'],
      answer: '1883',
      tip: 'MQTT without auth lets anyone publish control messages.',
      defense: 'Require auth and run MQTT over TLS (8883).',
      explanationHeader: "🛰️ MQTT Without Authentication",
      explanationText:
        "IoT hubs use MQTT to send device commands.\n" +
        "Brokers on 1883 often lack auth in dev/test.\n" +
        "Attackers publish topics to control devices.\n" +
        "TLS on 8883 with auth prevents hijacking.\n" +
        "ACLs restrict who can publish/subscribe.\n" +
        "Audit retained messages for sensitive data.",
      logs: [
        "[LOG] Broker discovered on tcp/1883",
        "[LOG] Anonymous connection accepted",
        "[LOG] Subscribed to topic /home/lights/#",
        "[LOG] Published payload '{\"on\":false}' to /home/lights/1/cmd",
        "[LOG] Device acknowledged command",
        "[LOG] No auth or TLS configured",
        "[LOG] Retained messages expose device state",
        "[LOG] Attempt to upgrade to 8883 failed (no certs)",
        "[LOG] Security advisory created for product team",
        "[LOG] Tracking ticket OPEN: enable auth + TLS",
      ],
      hint:
        "Which port is clear-text MQTT?\n" +
        "TLS MQTT usually listens on 8883.\n" +
        "Anonymous connects are a red flag.\n" +
        "Publishing to command topics changes state.\n" +
        "Pick the unauthenticated broker port.",
      explanation:
        "Unauthenticated brokers enable trivial takeovers.\n" +
        "Attackers issue power and mode changes at will.\n" +
        "Transport security prevents interception/tampering.\n" +
        "Broker ACLs gate topic permissions effectively.\n" +
        "Rotate credentials; avoid shared accounts.\n" +
        "Retained topics shouldn’t leak sensitive state.\n" +
        "Device identity (mTLS) adds strong trust.\n" +
        "Monitoring should flag anonymous connections.\n" +
        "Default-deny policies are safer than allow-all.\n" +
        "This level teaches secure messaging practices.",
    },
  },

  /* 9) Smart Speaker — Voice Command Injection (dragdrop) */
  {
    id: 'smart_speaker',
    name: 'Smart Speaker',
    image: '🔊',
    vulnerability: 'Voice Command Injection',
    gameType: 'dragdrop',
    gameData: {
      options: ['Disable unknown voice profiles', 'Enable guest mode', 'Use HTTPS', 'Block firewall'],
      correct: ['Disable unknown voice profiles', 'Use HTTPS'],
      tip: 'Untrusted voices can trigger purchases/actions if not locked down.',
      defense: 'Restrict voice to enrolled profiles and secure all APIs with TLS.',
      explanationHeader: "🗣️ Voice Injection Threats",
      explanationText:
        "Speakers accept audio from any source by default.\n" +
        "Hidden/ultrasonic commands can trigger actions.\n" +
        "Profile-bound recognition limits attack surface.\n" +
        "App/API paths must still be encrypted/authenticated.\n" +
        "Physical proximity ≠ legitimate authority.\n" +
        "Review purchase and action permissions carefully.",
      logs: [
        "[LOG] Wake word detected at 03:14 AM",
        "[LOG] Command: 'Order 5 gift cards'",
        "[LOG] Voice profile: UNKNOWN",
        "[LOG] API call /purchase with bearer token",
        "[LOG] TLS cipher: none (HTTP fallback)",
        "[LOG] Transaction flagged by anomaly rules",
        "[LOG] Owner notification sent",
        "[LOG] Refund issued; token rotated",
        "[LOG] Profile re-enrollment required",
        "[LOG] Policy updated: unknown profiles blocked",
      ],
      hint:
        "Disable unrecognized voice profiles.\n" +
        "Encrypt control APIs; never allow HTTP.\n" +
        "Guest mode expands risk; avoid enabling it.\n" +
        "Firewalls should stay enabled, not blocked.\n" +
        "Pick the two hardening steps that matter most.",
      explanation:
        "Voice alone isn’t a sufficient trust signal.\n" +
        "Attackers can inject commands with replay or ads.\n" +
        "Binding actions to verified profiles reduces abuse.\n" +
        "TLS + auth protect back-end purchase APIs.\n" +
        "Guest modes should be minimal and constrained.\n" +
        "Token rotation kills stolen session abuse quickly.\n" +
        "Audit logs must capture voice profile context.\n" +
        "User approvals for high-risk actions help.\n" +
        "Hardware mute switches limit ambient attack paths.\n" +
        "This level emphasizes least-privilege for assistants.",
    },
  },

  /* 10) Smart Lock — Default PIN (sniffing) */
  {
    id: 'smart_lock',
    name: 'Smart Lock',
    image: '🔒',
    vulnerability: 'Default PIN',
    gameType: 'sniffing',
    gameData: {
      correctCode: '0000',
      tip: 'Default/short PINs fall to guessing or local capture.',
      defense: 'Enforce strong PIN policy and lockout after failures.',
      explanationHeader: "🚪 Weak Access Codes",
      explanationText:
        "Locks ship with simple PINs like 0000 or 1234.\n" +
        "If pairing/setup transmits codes over BLE/Wi-Fi, they leak.\n" +
        "Brute-forcing short PINs takes seconds without lockout.\n" +
        "Enforce length, complexity, and attempt limits.\n" +
        "Rotate codes after suspected exposure.\n" +
        "Use device logs for tamper investigation.",
      logs: [
        "[LOG] BLE pairing initiated by new phone",
        "[LOG] Advertised service: LockControl v1",
        "[LOG] GATT write: code=0000",
        "[LOG] Unlock event 2025-08-01 21:17:22",
        "[LOG] Owner device not present (geo-fence off)",
        "[LOG] Attempted re-lock by owner",
        "[LOG] Audit flag: default PIN in use",
        "[LOG] Policy: require 6+ digits next login",
        "[LOG] Code rotation forced by app",
        "[LOG] Security incident filed (medium)",
      ],
      hint:
        "Think like an installer — what’s the out-of-box code?\n" +
        "Short, all-same-digit PINs are common defaults.\n" +
        "Brute-force works if there’s no lockout.\n" +
        "Change it immediately after setup.\n" +
        "Enter the obvious default value.",
      explanation:
        "Default/weak PINs defeat the point of a smart lock.\n" +
        "Attackers try common codes or capture first-use pairing.\n" +
        "Lockout and back-off timers slow brute-force greatly.\n" +
        "App-enforced complexity keeps households safer.\n" +
        "Code rotation should be easy and well-prompted.\n" +
        "Notifications must alert on unlocks from new devices.\n" +
        "Geo-fences should add secondary checks when offsite.\n" +
        "Encryption on BLE/Wi-Fi stops passive capture.\n" +
        "Logs help insurers and occupants investigate events.\n" +
        "This level reinforces secure defaults and hygiene.",
    },
  },
];

/* -------- Component -------- */
export default function IoTHackingSandbox() {
  const [devices, setDevices] = useState([]);
  const [selectedDevice, setSelectedDevice] = useState(null);
  const [input, setInput] = useState('');
  const [logs, setLogs] = useState([]);
  const [success, setSuccess] = useState(null);
  const [timer, setTimer] = useState(5);
  const [dragItems, setDragItems] = useState([]);
  const [droppedItems, setDroppedItems] = useState([]);
  const [showGlossary, setShowGlossary] = useState(false);
  const [score, setScore] = useState(0);
  const [completed, setCompleted] = useState([]);
  const [showSummary, setShowSummary] = useState(false);
  const [showHint, setShowHint] = useState(true);

  /* Randomize device order on mount */
  useEffect(() => {
    setDevices([...initialDevices].sort(() => Math.random() - 0.5));
  }, []);

  /* Sniffing timer tick */
  useEffect(() => {
    if (selectedDevice?.gameType === 'sniffing' && success === null && timer > 0) {
      const t = setTimeout(() => setTimer((v) => v - 1), 1000);
      return () => clearTimeout(t);
    }
  }, [timer, selectedDevice, success]);

  const resetGame = () => {
    setInput('');
    setLogs([]);
    setSuccess(null);
    setTimer(5);
    setDragItems([]);
    setDroppedItems([]);
    setShowHint(true);
  };

  const handleCompletion = (win) => {
    if (win) setScore((s) => s + 1);
    setCompleted((c) => {
      const next = Array.from(new Set([...c, selectedDevice.id]));
      if (next.length === devices.length) setShowSummary(true);
      return next;
    });
  };

  /* ---------- Game Renderers ---------- */
  const renderGame = (device) => {
    const data = device.gameData;
    const addLog = (msg) => setLogs((prev) => [...prev, msg]);

    const hintBox = (
      <div className="bg-gray-800/60 border border-green-500/60 rounded p-3 text-sm mb-3 whitespace-pre-wrap">
        <div className="flex items-center justify-between">
          <strong className="text-green-300">Hint</strong>
          <button className="text-xs underline" onClick={() => setShowHint(!showHint)}>
            {showHint ? 'Hide' : 'Show'}
          </button>
        </div>
        {showHint && <div className="mt-2">{data.hint}</div>}
      </div>
    );

    switch (device.gameType) {
      case 'terminal':
        return (
          <>
            {hintBox}
            <p className="font-semibold">Enter the correct command/credentials:</p>
            <div className="flex gap-2 mt-2">
              <input
                value={input}
                onChange={e => setInput(e.target.value)}
                className="bg-gray-800 px-3 py-2 rounded w-72 border border-green-400"
                placeholder="e.g. admin:admin  OR  update firmware"
              />
              <button
                onClick={() => {
                  const win = input.trim().toLowerCase() === data.correct.toLowerCase();
                  addLog(`> ${input.trim()}`);
                  addLog(win ? '✅ Success!' : '❌ Failed');
                  setSuccess(win);
                  handleCompletion(win);
                  setInput('');
                }}
                className="px-4 py-2 bg-green-700 rounded hover:bg-green-800"
              >
                Submit
              </button>
            </div>
          </>
        );

      case 'portmatch':
        return (
          <>
            {hintBox}
            <p className="font-semibold">Identify the vulnerable/open service port:</p>
            <div className="flex flex-wrap gap-3 mt-3">
              {data.ports.map((port) => (
                <button
                  key={port}
                  onClick={() => {
                    const win = port === data.answer;
                    addLog(`Checked port ${port}: ${win ? 'Open ✅' : 'Closed ❌'}`);
                    setSuccess(win);
                    handleCompletion(win);
                  }}
                  className="px-4 py-2 bg-green-700 rounded hover:bg-green-800"
                >
                  Port {port}
                </button>
              ))}
            </div>
          </>
        );

      case 'packet':
        return (
          <>
            {hintBox}
            <p className="font-semibold">Decode this Base64 packet:</p>
            <code className="bg-gray-800 p-2 rounded block mt-1 break-all">{data.encoded}</code>
            <div className="mt-2 flex gap-2">
              <input
                value={input}
                onChange={e => setInput(e.target.value)}
                className="bg-gray-800 px-3 py-2 rounded w-72 border border-green-400"
                placeholder="Decoded value"
              />
              <button
                onClick={() => {
                  const win = input === data.answer;
                  addLog(`Decoded: ${input}`);
                  addLog(win ? 'Match ✅' : 'Incorrect ❌');
                  setSuccess(win);
                  handleCompletion(win);
                }}
                className="px-4 py-2 bg-green-700 rounded hover:bg-green-800"
              >
                Submit
              </button>
            </div>
          </>
        );

      case 'dragdrop':
        if (dragItems.length === 0) setDragItems(data.options);
        return (
          <>
            {hintBox}
            <p className="font-semibold">Drag the secure settings into the safe zone:</p>
            <div className="flex gap-6 mt-3">
              <div
                className="w-1/2 min-h-[140px] p-3 border border-green-400 rounded bg-gray-800"
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => {
                  const text = e.dataTransfer.getData("text/plain");
                  if (text && !droppedItems.includes(text)) {
                    setDroppedItems((arr) => [...arr, text]);
                    addLog(`Dropped: ${text}`);
                  }
                }}
              >
                <p className="text-sm text-green-400">Drop here:</p>
                {droppedItems.map((item, i) => (
                  <p key={i} className="bg-green-700 px-2 py-1 rounded mt-1">{item}</p>
                ))}
              </div>
              <div className="w-1/2">
                {dragItems.map((opt, i) => (
                  <div
                    key={i}
                    draggable
                    onDragStart={(e) => e.dataTransfer.setData("text/plain", opt)}
                    className="bg-green-800 p-2 rounded mb-2 cursor-move"
                  >
                    {opt}
                  </div>
                ))}
              </div>
            </div>
            <button
              onClick={() => {
                const correct =
                  JSON.stringify([...droppedItems].sort()) ===
                  JSON.stringify([...data.correct].sort());
                addLog(correct ? 'Secured ✅' : 'Weak ❌');
                setSuccess(correct);
                handleCompletion(correct);
              }}
              className="px-4 py-2 bg-green-700 rounded hover:bg-green-800 mt-3"
            >
              Submit
            </button>
          </>
        );

      case 'sniffing':
        return (
          <>
            {hintBox}
            <p className="font-semibold">Intercept before timer ends:</p>
            <div className="h-2 bg-gray-600 rounded mt-1">
              <div
                className="h-full bg-green-500 rounded transition-all"
                style={{ width: `${(timer / 5) * 100}%` }}
              />
            </div>
            <p className="text-yellow-300 font-bold mt-2">Time left: {timer}s</p>
            {timer > 0 && success === null ? (
              <div className="mt-2 flex gap-2">
                <input
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  className="bg-gray-800 px-3 py-2 rounded w-72 border border-green-400"
                  placeholder="Captured code"
                />
                <button
                  onClick={() => {
                    const win = input === data.correctCode;
                    setLogs((prev) => [...prev, `Captured: ${input}`]);
                    setSuccess(win);
                    handleCompletion(win);
                  }}
                  className="px-4 py-2 bg-green-700 rounded hover:bg-green-800"
                >
                  Submit
                </button>
              </div>
            ) : (
              success === null && <p className="text-red-400 mt-2">⏰ Time's up!</p>
            )}
          </>
        );

      default:
        return null;
    }
  };

  /* ---------- UI ---------- */
  return (
    <>
      <NavbarEnthusiast />
      <div className="min-h-screen bg-gray-900 text-green-200 font-mono p-6">
        <h1 className="text-3xl font-bold mb-1 text-green-400">IoT Hacking Sandbox</h1>
        <p className="mb-4">Score: {score} / {devices.length}</p>

        <button
          className="mb-4 text-sm underline hover:text-yellow-400"
          onClick={() => setShowGlossary(!showGlossary)}
        >
          {showGlossary ? 'Hide Glossary' : 'Show Glossary'}
        </button>

        {showGlossary && (
          <div className="bg-gray-800 border border-green-500 rounded p-4 mb-6">
            <h2 className="text-xl font-bold mb-2">Cyber Glossary</h2>
            <ul className="list-disc ml-6 text-sm space-y-1">
              {glossary.map((item, i) => (
                <li key={i}><strong>{item.term}:</strong> {item.tip}</li>
              ))}
            </ul>
          </div>
        )}

        {!showSummary ? (
          <>
            <div className="grid md:grid-cols-3 gap-6">
              {devices.map((d) => (
                <div
                  key={d.id}
                  onClick={() => { resetGame(); setSelectedDevice(d); }}
                  className={`bg-gray-800 p-4 rounded-lg border ${completed.includes(d.id) ? 'border-green-300 opacity-70' : 'border-green-600 hover:bg-green-800'} cursor-pointer transform transition duration-200 hover:scale-105`}
                >
                  <div className="text-4xl">{d.image}</div>
                  <h2 className="text-xl font-semibold mt-2">{d.name}</h2>
                  <p className="text-sm">{d.vulnerability}</p>
                </div>
              ))}
            </div>

            {selectedDevice && (
              <div className="mt-10 p-6 border border-green-400 rounded-xl bg-gray-800">
                <h2 className="text-2xl font-bold text-green-300 mb-2">
                  {selectedDevice.name} — {selectedDevice.vulnerability}
                </h2>

                {success === null ? (
                  renderGame(selectedDevice)
                ) : (
                  <>
                    <h3 className="text-lg font-bold mt-4">{selectedDevice.gameData.explanationHeader}</h3>
                    <p className="mt-2 whitespace-pre-wrap">{selectedDevice.gameData.explanationText}</p>

                    <div className="bg-black p-3 rounded border border-green-500 my-3 h-40 overflow-y-auto text-sm">
                      {selectedDevice.gameData.logs.map((l, i) => <p key={i}>{l}</p>)}
                    </div>

                    <p className="mt-2 text-green-300">
                      {success ? '✅ Exploit Successful!' : '❌ Exploit Failed!'}
                    </p>
                    <p className="mt-1 text-green-400 italic">💡 Tip: {selectedDevice.gameData.tip}</p>
                    <p className="mt-1">🛡️ Defense: {selectedDevice.gameData.defense}</p>

                    <h4 className="text-md font-bold mt-4">Why this matters</h4>
                    <p className="mt-1 whitespace-pre-wrap">{selectedDevice.gameData.explanation}</p>

                    <button
                      className="mt-4 bg-green-700 px-4 py-2 rounded hover:bg-green-800"
                      onClick={() => setSelectedDevice(null)}
                    >
                      Back to Devices
                    </button>
                  </>
                )}

                {logs.length > 0 && (
                  <div className="bg-black p-3 rounded border border-green-500 h-32 overflow-y-auto text-sm mt-4">
                    {logs.map((l, i) => <p key={i}>{l}</p>)}
                  </div>
                )}
              </div>
            )}
          </>
        ) : (
          <div className="mt-10 p-6 border border-green-400 rounded-xl bg-gray-800 text-center">
            <h2 className="text-3xl font-bold text-green-300 mb-4">Session Complete!</h2>
            <p className="mb-2">You scored {score} out of {devices.length}.</p>
            <button
              className="mt-4 bg-green-700 px-4 py-2 rounded hover:bg-green-800"
              onClick={() => { setCompleted([]); setScore(0); setShowSummary(false); setSelectedDevice(null); }}
            >
              Play Again
            </button>
          </div>
        )}
      </div>
      <FooterEnthusiast />
    </>
  );
}
