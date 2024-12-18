import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";
import { Button } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";
import { BlogType } from "../../utils/types/blogType";
import BlogWriteButton from "./blogWriteButton";


interface BlogListingProps {
    blogs: BlogType[];
    preference: string[];
    who: string

}


export const BlogListing: React.FC<BlogListingProps> = ({ blogs, preference, who }) => {
    const navigate = useNavigate()

    return (
        <div className="container p-4 min-h-screen ">
            <div className="flex justify-start">
                <div className=" flex gap-2">
                    <h1 className="bg-white px-4 rounded-xl text-black">For you</h1>
                    {preference && preference.map((value) => {
                        return <h1 className="bg-white px-4 rounded-xl text-black cursor-pointer hover:bg-slate-500 ">{value}</h1>

                    })}
                </div>
            </div>
            <div className="max-w-[90%] mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 my-6">

                {blogs.length > 0 ? (
                    blogs.map((value, index) => (
                        <Card
                            key={index}
                            className="w-full transition-transform hover:scale-100 shadow-lg rounded-lg overflow-hidden"
                        >
                            <div className="flex">
                                <CardHeader className="m-0 w-3/6 shrink-0 rounded-r-none overflow-hidden">
                                    <img
                                        src={value?.image}
                                        alt="card-image"
                                        className="h-full w-full object-cover rounded-md"
                                    />
                                </CardHeader>
                                <CardBody className="p-6">
                                    <span className="text-base w-2/4 text-center text-black-600 mb-4 mt-1 font-medium bg-gray-400 rounded-md">
                                        {value?.category}
                                    </span>
                                    <h4 className="mb-2 text-blue-gray-700 text-lg font-bold">
                                        {value?.title}
                                    </h4>
                                    <p className="mb-8 text-gray-600 font-normal leading-relaxed">
                                        {value?.content.substring(0, 150)}
                                    </p>
                                    {who == "users" ? (<Button
                                        className="flex items-center gap-2 transition-colors hover:bg-blue-500 bg-blue-600 text-white"
                                        onClick={() => navigate(`/blog/${value?._id}`)}
                                    >
                                        Read More {" -->"}
                                    </Button>) : who == "author" ? (<Button
                                        className="flex items-center gap-2 transition-colors hover:bg-blue-500 bg-blue-600 text-white"
                                        onClick={() => navigate(`/authorblog/${value._id}`)}
                                    >
                                        Read More {" -->"}
                                    </Button>) : ""}

                                </CardBody>
                            </div>
                            <div>
                                <CardFooter className="p-4 border-t justify-between border-gray-200 flex items-center space-x-4">
                                    <div className="flex gap-2 items-center">
                                        {/* <img
                                            src={value.author.}
                                            alt="author-avatar"
                                            className="h-10 w-10 rounded-full"
                                        /> */}
                                        <h6 className="font-semibold text-gray-700">{value?.author?.firstName}</h6>
                                    </div>
                                    <h1>{new Date(value?.createdAt).toLocaleDateString("en-US")}</h1>
                                </CardFooter>
                            </div>
                        </Card>
                    ))
                ) : (
                    <div>
                        <p>No blogs available</p>
                        <BlogWriteButton />
                    </div>

                )}
            </div>
        </div>
    );
};
