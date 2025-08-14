import React from "react";
import GameLogic from "../Components/GameLogic";
import NavbarPage from "../Components/NavbarPage";    // ✅ import your navbar
import FooterTeen from "../components/FooterTeen";     // ✅ import your footer

const FakeVsRealGame = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-100 to-green-50">
      <NavbarPage/>  {/* ✅ Top navbar */}

      <div className="flex-grow">
        <GameLogic />
      </div>

      <FooterTeen/>  {/* ✅ Footer at the bottom */}
    </div>
  );
};

export default FakeVsRealGame;
