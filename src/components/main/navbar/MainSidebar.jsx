import { Link, useLocation } from "react-router-dom";
import { CgArrangeBack } from "react-icons/cg";
import { 
  AiOutlineHome, 
  AiOutlineUserAdd, 
  AiOutlineFileAdd,
  AiOutlineForm,
  AiOutlineDashboard,
  AiOutlineNodeIndex,
  AiOutlineSetting,
  AiOutlineDrag,
  AiOutlineExperiment,
  AiOutlineApartment,
  AiOutlineBars,
  AiOutlineFileText,
  AiOutlineIdcard,
  AiOutlineLogout
} from "react-icons/ai";

import { authService } from "../api/rubyBackendService";

function MainSidebar() {
  const location = useLocation();
  
  // Check if a path is active
  const isActive = (path) => {
    return location.pathname === path || location.pathname.startsWith(path + '/');
  };
  
  // Logout handler
  const handleLogout = () => {
    authService.logout();
    window.location.href = '/';
  };

  return (
    <>
      <aside className="flex flex-col w-64 h-screen px-5 py-8 overflow-y-auto bg-white border-r rtl:border-r-0 rtl:border-l dark:bg-gray-900 dark:border-gray-700">
        <Link to="/main" className="flex items-center gap-2">
          <CgArrangeBack className="w-auto h-6 sm:h-7 text-red-800" />
          <span className="text-xl font-semibold">Arrange.ly</span>
        </Link>
        
        <div className="flex flex-col justify-between flex-1 mt-6">
          <nav className="flex-1 -mx-3 space-y-1">
            {/* Dashboard */}
            <Link
              to="/main"
              className={`flex items-center px-3 py-2 transition-colors duration-300 transform rounded-lg ${
                isActive("/main") && !isActive("/main/guests") && !isActive("/main/relationships") && 
                !isActive("/main/arrangement") && !isActive("/main/outputs") && !isActive("/main/settings")
                  ? "bg-blue-100 text-blue-800" 
                  : "text-gray-600 hover:bg-gray-100 hover:text-gray-700"
              }`}
            >
              <AiOutlineHome className="w-5 h-5" />
              <span className="mx-2 text-sm font-medium">Dashboard</span>
            </Link>
            
            {/* Guest Management Section */}
            <div className="pt-2 mt-2 space-y-1 border-t border-gray-200">
              <p className="px-3 text-xs font-semibold text-gray-500 uppercase">Guest Management</p>
              
              <Link
                to="/main/guests/add"
                className={`flex items-center px-3 py-2 transition-colors duration-300 transform rounded-lg ${
                  isActive("/main/guests/add") 
                    ? "bg-blue-100 text-blue-800" 
                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-700"
                }`}
              >
                <AiOutlineUserAdd className="w-5 h-5" />
                <span className="mx-2 text-sm font-medium">Add Guests</span>
              </Link>
              
              <Link
                to="/main/guests/import"
                className={`flex items-center px-3 py-2 transition-colors duration-300 transform rounded-lg ${
                  isActive("/main/guests/import") 
                    ? "bg-blue-100 text-blue-800" 
                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-700"
                }`}
              >
                <AiOutlineFileAdd className="w-5 h-5" />
                <span className="mx-2 text-sm font-medium">Import Guest List</span>
              </Link>
              
              <Link
                to="/main/guests/survey"
                className={`flex items-center px-3 py-2 transition-colors duration-300 transform rounded-lg ${
                  isActive("/main/guests/survey") 
                    ? "bg-blue-100 text-blue-800" 
                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-700"
                }`}
              >
                <AiOutlineForm className="w-5 h-5" />
                <span className="mx-2 text-sm font-medium">Guest Survey</span>
              </Link>
              
              <Link
                to="/main/guests/survey-dashboard"
                className={`flex items-center px-3 py-2 transition-colors duration-300 transform rounded-lg ${
                  isActive("/main/guests/survey-dashboard") 
                    ? "bg-blue-100 text-blue-800" 
                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-700"
                }`}
              >
                <AiOutlineDashboard className="w-5 h-5" />
                <span className="mx-2 text-sm font-medium">Survey Results</span>
              </Link>
            </div>
            
            {/* Relationships Section */}
            <div className="pt-2 mt-2 space-y-1 border-t border-gray-200">
              <p className="px-3 text-xs font-semibold text-gray-500 uppercase">Relationships</p>
              
              <Link
                to="/main/relationships"
                className={`flex items-center px-3 py-2 transition-colors duration-300 transform rounded-lg ${
                  isActive("/main/relationships") && !isActive("/main/relationships/editor")
                    ? "bg-blue-100 text-blue-800" 
                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-700"
                }`}
              >
                <AiOutlineNodeIndex className="w-5 h-5" />
                <span className="mx-2 text-sm font-medium">Relationship Graph</span>
              </Link>
              
              <Link
                to="/main/relationships/editor"
                className={`flex items-center px-3 py-2 transition-colors duration-300 transform rounded-lg ${
                  isActive("/main/relationships/editor") 
                    ? "bg-blue-100 text-blue-800" 
                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-700"
                }`}
              >
                <AiOutlineSetting className="w-5 h-5" />
                <span className="mx-2 text-sm font-medium">Edit Relationships</span>
              </Link>
            </div>
            
            {/* Arrangement Section */}
            <div className="pt-2 mt-2 space-y-1 border-t border-gray-200">
              <p className="px-3 text-xs font-semibold text-gray-500 uppercase">Arrangement</p>
              
              <Link
                to="/main/arrangement/details"
                className={`flex items-center px-3 py-2 transition-colors duration-300 transform rounded-lg ${
                  isActive("/main/arrangement/details") 
                    ? "bg-blue-100 text-blue-800" 
                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-700"
                }`}
              >
                <AiOutlineApartment className="w-5 h-5" />
                <span className="mx-2 text-sm font-medium">Venue Details</span>
              </Link>
              
              <Link
                to="/main/arrangement/optimize"
                className={`flex items-center px-3 py-2 transition-colors duration-300 transform rounded-lg ${
                  isActive("/main/arrangement/optimize") 
                    ? "bg-blue-100 text-blue-800" 
                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-700"
                }`}
              >
                <AiOutlineExperiment className="w-5 h-5" />
                <span className="mx-2 text-sm font-medium">Run Optimization</span>
              </Link>
              
              <Link
                to="/main/arrangement/manual"
                className={`flex items-center px-3 py-2 transition-colors duration-300 transform rounded-lg ${
                  isActive("/main/arrangement/manual") 
                    ? "bg-blue-100 text-blue-800" 
                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-700"
                }`}
              >
                <AiOutlineDrag className="w-5 h-5" />
                <span className="mx-2 text-sm font-medium">Manual Arrangement</span>
              </Link>
              
              <Link
                to="/main/arrangement/compare"
                className={`flex items-center px-3 py-2 transition-colors duration-300 transform rounded-lg ${
                  isActive("/main/arrangement/compare") 
                    ? "bg-blue-100 text-blue-800" 
                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-700"
                }`}
              >
                <AiOutlineBars className="w-5 h-5" />
                <span className="mx-2 text-sm font-medium">Compare Arrangements</span>
              </Link>
            </div>
            
            {/* Outputs Section */}
            <div className="pt-2 mt-2 space-y-1 border-t border-gray-200">
              <p className="px-3 text-xs font-semibold text-gray-500 uppercase">Outputs</p>
              
              <Link
                to="/main/outputs/reporting"
                className={`flex items-center px-3 py-2 transition-colors duration-300 transform rounded-lg ${
                  isActive("/main/outputs/reporting") 
                    ? "bg-blue-100 text-blue-800" 
                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-700"
                }`}
              >
                <AiOutlineBars className="w-5 h-5" />
                <span className="mx-2 text-sm font-medium">Reports</span>
              </Link>
              
              <Link
                to="/main/outputs/table-cards"
                className={`flex items-center px-3 py-2 transition-colors duration-300 transform rounded-lg ${
                  isActive("/main/outputs/table-cards") 
                    ? "bg-blue-100 text-blue-800" 
                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-700"
                }`}
              >
                <AiOutlineFileText className="w-5 h-5" />
                <span className="mx-2 text-sm font-medium">Table Cards</span>
              </Link>
              
              <Link
                to="/main/outputs/place-cards"
                className={`flex items-center px-3 py-2 transition-colors duration-300 transform rounded-lg ${
                  isActive("/main/outputs/place-cards") 
                    ? "bg-blue-100 text-blue-800" 
                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-700"
                }`}
              >
                <AiOutlineIdcard className="w-5 h-5" />
                <span className="mx-2 text-sm font-medium">Place Cards</span>
              </Link>
            </div>
            
            {/* Settings */}
            <div className="pt-2 mt-2 space-y-1 border-t border-gray-200">
              <Link
                to="/main/settings"
                className={`flex items-center px-3 py-2 transition-colors duration-300 transform rounded-lg ${
                  isActive("/main/settings") 
                    ? "bg-blue-100 text-blue-800" 
                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-700"
                }`}
              >
                <AiOutlineSetting className="w-5 h-5" />
                <span className="mx-2 text-sm font-medium">Settings</span>
              </Link>
            </div>
          </nav>
          
          <div className="mt-6 border-t border-gray-200 pt-4">
            <div className="flex items-center px-3 py-2">
              <div className="flex items-center gap-x-2">
                <img 
                  className="w-8 h-8 rounded-full"
                  src="https://eu.ui-avatars.com/api/?name=Tobe+Weds&background=random"
                  alt="User" 
                />
                <span className="text-sm font-medium text-gray-700">
                  Tobe Weds
                </span>
              </div>
            </div>
            
            <button
              onClick={handleLogout}
              className="flex items-center px-3 py-2 mt-2 w-full text-gray-600 transition-colors duration-300 transform rounded-lg hover:bg-gray-100 hover:text-gray-700"
            >
              <AiOutlineLogout className="w-5 h-5" />
              <span className="mx-2 text-sm font-medium">Logout</span>
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}

export default MainSidebar;