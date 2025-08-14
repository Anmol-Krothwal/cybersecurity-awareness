import React, { useState } from "react";
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

  const slides = [
    {
      id: 1,
      img: "/assets/Image/scam122.png",
      title: "Biometric ATM Hacked with Deepfake Fingerprint",
      tag: "Biometric Fraud",
      description: 
    "In a highly sophisticated cyberattack, hackers bypassed biometric authentication on ATMs using a 3D-printed deepfake fingerprint. The incident occurred across several banking branches in Eastern Europe, resulting in the theft of over €120,000. Investigators discovered the attackers had obtained leaked biometric templates from a third-party payroll database. They then used high-resolution resin printers and AI-generated fingerprint models to craft replicas. Once the scanner was tricked, the system granted full account access without the need for a PIN. Experts warn this could signal a new wave of biometric spoofing attacks, especially as more financial institutions adopt fingerprint and face recognition for secure logins. Banks are now being urged to implement liveness detection and multi-modal biometrics to counter such threats. The attack raises major concerns about the storage and reuse of biometric data, which—unlike passwords—cannot be changed once compromised."
    },
    {
      id: 2,
      img: "/assets/Image/scam214.png",
      title: "Smart Home Botnet Turns 50,000 Devices into DDoS Army",
        tag: "IoT Threat",
        description:
          "A new botnet dubbed 'HiveStorm' has infected over 50,000 smart home devices—including doorbells, cameras, fridges, and thermostats—and is being used to launch large-scale DDoS attacks on critical infrastructure. The malware spreads through poorly secured IoT firmware using hardcoded credentials and exploits outdated protocols like UPnP. Victims in the US and UK experienced major internet outages as HiveStorm targeted DNS servers and streaming platforms. Security researchers found the botnet communicates via encrypted peer-to-peer protocols, making takedown extremely difficult. What's alarming is that most users are unaware their devices are part of the botnet. The malware runs in the background without noticeably impacting performance, giving it stealth-like persistence. Manufacturers are under pressure to enforce better security standards, including mandatory firmware updates and unique device passwords. This incident highlights the growing threat of IoT insecurity in smart homes, especially as more appliances become internet-connected without adequate defense mechanisms."
    },
    {
      id: 3,
      img: "/assets/Image/scam215.png",
      title: "Gaming Discord Server Hijacked for Crypto Scams",
      tag: "Social Engineering",
      description:
        "Hackers took over a popular gaming community’s Discord server and used it to distribute fake crypto giveaways and phishing links. The server, with over 120,000 members, was compromised after a moderator clicked on a malicious browser plugin claiming to offer 'free Nitro'. Once inside, attackers disabled admin roles and changed announcement channels to promote fake airdrops for trending cryptocurrencies like Solana and Ethereum. Many members reported losing funds from connected wallets after clicking links to lookalike sites mimicking major exchanges. The attackers also used bots to auto-reply to skeptical comments, adding fake 'success stories' to lure more victims. Discord’s security team eventually froze the server, but damage had already been done. Experts recommend enabling 2FA, restricting admin role permissions, and regularly auditing connected third-party apps. This attack reflects a growing trend of threat actors targeting community trust in gaming and crypto groups to launch fast-moving, high-reward scams."
    },
  ];

  return (
    <div className="relative w-full mt-5 px-4 pb-5">
      <div className="relative max-w-[90%] mx-auto h-[70vh] md:h-[65vh] sm:h-[60vh] min-h-[400px] overflow-hidden shadow-lg">
        <Swiper
          navigation={{
            nextEl: ".my-next-button",
            prevEl: ".my-prev-button",
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
          {/* Navigation Arrows */}
          <div className="absolute z-50 top-1/2 left-4 transform -translate-y-1/2 cursor-pointer my-prev-button text-white text-4xl bg-black bg-opacity-40 p-2 hover:bg-opacity-60 transition rounded-full">
            <BsArrowLeftShort />
          </div>
          <div className="absolute z-50 top-1/2 right-4 transform -translate-y-1/2 cursor-pointer my-next-button text-white text-4xl bg-black bg-opacity-40 p-2 hover:bg-opacity-60 transition rounded-full">
            <BsArrowRightShort />
          </div>

          {/* Slides */}
          {slides.map((slide, index) => (
            <SwiperSlide key={slide.id}>
              <div className="relative w-full h-[70vh] md:h-[65vh] sm:h-[60vh] min-h-[400px]">
                <img
                  src={slide.img}
                  alt={`Slide ${index + 1}`}
                  className="w-full h-full object-cover "
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />

                <div className="absolute bottom-16 left-10 text-white z-20 animate__animated animate__fadeInUp">
                  <h2 className="text-2xl md:text-4xl font-bold mb-2 animate__animated animate__fadeInDown">
                    {slide.title}
                  </h2>
                  <p className="text-base md:text-lg font-light mb-4">
                    {slide.tag}
                  </p>
                  <button
                    onClick={() => setActiveSlide(slide)}
                    className="bg-[#fa6741] hover:bg-[#e15830] text-white px-5 py-2 rounded-full text-sm md:text-base shadow-md hover:scale-105 transition-all duration-300"
                  >
                    LEARN MORE
                  </button>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Custom Dots Styling */}
        <style>
          {`
            .custom-bullet {
              background-color: #ccc;
              width: 12px;
              height: 12px;
              margin: 0 6px;
              border-radius: 9999px;
              display: inline-block;
              transition: background-color 0.3s ease, transform 0.3s ease;
            }
            .custom-bullet-active {
              background-color: #fa6741;
              transform: scale(1.3);
            }
          `}
        </style>
      </div>

      {/* Popup Modal */}
      {activeSlide && (
  <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center">
    <div className="bg-white rounded-xl max-w-2xl w-full p-8 relative shadow-xl animate__animated animate__fadeInDown">
      <button
        onClick={() => setActiveSlide(null)}
        className="absolute top-2 right-3 text-3xl text-gray-500 hover:text-gray-700"
      >
        &times;
      </button>
      <img
        src={activeSlide.img}
        alt="popup"
        className="rounded-lg w-full h-64 object-cover mb-6"
      />
      <h3 className="text-2xl font-bold text-gray-800 mb-2">
        {activeSlide.title}
      </h3>
      <p className="text-sm text-orange-600 font-semibold mb-3">
        {activeSlide.tag}
      </p>
      <p className="text-gray-700 text-base leading-relaxed">
        {activeSlide.description}
      </p>
    </div>
  </div>
)}

    </div>
  );
}
