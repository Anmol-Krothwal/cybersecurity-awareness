import { RxCross2 } from "react-icons/rx";
import { useLoginUserMutation } from "../Slice/AuthSlice";
import { useNavigate } from "react-router-dom";
import { useEffect, useMemo, useRef, useState } from "react";

/**
 * Parent PIN verification strategy:
 * 1) Try server verify (if your backend route exists) -> POST /api/parent/verify { parentEmail, pin }
 * 2) Fallback to local:
 *    - Match against localStorage key: parentPin:<parentEmail> (set on parent signup page)
 *    - Or match a dev env PIN: import.meta.env.VITE_PARENTAL_PIN (demo)
 *
 * To wire RTK Query later: replace `serverVerifyParentPin()` with your mutation (unwrap) call.
 */

const Login = () => {
  // ---------- Core login state ----------
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [localError, setLocalError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [failCount, setFailCount] = useState(0);
  const [shake, setShake] = useState(false);
  const [capsOn, setCapsOn] = useState(false);
  const [lockedUntil, setLockedUntil] = useState(null);
  const [now, setNow] = useState(Date.now());

  const [loginUser, { data, isSuccess, error, isError, isLoading }] =
    useLoginUserMutation();
  const navigate = useNavigate();

  // ---------- Parental gate state (teens only) ----------
  const [showParental, setShowParental] = useState(false);
  const [parentEmail, setParentEmail] = useState("");
  const [parentPin, setParentPin] = useState("");
  const [parentError, setParentError] = useState("");
  const [parentChecking, setParentChecking] = useState(false);
  const [rememberDevice, setRememberDevice] = useState(true);

  const DEV_PIN = import.meta.env.VITE_PARENTAL_PIN || "246810"; // demo fallback

  // ---------- UX helpers ----------
  const tips = [
    "🔐 Never share your password with anyone.",
    "📵 Don’t click on unknown links.",
    "🛡️ Turn on 2FA wherever possible.",
    "🧠 Use a strong and unique password.",
    "🔄 Change passwords regularly.",
  ];
  const tipIndex = useMemo(() => Math.floor(Math.random() * tips.length), []);
  const tip = tips[tipIndex];

  const strength = useMemo(() => {
    const pwd = credentials.password || "";
    let s = 0;
    if (pwd.length >= 8) s++;
    if (/[A-Z]/.test(pwd)) s++;
    if (/[a-z]/.test(pwd)) s++;
    if (/\d/.test(pwd)) s++;
    if (/[^A-Za-z0-9]/.test(pwd)) s++;
    return s; // 0–5
  }, [credentials.password]);
  const strengthLabel = ["Very weak", "Weak", "Okay", "Good", "Strong", "Excellent"][strength];

  const getAvatarByEmail = () => {
    const email = (credentials.email || "").toLowerCase();
    if (email.includes("kid") || email.includes("teen")) return "/assets/Image/users/kids.jpg";
    if (email.includes("adult") || email.includes("parent")) return "/assets/Image/users/adult.jpg";
    if (email.includes("senior") || email.includes("teacher")) return "/assets/Image/users/old.jpg";
    return "/assets/Image/users/default.png";
  };

  const getErrorEmoji = () => {
    const list = ["😥", "❌", "🚫", "😓", "🙈"];
    return list[failCount % list.length];
  };

  const onCapsCheck = (e) => {
    if (e.getModifierState) setCapsOn(e.getModifierState("CapsLock"));
  };

  const handleInputChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    if (localError) setLocalError(null);
  };

  // ---------- Lockout ticker ----------
  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), 500);
    return () => clearInterval(t);
  }, []);
  const isLocked = lockedUntil && now < lockedUntil;
  const remaining = isLocked ? Math.ceil((lockedUntil - now) / 1000) : 0;

  // ---------- Submit login ----------
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isLocked) return;
    setLocalError(null);
    try {
      await loginUser(credentials);
    } catch (err) {
      // handled by RTK state
    }
  };

  // ---------- Focus flow ----------
  const emailRef = useRef(null);
  const pwdRef = useRef(null);
  useEffect(() => {
    emailRef.current?.focus();
  }, []);

  // ---------- Post-login routing + teen gate ----------
  useEffect(() => {
    if (isSuccess && data?.ageGroup) {
      // Device exemption for teens
      if (data.ageGroup === "student") {
        const approved = (() => {
          try {
            const raw = localStorage.getItem(`teenDeviceApproved:${data.userId}`);
            if (!raw) return false;
            const obj = JSON.parse(raw);
            return obj?.until && Date.now() < obj.until;
          } catch {
            return false;
          }
        })();

        if (approved) {
          navigate("/TeensAct");
          return;
        }

        // Prefill parent email from server if available
        setParentEmail((data?.parentEmail || "").toLowerCase());
        setParentPin("");
        setParentError("");
        setShowParental(true);
        return;
      }

      // Everyone else routes straight away
      let redirectTo = "/";
      switch (data.ageGroup) {
        case "parent":
          redirectTo = "/AdultAct";
          break;
        case "teacher":
          redirectTo = "/SeniorAct";
          break;
        case "other":
          redirectTo = "/EnthusiastAct";
          break;
        default:
          redirectTo = "/";
      }
      setTimeout(() => navigate(redirectTo), 800);
    } else if (isError) {
      const msg = error?.data?.message || "Something went wrong";
      setLocalError(msg);
      setFailCount((prev) => {
        const next = prev + 1;
        if (next >= 5) setLockedUntil(Date.now() + 30_000); // 30s lock
        return next;
      });
      setShake(true);
      setTimeout(() => setShake(false), 600);
    }
  }, [isSuccess, data, isError, error, navigate]);

  // ---------- Parent PIN verification ----------
  const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:5000";

