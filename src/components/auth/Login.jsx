import { useNavigate } from "react-router-dom";



function Login () {

    const navigate = useNavigate()



    return (
        <div className="w-full max-w-md bg-white rounded-lg dark:bg-gray-800">
                        <div className="px-6 py-8 text-center">
                            <h2 className="text-2xl font-semibold text-gray-700 dark:text-white">Sign In</h2>

                            <form action="#">
                            <div className="mt-4">
                                <input 
                                className="block w-full px-4 py-2 text-gray-700 placeholder-gray-400 bg-white border rounded-md dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-500 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-opacity-40 focus:ring-blue-300 focus:outline-none focus:ring" 
                                type="email" 
                                placeholder="Email address" 
                                aria-label="Email address"
                                />
                                <input 
                                className="block w-full px-4 py-2 mt-4 text-gray-700 placeholder-gray-400 bg-white border rounded-md dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-500 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-opacity-40 focus:ring-blue-300 focus:outline-none focus:ring" 
                                type="password" 
                                placeholder="Password" 
                                aria-label="Password"
                                />
                            </div>

                            <div className="flex items-center justify-between mt-4">
                                <a href="#" className="text-sm text-gray-600 dark:text-gray-200 hover:underline">Forget Password?</a>

                                <button
                                 className="px-6 py-2 font-medium text-white transition-colors duration-300 transform bg-gray-900 rounded-md hover:bg-gray-800 dark:hover:bg-gray-700 focus:outline-none focus:bg-gray-800 dark:focus:bg-gray-700"
                                 onClick={() => navigate('/main')}
                                 >Sign In</button>
                            </div>
                            </form>
                        </div>
                        </div>
    )
}

export default Login;