import React, { useEffect, useRef, useState } from "react";

const videos = [
  {
    src: "/assets/Video/Internet-Safety-Rules-For-Kids.mp4",
    thumb: "/assets/Image/Teenvideoplayer/img17.jpg",
    title: "Internet Safety Rules for Kids",
    quiz: {
      q: "What’s the safest thing to do if a stranger messages you?",
      options: ["Reply nicely", "Ignore/block and tell an adult", "Share your email"],
      correct: 1,
    },
  },
  {
    src: "/assets/Video/Online-Privacy-for-Kids-Internet-Safety-and-Security-for-Kids.mp4",
    thumb: "/assets/Image/Teenvideoplayer/img16.jpg",
    title: "Online Privacy Basics",
    quiz: {
      q: "Which is okay to share online?",
      options: ["Full home address", "Pet’s nickname (no location)", "School + class time"],
      correct: 1,
    },
  },
  {
    src: "/assets/Video/Internet-Safety-Rules-For-Kids.mp4",
    thumb: "/assets/Image/Teenvideoplayer/img18.jpg",
    title: "Smart Chat Habits",
    quiz: {
      q: "A pop-up asks you to ‘install a free game’. What do you do?",
      options: ["Click it fast!", "Ask an adult / close it", "Enter your password"],
      correct: 1,
    },
  },
];

const fmt = (t) => {
  if (Number.isNaN(t)) return "0:00";
  const m = Math.floor(t / 60);
  const s = Math.floor(t % 60).toString().padStart(2, "0");
  return `${m}:${s}`;
};

