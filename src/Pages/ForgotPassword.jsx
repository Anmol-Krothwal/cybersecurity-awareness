import { useEffect, useState } from "react";
import { useForgetPasswordMutation } from "../Slice/AuthSlice";

const ForgotPassword = () => {

    const [email, setEmail] = useState("");
    const [responseData, setResponseData] = useState({
        data: null,
        outcome: null
    });
    const [forgetPassword, { isError, isSuccess, error, data }] = useForgetPasswordMutation();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await forgetPassword({ email });
            console.log(res);
        } catch (err) {
            console.error("Login Failed:", err);
        }
    }

    useEffect(() => {
        if (isError) {
            setResponseData({ data: error?.data?.message || "Something went wrong", outcome: 'error' })
        } if (isSuccess) {
            setResponseData({ data: data.message, outcome: "Success" })
        }
    }, [isError, error, isSuccess, data])

    return <>
        <div className="fixed top-0 left-0 h-screen w-full bg-[#1c1c1cdf] z-50 center">
            <span className="h-auto w-[35%] p-6 bg-white centerCW">
                <div className="w-full flex flex-col justify-between items-center mb-5">
                    <span className="text-2xl font-Mukta font-bold text-[#595959]">Forgot Password ?</span>
                    <span className="font-Mukta text-center text-sm">Provide email address associated with your account to recover your password</span>
                </div>
                <div className={`${responseData.outcome == null ? "hidden" : responseData.outcome == 'Success' ? "bg-green-200" : ""} bg-red-100 px-4 text-center my-1 text-sm`}>{responseData.data}</div>
                <form className={`${responseData.outcome == "Success" ? "hidden" : ""} w-full centerCW`} onSubmit={handleSubmit}>
                    <div className="w-full relative font-Mukta inpBox my-2">
                        <input type="text" required className="w-full p-2 outline-none border border-[#6e6d6d92] rounded-md" value={email} onChange={e => { responseData.data = null; responseData.outcome = null; setEmail(e.currentTarget.value); }} />
                        <label className="absolute TrandformPlaceholder left-2 text-[#6e6d6d92] transition-all pointer-events-none">Email</label>
                    </div>
                    <button type="submit" className={`w-full font-Mukta rounded-md text-white center py-2 tracking-wide my-6 cursor-default ${email !== "" ? 'bg-green-600 cursor-pointer' : 'bg-[#6e6d6d92]'}`}>Forget Password</button>
                </form>
            </span>
        </div>
    </>
}

export default ForgotPassword;