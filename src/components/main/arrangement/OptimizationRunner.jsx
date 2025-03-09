import React, { useState } from 'react';

function OptimizationRunner() {
  const [optimizationConfig, setOptimizationConfig] = useState({
    numberOfTables: 5,
    seatsPerTable: 8,
    prioritizeRelationships: true,
    keepFamiliesTogether: true,
    balanceTables: true,
    distributeExtroverts: true,
    avoidConflicts: true,
    includeSpecialTables: false,
    specialTableCount: 0,
    optimizationStrength: 0.7, // 0-1 value for how strongly to weigh constraints
    maxRunTime: 30, // seconds
  });

  const [optimizationStatus, setOptimizationStatus] = useState({
    running: false,
    progress: 0,
    status: 'idle', // idle, running, complete, error
    message: '',
    startTime: null,
    endTime: null,
  });

  const [optimizationResults, setOptimizationResults] = useState({
    solutionFound: false,
    arrangements: [],
    metrics: {
      satisfactionScore: 0,
      conflictScore: 0,
      balanceScore: 0,
      overallScore: 0
    }
  });

  const handleConfigChange = (e) => {
    const { name, value, type, checked } = e.target;
    setOptimizationConfig({
      ...optimizationConfig,
      [name]: type === 'checkbox' ? checked : type === 'number' ? parseInt(value) : value
    });
  };

  const startOptimization = () => {
    // In a real app, this would make an API call to your Python ML service
    setOptimizationStatus({
      running: true,
      progress: 0,
      status: 'running',
      message: 'Initializing optimization algorithm...',
      startTime: new Date(),
      endTime: null,
    });
    
    // Simulate optimization progress
    let progress = 0;
    const progressInterval = setInterval(() => {
      progress += 5;
      setOptimizationStatus(prev => ({
        ...prev,
        progress,
        message: getProgressMessage(progress)
      }));
      
      if (progress >= 100) {
        clearInterval(progressInterval);
        
        // Simulate completion
        setOptimizationStatus({
          running: false,
          progress: 100,
          status: 'complete',
          message: 'Optimization complete. Generated 3 possible arrangements.',
          startTime: optimizationStatus.startTime,
          endTime: new Date(),
        });
        
        // Set mock results
        setOptimizationResults({
          solutionFound: true,
          arrangements: [
            {
              id: 1,
              name: 'Arrangement 1 (Optimized for Family Groups)',
              tables: generateMockTables(optimizationConfig.numberOfTables, optimizationConfig.seatsPerTable, 'family'),
              metrics: {
                satisfactionScore: 87,
                conflictScore: 95,
                balanceScore: 82,
                overallScore: 88
              }
            },
            {
              id: 2,
              name: 'Arrangement 2 (Optimized for Social Dynamics)',
              tables: generateMockTables(optimizationConfig.numberOfTables, optimizationConfig.seatsPerTable, 'social'),
              metrics: {
                satisfactionScore: 92,
                conflictScore: 86,
                balanceScore: 90,
                overallScore: 89
              }
            },
            {
              id: 3,
              name: 'Arrangement 3 (Balanced Approach)',
              tables: generateMockTables(optimizationConfig.numberOfTables, optimizationConfig.seatsPerTable, 'balanced'),
              metrics: {
                satisfactionScore: 85,
                conflictScore: 89,
                balanceScore: 94,
                overallScore: 89
              }
            }
          ],
          metrics: {
            satisfactionScore: 92,
            conflictScore: 95,
            balanceScore: 90,
            overallScore: 92
          }
        });
      }
    }, 300);
  };

  const getProgressMessage = (progress) => {
    if (progress < 20) {
      return 'Analyzing guest relationships...';
    } else if (progress < 40) {
      return 'Building constraint graph...';
    } else if (progress < 60) {
      return 'Generating initial table assignments...';
    } else if (progress < 80) {
      return 'Optimizing seating arrangements...';
    } else {
      return 'Finalizing and scoring arrangements...';
    }
  };

  const generateMockTables = (numTables, seatsPerTable, optimizationType) => {
    // Generate mock table data for demonstration
    const tables = [];
    
    // Guest names to distribute
    const guestNames = [
      'John Smith', 'Mary Smith', 'Robert Johnson', 'Emma Johnson',
      'Michael Brown', 'Sarah Wilson', 'David Miller', 'Jennifer Garcia',
      'James Martinez', 'Amanda Robinson', 'William Davis', 'Elizabeth Taylor',
      'Thomas White', 'Susan Anderson', 'Richard Thomas', 'Jessica Lee',
      'Joseph Clark', 'Margaret Lewis', 'Charles Walker', 'Patricia Allen',
      'Daniel Young', 'Nancy King', 'Matthew Wright', 'Karen Hill',
      'Anthony Scott', 'Lisa Green', 'Mark Baker', 'Linda Hall',
      'Donald Adams', 'Helen Carter', 'Steven Nelson', 'Donna Roberts'
    ];
    
    // Relationship types
    const relationshipTypes = ['Family', 'Friend', 'Colleague', 'Acquaintance'];
    
    // Create tables
    for (let i = 0; i < numTables; i++) {
      const tableGuests = [];
      const tableNumber = i + 1;
      
      // Different distribution strategies based on optimization type
      if (optimizationType === 'family') {
        // Group by "family" (same last names)
        const lastNameGroups = {};
        guestNames.forEach(name => {
          const lastName = name.split(' ')[1];
          if (!lastNameGroups[lastName]) {
            lastNameGroups[lastName] = [];
          }
          lastNameGroups[lastName].push(name);
        });
        
        // Assign from same families to this table
        const familyNames = Object.keys(lastNameGroups);
        const tableFamily = familyNames[i % familyNames.length];
        
        // Add family members up to capacity
        for (let j = 0; j < Math.min(seatsPerTable, lastNameGroups[tableFamily].length); j++) {
          const name = lastNameGroups[tableFamily][j];
          tableGuests.push({
            name,
            relationship: 'Family',
            dietaryNeeds: Math.random() > 0.8 ? ['Vegetarian'] : []
          });
        }
        
        // Fill remaining seats with others
        let remainingSeats = seatsPerTable - tableGuests.length;
        let guestIndex = 0;
        while (remainingSeats > 0 && guestIndex < guestNames.length) {
          const name = guestNames[guestIndex];
          const lastName = name.split(' ')[1];
          if (lastName !== tableFamily) {
            tableGuests.push({
              name,
              relationship: relationshipTypes[Math.floor(Math.random() * relationshipTypes.length)],
              dietaryNeeds: Math.random() > 0.8 ? ['Gluten-Free'] : []
            });
            remainingSeats--;
          }
          guestIndex++;
        }
      } else if (optimizationType === 'social') {
        // Mix different people with balanced social dynamics
        const seatsToFill = Math.min(seatsPerTable, guestNames.length - (i * seatsPerTable));
        for (let j = 0; j < seatsToFill; j++) {
          const guestIndex = i * seatsPerTable + j;
          if (guestIndex < guestNames.length) {
            tableGuests.push({
              name: guestNames[guestIndex],
              relationship: relationshipTypes[Math.floor(Math.random() * relationshipTypes.length)],
              dietaryNeeds: Math.random() > 0.8 ? ['Dairy-Free'] : []
            });
          }
        }
      } else {
        // Balanced approach - some family grouping, some mixing
        const seatsToFill = Math.min(seatsPerTable, guestNames.length - (i * seatsPerTable));
        for (let j = 0; j < seatsToFill; j++) {
          // Intentionally create some patterns in the assignment
          const offset = (i % 2 === 0) ? (j * 2) % guestNames.length : j;
          const guestIndex = (i * 3 + offset) % guestNames.length;
          
          tableGuests.push({
            name: guestNames[guestIndex],
            relationship: relationshipTypes[Math.floor(Math.random() * relationshipTypes.length)],
            dietaryNeeds: Math.random() > 0.8 ? ['Nut-Free'] : []
          });
        }
      }
      
      // Create the table object
      tables.push({
        id: tableNumber,
        name: `Table ${tableNumber}`,
        capacity: seatsPerTable,
        guests: tableGuests,
        specialTable: false
      });
    }
    
    return tables;
  };

  const saveArrangement = (arrangementId) => {
    // In a real app, this would save the selected arrangement to your backend
    alert(`Arrangement ${arrangementId} saved as the final arrangement.`);
  };

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold mb-6">Seating Optimization</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Configuration Panel */}
        <div className="lg:col-span-1">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold mb-4">Optimization Settings</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Number of Tables</label>
                <input
                  type="number"
                  name="numberOfTables"
                  className="w-full p-2 border rounded"
                  value={optimizationConfig.numberOfTables}
                  onChange={handleConfigChange}
                  min="1"
                  max="20"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Seats Per Table</label>
                <input
                  type="number"
                  name="seatsPerTable"
                  className="w-full p-2 border rounded"
                  value={optimizationConfig.seatsPerTable}
                  onChange={handleConfigChange}
                  min="4"
                  max="12"
                />
              </div>
              
              <div className="border-t pt-4">
                <h3 className="font-medium mb-2">Optimization Priorities</h3>
                
                <div className="space-y-2">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="prioritizeRelationships"
                      name="prioritizeRelationships"
                      checked={optimizationConfig.prioritizeRelationships}
                      onChange={handleConfigChange}
                      className="h-4 w-4 text-blue-600 border-gray-300 rounded mr-2"
                    />
                    <label htmlFor="prioritizeRelationships" className="text-sm text-gray-700">
                      Prioritize guest relationships
                    </label>
                  </div>
                  
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="keepFamiliesTogether"
                      name="keepFamiliesTogether"
                      checked={optimizationConfig.keepFamiliesTogether}
                      onChange={handleConfigChange}
                      className="h-4 w-4 text-blue-600 border-gray-300 rounded mr-2"
                    />
                    <label htmlFor="keepFamiliesTogether" className="text-sm text-gray-700">
                      Keep families together when possible
                    </label>
                  </div>
                  
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="balanceTables"
                      name="balanceTables"
                      checked={optimizationConfig.balanceTables}
                      onChange={handleConfigChange}
                      className="h-4 w-4 text-blue-600 border-gray-300 rounded mr-2"
                    />
                    <label htmlFor="balanceTables" className="text-sm text-gray-700">
                      Balance demographics across tables
                    </label>
                  </div>
                  
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="distributeExtroverts"
                      name="distributeExtroverts"
                      checked={optimizationConfig.distributeExtroverts}
                      onChange={handleConfigChange}
                      className="h-4 w-4 text-blue-600 border-gray-300 rounded mr-2"
                    />
                    <label htmlFor="distributeExtroverts" className="text-sm text-gray-700">
                      Distribute sociable guests across tables
                    </label>
                  </div>
                  
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="avoidConflicts"
                      name="avoidConflicts"
                      checked={optimizationConfig.avoidConflicts}
                      onChange={handleConfigChange}
                      className="h-4 w-4 text-blue-600 border-gray-300 rounded mr-2"
                    />
                    <label htmlFor="avoidConflicts" className="text-sm text-gray-700">
                      Avoid seating guests with conflicts together
                    </label>
                  </div>
                </div>
              </div>
              
              <div className="border-t pt-4">
                <h3 className="font-medium mb-2">Special Tables</h3>
                
                <div className="flex items-center mb-2">
                  <input
                    type="checkbox"
                    id="includeSpecialTables"
                    name="includeSpecialTables"
                    checked={optimizationConfig.includeSpecialTables}
                    onChange={handleConfigChange}
                    className="h-4 w-4 text-blue-600 border-gray-300 rounded mr-2"
                  />
                  <label htmlFor="includeSpecialTables" className="text-sm text-gray-700">
                    Include special tables (VIP, kids, etc.)
                  </label>
                </div>
                
                {optimizationConfig.includeSpecialTables && (
                  <div className="ml-6">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Number of Special Tables</label>
                    <input
                      type="number"
                      name="specialTableCount"
                      className="w-full p-2 border rounded"
                      value={optimizationConfig.specialTableCount}
                      onChange={handleConfigChange}
                      min="1"
                      max={optimizationConfig.numberOfTables}
                    />
                  </div>
                )}
              </div>
              
              <div className="border-t pt-4">
                <h3 className="font-medium mb-2">Advanced Settings</h3>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Optimization Strength: {optimizationConfig.optimizationStrength}
                  </label>
                  <input
                    type="range"
                    name="optimizationStrength"
                    min="0"
                    max="1"
                    step="0.1"
                    className="w-full"
                    value={optimizationConfig.optimizationStrength}
                    onChange={(e) => setOptimizationConfig({
                      ...optimizationConfig,
                      optimizationStrength: parseFloat(e.target.value)
                    })}
                  />
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>More Flexible</span>
                    <span>More Strict</span>
                  </div>
                </div>
                
                <div className="mt-3">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Maximum Run Time (seconds)
                  </label>
                  <input
                    type="number"
                    name="maxRunTime"
                    className="w-full p-2 border rounded"
                    value={optimizationConfig.maxRunTime}
                    onChange={handleConfigChange}
                    min="10"
                    max="300"
                  />
                </div>
              </div>
              
              <div className="border-t pt-4">
                <button
                  onClick={startOptimization}
                  disabled={optimizationStatus.running}
                  className={`w-full py-2 px-4 rounded font-medium ${
                    optimizationStatus.running
                      ? 'bg-gray-300 cursor-not-allowed'
                      : 'bg-green-600 hover:bg-green-700 text-white'
                  }`}
                >
                  {optimizationStatus.running ? 'Optimization Running...' : 'Run Seating Optimization'}
                </button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Main Content Area */}
        <div className="lg:col-span-2">
          {/* Optimization Status Panel */}
          <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <h2 className="text-lg font-semibold mb-4">Optimization Status</h2>
            
            {optimizationStatus.status === 'idle' ? (
              <div className="text-center py-6 text-gray-500">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto mb-3 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
                <p className="mb-2">No optimization has been run yet.</p>
                <p>Adjust your settings and click "Run Seating Optimization" to begin.</p>
              </div>
            ) : optimizationStatus.status === 'running' ? (
              <div>
                <div className="mb-2 flex justify-between">
                  <span className="text-sm font-medium">{optimizationStatus.message}</span>
                  <span className="text-sm">{optimizationStatus.progress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div 
                    className="bg-blue-600 h-2.5 rounded-full" 
                    style={{ width: `${optimizationStatus.progress}%` }}
                  ></div>
                </div>
                <p className="mt-3 text-sm text-gray-500">
                  This may take a few moments depending on the complexity of your guest relationships and constraints.
                </p>
              </div>
            ) : optimizationStatus.status === 'complete' ? (
              <div>
                <div className="bg-green-50 border-l-4 border-green-400 p-4 mb-4">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm text-green-700">
                        {optimizationStatus.message}
                      </p>
                      <p className="text-xs text-green-600 mt-1">
                        Completed in {((optimizationStatus.endTime - optimizationStatus.startTime) / 1000).toFixed(2)} seconds
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-4">
                  <div className="bg-blue-50 p-3 rounded-lg">
                    <p className="text-xs text-blue-600">Guest Satisfaction</p>
                    <p className="text-xl font-bold">{optimizationResults.metrics.satisfactionScore}%</p>
                  </div>
                  <div className="bg-green-50 p-3 rounded-lg">
                    <p className="text-xs text-green-600">Conflict Resolution</p>
                    <p className="text-xl font-bold">{optimizationResults.metrics.conflictScore}%</p>
                  </div>
                  <div className="bg-purple-50 p-3 rounded-lg">
                    <p className="text-xs text-purple-600">Table Balance</p>
                    <p className="text-xl font-bold">{optimizationResults.metrics.balanceScore}%</p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-xs text-gray-600">Overall Score</p>
                    <p className="text-xl font-bold">{optimizationResults.metrics.overallScore}%</p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-red-50 border-l-4 border-red-400 p-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-red-700">
                      {optimizationStatus.message}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
          
          {/* Optimization Results */}
          {optimizationStatus.status === 'complete' && (
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-lg font-semibold mb-4">Generated Seating Arrangements</h2>
              
              <div className="mb-6">
                <p className="text-sm text-gray-600 mb-4">
                  The algorithm has generated multiple seating arrangements based on your criteria.
                  Review each arrangement and select the one that best fits your event.
                </p>
                
                <div className="space-y-6">
                  {optimizationResults.arrangements.map((arrangement) => (
                    <div key={arrangement.id} className="border rounded-lg overflow-hidden">
                      <div className="flex justify-between items-center bg-gray-50 px-4 py-3 border-b">
                        <h3 className="font-medium">{arrangement.name}</h3>
                        <div className="flex items-center space-x-2">
                          <span className="text-sm text-gray-500">Score: {arrangement.metrics.overallScore}%</span>
                          <button
                            onClick={() => saveArrangement(arrangement.id)}
                            className="bg-green-600 text-white text-sm py-1 px-3 rounded hover:bg-green-700"
                          >
                            Select This Arrangement
                          </button>
                        </div>
                      </div>
                      
                      <div className="p-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                          {arrangement.tables.slice(0, 6).map((table) => (
                            <div key={table.id} className="border rounded p-3">
                              <div className="flex justify-between items-center mb-2">
                                <h4 className="font-medium">{table.name}</h4>
                                <span className="text-xs text-gray-500">{table.guests.length}/{table.capacity} seats</span>
                              </div>
                              <ul className="text-sm">
                                {table.guests.slice(0, 4).map((guest, idx) => (
                                  <li key={idx} className="mb-1 flex justify-between">
                                    <span>{guest.name}</span>
                                    {guest.dietaryNeeds.length > 0 && (
                                      <span className="text-xs bg-yellow-100 text-yellow-800 px-1 rounded">
                                        {guest.dietaryNeeds[0]}
                                      </span>
                                    )}
                                  </li>
                                ))}
                                {table.guests.length > 4 && (
                                  <li className="text-xs text-gray-500 italic">
                                    + {table.guests.length - 4} more guests
                                  </li>
                                )}
                              </ul>
                            </div>
                          ))}
                          {arrangement.tables.length > 6 && (
                            <div className="border rounded p-3 flex items-center justify-center">
                              <span className="text-gray-500">+ {arrangement.tables.length - 6} more tables</span>
                            </div>
                          )}
                        </div>
                        
                        <div className="mt-4 flex justify-center">
                          <button className="text-blue-600 text-sm flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
                            </svg>
                            View Full Arrangement Details
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Explanation and Insights */}
      <div className="mt-6 bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-lg font-semibold mb-4">How It Works</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <h3 className="font-medium mb-2">Data Analysis</h3>
            <p className="text-sm text-gray-600">
              Our algorithm analyzes guest survey responses and relationship data to understand social dynamics.
              It considers factors like family connections, friendships, and potential conflicts.
            </p>
          </div>
          
          <div>
            <h3 className="font-medium mb-2">Constraint Satisfaction</h3>
            <p className="text-sm text-gray-600">
              Using a graph-based model, we represent guests as nodes and their relationships as weighted edges.
              The algorithm applies your specified constraints to find optimal solutions that satisfy as many preferences as possible.
            </p>
          </div>
          
          <div>
            <h3 className="font-medium mb-2">Multiple Solutions</h3>
            <p className="text-sm text-gray-600">
              Rather than providing a single answer, we generate multiple high-quality seating arrangements
              with different optimization focuses, allowing you to choose the approach that best fits your event.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OptimizationRunner;