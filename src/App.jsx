import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from 'react';

import Hero from "./components/hero/Hero"
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";

// Auth Components

import PrivateRoute from "./components/auth/PrivateRoute";

// Layout Components
import Main from "./components/main/layout/Main";

// Dashboard Components
import Home from "./components/main/dashboard/Home";

// Guest Management Components
import AddGuests from "./components/main/guests/AddGuests";
import ImportGuestsList from "./components/main/guests/ImportGuestsList";
import GuestSurvey from "./components/main/guests/GuestSurvey";
import SurveyDashboard from "./components/main/guests/SurveyDashboard";

// Relationship Management Components
import RelationshipGraph from "./components/main/relationships/RelationshipGraph";
import RelationshipEditor from "./components/main/relationships/RelationshipEditor";

// Arrangement Components
import ArrangementDetails from "./components/main/arrangement/ArrangementDetails";
import GuestsArrangement from "./components/main/arrangement/GuestsArrangement";
import OptimizationRunner from "./components/main/arrangement/OptimizationRunner";
import ArrangementComparison from "./components/main/arrangement/ArrangementComparison";

// Output Components
import Reporting from "./components/main/reporting/Reporting";
import TableCards from "./components/main/reporting/TableCards";
import PlaceCards from "./components/main/reporting/PlaceCards";

// Settings Component
import Settings from "./components/main/settings/Settings";

// Services
import { authService } from './api/rubyBackendService';
import GuestSurveyResponse from "./components/main/guests/GuestSurveyResponse";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Check if user is authenticated
    const checkAuth = async () => {
      const authenticated = authService.isAuthenticated();
      setIsAuthenticated(authenticated);
      setIsLoading(false);
    };
    
    checkAuth();
  }, []);
  
  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  return (
      <Routes>
        {/* Public Routes */}
        <Route element={<Hero />}>
          <Route 
            path="/" 
            element={isAuthenticated ? <Navigate to="/main" replace /> : <Login setIsAuthenticated={setIsAuthenticated} />} 
          />
          <Route 
            path="/signup" 
            element={isAuthenticated ? <Navigate to="/main" replace /> : <Signup setIsAuthenticated={setIsAuthenticated} />} 
          />
        </Route>
        
        {/* Survey Response Route (accessed via shared link, no auth required) */}
        <Route path="/survey/:token" element={<GuestSurveyResponse />} />
        
        {/* Protected Routes */}
        <Route 
          path="/main" 
          element={
            <PrivateRoute isAuthenticated={isAuthenticated}>
              <Main />
            </PrivateRoute>
          }
        >
          {/* Dashboard */}
          <Route index element={<Home />} />
          
          {/* Guest Management */}
          <Route path="guests">
            <Route index element={<Navigate to="/main/guests/add" replace />} />
            <Route path="add" element={<AddGuests />} />
            <Route path="import" element={<ImportGuestsList />} />
            <Route path="survey" element={<GuestSurvey />} />
            <Route path="survey-dashboard" element={<SurveyDashboard />} />
          </Route>
          
          {/* Relationship Management */}
          <Route path="relationships">
            <Route index element={<RelationshipGraph />} />
            <Route path="editor" element={<RelationshipEditor />} />
          </Route>
          
          {/* Arrangement */}
          <Route path="arrangement">
            <Route index element={<Navigate to="/main/arrangement/details" replace />} />
            <Route path="details" element={<ArrangementDetails />} />
            <Route path="optimize" element={<OptimizationRunner />} />
            <Route path="manual" element={<GuestsArrangement />} />
            <Route path="compare" element={<ArrangementComparison />} />
          </Route>
          
          {/* Outputs */}
          <Route path="outputs">
            <Route index element={<Navigate to="/main/outputs/reporting" replace />} />
            <Route path="reporting" element={<Reporting />} />
            <Route path="table-cards" element={<TableCards />} />
            <Route path="place-cards" element={<PlaceCards />} />
          </Route>
          
          {/* Settings */}
          <Route path="settings" element={<Settings />} />
          
          {/* Fallback redirect */}
          <Route path="*" element={<Navigate to="/main" replace />} />
        </Route>
      </Routes>
   
  );
}

export default App;