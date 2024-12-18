/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react'
import NavBar from '../components/layOut/NavBar'
import Footer from '../components/layOut/Footer'
import { BlogListing } from '../components/blog/BlogCard'
import { BlogType } from '../utils/types/blogType'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../store/store'
import { getBlogs } from '../store/slices/userThunk'
import CustomToast from '../components/helpers/CustomToast'
import { toast } from 'sonner'

const DashBoard: React.FC = () => {
    const [blogs, setBlogs] = useState<BlogType[]>([]);
    const [preference, setPreference] = useState<string[]>([]);
    const dispatch: AppDispatch = useDispatch();
    useEffect(() => {

        fetchBlogs();
    }, []);

    const fetchBlogs = async () => {
        try {
            const response = await dispatch(getBlogs()).unwrap();
            setBlogs(response.result.blogs);
            setPreference(response.result.preferences
            );
        } catch (error: any) {
            toast(<CustomToast message={error.message || 'Failed to fetch blog'} type="error" />);

            console.error("Failed to fetch blogs:", error);
        }
    };

    return (
        <div><NavBar />
            <BlogListing blogs={blogs} preference={preference} who={"users"} />
            <Footer />

        </div>
    )
}

export default DashBoard