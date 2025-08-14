import React, { useState, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/effect-fade";
import "swiper/css/pagination";
import { BsArrowRightShort, BsArrowLeftShort } from "react-icons/bs";
import { Navigation, EffectFade, Pagination } from "swiper/modules";
import "animate.css";

export default function Swiper1() {
  const [activeSlide, setActiveSlide] = useState(null);

  // ✅ New: refs for arrows
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  const slides = [
  {
    id: 1,
    img: "/assets/Image/E1.png",
    title: "AI-Powered Malware Evades Endpoint Detection",
    tag: "Malware Innovation",
    description:
      "Security researchers have uncovered a new strain of malware, 'ShadowMind', that uses AI models to dynamically rewrite its code in real-time, evading traditional antivirus and EDR (Endpoint Detection and Response) solutions. The malware was first spotted in targeted attacks against cybersecurity firms, where it analyzed the detection rules of the host system and modified its payload accordingly before execution. By leveraging a locally stored machine learning model, ShadowMind predicts which malicious indicators to suppress or obfuscate. This adaptive capability makes signature-based detection almost useless. Experts are now calling for behavioral AI models in defense tools that can anticipate and detect evolving threats. Organizations are being urged to adopt zero-trust endpoint policies, implement strict application whitelisting, and regularly monitor for anomalous system behavior."
  },
  {
    id: 2,
    img: "/assets/Image/E2.png",
    title: "Quantum-Resistant Ransomware Hits Financial Sector",
    tag: "Encryption Threat",
    description:
      "A ransomware group known as 'QCipher' has launched attacks using encryption algorithms designed to be resistant to quantum decryption methods, making recovery without the attacker’s key virtually impossible. The group specifically targeted banks and fintech startups, encrypting critical transaction data and demanding multimillion-dollar payments in Monero. The ransomware uses a hybrid encryption model combining lattice-based cryptography with AES-256, effectively future-proofing the attack against post-quantum cryptanalysis. Cybersecurity analysts warn this could be the beginning of a 'quantum arms race' in ransomware, where attackers adopt next-gen encryption faster than defenders can adapt. The financial sector is being urged to upgrade incident response plans, invest in quantum-safe backup systems, and collaborate with government agencies on post-quantum readiness."
  },
  {
    id: 3,
    img: "/assets/Image/E3.png",
    title: "Dark Web Marketplace Selling Zero-Day Exploits as Subscription Service",
    tag: "Exploit Economy",
    description:
      "A notorious dark web forum has launched a 'Zero-Day-as-a-Service' model, offering subscribers monthly access to freshly discovered vulnerabilities in popular software and cloud platforms. For a fee starting at $5,000/month, customers receive exploit kits, proof-of-concept code, and step-by-step attack guides. The marketplace operators claim their zero-days are sourced from private research teams and state-affiliated hackers, with high-profile exploits against VPN appliances, email servers, and industrial control systems. Security experts are concerned this model could democratize access to elite-level cyberweapons, accelerating the spread of advanced threats beyond nation-states. Defenders are being urged to prioritize patch management, adopt continuous vulnerability scanning, and subscribe to threat intelligence feeds that track exploit development in underground markets."
  }
];


  return (
    <div className="relative w-full mt-5 px-4 pb-5">
      <div className="relative max-w-[90%] mx-auto h-[70vh] md:h-[65vh] sm:h-[60vh] min-h-[420px] overflow-hidden rounded-2xl border border-white/10 shadow-[0_10px_40px_rgba(0,0,0,0.45)]">
        <Swiper
          navigation={{
            // ✅ point navigation to the refs
            nextEl: nextRef.current,
            prevEl: prevRef.current,
          }}
          onBeforeInit={(swiper) => {
            // ✅ ensure Swiper binds after refs exist
            swiper.params.navigation.prevEl = prevRef.current;
            swiper.params.navigation.nextEl = nextRef.current;
          }}
          pagination={{
            clickable: true,
            bulletClass: "custom-bullet",
            bulletActiveClass: "custom-bullet-active",
          }}
          slidesPerView={1}
          loop={true}
          effect="fade"
          modules={[Navigation, EffectFade, Pagination]}
        >
          {/* Navigation Arrows (unchanged styles) */}
          <button
            ref={prevRef}
            aria-label="Previous slide"
            className="my-prev-button absolute z-50 top-1/2 left-4 -translate-y-1/2 cursor-pointer text-white text-4xl bg-neutral-900/60 p-2 rounded-full border border-white/20 backdrop-blur hover:bg-neutral-900/80 hover:scale-105 transition"
          >
            <BsArrowLeftShort />
          </button>
          <button
            ref={nextRef}
            aria-label="Next slide"
            className="my-next-button absolute z-50 top-1/2 right-4 -translate-y-1/2 cursor-pointer text-white text-4xl bg-neutral-900/60 p-2 rounded-full border border-white/20 backdrop-blur hover:bg-neutral-900/80 hover:scale-105 transition"
          >
            <BsArrowRightShort />
          </button>

          {/* Slides */}
          {slides.map((slide, index) => (
            <SwiperSlide key={slide.id}>
              <div className="relative w-full h-[70vh] md:h-[65vh] sm:h-[60vh] min-h-[420px]">
                <img
                  src={slide.img}
                  alt={`Slide ${index + 1}`}
                  loading="lazy"
                  className="w-full h-full object-cover object-center"
                />

                {/* Cyber glass overlay + vignette */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/70" />
                <div className="pointer-events-none absolute inset-0 ring-1 ring-white/10 rounded-2xl" />

                {/* Caption card */}
                <div className="absolute bottom-8 left-8 right-8 md:left-10 md:right-auto max-w-2xl text-white z-20 animate__animated animate__fadeInUp">
                  <span className="inline-block text-xs tracking-wider uppercase px-3 py-1 rounded-full bg-cyan-400/15 border border-cyan-400/30 text-cyan-200 mb-3 backdrop-blur">
                    {slide.tag}
                  </span>
                  <h2 className="text-2xl md:text-4xl font-bold leading-tight drop-shadow mb-3">
                    {slide.title}
                  </h2>

                  <button
                    onClick={() => setActiveSlide(slide)}
                    className="inline-flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-fuchsia-500 hover:from-cyan-400 hover:to-fuchsia-400 px-5 py-2 rounded-full text-sm md:text-base font-semibold shadow-lg shadow-cyan-500/20 transition-transform hover:scale-[1.03] focus:outline-none focus:ring-2 focus:ring-cyan-400/60"
                  >
                    LEARN MORE
                    <BsArrowRightShort className="text-xl" />
                  </button>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Custom Dots Styling (unchanged) */}
        <style>{`
          .custom-bullet {
            background: linear-gradient(90deg, rgba(148,163,184,0.6), rgba(148,163,184,0.3));
            width: 12px;
            height: 12px;
            margin: 0 6px;
            border-radius: 9999px;
            display: inline-block;
            border: 1px solid rgba(255,255,255,0.25);
            transition: transform 0.25s ease, background 0.25s ease, box-shadow 0.25s ease;
          }
          .custom-bullet:hover {
            transform: scale(1.15);
            box-shadow: 0 0 0 4px rgba(56,189,248,0.15);
          }
          .custom-bullet-active {
            background: linear-gradient(90deg, #22d3ee, #e879f9);
            transform: scale(1.3);
            box-shadow: 0 0 16px rgba(34,211,238,0.6);
          }
        `}</style>
      </div>

      {/* Popup Modal (unchanged) */}
      {activeSlide && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex justify-center items-center p-4">
          <div className="relative w-full max-w-3xl rounded-2xl border border-white/10 bg-neutral-950/95 text-slate-100 shadow-2xl animate__animated animate__fadeInDown">
            <button
              onClick={() => setActiveSlide(null)}
              aria-label="Close"
              className="absolute top-3 right-3 text-3xl text-slate-300 hover:text-white"
            >
              &times;
            </button>

            <div className="p-6 md:p-8">
              <img
                src={activeSlide.img}
                alt="popup"
                loading="lazy"
                className="rounded-xl w-full h-64 md:h-80 object-cover object-center mb-6 ring-1 ring-white/10"
              />
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
                {activeSlide.title}
              </h3>
              <p className="text-sm text-cyan-300 font-semibold mb-4">
                {activeSlide.tag}
              </p>
              <p className="text-base leading-relaxed text-slate-200">
                {activeSlide.description}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
