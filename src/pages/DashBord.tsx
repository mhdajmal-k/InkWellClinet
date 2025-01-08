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
    const [hasMore, setHasMore] = useState(true);
    const dispatch: AppDispatch = useDispatch();
    useEffect(() => {

        fetchBlogs(1);
    }, []);

    const fetchBlogs = async (page: number) => {
        try {
            const response = await dispatch(getBlogs({ page, limit: 4 })).unwrap();
            if (page === 1) {
                setBlogs(response.result.blogs);
                setPreference(response.result.preferences);
            } else {
                setBlogs(prev => [...prev, ...response.result.blogs]);
            }
            setHasMore(response.hasMore);
        } catch (error: any) {
            toast(<CustomToast message={error.message || 'Failed to fetch blog'} type="error" />);

            console.error("Failed to fetch blogs:", error);
        }
    };

    return (
        <div><NavBar />
            <BlogListing blogs={blogs} preference={preference} who={"users"} hasMore={hasMore} onLoadMore={fetchBlogs} />
            <Footer />

        </div>
    )
}

export default DashBoard