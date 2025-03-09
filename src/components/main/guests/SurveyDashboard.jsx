import React, { useState } from 'react';

function SurveyDashboard() {
  // Mock data - in a real app this would come from your API
  const [surveyData, setSurveyData] = useState({
    id: "survey-123",
    title: "Wedding Seating Arrangement Survey",
    dateCreated: "2025-02-15",
    totalInvitations: 150,
    responseStats: {
      totalSent: 150,
      totalResponses: 87,
      responseRate: 58,
      pending: 63,
      attending: 80,
      notAttending: 7
    },
    questions: [
      {
        id: 1,
        question: "Relationship to the Couple",
        type: "select",
        responses: [
          { option: "Bride's Family", count: 25 },
          { option: "Groom's Family", count: 23 },
          { option: "Mutual Friend", count: 15 },
          { option: "Bride's Friend", count: 10 },
          { option: "Groom's Friend", count: 8 },
          { option: "Colleague", count: 5 },
          { option: "Other", count: 1 }
        ]
      },
      {
        id: 2,
        question: "Age Range",
        type: "select",
        responses: [
          { option: "Under 18", count: 5 },
          { option: "18-25", count: 12 },
          { option: "26-35", count: 30 },
          { option: "36-50", count: 25 },
          { option: "51+", count: 15 }
        ]
      },
      {
        id: 3,
        question: "Are you comfortable sitting with people you don't know?",
        type: "radio",
        responses: [
          { option: "Very comfortable", count: 20 },
          { option: "Somewhat comfortable", count: 35 },
          { option: "Neutral", count: 15 },
          { option: "Somewhat uncomfortable", count: 12 },
          { option: "Very uncomfortable", count: 5 }
        ]
      },
      {
        id: 4,
        question: "How likely are you to dance at the reception?",
        type: "radio",
        responses: [
          { option: "Will be on the dance floor all night!", count: 25 },
          { option: "Will dance occasionally", count: 30 },
          { option: "Only for special dances", count: 15 },
          { option: "Unlikely to dance", count: 10 },
          { option: "Definitely won't dance", count: 7 }
        ]
      },
      {
        id: 5,
        question: "Do you have any dietary restrictions?",
        type: "checkbox",
        responses: [
          { option: "Vegetarian", count: 12 },
          { option: "Vegan", count: 5 },
          { option: "Gluten-Free", count: 7 },
          { option: "Dairy-Free", count: 6 },
          { option: "Nut Allergy", count: 8 },
          { option: "Other", count: 4 },
          { option: "None", count: 55 }
        ]
      }
    ],
    guestResponses: [
      { 
        id: 1, 
        name: "John Smith", 
        email: "john.smith@example.com", 
        timeSubmitted: "2025-02-16T14:23:00",
        status: "attending",
        relationship: "Bride's Family",
        preferences: "Would like to sit with the Jones family",
        dietaryRestrictions: ["Gluten-Free"]
      },
      { 
        id: 2, 
        name: "Emma Johnson", 
        email: "emma.j@example.com", 
        timeSubmitted: "2025-02-17T09:10:00",
        status: "attending",
        relationship: "Groom's Friend",
        preferences: "No specific preferences",
        dietaryRestrictions: []
      },
      { 
        id: 3, 
        name: "Michael Brown", 
        email: "michael.b@example.com", 
        timeSubmitted: "2025-02-17T16:05:00",
        status: "attending",
        relationship: "Colleague",
        preferences: "Would prefer not to sit with Robert Thomas",
        dietaryRestrictions: ["Vegetarian"]
      },
      { 
        id: 4, 
        name: "Sarah Wilson", 
        email: "sarah.w@example.com", 
        timeSubmitted: "2025-02-18T10:30:00",
        status: "not attending",
        relationship: "Bride's Friend",
        preferences: "",
        dietaryRestrictions: []
      },
      { 
        id: 5, 
        name: "David Miller", 
        email: "david.m@example.com", 
        timeSubmitted: "2025-02-19T11:45:00",
        status: "attending",
        relationship: "Mutual Friend",
        preferences: "Would like to sit near the dance floor",
        dietaryRestrictions: ["Nut Allergy"]
      }
    ]
  });

  const [selectedView, setSelectedView] = useState('overview');
  const [searchTerm, setSearchTerm] = useState('');
  const [showRemindModal, setShowRemindModal] = useState(false);
  const [selectedGuests, setSelectedGuests] = useState([]);

  // Filter guests based on search term
  const filteredGuests = surveyData.guestResponses.filter(guest => 
    guest.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    guest.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelectAllGuests = (e) => {
    if (e.target.checked) {
      setSelectedGuests(surveyData.guestResponses.map(guest => guest.id));
    } else {
      setSelectedGuests([]);
    }
  };

  const handleSelectGuest = (id) => {
    if (selectedGuests.includes(id)) {
      setSelectedGuests(selectedGuests.filter(guestId => guestId !== id));
    } else {
      setSelectedGuests([...selectedGuests, id]);
    }
  };

  const sendReminders = () => {
    // In a real app, this would make an API call to send reminders
    alert(`Reminders sent to ${selectedGuests.length} guests!`);
    setShowRemindModal(false);
    setSelectedGuests([]);
  };

  const exportResponses = () => {
    // In a real app, this would generate a CSV file for download
    alert('Exporting survey responses as CSV...');
  };

  // Helper function to calculate the percentage for progress bars
  const calculatePercent = (count, total) => {
    return total > 0 ? Math.round((count / total) * 100) : 0;
  };

  // Function to render a simple bar chart for response options
  const renderResponseBarChart = (responses, totalResponses) => {
    return (
      <div className="space-y-3 mt-2">
        {responses.map((response, index) => {
          const percentage = calculatePercent(response.count, totalResponses);
          return (
            <div key={index}>
              <div className="flex justify-between text-sm mb-1">
                <span>{response.option}</span>
                <span className="text-gray-600">{response.count} ({percentage}%)</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div 
                  className="bg-blue-600 h-2.5 rounded-full" 
                  style={{ width: `${percentage}%` }}
                ></div>
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold mb-6">Survey Dashboard</h1>
      
      {/* Survey Overview */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h2 className="text-xl font-semibold">{surveyData.title}</h2>
            <p className="text-gray-600 text-sm">Created on {new Date(surveyData.dateCreated).toLocaleDateString()}</p>
          </div>
          <div className="flex space-x-3">
            <button 
              onClick={() => setShowRemindModal(true)}
              className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
            >
              Send Reminders
            </button>
            <button 
              onClick={exportResponses}
              className="bg-gray-200 text-gray-800 py-2 px-4 rounded hover:bg-gray-300"
            >
              Export Responses
            </button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          <div className="bg-blue-50 p-4 rounded-lg">
            <p className="text-sm text-blue-600">Response Rate</p>
            <p className="text-2xl font-bold">{surveyData.responseStats.responseRate}%</p>
            <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
              <div 
                className="bg-blue-600 h-2.5 rounded-full" 
                style={{ width: `${surveyData.responseStats.responseRate}%` }}
              ></div>
            </div>
            <p className="text-xs text-gray-600 mt-2">
              {surveyData.responseStats.totalResponses} of {surveyData.responseStats.totalSent} responded
            </p>
          </div>
          
          <div className="bg-green-50 p-4 rounded-lg">
            <p className="text-sm text-green-600">Attending</p>
            <p className="text-2xl font-bold">{surveyData.responseStats.attending}</p>
            <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
              <div 
                className="bg-green-600 h-2.5 rounded-full" 
                style={{ width: `${calculatePercent(surveyData.responseStats.attending, surveyData.responseStats.totalSent)}%` }}
              ></div>
            </div>
            <p className="text-xs text-gray-600 mt-2">
              {calculatePercent(surveyData.responseStats.attending, surveyData.responseStats.totalSent)}% of total invitations
            </p>
          </div>
          
          <div className="bg-yellow-50 p-4 rounded-lg">
            <p className="text-sm text-yellow-600">Pending Responses</p>
            <p className="text-2xl font-bold">{surveyData.responseStats.pending}</p>
            <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
              <div 
                className="bg-yellow-500 h-2.5 rounded-full" 
                style={{ width: `${calculatePercent(surveyData.responseStats.pending, surveyData.responseStats.totalSent)}%` }}
              ></div>
            </div>
            <p className="text-xs text-gray-600 mt-2">
              {calculatePercent(surveyData.responseStats.pending, surveyData.responseStats.totalSent)}% of total invitations
            </p>
          </div>
        </div>
      </div>
      
      {/* View Tabs */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
        <div className="flex border-b">
          <button
            className={`px-4 py-2 font-medium text-sm ${
              selectedView === 'overview' 
                ? 'bg-blue-50 text-blue-600 border-b-2 border-blue-500' 
                : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
            }`}
            onClick={() => setSelectedView('overview')}
          >
            Response Overview
          </button>
          <button
            className={`px-4 py-2 font-medium text-sm ${
              selectedView === 'individual' 
                ? 'bg-blue-50 text-blue-600 border-b-2 border-blue-500' 
                : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
            }`}
            onClick={() => setSelectedView('individual')}
          >
            Individual Responses
          </button>
          <button
            className={`px-4 py-2 font-medium text-sm ${
              selectedView === 'analysis' 
                ? 'bg-blue-50 text-blue-600 border-b-2 border-blue-500' 
                : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
            }`}
            onClick={() => setSelectedView('analysis')}
          >
            Response Analysis
          </button>
        </div>
      </div>
      
      {/* Selected View Content */}
      {selectedView === 'overview' && (
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-lg font-semibold mb-4">Response Summary</h2>
          
          {surveyData.questions.slice(0, 5).map((question, index) => (
            <div key={index} className="mb-6 pb-6 border-b border-gray-200 last:border-b-0 last:mb-0 last:pb-0">
              <h3 className="font-medium mb-2">{question.question}</h3>
              {renderResponseBarChart(question.responses, surveyData.responseStats.totalResponses)}
            </div>
          ))}
        </div>
      )}
      
      {selectedView === 'individual' && (
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Individual Responses</h2>
            <div className="relative">
              <input
                type="text"
                placeholder="Search by name or email"
                className="pl-10 pr-4 py-2 border rounded-lg"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="py-3 px-4 text-left">
                    <input
                      type="checkbox"
                      className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                      checked={selectedGuests.length === surveyData.guestResponses.length}
                      onChange={handleSelectAllGuests}
                    />
                  </th>
                  <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Guest</th>
                  <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Relationship</th>
                  <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Dietary Needs</th>
                  <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date Submitted</th>
                  <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredGuests.map(guest => (
                  <tr key={guest.id}>
                    <td className="py-4 px-4">
                      <input
                        type="checkbox"
                        className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                        checked={selectedGuests.includes(guest.id)}
                        onChange={() => handleSelectGuest(guest.id)}
                      />
                    </td>
                    <td className="py-4 px-4">
                      <div className="font-medium text-gray-900">{guest.name}</div>
                      <div className="text-gray-500 text-sm">{guest.email}</div>
                    </td>
                    <td className="py-4 px-4">
                      <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        guest.status === 'attending' 
                          ? 'bg-green-100 text-green-800' 
                          : guest.status === 'not attending' 
                            ? 'bg-red-100 text-red-800' 
                            : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {guest.status === 'attending' 
                          ? 'Attending' 
                          : guest.status === 'not attending' 
                            ? 'Not Attending' 
                            : 'Pending'}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-sm text-gray-500">{guest.relationship}</td>
                    <td className="py-4 px-4">
                      {guest.dietaryRestrictions.length > 0 ? (
                        <div className="flex flex-wrap gap-1">
                          {guest.dietaryRestrictions.map((restriction, idx) => (
                            <span key={idx} className="bg-blue-100 text-blue-800 text-xs px-2 py-0.5 rounded">
                              {restriction}
                            </span>
                          ))}
                        </div>
                      ) : (
                        <span className="text-sm text-gray-500">None</span>
                      )}
                    </td>
                    <td className="py-4 px-4 text-sm text-gray-500">
                      {new Date(guest.timeSubmitted).toLocaleString()}
                    </td>
                    <td className="py-4 px-4 text-sm">
                      <button className="text-blue-600 hover:text-blue-800 mr-3">View Details</button>
                    </td>
                  </tr>
                ))}
                {filteredGuests.length === 0 && (
                  <tr>
                    <td colSpan="7" className="py-4 text-center text-gray-500">
                      No matching guests found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
      
      {selectedView === 'analysis' && (
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-lg font-semibold mb-4">Response Analysis</h2>
          
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-yellow-700">
                  Advanced analysis is being processed. This data will be used to generate optimal seating arrangements.
                </p>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-medium mb-3">Guest Relationship Distribution</h3>
              <div className="bg-gray-100 p-4 rounded-lg">
                {/* Placeholder for the relationship chart */}
                <div className="h-60 flex items-center justify-center">
                  <p className="text-gray-500">Relationship chart loading...</p>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="font-medium mb-3">Seating Preferences Overview</h3>
              <div className="bg-gray-100 p-4 rounded-lg">
                {/* Placeholder for the preferences chart */}
                <div className="h-60 flex items-center justify-center">
                  <p className="text-gray-500">Preferences analysis loading...</p>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="font-medium mb-3">Dietary Restrictions</h3>
              <div className="bg-gray-100 p-4 rounded-lg">
                {/* Placeholder for the dietary chart */}
                <div className="h-60 flex items-center justify-center">
                  <p className="text-gray-500">Dietary chart loading...</p>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="font-medium mb-3">Social Dynamics</h3>
              <div className="bg-gray-100 p-4 rounded-lg">
                {/* Placeholder for the social dynamics chart */}
                <div className="h-60 flex items-center justify-center">
                  <p className="text-gray-500">Social dynamics chart loading...</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Reminder Modal */}
      {showRemindModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <h3 className="text-lg font-semibold mb-4">Send Reminders</h3>
            <p className="text-sm text-gray-600 mb-4">
              {selectedGuests.length > 0 
                ? `Send a reminder to ${selectedGuests.length} selected guests?` 
                : 'No guests selected. Please select guests from the table to send reminders.'}
            </p>
            
            {selectedGuests.length > 0 && (
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Reminder Message (optional)</label>
                <textarea
                  className="w-full p-2 border rounded"
                  rows="3"
                  placeholder="Add a personal message to your reminder..."
                ></textarea>
              </div>
            )}
            
            <div className="mt-6 flex justify-end space-x-3">
              <button
                className="bg-gray-200 text-gray-800 py-2 px-4 rounded hover:bg-gray-300"
                onClick={() => setShowRemindModal(false)}
              >
                Cancel
              </button>
              <button
                className={`py-2 px-4 rounded ${
                  selectedGuests.length > 0 
                    ? 'bg-blue-600 text-white hover:bg-blue-700' 
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
                onClick={sendReminders}
                disabled={selectedGuests.length === 0}
              >
                Send Reminders
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default SurveyDashboard;