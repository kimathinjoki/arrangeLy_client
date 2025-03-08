import MainSidebar from "../navbar/MainSidebar";
import { Outlet } from "react-router-dom";



function Main () {

    return (
        <>
        <div className="flex min-h-screen">
            <div className="w-64 flex-shrink-0">
                <MainSidebar />
            </div>
            
            <div className="flex-grow p-6">
                <Outlet />
            </div>
        </div>
        </>
    )
}

export default Main;