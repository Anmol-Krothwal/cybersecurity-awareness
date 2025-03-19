import { RxCross2 } from "react-icons/rx";
import { useLoginUserMutation } from "../Slice/AuthSlice";
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from "react";


const Login = () => {
    const [credentails, setCredentials] = useState({});
    const [localError, setLocalError] = useState(null);

    const [loginUser, { data, isSuccess, error, isError }] = useLoginUserMutation();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLocalError(null);
        try {
            await loginUser(credentails);
        } catch (err) {
            console.log("Login Failed:", err);
        }
    }
    const handleInputChange = (e) => {
        setCredentials((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
        if (localError) setLocalError(null);
    };

    useEffect(() => {
        if (isSuccess) {
            setTimeout(() => {
                navigate('/')
            }, 3000);
        } else if (isError) {
            console.log(error)
            setLocalError(error?.data?.message || "Something went wrong");
        }
    }, [isSuccess, navigate, isError, error])

    return <>
        <div className="fixed top-0 left-0 h-screen w-full bg-[#1c1c1cdf] z-50 center">
            <span className="h-auto w-[35%] p-6 bg-white centerCW">
                <div className="w-full flex justify-between items-center mb-5">
                    <span className="text-2xl font-Mukta font-bold text-[#595959]">Login</span>
                    <RxCross2 className="text-2xl cursor-pointer" onClick={() => navigate('/')} />
                </div>
                {isError && localError && <p className="text-red-600 mt-2 mb-2 bg-red-100 px-4 rounded-sm text-center">{error?.data?.message || "Login failed!"}</p>}
                {isSuccess ? `${data.name} logged in successfully..` :
                    <form className="w-full centerCW" onSubmit={handleSubmit}>
                        <div className="w-full relative font-Mukta inpBox my-2">
                            <input type="text" required name="email" className="w-full p-2 outline-none border border-[#6e6d6d92] rounded-md" onChange={handleInputChange}></input>
                            <label className="absolute TrandformPlaceholder left-2 text-[#6e6d6d92] transition-all pointer-events-none">Email</label>
                        </div>
                        <div className="w-full relative font-Mukta inpBox my-2">
                            <input type="password" required name="password" className="w-full p-2 outline-none border border-[#6e6d6d92] rounded-md" onChange={handleInputChange}></input>
                            <label className="absolute TrandformPlaceholder left-2 text-[#6e6d6d92] transition-all pointer-events-none">Password</label>
                        </div>
                        <div className="text-[#6e6d6d92] text-sm font-medium" onClick={() => navigate('/forgotPassword')}>Forgot<span className="text-[#ff3427] cursor-pointer"> Password </span> ?</div>
                        <button type="submit" className={`w-full font-Mukta rounded-md text-white center py-2 tracking-wide my-6 cursor-default ${credentails.email !== "" && credentails.password !== "" ? 'bg-green-600 cursor-pointer' : 'bg-[#6e6d6d92]'}`}>Login</button>
                        <div className="text-[#6e6d6d92] font-semibold mx-auto cursor-pointer" onClick={() => navigate('/signUp')}>New to Travellio?<span className="text-[#ff3427]"> Create Account</span></div>
                    </form>
                }
            </span>
        </div>
    </>
}
export default Login;