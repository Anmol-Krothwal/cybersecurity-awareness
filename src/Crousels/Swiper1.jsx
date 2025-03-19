import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/effect-fade";
import { BsArrowRightShort, BsArrowLeftShort } from "react-icons/bs";
import 'animate.css';

import bg_1 from "../assets/Image/bg_1.jpg";
import bg_2 from "../assets/Image/bg_2.jpg";
import bg_3 from "../assets/Image/bg_3.jpg";
import bg_cloud from "../assets/Image/bg_cloud.png";

// import required modules
import { Navigation, Autoplay, EffectFade } from "swiper/modules";

export default function Swiper1() {
    return (
        <>
            <Swiper
                navigation={{
                    nextEl: '.my-next-button',
                    prevEl: '.my-prev-button',
                }}
                slidesPerView={1}
                modules={[Navigation, Autoplay, EffectFade]}
                loop={true}
                effect={"fade"}
                autoplay={{
                    delay: 5000,
                    disableOnInteraction: false,
                }}
            >
                <div className="arrow_wrapper my-prev-button left_arrow_wrapper">
                    <BsArrowLeftShort />
                </div>
                <div className="arrow_wrapper my-next-button right_arrow_wrapper">
                    <BsArrowRightShort />
                </div>
                <SwiperSlide>
                    <div className="bg_imageWrapper">
                        <img src={bg_1} alt="bg_1" className="bg_image" />
                        <img src={bg_cloud} alt="bg_cloud" className="bg_cloud" />
                        <div className="bg_center">
                            <div className="bg_line animate__animated animate__slideInUp">Visit the beautiful landscapes</div>
                            <div className="bg_placeName">Norway</div>
                            <div className="bg_btn_lm animate__animated animate__slideInDown">READ MORE</div>
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="bg_imageWrapper">
                        <img src={bg_2} alt="bg_1" className="bg_image" />
                        <img src={bg_cloud} alt="bg_cloud" className="bg_cloud" />
                        <div className="bg_center">
                            <div className="bg_line animate__animated animate__slideInUp">Find the excitement wherever you go</div>
                            <div className="bg_placeName">Switzerland</div>
                            <div className="bg_btn_lm animate__animated animate__slideInDown">READ MORE</div>
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="bg_imageWrapper">
                        <img src={bg_3} alt="bg_1" className="bg_image" />
                        <img src={bg_cloud} alt="bg_cloud" className="bg_cloud" />
                        <div className="bg_center">
                            <div className="bg_line animate__animated animate__slideInUp">Find your perfect vacation</div>
                            <div className="bg_placeName">Salerno</div>
                            <div className="bg_btn_lm animate__animated animate__slideInDown">READ MORE</div>
                        </div>
                    </div>
                </SwiperSlide>
            </Swiper>
        </>
    );
}
