import Navbar from "../Components/Navbar";

const About_us = () => {
    return <>
        <div className="h-screen w-full">
            <Navbar />
            <div className="h-5/6 Tours_Banner flex flex-col justify-center items-center text-white mb-[3rem]">
                <div className="setAllura font-Allura text-white font-bold ">Journey of travellio</div>
                <div className="setMukta font-Mukta text-[6rem] font-bold">About Us</div>
            </div>
            <div className="w-full p-[3rem] flex">
                <div className="w-1/2">
                    <div className="setAllura font-Allura font-bold ">Take a tour</div>
                    <div className="setMukta font-Mukta text-[3rem] font-bold">Watch our Video</div>
                </div>
                <div className="w-1/2">2</div>
            </div>
        </div>
    </>
}
export default About_us;