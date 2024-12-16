/* eslint-disable @typescript-eslint/no-explicit-any */


import { useDispatch } from "react-redux";
import { AppDispatch } from "../store/store";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { BlogType } from "../utils/types/blogType";
import CustomToast from "../components/helpers/CustomToast";
import { toast } from "sonner";
import NavBar from "../components/layOut/NavBar";
import Footer from "../components/layOut/Footer";
import ViewOneBlog from "../components/blog/ViewBlog";
import { fetchOneBlog } from "../store/slices/userThunk";

const ViewBlogUserSide: React.FC = () => {
    const dispatch: AppDispatch = useDispatch();
    const { blogId } = useParams()
    const [blogs, setBlogs] = useState<BlogType>();
    useEffect(() => {
        const fetchBlog = async () => {
            try {

                const response = await dispatch(fetchOneBlog(blogId as string)).unwrap();
                setBlogs(response.result)
            } catch (error: any) {
                toast(<CustomToast message={error.message || 'Failed to fetch blog'} type="error" />);
            }
        };

        if (blogId) {
            fetchBlog();
        }
    }, [blogId, dispatch]);

    return (
        <div>
            <NavBar />
            <ViewOneBlog blogs={blogs} />

            <Footer />
        </div>
    )
}

export default ViewBlogUserSide
