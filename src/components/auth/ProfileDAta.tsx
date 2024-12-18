/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { Button, Card, CardBody, CardHeader, Input } from "@nextui-org/react";
import { CalendarIcon, PersonStandingIcon, PhoneIcon } from "lucide-react";
import CustomToast from "../helpers/CustomToast";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store/store";
import { getUserData, updateUserData } from "../../store/slices/userThunk";
import { toast } from "sonner";

// Updated interface to match IUserProfile
export interface ProfileData {
    firstName: string;
    lastName: string;
    email: string;
    dob: string;
    phone?: string;
}

const ProfileDisplay = () => {
    const dispatch: AppDispatch = useDispatch()
    const [isEditing, setIsEditing] = useState(false);
    const [profileData, setProfileData] = useState<ProfileData>({
        firstName: "",
        lastName: "",
        email: "",
        dob: "", // Empty string instead of undefined
        phone: "", // Optional, can be empty string
    });

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await dispatch(getUserData()).unwrap();
                if (response) {
                    setProfileData({
                        firstName: response.result.firstName,
                        lastName: response.result.lastName,
                        email: response.result.email,
                        dob: response.result.dob || "", // Ensure dob is a string
                        phone: response.result.phone || "", // Ensure phone is a string
                    });
                }
            } catch (error: any) {
                toast(<CustomToast message={error?.message || "Error fetching profile"} type="error" />);
            }
        };
        fetchProfile();
    }, [dispatch]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setProfileData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const toggleEditMode = () => {
        setIsEditing((prev) => !prev);
    };

    const handleSave = async () => {
        try {
            // Prepare data to match IUserProfile
            const userData = {
                firstName: profileData.firstName,
                lastName: profileData.lastName,
                email: profileData.email,
                dob: profileData.dob,
                phone: profileData.phone || undefined, // Convert empty string to undefined if needed
            };

            const response = await dispatch(updateUserData(userData)).unwrap();
            if (response) {
                toggleEditMode();
                toast(<CustomToast message={response.message} type="success" />);
            }
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            toast(<CustomToast message={error?.message || "Error updating profile"} type="error" />);
        }
    };

    return (
        <Card className="w-full max-w-2xl mx-auto container p-8 my-5 ">
            <CardHeader className="flex flex-row items-center gap-4">
                <h1 className="text-2xl">
                    Welcome {profileData.firstName}
                </h1>
            </CardHeader>
            <CardBody>
                <div className="grid gap-4">
                    <section>
                        <h3 className="text-lg font-semibold mb-2">Personal Information</h3>
                        <div className="grid gap-2">
                            <div className="flex items-center gap-2">
                                <PersonStandingIcon className="text-gray-500" />
                                <span className="font-medium">First Name:</span>
                                {isEditing ? (
                                    <Input
                                        type="text"
                                        name="firstName"
                                        value={profileData.firstName}
                                        onChange={handleChange}
                                        className="border p-2 rounded"
                                    />
                                ) : (
                                    <span>
                                        {profileData.firstName}
                                    </span>
                                )}
                            </div>
                            <div className="flex items-center gap-2">
                                <PersonStandingIcon className="text-gray-500" />
                                <span className="font-medium">Last Name:</span>
                                {isEditing ? (
                                    <Input
                                        type="text"
                                        name="lastName"
                                        value={profileData.lastName}
                                        onChange={handleChange}
                                        className="border p-2 rounded"
                                    />
                                ) : (
                                    <span>
                                        {profileData.lastName}
                                    </span>
                                )}
                            </div>
                            <div className="flex items-center gap-2">
                                <CalendarIcon className="text-gray-500" />
                                <span className="font-medium">Date of Birth:</span>
                                {isEditing ? (
                                    <Input
                                        type="date"
                                        name="dob"
                                        value={profileData.dob}
                                        onChange={handleChange}
                                        className="border p-2 rounded"
                                    />
                                ) : (
                                    <span>{profileData.dob ? new Date(profileData.dob).toLocaleDateString() : 'N/A'}</span>
                                )}
                            </div>
                        </div>
                    </section>
                    <section>
                        <h3 className="text-lg font-semibold mb-2">Contact Information</h3>
                        <div className="grid gap-2">
                            <div className="flex items-center gap-2">
                                <span className="font-medium">Email:</span>
                                {isEditing ? (
                                    <Input
                                        readOnly
                                        type="email"
                                        name="email"
                                        value={profileData.email}
                                        onChange={handleChange}
                                        className="border p-2 rounded"
                                    />
                                ) : (
                                    <span>{profileData.email}</span>
                                )}
                            </div>
                            <div className="flex items-center gap-2">
                                <PhoneIcon className="text-gray-500" />
                                <span className="font-medium">Phone:</span>
                                {isEditing ? (
                                    <Input
                                        type="text"
                                        name="phone"
                                        value={profileData.phone}
                                        onChange={handleChange}
                                        className="border p-2 rounded"
                                    />
                                ) : (
                                    <span>{profileData.phone || 'N/A'}</span>
                                )}
                            </div>
                        </div>
                    </section>
                    <Button onClick={toggleEditMode}>
                        {isEditing ? "Cancel" : "Edit Profile"}
                    </Button>
                    {isEditing && (
                        <Button onClick={handleSave} color="primary" className="mt-2">
                            Save Changes
                        </Button>
                    )}
                </div>
            </CardBody>
        </Card>
    );
};

export default ProfileDisplay;