import Navbar from "../Components/Navbar";
import Blog_Card from "../Components/Cards/Blog_Card";

const Blog = () => {
    let arr = [1, 2, 3, 4, 5, 6];
    return <>
        <div className="h-screen w-full">
            <Navbar />
            <div className="h-4/6 Tours_Banner flex flex-col justify-center items-center text-white">
                <div className="setAllura font-Allura text-white font-bold ">News from the world of tourism</div>
                <div className="setMukta font-Mukta text-[6rem] font-bold">Our Blog</div>
            </div>
            <div className="w-full p-[3rem] grid grid-cols-3 gap-5">
                {
                    arr.map((v, i) => {
                        return <Blog_Card key={i} />
                    })
                }
            </div>
        </div>
    </>
}
export default Blog;