import { useState } from 'react';

const WhyUs = () => {
    const [index, setIndex] = useState(0);

    const visibleCards = 3;
    const cardWidth = 320; // Width in px per card
    const gap = 16;         // Tailwind spacing for gap-x

    const cards = [
        { img: '/assets/Image/whyus_card1.jpeg', text: 'Activity-1' },
        { img: '/assets/Image/whyus_card2.jpeg', text: 'Activity-2' },
        { img: '/assets/Image/whyus_card3.jpeg', text: 'Activity-3' },
        { img: '/assets/Image/whyus_card4.jpeg', text: 'Activity-4' },
        { img: '/assets/Image/whyus_card5.jpeg', text: 'Activity-5' },
        { img: '/assets/Image/whyus_card6.jpeg', text: 'Activity-6' },
        { img: '/assets/Image/whyus_card7.jpeg', text: 'Activity-7' },
        { img: '/assets/Image/whyus_card8.jpeg', text: 'Activity-8' },
        { img: '/assets/Image/whyus_card9.jpeg', text: 'Activity-9' },
        { img: '/assets/Image/whyus_card10.jpeg', text: 'Activity-10' },
    ];

    const maxIndex = cards.length - visibleCards;

    const handleScroll = (direction) => {
        if (direction === 'left') {
            setIndex((prev) => (prev === 0 ? maxIndex : prev - 1));
        } else {
            setIndex((prev) => (prev === maxIndex ? 0 : prev + 1));
        }
    };

    const handleCardClick = (card, i) => {
        alert(`Card clicked: ${card.text} (index ${i})`);
    };

    return (
        <div className="w-full p-[3rem] leftCW relative">
            
            <div className="setMukta font-Mukta mb-[1rem] text-left text-3xl">For Teenagers (Age 12-17)</div>

            <div className="relative w-full max-w-[1024px] mx-auto">
                {/* Arrows */}
                <button
                    onClick={() => handleScroll('left')}
                    className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white px-3 py-2 shadow-lg rounded-full text-xl font-normal hover:font-bold transition-all"
                >
                    &#8592;
                </button>

                <button
                    onClick={() => handleScroll('right')}
                    className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white px-3 py-2 shadow-lg rounded-full text-xl font-normal hover:font-bold transition-all"
                >
                    &#8594;
                </button>

                {/* Card Viewport */}
                <div
                    className="overflow-hidden w-full"
                    style={{
                        maxWidth: `${visibleCards * (cardWidth + gap)}px`,
                        margin: '0 auto',
                    }}
                >
                    {/* Card Row */}
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
                                className="cursor-pointer card_outerdiv boxShadow1 flex-shrink-0"
                                onClick={() => handleCardClick(card, i)}
                            >
                                <div className="max-h-[9.5rem]">
                                    <img src={card.img} alt={`card${i}`} className="w-full h-full object-cover" />
                                </div>
                                <div className="text-xl font-bold font-Mukta px-[1rem] py-[2rem] leading-8 text-center">
                                    {card.text}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WhyUs;
