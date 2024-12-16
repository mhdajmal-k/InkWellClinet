/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import signUpImage from "../../assets/images/loginimage.jpeg";
import { Link, useNavigate, } from 'react-router-dom';
import { EyeIcon, EyeOffIcon } from 'lucide-react';
import { useFormik } from 'formik';
import { toast } from 'sonner';
import { loginUser } from '../../store/slices/userThunk';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';
import CustomToast from '../helpers/CustomToast';
import { clearError } from '../../store/slices/userAuthSlice';
import { loginValidationSchema } from '../../utils/validators/loginValidator';
import { Button, Input } from '@nextui-org/react';


const LoginForm: React.FC = () => {

    const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);


    const dispatch: AppDispatch = useDispatch()
    const { loading, error } = useSelector((state: RootState) => state.user)

    const navigate = useNavigate();
    useEffect(() => {
        if (error) {
            setTimeout(() => {
                dispatch(clearError());
            }, 2000);
        }
    }, [error, dispatch]);



    const formik = useFormik({
        initialValues: {

            email: 'ajmalchundappuram@gmail.com',

            password: '@Ajmal111',
        },
        validationSchema: loginValidationSchema,
        validateOnChange: true,
        validateOnBlur: true,
        onSubmit: async (values) => {
            try {
                const signUpData = {

                    email: values.email,

                    password: values.password,
                };

                const response = await dispatch(loginUser(signUpData)).unwrap();
                if (response) {
                    console.log(response, "is the response")
                    localStorage.setItem('user', JSON.stringify(response.result))
                    toast(<CustomToast message={response.message} type="success" />);

                    navigate('/');
                }

            } catch (error: any) {
                toast(<CustomToast message={error || error.message} type="error" />);

            }

        },
    });
    return (
        <div className='min-h-screen container bg-bgColor flex justify-center items-center mx-auto'>
            <div className='flex flex-col md:flex-row max-w-3xl max-h-fit bg-white shadow-md rounded-lg overflow-hidden'>

                <div className='w-full md:w-2/3 p-8'>
                    <h2 className="text-2xl font-bold mb-6 text-center">Sing In</h2>
                    <form className='space-y-4 w-full' onSubmit={formik.handleSubmit}>
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
                            <div className='text-red-500 text-xs'>{formik.errors.email}</div>
                        )}

                        <div className="relative">
                            <Input
                                type={showConfirmPassword ? "text" : "password"}
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
                                <div className='text-red-500 text-xs'>{formik.errors.password}</div>
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
                                Sing In ...
                            </Button>
                        ) : (
                            <Button
                                color="primary"
                                type="submit"
                                className={`w-full`}
                            >
                                Sing In
                            </Button>

                        )}

                    </form>
                    <p className="mt-4 text-center text-sm text-gray-600">
                        I Don't have an account? <Link to="/signup" className='text-blue-900'>Sign In</Link>
                    </p>



                </div>

                <div className='hidden md:block w-1/3'>
                    <img
                        src={signUpImage}
                        alt="Sign up illustration"
                        className='w-full h-full object-cover'
                    />
                </div>
            </div>
        </div>
    );
};

export default LoginForm;
