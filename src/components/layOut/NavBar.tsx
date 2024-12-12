import React from 'react'
import log from "../../assets/images/Logo.png"
import { Link } from 'react-router-dom'
import { Button } from '@nextui-org/react'

const NavBar: React.FC = () => {

    return (
        <nav className='bg-bgColor pt-3'>
            <div className="max-w-7xl mx-auto flex justify-between items-center">
                <div className="flex items-center mx-2.5">
                    <img src={log} alt='logo' className='w-10'></img>
                    <Link to="/" className="ml-3 font-bold text-black">
                        InkWell
                    </Link>
                </div>
                <div className='flex items-center'>
                    <Link to="/signup" className="text-lg bg-black text-white">
                        <Button className='bg-black text-white' >Get Started</Button>
                    </Link>


                </div>
            </div>
            <hr className="mt-3 bg-black h-0.5" />
        </nav>
    )
}

export default NavBar
