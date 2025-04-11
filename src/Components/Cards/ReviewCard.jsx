
import { useState } from 'react';
import { FaQuoteLeft } from 'react-icons/fa';
import { FaStar, FaStarHalfAlt } from "react-icons/fa";


const ReviewCard = ({ review, rating, user }) => {
    const isDecimal = (num) => num % 1 !== 0;
    const [star, setStar] = useState(isDecimal(rating) ? Math.floor(rating) : rating)
    return <>
        <div className="bg-white shadow-md border rounded-lg p-4 flex flex-col gap-4">
            <FaQuoteLeft className="text-orange-500 text-2xl" />
            <p className="text-gray-700 text-sm">{review}</p>
            <div className="flex items-center justify-end mt-auto">
                <div className='flex flex-col items-end mx-2'>
                    <div className="text-sm font-semibold text-gray-800">{user.name}</div>
                    <span className='flex text-[#FFBF00]'>
                        {[...Array(star)].map((_, i) => (
                            <FaStar key={i} />
                        ))}
                        {
                            isDecimal(rating) ? <FaStarHalfAlt /> : ''
                        }
                    </span>
                </div>
                <img
                    src={`/assets/Image/users/${user.photo}`}
                    alt={user.name}
                    className="w-8 h-8 rounded-full object-cover"
                />
            </div>
        </div>
    </>
};

export default ReviewCard;