const serverVerifyParentPin = async (parentEmailArg, pinArg) => {
  try {
    const resp = await fetch(`${API_BASE}/api/parent/verify`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ parentEmail: parentEmailArg, pin: pinArg }),
    });
    if (!resp.ok) return false;
    const json = await resp.json().catch(() => ({}));
    return json?.ok === true;
  } catch {
    return false;
  }
};


  const localVerifyParentPin = (parentEmailArg, pinArg) => {
    const emailKey = (parentEmailArg || "").toLowerCase().trim();
    const pin = (pinArg || "").trim();
    if (!pin || pin.length !== 6) return false;

    // 1) Match saved on this device (set during parent signup)
    try {
      const raw = localStorage.getItem(`parentPin:${emailKey}`);
      if (raw) {
        const saved = JSON.parse(raw);
        if (saved?.pin === pin) return true;
      }
    } catch {
      // ignore parse errors
    }

    // 2) Dev env fallback
    if (pin === String(DEV_PIN)) return true;

    return false;
  };

  const approveDeviceIfWanted = () => {
    if (!rememberDevice || !data?.userId) return;
    try {
      localStorage.setItem(
        `teenDeviceApproved:${data.userId}`,
        JSON.stringify({ until: Date.now() + 30 * 24 * 60 * 60 * 1000 }) // 30 days
      );
    } catch {
      // ignore
    }
  };

  const verifyParentPinHandler = async (e) => {
    e.preventDefault();
    setParentError("");
    setParentChecking(true);

    const emailForCheck =
      (parentEmail || data?.parentEmail || "").toLowerCase().trim();

    // 1) Try server
    let ok = await serverVerifyParentPin(emailForCheck, parentPin);

    // 2) Fallback local if server denied/absent
    if (!ok) ok = localVerifyParentPin(emailForCheck, parentPin);

    if (ok) {
      approveDeviceIfWanted();
      setShowParental(false);
      navigate("/TeensAct");
    } else {
      setParentError("Incorrect PIN. Please try again.");
    }
    setParentChecking(false);
  };

  return (
    <div className="fixed top-0 left-0 h-screen w-full bg-[url('/assets/Image/Media2.png')] bg-cover bg-center z-50 flex items-center justify-center">
      <div
        className={`w-[92%] max-w-md bg-white/95 backdrop-blur p-6 rounded-2xl shadow-2xl relative animate-bounce-in ${
          shake ? "animate-shake" : ""
        }`}
      >
        {/* Header */}
        <div className="w-full flex justify-between items-center mb-4">
          <h2 className="text-2xl font-extrabold text-gray-800 tracking-wide">LOGIN</h2>
          <RxCross2 className="text-2xl cursor-pointer" onClick={() => navigate("/")} />
        </div>

        {/* Avatar */}
        <div className="flex items-center justify-center">
          <img
            src={getAvatarByEmail()}
            alt="Avatar"
            className="w-16 h-16 rounded-full border shadow mb-3 transition-transform hover:scale-105"
          />
        </div>

        {/* Tip */}
        <p className="text-center text-xs text-gray-600 italic">{tip}</p>

        {/* Error */}
        {isError && localError && (
          <p className="text-red-700 mt-3 mb-2 bg-red-100/80 px-4 py-2 rounded-md text-center font-semibold">
            {getErrorEmoji()} {localError}
          </p>
        )}

        {/* Lockout */}
        {isLocked && (
          <p className="text-center text-amber-700 font-medium mt-2 mb-1 bg-amber-100 px-3 py-1 rounded">
            Too many attempts. Please wait {remaining}s…
          </p>
        )}

        {/* Success (non-teen immediate) */}
        {isSuccess && !showParental ? (
          <p className="text-center text-green-600 font-semibold mt-4">
            ✅ {data?.name || "User"} logged in successfully…
          </p>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3 mt-4">
            {/* Email */}
            <input
              ref={emailRef}
              type="email"
              name="email"
              required
              placeholder="Email"
              value={credentials.email}
              onChange={handleInputChange}
              className="w-full border rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-200 outline-none"
              autoComplete="email"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  pwdRef.current?.focus();
                }
              }}
            />

            {/* Password + toggle + caps */}
            <div className="relative">
              <input
                ref={pwdRef}
                type={showPassword ? "text" : "password"}
                name="password"
                required
                placeholder="Password"
                value={credentials.password}
                onChange={handleInputChange}
                onKeyDown={onCapsCheck}
                onKeyUp={onCapsCheck}
                className="w-full border rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-200 outline-none pr-20"
                autoComplete="current-password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-2 top-2 text-sm text-gray-600 px-2 py-1 rounded hover:bg-gray-100"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? "🙈 Hide" : "👁️ Show"}
              </button>
              {capsOn && (
                <span className="absolute left-2 -bottom-5 text-xs text-amber-600">
                  Caps Lock is ON
                </span>
              )}
            </div>

            {/* Password strength */}
            <div className="w-full">
              <div className="h-1 w-full bg-gray-200 rounded">
                <div
                  className="h-1 rounded transition-all"
                  style={{
                    width: `${(strength / 5) * 100}%`,
                    background:
                      strength <= 2 ? "#ef4444" : strength === 3 ? "#f59e0b" : "#16a34a",
                  }}
                />
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Password strength: <span className="font-medium">{strengthLabel}</span>
              </p>
            </div>

            {/* Attempts */}
            {failCount > 0 && !isLocked && (
              <p className="text-xs text-red-500 text-center">
                {failCount} {failCount === 1 ? "attempt" : "attempts"} failed
              </p>
            )}

            {/* Forgot */}
            <div className="text-sm text-center text-gray-600">
              Forgot{" "}
              <span
                className="text-red-500 cursor-pointer hover:underline"
                onClick={() => navigate("/forgotPassword")}
              >
                Password?
              </span>
            </div>

            {/* Login */}
            <button
              type="submit"
              disabled={
                !credentials.email || !credentials.password || isLoading || isLocked
              }
              className={`w-full py-2 rounded-md font-semibold text-white transition duration-300 flex items-center justify-center gap-2 ${
                credentials.email && credentials.password && !isLocked
                  ? "bg-green-600 hover:bg-green-700"
                  : "bg-gray-400 cursor-not-allowed"
              }`}
            >
              {isLoading ? (
                <>
                  <span className="inline-block h-4 w-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
                  Logging in…
                </>
              ) : (
                "Login"
              )}
            </button>

            {/* Signup */}
            <div
              className="text-center text-gray-600 text-sm cursor-pointer"
              onClick={() => navigate("/signUp")}
            >
              New to CyberHub?
              <span className="text-red-500 font-medium ml-1 hover:underline">
                Create Account
              </span>
            </div>
          </form>
        )}
      </div>

      {/* PARENTAL CONTROL MODAL (Teens only) */}
      {showParental && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-6 relative animate-bounce-in">
            <button
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
              onClick={() => setShowParental(false)}
              aria-label="Close parental control"
            >
              <RxCross2 size={22} />
            </button>

            <h3 className="text-xl font-bold text-gray-800 mb-2">
              Parent Approval Required
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              To continue to the Teen Activities, a parent or guardian must enter the 6-digit PIN.
            </p>

            {parentError && (
              <p className="text-red-700 bg-red-100/80 px-3 py-2 rounded-md mb-3 text-sm font-medium">
                {parentError}
              </p>
            )}

            <form onSubmit={verifyParentPinHandler} className="space-y-3">
              {/* Parent email (prefilled, readonly if provided by server) */}
              <input
                type="email"
                value={parentEmail}
                onChange={(e) => setParentEmail(e.target.value)}
                readOnly={!!(data?.parentEmail)}
                placeholder="Parent Email"
                className={`w-full px-3 py-2 border rounded-md outline-none ${
                  data?.parentEmail ? "bg-gray-100 text-gray-600" : "focus:ring-2 focus:ring-blue-200"
                }`}
              />

              {/* PIN input */}
              <input
                inputMode="numeric"
                pattern="[0-9]*"
                maxLength={6}
                placeholder="Enter 6-digit Parent PIN"
                value={parentPin}
                onChange={(e) => setParentPin(e.target.value.replace(/\D/g, ""))}
                className="w-full border rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-200 outline-none tracking-widest text-center text-lg"
                autoFocus
              />

              {/* Remember device */}
              <label className="flex items-center gap-2 text-sm text-gray-700">
                <input
                  type="checkbox"
                  checked={rememberDevice}
                  onChange={(e) => setRememberDevice(e.target.checked)}
                />
                Remember this device for 30 days
              </label>

              <button
                type="submit"
                disabled={parentChecking || parentPin.length !== 6}
                className={`w-full py-2 rounded-md font-semibold text-white transition ${
                  parentPin.length === 6 && !parentChecking
                    ? "bg-blue-600 hover:bg-blue-700"
                    : "bg-gray-400 cursor-not-allowed"
                }`}
              >
                {parentChecking ? "Verifying…" : "Approve & Continue"}
              </button>

              <div className="mt-1 text-[11px] text-gray-500">
                Demo PIN (if no server): <code className="bg-gray-100 px-1 py-0.5 rounded">{String(DEV_PIN)}</code>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Tailwind Animations */}
      <style>
        {`
        @keyframes bounce-in {
          0% { transform: scale(0.8); opacity: 0; }
          60% { transform: scale(1.05); opacity: 1; }
          100% { transform: scale(1); }
        }
        .animate-bounce-in { animation: bounce-in 0.6s ease; }

        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-6px); }
          50% { transform: translateX(6px); }
          75% { transform: translateX(-6px); }
        }
        .animate-shake { animation: shake 0.4s; }
        `}
      </style>
    </div>
  );
};

export default Login;
