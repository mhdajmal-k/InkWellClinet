import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PublicRoute from './PublicRoute';
import ProtectRoute from './ProtectRoute';
import LoadingFallback from '../components/helpers/LoadingFallBack';
import ViewBlogUserSide from '../pages/BlogView';
import Profile from '../pages/Profile';
import ViewBlogUser from '../pages/YourBlogs';
import ViewBlogAuthorSide from '../pages/AuthorBlogView';

const HomePage = lazy(() => import('../pages/HomePage'));
const SignUpPage = lazy(() => import('../pages/SignUpPage'));
const SignIn = lazy(() => import('../pages/LoginPage'));
const WriteBlog = lazy(() => import('../pages/WriteBlog'));
const DashBoard = lazy(() => import('../pages/DashBord'));
// const ViewBlogUserSide = lazy(() => import('../pages/ViewBlogUserSide')); // Assuming this is your blog view page


const AppRoutes: React.FC = () => {
    return (
        <BrowserRouter>
            <Suspense fallback={<LoadingFallback />}>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route element={<PublicRoute />}>
                        <Route path="/signup" element={<SignUpPage />} />
                        <Route path="/login" element={<SignIn />} />
                    </Route>

                    <Route element={<ProtectRoute />}>
                        <Route path="/dashBoard" element={<DashBoard />} />
                        <Route path="/profile" element={<Profile />} />
                        <Route path="/writeBlog" element={<WriteBlog />} />
                        <Route path="/blog/:blogId" element={<ViewBlogUserSide />} />
                        <Route path="/authorblog/:blogId" element={<ViewBlogAuthorSide />} />
                        <Route path="/yourBlog" element={<ViewBlogUser />} />
                    </Route>

                    <Route path="*" element={<h1>Not Found</h1>} />
                </Routes>
            </Suspense>
        </BrowserRouter>
    );
};

export default AppRoutes;
