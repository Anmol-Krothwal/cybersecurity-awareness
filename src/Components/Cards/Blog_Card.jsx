const Blog_Card = () => {
    return <>
        <div className="h-full rounded-lg grid grid-rows-6 overflow-hidden boxShadow1">
            <div className="h-[12rem] row-span-3 bg-green-50 relative overflow-hidden">
                <img src={`/assets/Image/Footer1.jpeg`} alt="tourImg" className="h-full w-full object-cover hover:scale-125 transition-all duration-300" />
            </div>
            <div className="row-span-3 flex flex-col justify-between bg-white p-4">
                <div className="font-Mukta font-bold text-2xl tracking-wide mb-1">Exciting Discoveries And Adventures</div>
                <div className="font-sans text-sm mb-2">Everything was seamless. The private guides were interesting and...</div>
                <div className="flex justify-between items-end">
                    <span className="px-[1.2rem] py-[0.5rem] gradOrange text-white font-semibold rounded-sm text-sm cursor-pointer">Read More</span>
                </div>
            </div>
        </div>
    </>
}

export default Blog_Card;