import { useEffect, useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { BsSendCheckFill } from "react-icons/bs";
import { useSignupUserMutation } from "../Slice/AuthSlice";
import { useNavigate } from "react-router-dom";

const SignUp = () => {

    const [signupData, setSignupData] = useState({});
    const [localError, setLocalError] = useState(null);
    const navigate = useNavigate();
    const [signupUser, { data, isLoading, isSuccess, isError, error }] = useSignupUserMutation();

    const checkFilled = (Data) => {
        if (Data.name && Data.email && Data.password && Data.confirmPassword)
            return true;
        else return false;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            let res = await signupUser(signupData);
            console.log(res)
        } catch (err) {
            console.log(err);
        }
    }

    const handleInputChange = (e) => {
        setSignupData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
        if (localError) setLocalError(null);
    };

    useEffect(() => {
        if (isSuccess) {
            setTimeout(() => {
                navigate('/login')
            }, 3000);
        } else if (isError) {
            setLocalError(error?.data?.message || "Something went wrong");
        }

    }, [isSuccess, isError, error])

    return <>
        <div className="fixed top-0 left-0 h-screen w-full bg-[#1c1c1cdf] z-50 center">
            <span className="h-auto w-[35%] p-6 bg-white centerCW">
                <div className="w-full flex justify-between items-center mb-5">
                    <span className="text-2xl font-Mukta font-bold text-[#595959]">Sign up</span>
                    <RxCross2 className="text-2xl cursor-pointer" onClick={() => navigate('/')} />
                </div>
                <div className={`${localError == null ? "hidden" : ""} bg-red-100 px-4 text-center py-1 my-2 text-sm`}>{localError}</div>
                <form className={`w-full centerCW ${isSuccess == true ? 'hidden' : ''}`} onSubmit={handleSubmit} method="POST">
                    <div className="w-full relative font-Mukta inpBox my-2">
                        <input type="text" name="name" required className="w-full p-2 outline-none border border-[#6e6d6d92] rounded-md" onChange={handleInputChange}></input>
                        <label className="absolute TrandformPlaceholder left-2 text-[#6e6d6d92] transition-all pointer-events-none">Name</label>
                    </div>
                    <div className="w-full relative font-Mukta inpBox my-2">
                        <input type="text" name="email" required className="w-full p-2 outline-none border border-[#6e6d6d92] rounded-md" onChange={handleInputChange}></input>
                        <label className="absolute TrandformPlaceholder left-2 text-[#6e6d6d92] transition-all pointer-events-none">Email</label>
                    </div>
                    <div className="w-full relative font-Mukta inpBox my-2">
                        <input type="password" name="password" required className="w-full p-2 outline-none border border-[#6e6d6d92] rounded-md" onChange={handleInputChange}></input>
                        <label className="absolute TrandformPlaceholder left-2 text-[#6e6d6d92] transition-all pointer-events-none">Password</label>
                    </div>
                    <div className="w-full relative font-Mukta inpBox my-2">
                        <input type="password" name="confirmPassword" required className="w-full p-2 outline-none border border-[#6e6d6d92] rounded-md" onChange={handleInputChange}></input>
                        <label className="absolute TrandformPlaceholder left-2 text-[#6e6d6d92] transition-all pointer-events-none">Confirm Password</label>
                    </div>
                    <button type="submit" className={`w-full font-Mukta my-2 rounded-md text-white center py-2 tracking-wide ${checkFilled(signupData) ? 'bg-green-600 cursor-pointer' : 'bg-[#6e6d6d92] cursor-no-drop'}`} >Create Account</button>
                    <div className="text-[#6e6d6d92] font-semibold cursor-pointer" onClick={() => navigate('/login')}>Already have an account?<span className="text-[#ff3427]"> Login</span></div>
                </form>
                <div className={`w-full centerCW ${isSuccess == false ? 'hidden' : ''}`}>
                    <BsSendCheckFill className="text-[2rem] mt-4 text-[#fd311b]" />
                    <div className="text-[1.2rem] my-2">{isSuccess ? data.message : ''}</div>
                </div>
            </span >
        </div >
    </>
}
export default SignUp;