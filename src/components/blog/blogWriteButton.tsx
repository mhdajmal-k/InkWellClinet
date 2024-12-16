import { Button } from '@nextui-org/react';
import React from 'react'
import { TfiWrite } from "react-icons/tfi";
import { useNavigate } from 'react-router-dom';

const BlogWriteButton: React.FC = () => {
    const navigate = useNavigate()
    return (
        <div className='flex items-center gap-2 '>
            <Button className='bg-black text-sm font-semibold text-white' onClick={() => { navigate("/writeBlog") }}>
                <TfiWrite />Write Blog
            </Button>
        </div>
    )
}

export default BlogWriteButton