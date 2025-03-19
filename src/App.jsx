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

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}></Route>
        </Routes>
        <Routes>
          <Route path="/login" element={<Login />}></Route>
        </Routes>
        <Routes>
          <Route path="/signUp" element={<SignUp />}></Route>
        </Routes>
        <Routes>
          <Route path="/tours" element={<Tours />}></Route>
        </Routes>
        <Routes>
          <Route path="/tours/:tourid" element={<TourDetailsById />}></Route>
        </Routes>
        <Routes>
          <Route path="/Blogs" element={<Blog />}></Route>
        </Routes>
        <Routes>
          <Route path="/contactus" element={<Contactus />}></Route>
        </Routes>
        <Routes>
          <Route path="/aboutus" element={<About_us />}></Route>
        </Routes>
        <Routes>
          <Route path="/forgotPassword" element={<ForgotPassword />}></Route>
        </Routes>
        <Routes>
          <Route path="/resetPassword/:token" element={<ResetPassword />}></Route>
        </Routes>
        <Routes>
          <Route path="/profile" element={<Profile />}></Route>
        </Routes>
      </BrowserRouter>

    </>
  )
}

export default App
