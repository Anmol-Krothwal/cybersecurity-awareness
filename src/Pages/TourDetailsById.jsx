// TourDetailsById.jsx
import { useParams } from "react-router-dom";
import { useGetTourByIdQuery } from "../Slice/apiSlice";
import { IoLocationOutline } from "react-icons/io5";
import { FaCalendarAlt, FaChartLine, FaUsers, FaStar } from 'react-icons/fa';
import ReviewCard from "../Components/Cards/ReviewCard";
import { GoClock } from "react-icons/go";
import Navbar from "../Components/Navbar";

const TourDetailsById = () => {
    const { id } = useParams();

    const {
        data,
        isLoading,
        isError,
        error,
    } = useGetTourByIdQuery(id);

    console.log(data)
    if (isLoading) return <p>Loading...</p>;
    if (isError) return <p className="centerCW bg-green-500 text-white">Error: {error?.data?.message || "Something went wrong."}</p>;

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-GB', {
            day: '2-digit',
            month: 'long',
            year: 'numeric',
        }).replace(',', ''); // Optional: remove comma if present
    };

    return <div className="h-screen w-full">
        <Navbar />
        <div class="relative min-h-[450px] overflow-hidden">
            <div class="absolute inset-0 z-0 flex justify-center items-center">
                <img
                    src={`/assets/Image/tours/${data?.data?.imageCover}`}
                    alt="Banner"
                    class="max-w-none w-full h-auto object-contain"
                />
            </div>
            <div class="absolute inset-0 bg-gradient-to-b from-black/10 to-black/20 z-10"></div>
            <div class="absolute inset-0 bg-black/30 z-10"></div>
            <div class="absolute z-20 h-full w-full centerCW">
                <div className="setMukta font-Mukta text-[6rem] font-bold text-white">{data?.data?.name}</div>
                <div className="setAllura text-white font-Allura grid grid-cols-2 gap-2">
                    <div className="flex">
                        <GoClock /> {data.data.duration} days
                    </div>
                    <div className="flex ">
                        <IoLocationOutline /> {data.data.startLocation.description}
                    </div>
                </div>
            </div>
        </div>
        <div className="grid grid-cols-2 items-start">
            <div className="col-span-1 bg-[#f7f7f7] p-[6rem] grid grid-rows-2 gap-6">
                <div className="row-span-1">
                    <div className="heading-secondary mb-4">QUICK FACTS</div>
                    <div className="space-y-4">
                        <FactRow icon={<FaCalendarAlt className="text-[#fa6741] w-5 h-5" />} label="Next Date" value={formatDate(data.data.startDates[0])} />
                        <FactRow icon={<FaChartLine className="text-[#fa6741] w-5 h-5" />} label="Difficulty" value={data.data.difficulty} />
                        <FactRow icon={<FaUsers className="text-[#fa6741] w-5 h-5" />} label="Participants" value={data.data.maxGroupSize} />
                        <FactRow icon={<FaStar className="text-[#fa6741] w-5 h-5" />} label="Rating" value={`${data.data.ratingsAverage} / 5`} />
                    </div>
                </div>
                <div className="row-span-1">
                    <div className="heading-secondary mb-4">TOUR GUIDES</div>
                    <div className="space-y-4">
                        {
                            data.data.guides.map((val, idx) => {
                                return <GuideRow imgUrl={`/assets/Image/users/${val.photo}`} role={val.role} name={val.name} key={idx} />
                            })
                        }
                    </div>
                </div>
            </div>
            <div className="col-span-1 p-[6rem]">
                <div className="heading-secondary">ABOUT {data.data.name} TOUR</div>
                <div className="mt-4">{data.data.description}</div>
            </div>
        </div>
        <div className="grid grid-cols-3 h-[15rem] gap-1">
            {
                data.data.images.map((val, idx) => {
                    return <div className="h-full w-full" key={idx}>
                        <img src={`/assets/Image/tours/${val}`} alt="tour_img" className="h-full w-full object-cover" />
                    </div>
                })
            }
        </div>
        <div className="h-[30rem] bg-orange-100">MapBox</div>
        <div className="centerCW p-[3rem]">
            <div className="setMukta font-Mukta">THE TRUST WE'VE EARNED</div>
            <span className="setAllura font-Allura mb-[2.5rem]">{data.data.ratingsAverage} Ratings Out of 5</span>
            <div className={`
          grid gap-6
          ${data.data.tourReviews.length === 1 ? 'grid-cols-1' : ''}
          ${data.data.tourReviews.length === 2 ? 'grid-cols-1 sm:grid-cols-2' : ''}
          ${data.data.tourReviews.length === 3 ? 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3' : ''}
          ${data.data.tourReviews.length >= 4 ? 'grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3' : ''}
        `}
            >
                {data.data.tourReviews.map((review, index) => (
                    <ReviewCard key={index} {...review} />
                ))}
            </div>
        </div>
        <div className="w-full p-[3rem] centerCW bg-[#f7f7f7]">
            <div className="w-4/6 bg-red-100 bg-white boxShadow1 rounded-md grid grid-cols-[auto_auto_auto] gap-2 p-[2rem]">
                <div className="flex items-center">
                    {data.data.images.map((src, index) => (
                        <div
                            key={index}
                            className={`w-20 h-20 rounded-full border-4 border-white overflow-hidden shadow-md ${index !== 0 ? '-ml-14' : ''} transition-transform duration-300 hover:z-20`}>
                            <img src={`/assets/Image/tours/${src}`} alt={`circle-${index}`} className="w-full h-full object-cover" />
                        </div>
                    ))}
                </div>
                <div className="flex flex-col">
                    <div className="heading-secondary">What are you waiting for?</div>
                    <span>{`${data.data.duration} days. 1 adventure. Infinite Memories. Make it yours today! `}</span>
                </div>
                <div className="centerCW">
                    <button className="px-[2rem] py-[0.8rem] rounded-full text-white font-semibold bg-[#ff3427]">Book Now</button>
                </div>
            </div>
        </div>
    </div>
};

export default TourDetailsById;

const FactRow = ({ icon, label, value }) => (
    <div className="flex items-center space-x-3">
        {icon}
        <span className="font-semibold text-lg tracking-wide">{label.toUpperCase()}</span>
        <span className="text-gray-500">{value}</span>
    </div>
);

const GuideRow = ({ imgUrl, role, name }) => (
    <div className="flex items-center space-x-4">
        <img src={imgUrl} alt={name} className="w-10 h-10 rounded-full object-cover" />
        <div className="flex items-center space-x-3">
            <p className="text-sm font-semibold text-gray-700">{role}</p>
            <p className="text-gray-500">{name}</p>
        </div>
    </div>
);
