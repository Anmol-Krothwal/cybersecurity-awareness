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
    { img: '/assets/Image/teenscover/thumb9.png', title: "🛍️ Marketplace Scam Test ", desc: '"View real vs scam listings side-by-side from platforms students commonly use. Learn how to spot fake profiles, shady payment methods, and suspicious offers in seconds."', hover: 'hover:border-red-400 hover:bg-red-50' },
    { img: '/assets/Image/teenscover/thumb10.png', title: '🥷 Cyber Ninja Activity', desc: '"Play through fast-paced mini-games that test your cyber reflexes. Earn badges by avoiding phishing traps, securing passwords, and making smart online choices."', hover: 'hover:border-blue-400 hover:bg-blue-50' },
    { img: '/assets/Image/teenscover/thumb11.png', title: '🤖 Chatbot Mentor', desc: '"Your 24/7 cybersecurity companion. Ask any question—from “What is phishing?” to “Is this email safe?”—and get plain-language answers instantly from our AI mentor."', hover: 'hover:border-green-400 hover:bg-green-50' },
    { img: '/assets/Image/teenscover/thumb12.png', title: '🎥 Scenario Path', desc: '"Watch real-life inspired scam situations with branching paths. Choose what you would do next and see how your decisions lead to different outcomes—good or bad."', hover: 'hover:border-purple-400 hover:bg-purple-50' },
    { img: '/assets/Image/teenscover/thumb13.png', title: '🕵️ Phishing Text Analyzer', desc: '"Paste any suspicious text or message into the analyzer. It’ll highlight phishing red flags like fake URLs, emotional manipulation, and urgent calls to action."', hover: 'hover:border-yellow-400 hover:bg-yellow-50' },
    { img: '/assets/Image/teenscover/thumb14.png', title: '💸 Investment Scam Tester', desc: '"Judge whether investment ads are legit or fake using interactive prompts. Discover how scammers hook you with “guaranteed returns” and limited-time offers."', hover: 'hover:border-pink-400 hover:bg-pink-50' },
    { img: '/assets/Image/teenscover/thumb15.png', title: '📈 Monthly Scam Trend Reports', desc: '"Stay informed with monthly updates on the latest scam tactics targeting adults in the UK. Get curated alerts, expert tips, and prevention strategies you can trust."', hover: 'hover:border-green-400 hover:bg-green-50' },
    { img: '/assets/Image/teenscover/thumb16.png', title: '📄 CV Scam Detector', desc: '"🚧 Coming Soon – A smart tool to detect job and CV scams before you click "Apply." Perfect for students and job seekers navigating online applications."', hover: 'hover:border-orange-400 hover:bg-orange-50' },
    
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
        <h2 className="text-3xl font-bold font-Mukta mb-6">Cybersecurity Essentials for Adults (Ages 18–65)</h2>

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
                  <div className="absolute bottom-[160px] left-5 text-[0.7rem] bg-black text-white px-2 py-[2px] rounded opacity-80">
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
