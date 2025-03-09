import HeroNavbar from "../navbar/HeroNavbar";
import { Outlet } from "react-router-dom";

function Hero () {

    return (
        <>

            <header className="bg-gray-900 pattern">
                <div className="container px-6 mx-auto">


                    <HeroNavbar />


                    <div className="flex flex-col items-center py-6 lg:h-screen lg:flex-row">
                    <div className="lg:w-1/2">
                        <h1 className="text-3xl font-semibold text-red-800 lg:text-4xl">Arrange.<span className="text-green-800">ly</span></h1>

                        <h3 className="mt-2 text-2xl font-semibold text-gray-400">
                        Perfect Seating,  <span className="text-gray-900 text-with-shadow"> Perfect Celebration</span>
                        </h3>

                        <p className="mt-4 text-2xl font-bold text-red-900 text-with-shadow">Sit Back and Let Science Seat Your Guests. Blend family dynamics, friendships, and social preferences into a seating chart everyone will love.</p>
                    </div>

                    <div className="flex mt-8 lg:w-1/2 lg:justify-end lg:mt-0">


                        

                        <Outlet/>



                    </div>
                    </div>
                </div>
                
                {/* Pattern style */}
                <style jsx>{`
                    .pattern {
                        background-image: url("https://images-ext-1.discordapp.net/external/WL9Sc8epwfm50S9Ts66RnggTZzlNpdDQ5PtxFM95DXQ/https/www.theweddingsecret.co.uk/img/uploads/businessgallery-webp/5a5f18bd19959_image14.jpg.webp?format=webp&width=2000&height=1280");
                        background-size: cover;
                        background-position: center;
                        background-repeat: no-repeat;
                    }
                    
                    .text-with-shadow {
                        text-shadow: 0px 0px 8px rgba(255, 255, 255, 0.8), 
                                    1px 1px 3px rgba(0, 0, 0, 0.6);
                    }
                `}</style>
             </header>

        </>
    )
}

export default Hero;