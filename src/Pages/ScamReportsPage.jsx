import React, { useState } from "react";
import { Bar } from "react-chartjs-2";
import { Chart, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from "chart.js";
import { scamReports } from "../Data/scamReportsData"; 
import NavbarAdult from "../Components/NavbarAdult";
import FooterAdult from "../Components/FooterAdult";

Chart.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const ScamReportsPage = () => {
  const years = Object.keys(scamReports);
  const [selectedYear, setSelectedYear] = useState("2025");
  const [selectedMonth, setSelectedMonth] = useState(Object.keys(scamReports["2025"])[0]);
  const [formData, setFormData] = useState({ name: "", email: "", scamDetails: "" });

  const months = Object.keys(scamReports[selectedYear]);
  const reportData = scamReports[selectedYear][selectedMonth];

  const chartData = {
    labels: ["Phishing", "Investment", "Romance", "Others"],
    datasets: [
      {
        label: "% of Scam Types",
        data: Object.values(reportData.stats),
        backgroundColor: ["#f87171", "#fbbf24", "#34d399", "#60a5fa"]
      }
    ]
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("✅ Thank you! Your scam report has been submitted.");
    setFormData({ name: "", email: "", scamDetails: "" });
  };

  return (
    <>
        <NavbarAdult/>
    <div className="min-h-screen bg-gradient-to-br from-gray-200 to-gray-100 p-6 pb-16">
      <h1 className="text-4xl font-bold text-center text-orange-800 mb-6">📰 Monthly Scam Trend Reports</h1>

      <div className="flex flex-col lg:flex-row gap-8 max-w-6xl mx-auto">
        {/* Sidebar */}
        <div className="lg:w-1/3 bg-white rounded-xl shadow p-4">
          <label className="block mb-2 text-sm text-gray-600">Year:</label>
          <select
            value={selectedYear}
            onChange={(e) => {
              const year = e.target.value;
              setSelectedYear(year);
              setSelectedMonth(Object.keys(scamReports[year])[0]);
            }}
            className="w-full p-2 mb-4 border rounded border-orange-300"
          >
            {years.map((year) => (
              <option key={year}>{year}</option>
            ))}
          </select>

          <label className="block mb-2 text-sm text-gray-600">Month:</label>
          <div className="h-64 overflow-y-auto space-y-2 pr-2">
            {months.map((month) => (
              <button
                key={month}
                onClick={() => setSelectedMonth(month)}
                className={`block w-full text-left px-4 py-2 rounded hover:bg-orange-100 ${
                  month === selectedMonth ? "bg-orange-300 font-semibold" : ""
                }`}
              >
                {month}
              </button>
            ))}
          </div>
        </div>

        {/* Report Section */}
        <div className="lg:w-2/3">
          <div className="bg-white rounded-xl shadow p-6 mb-6">
            <h2 className="text-xl font-bold text-orange-700 mb-4">📅 {selectedMonth} {selectedYear} Reports</h2>
            {reportData.entries.length ? (
              <ul className="space-y-4">
                {reportData.entries.map((entry, index) => (
                  <li key={index}>
                    <h3 className="font-semibold text-lg">{entry.title}</h3>
                    <p className="text-gray-700">{entry.description}</p>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No scam entries found.</p>
            )}

            <a
              href={reportData.pdfLink}
              download
              className="mt-6 inline-block bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              📄 Download PDF Report
            </a>
          </div>

          {/* Chart */}
          <div className="bg-white rounded-xl shadow p-6 mb-6">
            <h3 className="text-lg font-semibold text-orange-700 mb-2">📊 Scam Type Breakdown</h3>
            <Bar data={chartData} />
          </div>

          {/* Report a Scam */}
          
        </div>
      </div>

    
    </div>
    <FooterAdult/>
      </>
  );
};

export default ScamReportsPage;
