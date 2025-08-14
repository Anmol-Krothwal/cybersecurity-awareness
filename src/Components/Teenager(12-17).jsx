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
    { img: '/assets/Image/teenscover/thumb1.png', title: "🔍'Who's the Scammer?' ", desc: '"Uncover the scammer by analyzing messages, actions, and digital behavior in a fun detective-style game. Build your scam-spotting skills and earn rewards as you progress!"', hover: 'hover:border-red-400 hover:bg-red-50' },
    { img: '/assets/Image/teenscover/thumb2.png', title: '📱 Scam Spotting Game', desc: '"Dive into realistic social media DMs on platforms like TikTok and Snapchat. Decide which messages are safe and which are scams—can you trust your instincts?"', hover: 'hover:border-blue-400 hover:bg-blue-50' },
    { img: '/assets/Image/teenscover/thumb3.png', title: '🕵️ Animation Videos', desc: '"Enjoy short, fun cartoons that explain phishing, impersonation, and online scams through stories teens can relate to. A perfect way to learn online safety the fun way!"', hover: 'hover:border-green-400 hover:bg-green-50' },
    { img: '/assets/Image/teenscover/thumb4.png', title: '🔐 Fake vs Real Profile Challenge', desc: '"Compare social media profiles and spot the red flags that expose fake accounts. Sharpen your eye for detail in this interactive game of digital deduction!"', hover: 'hover:border-purple-400 hover:bg-purple-50' },
    { img: '/assets/Image/teenscover/thumb5.png', title: '🎣 Report the Scammer Simulation', desc: '"Practice reporting scammers across platforms like Roblox, Discord, and gaming chats."', hover: 'hover:border-yellow-400 hover:bg-yellow-50' },
    { img: '/assets/Image/teenscover/thumb6.png', title: '🧩 Phishing Email Simulator', desc: '"Spot the difference between real and fake emails in this interactive challenge. Learn to identify phishing tactics like urgent language, strange links, and suspicious senders."', hover: 'hover:border-pink-400 hover:bg-pink-50' },
    { img: '/assets/Image/teenscover/thumb7.png', title: '📲 Cyber Truth or Dare Game', desc: '"Take on safe, digital dares and truths based on real-life cyber habits—like checking your privacy settings or reviewing old posts. A fun way to build safer online behavior!"', hover: 'hover:border-green-400 hover:bg-green-50' },
    { img: '/assets/Image/teenscover/thumb8.png', title: '⬇️ Reputation Rescue Lab', desc: '"Explore an overexposed online profile and remove risky personal details. Learn how to protect your digital footprint and build a safer online reputation."', hover: 'hover:border-orange-400 hover:bg-orange-50' },
    
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
        <h2 className="text-3xl font-bold font-Mukta mb-6">Cyber Safety for Teens (Ages 12–17)</h2>

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
