import { useGetToursQuery } from "../Slice/apiSlice";
import Navbar from "../Components/Navbar";
import { formatDate } from "../utils/utils";
import { FaLocationDot, FaCalendarDays, FaFlag, FaUser } from "react-icons/fa6";
import { Link } from "react-router-dom";

const Tours = () => {
    const {
        data,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetToursQuery();
    let tourid = '5c88fa8cf4afda39709c2951';
    //console.log(data, isLoading, isSuccess, isError, error);
    return <div className="h-screen w-full">
        <Navbar />
        <div className="h-5/6 Tours_Banner flex flex-col justify-center items-center text-white">
            <div className="setAllura font-Allura text-white font-bold ">All Tours for you</div>
            <div className="setMukta font-Mukta text-[6rem] font-bold">OUR TOURS</div>
        </div>
        <div className="w-full px-[3rem] center">
            <div className="bg-red-400 w-3/12">a</div>
            <div className="w-6/12 grid grid-flow-row-dense gap-y-2 rounded-sm ">
                {isLoading && <h2>...Loading</h2>}
                {isError && <h2>Something Went Wrong</h2>}
                {isSuccess &&
                    data.data.map((val, idx) => {
                        return <div key={idx} className="w-full h-[11rem] flex border border-[#a3a8a376] rounded-md overflow-hidden my-1 hover:scale-[1.03] transition-all duration-300 shadow-sm hover:shadow-md">
                            <div className="w-4/12 h-full bg-green-100">
                                <img src={`./tours/${val.images[0]}`} alt="img" className="h-full w-full object-cover" />
                            </div>
                            <div className="w-8/12 py-2 px-4 font-Mukta flex flex-col justify-evenly">
                                <div>
                                    <div className="font-semibold text-lg tracking-wide">{val.name}</div>
                                    <div className="flex justify-start items-end mb-2 -mt-1">
                                        <span className="px-1 py-[0.13rem] bg-green-600 font-semibold text-white text-[0.8rem] rounded-sm mr-1">{val.ratingsAverage}</span>
                                        <span className="text-[0.8rem] text-[#787879]">{val.ratingsQuantity} Reviews</span>
                                    </div>
                                </div>
                                <div className="font-sans text-[0.8rem] mb-1 leading-[.9rem]">{val.summary}</div>
                                <div className="grid grid-cols-2 px-8 text-[0.8rem]">
                                    <span className="flex justify-left items-center text-[#787879] font-semibold">
                                        <FaLocationDot className="mr-1s text-[0.7rem]" />
                                        {val.startLocation.description}
                                    </span>
                                    <span className="flex justify-left items-center text-[#787879] font-semibold">
                                        <FaCalendarDays className="mr-1 text-[0.7rem]" />
                                        {formatDate(val.startDates[0])}
                                    </span>
                                    <span className="flex justify-left items-center text-[#787879] font-semibold">
                                        <FaFlag className="mr-1 text-[0.7rem]" />{val.locations.length} Stops</span>
                                    <span className="flex justify-left items-center text-[#787879] font-semibold">
                                        <FaUser className="mr-1 text-[0.7rem]" />{val.maxGroupSize} People
                                    </span>
                                </div>
                                <div className="flex justify-between items-end">
                                    <div className="font-Mukta flex items-center">
                                        <span className="font-bold text-[#fc7c31] text-xl">${val.price}</span>
                                        <span className="text-[#787879] text-xs"> / Person</span>
                                    </div>
                                    <Link to={`/tours/${val._id}`} className="px-[1.2rem] py-[0.4rem] gradOrange text-white font-semibold rounded-sm text-sm cursor-pointer mr-4">Details</Link>
                                </div>
                            </div>
                        </div>
                    })
                }
            </div>
            <div className="bg-yellow-300 w-3/12">c</div>
        </div>
    </div>
}

export default Tours;