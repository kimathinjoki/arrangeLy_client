import React, { useState, useEffect, useRef } from 'react';

function RelationshipGraph() {
  const canvasRef = useRef(null);
  const [relationshipData, setRelationshipData] = useState({
    guests: [
      { id: 1, name: "John Smith", group: "Bride's Family" },
      { id: 2, name: "Mary Smith", group: "Bride's Family" },
      { id: 3, name: "Robert Johnson", group: "Groom's Family" },
      { id: 4, name: "Emma Johnson", group: "Groom's Family" },
      { id: 5, name: "Michael Brown", group: "Mutual Friend" },
      { id: 6, name: "Sarah Wilson", group: "Bride's Friend" },
      { id: 7, name: "David Miller", group: "Groom's Friend" },
      { id: 8, name: "Jennifer Garcia", group: "Colleague" },
      { id: 9, name: "James Martinez", group: "Colleague" },
      { id: 10, name: "Amanda Robinson", group: "Bride's Family" },
    ],
    relationships: [
      { source: 1, target: 2, strength: 0.9, type: "family" }, // John & Mary (married)
      { source: 3, target: 4, strength: 0.9, type: "family" }, // Robert & Emma (married)
      { source: 1, target: 10, strength: 0.7, type: "family" }, // John & Amanda (siblings)
      { source: 2, target: 10, strength: 0.5, type: "family" }, // Mary & Amanda (in-laws)
      { source: 5, target: 6, strength: 0.6, type: "friend" }, // Michael & Sarah (friends)
      { source: 5, target: 7, strength: 0.6, type: "friend" }, // Michael & David (friends)
      { source: 6, target: 7, strength: 0.4, type: "friend" }, // Sarah & David (acquaintances)
      { source: 8, target: 9, strength: 0.7, type: "colleague" }, // Jennifer & James (work together)
      { source: 1, target: 5, strength: 0.3, type: "friend" }, // John & Michael (casual friends)
      { source: 6, target: 10, strength: 0.8, type: "friend" }, // Sarah & Amanda (best friends)
      { source: 3, target: 7, strength: 0.5, type: "family" }, // Robert & David (cousins)
      { source: 4, target: 7, strength: 0.3, type: "family" }, // Emma & David (cousins-in-law)
      { source: 7, target: 9, strength: -0.2, type: "conflict" }, // David & James (don't get along)
      { source: 5, target: 8, strength: -0.3, type: "conflict" }, // Michael & Jennifer (past conflict)
    ],
    groups: [
      { id: "Bride's Family", color: "#8b5cf6" }, // Purple
      { id: "Groom's Family", color: "#3b82f6" }, // Blue
      { id: "Mutual Friend", color: "#10b981" }, // Green
      { id: "Bride's Friend", color: "#ec4899" }, // Pink
      { id: "Groom's Friend", color: "#6366f1" }, // Indigo
      { id: "Colleague", color: "#f59e0b" }, // Amber
    ]
  });

  const [selectedGuest, setSelectedGuest] = useState(null);
  const [showEditor, setShowEditor] = useState(false);
  const [newRelationship, setNewRelationship] = useState({
    source: '',
    target: '',
    strength: 0.5,
    type: 'friend'
  });

  // D3 force simulation would typically go here in a real implementation
  // For now, we'll use a simpler approach to demonstrate the concept

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;

    // Clear canvas
    ctx.clearRect(0, 0, width, height);

    // Create a simple static visualization
    // In a real implementation, you would use D3.js or a similar library

    // Position guests in a circle
    const centerX = width / 2;
    const centerY = height / 2;
    const radius = Math.min(width, height) * 0.35;
    
    const guestPositions = {};
    relationshipData.guests.forEach((guest, i) => {
      const angle = (i / relationshipData.guests.length) * 2 * Math.PI;
      const x = centerX + radius * Math.cos(angle);
      const y = centerY + radius * Math.sin(angle);
      guestPositions[guest.id] = { x, y };
    });

    // Draw relationships (edges)
    relationshipData.relationships.forEach(rel => {
      const sourcePos = guestPositions[rel.source];
      const targetPos = guestPositions[rel.target];
      
      if (!sourcePos || !targetPos) return;

      // Set line style based on relationship strength and type
      ctx.beginPath();
      ctx.moveTo(sourcePos.x, sourcePos.y);
      ctx.lineTo(targetPos.x, targetPos.y);
      
      // Line width based on strength
      const absStrength = Math.abs(rel.strength);
      ctx.lineWidth = absStrength * 3;
      
      // Line color based on type and strength
      if (rel.strength < 0) {
        // Negative relationship (conflict)
        ctx.strokeStyle = 'rgba(239, 68, 68, 0.6)'; // Red with opacity
      } else if (rel.type === 'family') {
        ctx.strokeStyle = 'rgba(16, 185, 129, 0.6)'; // Green with opacity
      } else if (rel.type === 'friend') {
        ctx.strokeStyle = 'rgba(59, 130, 246, 0.6)'; // Blue with opacity
      } else {
        ctx.strokeStyle = 'rgba(107, 114, 128, 0.6)'; // Gray with opacity
      }
      
      ctx.stroke();
    });

    // Draw guest nodes
    Object.entries(guestPositions).forEach(([id, position]) => {
      const guest = relationshipData.guests.find(g => g.id === parseInt(id));
      if (!guest) return;

      // Find guest's group color
      const group = relationshipData.groups.find(g => g.id === guest.group);
      const color = group ? group.color : '#9ca3af'; // Default gray if no group found

      // Draw circle for guest
      ctx.beginPath();
      ctx.arc(position.x, position.y, 12, 0, 2 * Math.PI);
      ctx.fillStyle = selectedGuest === guest.id ? '#f97316' : color; // Highlight if selected
      ctx.fill();
      ctx.lineWidth = 2;
      ctx.strokeStyle = '#ffffff';
      ctx.stroke();

      // Draw guest name
      ctx.font = '12px Arial';
      ctx.fillStyle = '#1f2937';
      ctx.textAlign = 'center';
      ctx.fillText(guest.name, position.x, position.y + 25);
    });

  }, [relationshipData, selectedGuest]);

  const handleAddRelationship = (e) => {
    e.preventDefault();
    
    // Convert to numbers
    const sourceId = parseInt(newRelationship.source);
    const targetId = parseInt(newRelationship.target);
    const strength = parseFloat(newRelationship.strength);
    
    // Validate
    if (sourceId === targetId) {
      alert("Cannot create a relationship with the same person");
      return;
    }
    
    // Check if relationship already exists
    const existingRel = relationshipData.relationships.find(
      rel => (rel.source === sourceId && rel.target === targetId) || 
             (rel.source === targetId && rel.target === sourceId)
    );
    
    if (existingRel) {
      // Update existing relationship
      const updatedRelationships = relationshipData.relationships.map(rel => {
        if ((rel.source === sourceId && rel.target === targetId) || 
            (rel.source === targetId && rel.target === sourceId)) {
          return { ...rel, strength, type: newRelationship.type };
        }
        return rel;
      });
      
      setRelationshipData({
        ...relationshipData,
        relationships: updatedRelationships
      });
    } else {
      // Add new relationship
      setRelationshipData({
        ...relationshipData,
        relationships: [
          ...relationshipData.relationships,
          {
            source: sourceId,
            target: targetId,
            strength,
            type: newRelationship.type
          }
        ]
      });
    }
    
    // Reset form
    setNewRelationship({
      source: '',
      target: '',
      strength: 0.5,
      type: 'friend'
    });
    
    setShowEditor(false);
  };
  
  const handleCanvasClick = (e) => {
    // In a real implementation, you would use proper hit detection
    // For now, we're just toggling the editor visibility as a placeholder
    setShowEditor(!showEditor);
  };
  
  const handleRemoveRelationship = (index) => {
    const updatedRelationships = [...relationshipData.relationships];
    updatedRelationships.splice(index, 1);
    
    setRelationshipData({
      ...relationshipData,
      relationships: updatedRelationships
    });
  };
  
  const getRelationshipDescription = (rel) => {
    const source = relationshipData.guests.find(g => g.id === rel.source);
    const target = relationshipData.guests.find(g => g.id === rel.target);
    
    if (!source || !target) return '';
    
    let typeDesc = '';
    switch (rel.type) {
      case 'family':
        typeDesc = 'Family';
        break;
      case 'friend':
        typeDesc = 'Friends';
        break;
      case 'colleague':
        typeDesc = 'Colleagues';
        break;
      case 'conflict':
        typeDesc = 'Conflict';
        break;
      default:
        typeDesc = 'Relationship';
    }
    
    let strengthDesc = '';
    if (rel.strength < 0) {
      strengthDesc = 'negative';
    } else if (rel.strength < 0.3) {
      strengthDesc = 'weak';
    } else if (rel.strength < 0.7) {
      strengthDesc = 'moderate';
    } else {
      strengthDesc = 'strong';
    }
    
    return `${source.name} & ${target.name}: ${strengthDesc} ${typeDesc.toLowerCase()}`;
  };
  
  const exportRelationshipData = () => {
    // In a real app, this would send the data to your API
    const jsonStr = JSON.stringify(relationshipData, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const href = URL.createObjectURL(blob);
    
    // Create download link and click it
    const link = document.createElement('a');
    link.href = href;
    link.download = 'relationships.json';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  
  const runOptimization = () => {
    // In a real app, this would call your Python ML service
    alert('Optimization request sent to the server. This may take a few moments to process.');
  };

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold mb-6">Guest Relationship Mapping</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Graph Visualization */}
        <div className="lg:col-span-2">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Relationship Graph</h2>
              <div>
                <button 
                  onClick={() => setShowEditor(!showEditor)}
                  className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 mr-2"
                >
                  {showEditor ? 'Hide Editor' : 'Add Relationship'}
                </button>
                <button 
                  onClick={runOptimization}
                  className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700"
                >
                  Run Optimization
                </button>
              </div>
            </div>
            
            <div className="h-96 border rounded-lg mb-4 relative cursor-pointer" onClick={handleCanvasClick}>
              <canvas 
                ref={canvasRef} 
                width={800} 
                height={600} 
                className="w-full h-full"
                style={{ maxHeight: '600px' }}
              />
              
              <div className="absolute bottom-4 right-4  bg-white bg-opacity-90 p-3 rounded-md shadow-sm">
                <h3 className="text-sm text-gray-700 font-semibold mb-2">Legend</h3>
                <div className="flex flex-col space-y-1 text-xs">
                  <div className="flex items-center">
                    <div className="w-3 h-3 text-gray-700  bg-green-500 rounded-full mr-2"></div>
                    <span className='text-gray-700 '>Family Relationship</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
                    <span className='text-gray-700 ' >Friend Relationship</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-gray-500 rounded-full mr-2"></div>
                    <span className='text-gray-700 '>Other Relationship</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
                    <span className='text-gray-700 ' >Conflict</span>
                  </div>
                  <div className="mt-1 border-t pt-1">
                    <span className='text-gray-700' >Line thickness represents relationship strength</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-2">
              {relationshipData.groups.map((group) => (
                <div key={group.id} className="flex items-center">
                  <div 
                    className="w-3 h-3 rounded-full mr-1" 
                    style={{ backgroundColor: group.color }}
                  ></div>
                  <span className="text-xs text-gray-600">{group.id}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Right Column - Relationship Editor */}
        <div className="lg:col-span-1">
          {showEditor ? (
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-lg text-gray-700 font-semibold mb-4">Add/Edit Relationship</h2>
              
              <form onSubmit={handleAddRelationship}>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Person 1</label>
                  <select
                    className="w-full p-2 text-gray-700  border rounded"
                    value={newRelationship.source}
                    onChange={(e) => setNewRelationship({...newRelationship, source: e.target.value})}
                    required
                  >
                    <option value="">Select a person</option>
                    {relationshipData.guests.map(guest => (
                      <option key={guest.id} value={guest.id}>{guest.name}</option>
                    ))}
                  </select>
                </div>
                
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Person 2</label>
                  <select
                    className="w-full text-gray-700  p-2 border rounded"
                    value={newRelationship.target}
                    onChange={(e) => setNewRelationship({...newRelationship, target: e.target.value})}
                    required
                  >
                    <option value="">Select a person</option>
                    {relationshipData.guests.map(guest => (
                      <option key={guest.id} value={guest.id}>{guest.name}</option>
                    ))}
                  </select>
                </div>
                
                <div className="mb-4">
                  <label className="block text-sm font-medium  text-gray-700 mb-1">Relationship Type</label>
                  <select
                    className="w-full p-2 text-gray-700  border rounded"
                    value={newRelationship.type}
                    onChange={(e) => setNewRelationship({...newRelationship, type: e.target.value})}
                  >
                    <option value="family">Family</option>
                    <option value="friend">Friend</option>
                    <option value="colleague">Colleague</option>
                    <option value="conflict">Conflict</option>
                  </select>
                </div>
                
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Relationship Strength: {newRelationship.strength}
                    {newRelationship.type === 'conflict' ? ' (negative values for conflicts)' : ''}
                  </label>
                  <input
                    type="range"
                    min={newRelationship.type === 'conflict' ? -1 : 0}
                    max={1}
                    step={0.1}
                    className="w-full"
                    value={newRelationship.strength}
                    onChange={(e) => setNewRelationship({...newRelationship, strength: parseFloat(e.target.value)})}
                  />
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>{newRelationship.type === 'conflict' ? 'Strong Conflict' : 'Weak'}</span>
                    {newRelationship.type === 'conflict' && <span>No Conflict</span>}
                    <span>{newRelationship.type === 'conflict' ? '' : 'Strong'}</span>
                  </div>
                </div>
                
                <div className="flex justify-end space-x-3">
                  <button
                    type="button"
                    className="bg-gray-600 text-gray-800 py-2 px-4 rounded hover:bg-gray-300"
                    onClick={() => setShowEditor(false)}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
                  >
                    Save Relationship
                  </button>
                </div>
              </form>
            </div>
          ) : (
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-lg font-semibold mb-4">Relationship List</h2>
              
              {relationshipData.relationships.length > 0 ? (
                <div className="space-y-2 text-gray-700 max-h-96 overflow-y-auto">
                  {relationshipData.relationships.map((rel, index) => (
                    <div key={index} className="flex justify-between items-center p-2 border rounded hover:bg-gray-50">
                      <span className="text-sm">{getRelationshipDescription(rel)}</span>
                      <button
                        onClick={() => handleRemoveRelationship(index)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-center py-4">No relationships defined yet.</p>
              )}
              
              <div className="mt-4">
                <button
                  onClick={exportRelationshipData}
                  className="text-blue-600 text-sm flex items-center"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                  Export Relationship Data
                </button>
              </div>
            </div>
          )}
          
          <div className="mt-6 bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold mb-4">Guest List</h2>
            
            <div className="max-h-60 overflow-y-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Group</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {relationshipData.guests.map(guest => (
                    <tr key={guest.id} 
                      className={`cursor-pointer hover:bg-gray-50 ${selectedGuest === guest.id ? 'bg-blue-50' : ''}`}
                      onClick={() => setSelectedGuest(guest.id === selectedGuest ? null : guest.id)}
                    >
                      <td className="px-4 py-2 whitespace-nowrap text-sm font-medium text-gray-900">{guest.name}</td>
                      <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">{guest.group}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-6 bg-yellow-50 border-l-4 border-yellow-400 p-4">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <p className="text-sm text-yellow-700">
              Note: In a complete implementation, this relationship graph would be interactive with D3.js or a similar library.
              The data visualization would include draggable nodes, interactive zooming, and tooltips.
              Data from this graph is used by the ML optimization algorithm to generate optimal seating arrangements.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RelationshipGraph;