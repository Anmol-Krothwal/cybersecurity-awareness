import whyus_card1 from "../assets/Image/whyus_card1.jpeg";
import whyus_card2 from "../assets/Image/whyus_card2.jpeg"
import whyus_card3 from "../assets/Image/whyus_card3.jpeg"
import whyus_card4 from "../assets/Image/whyus_card4.jpeg";

const WhyUs = () => {
    return <>
        <div className="w-full p-[3rem] centerCW">
            <div className="setAllura font-Allura">We care about your happiness</div>
            <div className="setMukta font-Mukta mb-[3rem]">WHY TRAVEL WITH TRAVELLIO?</div>
            <div className="w-full grid grid-cols-4 gap-x-[1rem]">
                <div className="card_outerdiv boxShadow1">
                    <div className="max-h-[9.5rem]">
                        <img src={whyus_card1} alt="card" className="w-full h-full object-cover" />
                    </div>
                    <div className="text-xl font-bold font-Mukta px-[1rem] py-[2rem] leading-8"><p className="text-center">2000+ Our Worldwide Guide</p></div>
                </div>
                <div className="card_outerdiv boxShadow1">
                    <div className="max-h-[9.5rem]">
                        <img src={whyus_card2} alt="card" className="w-full h-full object-cover" />
                    </div>
                    <div className="text-xl font-bold font-Mukta px-[1rem] py-[2rem] leading-8"><p className="text-center">100% Trusted Tour Agency</p></div>
                </div>
                <div className="card_outerdiv boxShadow1">
                    <div className="max-h-[9.5rem]">
                        <img src={whyus_card3} alt="card" className="w-full h-full object-cover" />
                    </div>
                    <div className="text-xl font-bold font-Mukta px-[1rem] py-[2rem] leading-8"><p className="text-center">12+ Years Of Travel Experience</p></div>
                </div>
                <div className="card_outerdiv boxShadow1">
                    <div className="max-h-[9.5rem]">
                        <img src={whyus_card4} alt="card" className="w-full h-full object-cover" />
                    </div>
                    <div className="text-xl font-bold font-Mukta px-[1rem] py-[2rem] leading-8"><p className="text-center">98% Our Travelers Are Happy</p></div>
                </div>
            </div>
        </div>
    </>
}
export default WhyUs;