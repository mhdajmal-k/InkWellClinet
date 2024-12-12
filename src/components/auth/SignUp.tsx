import React, { useState } from 'react';
import { Button, Input, } from "@nextui-org/react";
import signUpImage from "../../assets/images/loginimage.jpeg";
import { Link, useNavigate, } from 'react-router-dom';
import { EyeIcon, EyeOffIcon } from 'lucide-react';
import { useFormik } from 'formik';
import { signUpValidationSchema } from '../../utils/validators/signupValidator';
import { toast } from 'sonner';
import CustomToast from '../helpers/CustomToast';
import { USERSIGNUP } from '../../service/api/api';
import FetchCall from '../../hooks/CustomHook';


const SignUpForm: React.FC = () => {

    const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);

    const navigate = useNavigate();
    const { data, loading, error, apiCall } = FetchCall({
        url: USERSIGNUP,
        method: "POST",
    });

    // useEffect(() => {
    //     if (error) {
    //         setTimeout(() => {
    //             dispatch(clearError());
    //         }, 2000);
    //     }
    // }, [error, dispatch]);

    const formik = useFormik({
        initialValues: {
            userName: '',
            email: '',
            password: '',
            confirmPassword: '',
        },
        validationSchema: signUpValidationSchema,
        validateOnChange: true,
        validateOnBlur: true,
        onSubmit: async (values) => {
            try {
                await apiCall({
                    userName: values.userName,
                    email: values.email,
                    password: values.password,
                })
                if (data) {
                    console.log(data)
                    navigate("/login")
                    // toast(<CustomToast message={data.message} type="success" />);
                }

            } catch (error: any) {
                console.log(error)
                toast(<CustomToast message={error || "Sign up failed"} type="error" />);
            }
        },
    });

    return (
        <div className='min-h-screen container bg-bgColor flex justify-center items-center mx-auto'>
            <div className='flex flex-col md:flex-row max-w-3xl bg-white shadow-md rounded-lg overflow-hidden'>

                <div className='hidden md:block w-1/2'>
                    <img
                        src={signUpImage}
                        alt="Sign up illustration"
                        className='w-full h-full object-cover'
                    />
                </div>
                {/* Form Section */}
                <div className='w-full md:w-1/2 p-8'>
                    <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>
                    <form className='space-y-4' onSubmit={formik.handleSubmit}>

                        <Input
                            type="text"
                            label="Username"
                            name='userName'
                            size="sm"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            isInvalid={!!formik.errors.userName && formik.touched.userName}
                            value={formik.values.userName}
                            variant="bordered"
                        />
                        {formik.errors.userName && formik.touched.userName && (
                            <div className='text-red-500 text-sm'>{formik.errors.userName}</div>
                        )}

                        <Input
                            type="email"
                            label="Email"
                            name='email'
                            size="sm"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            isInvalid={!!formik.errors.email && formik.touched.email}
                            value={formik.values.email}
                            variant="bordered"
                        />
                        {formik.errors.email && formik.touched.email && (
                            <div className='text-red-500 text-sm'>{formik.errors.email}</div>
                        )}

                        <div className="relative">
                            <Input
                                type="text"
                                label="Password"
                                name='password'
                                size="sm"
                                variant="bordered"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                isInvalid={!!formik.errors.password && formik.touched.password}
                                value={formik.values.password}
                            />
                            {formik.errors.password && formik.touched.password && (
                                <div className='text-red-500 text-sm'>{formik.errors.password}</div>
                            )}
                        </div>

                        <div className="relative">
                            <Input
                                type={showConfirmPassword ? "text" : "password"}
                                label="Confirm Password"
                                name='confirmPassword'
                                size="sm"
                                variant="bordered"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                isInvalid={!!formik.errors.confirmPassword && formik.touched.confirmPassword}
                                value={formik.values.confirmPassword}
                            />
                            {formik.errors.confirmPassword && formik.touched.confirmPassword && (
                                <div className='text-red-500 text-sm'>{formik.errors.confirmPassword}</div>
                            )}
                            <button
                                type="button"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
                            >
                                {showConfirmPassword ? <EyeIcon className="h-5 w-5" /> : <EyeOffIcon className="h-5 w-5" />}
                            </button>
                        </div>

                        {loading ? (
                            <Button color="primary" type="submit" className="w-full" isLoading disabled>
                                Signing Up...
                            </Button>
                        ) : (
                            <Button color="primary" type="submit" className="w-full">
                                Sign Up
                            </Button>
                        )}
                        {error && <div className="text-red-500 mt-2 text-center">{error}</div>}
                    </form>
                    <p className="mt-4 text-center text-sm text-gray-600">
                        Already have an account? <Link to="/login" className='text-blue-900'>Sign In</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default SignUpForm;
