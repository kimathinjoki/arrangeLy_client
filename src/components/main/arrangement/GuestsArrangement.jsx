import React, { useState } from 'react';

function GuestsArrangement() {
  const [tables, setTables] = useState([
    { id: 1, name: 'Table 1', capacity: 10, guests: [] },
    { id: 2, name: 'Table 2', capacity: 10, guests: [] },
    { id: 3, name: 'Table 3', capacity: 10, guests: [] },
    { id: 4, name: 'Table 4', capacity: 10, guests: [] },
    { id: 5, name: 'Table 5', capacity: 10, guests: [] },
  ]);
  
  const [unassignedGuests, setUnassignedGuests] = useState([
    { id: 1, name: 'John Doe', relationship: 'Family', dietaryRestrictions: 'None' },
    { id: 2, name: 'Jane Smith', relationship: 'Family', dietaryRestrictions: 'Vegetarian' },
    { id: 3, name: 'Robert Johnson', relationship: 'Friend', dietaryRestrictions: 'None' },
    { id: 4, name: 'Emily Davis', relationship: 'Friend', dietaryRestrictions: 'Gluten-free' },
    { id: 5, name: 'Michael Brown', relationship: 'Colleague', dietaryRestrictions: 'None' },
    { id: 6, name: 'Sarah Wilson', relationship: 'Family', dietaryRestrictions: 'Vegan' },
    { id: 7, name: 'David Taylor', relationship: 'Friend', dietaryRestrictions: 'None' },
    { id: 8, name: 'Jennifer Garcia', relationship: 'Colleague', dietaryRestrictions: 'None' },
    { id: 9, name: 'James Martinez', relationship: 'Family', dietaryRestrictions: 'None' },
    { id: 10, name: 'Amanda Robinson', relationship: 'Friend', dietaryRestrictions: 'Dairy-free' },
  ]);
  
  const [selectedGuest, setSelectedGuest] = useState(null);
  const [selectedTable, setSelectedTable] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRelationship, setFilterRelationship] = useState('');
  
  const assignGuestToTable = (guestId, tableId) => {
    // Find the guest and table
    const guest = unassignedGuests.find(g => g.id === guestId);
    const tableIndex = tables.findIndex(t => t.id === tableId);
    
    if (!guest || tableIndex === -1) return;
    
    // Check if table has capacity
    if (tables[tableIndex].guests.length >= tables[tableIndex].capacity) {
      alert(`${tables[tableIndex].name} is already at full capacity!`);
      return;
    }
    
    // Add guest to table
    const updatedTables = [...tables];
    updatedTables[tableIndex].guests.push(guest);
    setTables(updatedTables);
    
    // Remove guest from unassigned list
    setUnassignedGuests(unassignedGuests.filter(g => g.id !== guestId));
    
    // Reset selections
    setSelectedGuest(null);
    setSelectedTable(null);
  };
  
  const removeGuestFromTable = (guestId, tableId) => {
    // Find the table
    const tableIndex = tables.findIndex(t => t.id === tableId);
    
    if (tableIndex === -1) return;
    
    // Find the guest in the table
    const guestIndex = tables[tableIndex].guests.findIndex(g => g.id === guestId);
    
    if (guestIndex === -1) return;
    
    // Remove guest from table
    const updatedTables = [...tables];
    const removedGuest = updatedTables[tableIndex].guests.splice(guestIndex, 1)[0];
    setTables(updatedTables);
    
    // Add guest back to unassigned list
    setUnassignedGuests([...unassignedGuests, removedGuest]);
  };
  
  const autoAssignGuests = () => {
    if (unassignedGuests.length === 0) return;
    
    const updatedTables = [...tables];
    let remainingGuests = [...unassignedGuests];
    
    // Simple algorithm: group by relationship and assign to tables
    const relationships = [...new Set(unassignedGuests.map(g => g.relationship))];
    
    relationships.forEach(relationship => {
      const guestsInRelationship = remainingGuests.filter(g => g.relationship === relationship);
      let guestsToAssign = [...guestsInRelationship];
      
      updatedTables.forEach(table => {
        // Calculate remaining capacity
        const remainingCapacity = table.capacity - table.guests.length;
        
        // Assign as many guests from this relationship as possible
        if (remainingCapacity > 0 && guestsToAssign.length > 0) {
          const guestsToAdd = guestsToAssign.splice(0, remainingCapacity);
          table.guests = [...table.guests, ...guestsToAdd];
          
          // Remove these guests from remainingGuests
          remainingGuests = remainingGuests.filter(g => !guestsToAdd.includes(g));
        }
      });
    });
    
    setTables(updatedTables);
    setUnassignedGuests(remainingGuests);
  };
  
  const clearAllTables = () => {
    // Move all guests back to unassigned
    const allGuests = [];
    tables.forEach(table => {
      allGuests.push(...table.guests);
    });
    
    // Clear tables
    const clearedTables = tables.map(table => ({ ...table, guests: [] }));
    
    setTables(clearedTables);
    setUnassignedGuests([...unassignedGuests, ...allGuests]);
  };
  
  const filteredUnassignedGuests = unassignedGuests.filter(guest => {
    const matchesSearch = guest.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRelationship = filterRelationship ? guest.relationship === filterRelationship : true;
    return matchesSearch && matchesRelationship;
  });
  
  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold mb-6">Guests Arrangement</h1>
      
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Left Side - Unassigned Guests */}
        <div className="w-full lg:w-1/3">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Unassigned Guests ({unassignedGuests.length})</h2>
              <button 
                onClick={autoAssignGuests}
                className="bg-green-600 hover:bg-green-700 text-white text-sm py-1 px-3 rounded"
              >
                Auto Assign
              </button>
            </div>
            
            <div className="mb- text-gray-700">
              <div className="flex gap-2 mb-2">
                <input
                  type="text"
                  placeholder="Search guests..."
                  className="flex-grow shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <select
                  className="shadow border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  value={filterRelationship}
                  onChange={(e) => setFilterRelationship(e.target.value)}
                >
                  <option value="">All</option>
                  <option value="Family">Family</option>
                  <option value="Friend">Friend</option>
                  <option value="Colleague">Colleague</option>
                </select>
              </div>
            </div>
            
            <div className="overflow-y-auto max-h-96">
              <ul className="divide-y divide-gray-200">
                {filteredUnassignedGuests.map(guest => (
                  <li 
                    key={guest.id} 
                    className={`py-3 px-2 flex items-center justify-between cursor-pointer hover:bg-gray-50 ${selectedGuest === guest.id ? 'bg-blue-50' : ''}`}
                    onClick={() => setSelectedGuest(guest.id)}
                  >
                    <div>
                      <p className="font-medium text-gray-700">{guest.name}</p>
                      <p className="text-sm text-gray-500">{guest.relationship}</p>
                      {guest.dietaryRestrictions !== 'None' && (
                        <span className="inline-block bg-yellow-100 text-yellow-800 text-xs px-2 py-0.5 rounded-full mt-1">
                          {guest.dietaryRestrictions}
                        </span>
                      )}
                    </div>
                    {selectedGuest === guest.id && selectedTable && (
                      <button
                        onClick={() => assignGuestToTable(guest.id, selectedTable)}
                        className="bg-blue-600 hover:bg-blue-700 text-white text-xs py-1 px-2 rounded"
                      >
                        Assign
                      </button>
                    )}
                  </li>
                ))}
                {filteredUnassignedGuests.length === 0 && (
                  <li className="py-3 px-2 text-center text-gray-500">
                    No unassigned guests found.
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>
        
        {/* Right Side - Tables */}
        <div className="w-full lg:w-2/3">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg text-gray-700 font-semibold">Tables</h2>
              <button 
                onClick={clearAllTables}
                className="bg-red-600 hover:bg-red-700 text-white text-sm py-1 px-3 rounded"
              >
                Clear All Tables
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {tables.map(table => (
                <div 
                  key={table.id} 
                  className={`border text-gray-700 rounded-lg p-4 ${selectedTable === table.id ? 'border-blue-500 ring-2 ring-blue-200' : 'border-gray-200'}`}
                  onClick={() => setSelectedTable(table.id)}
                >
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="text-gray-700 font-medium">{table.name}</h3>
                    <span className={`text-sm ${table.guests.length === table.capacity ? 'text-red-500' : 'text-gray-500'}`}>
                      {table.guests.length}/{table.capacity} seats
                    </span>
                  </div>
                  
                  <div className="overflow-y-auto text-gray-700 max-h-40">
                    {table.guests.length > 0 ? (
                      <ul className="divide-y divide-gray-200">
                        {table.guests.map(guest => (
                          <li key={guest.id} className="py-2 flex justify-between items-center">
                            <div>
                              <p className="text-sm text-gray-700 font-medium">{guest.name}</p>
                              <div className="flex gap-1 mt-1">
                                <span className="inline-block bg-gray-100 text-gray-800 text-xs px-2 py-0.5 rounded-full">
                                  {guest.relationship}
                                </span>
                                {guest.dietaryRestrictions !== 'None' && (
                                  <span className="inline-block bg-yellow-100 text-yellow-800 text-xs px-2 py-0.5 rounded-full">
                                    {guest.dietaryRestrictions}
                                  </span>
                                )}
                              </div>
                            </div>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                removeGuestFromTable(guest.id, table.id);
                              }}
                              className="text-red-600 hover:text-red-800 text-xs"
                            >
                              Remove
                            </button>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <div className="text-center text-gray-500 py-4">
                        <p>No guests assigned to this table.</p>
                        {selectedGuest && (
                          <button
                            onClick={() => assignGuestToTable(selectedGuest, table.id)}
                            className="mt-2 bg-blue-600 hover:bg-blue-700 text-white text-xs py-1 px-2 rounded"
                          >
                            Assign Selected Guest
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Arrangement Visualization */}
          <div className="mt-6 bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold mb-4">Arrangement Visualization</h2>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 flex items-center justify-center h-64">
              <div className="text-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-400 mx-auto mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2" />
                </svg>
                <p className="text-gray-500">Interactive table layout coming soon!</p>
                <p className="text-gray-400 text-sm mt-2">This feature will allow you to visually arrange tables in your venue.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GuestsArrangement;