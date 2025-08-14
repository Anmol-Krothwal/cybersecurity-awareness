import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSwipeable } from 'react-swipeable';
import 'animate.css';

const Teenager12to17 = () => {
  const [index, setIndex] = useState(0);
  const navigate = useNavigate();

  const visibleCards = 4;
  const cardWidth = 280;
  const gap = 16;

  const cards = [
    { img: '/assets/Image/teenscover/thumb24.png', title: "🧪 Website Exploitation Sandbox ", desc: '"Practice safe hacking in a controlled environment with dummy web apps like DVWA and Juice Shop. Try SQL injection, XSS, and CSRF attacks—no real-world risk involved."', hover: 'hover:border-red-400 hover:bg-red-50' },
    { img: '/assets/Image/teenscover/thumb25.png', title: '🌐 Network Reconnaissance Simulator', desc: '"Simulate scanning IPs, ports, and services using tools like Nmap and Nessus. See live results, learn what each output means, and build your recon skills safely."', hover: 'hover:border-blue-400 hover:bg-blue-50' },
    { img: '/assets/Image/teenscover/thumb26.png', title: '📡 Packet Sniffing Simulator', desc: '"Capture and analyze fake network traffic to uncover exposed credentials or PII. A visual tool that teaches you how sniffing attacks work—without real data risk."', hover: 'hover:border-green-400 hover:bg-green-50' },
    { img: '/assets/Image/teenscover/thumb27.png', title: '🔍 Forensic File Hunt', desc: '"Search through files with hidden clues like timestamps, hex dumps, and metadata. Connect the dots to trace how an attack unfolded in this investigative challenge."', hover: 'hover:border-purple-400 hover:bg-purple-50' },
    { img: '/assets/Image/teenscover/thumb28.png', title: '🔐 CryptoCrack Lab', desc: '"Crack hidden messages using ciphers like Caesar, Vigenère, Base64, and hash analysis. Solve each level by applying core cryptographic logic in a fun puzzle format."', hover: 'hover:border-yellow-400 hover:bg-yellow-50' },
    { img: '/assets/Image/teenscover/thumb29.png', title: '🧩 Malware Lab Escape Room', desc: '"Escape a virtual malware-infected lab by solving puzzles from fake logs, binaries, and encoded payloads. Each challenge teaches reverse engineering concepts step-by-step."', hover: 'hover:border-pink-400 hover:bg-pink-50' },
    { img: '/assets/Image/teenscover/thumb30.png', title: '📱 IoT Hacking Sandbox', desc: '"Explore a simulated smart home and find vulnerabilities in connected devices. Exploit weak passwords and misconfigurations in fake baby monitors, cameras, and thermostats."', hover: 'hover:border-green-400 hover:bg-green-50' },
    
  ];

  const maxIndex = cards.length - visibleCards;

    const handleScroll = (direction) => {
      if (direction === 'left') {
        setIndex(prev => Math.max(prev - 1, 0));
      } else if (direction === 'right') {
        setIndex(prev => Math.min(prev + 1, maxIndex-1));
      }
    };


    const handlers = useSwipeable({
      onSwipedLeft: () => {
        if (index < maxIndex - 1) handleScroll('right');
      },
      onSwipedRight: () => {
        if (index > 0) handleScroll('left');
      },
      preventScrollOnSwipe: true,
      trackMouse: true,
    });


  const handleCardClick = () => {
    navigate('/login');
  };

  return (
    <div className="w-full py-4 bg-white">
      <div className="max-w-[1920px] mx-auto px-6">
        <h2 className="text-3xl font-bold font-Mukta mb-6">HackSmart: Learn & Test Your Skills</h2>

        <div className="relative" {...handlers}>
          {/* Arrows (hide on mobile) */}
          <button
            onClick={() => handleScroll('left')}
            disabled={index === 0}
            className={`absolute left-0 top-1/2 -translate-y-1/2 z-10 px-3 py-2 bg-gray-100 text-xl font-bold rounded-full transition-all hover:bg-gray-200 hidden sm:block ${index === 0 ? 'opacity-30 cursor-not-allowed' : ''}`}
          >
            &#8592;
          </button>
          <button
            onClick={() => handleScroll('right')}
            disabled={index >= maxIndex - 1}
            className={`absolute right-0 top-1/2 -translate-y-1/2 z-10 px-3 py-2 bg-gray-100 text-xl font-bold rounded-full transition-all hover:bg-gray-200 hidden sm:block ${
              index >= maxIndex - 1 ? 'opacity-30 cursor-not-allowed' : ''
            }`}
          >
            &#8594;
          </button>

          {/* Card Slider */}
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-in-out gap-x-4"
              style={{
                transform: `translateX(-${index * (cardWidth + gap)}px)`,
                width: `${cards.length * (cardWidth + gap)}px`,
              }}
            >
              {cards.map((card, i) => (
                <div
                  key={i}
                  style={{ width: `${cardWidth}px` }}
                  className={`group cursor-pointer border border-gray-300 bg-white rounded-lg p-2 shadow-none transition relative ${card.hover}`}
                  onClick={handleCardClick}
                >
                  <div className="h-[10.5rem] overflow-hidden rounded-t-lg">
                    <img
                      src={card.img}
                      alt={card.title}
                      className="w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-100"
                    />
                  </div>
                  <div className="text-xl font-bold font-Mukta text-center mt-3">{card.title}</div>
                  <div className="text-sm text-gray-500 text-center">{card.desc}</div>

                  {/* Floating label */}
                  <div className="absolute bottom-[180px] left-5 text-[0.7rem] bg-black text-white px-2 py-[2px] rounded opacity-80">
                    Click to explore
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Slide Dots */}
          <div className="flex justify-center gap-2 mt-4">
            {Array.from({ length: maxIndex }).map((_, i) => (
              <div
                key={i}
                className={`w-3 h-3 rounded-full ${i === index ? 'bg-[#fa6741]' : 'bg-gray-300'} transition-all duration-300`}
              ></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Teenager12to17;
