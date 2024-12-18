/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import { Button, Input, Modal, ModalContent, ModalFooter, ModalHeader, useDisclosure, } from '@nextui-org/react';
import signUpImage from "../../assets/images/loginimage.jpeg";
import { Link, useNavigate, } from 'react-router-dom';
import { EyeIcon, EyeOffIcon } from 'lucide-react';
import { useFormik } from 'formik';
import { signUpValidationSchema } from '../../utils/validators/signupValidator';
import { toast } from 'sonner';
import { preferredArticleCategories } from '../../utils/enums/preferedCategory';
import { signUpUser } from '../../store/slices/userThunk';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';
import CustomToast from '../helpers/CustomToast';
import { clearError } from '../../store/slices/userAuthSlice';


const SignUpForm: React.FC = () => {

    const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
    const [showModal, setShowModal] = useState<boolean>(false);
    const { onOpen, onOpenChange } = useDisclosure();
    const dispatch: AppDispatch = useDispatch()
    const { loading, error } = useSelector((state: RootState) => state.user)

    const [preferredArticles, setPreferredArticles] = useState<string[]>([]);
    const navigate = useNavigate();
    useEffect(() => {
        if (error) {
            setTimeout(() => {
                dispatch(clearError());
            }, 2000);
        }
    }, [error, dispatch]);

    const toggleArticleCategory = (category: string) => {
        setPreferredArticles((prev) => {
            return prev.includes(category) ? prev.filter((item) => item !== category) : [...prev, category]
        })
    }

    const formik = useFormik({
        initialValues: {
            firstName: '',
            lastName: '',
            phone: '',
            email: '',
            dob: '',
            password: '',
            confirmPassword: '',

        },
        validationSchema: signUpValidationSchema,
        validateOnChange: true,
        validateOnBlur: true,
        onSubmit: async (values) => {
            try {
                const signUpData = {
                    firstName: values.firstName,
                    lastName: values.lastName,
                    phone: values.phone,
                    email: values.email,
                    dob: new Date(values.dob),
                    password: values.password,
                    articlePreferences: preferredArticles
                };

                const response = await dispatch(signUpUser(signUpData)).unwrap();
                if (response) {
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
            <div className='flex flex-col md:flex-row max-w-4xl bg-white shadow-md rounded-lg overflow-hidden'>

                <div className='hidden md:block w-2/6'>
                    <img
                        src={signUpImage}
                        alt="Sign up illustration"
                        className='w-full h-full object-cover'
                    />
                </div>
                {/* Form Section */}
                <div className='w-full md:w-4/6 p-8'>
                    <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>
                    <form className='space-y-4' onSubmit={formik.handleSubmit}>
                        <div className='flex gap-2'>
                            <div className='flex w-1/2 flex-col'>
                                <Input
                                    type="text"
                                    label="firstName"
                                    name='firstName'
                                    size="sm"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    isInvalid={!!formik.errors.firstName && formik.touched.firstName}
                                    value={formik.values.firstName}
                                    variant="bordered"
                                />
                                {formik.errors.firstName && formik.touched.firstName && (
                                    <div className='text-red-500 text-xs'>{formik.errors.firstName}</div>
                                )}
                            </div>

                            <div className='flex w-1/2 flex-col'>
                                <Input
                                    type="text"
                                    label="lastName"
                                    name='lastName'
                                    size="sm"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    isInvalid={!!formik.errors.lastName && formik.touched.lastName}
                                    value={formik.values.lastName}
                                    variant="bordered"
                                />
                                {formik.errors.lastName && formik.touched.lastName && (
                                    <div className='text-red-500 text-xs'>{formik.errors.lastName}</div>
                                )}
                            </div>


                        </div>
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
                        <div className='flex gap-2'>
                            <div className='flex w-1/2 flex-col'><Input
                                type="date"
                                label="Date of Birth"
                                name="dob"
                                size="sm"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                isInvalid={!!formik.errors.dob && formik.touched.dob}
                                value={formik.values.dob}
                                variant="bordered"
                            />
                                {formik.errors.dob && formik.touched.dob && (
                                    <div className="text-red-500 text-xs">{formik.errors.dob}</div>
                                )}</div>
                            <div className='flex w-1/2 flex-col'>
                                <Input
                                    type="tel"
                                    label="Phone"
                                    name="phone"
                                    size="sm"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    isInvalid={!!formik.errors.phone && formik.touched.phone}
                                    value={formik.values.phone}
                                    variant="bordered"
                                />
                                {formik.errors.dob && formik.touched.phone && (
                                    <div className="text-red-500 text-xs">{formik.errors.phone}</div>
                                )}
                            </div>

                        </div>


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
                                <div className='text-red-500 text-xs'>{formik.errors.password}</div>
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
                                <div className='text-red-500 text-xs'>{formik.errors.confirmPassword}</div>
                            )}
                            <button
                                type="button"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
                            >
                                {showConfirmPassword ? <EyeIcon className="h-5 w-5" /> : <EyeOffIcon className="h-5 w-5" />}
                            </button>
                        </div>
                        <Button onClick={() => {
                            if (preferredArticles.length === 0) {
                                onOpen();
                                setShowModal(true);
                                return;
                            }

                        }}>
                            Add Preference
                        </Button>

                        {loading ? (
                            <Button color="primary" type="submit" className="w-full" isLoading disabled>
                                Signing Up...
                            </Button>
                        ) : (
                            <Button
                                color={preferredArticles.length
                                    == 0 ? "default" : "primary"}
                                type={preferredArticles.length === 0 ? "button" : "submit"}
                                className={`w-full ${preferredArticles.length === 0 ? "disabled cursor-not-allowed " : ""}`}
                            >
                                Sign Up
                            </Button>

                        )}

                    </form>
                    <p className="mt-4 text-center text-sm text-gray-600">
                        Already have an account? <Link to="/login" className='text-blue-900'>Sign In</Link>
                    </p>



                </div>

            </div>

            <Modal
                isOpen={showModal}
                onOpenChange={(open) => {
                    setShowModal(open);
                    onOpenChange();
                }}
                className="max-w-lg mx-auto w-full"
            >

                <ModalContent>
                    <ModalHeader>
                        <h3 className="text-lg font-bold">Manage Preferred Articles</h3>
                    </ModalHeader>
                    <div className="p-6 max-h-80 overflow-y-auto">
                        {preferredArticleCategories.length > 0 ? (
                            <div className="grid grid-cols-2 gap-4">
                                {preferredArticleCategories.map((category) => {
                                    const IconComponent = category.Icon; // Get the icon component
                                    return (
                                        <div key={category.name} className="flex items-center gap-2">
                                            <div className="w-1/4">
                                                <Input
                                                    type="checkbox"
                                                    size="sm"
                                                    id={`category-${category.name}`}
                                                    checked={preferredArticles.includes(category.name)}
                                                    onChange={() => toggleArticleCategory(category.name)}
                                                />
                                            </div>
                                            <div className="w-full flex items-center gap-2">
                                                <IconComponent size={16} />
                                                <label
                                                    htmlFor={`category-${category.name}`}
                                                    className="text-sm font-medium"
                                                >
                                                    {category.name}
                                                </label>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        ) : (
                            <p className="text-sm text-gray-500">No categories available.</p>
                        )}
                    </div>
                    <ModalFooter>
                        <Button
                            color="danger"
                            variant="light"
                            onPress={() => setShowModal(false)}
                            className="px-4 py-2"
                        >
                            Close
                        </Button>
                        <Button
                            color="primary"
                            onPress={() => {
                                if (preferredArticles.length === 0) {
                                    setShowModal(false)
                                    toast("Please select at least one category");
                                } else {
                                    setShowModal(false);

                                }
                            }}
                            className="px-4 py-2"
                        >
                            Save
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>



        </div>
    );
};

export default SignUpForm;
