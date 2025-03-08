

function HeroNavbar () {

    return (
        <>
        <nav className="flex flex-col py-6 sm:flex-row sm:justify-between sm:items-center">
                    <a href="#">
                        <img className="w-auto h-6 sm:h-7" src="/api/placeholder/120/40" alt="Logo" />
                    </a>

                    <div className="flex items-center mt-2 -mx-2 sm:mt-0">
                        <a href="#" className="px-3 py-1 text-sm font-semibold text-white transition-colors duration-300 transform border-2 rounded-md hover:bg-gray-700">Sign In</a>
                        <a href="#" className="px-3 py-2 mx-2 text-sm font-semibold text-white transition-colors duration-300 transform bg-black rounded-md hover:bg-gray-800">Sign Up</a>
                    </div>
        </nav>
        </>
    )
}

export default HeroNavbar;