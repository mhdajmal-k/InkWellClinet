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
import { DeleteBlog, fetchOneBlog } from "../store/slices/userThunk";
import { Button } from "@nextui-org/react";

const ViewBlogAuthorSide: React.FC = () => {
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
    const handelDelete = async () => {
        try {
            alert("delete")
            const response = await dispatch(DeleteBlog(blogId as string)).unwrap();
            setBlogs(response.result)
            toast(<CustomToast message={response.message || 'Failed to fetch blog'} type="success" />);
        } catch (error: any) {
            toast(<CustomToast message={error.message || 'Failed to fetch blog'} type="error" />);
        }
    }
    return (
        <div>
            <NavBar />
            <div className=" md:max-w-5xl max-w-sm    px-10 container mt-5 flex justify-end">
                <div className="flex items-center gap-2">
                    <Button className="bg-red-600 flex" onClick={handelDelete}>Delete</Button>
                    <Button className="bg-yellow-400 flex">Edit</Button>
                </div>


            </div>
            <ViewOneBlog blogs={blogs} />


            <Footer />
        </div>
    )
}

export default ViewBlogAuthorSide
