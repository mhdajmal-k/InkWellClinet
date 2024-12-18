/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Avatar, Button, Tooltip } from '@nextui-org/react'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../../store/store'
import { logOut } from '../../store/slices/userThunk'
import { toast } from 'sonner'
import CustomToast from '../helpers/CustomToast'
import BlogWriteButton from '../blog/blogWriteButton'

const NavBar: React.FC = () => {
    const dispatch: AppDispatch = useDispatch()
    const navigate = useNavigate()

    const [userName, setUserName] = useState(() => {
        const storedUser = localStorage.getItem("user");
        return storedUser ? JSON.parse(storedUser) : null;
    });

    const handleLogout = async () => {
        try {
            const response = await dispatch(logOut()).unwrap();
            if (response) {
                localStorage.clear();
                setUserName(null);
                navigate('/');
            }
        } catch (error: any) {
            toast(<CustomToast message={error || error.message} type="error" />);
        }
    };

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        setUserName(storedUser ? JSON.parse(storedUser) : null);
    }, []); // Runs only on initial render to sync with localStorage


    return (
        <nav className='bg-bgColor pt-3'>
            <div className="max-w-7xl mx-auto flex justify-between items-center">
                <div className="flex items-center mx-2.5">
                    <Link to="/" className="ml-3 font-bold text-black">
                        Ink<span className='text-yellow-500 font-bold'>Well </span>
                    </Link>
                </div>
                <div className='flex items-center space-x-4'>
                    {userName?.user ? (
                        <div className='flex items-center gap-4'>
                            <BlogWriteButton />
                            <Tooltip
                                content={
                                    <div className="py-2">
                                        <Button className="w-full mb-2 justify-start" variant="light" onClick={() => { navigate("/profile") }}>
                                            Profile
                                        </Button>
                                        <Button className="w-full mb-2 justify-start" variant="light" onClick={() => { navigate("/writeBlog") }}>
                                            Write Blog
                                        </Button>
                                        <Button className="w-full justify-start" variant="light" onClick={() => { navigate("/yourBlog") }}>
                                            Your Blogs
                                        </Button>
                                        <Button className="w-full mb-2 justify-start" variant="light" onClick={handleLogout}>
                                            LogOut
                                        </Button>
                                    </div>
                                }
                            >
                                <Avatar className='w-9' />
                            </Tooltip>
                            <span className="text-sm font-medium">{userName?.user}</span>
                            <Button className='bg-black text-white' onClick={() => { navigate("/dashboard") }}>Blogs</Button>
                        </div>
                    ) : (
                        <Link to="/signup" className="text-lg bg-black text-white">
                            <Button className='bg-black text-white'>Get Started</Button>
                        </Link>
                    )}
                </div>
            </div>
            <hr className="mt-3 bg-black h-0.5" />
        </nav>
    );
};

export default NavBar;
