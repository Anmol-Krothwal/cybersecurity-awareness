import Blog_Card from "./Cards/Blog_Card.jsx";

const Blogs = () => {
    let arr = [1, 2, 3];
    return <div className="w-full h-screen relative p-[3rem]">
        <div className="centerCW mb-6">
            <div className="setAllura font-Allura">Keep Memories</div>
            <div className="setMukta font-Mukta">LATEST POSTS</div>
        </div>
        <div className="grid grid-cols-3 gap-5">
            {
                arr.map((v,i) => {
                    return <Blog_Card key={i}/>
                })
            }
        </div>
    </div>
}

export default Blogs;