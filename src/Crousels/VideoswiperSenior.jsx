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
      img: "/assets/Image/scam981.png",
       title: "Phone Call Impersonation Scam Targets Pensioners",
        tag: "Telephone Fraud",
         description:
        "A wave of fraudulent phone calls is targeting pensioners across the UK, with scammers pretending to be from trusted institutions like banks, the NHS, or government agencies. The callers often create a false sense of urgency, claiming there’s a problem with the victim’s bank account, medical records, or pension payments. Victims are then pressured to share sensitive information, transfer funds to a ‘safe account,’ or provide access to their devices. \n\nIn many cases, the scammers use caller ID spoofing to make it appear as though the call is coming from a genuine organisation. They also use personal details — such as full names, addresses, and even recent transactions — to appear more convincing. Authorities warn that these details are often obtained from previous data breaches or public records. \n\nSenior advocacy groups advise never to give out personal or banking information over the phone, to hang up immediately if suspicious, and to contact the real organisation directly using an official number. "
    },
    {
      id: 2,
      img: "/assets/Image/scam983.png",
     title: "Fake Home Repair Offers Rise After Storm Damage",
    tag: "Home Services Scam",
    description:
        "Following recent heavy storms and flooding, there has been a significant rise in fraudulent home repair offers targeting senior homeowners. Scammers pose as builders, roofers, or council-approved contractors, offering urgent repairs at discounted rates. They often pressure victims into making an immediate cash payment or bank transfer to ‘secure the booking’ and promise to start work within days. \n\nOnce payment is made, the scammers either vanish without doing the work or carry out poor-quality repairs using cheap materials. In some cases, they deliberately cause further damage to encourage more payments. Fraudsters have been known to use printed flyers, door-to-door visits, and even fake websites to appear legitimate. \n\nTrading Standards agencies recommend checking a contractor’s credentials, reading online reviews, and never paying in full upfront. Seniors are urged to involve family or friends when arranging repairs and to avoid letting unknown individuals into their homes. "
    },
    {
      id: 3,
      img: "/assets/Image/scam984.png",
      title: "Romance Scam Costs Widower £85,000 in Savings",
        tag: "Online Relationship Fraud",
        description:
            "A 68-year-old widower lost his entire life savings to a romance scam that began on a popular dating website. The scammer, posing as a retired nurse living abroad, spent months building trust through daily messages, phone calls, and even video chats using a deepfake face filter. The fraudster claimed to be relocating to the UK but encountered a series of ‘financial emergencies,’ including medical bills, legal fees, and shipping costs for personal belongings. \n\nThe victim made multiple transfers over a nine-month period, believing the money would be repaid once they were together. The scam came to light when the man’s daughter noticed unusual bank transactions and contacted the police. Investigators later confirmed that the scammer operated as part of an organised crime network using stolen photos and fake identities. \n\nAuthorities stress that scammers often target older adults due to perceived financial stability and emotional vulnerability. "
    },
  ];

  return (
    <div className="relative w-full mt-6 px-4 pb-6">
      <div className="relative max-w-[95%] mx-auto h-[70vh] min-h-[400px] overflow-hidden shadow-xl rounded-2xl">
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
          <div
            className="absolute z-50 top-1/2 left-3 transform -translate-y-1/2 cursor-pointer my-prev-button bg-white text-gray-800 p-3 rounded-full shadow-md hover:bg-gray-100"
            title="Previous"
            aria-label="Previous Slide"
          >
            <BsArrowLeftShort size={32} />
          </div>
          <div
            className="absolute z-50 top-1/2 right-3 transform -translate-y-1/2 cursor-pointer my-next-button bg-white text-gray-800 p-3 rounded-full shadow-md hover:bg-gray-100"
            title="Next"
            aria-label="Next Slide"
          >
            <BsArrowRightShort size={32} />
          </div>

          {/* Slides */}
          {slides.map((slide, index) => (
            <SwiperSlide key={slide.id}>
              <div className="relative w-full h-[70vh] min-h-[400px] rounded-xl overflow-hidden">
                <img
                  src={slide.img}
                  alt={slide.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />

                <div className="absolute bottom-12 left-8 text-white z-20 animate__animated animate__fadeInUp">
                  <h2 className="text-3xl md:text-4xl font-bold mb-3">
                    {slide.title}
                  </h2>
                  <p className="text-lg font-medium mb-5">{slide.tag}</p>
                  <button
                    onClick={() => setActiveSlide(slide)}
                    className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-full text-lg shadow-lg transition duration-300"
                    aria-label="Read full article"
                    title="Read full article"
                  >
                    Read Full Story
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
              width: 16px;
              height: 16px;
              margin: 0 8px;
              border-radius: 50%;
              display: inline-block;
              transition: background-color 0.3s ease, transform 0.3s ease;
            }
            .custom-bullet-active {
              background-color: #fa6741;
              transform: scale(1.5);
            }
          `}
        </style>
      </div>

      {/* Popup Modal */}
      {activeSlide && (
        <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center">
          <div className="bg-white rounded-xl max-w-2xl w-[90%] p-8 relative shadow-2xl animate__animated animate__fadeInDown">
            <button
              onClick={() => setActiveSlide(null)}
              className="absolute top-3 right-4 text-4xl text-gray-600 hover:text-black"
              title="Close article"
              aria-label="Close"
            >
              &times;
            </button>
            <img
              src={activeSlide.img}
              alt={`News image for ${activeSlide.title}`}
              className="rounded-xl w-full h-64 object-cover mb-6"
            />
            <h3 className="text-2xl font-bold text-gray-800 mb-3">
              {activeSlide.title}
            </h3>
            <p className="text-orange-600 font-semibold text-lg mb-3">
              {activeSlide.tag}
            </p>
            <p className="text-gray-700 text-lg leading-relaxed">
              {activeSlide.description}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
