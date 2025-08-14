import React, { useRef, useEffect, useState } from "react";
import NavbarAdult from "../Components/NavbarAdult";
import FooterAdult from "../Components/FooterAdult";


const goodTerms = [
  { label: "Firewall", definition: "Blocks unauthorized access." },
  { label: "VPN", definition: "Encrypts your internet connection." },
  { label: "2FA", definition: "Adds an extra layer of login security." },
  { label: "Encryption", definition: "Converts data into unreadable code." },
  { label: "Secure Socket Layer", definition: "Encrypts website data transfer." },
  { label: "Strong Password", definition: "Uses letters, numbers & symbols." },
  { label: "Security Update", definition: "Fixes bugs and vulnerabilities." },
  { label: "Phishing Filter", definition: "Warns about fake websites." },
  { label: "HTTPS", definition: "Secure website communication." },
  { label: "Password Manager", definition: "Safely stores your passwords." },
  { label: "Biometric Login", definition: "Uses fingerprint or face scan." },
  { label: "Patch Management", definition: "Ensures software is up-to-date." },
  { label: "Multi-Factor Auth", definition: "Combines multiple login methods." },
  { label: "Security Awareness", definition: "Helps you recognize cyber threats." },
  { label: "Antivirus Software", definition: "Detects and removes malware." }
];


const badTerms = [
  { label: "Click Here!", penalty: true },
  { label: "123456", penalty: true },
  { label: "Free iPhone", penalty: true },
  { label: "Win a Prize", penalty: true },
  { label: "Install Unknown App", penalty: true },
  { label: "Too Good to Be True", penalty: true },
  { label: "Fake Support Call", penalty: true },
  { label: "Urgent Action Needed", penalty: true },
  { label: "Unverified Link", penalty: true },
  { label: "Public WiFi Login", penalty: true },
  { label: "No Password", penalty: true },
  { label: "Download Now", penalty: true },
  { label: "Reset Your Account", penalty: true },
  { label: "Gift Card Scam", penalty: true },
  { label: "Suspicious Attachment", penalty: true }
];

