import { Image } from '@nextui-org/react';
import React from 'react'
import { BlogType } from '../../utils/types/blogType';
import LikeButton from '../helpers/LikeButton';

interface BlogListingProps {
    blogs: BlogType | undefined
}

const ViewOneBlog: React.FC<BlogListingProps> = ({ blogs }) => {
    let paragraphs
    if (blogs) {
        paragraphs = blogs?.content.split(/\r?\n+/) || [];
    }

    return (
        <div>
            <article className="md:max-w-5xl max-w-sm mx-auto pt-8 container bg-white  mt-5 px-10 shadow-lg rounded-lg">

                <header className="space-y-6 mb-5">
                    <h1 className="my-5 text-blue-gray-700 text-3xl font-bold">
                        {blogs?.title}
                    </h1>
                    <LikeButton blogId={blogs?._id} like={blogs?.likes} dislike={blogs?.dislikes} />
                    <div className="flex items-center gap-4">

                        <div className="flex items-center gap-2 text-l font-bold text-muted-foreground">
                            <span>{blogs?.author?.firstName}</span>

                        </div>
                        {blogs?.createdAt.slice(0, 10)}
                    </div>
                    <div className='p-3'>
                        <span className="text-base w-2/4 text-center   text-black-600 mb-4 mt-1 font-medium bg-gray-400 rounded-md px-2">
                            {blogs?.category}            </span>

                    </div>
                </header>
                <div className="prose prose-gray max-w-none">
                    <Image
                        src={blogs?.image}
                        alt="error"
                        width={800}
                        height={400}
                        className="rounded-lg mb-8 w-full object-cover"
                    />
                    {paragraphs?.map((paragraph, index) => (
                        <p key={index} className="mb-4 leading-relaxed text-gray-700">
                            {paragraph}
                        </p>
                    ))}

                </div>
            </article>
        </div>
    )
}

export default ViewOneBlog
