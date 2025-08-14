import Navbar from "../Components/Navbar";
import Swiper1 from "../Crousels/Swiper1";
import Teenager from "../Components/Teenager(12-17)";
import Adult from "../Components/Adult(18-65)";
import OlderAdult from "../Components/OlderAdult(65+)";
import CyberEnth from "../Components/CybersecurityEnthusiasts";
import Footer from "../Components/Footer";



const Home = () => {
    return <>
        <Navbar/>
        <Swiper1/>
        <Teenager/>
        <Adult/>
        <OlderAdult/>
        <CyberEnth/>
        <Footer/>
    </>
}

export default Home;