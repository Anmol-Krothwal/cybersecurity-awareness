import { useGetToursQuery } from "../Slice/apiSlice";
import Navbar from "../Components/Navbar";
import { formatDate } from "../utils/utils";
import { FaLocationDot, FaCalendarDays, FaFlag, FaUser } from "react-icons/fa6";
import { Link } from "react-router-dom";
import Pagination from "../Components/Pagination";
import { useEffect, useState } from "react";

const Tours = () => {
    const [filter, setFilter] = useState({ page: 1 });
    const { duration, maxGroupSize, ratingsAverage, ...queryParams } = filter;
    const {
        data,
        isLoading,
        isSuccess,
        isError,
        refetch
    } = useGetToursQuery(queryParams);

    console.log(data);

    useEffect(() => {
        refetch()
    }, [filter])

    // Handle page change from the Pagination component
    const handlePageChange = (currentPage) => {
        setFilter({ ...filter, page: currentPage }); // Update the current 
        console.log(filter);
    };


    const handleFilterChange = (e) => {
        const { name, value } = e.target;

        let updatedFilter = { ...filter };

        if (name === 'sort') {
            updatedFilter.sort = value === 'priceAsc' ? 'price' : '-price';
        } else if (name === 'duration') {
            // Clear previous duration filters
            delete updatedFilter['duration[lt]'];
            delete updatedFilter['duration[gte]'];
            delete updatedFilter['duration[lte]'];
            delete updatedFilter['duration[gt]'];

            // Apply new duration filter
            if (value === 'short') {
                updatedFilter['duration[lt]'] = 3;
            } else if (value === 'medium') {
                updatedFilter['duration[gte]'] = 3;
                updatedFilter['duration[lte]'] = 7;
            } else if (value === 'long') {
                updatedFilter['duration[gt]'] = 7;
            }

            // Save selected value for UI checkbox tracking
            updatedFilter.duration = value;
        } else if (name === 'maxGroupSize') {
            delete updatedFilter['maxGroupSize[lt]'];
            delete updatedFilter['maxGroupSize[gte]'];
            delete updatedFilter['maxGroupSize[lte]'];
            delete updatedFilter['maxGroupSize[gt]'];

            if (value == 'small') {
                updatedFilter['maxGroupSize[lte]'] = 5;
            } else if (value == 'medium') {
                updatedFilter['maxGroupSize[gte]'] = 6;
                updatedFilter['maxGroupSize[lte]'] = 15;
            } else if (value == 'large') {
                updatedFilter['maxGroupSize[gte]'] = 16;
            }
            updatedFilter.maxGroupSize = value
        } else if (name == 'ratingsAverage') {
            delete updatedFilter['maxGroupSize[lt]'];
            delete updatedFilter['maxGroupSize[gte]'];
            delete updatedFilter['maxGroupSize[lte]'];
            delete updatedFilter['maxGroupSize[gt]'];

            if (value == '1') {
                updatedFilter['ratingsAverage[gte]'] = 1;
                updatedFilter['ratingsAverage[lt]'] = 2;
            } else if (value == '2') {
                updatedFilter['ratingsAverage[gte]'] = 2;
                updatedFilter['ratingsAverage[lt]'] = 3;
            } else if (value == '3') {
                updatedFilter['ratingsAverage[gte]'] = 3;
                updatedFilter['ratingsAverage[lt]'] = 4;
            } else if (value == '4') {
                updatedFilter['ratingsAverage[gte]'] = 4;
            }
            updatedFilter.ratingsAverage = value
        } else {
            updatedFilter[name] = value;
        }

        setFilter(updatedFilter);
    };

    return <div className="h-screen w-full">
        <Navbar />
        <div className="Tours_Banner centerCW text-white">
            <div className="setAllura font-Allura text-white font-bold ">All Tours for you</div>
            <div className="setMukta font-Mukta text-[6rem] font-bold">OUR TOURS</div>
        </div>
        <div className="w-full px-[6rem] my-4 grid grid-cols-8 gap-8 items-start">
            <div className="boxShadow1 border border-gray-200 rounded-md p-6 col-span-2 ">
                <div className="font-Mukta text-xl">Filter</div>
                <div className="p-4 space-y-6">

                    {/* Sort Filter */}
                    <div>
                        <div className="font-medium mb-2">Sort By</div>
                        <div className="flex flex-col gap-2">
                            {['priceAsc', 'priceDesc'].map((val) => (
                                <label key={val} className="inline-flex items-center space-x-2">
                                    <input
                                        type="checkbox"
                                        name="sort"
                                        value={val}
                                        checked={
                                            filter.sort === (val === 'priceAsc' ? 'price' : '-price')
                                        }
                                        onChange={handleFilterChange}
                                        className="accent-orange-600 cursor-pointer"
                                    />
                                    <span>
                                        {val === 'priceAsc'
                                            ? 'Price: Low to High'
                                            : 'Price: High to Low'}
                                    </span>
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Difficulty Filter */}
                    <div>
                        <div className="font-medium mb-2">Difficulty</div>
                        <div className="flex flex-col gap-2">
                            {['easy', 'medium', 'hard'].map((val) => (
                                <label key={val} className="inline-flex items-center space-x-2">
                                    <input
                                        type="checkbox"
                                        name="difficulty"
                                        value={val}
                                        checked={filter.difficulty === val}
                                        onChange={handleFilterChange}
                                        className="accent-orange-600 cursor-pointer"
                                    />
                                    <span className="capitalize">{val}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Duration Filter */}
                    <div>
                        <div className="font-medium mb-2">Duration</div>
                        <div className="flex flex-col gap-2">
                            {['short', 'medium', 'long'].map((val) => (
                                <label key={val} className="inline-flex items-center space-x-2">
                                    <input
                                        type="checkbox"
                                        name="duration"
                                        value={val}
                                        checked={filter.duration === val}
                                        onChange={handleFilterChange}
                                        className="accent-orange-600 cursor-pointer"
                                    />
                                    <span>
                                        {val === 'short'
                                            ? 'Less than 3 days'
                                            : val === 'medium'
                                                ? '3–7 days'
                                                : 'More than 7 days'}
                                    </span>
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Group Size Filter */}
                    <div>
                        <div className="font-medium mb-2">Group Size</div>
                        <div className="flex flex-col gap-2">
                            {['small', 'medium', 'large'].map((val) => (
                                <label key={val} className="inline-flex items-center space-x-2">
                                    <input
                                        type="checkbox"
                                        name="maxGroupSize"
                                        value={val}
                                        checked={filter.maxGroupSize === val}
                                        onChange={handleFilterChange}
                                        className="accent-orange-600 cursor-pointer"
                                    />
                                    <span>
                                        {val === 'small'
                                            ? '1–5'
                                            : val === 'medium'
                                                ? '6–15'
                                                : '16+'}
                                    </span>
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Rating Filter */}
                    <div>
                        <div className="font-medium mb-2">Rating</div>
                        <div className="flex flex-col gap-2">
                            {[4, 3, 2, 1].map((val) => (
                                <label key={val} className="inline-flex items-center space-x-2">
                                    <input
                                        type="checkbox"
                                        name="ratingsAverage"
                                        value={val}
                                        checked={filter.ratingsAverage === val.toString()}
                                        onChange={handleFilterChange}
                                        className="accent-orange-600 cursor-pointer"
                                    />
                                    <span>{val}{val == 4 && '+ '} Star{val > 1 && 's'}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                </div>
            </div>

            <div className="grid grid-flow-row-dense gap-y-2 rounded-sm col-span-4 center">
                {isLoading && <h2>...Loading</h2>}
                {isError && <h2>Something Went Wrong</h2>}
                {isSuccess && Array.isArray(data?.data) && data.data.length > 0 ? (
                    data.data.map((val, idx) => {
                        return <div key={idx} className="w-full h-[11rem] flex border border-[#a3a8a376] rounded-md overflow-hidden my-1 hover:scale-[1.03] transition-all duration-300 shadow-sm hover:shadow-md">
                            <div className="w-4/12 h-full bg-gray-100">
                                <img src={`/assets/Image/tours/${val.images[0]}`} alt="img" className="h-full w-full object-cover" />
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
                                    <Link to={`/tours/${val.id}`} className="px-[1.2rem] py-[0.4rem] gradOrange text-white font-semibold rounded-sm text-sm cursor-pointer mr-4">Details</Link>
                                </div>
                            </div>
                        </div>
                    })) : (
                    <div className="font-Mukta my-6 text-gray-600 text-lg text-center">
                        {data?.message ?? 'No tours found for the selected filters.'}
                    </div>
                )
                }
            </div>
            <div className="col-span-2">
                <div className="mb-6">
                    <img src={`/assets/Image/sample1.jpg`} alt="ad1"/>
                </div>
                <div className="my-6">
                    <img src={`/assets/Image/sample2.jpg`} alt="ad2"/>
                </div>
            </div>
        </div>
        <div className="centerCW" >
            {data && data.pagination.totalPages > 1 ? <Pagination totalPages={data.pagination.totalPages} currentPage={data.pagination.currentPage} onPageChange={handlePageChange} /> : ''}
        </div>
    </div>
}

export default Tours;