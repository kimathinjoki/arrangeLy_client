import { Link } from "react-router-dom";
import { CgArrangeBack } from "react-icons/cg";

function HeroNavbar () {

    return (
        <>
        <nav className="flex flex-col py-6 sm:flex-row sm:justify-between sm:items-center">
                    <Link to="/" className="flex items-center gap-2">
                        <CgArrangeBack className="w-auto h-6 sm:h-7 text-red-800" />
                        <span>Arrange.ly</span>
                    </Link>

                    <div className="flex items-center mt-2 -mx-2 sm:mt-0">
                        <Link to="/" className="px-3 py-1 text-sm font-semibold text-white transition-colors duration-300 transform border-2 rounded-md hover:bg-gray-700">Sign In</Link>
                        <Link to="signup" className="px-3 py-2 mx-2 text-sm font-semibold text-white transition-colors duration-300 transform bg-black rounded-md hover:bg-gray-800">Sign Up</Link>
                    </div>
        </nav>
        </>
    )
}

export default HeroNavbar;