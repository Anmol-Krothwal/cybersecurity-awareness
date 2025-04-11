import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { A11y, Autoplay, Keyboard } from "swiper/modules";
import {formatDate} from "../utils/utils.js";
import { FaLocationDot, FaCalendarDays, FaFlag, FaUser } from "react-icons/fa6";

import "swiper/css";
import "swiper/css/a11y";
import "swiper/css/autoplay";
import "swiper/css/keyboard";

export default function Swiper2({Cdata}) {
    console.log("********************************");
    console.log(Cdata);
    console.log("********************************");
    const Data = [1, 2, 3, 4, 5];
    const swiperParameters = {
        modules: [A11y, Autoplay, Keyboard],
        threshold: 5,
        slidesPerView: 3,
        spaceBetween: 30,
        observer: true,
        observeParents: true,
        loop: true,
        watchSlidesProgress: true,
        autoplay: { disableOnInteraction: false, enabled: true },
        grabCursor: true,
        effect: "coverflow",
        speed: 600,
        centeredSlides: true,
        keyboard: { enabled: true },
    };
    return (
        <>
            <Swiper {...swiperParameters} className="h-full p-2">
                {Cdata.data.map((val,idx) => {
                    return <SwiperSlide key={idx}>
                        <div className="h-full rounded-lg grid grid-rows-6 overflow-hidden shadow-md">
                            <div className="row-span-3 bg-green-50 relative overflow-hidden">
                                <img src={`/assets/Image/tours/${val.images[0]}`} alt="tourImg" className="h-full w-full object-cover hover:scale-125 transition-all duration-300" />
                                <span className="absolute left-0 bottom-0 py-1 px-6 clip text-lg font-Mukta tracking-wide font-bold text-white">{val.name}</span>
                            </div>
                            <div className="row-span-3 flex flex-col justify-between bg-white p-4">
                                <div className="flex flex-cols justify-between">
                                    <div className="text-[0.8rem] flex justify-left items-center font-semibold border border-2 rounded-sm px-2">{val.duration} days tour</div>
                                    <span className="p-1 bg-blue-800 font-semibold text-white text-sm rounded-sm">{val.ratingsAverage}⭐</span>
                                </div>
                                <div className="font-sans text-sm mb-1">{val.summary}</div>
                                <div className="grid grid-cols-2 px-8">
                                    <span className="text-[0.8rem] flex justify-left items-center text-[#787879] font-semibold">
                                        <FaLocationDot className="mr-1s" />
                                    {val.startLocation.description}
                                    </span>
                                    <span className="text-[0.8rem] flex justify-left items-center text-[#787879] font-semibold">
                                        <FaCalendarDays className="mr-1" />
                                    {formatDate(val.startDates[0])}
                                    </span>
                                    <span className="text-[0.8rem] flex justify-left items-center text-[#787879] font-semibold">
                                        <FaFlag className="mr-1" />{val.locations.length} Stops</span>
                                    <span className="text-[0.8rem] flex justify-left items-center text-[#787879] font-semibold">
                                        <FaUser className="mr-1" />{val.maxGroupSize} People
                                    </span>
                                </div>
                                <div className="flex justify-between items-end">
                                    <div className="font-Mukta flex items-center">
                                        <span className="font-bold text-[#fc7c31] text-xl">${val.price}</span>
                                        <span className="text-[#787879] text-xs"> / Person</span>
                                    </div>
                                    <span className="px-[1.2rem] py-[0.4rem] gradOrange text-white font-semibold rounded-sm text-sm cursor-pointer">Details</span>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                })}
            </Swiper>
        </>
    );
}