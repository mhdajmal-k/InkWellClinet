import { useDispatch } from "react-redux";
import { AppDispatch } from "../store/store";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { BlogType } from "../utils/types/blogType";
import CustomToast from "../components/helpers/CustomToast";
import { toast } from "sonner";
import NavBar from "../components/layOut/NavBar";
import Footer from "../components/layOut/Footer";
import ViewOneBlog from "../components/blog/ViewBlog";
import { DeleteBlog, fetchOneBlog } from "../store/slices/userThunk";
import { Button } from "@nextui-org/react";

const EditBlogAuthorSide: React.FC = () => {
    const dispatch: AppDispatch = useDispatch();
    const { blogId } = useParams();
    const [blogs, setBlogs] = useState<BlogType>();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const response = await dispatch(fetchOneBlog(blogId as string)).unwrap();
                setBlogs(response.result);
            } catch (error: any) {
                toast(<CustomToast message={error.message || "Failed to fetch blog"} type="error" />);
            }
        };

        if (blogId) {
            fetchBlog();
        }
    }, [blogId, dispatch]);

    const handleDelete = async () => {
        try {
            const response = await dispatch(DeleteBlog(blogId as string)).unwrap();
            toast(<CustomToast message={response.message || "Blog deleted successfully"} type="success" />);
            navigate("/yourBlog");
        } catch (error: any) {
            toast(<CustomToast message={error.message || "Failed to delete blog"} type="error" />);
        }
    };
    const handleEdit = () => {

        navigate(`/editBlog/${blogId}`);
    };


    const confirmDelete = () => {
        toast(
            () => (
                <div>
                    <p>Are you sure you want to delete this blog?</p>
                    <div className="flex justify-end gap-2 mt-2">
                        <Button
                            size="sm"
                            className="bg-red-600 text-white"
                            onClick={() => {
                                toast.dismiss(); // Close the confirmation toast
                                handleDelete();  // Proceed with deletion
                            }}
                        >
                            Yes, Delete
                        </Button>
                        <Button
                            size="sm"
                            className="bg-gray-300 text-black"
                            onClick={() => toast.dismiss()} // Close the confirmation toast without action
                        >
                            Cancel
                        </Button>
                    </div>
                </div>
            ),
            {
                duration: Infinity, // Keep the toast open until dismissed
            }
        );
    };

    return (
        <div>
            <NavBar />
            <div className="md:max-w-5xl max-w-sm px-10 container mt-5 flex justify-end">
                <div className="flex items-center gap-2">
                    <Button className="bg-red-600 flex" onClick={confirmDelete}>
                        Delete
                    </Button>
                    <Button className="bg-yellow-400 flex" onClick={handleEdit}>Edit</Button>
                </div>
            </div>
            <ViewOneBlog blogs={blogs} />
            <Footer />
        </div>
    );
};

export default EditBlogAuthorSide;
