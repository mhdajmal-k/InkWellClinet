import React from 'react'
import NavBar from '../components/layOut/NavBar'
import Footer from '../components/layOut/Footer'
import BlogWriteForm from '../components/blog/WriteBlog'

const WriteBlog: React.FC = () => {
    return (
        <div>
            <NavBar />
            <BlogWriteForm />
            <Footer />
        </div>
    )
}

export default WriteBlog