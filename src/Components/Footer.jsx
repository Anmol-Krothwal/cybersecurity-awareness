import { MdLocationOn, MdPhone, MdMarkunread,MdFacebook } from "react-icons/md";
import { AiFillInstagram,AiOutlineTwitter,AiFillYoutube } from "react-icons/ai";

const Footer = () => {
    return <div className="bg-[#000000d7] p-[3rem]">
        <div className="w-full grid grid-cols-5">
            <div className="w-full col-span-2">
                <img src={`/assets/Image/Logo_Light.png`} alt="Logo" className="w-[35%] mb-6" />
                <div className="text-[#d9d9d9] pr-10 grid geid-cols-3">
                    <div className="flex mb-1 justify-start items-start">
                        <MdLocationOn className="text-[#fa6741] text-lg mr-1" />Grand Conference Hall - 881, 7th Ave New York, NY
                    </div>
                    <div className="flex mb-1 justify-start items-center">
                        <MdPhone className="text-[#fa6741] text-lg mr-1" />+1805430680
                    </div>
                    <div className="flex mb-1 justify-start items-center">
                        <MdMarkunread className="text-[#fa6741] text-lg mr-1" />info@travellio.com
                    </div>
                    <div className="flex mt-4">
                        <MdFacebook className="text-2xl mr-4"/>
                        <AiFillInstagram className="text-2xl mr-4"/>
                        <AiOutlineTwitter className="text-2xl mr-4"/>
                        <AiFillYoutube className="text-2xl mr-4"/>
                    </div>
                </div>
            </div>
            <div className=" text-[#d9d9d9] px-10 col-span-1">
                <div className="text-white text-lg font-medium mb-4">Quick Links</div>
                <ul>
                    <li className="mb-1 cursor-pointer hover:text-[#fa6741]">Home</li>
                    <li className="mb-1 cursor-pointer hover:text-[#fa6741]">Tours</li>
                    <li className="mb-1 cursor-pointer hover:text-[#fa6741]">Blogs</li>
                    <li className="mb-1 cursor-pointer hover:text-[#fa6741]">Contact us</li>
                </ul>
            </div>
            <div className="w-full text-[#d9d9d9] col-span-2 pl-10">
                <div className="text-white text-lg font-medium mb-4">All The Travel News..</div>
                <div className="w-full flex flex-col">
                    <div className="flex mb-4">
                        <img src={`/assets/Image/Footer1.jpeg`} alt="1" className="w-[20%] mr-2"/>
                        <div className="flex flex-col">
                            <div className="font-bold">Maldives -Your Personal Paradise</div>
                            <div className="text-sm">Everything was seamless. The private guides were interesting and...</div>
                        </div>
                    </div>
                    <div className="flex">
                        <img src={`/assets/Image/Footer2.jpeg`} alt="1" className="w-[20%] mr-2"/>
                        <div className="flex flex-col">
                            <div className="font-bold">Discovered Along The Way On Journey</div>
                            <div className="text-sm">Everything was seamless. The private guides were interesting and...</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className="mt-12 text-sm text-[#d9d9d9] center">© Travellio. All Rights Reserved 2023. Licensing</div>
    </div>
}
export default Footer;