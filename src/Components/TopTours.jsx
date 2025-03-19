import Swiper2 from "../Crousels/Swiper2";
import { useGetTopToursQuery } from "../Slice/apiSlice"

const TopTours = () => {
    const {
        data,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetTopToursQuery();
    return <>
        <div className="w-full h-screen p-[3rem] centerCW">
            <div className="setAllura font-Allura">Travel far enough, meet yourself</div>
            <div className="setMukta font-Mukta mb-[2.5rem]">MOST POPULAR TOURS</div>
            <div className="w-full h-[70%]">
                {isLoading && <h2>...Loading</h2>}
                {isError && <h2>{error.error}</h2>}
                {isSuccess &&
                    <Swiper2 Cdata={data}/>
                }
            </div>
        </div>
    </>
}

export default TopTours;