import React, { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:5000";

const PasswordReset = () => {
  const [step, setStep] = useState(1);            // 1=email, 2=otp, 3=reset
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [countdown, setCountdown] = useState(0);  // resend timer (sec)
  const [devOtp, setDevOtp] = useState("");       // shown only in dev
  const [resetToken, setResetToken] = useState(""); // received after OTP verify

  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPwd, setShowPwd] = useState(false);

  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState({ type: "", text: "" });

  const inputsRef = useRef([]);

  const navigate = useNavigate();

  // password strength (same logic used in SignUp/Login)
  const strength = useMemo(() => {
    const pwd = password || "";
    let s = 0;
    if (pwd.length >= 8) s++;
    if (/[A-Z]/.test(pwd)) s++;
    if (/[a-z]/.test(pwd)) s++;
    if (/\d/.test(pwd)) s++;
    if (/[^A-Za-z0-9]/.test(pwd)) s++;
    return s; // 0–5
  }, [password]);
  const strengthLabel = ["Very weak","Weak","Okay","Good","Strong","Excellent"][strength];

  const show = (type, text) => setMsg({ type, text });

  // resend countdown
  useEffect(() => {
    if (!countdown) return;
    const t = setInterval(() => setCountdown((s) => (s > 0 ? s - 1 : 0)), 1000);
    return () => clearInterval(t);
  }, [countdown]);

  // OTP helpers
  const otpValue = otp.join("");
  const handleOtpChange = (idx, val) => {
    if (!/^\d?$/.test(val)) return;
    const next = [...otp];
    next[idx] = val;
    setOtp(next);
    if (val && idx < 5) inputsRef.current[idx + 1]?.focus();
  };
  const handleOtpKeyDown = (idx, e) => {
    if (e.key === "Backspace" && !otp[idx] && idx > 0) {
      inputsRef.current[idx - 1]?.focus();
    }
  };
  const handleOtpPaste = (e) => {
    const text = (e.clipboardData.getData("text") || "").replace(/\D/g, "").slice(0, 6);
    if (!text) return;
    const next = text.split("").concat(Array(6).fill("")).slice(0, 6);
    setOtp(next);
    inputsRef.current[Math.min(text.length, 5)]?.focus();
    e.preventDefault();
  };

  // API calls
  const startReset = async () => {
    setLoading(true); show("", "");
    try {
      const resp = await fetch(`${API_BASE}/api/auth/forgot/start`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const json = await resp.json();
      if (!resp.ok) throw new Error(json?.message || "Could not start reset");
      // For dev, backend returns devOtp; in prod it will be emailed
      if (json?.devOtp) setDevOtp(json.devOtp);
      setCountdown(30);
      setOtp(["","","","","",""]);
      setStep(2);
      show("ok", "📩 OTP sent! Check your email.");
    } catch (e) {
      show("err", e.message);
    } finally {
      setLoading(false);
    }
  };

  const verifyOtp = async () => {
    setLoading(true); show("", "");
    try {
      const resp = await fetch(`${API_BASE}/api/auth/forgot/verify`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp: otpValue }),
      });
      const json = await resp.json();
      if (!resp.ok) throw new Error(json?.message || "OTP verification failed");
      setResetToken(json.resetToken); // short-lived token
      setStep(3);
      show("ok", "✅ OTP verified");
    } catch (e) {
      show("err", e.message);
    } finally {
      setLoading(false);
    }
  };

  const applyReset = async () => {
    if (password !== confirm) {
      show("err", "Passwords do not match");
      return;
    }
    setLoading(true); show("", "");
    try {
      const resp = await fetch(`${API_BASE}/api/auth/forgot/reset`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: resetToken, password }),
      });
      const json = await resp.json();
      if (!resp.ok) throw new Error(json?.message || "Reset failed");
      show("ok", "✅ Password updated! Redirecting to login…");
      setTimeout(() => navigate("/login"), 1200);
    } catch (e) {
      show("err", e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed top-0 left-0 w-full h-screen bg-[url('/assets/Image/Media3.png')] bg-cover bg-center flex justify-center items-center p-4">
      <div className="bg-white/95 backdrop-blur shadow-2xl rounded-2xl w-full max-w-md p-6 animate-bounce-in">
        {/* Progress */}
        <div className="mb-4">
          <div className="flex items-center justify-between text-xs text-gray-600">
            <span className={step>=1 ? "font-semibold text-gray-800" : ""}>Email</span>
            <span className={step>=2 ? "font-semibold text-gray-800" : ""}>OTP</span>
            <span className={step>=3 ? "font-semibold text-gray-800" : ""}>Reset</span>
          </div>
          <div className="h-1.5 bg-gray-200 rounded mt-2">
            <div
              className="h-1.5 bg-blue-600 rounded transition-all"
              style={{ width: `${(step-1)/2*100}%` }}
            />
          </div>
        </div>

        {/* Step 1: Email */}
        {step === 1 && (
          <form
            onSubmit={(e) => { e.preventDefault(); startReset(); }}
            className="space-y-4"
          >
            <h2 className="text-2xl font-extrabold text-gray-800 text-center">Forgot Password</h2>
            <input
              type="email"
              placeholder="Your registered email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-200 outline-none"
            />
            <button
              type="submit"
              disabled={!email || loading}
              className={`w-full py-2 rounded-lg text-white font-semibold ${
                email && !loading ? "bg-green-600 hover:bg-green-700" : "bg-gray-400"
              }`}
            >
              {loading ? "Sending…" : "Send OTP"}
            </button>
            {msg.text && (
              <p className={`text-center text-sm ${msg.type === "err" ? "text-red-600" : "text-green-600"}`}>{msg.text}</p>
            )}
          </form>
        )}

        {/* Step 2: OTP */}
        {step === 2 && (
          <form
            onSubmit={(e) => { e.preventDefault(); verifyOtp(); }}
            className="space-y-4"
          >
            <h2 className="text-xl font-bold text-center">Enter the 6-digit OTP</h2>
            <p className="text-center text-xs text-gray-600 -mt-2">Sent to <span className="font-medium">{email}</span></p>

            <div className="flex justify-center gap-2" onPaste={handleOtpPaste}>
              {otp.map((val, i) => (
                <input
                  key={i}
                  ref={(el) => (inputsRef.current[i] = el)}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={val}
                  onChange={(e) => handleOtpChange(i, e.target.value.replace(/\D/g, ""))}
                  onKeyDown={(e) => handleOtpKeyDown(i, e)}
                  className="w-12 h-12 text-center text-xl border rounded-lg focus:ring-2 focus:ring-blue-200 outline-none"
                />
              ))}
            </div>

            <div className="flex items-center justify-between text-sm">
              <button
                type="button"
                disabled={!!countdown || loading}
                onClick={startReset}
                className={`underline ${countdown ? "text-gray-400" : "text-blue-600"}`}
              >
                {countdown ? `Resend in ${countdown}s` : "Resend OTP"}
              </button>
              {devOtp && (
                <span className="text-[11px] text-gray-500">
                  (Dev OTP: <code className="bg-gray-100 px-1 rounded">{devOtp}</code>)
                </span>
              )}
            </div>

            <button
              type="submit"
              disabled={otpValue.length !== 6 || loading}
              className={`w-full py-2 rounded-lg text-white font-semibold ${
                otpValue.length === 6 && !loading ? "bg-indigo-600 hover:bg-indigo-700" : "bg-gray-400"
              }`}
            >
              {loading ? "Verifying…" : "Verify OTP"}
            </button>
            {msg.text && (
              <p className={`text-center text-sm ${msg.type === "err" ? "text-red-600" : "text-green-600"}`}>{msg.text}</p>
            )}
          </form>
        )}

        {/* Step 3: Reset */}
        {step === 3 && (
          <form
            onSubmit={(e) => { e.preventDefault(); applyReset(); }}
            className="space-y-4"
          >
            <h2 className="text-xl font-bold text-center">Set a new password</h2>

            <div className="relative">
              <input
                type={showPwd ? "text" : "password"}
                placeholder="New Password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 border rounded-lg pr-20 focus:ring-2 focus:ring-blue-200 outline-none"
              />
              <button
                type="button"
                onClick={() => setShowPwd((s) => !s)}
                className="absolute top-2 right-2 text-sm text-gray-600 px-2 py-1 rounded hover:bg-gray-100"
              >
                {showPwd ? "🙈 Hide" : "👁️ Show"}
              </button>

              <div className="mt-2">
                <div className="h-1 w-full bg-gray-200 rounded">
                  <div
                    className="h-1 rounded transition-all"
                    style={{
                      width: `${(strength / 5) * 100}%`,
                      background: strength <= 2 ? "#ef4444" : strength === 3 ? "#f59e0b" : "#16a34a",
                    }}
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Strength: <span className="font-medium">{strengthLabel}</span>
                </p>
              </div>
            </div>

            <input
              type={showPwd ? "text" : "password"}
              placeholder="Confirm Password"
              required
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-200 outline-none"
            />
            {confirm && password !== confirm && (
              <p className="text-xs text-red-600 -mt-2">Passwords do not match.</p>
            )}

            <button
              type="submit"
              disabled={!password || password !== confirm || loading}
              className={`w-full py-2 rounded-lg text-white font-semibold ${
                password && password === confirm && !loading
                  ? "bg-green-600 hover:bg-green-700"
                  : "bg-gray-400"
              }`}
            >
              {loading ? "Updating…" : "Reset Password"}
            </button>
            {msg.text && (
              <p className={`text-center text-sm ${msg.type === "err" ? "text-red-600" : "text-green-600"}`}>{msg.text}</p>
            )}
          </form>
        )}

        {/* Footer nav */}
        <div className="text-sm text-center mt-6 text-gray-600">
          <button onClick={() => navigate("/")} className="text-blue-600 hover:underline mr-3">
            🏠 Home
          </button>
          <button onClick={() => navigate("/login")} className="text-blue-600 hover:underline">
            🔐 Login
          </button>
        </div>
      </div>

      {/* Animations */}
      <style>
        {`
          @keyframes bounce-in { 0%{transform:scale(.9);opacity:0} 60%{transform:scale(1.03);opacity:1} 100%{transform:scale(1)} }
          .animate-bounce-in { animation: bounce-in .5s ease }
        `}
      </style>
    </div>
  );
};

export default PasswordReset;
