import React from 'react'
import NavBar from '../components/layOut/NavBar'
import Footer from '../components/layOut/Footer'
import ProfileDisplay from '../components/auth/ProfileDAta'

const Profile = () => {
    return (
        <div><NavBar />
            <ProfileDisplay />
            <Footer /></div>
    )
}

export default Profile