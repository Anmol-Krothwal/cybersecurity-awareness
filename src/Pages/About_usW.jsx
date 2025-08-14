import NavbarPage from "../Components/Navbar";
import FooterTeen from "../components/FooterTeen";

const About_us = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 to-purple-100 text-gray-900">
      <NavbarPage />

      {/* 🔷 WELCOME HEADER – Dark background */}
      <section className="w-full pt-24 pb-10 px-6 md:px-16 lg:px-32 bg-gradient-to-b from-[#0b0c2a] to-[#1c1f3a] text-white">
        <h1 className="text-center text-5xl font-extrabold text-purple-400 mb-6 drop-shadow-md">
          👋 Welcome to Cyber Guide Hub!
        </h1>
        <p className="text-lg text-center max-w-3xl mx-auto font-medium">
          We are on a mission to help <strong className="text-[#fa6741]">everyone</strong> – kids, adults, and seniors – stay safe online. 🛡️
        </p>
      </section>

      {/* 🔷 MAIN CONTENT – Light background */}
      <section className="flex-grow px-6 md:px-16 lg:px-32 pt-12 pb-20">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          {/* Left */}
          <div>
            <h2 className="text-3xl font-bold text-blue-800 mb-4">🌟 What We Do</h2>
            <p className="text-lg leading-relaxed mb-4">
              Cyber Guide Hub offers games, stories, and challenges that teach you how to spot scams, protect your information, and be safe online — in a fun and easy way!
            </p>

            <h2 className="text-3xl font-bold text-blue-800 mb-4">👨‍👩‍👧 Who Is It For?</h2>
            <ul className="list-disc ml-6 space-y-2 text-lg">
              <li><strong>Kids (12–17):</strong> Learn through games and stories 🎮</li>
              <li><strong>Adults (18–65):</strong> Practice with real-world scenarios 💼</li>
              <li><strong>Older Adults (65+):</strong> Simple, step-by-step guidance 👵</li>
            </ul>
          </div>

          {/* Right */}
          <div className="flex justify-center">
            <img
              src="/assets/Image/aboutus1.png"
              alt="Cyber Safe Family"
              className="w-1/2 md:w-1/3 lg:w-2/4 rounded-xl shadow-lg"
            />
          </div>
        </div>

        

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <h2 className="text-3xl font-bold text-green-700 mb-2">🦸‍♀️ Become a Cyber Hero Today!</h2>
          <p className="text-lg mb-4">Explore our activities and build your online safety skills now!</p>
          <a
            href="/"
            className="inline-block bg-purple-600 text-white px-6 py-3 rounded-full text-lg hover:bg-purple-700 transition duration-300"
          >
            Go to Home Page
          </a>
        </div>
      </section>

      <FooterTeen />
    </div>
  );
};

export default About_us;