const CyberNinja = () => {
  const canvasRef = useRef(null);
  const terms = useRef([]);
  const trailPoints = useRef([]);
  const score = useRef(0);

  const [gameStarted, setGameStarted] = useState(false);
  const [missedCount, setMissedCount] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [showBadge, setShowBadge] = useState(false);
  const [sliced, setSliced] = useState(new Set());
  const [streak, setStreak] = useState([]);
  const [feedbackText, setFeedbackText] = useState(null);
  const [comboText, setComboText] = useState(null);

  const sliceAudio = useRef(new Audio("/assets/Audio/slice.mp3"));
  const wrongAudio = useRef(new Audio("/assets/Audio/wrong.mp3"));

  useEffect(() => {
    if (!gameStarted || gameOver) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let animationFrameId;
    let mouse = { x: 0, y: 0, isDown: false };

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const spawnTerm = () => {
      const isBad = Math.random() < 0.3;
      const term = isBad
        ? badTerms[Math.floor(Math.random() * badTerms.length)]
        : goodTerms[Math.floor(Math.random() * goodTerms.length)];

      terms.current.push({
        ...term,
        x: Math.random() * (canvas.width - 100),
        y: canvas.height + 50,
        vy: -1.2 - Math.random(),
        color: isBad ? "#FF1744" : getRandomColor(),
        sliced: false,
        good: !term.penalty,
        shape: Math.random() < 0.5 ? "circle" : "rect",
        id: Date.now() + Math.random(),
      });
    };

    const getRandomColor = () => {
      const colors = ["#00E5FF", "#00FFB0", "#FFA726", "#FFD600", "#FF4081"];
      return colors[Math.floor(Math.random() * colors.length)];
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const grd = ctx.createRadialGradient(
        canvas.width / 2,
        canvas.height / 2,
        0,
        canvas.width / 2,
        canvas.height / 2,
        canvas.width
      );
      grd.addColorStop(0, "#0f0f2f");
      grd.addColorStop(1, "#000000");
      ctx.fillStyle = grd;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.font = "bold 20px Comic Sans MS";

      terms.current.forEach((term, index) => {
        term.y += term.vy;

        const padding = 10;
        const textWidth = ctx.measureText(term.label).width;
        const boxWidth = textWidth + 2 * padding;
        const boxHeight = 30;

        ctx.fillStyle = term.color;
        if (term.shape === "circle") {
          ctx.beginPath();
          ctx.arc(term.x + boxWidth / 2, term.y - boxHeight / 2, boxWidth / 2, 0, 2 * Math.PI);
          ctx.fill();
        } else {
          ctx.fillRect(term.x, term.y - boxHeight, boxWidth, boxHeight);
        }

        ctx.fillStyle = "#fff";
        ctx.fillText(term.label, term.x + padding, term.y - 8);

        let isHit = false;
        if (term.shape === "circle") {
          const dx = mouse.x - (term.x + boxWidth / 2);
          const dy = mouse.y - (term.y - boxHeight / 2);
          isHit = Math.sqrt(dx * dx + dy * dy) < boxWidth / 2;
        } else {
          isHit = mouse.x >= term.x && mouse.x <= term.x + boxWidth && mouse.y >= term.y - boxHeight && mouse.y <= term.y;
        }

        if (mouse.isDown && isHit) {
          if (term.good) {
            score.current += 10;
            sliceAudio.current.currentTime = 0;
            sliceAudio.current.play();
            setSliced((prev) => new Set(prev).add(`${term.label}: ${term.definition}`));
            setFeedbackText({ text: "Nice Slice!", x: mouse.x, y: mouse.y });
            const now = Date.now();
            const newStreak = [...streak, now].filter((t) => now - t <= 2000);
            setStreak(newStreak);
            if (newStreak.length >= 3) {
              setComboText(`Combo x${newStreak.length}`);
              setTimeout(() => setComboText(null), 1500);
            }
          } else {
            wrongAudio.current.currentTime = 0;
            wrongAudio.current.play();
            setMissedCount((prev) => {
              const next = prev + 1;
              if (next >= 5) setGameOver(true);
              return next;
            });
            setFeedbackText({ text: "Oops!", x: mouse.x, y: mouse.y });
          }
          setTimeout(() => setFeedbackText(null), 1000);
          terms.current.splice(index, 1);
        }

        if (term.y < -40) {
          if (!term.sliced && term.good) {
            setMissedCount((prev) => {
              const next = prev + 1;
              if (next >= 5) setGameOver(true);
              return next;
            });
          }
          terms.current.splice(index, 1);
        }
      });

      for (let i = 0; i < trailPoints.current.length - 1; i++) {
        const p1 = trailPoints.current[i];
        const p2 = trailPoints.current[i + 1];
        ctx.strokeStyle = `rgba(255, 0, 0, ${p1.alpha})`;
        ctx.lineWidth = 5;
        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.stroke();
        p1.alpha *= 0.92;
      }
      trailPoints.current = trailPoints.current.filter((p) => p.alpha > 0.05);

      ctx.fillStyle = "#FFEB3B";
      ctx.font = "24px Arial Black";
      ctx.fillText(`Score: ${score.current}`, 30, 40);
      ctx.fillStyle = "#F44336";
      ctx.fillText(`Missed: ${missedCount}/5`, 30, 80);

      if (!gameOver) animationFrameId = requestAnimationFrame(draw);
    };

    const handleMove = (e) => {
      const x = e.touches ? e.touches[0].clientX : e.clientX;
      const y = e.touches ? e.touches[0].clientY : e.clientY;
      mouse.x = x;
      mouse.y = y;
      if (mouse.isDown) {
        trailPoints.current.push({ x, y, alpha: 1 });
        if (trailPoints.current.length > 15) trailPoints.current.shift();
      }
    };

    const handleDown = (e) => {
      mouse.isDown = true;
      const x = e.touches ? e.touches[0].clientX : e.clientX;
      const y = e.touches ? e.touches[0].clientY : e.clientY;
      mouse.x = x;
      mouse.y = y;
    };

    const handleUp = () => {
      mouse.isDown = false;
      trailPoints.current = [];
    };

    canvas.addEventListener("mousemove", handleMove);
    canvas.addEventListener("mousedown", handleDown);
    canvas.addEventListener("mouseup", handleUp);
    canvas.addEventListener("touchmove", handleMove, { passive: true });
    canvas.addEventListener("touchstart", handleDown, { passive: true });
    canvas.addEventListener("touchend", handleUp);

    const interval = setInterval(spawnTerm, 1000);
    draw();

    return () => {
      clearInterval(interval);
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", resizeCanvas);
      canvas.removeEventListener("mousemove", handleMove);
      canvas.removeEventListener("mousedown", handleDown);
      canvas.removeEventListener("mouseup", handleUp);
      canvas.removeEventListener("touchmove", handleMove);
      canvas.removeEventListener("touchstart", handleDown);
      canvas.removeEventListener("touchend", handleUp);
    };
  }, [gameStarted, gameOver, streak]);

  return (
    <>
      <NavbarAdult/> {/* ✅ ADDED */}
      <div style={{ position: "relative", overflow: "hidden" }}>
        {!gameStarted ? (
          <div style={{
            width: "100vw", height: "100vh",
            background: "linear-gradient(to bottom right, #0e0e30, #1c1c3c)",
            color: "white", display: "flex",
            flexDirection: "column", justifyContent: "center",
            alignItems: "center", textAlign: "center"
          }}>
            <h1 style={{ fontSize: "40px", marginBottom: "20px" }}>🛡️ CyberNinja</h1>
            <p style={{ fontSize: "18px", maxWidth: "600px" }}>
              Slice the safe cybersecurity terms. Avoid red flags and learn while playing!
            </p>
            <button
              onClick={() => setGameStarted(true)}
              style={{
                marginTop: "30px", padding: "12px 24px", fontSize: "18px",
                backgroundColor: "#03A9F4", color: "#fff", border: "none",
                borderRadius: "10px", cursor: "pointer", boxShadow: "0 0 10px #03A9F4"
              }}
            >
              🚀 Start Game
            </button>
          </div>
        ) : (
          <>
            <div
              style={{
                height: "calc(100vh - 64px - 80px)", // Adjust navbar/footer height if needed
                width: "100%",
                overflow: "hidden",
                position: "relative"
              }}
            >
              <canvas
                ref={canvasRef}
                style={{
                  width: "100%",
                  height: "100%",
                  display: "block"
                }}
              />
            </div>
            {/* [no changes inside canvas gameplay] */}
            {feedbackText && (
              <div style={{
                position: "absolute", left: feedbackText.x, top: feedbackText.y,
                transform: "translate(-50%, -50%)",
                fontSize: "24px", fontWeight: "bold",
                color: feedbackText.text === "Oops!" ? "red" : "lime",
                pointerEvents: "none",
                animation: "fadeOut 1s ease-out",
                zIndex: 100
              }}>
                {feedbackText.text}
              </div>
            )}
            {comboText && (
              <div style={{
                position: "absolute", top: "15%", left: "50%",
                transform: "translateX(-50%)",
                backgroundColor: "#000", padding: "10px 20px",
                borderRadius: "12px", fontSize: "20px",
                fontWeight: "bold", color: "yellow",
                animation: "pop 0.3s ease-in-out",
                boxShadow: "0 0 10px yellow", zIndex: 100
              }}>
                {comboText}
              </div>
            )}
            {gameOver && (
              <div style={{
                position: "absolute",
                top: "20%",
                left: "50%",
                transform: "translateX(-50%)",
                background: "linear-gradient(145deg, #1c1c3c, #0e0e30)",
                color: "#fff",
                padding: "30px 40px",
                borderRadius: "20px",
                textAlign: "center",
                boxShadow: "0 0 25px rgba(0, 255, 255, 0.3)",
                maxWidth: "500px",
                width: "90%",
                zIndex: 99
              }}>
                <h1 style={{ fontSize: "2.2rem", marginBottom: "10px" }}>📜 Game Over</h1>
                <h2 style={{ margin: "0 0 10px" }}>Final Score: <span style={{ color: "#FFEB3B" }}>{score.current}</span></h2>
                <p style={{ fontSize: "1rem", color: "#ccc" }}>You missed {missedCount} safe terms.</p>
                <ul style={{
                  textAlign: "left",
                  marginTop: "15px",
                  maxHeight: "180px",
                  overflowY: "auto",
                  paddingLeft: "20px"
                }}>
                  {[...sliced].map((tip, idx) => (
                    <li key={idx} style={{ marginBottom: "6px", fontSize: "0.95rem" }}>🧠 {tip}</li>
                  ))}
                </ul>
                <button
                  onClick={() => window.location.reload()}
                  style={{
                    marginTop: "25px",
                    padding: "12px 24px",
                    background: "#03A9F4",
                    border: "none",
                    borderRadius: "10px",
                    fontSize: "18px",
                    color: "#fff",
                    fontWeight: "bold",
                    cursor: "pointer",
                    boxShadow: "0 0 12px #03A9F4",
                    animation: "pulse 1.2s infinite"
                  }}>
                  🔄 Play Again
                </button>
              </div>
            )}
          </>
        )}
      </div>
      <FooterAdult /> {/* ✅ ADDED */}
    </>
  );
};

export default CyberNinja;