import { useState } from "react";
import { useSelector } from "react-redux";
import Navbar from "../Components/Navbar";
import { FaPen, FaCheck } from "react-icons/fa6";
import { RxCross2 } from "react-icons/rx";
import { useEditUserMutation } from "../Slice/AuthSlice";

// Reusable Editable Field Component
const EditableField = ({ label, value, field, userId, onSave }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [tempValue, setTempValue] = useState(value);
    const [loading, setLoading] = useState(false);
    const [editUser] = useEditUserMutation();

    const handleSave = async () => {
        setLoading(true);
        try {
            console.log(userId);
            let op = { userId, "field": field, "val": tempValue }
            console.log(op)
            let res = await editUser(op);  // userId is now correctly passed
            console.log(res);

            if (res?.data) {
                onSave(tempValue);
                setIsEditing(false);
            } else {
                console.error("Error updating user");
            }
        } catch (error) {
            console.error("API Error:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleCancel = () => {
        setTempValue(value);
        setIsEditing(false);
    };

    return (
        <div className="flex items-center justify-between gap-4">
            <div className="font-semibold text-gray-600 w-1/3">{label}</div>
            {isEditing ? (
                <div className="flex items-center gap-2 w-2/3">
                    <input
                        type="text"
                        className="border p-1 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-300"
                        value={tempValue}
                        onChange={(e) => setTempValue(e.target.value)}
                    />
                    {loading ? (
                        <span className="text-blue-500 animate-pulse">Saving...</span>
                    ) : (
                        <>
                            <FaCheck
                                className="text-green-600 cursor-pointer hover:text-green-800 transition"
                                onClick={handleSave}
                            />
                            <RxCross2
                                className="text-red-600 cursor-pointer hover:text-red-800 transition"
                                onClick={handleCancel}
                            />
                        </>
                    )}
                </div>
            ) : (
                <div className="flex items-center justify-between w-2/3">
                    <span className="text-gray-800 truncate">{value}</span>
                    <FaPen
                        className="text-gray-500 cursor-pointer hover:text-blue-600 transition"
                        onClick={() => setIsEditing(true)}
                    />
                </div>
            )}
        </div>
    );
};

const Profile = () => {
    const userData = useSelector(state => state.user.userDetails);
    console.log("userData:", userData);

    // Ensure profileData is initialized with correct values including userId
    const [profileData, setProfileData] = useState({
        userId: userData?.docId, // Ensure correct key from userData
        name: userData?.name,
        email: userData?.email,
        role: userData?.role,
    });

    return (
        <div className="fixed top-0 left-0 h-screen w-screen bg-[#1c1c1cdf] flex justify-center items-center bg-gradient-to-r from-[#feb47b] to-[#ff7e5f]">
            <Navbar />
            <div className="h-auto w-auto bg-white p-6 rounded-lg shadow-lg relative">
                {/* Profile Image */}
                <img
                    src={`/assets/Image/user.png`}
                    alt="User Icon"
                    className="h-24 w-24 rounded-full object-cover absolute left-1/2 -top-12 transform -translate-x-1/2 border-2 border-gray-300"
                />
                <h2 className="text-xl font-bold text-center mt-12">{profileData.name}</h2>

                {/* Editable Fields */}
                <div className="grid gap-4 mt-4 w-80">
                    <EditableField
                        label="Username"
                        field="name"
                        userId={profileData.userId}
                        value={profileData.name}
                        onSave={(newValue) => setProfileData(prev => ({ ...prev, name: newValue }))}
                    />
                    <EditableField
                        label="Email"
                        field="email"
                        userId={profileData.userId}
                        value={profileData.email}
                        onSave={(newValue) => setProfileData(prev => ({ ...prev, email: newValue }))}
                    />
                    <EditableField
                        label="Role"
                        field="role"
                        userId={profileData.userId}
                        value={profileData.role}
                        onSave={(newValue) => setProfileData(prev => ({ ...prev, role: newValue }))}
                    />
                </div>
            </div>
        </div>
    );
};

export default Profile;
