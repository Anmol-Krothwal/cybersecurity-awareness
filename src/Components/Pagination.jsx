import { useState } from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";

const Pagination = ({ totalPages, currentPage, onPageChange }) => {
    const [page, setPage] = useState(currentPage);

    const handlePrev = () => {
        if (page > 1) {
            setPage(page - 1);
            onPageChange(page - 1);
        }
    };

    const handleNext = () => {
        if (page < totalPages) {
            setPage(page + 1);
            onPageChange(page + 1);
        }
    };

    return <div className="flex items-center gap-2 my-6">
        <button
            onClick={handlePrev}
            disabled={page === 1}
            className="px-1 py-2 rounded-lg bg-gray-200 disabled:opacity-50"
        >
            <FaAngleLeft />
        </button>
        <div className="flex gap-1">
            {Array.from({ length: totalPages }, (_, index) => (
                <button
                    key={index + 1}
                    onClick={() => {
                        setPage(index + 1);
                        onPageChange(index + 1);
                    }}
                    className={`px-2 py-1 rounded-lg text-[0.8rem] ${page === index + 1
                            ? "bg-[#fa6741] text-white"
                            : "bg-gray-200 hover:bg-gray-300"
                        }`}
                >
                    {index + 1}
                </button>
            ))}
        </div>
        <button
            onClick={handleNext}
            disabled={page === totalPages}
            className="px-1 py-2 rounded-lg bg-gray-200 disabled:opacity-50"
        >
            <FaAngleRight />
        </button>
    </div>
}

export default Pagination;