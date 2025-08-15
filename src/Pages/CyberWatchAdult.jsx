import React, { useState } from "react";
import newsData from "../Data/cyberNewsData";
import NewsCard from "../Components/NewsCard";
import FooterAdult from "../Components/FooterAdult";
import NavbarAdult from "../Components/NavbarAdult"; // ✅ Import Footer

const CyberWatch = () => {
  const [filter, setFilter] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [dateFilter, setDateFilter] = useState("");

  const categories = ["All", "Kids", "Adults", "Older Adults", "Cyber Enthusiasts"];

  const filteredNews = newsData.filter((n) => {
    const matchesCategory = filter === "All" || n.category === filter;
    const matchesSearch =
      n.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      n.summary.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDate = dateFilter === "" || new Date(n.date) >= new Date(dateFilter);

    return matchesCategory && matchesSearch && matchesDate;
  });

  return (
    <>
      <NavbarAdult />

      <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-300 px-4 py-10 pt-10">
        <h1 className="text-center text-5xl font-extrabold text-gray-800 mb-6 flex items-center justify-center gap-2">
          <span>🛡️</span> CyberWatch News
        </h1>

        {/* Search and Date Filter */}
        <div className="max-w-4xl mx-auto mb-6 flex flex-col md:flex-row gap-4 justify-center">
          <input
            type="text"
            placeholder="🔍 Search news..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-4 py-2  rounded-md border border-black-300 w-full md:w-1/2"
          />
          <input
            type="date"
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
            className="px-4 py-2 rounded-md border border-black-300 w-full md:w-1/3"
          />
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-4 py-2 rounded-full border-2 ${
                filter === cat
                  ? "bg-red-700 text-white"
                  : "text-red-700 border-red-500 bg-white"
              } transition-all font-semibold shadow hover:scale-105`}
            >
              {cat === "All"
                ? "All"
                : cat === "Kids"
                ? " Kids"
                : cat === "Adults"
                ? "Adults"
                : cat === "Older Adults"
                ? "Older Adults"
                : "Cyber Enthusiasts"}
            </button>
          ))}
        </div>

        {/* News Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 px-4 max-w-6xl mx-auto">
          {filteredNews.length > 0 ? (
            filteredNews.map((news, idx) => <NewsCard key={idx} {...news} />)
          ) : (
            <p className="text-center text-red-700 col-span-2">No matching news found.</p>
          )}
        </div>
      </div>
       {/* ✅ Footer */}
      <FooterAdult />
    </>
  );
};

export default CyberWatch;