// simple inline SVG chevrons (no extra libs)
const ChevronLeft = (props) => (
  <svg viewBox="0 0 24 24" fill="none" {...props}>
    <path d="M15 19l-7-7 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);
const ChevronRight = (props) => (
  <svg viewBox="0 0 24 24" fill="none" {...props}>
    <path d="M9 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const VideoSwiper = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [muted, setMuted] = useState(false);
  const [speed, setSpeed] = useState(1);
  const [autoplayNext, setAutoplayNext] = useState(true);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [watched, setWatched] = useState(() => Array(videos.length).fill(false));
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizAnswer, setQuizAnswer] = useState(null);
  const [drag, setDrag] = useState({ startX: 0, deltaX: 0, dragging: false });

  const videoRef = useRef(null);
  const progressRef = useRef(null);

  const prevIndex = (currentIndex - 1 + videos.length) % videos.length;
  const nextIndex = (currentIndex + 1) % videos.length;

  const goTo = (i) => {
    setCurrentIndex(i);
    setShowQuiz(false);
    setQuizAnswer(null);
  };
  const handlePrev = () => goTo(prevIndex);
  const handleNext = () => goTo(nextIndex);

  useEffect(() => {
    const onKey = (e) => {
      if (e.target && ["INPUT", "TEXTAREA", "SELECT", "BUTTON"].includes(e.target.tagName)) return;
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "ArrowLeft") handlePrev();
      if (e.code === "Space") {
        e.preventDefault();
        togglePlay();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [currentIndex]);

  useEffect(() => {
    setProgress(0);
    setCurrentTime(0);
    setDuration(0);
    setIsPlaying(true);
  }, [currentIndex]);

  const togglePlay = async () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      await v.play().catch(() => {});
      setIsPlaying(true);
    } else {
      v.pause();
      setIsPlaying(false);
    }
  };

  const onTimeUpdate = () => {
    const v = videoRef.current;
    if (!v) return;
    setCurrentTime(v.currentTime || 0);
    setDuration(v.duration || 0);
    if (v.duration) setProgress((v.currentTime || 0) / v.duration);
  };

  const onLoaded = () => {
    const v = videoRef.current;
    if (!v) return;
    setDuration(v.duration || 0);
    v.playbackRate = speed;
    if (isPlaying) v.play().catch(() => {});
  };

  const onEnded = () => {
    setWatched((w) => {
      const c = [...w];
      c[currentIndex] = true;
      return c;
    });
    setShowQuiz(true);
    setIsPlaying(false);
    if (autoplayNext) setTimeout(() => handleNext(), 1200);
  };

  const onSeek = (e) => {
    const v = videoRef.current;
    const bar = progressRef.current;
    if (!v || !bar) return;
    const rect = bar.getBoundingClientRect();
    const x = Math.min(Math.max(e.clientX - rect.left, 0), rect.width);
    const pct = x / rect.width;
    v.currentTime = pct * (v.duration || 0);
  };

  const onTouchStart = (e) => setDrag({ startX: e.touches[0].clientX, deltaX: 0, dragging: true });
  const onTouchMove = (e) => setDrag((d) => ({ ...d, deltaX: e.touches[0].clientX - d.startX }));
  const onTouchEnd = () => {
    const threshold = 60;
    if (drag.deltaX > threshold) handlePrev();
    else if (drag.deltaX < -threshold) handleNext();
    setDrag({ startX: 0, deltaX: 0, dragging: false });
  };

  useEffect(() => {
    if (videoRef.current) videoRef.current.playbackRate = speed;
  }, [speed]);

  return (
    <div className="relative w-full bg-gradient-to-br from-sky-100 via-blue-100 to-indigo-100 px-4 md:px-6 py-10 md:py-16 flex flex-col items-center overflow-hidden">

      {/* Title + small controls */}
      <div className="w-full max-w-5xl flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-4">
        <h2 className="text-xl md:text-2xl font-bold text-indigo-700">
          {videos[currentIndex].title}
          {watched[currentIndex] && (
            <span className="ml-2 inline-flex items-center text-sm px-2 py-0.5 rounded-full bg-green-100 text-green-700 border border-green-200">
              ✓ watched
            </span>
          )}
        </h2>

        <div className="flex items-center gap-2 md:gap-3">
          <button
            onClick={() => setAutoplayNext((s) => !s)}
            className={`px-3 py-1.5 rounded-md border text-sm bg-white ${
              autoplayNext ? "border-indigo-300 text-indigo-700" : "border-gray-300 text-gray-600"
            }`}
            title="Autoplay next"
          >
            Autoplay: {autoplayNext ? "On" : "Off"}
          </button>

          <button
            onClick={() => setMuted((m) => !m)}
            className="px-3 py-1.5 rounded-md border bg-white border-gray-300 text-sm"
            title="Mute / Unmute"
          >
            {muted ? "Unmute" : "Mute"}
          </button>

          <label className="flex items-center gap-2 text-sm">
            <span className="text-gray-600">Speed</span>
            <select
              value={speed}
              onChange={(e) => setSpeed(Number(e.target.value))}
              className="px-2 py-1 rounded-md border border-gray-300 bg-white"
            >
              <option value={0.75}>0.75×</option>
              <option value={1}>1×</option>
              <option value={1.25}>1.25×</option>
              <option value={1.5}>1.5×</option>
            </select>
          </label>
        </div>
      </div>

      {/* Video */}
      <div
        className="relative w-full max-w-5xl aspect-video bg-black rounded-2xl overflow-hidden border border-gray-200 shadow-lg select-none"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
        style={{
          transform: drag.dragging ? `translateX(${drag.deltaX * 0.15}px)` : "translateX(0px)",
          transition: drag.dragging ? "none" : "transform 200ms ease",
        }}
      >
        <video
          ref={videoRef}
          src={videos[currentIndex].src}
          muted={muted}
          controls={false}
          autoPlay
          playsInline
          onTimeUpdate={onTimeUpdate}
          onLoadedMetadata={onLoaded}
          onEnded={onEnded}
          className="w-full h-full object-contain bg-black"
        />

        {/* Arrow Buttons (better style) */}
        <button
          onClick={handlePrev}
          aria-label="Previous Video"
          className="group absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/95 border border-gray-200 shadow hover:shadow-md hover:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-300 flex items-center justify-center"
        >
          <ChevronLeft className="w-6 h-6 text-gray-800 group-active:translate-x-[-2px] transition-transform" />
        </button>

        <button
          onClick={handleNext}
          aria-label="Next Video"
          className="group absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/95 border border-gray-200 shadow hover:shadow-md hover:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-300 flex items-center justify-center"
        >
          <ChevronRight className="w-6 h-6 text-gray-800 group-active:translate-x-[2px] transition-transform" />
        </button>

        {/* Center Play/Pause */}
        <button
          onClick={togglePlay}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 px-4 py-2 rounded-full bg-white/90 hover:bg-white border border-gray-200 shadow text-sm font-semibold"
          title="Play / Pause (Space)"
        >
          {isPlaying ? "Pause" : "Play"}
        </button>

        {/* Progress */}
        <div className="absolute bottom-0 left-0 right-0 bg-black/40">
          <div className="flex items-center justify-between text-white/90 text-xs px-3 py-1.5">
            <span>{fmt(currentTime)}</span>
            <span>{fmt(duration)}</span>
          </div>
          <div
            ref={progressRef}
            className="h-2 bg-white/30 cursor-pointer"
            onClick={onSeek}
            title="Click to seek"
          >
            <div
              className="h-2 bg-blue-500"
              style={{ width: `${Math.min(Math.max(progress, 0), 1) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Quick Quiz */}
      {showQuiz && (
        <div className="w-full max-w-5xl mt-4 p-4 rounded-xl border border-amber-200 bg-amber-50 text-amber-900">
          <div className="font-semibold mb-2">Quick Quiz 🧠</div>
          <div className="mb-3">{videos[currentIndex].quiz.q}</div>
          <div className="grid md:grid-cols-3 gap-2">
            {videos[currentIndex].quiz.options.map((opt, i) => {
              const picked = quizAnswer === i;
              const correct = videos[currentIndex].quiz.correct === i;
              const showResult = quizAnswer !== null;
              const base = "px-3 py-2 rounded-lg border text-sm transition";
              const cls = !showResult
                ? "bg-white border-amber-200 hover:bg-amber-100"
                : correct
                ? "bg-green-100 border-green-300 text-green-800"
                : picked
                ? "bg-red-100 border-red-300 text-red-800"
                : "bg-white border-amber-200 opacity-70";
              return (
                <button
                  key={i}
                  disabled={showResult}
                  onClick={() => setQuizAnswer(i)}
                  className={`${base} ${cls}`}
                >
                  {opt}
                </button>
              );
            })}
          </div>
          {quizAnswer !== null && (
            <div className="mt-3 text-sm">
              {quizAnswer === videos[currentIndex].quiz.correct
                ? "✅ Nice! Keep those privacy skills sharp."
                : "❌ Close! When unsure, block/ignore and tell a trusted adult."}
            </div>
          )}
        </div>
      )}

      {/* Dot Indicators (keep) */}
      <div className="mt-4 flex justify-center gap-2">
        {videos.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            aria-label={`Go to video ${i + 1}`}
            className={`w-2.5 h-2.5 rounded-full ${i === currentIndex ? "bg-indigo-600" : "bg-gray-300 hover:bg-gray-400"}`}
          />
        ))}
      </div>

      {/* Up Next row (kept) */}
      <div className="w-full max-w-5xl mt-6 grid grid-cols-2 gap-3">
        <div
          onClick={handlePrev}
          className="cursor-pointer flex items-center gap-3 p-3 rounded-xl border bg-white hover:bg-gray-50"
          title="Previous"
        >
          <img src={videos[prevIndex].thumb} alt="" className="w-16 h-10 object-cover rounded" />
          <div className="text-sm">
            <div className="text-gray-500">Previous</div>
            <div className="font-medium line-clamp-1">{videos[prevIndex].title}</div>
          </div>
        </div>
        <div
          onClick={handleNext}
          className="cursor-pointer flex items-center gap-3 p-3 rounded-xl border bg-white hover:bg-gray-50"
          title="Next"
        >
          <img src={videos[nextIndex].thumb} alt="" className="w-16 h-10 object-cover rounded" />
          <div className="text-sm">
            <div className="text-gray-500">Next</div>
            <div className="font-medium line-clamp-1">{videos[nextIndex].title}</div>
          </div>
        </div>
      </div>

      {/* NOTE: Thumbnail strip removed on purpose per your request */}
    </div>
  );
};

export default VideoSwiper;
