/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useMemo } from 'react'
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
    const userName = useMemo(() => {
        const storedUser = localStorage.getItem("user");
        return storedUser ? JSON.parse(storedUser) : null;
    }, []);

    const handileLogout = async () => {
        try {

            const response = await dispatch(logOut()).unwrap();
            if (response) {
                localStorage.clear()
                navigate('/');
            }
        } catch (error: any) {
            toast(<CustomToast message={error || error.message} type="error" />);

        }



    }

    console.log(userName?.user, "is the user Name");
    return (
        <nav className='bg-bgColor pt-3'>
            <div className="max-w-7xl mx-auto flex justify-between items-center">
                <div className="flex items-center mx-2.5">

                    <Link to="/" className="ml-3 font-bold text-black">
                        Ink<span className='text-yellow-500 font-bold'>Well </span>
                    </Link>
                </div>
                <div className='flex items-center space-x-4'>
                    {userName?.user ? (<div className='flex items-center gap-4'>
                        <BlogWriteButton />
                        <Tooltip
                            content={
                                <div className="py-2">
                                    <Button className="w-full mb-2 justify-start" variant="light" onClick={() => { navigate("/profile") }}>
                                        profile
                                    </Button>
                                    <Button className="w-full mb-2 justify-start" variant="light" onClick={() => { navigate("/writeBlog") }}>
                                        write Blog
                                    </Button>
                                    <Button className="w-full justify-start" variant="light" onClick={() => { navigate("/yourBlog") }}>
                                        YourBlogs
                                    </Button>
                                    <Button className="w-full mb-2 justify-start" variant="light" onClick={handileLogout}>
                                        LogOut
                                    </Button>

                                </div>
                            }
                        >
                            <Avatar className='w-9'

                            />

                        </Tooltip>

                        <span className="text-sm font-medium">{userName?.user}</span></div>) : (
                        <Link to="/signup" className="text-lg bg-black text-white">
                            <Button className='bg-black text-white' >Get Started</Button>
                        </Link>)
                    }



                </div>
            </div>
            <hr className="mt-3 bg-black h-0.5" />
        </nav>
    )
}

export default NavBar
