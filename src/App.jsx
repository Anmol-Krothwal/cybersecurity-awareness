
import Home from "./Pages/Home"
import Tours from "./Pages/Tours";
import TourDetailsById from "./Pages/TourDetailsById";
import Blog from "./Pages/Blog";
import Contactus from "./Pages/Contactus";
import About_us from "./Pages/About_us";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ForgotPassword from "./Pages/ForgotPassword";
import ResetPassword from "./Pages/ResetPassword";
import Login from "./Pages/Login";
import SignUp from "./Pages/SignUp";
import Profile from "./Pages/Profile";
import VideoPlayerPage from "./Pages/VideoPlayerPage";
import ScammerQuiz from "./Pages/ScammerQuiz/ScammerQuiz";
import ScammerSpotGame from "./Pages/ScammerSpotGame";
import FakeVsRealGame from "./Pages/FakeVsRealGame";
import ReportScammer from "./Pages/ReportScammer";
import TruthOrDareGame from "./Pages/TruthOrDareGame";
import TeensAct from "./Pages/TeensAct";
import CyberWatch from "./Pages/CyberWatch";
import ReputationRescueLab from "./Pages/ReputationRescueLab";
import About_usW from "./Pages/About_usW";
import ContactusW from "./Pages/ContactusW";
import PhishingGame from "./Pages/PhishingGame";
import AdultAct from "./Pages/AdultAct";
import MarketplaceScamTest from "./Pages/Adultpages/MarketplaceScamTest";
import CyberNinja from "./Pages/cyberninja";
import ChatbotMentor from "./Pages/ChatbotMentor";
import ScenarioVideos from "./Pages/ScenarioVideo";
import PhishingTextAnalyzer from "./Pages/PhishingTextAnalyzer";
import InvestmentScamTester from "./Pages/InvestmentScamTester";
import ScamReportsPage from "./Pages/ScamReportsPage";
import ScamEmailTrainer from "./Pages/ScamEmailTrainer";
import ScamMemoryGame from "./Pages/ScamMemoryGame";
import TechSupportScamSimulator from "./Pages/TechSupportScamSimulator";
import PersonalStoryCorner from "./Pages/PersonalStoryCorner";
import LiveWebinars from "./Pages/LiveWebinars";
import SafetyQuiz from "./Pages/SafetyQuiz";
import OlderAdultVideoGallery from "./Pages/OlderAdultVideoGallery";
import NetworkSimulator from "./Pages/NetworkSimulator";
import CyberEnthusiastSandbox from "./Pages/CyberEnthusiastSandbox";
import RedVsBlueGame from "./Pages/RedVsBlueGame";
import PacketSniffingSimulator from "./Pages/PacketSniffingSimulator";
import ForensicFileHunt from "./Pages/ForensicFileHunt";
import CryptoCrackLab from "./Pages/CryptoCrackLab";
import MalwareEscapeRoom from "./Pages/MalwareEscapeRoom";
import IoTHackingSandbox from "./Pages/IoTHackingSandbox";
import CyberWatchAdult from "./Pages/CyberWatchAdult";
import ContactusAdult from "./Pages/ContactusAdult";
import About_usAdult from "./Pages/About_usAdult";
import SeniorAct from "./Pages/SeniorAct";
import CyberWatchSenior from "./Pages/CyberWatchSenior";
import About_usSenior from "./Pages/About_usSenior";
import ContactusSenior from "./Pages/ContactusSenior";
import EnthusiastAct from "./Pages/EnthusiastAct";
import CyberWatchEnthusiast from "./Pages/CyberWatchEnthusiast";
import About_usEnthusiast from "./Pages/About_usEnthusiast";
import ContactusEnthusiast from "./Pages/ContactusEnthusiast";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/tours" element={<Tours />} />
        <Route path="/tours/:id" element={<TourDetailsById />} />
        <Route path="/Blogs" element={<Blog />} />
        <Route path="/contactus" element={<Contactus />} />
        <Route path="/aboutus" element={<About_us />} />
        <Route path="/forgotPassword" element={<ForgotPassword />} />
        <Route path="/resetPassword/:token" element={<ResetPassword />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/video-player" element={<VideoPlayerPage />} />
        <Route path="/quizscammer" element={<ScammerQuiz />} /> 
        <Route path="/scammerspotgame" element={<ScammerSpotGame />} />
        <Route path="/fake-vs-real" element={<FakeVsRealGame />} />
        <Route path="/Report-Scammer" element={<ReportScammer />} />
        <Route path="/Truth-Or-Dare-Game" element={<TruthOrDareGame />} />
        <Route path="/TeensAct" element={<TeensAct />} />
        <Route path="/cyberwatch" element={<CyberWatch />} />
        <Route path="/ReputationRescueLab" element={<ReputationRescueLab />} />
        <Route path="/About_usW" element={<About_usW />} />
        <Route path="/ContactusW" element={<ContactusW />} />
        <Route path="/PhishingGame" element={<PhishingGame />} />
        <Route path="/AdultAct" element={<AdultAct />} />
        <Route path="/MarketplaceScamTest" element={<MarketplaceScamTest />} />
        <Route path="/CyberNinja" element={<CyberNinja />} />
        <Route path="/ChatbotMentor" element={<ChatbotMentor />} />
        <Route path="/ScenarioVideos" element={<ScenarioVideos />} />
        <Route path="/PhishingTextAnalyzer" element={<PhishingTextAnalyzer/>} />
        <Route path="/InvestmentScamTester" element={<InvestmentScamTester/>} />
        <Route path="/ScamReportsPage" element={<ScamReportsPage/>} />
        <Route path="/ScamEmailTrainer" element={<ScamEmailTrainer/>} />
        <Route path="/ScamMemoryGame" element={<ScamMemoryGame/>} />
        <Route path="/TechSupportScamSimulator" element={<TechSupportScamSimulator/>} />
        <Route path="/PersonalStoryCorner" element={<PersonalStoryCorner/>} />
        <Route path="/LiveWebinars" element={<LiveWebinars/>} />
        <Route path="/SafetyQuiz" element={<SafetyQuiz/>} />
        <Route path="/OlderAdultVideoGallery" element={<OlderAdultVideoGallery/>} />
         <Route path="/NetworkSimulator" element={<NetworkSimulator/>} />
         <Route path="/CyberEnthusiastSandbox" element={<CyberEnthusiastSandbox/>} />
         <Route path="/RedVsBlueGame" element={<RedVsBlueGame/>} />
         <Route path="/PacketSniffingSimulator" element={<PacketSniffingSimulator/>} />
         <Route path="/ForensicFileHunt" element={<ForensicFileHunt/>} />
         <Route path="/CryptoCrackLab" element={<CryptoCrackLab/>} />
         <Route path="/MalwareEscapeRoom" element={<MalwareEscapeRoom/>} />
         <Route path="/IoTHackingSandbox" element={<IoTHackingSandbox/>} />
         <Route path="/CyberWatchAdult" element={<CyberWatchAdult/>} />
         <Route path="/ContactusAdult" element={<ContactusAdult/>} />
         <Route path="/About_usAdult" element={<About_usAdult/>} />
         <Route path="/SeniorAct" element={<SeniorAct/>} />
         <Route path="/CyberWatchSenior" element={<CyberWatchSenior/>} />
         <Route path="/About_usSenior" element={<About_usSenior/>} />
         <Route path="/ContactusSenior" element={<ContactusSenior/>} />
         <Route path="/EnthusiastAct" element={<EnthusiastAct/>} />
         <Route path="/CyberWatchEnthusiast" element={<CyberWatchEnthusiast/>} />
         <Route path="/About_usEnthusiast" element={<About_usEnthusiast/>} />
         <Route path="/ContactusEnthusiast" element={<ContactusEnthusiast/>} />

      </Routes>
    </BrowserRouter>
  );
};

export default App;