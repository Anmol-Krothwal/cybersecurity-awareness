import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from "react";
import { useResetPasswordMutation } from '../Slice/AuthSlice';

const ResetPassword = () => {

    const [passowrd, setPassowrd] = useState({
        newPassword: null,
        confirmPassword: null
    });
    const [ResetPassword, { isSuccess, data, isError, error }] = useResetPasswordMutation();
    const [successData, setSuccessData] = useState(null);
    const [localError, setLocalError] = useState(null)
    const { token } = useParams();

    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLocalError(null);
        console.log(passowrd);
        try {
            let res = await ResetPassword({ ...passowrd, token });
            console.log(res);
        } catch (err) {
            console.error("Login Failed:", err);
        }
    }

    const handleInputChange = (e) => {
        setPassowrd((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
        if (localError) setLocalError(null);
    };

    useEffect(() => {
        if (isSuccess) {
            setSuccessData(data.message || "Password reset Complete...")
            setTimeout(() => {
                navigate('/')
            }, 3000);
        } else if (isError) {
            setLocalError(error?.data?.message || "Something went wrong")
        }
    }, [isSuccess, data, isError, error, navigate])

    return <>
        <div className="fixed top-0 left-0 h-screen w-full bg-[#1c1c1cdf] z-50 center">
            <span className="h-auto w-[35%] p-6 bg-white centerCW">
                <div className="w-full flex justify-between items-center mb-5">
                    <span className="text-2xl font-Mukta font-bold text-[#595959]">Reset Password</span>
                    <span className="font-Mukta"></span>
                </div>
                <div className={`${localError == null ? "hidden" : ""} bg-red-100 px-4 text-center my-1 text-sm`}>{localError}</div>
                <div className={`${isSuccess? "" : "hidden"} bg-green-100 px-4 text-center my-1 text-sm`}>{successData}</div>
                <form className={`w-full centerCW ${isSuccess?"hidden":""}`} onSubmit={handleSubmit}>
                    <div className="w-full relative font-Mukta inpBox my-2">
                        <input type="text" name='newPassword' required className="w-full p-2 outline-none border border-[#6e6d6d92] rounded-md" onChange={handleInputChange} />
                        <label className="absolute TrandformPlaceholder left-2 text-[#6e6d6d92] transition-all pointer-events-none">New Password</label>
                    </div>
                    <div className="w-full relative font-Mukta inpBox my-2">
                        <input type="text" name='confirmPassword' required className="w-full p-2 outline-none border border-[#6e6d6d92] rounded-md" onChange={handleInputChange} />
                        < label className="absolute TrandformPlaceholder left-2 text-[#6e6d6d92] transition-all pointer-events-none" > Confrm Password</label>
                    </div>
                    <button type="submit" className={`w-full font-Mukta rounded-md text-white center py-2 tracking-wide my-6 cursor-default ${passowrd.newPassword !== "" && passowrd.confirmPassword !== "" ? 'bg-green-600 cursor-pointer' : 'bg-[#6e6d6d92]'}`}>Reset Password</button>
                </form>
            </span>
        </div >
    </>
}
export default ResetPassword;