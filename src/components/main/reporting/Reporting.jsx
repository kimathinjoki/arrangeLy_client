import React, { useState } from 'react';

function Reporting() {
  const [selectedReport, setSelectedReport] = useState('guestSummary');
  
  // Mock data for reports
  const guestData = {
    total: 150,
    confirmed: 98,
    pending: 42,
    declined: 10,
    byRelationship: {
      family: 45,
      friends: 67,
      colleagues: 28,
      other: 10
    },
    byDietaryRestrictions: {
      none: 103,
      vegetarian: 22,
      vegan: 8,
      glutenFree: 12,
      dairyFree: 5
    }
  };
  
  const seatingData = {
    totalTables: 15,
    totalSeats: 150,
    seatsAssigned: 98,
    seatsUnassigned: 52,
    totalGuests: 150,
    guestsAssigned: 98,
    guestsUnassigned: 52
  };
  
  const renderReport = () => {
    switch(selectedReport) {
      case 'guestSummary':
        return (
          <div>
            <h3 className="text-lg font-medium mb-4">Guest Summary Report</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <div className="bg-white p-4 rounded-lg shadow">
                <p className="text-sm text-gray-500">Total Guests</p>
                <p className="text-2xl font-bold">{guestData.total}</p>
              </div>
              <div className="bg-green-100 p-4 rounded-lg shadow">
                <p className="text-sm text-green-600">Confirmed</p>
                <p className="text-2xl font-bold text-green-600">{guestData.confirmed}</p>
                <p className="text-xs text-green-600">{Math.round((guestData.confirmed / guestData.total) * 100)}%</p>
              </div>
              <div className="bg-yellow-100 p-4 rounded-lg shadow">
                <p className="text-sm text-yellow-600">Pending</p>
                <p className="text-2xl font-bold text-yellow-600">{guestData.pending}</p>
                <p className="text-xs text-yellow-600">{Math.round((guestData.pending / guestData.total) * 100)}%</p>
              </div>
              <div className="bg-red-100 p-4 rounded-lg shadow">
                <p className="text-sm text-red-600">Declined</p>
                <p className="text-2xl font-bold text-red-600">{guestData.declined}</p>
                <p className="text-xs text-red-600">{Math.round((guestData.declined / guestData.total) * 100)}%</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-lg shadow">
                <h4 className="text-md font-medium mb-4">Guests by Relationship</h4>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <div className="w-1/3">
                      <span className="text-sm text-gray-600">Family</span>
                    </div>
                    <div className="w-2/3">
                      <div className="overflow-hidden h-2 text-xs flex rounded bg-gray-200">
                        <div style={{ width: `${(guestData.byRelationship.family / guestData.total) * 100}%` }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500"></div>
                      </div>
                      <div className="flex justify-between text-xs text-gray-600 mt-1">
                        <span>{guestData.byRelationship.family} guests</span>
                        <span>{Math.round((guestData.byRelationship.family / guestData.total) * 100)}%</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <div className="w-1/3">
                      <span className="text-sm text-gray-600">Friends</span>
                    </div>
                    <div className="w-2/3">
                      <div className="overflow-hidden h-2 text-xs flex rounded bg-gray-200">
                        <div style={{ width: `${(guestData.byRelationship.friends / guestData.total) * 100}%` }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-green-500"></div>
                      </div>
                      <div className="flex justify-between text-xs text-gray-600 mt-1">
                        <span>{guestData.byRelationship.friends} guests</span>
                        <span>{Math.round((guestData.byRelationship.friends / guestData.total) * 100)}%</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <div className="w-1/3">
                      <span className="text-sm text-gray-600">Colleagues</span>
                    </div>
                    <div className="w-2/3">
                      <div className="overflow-hidden h-2 text-xs flex rounded bg-gray-200">
                        <div style={{ width: `${(guestData.byRelationship.colleagues / guestData.total) * 100}%` }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-purple-500"></div>
                      </div>
                      <div className="flex justify-between text-xs text-gray-600 mt-1">
                        <span>{guestData.byRelationship.colleagues} guests</span>
                        <span>{Math.round((guestData.byRelationship.colleagues / guestData.total) * 100)}%</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <div className="w-1/3">
                      <span className="text-sm text-gray-600">Other</span>
                    </div>
                    <div className="w-2/3">
                      <div className="overflow-hidden h-2 text-xs flex rounded bg-gray-200">
                        <div style={{ width: `${(guestData.byRelationship.other / guestData.total) * 100}%` }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-yellow-500"></div>
                      </div>
                      <div className="flex justify-between text-xs text-gray-600 mt-1">
                        <span>{guestData.byRelationship.other} guests</span>
                        <span>{Math.round((guestData.byRelationship.other / guestData.total) * 100)}%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow">
                <h4 className="text-md font-medium mb-4">Guests by Dietary Restrictions</h4>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <div className="w-1/3">
                      <span className="text-sm text-gray-600">None</span>
                    </div>
                    <div className="w-2/3">
                      <div className="overflow-hidden h-2 text-xs flex rounded bg-gray-200">
                        <div style={{ width: `${(guestData.byDietaryRestrictions.none / guestData.total) * 100}%` }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-gray-500"></div>
                      </div>
                      <div className="flex justify-between text-xs text-gray-600 mt-1">
                        <span>{guestData.byDietaryRestrictions.none} guests</span>
                        <span>{Math.round((guestData.byDietaryRestrictions.none / guestData.total) * 100)}%</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <div className="w-1/3">
                      <span className="text-sm text-gray-600">Vegetarian</span>
                    </div>
                    <div className="w-2/3">
                      <div className="overflow-hidden h-2 text-xs flex rounded bg-gray-200">
                        <div style={{ width: `${(guestData.byDietaryRestrictions.vegetarian / guestData.total) * 100}%` }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-green-500"></div>
                      </div>
                      <div className="flex justify-between text-xs text-gray-600 mt-1">
                        <span>{guestData.byDietaryRestrictions.vegetarian} guests</span>
                        <span>{Math.round((guestData.byDietaryRestrictions.vegetarian / guestData.total) * 100)}%</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <div className="w-1/3">
                      <span className="text-sm text-gray-600">Vegan</span>
                    </div>
                    <div className="w-2/3">
                      <div className="overflow-hidden h-2 text-xs flex rounded bg-gray-200">
                        <div style={{ width: `${(guestData.byDietaryRestrictions.vegan / guestData.total) * 100}%` }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-green-700"></div>
                      </div>
                      <div className="flex justify-between text-xs text-gray-600 mt-1">
                        <span>{guestData.byDietaryRestrictions.vegan} guests</span>
                        <span>{Math.round((guestData.byDietaryRestrictions.vegan / guestData.total) * 100)}%</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <div className="w-1/3">
                      <span className="text-sm text-gray-600">Gluten Free</span>
                    </div>
                    <div className="w-2/3">
                      <div className="overflow-hidden h-2 text-xs flex rounded bg-gray-200">
                        <div style={{ width: `${(guestData.byDietaryRestrictions.glutenFree / guestData.total) * 100}%` }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-yellow-500"></div>
                      </div>
                      <div className="flex justify-between text-xs text-gray-600 mt-1">
                        <span>{guestData.byDietaryRestrictions.glutenFree} guests</span>
                        <span>{Math.round((guestData.byDietaryRestrictions.glutenFree / guestData.total) * 100)}%</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <div className="w-1/3">
                      <span className="text-sm text-gray-600">Dairy Free</span>
                    </div>
                    <div className="w-2/3">
                      <div className="overflow-hidden h-2 text-xs flex rounded bg-gray-200">
                        <div style={{ width: `${(guestData.byDietaryRestrictions.dairyFree / guestData.total) * 100}%` }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-700"></div>
                      </div>
                      <div className="flex justify-between text-xs text-gray-600 mt-1">
                        <span>{guestData.byDietaryRestrictions.dairyFree} guests</span>
                        <span>{Math.round((guestData.byDietaryRestrictions.dairyFree / guestData.total) * 100)}%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
        
      case 'seatingArrangement':
        return (
          <div>
            <h3 className="text-lg font-medium mb-4">Seating Arrangement Report</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <div className="bg-white p-4 rounded-lg shadow">
                <p className="text-sm text-gray-500">Total Tables</p>
                <p className="text-2xl font-bold">{seatingData.totalTables}</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow">
                <p className="text-sm text-gray-500">Total Seats</p>
                <p className="text-2xl font-bold">{seatingData.totalSeats}</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow">
                <p className="text-sm text-gray-500">Seats Assigned</p>
                <p className="text-2xl font-bold">{seatingData.seatsAssigned}</p>
                <p className="text-xs text-gray-500">{Math.round((seatingData.seatsAssigned / seatingData.totalSeats) * 100)}%</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow">
                <p className="text-sm text-gray-500">Unassigned Seats</p>
                <p className="text-2xl font-bold">{seatingData.seatsUnassigned}</p>
                <p className="text-xs text-gray-500">{Math.round((seatingData.seatsUnassigned / seatingData.totalSeats) * 100)}%</p>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow mb-6">
              <h4 className="text-md font-medium mb-4">Seating Progress</h4>
              <div className="w-full bg-gray-200 rounded-full h-4">
                <div className="bg-blue-600 h-4 rounded-full" style={{ width: `${(seatingData.guestsAssigned / seatingData.totalGuests) * 100}%` }}></div>
              </div>
              <div className="flex justify-between mt-2 text-sm text-gray-600">
                <span>{seatingData.guestsAssigned} guests assigned</span>
                <span>{seatingData.guestsUnassigned} guests unassigned</span>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow">
              <h4 className="text-md font-medium mb-4">Table Assignment Status</h4>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Table Number</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Capacity</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Assigned</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Available</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {/* Sample table data */}
                    {[...Array(5)].map((_, index) => {
                      const tableNumber = index + 1;
                      const capacity = 10;
                      const assigned = Math.floor(Math.random() * (capacity + 1));
                      const available = capacity - assigned;
                      return (
                        <tr key={tableNumber}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Table {tableNumber}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{capacity}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{assigned}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{available}</td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              assigned === capacity 
                                ? 'bg-green-100 text-green-800' 
                                : assigned === 0 
                                  ? 'bg-red-100 text-red-800' 
                                  : 'bg-yellow-100 text-yellow-800'
                            }`}>
                              {assigned === capacity 
                                ? 'Full' 
                                : assigned === 0 
                                  ? 'Empty' 
                                  : 'Partially Filled'}
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        );
        
      case 'budgetTracking':
        return (
          <div>
            <h3 className="text-lg font-medium mb-4">Budget Tracking Report</h3>
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-yellow-700">
                    This feature is under development. Budget tracking will be available soon.
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow flex items-center justify-center h-64">
              <div className="text-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-400 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-gray-500">Budget tracking features coming soon!</p>
                <p className="text-gray-400 text-sm mt-2">Track expenses, manage budgets, and generate financial reports for your event.</p>
              </div>
            </div>
          </div>
        );
        
      default:
        return null;
    }
  };
  
  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold mb-6">Reporting</h1>
      
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <div className="flex flex-wrap">
          <button
            onClick={() => setSelectedReport('guestSummary')}
            className={`mr-4 mb-4 px-4 py-2 rounded-md ${
              selectedReport === 'guestSummary' 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
            }`}
          >
            Guest Summary
          </button>
          <button
            onClick={() => setSelectedReport('seatingArrangement')}
            className={`mr-4 mb-4 px-4 py-2 rounded-md ${
              selectedReport === 'seatingArrangement' 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
            }`}
          >
            Seating Arrangement
          </button>
          <button
            onClick={() => setSelectedReport('budgetTracking')}
            className={`mr-4 mb-4 px-4 py-2 rounded-md ${
              selectedReport === 'budgetTracking' 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
            }`}
          >
            Budget Tracking
          </button>
        </div>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        {renderReport()}
      </div>
      
      <div className="flex justify-end">
        <button className="mr-4 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
          <div className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Export to CSV
          </div>
        </button>
        <button className="bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
          <div className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
            </svg>
            Print Report
          </div>
        </button>
      </div>
    </div>
  );
}

export default Reporting;