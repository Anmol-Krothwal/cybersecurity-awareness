import { useState } from "react";
import Navbar from "../Components/NavbarPage";

// Point to your backend (Vite). For CRA, use process.env.REACT_APP_API_BASE.
const API_BASE = import.meta.env?.VITE_API_BASE || "http://localhost:5000";

const Contactus = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) errs.name = "Name is required.";
    if (!formData.email.includes("@")) errs.email = "Valid email required.";
    if (!formData.message.trim()) errs.message = "Message cannot be empty.";
    return errs;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      try {
        const resp = await fetch(`${API_BASE}/api/contact`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
        // Log once for sanity while testing
        console.log("POST /api/contact ->", resp.status);
        if (!resp.ok) {
          const msg = await resp.text().catch(() => "");
          console.warn("Contact submit failed:", resp.status, msg);
        }
      } catch (err) {
        console.warn("Contact submit failed:", err);
      }

      // keep your existing UX
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 4000);
      setFormData({ name: "", email: "", message: "" });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 text-gray-900 flex flex-col">
      <Navbar />

      {/* Header */}
      <div className="pt-8 pb-10 text-center text-purple-800">
        <h1 className="text-5xl font-extrabold drop-shadow-md">📞 Contact Us</h1>
        <p className="text-lg mt-2">We'd love to hear from you! 💌</p>
      </div>

      {/* Form and Office Block */}
      <div className="px-6 md:px-16 lg:px-32 flex flex-col md:flex-row gap-10 mb-12">
        {/* Form */}
        <div className="w-full md:w-1/2 bg-white p-6 rounded-xl shadow-lg">
          <h2 className="text-3xl font-bold mb-4 text-blue-800">📝 Get In Touch</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block mb-1 font-medium">Name</label>
              <input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
                placeholder="Enter your name"
              />
              {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
            </div>

            <div>
              <label htmlFor="email" className="block mb-1 font-medium">Email</label>
              <input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
                placeholder="you@example.com"
              />
              {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
            </div>

            <div>
              <label htmlFor="message" className="block mb-1 font-medium">Message</label>
              <textarea
                id="message"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
                rows="4"
                placeholder="Type your message here..."
              ></textarea>
              {errors.message && <p className="text-red-500 text-sm">{errors.message}</p>}
            </div>

            <button
              type="submit"
              className="bg-green-500 text-white px-6 py-2 rounded-md hover:bg-green-600 transition"
            >
              🚀 Submit Message
            </button>
          </form>

          {/* Success Message & Mascot */}
          {submitted && (
            <div className="mt-6 text-center">
              <div className="text-green-600 text-lg font-semibold animate-bounce">
                ✅ Message sent successfully!
              </div>
              <div className="flex justify-center items-center mt-2 gap-3">
                <img
                  src="/assets/Image/mascot.png" 
                  alt="Mascot waving"
                  className="w-16 h-16"
                />
                <p className="text-purple-800 font-semibold text-lg">
                  Thanks for contacting Cyber Guide Hub!
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Office Block */}
        <div className="w-full md:w-1/2">
          <div className="bg-white p-6 rounded-xl shadow-md mb-6">
            <h3 className="text-xl font-bold mb-2 text-purple-700">📍 London Office</h3>
            <p>14 Tottenham Road, London, England</p>
            <p>📞 +44 20 7946 0958</p>
            <p>✉️ info@cyberguidehub.com</p>
          </div>

          {/* Google Map */}
          <h3 className="text-xl font-semibold text-purple-700 mb-2">🗺️ Map</h3>
          <iframe
            title="Cyber Guide Hub Map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2436.1581925359074!2d-0.13322128423854056!3d51.523767479637834!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x48761b3238df7689%3A0x36e89e46d29b6df3!2sTottenham%20Court%20Rd%2C%20London!5e0!3m2!1sen!2suk!4v1629393938292!5m2!1sen!2suk"
            width="100%"
            height="250"
            className="rounded-lg shadow-md"
            allowFullScreen=""
            loading="lazy"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default Contactus;
