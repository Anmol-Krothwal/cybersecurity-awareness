import { useEffect, useMemo, useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { BsSendCheckFill } from "react-icons/bs";
import { useSignupUserMutation } from "../Slice/AuthSlice";
import { useNavigate } from "react-router-dom";

/**
 * 🔐 Parent PIN notes
 * - In PROD, store + verify the PIN on your backend.
 * - This component also supports a local fallback so you can demo without an API:
 *   - For a parent: clicking "Generate PIN" sets a 6-digit PIN in state and offers "Save to this device".
 *     This saves { pin, email, createdAt } under key: parentPin:<parentEmail> in localStorage.
 *   - For a teen: entering Parent Email + PIN will "locally verify" against that localStorage entry.
 * - Server-friendly: the form submits fields parentEmail and parentPin so your API can do real checks.
 */

const SignUp = () => {
  const [signupData, setSignupData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    ageGroup: "",
    // Teen-specific linking
    parentEmail: "",
    parentPin: "",
  });

  const [localError, setLocalError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  // Parent PIN UI state
  const [generatedPin, setGeneratedPin] = useState("");
  const [showPin, setShowPin] = useState(false);
  const [pinSavedHere, setPinSavedHere] = useState(false);
  const [pinCopyTick, setPinCopyTick] = useState(false);
  const [pinInfoOpen, setPinInfoOpen] = useState(false);

  const navigate = useNavigate();
  const [signupUser, { data, isLoading, isSuccess, isError, error }] =
    useSignupUserMutation();

  const checkFilled = (Data) => {
    const baseFilled =
      Data.name && Data.email && Data.password && Data.confirmPassword && Data.ageGroup;
    if (!baseFilled) return false;

    // extra check: passwords match
    if (Data.password !== Data.confirmPassword) return false;

    // teen must provide parent info (we still submit even if local verify fails—server can re-check)
    if (Data.ageGroup === "student") {
      return Data.parentEmail && Data.parentPin && Data.parentPin.length === 6;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLocalError(null);

    try {
      // Attach the generated PIN for parents (so backend can store it)
      const payload =
        signupData.ageGroup === "parent"
          ? { ...signupData, parentalPin: generatedPin || undefined }
          : signupData;

      await signupUser(payload);
    } catch (err) {
      console.error("❌ Signup error:", err);
    }
  };

  const handleInputChange = (e) => {
    const updatedData = {
      ...signupData,
      [e.target.name]: e.target.value,
    };
    setSignupData(updatedData);
    if (localError) setLocalError(null);
  };

  const getAvatarByAgeGroup = () => {
    switch (signupData.ageGroup) {
      case "student":
        return "/assets/Image/users/kids.jpg";
      case "parent":
        return "/assets/Image/users/adult.jpg";
      case "teacher":
        return "/assets/Image/users/old.jpg";
      default:
        return "/assets/Image/users/default.png";
    }
  };

  // 🔐 Password strength meter
  const strength = useMemo(() => {
    const pwd = signupData.password || "";
    let s = 0;
    if (pwd.length >= 8) s++;
    if (/[A-Z]/.test(pwd)) s++;
    if (/[a-z]/.test(pwd)) s++;
    if (/\d/.test(pwd)) s++;
    if (/[^A-Za-z0-9]/.test(pwd)) s++;
    return s; // 0–5
  }, [signupData.password]);
  const strengthLabel = ["Very weak", "Weak", "Okay", "Good", "Strong", "Excellent"][strength];

  // 🎲 Generate a 6-digit PIN
  const generatePin = () => {
    const pin = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedPin(pin);
    setShowPin(true);
    setPinSavedHere(false);
  };

  // 💾 Save parent PIN locally (demo fallback)
  const savePinToThisDevice = () => {
    if (!signupData.email || !generatedPin) return;
    const key = `parentPin:${signupData.email.toLowerCase()}`;
    const payload = {
      pin: generatedPin,
      email: signupData.email.toLowerCase(),
      createdAt: new Date().toISOString(),
    };
    try {
      localStorage.setItem(key, JSON.stringify(payload));
      setPinSavedHere(true);
    } catch (e) {
      console.warn("Local save failed", e);
    }
  };

  // 📋 Copy PIN
  const copyPin = async () => {
    if (!generatedPin) return;
    await navigator.clipboard.writeText(generatedPin);
    setPinCopyTick(true);
    setTimeout(() => setPinCopyTick(false), 1200);
  };

  // ✅ Teen local verify
  const [teenLocalVerified, setTeenLocalVerified] = useState(false);
  useEffect(() => {
    if (signupData.ageGroup !== "student") {
      setTeenLocalVerified(false);
      return;
    }
    const email = (signupData.parentEmail || "").toLowerCase().trim();
    const pin = (signupData.parentPin || "").trim();
    if (email && pin.length === 6) {
      const key = `parentPin:${email}`;
      try {
        const raw = localStorage.getItem(key);
        if (!raw) {
          setTeenLocalVerified(false);
        } else {
          const saved = JSON.parse(raw);
          setTeenLocalVerified(saved?.pin === pin);
        }
      } catch {
        setTeenLocalVerified(false);
      }
    } else {
      setTeenLocalVerified(false);
    }
  }, [signupData.ageGroup, signupData.parentEmail, signupData.parentPin]);

  // ✅ Navigate after success
  useEffect(() => {
    if (isSuccess) {
      setTimeout(() => {
        navigate("/login");
      }, 2200);
    } else if (isError) {
      setLocalError(error?.data?.message || "Something went wrong");
    }
  }, [isSuccess, isError, error, navigate]);

  return (
    <div className="fixed top-0 left-0 w-full h-screen bg-[url('/assets/Image/Media3.png')] bg-cover bg-center z-50 flex items-center justify-center">
      <div className="w-[95%] sm:w-[80%] md:w-[44%] p-6 bg-white/95 backdrop-blur rounded-2xl shadow-2xl animate-slide-in relative">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-extrabold text-gray-800 tracking-wide">SIGN UP</h2>
          <RxCross2 className="text-2xl cursor-pointer" onClick={() => navigate("/")} />
        </div>

        {/* Avatar Preview */}
        <div className="flex items-center justify-center">
          <img
            src={getAvatarByAgeGroup()}
            alt="Avatar"
            className="w-16 h-16 rounded-full border mx-auto mb-3 shadow-md transition-transform hover:scale-105"
          />
        </div>

        {/* Quick tip */}
        <p className="text-center text-xs text-gray-600 italic mb-2">
          Tip: Use a unique email for each account. Parents can set a PIN teens will use later.
        </p>

        {/* Error */}
        {localError && (
          <div className="bg-red-100 text-red-700 px-4 py-2 text-center rounded-md text-sm mb-3 animate-pulse">
            ❌ {localError}
          </div>
        )}

        {!isSuccess ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name */}
            <input
              type="text"
              name="name"
              placeholder="Name"
              required
              className="w-full px-3 py-2 border rounded-md outline-none focus:ring-2 focus:ring-blue-200"
              onChange={handleInputChange}
              value={signupData.name}
            />

            {/* Email */}
            <input
              type="email"
              name="email"
              placeholder="Email"
              required
              className="w-full px-3 py-2 border rounded-md outline-none focus:ring-2 focus:ring-blue-200"
              onChange={handleInputChange}
              value={signupData.email}
            />

            {/* Age group */}
            <select
              name="ageGroup"
              required
              className="w-full px-3 py-2 border rounded-md outline-none bg-white text-gray-700 focus:ring-2 focus:ring-blue-200"
              onChange={handleInputChange}
              value={signupData.ageGroup || ""}
            >
              <option value="" disabled hidden>
                Select Age Group
              </option>
              <option value="student">Teenagers (12–17 yrs)</option>
              <option value="parent">Adults (18–65 yrs)</option>
              <option value="teacher">Older Adults (65+ yrs)</option>
              <option value="other">Cyber Enthusiast</option>
            </select>

            {/* Parent PIN section (Parents only) */}
            {signupData.ageGroup === "parent" && (
              <div className="rounded-lg border p-3 bg-gray-50">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-gray-800">Parent PIN</h4>
                  <button
                    type="button"
                    className="text-xs text-blue-600 hover:underline"
                    onClick={() => setPinInfoOpen((s) => !s)}
                  >
                    {pinInfoOpen ? "Hide info" : "What is this?"}
                  </button>
                </div>

                {pinInfoOpen && (
                  <p className="text-xs text-gray-600 mb-2">
                    This PIN is required when your teen logs in to access Teen Activities.
                    Keep it private. You can regenerate anytime (old PIN becomes invalid if you replace it on the server).
                  </p>
                )}

                <div className="flex flex-col gap-2">
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={generatePin}
                      className="px-3 py-2 rounded-md bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold"
                    >
                      Generate PIN
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowPin((s) => !s)}
                      disabled={!generatedPin}
                      className={`px-3 py-2 rounded-md text-sm font-semibold ${
                        generatedPin
                          ? "bg-gray-200 hover:bg-gray-300 text-gray-800"
                          : "bg-gray-100 text-gray-400 cursor-not-allowed"
                      }`}
                    >
                      {showPin ? "Hide PIN" : "Show PIN"}
                    </button>
                    <button
                      type="button"
                      onClick={copyPin}
                      disabled={!generatedPin}
                      className={`px-3 py-2 rounded-md text-sm font-semibold ${
                        generatedPin
                          ? "bg-gray-200 hover:bg-gray-300 text-gray-800"
                          : "bg-gray-100 text-gray-400 cursor-not-allowed"
                      }`}
                    >
                      {pinCopyTick ? "✓ Copied" : "Copy"}
                    </button>
                  </div>

                  {/* PIN pill */}
                  {generatedPin && showPin && (
                    <div className="text-center">
                      <span className="inline-block px-4 py-2 rounded-full bg-emerald-100 text-emerald-700 font-mono tracking-widest text-lg">
                        {generatedPin}
                      </span>
                    </div>
                  )}

                  {/* Save locally (demo) */}
                  <div className="flex items-center gap-2 mt-1">
                    <button
                      type="button"
                      onClick={savePinToThisDevice}
                      disabled={!generatedPin || !signupData.email}
                      className={`px-3 py-2 rounded-md text-sm font-semibold ${
                        generatedPin && signupData.email
                          ? "bg-emerald-600 hover:bg-emerald-700 text-white"
                          : "bg-gray-100 text-gray-400 cursor-not-allowed"
                      }`}
                    >
                      Save to this device
                    </button>
                    {pinSavedHere && (
                      <span className="text-emerald-700 text-sm">Saved ✅</span>
                    )}
                  </div>

                  <p className="text-xs text-gray-500">
                    (In production, store this PIN on your server and return it with the parent profile.)
                  </p>
                </div>
              </div>
            )}

            {/* Teen link-to-parent (Teens only) */}
            {signupData.ageGroup === "student" && (
              <div className="rounded-lg border p-3 bg-indigo-50">
                <h4 className="font-semibold text-gray-800 mb-2">Link to Parent</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <input
                    type="email"
                    name="parentEmail"
                    placeholder="Parent's Email"
                    className="w-full px-3 py-2 border rounded-md outline-none focus:ring-2 focus:ring-blue-200"
                    onChange={handleInputChange}
                    value={signupData.parentEmail}
                  />
                  <input
                    type="text"
                    name="parentPin"
                    placeholder="6-digit Parent PIN"
                    maxLength={6}
                    inputMode="numeric"
                    className="w-full px-3 py-2 border rounded-md outline-none focus:ring-2 focus:ring-blue-200 tracking-widest"
                    onChange={(e) =>
                      handleInputChange({
                        target: { name: "parentPin", value: e.target.value.replace(/\D/g, "") },
                      })
                    }
                    value={signupData.parentPin}
                  />
                </div>
                <div className="mt-2 text-sm">
                  {signupData.parentEmail && signupData.parentPin.length === 6 ? (
                    teenLocalVerified ? (
                      <span className="text-emerald-700">Parent PIN verified on this device ✅</span>
                    ) : (
                      <span className="text-amber-700">
                        We couldn’t verify locally. You can still sign up—your parent can approve at login.
                      </span>
                    )
                  ) : (
                    <span className="text-gray-500">
                      Ask your parent to create a PIN during their signup. Then enter it here.
                    </span>
                  )}
                </div>
              </div>
            )}

            {/* Password */}
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                required
                className="w-full px-3 py-2 border rounded-md outline-none focus:ring-2 focus:ring-blue-200 pr-20"
                onChange={handleInputChange}
                value={signupData.password}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute top-2 right-3 text-sm text-gray-600 px-2 py-1 rounded hover:bg-gray-100"
              >
                {showPassword ? "🙈 Hide" : "👁️ Show"}
              </button>

              {/* Strength meter */}
              <div className="mt-2">
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
                <ul className="text-[11px] text-gray-500 grid grid-cols-2 gap-x-3 mt-1">
                  <li>• 8+ characters</li>
                  <li>• Upper & lower case</li>
                  <li>• Numbers</li>
                  <li>• Symbol (!@#$%)</li>
                </ul>
              </div>
            </div>

            {/* Confirm Password */}
            <div className="relative">
              <input
                type={showConfirm ? "text" : "password"}
                name="confirmPassword"
                placeholder="Confirm Password"
                required
                className="w-full px-3 py-2 border rounded-md outline-none focus:ring-2 focus:ring-blue-200 pr-20"
                onChange={handleInputChange}
                value={signupData.confirmPassword}
              />
              <button
                type="button"
                onClick={() => setShowConfirm(!showConfirm)}
                className="absolute top-2 right-3 text-sm text-gray-600 px-2 py-1 rounded hover:bg-gray-100"
              >
                {showConfirm ? "🙈 Hide" : "👁️ Show"}
              </button>
              {signupData.confirmPassword && signupData.password !== signupData.confirmPassword && (
                <p className="text-xs text-red-600 mt-1">Passwords do not match.</p>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={!checkFilled(signupData) || isLoading}
              className={`w-full py-2 rounded-md text-white font-semibold transition flex items-center justify-center gap-2 ${
                checkFilled(signupData) && !isLoading
                  ? "bg-green-600 hover:bg-green-700"
                  : "bg-gray-400 cursor-not-allowed"
              }`}
            >
              {isLoading ? (
                <>
                  <span className="inline-block h-4 w-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
                  Creating Account…
                </>
              ) : (
                "Create Account"
              )}
            </button>

            <p className="text-center text-gray-600 text-sm">
              Already have an account?{" "}
              <span className="text-red-500 cursor-pointer hover:underline" onClick={() => navigate("/login")}>
                Login
              </span>
            </p>
          </form>
        ) : (
          <div className="flex flex-col items-center space-y-4 mt-8">
            <BsSendCheckFill className="text-3xl text-green-500 animate-bounce" />
            <p className="text-center text-green-700 font-semibold">
              {data?.message || "Account created successfully. Redirecting to login…"}
            </p>
          </div>
        )}

        {/* Mini confetti-ish burst for generated PIN (no deps) */}
        {generatedPin && showPin && (
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <div className="absolute top-6 right-10 w-2 h-2 bg-emerald-400 rounded-full animate-pop" />
            <div className="absolute top-10 right-16 w-2 h-2 bg-blue-400 rounded-full animate-pop delay-150" />
            <div className="absolute top-4 right-20 w-2 h-2 bg-fuchsia-400 rounded-full animate-pop delay-300" />
          </div>
        )}
      </div>

      {/* Tailwind animations */}
      <style>
        {`
          @keyframes slide-in {
            0% { opacity: 0; transform: translateY(30px); }
            100% { opacity: 1; transform: translateY(0); }
          }
          .animate-slide-in { animation: slide-in 0.6s ease-out; }

          @keyframes pop {
            0% { transform: scale(0); opacity: 0; }
            60% { transform: scale(1.4); opacity: 1; }
            100% { transform: scale(1); opacity: 0; }
          }
          .animate-pop { animation: pop 0.7s ease-out both; }
          .delay-150 { animation-delay: 150ms; }
          .delay-300 { animation-delay: 300ms; }
        `}
      </style>
    </div>
  );
};

export default SignUp;
