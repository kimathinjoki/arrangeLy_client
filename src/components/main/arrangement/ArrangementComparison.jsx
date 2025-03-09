import React, { useState } from 'react';

function ArrangementComparison() {
  const [arrangements, setArrangements] = useState([
    {
      id: 1,
      name: 'Arrangement 1 (Optimized for Family Groups)',
      dateCreated: '2025-03-05T14:30:00',
      status: 'current',
      metrics: {
        satisfactionScore: 87,
        conflictScore: 95,
        balanceScore: 82,
        overallScore: 88
      },
      tables: [
        {
          id: 1,
          name: 'Table 1',
          capacity: 8,
          guests: [
            { name: 'John Smith', relationship: 'Family', dietaryNeeds: [] },
            { name: 'Mary Smith', relationship: 'Family', dietaryNeeds: [] },
            { name: 'Amanda Robinson', relationship: 'Family', dietaryNeeds: [] },
            { name: 'William Davis', relationship: 'Family', dietaryNeeds: ['Vegetarian'] },
            { name: 'Elizabeth Taylor', relationship: 'Family', dietaryNeeds: [] },
            { name: 'Michael Brown', relationship: 'Friend', dietaryNeeds: [] },
            { name: 'Sarah Wilson', relationship: 'Friend', dietaryNeeds: [] },
          ]
        },
        {
          id: 2,
          name: 'Table 2',
          capacity: 8,
          guests: [
            { name: 'Robert Johnson', relationship: 'Family', dietaryNeeds: [] },
            { name: 'Emma Johnson', relationship: 'Family', dietaryNeeds: [] },
            { name: 'Thomas White', relationship: 'Family', dietaryNeeds: [] },
            { name: 'Susan Anderson', relationship: 'Family', dietaryNeeds: ['Gluten-Free'] },
            { name: 'Richard Thomas', relationship: 'Friend', dietaryNeeds: [] },
            { name: 'Jessica Lee', relationship: 'Friend', dietaryNeeds: [] },
          ]
        },
        {
          id: 3,
          name: 'Table 3',
          capacity: 8,
          guests: [
            { name: 'David Miller', relationship: 'Friend', dietaryNeeds: [] },
            { name: 'Jennifer Garcia', relationship: 'Colleague', dietaryNeeds: [] },
            { name: 'James Martinez', relationship: 'Colleague', dietaryNeeds: [] },
            { name: 'Joseph Clark', relationship: 'Friend', dietaryNeeds: [] },
            { name: 'Margaret Lewis', relationship: 'Friend', dietaryNeeds: ['Vegetarian'] },
            { name: 'Charles Walker', relationship: 'Friend', dietaryNeeds: [] },
            { name: 'Patricia Allen', relationship: 'Friend', dietaryNeeds: [] },
          ]
        }
      ]
    },
    {
      id: 2,
      name: 'Arrangement 2 (Optimized for Social Dynamics)',
      dateCreated: '2025-03-05T15:45:00',
      status: 'saved',
      metrics: {
        satisfactionScore: 92,
        conflictScore: 86,
        balanceScore: 90,
        overallScore: 89
      },
      tables: [
        {
          id: 1,
          name: 'Table 1',
          capacity: 8,
          guests: [
            { name: 'John Smith', relationship: 'Family', dietaryNeeds: [] },
            { name: 'Mary Smith', relationship: 'Family', dietaryNeeds: [] },
            { name: 'Michael Brown', relationship: 'Friend', dietaryNeeds: [] },
            { name: 'Sarah Wilson', relationship: 'Friend', dietaryNeeds: [] },
            { name: 'David Miller', relationship: 'Friend', dietaryNeeds: [] },
            { name: 'Jennifer Garcia', relationship: 'Colleague', dietaryNeeds: [] },
          ]
        },
        {
          id: 2,
          name: 'Table 2',
          capacity: 8,
          guests: [
            { name: 'Robert Johnson', relationship: 'Family', dietaryNeeds: [] },
            { name: 'Emma Johnson', relationship: 'Family', dietaryNeeds: [] },
            { name: 'Jessica Lee', relationship: 'Friend', dietaryNeeds: [] },
            { name: 'Joseph Clark', relationship: 'Friend', dietaryNeeds: [] },
            { name: 'Margaret Lewis', relationship: 'Friend', dietaryNeeds: ['Vegetarian'] },
            { name: 'Richard Thomas', relationship: 'Friend', dietaryNeeds: [] },
            { name: 'William Davis', relationship: 'Family', dietaryNeeds: ['Vegetarian'] },
          ]
        },
        {
          id: 3,
          name: 'Table 3',
          capacity: 8,
          guests: [
            { name: 'Amanda Robinson', relationship: 'Family', dietaryNeeds: [] },
            { name: 'Thomas White', relationship: 'Family', dietaryNeeds: [] },
            { name: 'Susan Anderson', relationship: 'Family', dietaryNeeds: ['Gluten-Free'] },
            { name: 'Charles Walker', relationship: 'Friend', dietaryNeeds: [] },
            { name: 'Patricia Allen', relationship: 'Friend', dietaryNeeds: [] },
            { name: 'James Martinez', relationship: 'Colleague', dietaryNeeds: [] },
            { name: 'Elizabeth Taylor', relationship: 'Family', dietaryNeeds: [] },
          ]
        }
      ]
    },
    {
      id: 3,
      name: 'Manual Arrangement (Your Custom Setup)',
      dateCreated: '2025-03-06T10:15:00',
      status: 'draft',
      metrics: {
        satisfactionScore: 85,
        conflictScore: 89,
        balanceScore: 78,
        overallScore: 84
      },
      tables: [
        {
          id: 1,
          name: 'Table 1',
          capacity: 8,
          guests: [
            { name: 'John Smith', relationship: 'Family', dietaryNeeds: [] },
            { name: 'Mary Smith', relationship: 'Family', dietaryNeeds: [] },
            { name: 'Amanda Robinson', relationship: 'Family', dietaryNeeds: [] },
            { name: 'Michael Brown', relationship: 'Friend', dietaryNeeds: [] },
            { name: 'Sarah Wilson', relationship: 'Friend', dietaryNeeds: [] },
            { name: 'David Miller', relationship: 'Friend', dietaryNeeds: [] },
          ]
        },
        {
          id: 2,
          name: 'Table 2',
          capacity: 8,
          guests: [
            { name: 'Robert Johnson', relationship: 'Family', dietaryNeeds: [] },
            { name: 'Emma Johnson', relationship: 'Family', dietaryNeeds: [] },
            { name: 'Thomas White', relationship: 'Family', dietaryNeeds: [] },
            { name: 'Susan Anderson', relationship: 'Family', dietaryNeeds: ['Gluten-Free'] },
            { name: 'William Davis', relationship: 'Family', dietaryNeeds: ['Vegetarian'] },
            { name: 'Elizabeth Taylor', relationship: 'Family', dietaryNeeds: [] },
          ]
        },
        {
          id: 3,
          name: 'Table 3',
          capacity: 8,
          guests: [
            { name: 'Jennifer Garcia', relationship: 'Colleague', dietaryNeeds: [] },
            { name: 'James Martinez', relationship: 'Colleague', dietaryNeeds: [] },
            { name: 'Richard Thomas', relationship: 'Friend', dietaryNeeds: [] },
            { name: 'Jessica Lee', relationship: 'Friend', dietaryNeeds: [] },
            { name: 'Joseph Clark', relationship: 'Friend', dietaryNeeds: [] },
            { name: 'Margaret Lewis', relationship: 'Friend', dietaryNeeds: ['Vegetarian'] },
            { name: 'Charles Walker', relationship: 'Friend', dietaryNeeds: [] },
            { name: 'Patricia Allen', relationship: 'Friend', dietaryNeeds: [] },
          ]
        }
      ]
    }
  ]);

  const [selectedArrangements, setSelectedArrangements] = useState([1, 2]);
  const [viewMode, setViewMode] = useState('tables'); // tables, metrics, guests
  const [searchTerm, setSearchTerm] = useState('');
  const [highlightedGuest, setHighlightedGuest] = useState(null);

  const handleSelectArrangement = (id) => {
    if (selectedArrangements.includes(id)) {
      // If already selected, remove it (unless it would result in less than 1 selection)
      if (selectedArrangements.length > 1) {
        setSelectedArrangements(selectedArrangements.filter(arrId => arrId !== id));
      }
    } else {
      // If not selected, add it (max 2 selections)
      if (selectedArrangements.length < 2) {
        setSelectedArrangements([...selectedArrangements, id]);
      } else {
        // Replace the first selection with the new one
        setSelectedArrangements([selectedArrangements[1], id]);
      }
    }
  };

  const setAsCurrent = (id) => {
    // Update statuses
    const updatedArrangements = arrangements.map(arr => ({
      ...arr,
      status: arr.id === id ? 'current' : arr.status === 'current' ? 'saved' : arr.status
    }));
    setArrangements(updatedArrangements);
  };

  const findGuest = (name) => {
    const results = [];
    arrangements.forEach(arr => {
      arr.tables.forEach(table => {
        const guestIndex = table.guests.findIndex(g => 
          g.name.toLowerCase().includes(name.toLowerCase())
        );
        
        if (guestIndex !== -1) {
          results.push({
            arrangementId: arr.id,
            arrangementName: arr.name,
            tableId: table.id,
            tableName: table.name,
            guest: table.guests[guestIndex]
          });
        }
      });
    });
    return results;
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm) {
      setHighlightedGuest(searchTerm);
    } else {
      setHighlightedGuest(null);
    }
  };

  const handleExport = (format) => {
    alert(`Exporting arrangements in ${format} format`);
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'current':
        return <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">Current</span>;
      case 'saved':
        return <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800">Saved</span>;
      case 'draft':
        return <span className="px-2 py-1 text-xs rounded-full bg-yellow-100 text-yellow-800">Draft</span>;
      default:
        return null;
    }
  };

  const renderArrangementMetrics = (arrangement) => {
    return (
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-3 rounded-lg bg-blue-50">
          <p className="text-xs text-blue-600">Guest Satisfaction</p>
          <div className="flex justify-between items-end">
            <p className="text-xl font-bold">{arrangement.metrics.satisfactionScore}%</p>
            <div className="h-4 w-full max-w-[100px] bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-blue-600 rounded-full"
                style={{ width: `${arrangement.metrics.satisfactionScore}%` }}
              ></div>
            </div>
          </div>
        </div>
        <div className="p-3 rounded-lg bg-green-50">
          <p className="text-xs text-green-600">Conflict Resolution</p>
          <div className="flex justify-between items-end">
            <p className="text-xl font-bold">{arrangement.metrics.conflictScore}%</p>
            <div className="h-4 w-full max-w-[100px] bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-green-600 rounded-full"
                style={{ width: `${arrangement.metrics.conflictScore}%` }}
              ></div>
            </div>
          </div>
        </div>
        <div className="p-3 rounded-lg bg-purple-50">
          <p className="text-xs text-purple-600">Table Balance</p>
          <div className="flex justify-between items-end">
            <p className="text-xl font-bold">{arrangement.metrics.balanceScore}%</p>
            <div className="h-4 w-full max-w-[100px] bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-purple-600 rounded-full"
                style={{ width: `${arrangement.metrics.balanceScore}%` }}
              ></div>
            </div>
          </div>
        </div>
        <div className="p-3 rounded-lg bg-gray-50">
          <p className="text-xs text-gray-600">Overall Score</p>
          <div className="flex justify-between items-end">
            <p className="text-xl font-bold">{arrangement.metrics.overallScore}%</p>
            <div className="h-4 w-full max-w-[100px] bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-gray-800 rounded-full"
                style={{ width: `${arrangement.metrics.overallScore}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderTableComparison = () => {
    // Get the selected arrangements
    const selected = arrangements.filter(arr => selectedArrangements.includes(arr.id));
    if (selected.length === 0) return null;

    const allTables = [];
    selected.forEach(arr => {
      arr.tables.forEach(table => {
        if (!allTables.includes(table.name)) {
          allTables.push(table.name);
        }
      });
    });

    allTables.sort();

    return (
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-32">Table</th>
              {selected.map(arr => (
                <th key={arr.id} className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {arr.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {allTables.map((tableName, index) => (
              <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">{tableName}</td>
                {selected.map(arr => {
                  const table = arr.tables.find(t => t.name === tableName);
                  return (
                    <td key={`${arr.id}-${tableName}`} className="px-4 py-3 text-sm text-gray-500">
                      {table ? (
                        <div>
                          <div className="flex justify-between mb-1">
                            <span>{table.guests.length}/{table.capacity} seats</span>
                          </div>
                          <ul className="space-y-1">
                            {table.guests.map((guest, idx) => (
                              <li 
                                key={idx} 
                                className={`py-0.5 px-1 rounded ${
                                  highlightedGuest && guest.name.toLowerCase().includes(highlightedGuest.toLowerCase())
                                    ? 'bg-yellow-100'
                                    : ''
                                }`}
                              >
                                {guest.name}
                                {guest.dietaryNeeds.length > 0 && (
                                  <span className="ml-1 text-xs bg-blue-100 text-blue-800 px-1 rounded-full">
                                    {guest.dietaryNeeds[0]}
                                  </span>
                                )}
                              </li>
                            ))}
                          </ul>
                        </div>
                      ) : (
                        <span className="text-gray-400 italic">Table not in this arrangement</span>
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  const renderGuestSearch = () => {
    const results = searchTerm ? findGuest(searchTerm) : [];

    return (
      <div>
        <form onSubmit={handleSearch} className="mb-6">
          <div className="flex">
            <input
              type="text"
              placeholder="Search for a guest..."
              className="flex-grow px-4 py-2 border rounded-l"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded-r hover:bg-blue-700"
            >
              Find Guest
            </button>
          </div>
        </form>

        {results.length > 0 ? (
          <div className="space-y-4">
            <h3 className="font-medium">Search Results for "{searchTerm}":</h3>
            {results.map((result, index) => (
              <div key={index} className="bg-blue-50 p-4 rounded-lg shadow-sm">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-medium">{result.guest.name}</p>
                    <p className="text-sm text-gray-600">
                      Seated at <span className="font-medium">{result.tableName}</span> in <span className="font-medium">{result.arrangementName}</span>
                    </p>
                    {result.guest.dietaryNeeds.length > 0 && (
                      <div className="mt-1">
                        <span className="text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full">
                          {result.guest.dietaryNeeds.join(', ')}
                        </span>
                      </div>
                    )}
                  </div>
                  <button
                    onClick={() => {
                      handleSelectArrangement(result.arrangementId);
                      setViewMode('tables');
                    }}
                    className="text-blue-600 text-sm"
                  >
                    View Arrangement
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : searchTerm ? (
          <div className="text-center py-6 text-gray-500">
            <p>No guests found matching "{searchTerm}"</p>
          </div>
        ) : (
          <div className="text-center py-6 text-gray-500">
            <p>Enter a guest name to find their seating assignment</p>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl text-gray-600 font-bold mb-6">Compare Arrangements</h1>
      
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg text-gray-700 font-semibold">Seating Arrangements</h2>
          <div className="flex space-x-2">
            <div className="relative">
              <button className="bg-gray-200 text-gray-800 py-2 px-4 rounded hover:bg-gray-300 inline-flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                Export
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg hidden group-hover:block z-10">
                <div className="py-1">
                  <button 
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                    onClick={() => handleExport('pdf')}
                  >
                    Export as PDF
                  </button>
                  <button 
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                    onClick={() => handleExport('excel')}
                  >
                    Export as Excel
                  </button>
                  <button 
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                    onClick={() => handleExport('json')}
                  >
                    Export as JSON
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {arrangements.map(arrangement => (
            <div 
              key={arrangement.id} 
              className={`border rounded-lg p-4 text-gray-700 cursor-pointer ${
                selectedArrangements.includes(arrangement.id) 
                  ? 'border-blue-500 bg-blue-50' 
                  : 'hover:bg-gray-50'
              }`}
              onClick={() => handleSelectArrangement(arrangement.id)}
            >
              <div className="flex justify-between items-start mb-3">
                <h3 className="font-medium text-gray-700">
                  {arrangement.name}
                </h3>
                {getStatusBadge(arrangement.status)}
              </div>
              <p className="text-sm text-gray-500 mb-2">
                Created: {new Date(arrangement.dateCreated).toLocaleString()}
              </p>
              <p className="text-sm mb-3">
                {arrangement.tables.reduce((sum, table) => sum + table.guests.length, 0)} guests across {arrangement.tables.length} tables
              </p>
              <div className="flex justify-between items-center">
                <div className="flex items-center text-sm">
                  <span className="mr-1 text-gray-700">Score:</span>
                  <span className="font-medium">{arrangement.metrics.overallScore}%</span>
                </div>
                {arrangement.status !== 'current' && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setAsCurrent(arrangement.id);
                    }}
                    className="text-sm text-blue-600 hover:text-blue-800"
                  >
                    Set as Current
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
        
        <div className="mb-6">
          <div className="border-b">
            <nav className="flex -mb-px">
              <button
                onClick={() => setViewMode('tables')}
                className={`mr-8 py-4 text-sm font-medium ${
                  viewMode === 'tables'
                    ? 'border-b-2 border-blue-500 text-blue-600'
                    : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Table Comparison
              </button>
              <button
                onClick={() => setViewMode('metrics')}
                className={`mr-8 py-4 text-sm font-medium ${
                  viewMode === 'metrics'
                    ? 'border-b-2 border-blue-500 text-blue-600'
                    : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Metrics Comparison
              </button>
              <button
                onClick={() => setViewMode('guests')}
                className={`py-4 text-sm font-medium ${
                  viewMode === 'guests'
                    ? 'border-b-2 border-blue-500 text-blue-600'
                    : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Find Guests
              </button>
            </nav>
          </div>
        </div>
        
        {viewMode === 'tables' && renderTableComparison()}
        
        {viewMode === 'metrics' && (
          <div className="space-y-8 text-gray-700">
            {arrangements
              .filter(arr => selectedArrangements.includes(arr.id))
              .map(arrangement => (
                <div key={arrangement.id} className="border rounded-lg p-4">
                  <h3 className="font-medium mb-3">{arrangement.name}</h3>
                  {renderArrangementMetrics(arrangement)}
                </div>
              ))}
          </div>
        )}
        
        {viewMode === 'guests' && renderGuestSearch()}
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-lg text-gray-700 font-semibold mb-4">Arrangement Analytics</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="border rounded-lg p-4">
            <h3 className="font-medium text-gray-700 mb-3">Family Group Distribution</h3>
            <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
              <p className="text-gray-500">Family distribution chart</p>
            </div>
          </div>
          
          <div className="border rounded-lg p-4">
            <h3 className="font-medium mb-3">Relationship Satisfaction</h3>
            <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
              <p className="text-gray-500">Relationship satisfaction chart</p>
            </div>
          </div>
        </div>
        
        <div className="mt-6 text-center text-sm text-gray-500">
          <p>The visualization charts above would show detailed analytics about each arrangement's effectiveness.</p>
          <p>In a production implementation, these would be interactive D3.js charts showing guest distribution patterns.</p>
        </div>
      </div>
    </div>
  );
}

export default ArrangementComparison;