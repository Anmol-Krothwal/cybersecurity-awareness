import Navbar from "../Components/Navbar";

const Contactus = () => {
    return <div className="h-screen w-full">
        <Navbar />
        <div className="h-4/6 Tours_Banner flex flex-col justify-center items-center text-white">
            <div className="setAllura font-Allura text-white font-bold ">Get intouch</div>
            <div className="setMukta font-Mukta text-[6rem] font-bold">Contact Us</div>
        </div>
        <div className="w-full flex">
            <div className="w-1/2 center">
                <div className="w-full centerCW p-[3rem]">
                    <div className="setAllura font-Allura text-2xl font-semibold">Leave a message</div>
                    <div className="setMukta font-Mukta text-3xl mb-[2rem]">Get In Touch</div>
                    <form className="w-full centerCW">
                        <div className="w-3/5 flex flex-col mb-2">
                            <label for="Cus_Name" className="mb-1">Name</label>
                            <input type="text" id="Cus_Name" className="p-1 w-full border border-[#6e6d6d92] rounded-sm"></input>
                        </div>
                        <div className="w-3/5 flex flex-col mb-2">
                            <label for="Cus_Email" className="mb-1">Email</label>
                            <input type="email" id="Cus_Email" className="p-1 w-full border border-[#6e6d6d92] rounded-sm"></input>
                        </div>
                        <div className="w-3/5 flex flex-col mb-2">
                            <label for="Cus_Phone" className="mb-1">Phone</label>
                            <input type="phone" id="Cus_Phone" className="p-1 w-full border border-[#6e6d6d92] rounded-sm"></input>
                        </div>
                        <div className="w-3/5 flex flex-col mb-2">
                            <label for="Cus_Message" className="mb-1">Message</label>
                            <input type="text" contentEditable={true} id="Cus_Message" className="p-1 w-full h-[5rem] border border-[#6e6d6d92] rounded-sm"></input>
                        </div>
                        <div className="my-2 bg-green-500 text-white font-medium px-4 py-1 rounded-md text-[0.9rem] cursor-pointer">Submit</div>
                    </form>
                </div>
            </div>
            <div className="w-1/2 p-[2rem]">
                <div className=" w-4/5 flex flex-col justify-center items-start mt-4 boxShadow2 p-4 rounded-lg">
                    <b>London Office</b>
                    <span>14 Tottenham Road, London, England</span>
                    <span>+1 212 425 8617</span>
                    <span>info@stepi128.com</span>
                </div>
                <div className="w-4/5 flex flex-col justify-center items-start mt-4 boxShadow2 p-4 rounded-lg">
                    <b>London Office</b>
                    <span>14 Tottenham Road, London, England</span>
                    <span>+1 212 425 8617</span>
                    <span>info@stepi128.com</span>
                </div>
                <div className="w-4/5 flex flex-col justify-center items-start mt-4 boxShadow2 p-4 rounded-lg">
                    <b>London Office</b>
                    <span>14 Tottenham Road, London, England</span>
                    <span>+1 212 425 8617</span>
                    <span>info@stepi128.com</span>
                </div>
            </div>
        </div>
    </div>
}

export default Contactus;