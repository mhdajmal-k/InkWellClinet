import React from "react";
import NavBar from "../components/layOut/NavBar";
import Footer from "../components/layOut/Footer";
import HomePageHeroSection from "../components/heroSeciton/HomePageHeroSecion";




const HomePage: React.FC = () => {
    return (

        <div className="sm:min-h-screen">
            <NavBar />
            <HomePageHeroSection />
            <Footer />
        </div>
    );
};

export default HomePage;
