import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import HomePage from '../pages/HomePage'
import SignUpPage from '../pages/SignUpPage'

const AppRoutes: React.FC = () => {
    return (

        <BrowserRouter>
            <Routes>
                <Route path='/' element={<HomePage />} />
                <Route path='/signup' element={<SignUpPage />} />
                <Route path="*" element={<h1>not found</h1>} />
            </Routes>

        </BrowserRouter>
    )
}

export default AppRoutes