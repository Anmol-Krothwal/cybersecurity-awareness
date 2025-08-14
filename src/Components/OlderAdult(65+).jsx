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
    { img: '/assets/Image/teenscover/thumb17.png', title: "📧 Clickable Scam Email Samples ", desc: '"Explore realistic scam emails and click on highlighted elements to uncover suspicious signs. Learn to identify fake links, urgent language, and shady senders interactively."', hover: 'hover:border-red-400 hover:bg-red-50' },
    { img: '/assets/Image/teenscover/thumb18.png', title: '🧠 Scam Vocabulary Memory Game', desc: '"Match common scam-related terms with their definitions in this quick and fun memory game. A great way to reinforce cybersecurity vocabulary and awareness."', hover: 'hover:border-blue-400 hover:bg-blue-50' },
    { img: '/assets/Image/teenscover/thumb19.png', title: '☎️ Tech Support Scam Simulator', desc: '"Experience a simulated phone call with a fake "tech support agent." As the conversation unfolds, learn to spot social engineering tactics in real time."', hover: 'hover:border-green-400 hover:bg-green-50' },
    { img: '/assets/Image/teenscover/thumb20.png', title: '🎤 Personal Story Corner', desc: '"Watch heartfelt video interviews of older adults who were targeted by scams. Hear how they were deceived, what they learned, and how they recovered with support."', hover: 'hover:border-purple-400 hover:bg-purple-50' },
    { img: '/assets/Image/teenscover/thumb21.png', title: '📅 Live Webinar Alerts', desc: '"Sign up for email or SMS alerts to join monthly Zoom webinars hosted by digital safety experts. Includes live Q&A to get your questions answered directly."', hover: 'hover:border-yellow-400 hover:bg-yellow-50' },
    { img: '/assets/Image/teenscover/thumb22.png', title: '🎓 Safety Certificate Quiz', desc: '"Test your cybersecurity knowledge in a final quiz covering basic digital safety. Score 80% or more to receive a printable certificate of completion."', hover: 'hover:border-pink-400 hover:bg-pink-50' },
    { img: '/assets/Image/teenscover/thumb23.png', title: '🎬 Tutorial Videos', desc: '"Browse clear, slow-paced video guides that explain scams like fake emails and suspicious texts. Narrated in a friendly tone—ideal for older adults and beginners."', hover: 'hover:border-green-400 hover:bg-green-50' },
   
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
        <h2 className="text-3xl font-bold font-Mukta mb-6">Stay Safe Online (For Ages 65+)</h2>

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
