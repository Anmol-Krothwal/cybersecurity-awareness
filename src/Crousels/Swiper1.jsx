import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/effect-fade";
import "swiper/css/pagination";
import { BsArrowRightShort, BsArrowLeftShort } from "react-icons/bs";
import { Navigation, Autoplay, EffectFade, Pagination } from "swiper/modules";
import { Link } from "react-router-dom";
import "animate.css";

export default function Swiper1() {
  const slides = [
    {
      id: 1,
      img: "/assets/Image/bankscam123.png",
      title: "AI Voice Cloning Used in £200,000 Bank Scam",
      tag: "Bank Scam",
    },
    {
      id: 2,
      img: "/assets/Image/bankscam12.png",
      title: "Dark Web Marketplace Dismantled in Global Crackdown",
      tag: "Cyberdown",
    },
    {
      id: 3,
      img: "/assets/Image/scam31.png",
      title: "Rogue Nation Behind Massive Data Breach",
      tag: "DataStrom",
    },
  ];

  return (
    <div className="relative w-full h-[90vh]">
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
        modules={[Navigation, Autoplay, EffectFade, Pagination]}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
      >
        {/* Navigation Arrows */}
        <div className="absolute z-50 top-1/2 left-4 transform -translate-y-1/2 cursor-pointer my-prev-button text-white text-4xl bg-black bg-opacity-40 p-2 hover:bg-opacity-60 transition">
          <BsArrowLeftShort />
        </div>
        <div className="absolute z-50 top-1/2 right-4 transform -translate-y-1/2 cursor-pointer my-next-button text-white text-4xl bg-black bg-opacity-40 p-2 hover:bg-opacity-60 transition">
          <BsArrowRightShort />
        </div>

        {/* Slides */}
        {slides.map((slide, index) => (
          <SwiperSlide key={slide.id}>
            <div className="relative w-full h-[90vh]">
              <img
                src={slide.img}
                alt={`Slide ${index + 1}`}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />

              <div className="absolute bottom-20 left-10 text-white z-20 animate__animated animate__fadeInUp">
                <h2 className="text-2xl md:text-4xl font-bold font-Mukta mb-2 animate__animated animate__fadeInDown">
                  {slide.title}
                </h2>
                <p className="text-base md:text-lg font-light mb-4">{slide.tag}</p>
                <Link
                  to={`/login`}
                  className="bg-[#fa6741] hover:bg-[#e15830] text-white px-5 py-2 rounded-full text-sm md:text-base shadow-md hover:scale-105 transition-all duration-300"
                >
                  READ MORE
                </Link>
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
  );
}
