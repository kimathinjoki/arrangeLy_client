import React, { useState, useEffect } from 'react';
import { relationshipService } from '../../../api/rubyBackendService';
import { vectorizationService } from '../../../api/pythonMLService';

function RelationshipEditor() {
  const [guests, setGuests] = useState([]);
  const [relationships, setRelationships] = useState([]);
  const [relationshipTypes, setRelationshipTypes] = useState([
    { id: 'family', label: 'Family', color: '#34D399', defaultStrength: 0.8 },
    { id: 'friend', label: 'Friend', color: '#60A5FA', defaultStrength: 0.6 },
    { id: 'colleague', label: 'Colleague', color: '#A78BFA', defaultStrength: 0.4 },
    { id: 'acquaintance', label: 'Acquaintance', color: '#9CA3AF', defaultStrength: 0.2 },
    { id: 'conflict', label: 'Conflict', color: '#F87171', defaultStrength: -0.5 }
  ]);
  
  const [selectedGuest, setSelectedGuest] = useState(null);
  const [guestSearch, setGuestSearch] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [newRelationship, setNewRelationship] = useState({
    targetGuest: '',
    type: 'friend',
    strength: 0.6,
    notes: ''
  });
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [showAiModal, setShowAiModal] = useState(false);
  const [aiSuggestion, setAiSuggestion] = useState('');
  const [processingAi, setProcessingAi] = useState(false);
  
  // Mock event ID 
  const eventId = 1;
  
  useEffect(() => {
    fetchData();
  }, []);
  
  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Fetch guests
      const guestData = await relationshipService.getEventGuests(eventId);
      setGuests(guestData.guests || []);
      
      // Fetch relationships
      const relationshipData = await relationshipService.getRelationships(eventId);
      setRelationships(relationshipData.relationships || []);
      
      setLoading(false);
    } catch (err) {
      console.error('Error fetching data:', err);
      setError('Failed to load guests and relationships. Please try again.');
      setLoading(false);
    }
  };
  
  const handleSelectGuest = (guestId) => {
    if (selectedGuest === guestId) {
      setSelectedGuest(null);
    } else {
      setSelectedGuest(guestId);
    }
  };
  
  const getGuestRelationships = () => {
    if (!selectedGuest) return [];
    
    return relationships.filter(rel => 
      rel.sourceGuestId === selectedGuest || rel.targetGuestId === selectedGuest
    );
  };
  
  const getRelatedGuest = (relationship) => {
    const otherGuestId = relationship.sourceGuestId === selectedGuest 
      ? relationship.targetGuestId 
      : relationship.sourceGuestId;
    
    return guests.find(g => g.id === otherGuestId);
  };
  
  const getRelationshipType = (typeId) => {
    return relationshipTypes.find(type => type.id === typeId) || relationshipTypes[1]; // Default to 'friend'
  };
  
  const handleShowAddModal = () => {
    if (!selectedGuest) {
      setError('Please select a guest first');
      return;
    }
    
    setShowAddModal(true);
  };
  
  const handleAddRelationship = async () => {
    if (!selectedGuest || !newRelationship.targetGuest) {
      setError('Please select both guests');
      return;
    }
    
    try {
      setLoading(true);
      
      // Add relationship via API
      await relationshipService.addRelationship(eventId, {
        sourceGuestId: selectedGuest,
        targetGuestId: parseInt(newRelationship.targetGuest),
        type: newRelationship.type,
        strength: parseFloat(newRelationship.strength),
        notes: newRelationship.notes
      });
      
      // Refresh relationships
      const relationshipData = await relationshipService.getRelationships(eventId);
      setRelationships(relationshipData.relationships || []);
      
      // Reset form and close modal
      setNewRelationship({
        targetGuest: '',
        type: 'friend',
        strength: 0.6,
        notes: ''
      });
      setShowAddModal(false);
      
      // Show success message
      setSuccessMessage('Relationship added successfully');
      setTimeout(() => setSuccessMessage(null), 3000);
      
      setLoading(false);
    } catch (err) {
      console.error('Error adding relationship:', err);
      setError('Failed to add relationship. Please try again.');
      setLoading(false);
    }
  };
  
  const handleUpdateRelationship = async (relationshipId, updates) => {
    try {
      setLoading(true);
      
      // Update relationship via API
      await relationshipService.updateRelationship(eventId, relationshipId, updates);
      
      // Refresh relationships
      const relationshipData = await relationshipService.getRelationships(eventId);
      setRelationships(relationshipData.relationships || []);
      
      // Show success message
      setSuccessMessage('Relationship updated successfully');
      setTimeout(() => setSuccessMessage(null), 3000);
      
      setLoading(false);
    } catch (err) {
      console.error('Error updating relationship:', err);
      setError('Failed to update relationship. Please try again.');
      setLoading(false);
    }
  };
  
  const handleDeleteRelationship = async (relationshipId) => {
    if (!window.confirm('Are you sure you want to delete this relationship?')) {
      return;
    }
    
    try {
      setLoading(true);
      
      // Delete relationship via API
      await relationshipService.deleteRelationship(eventId, relationshipId);
      
      // Refresh relationships
      const relationshipData = await relationshipService.getRelationships(eventId);
      setRelationships(relationshipData.relationships || []);
      
      // Show success message
      setSuccessMessage('Relationship deleted successfully');
      setTimeout(() => setSuccessMessage(null), 3000);
      
      setLoading(false);
    } catch (err) {
      console.error('Error deleting relationship:', err);
      setError('Failed to delete relationship. Please try again.');
      setLoading(false);
    }
  };
  
  const handleAiSuggestion = async () => {
    if (!selectedGuest) {
      setError('Please select a guest first');
      return;
    }
    
    setShowAiModal(true);
    setAiSuggestion('');
  };
  
  const processAiSuggestion = async () => {
    if (!aiSuggestion.trim()) {
      setError('Please enter a description of the relationships');
      return;
    }
    
    try {
      setProcessingAi(true);
      setError(null);
      
      // Process text with vectorization service
      const result = await vectorizationService.analyzeSurveyResponses(eventId, {
        guestId: selectedGuest,
        text: aiSuggestion
      });
      
      if (result.suggestedRelationships && result.suggestedRelationships.length > 0) {
        // Add each suggested relationship
        for (const rel of result.suggestedRelationships) {
          await relationshipService.addRelationship(eventId, {
            sourceGuestId: selectedGuest,
            targetGuestId: rel.guestId,
            type: rel.type,
            strength: rel.strength,
            notes: `AI suggested based on: "${aiSuggestion}"`
          });
        }
        
        // Refresh relationships
        const relationshipData = await relationshipService.getRelationships(eventId);
        setRelationships(relationshipData.relationships || []);
        
        // Show success message
        setSuccessMessage(`Added ${result.suggestedRelationships.length} relationships based on AI analysis`);
        setTimeout(() => setSuccessMessage(null), 3000);
      } else {
        setError('No relationships could be identified from the text');
      }
      
      setProcessingAi(false);
      setShowAiModal(false);
      setAiSuggestion('');
    } catch (err) {
      console.error('Error processing AI suggestion:', err);
      setError('Failed to process relationship suggestions. Please try again.');
      setProcessingAi(false);
    }
  };
  
  // Filter guests based on search term
  const filteredGuests = guests.filter(guest => 
    guest.name.toLowerCase().includes(guestSearch.toLowerCase())
  );
  
  // Filter available target guests (exclude already connected and self)
  const getAvailableTargetGuests = () => {
    if (!selectedGuest) return [];
    
    const connectedGuestIds = relationships
      .filter(rel => rel.sourceGuestId === selectedGuest || rel.targetGuestId === selectedGuest)
      .map(rel => rel.sourceGuestId === selectedGuest ? rel.targetGuestId : rel.sourceGuestId);
    
    return guests.filter(guest => 
      guest.id !== selectedGuest && !connectedGuestIds.includes(guest.id)
    );
  };
  
  // Loading state
  if (loading && !guests.length) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-3 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold mb-6">Relationship Editor</h1>
      
      {error && (
        <div className="mb-6 text-gray-700  bg-red-50 border-l-4 border-red-500 p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-600">{error}</p>
            </div>
          </div>
        </div>
      )}
      
      {successMessage && (
        <div className="mb-6 bg-green-50 text-gray-700  border-l-4 border-green-500 p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-green-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-green-600">{successMessage}</p>
            </div>
          </div>
        </div>
      )}
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Guest Selection Panel */}
        <div className="lg:col-span-1 text-gray-700">
          <div className="bg-white rounded-lg shadow-md p-6 mb-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-medium">Guests</h2>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search guests"
                  className="pl-8 pr-3 py-2 text-sm border border-gray-300 text-gray-700  rounded-md focus:ring-blue-500 focus:border-blue-500"
                  value={guestSearch}
                  onChange={e => setGuestSearch(e.target.value)}
                />
                <svg className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
            
            <div className="border text-gray-700  rounded-md max-h-[450px] overflow-y-auto">
              {filteredGuests.length > 0 ? (
                <ul className="divide-y divide-gray-200">
                  {filteredGuests.map(guest => (
                    <li 
                      key={guest.id}
                      className={`px-4 py-3 cursor-pointer hover:bg-gray-50 ${selectedGuest === guest.id ? 'bg-blue-50' : ''}`}
                      onClick={() => handleSelectGuest(guest.id)}
                    >
                      <div className="font-medium text-gray-900">{guest.name}</div>
                      <div className="text-sm text-gray-500">
                        {guest.tableName ? `Assigned to ${guest.tableName}` : 'Unassigned'}
                      </div>
                      {selectedGuest === guest.id && (
                        <div className="mt-2 text-xs text-blue-600">Selected</div>
                      )}
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="p-4 text-center text-gray-500">
                  {guestSearch ? 'No guests match your search' : 'No guests found'}
                </div>
              )}
            </div>
          </div>
          
          {/* Relationship Legend */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="font-medium mb-3">Relationship Types</h3>
            
            <div className="space-y-2">
              {relationshipTypes.map(type => (
                <div key={type.id} className="flex items-center">
                  <div className="w-4 h-4 rounded-full mr-2" style={{ backgroundColor: type.color }}></div>
                  <div className="text-sm">
                    <span className="font-medium">{type.label}</span>
                    <span className="text-gray-500 ml-2">
                      {type.id === 'conflict' ? 'Negative' : `${type.defaultStrength * 100}%`}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-4 pt-4 border-t border-gray-200">
              <p className="text-sm text-gray-600">
                Relationship strength influences how guests are grouped together. Stronger relationships (higher percentage) increase the likelihood of guests being seated together.
              </p>
            </div>
          </div>
        </div>
        
        {/* Relationship Panel */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-medium">
                {selectedGuest ? `Relationships for ${guests.find(g => g.id === selectedGuest)?.name || 'Selected Guest'}` : 'Guest Relationships'}
              </h2>
              <div className="flex space-x-2">
                <button
                  type="button"
                  onClick={handleAiSuggestion}
                  disabled={!selectedGuest}
                  className={`inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm ${
                    !selectedGuest
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      : 'text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500'
                  }`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  AI Suggest
                </button>
                <button
                  type="button"
                  onClick={handleShowAddModal}
                  disabled={!selectedGuest}
                  className={`inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm ${
                    !selectedGuest
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      : 'text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
                  }`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  Add Relationship
                </button>
              </div>
            </div>
            
            {selectedGuest ? (
              <>
                {getGuestRelationships().length > 0 ? (
                  <div className="space-y-4">
                    {getGuestRelationships().map(relationship => {
                      const relatedGuest = getRelatedGuest(relationship);
                      const relType = getRelationshipType(relationship.type);
                      
                      return (
                        <div key={relationship.id} className="border rounded-lg p-4">
                          <div className="flex flex-wrap justify-between items-start gap-4">
                            <div>
                              <div className="font-medium text-gray-900">{relatedGuest?.name || 'Unknown Guest'}</div>
                              <div className="flex items-center mt-1">
                                <div className="flex-shrink-0 w-3 h-3 rounded-full mr-2" style={{ backgroundColor: relType.color }}></div>
                                <span className="text-sm text-gray-600">{relType.label}</span>
                                <span className="text-sm text-gray-500 ml-2">
                                  Strength: {relationship.type === 'conflict' ? 'Negative' : `${Math.round(relationship.strength * 100)}%`}
                                </span>
                              </div>
                              {relationship.notes && (
                                <div className="mt-2 text-sm text-gray-500 italic">
                                  "{relationship.notes}"
                                </div>
                              )}
                            </div>
                            
                            <div className="flex space-x-2">
                              <div className="relative">
                                <select
                                  className="pl-3 pr-10 py-2 text-sm border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                  value={relationship.type}
                                  onChange={(e) => handleUpdateRelationship(relationship.id, { type: e.target.value })}
                                >
                                  {relationshipTypes.map(type => (
                                    <option key={type.id} value={type.id}>{type.label}</option>
                                  ))}
                                </select>
                              </div>
                              
                              <div className="relative">
                                <select
                                  className="pl-3 pr-10 py-2 text-sm border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                  value={relationship.strength}
                                  onChange={(e) => handleUpdateRelationship(relationship.id, { strength: parseFloat(e.target.value) })}
                                  disabled={relationship.type === 'conflict'}
                                >
                                  {relationship.type === 'conflict' ? (
                                    <option value="-0.5">Conflict</option>
                                  ) : (
                                    [0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0].map(value => (
                                      <option key={value} value={value}>{Math.round(value * 100)}%</option>
                                    ))
                                  )}
                                </select>
                              </div>
                              
                              <button
                                type="button"
                                onClick={() => handleDeleteRelationship(relationship.id)}
                                className="inline-flex items-center p-2 border border-transparent rounded-full shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                              >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                              </button>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="text-center py-12 border-2 border-dashed border-gray-300 rounded-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-400 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                    </svg>
                    <h3 className="text-lg font-medium text-gray-900 mb-1">No relationships yet</h3>
                    <p className="text-gray-500 max-w-sm mx-auto">
                      This guest doesn't have any defined relationships. Click "Add Relationship" to connect them with other guests.
                    </p>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-12 border-2 border-dashed border-gray-300 rounded-lg">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-400 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                <h3 className="text-lg font-medium text-gray-900 mb-1">Select a guest</h3>
                <p className="text-gray-500 max-w-sm mx-auto">
                  Select a guest from the list to view and edit their relationships.
                </p>
              </div>
            )}
            
            {/* Instructions */}
            <div className="mt-6 bg-blue-50 p-4 rounded-lg">
              <h3 className="font-medium text-blue-800 mb-2">How Relationships Work</h3>
              <p className="text-sm text-blue-700 mb-2">
                Relationships define how guests are connected to each other and influence the seating arrangement algorithm:
              </p>
              <ul className="text-sm text-blue-700 space-y-1 list-disc list-inside">
                <li>Stronger relationships increase the likelihood of guests being seated together</li>
                <li>Conflicts ensure guests will never be seated at the same table</li>
                <li>The AI can suggest relationships based on text descriptions</li>
                <li>Relationship data is used by the optimization algorithm to create balanced seating arrangements</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      
      {/* Add Relationship Modal */}
      {showAddModal && (
        <div className="fixed inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
            
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            
            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
              <div>
                <div className="mt-3 text-center sm:mt-5">
                  <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                    Add Relationship
                  </h3>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      Define a relationship between {guests.find(g => g.id === selectedGuest)?.name || 'selected guest'} and another guest.
                    </p>
                  </div>
                </div>
                
                <div className="mt-5 space-y-4">
                  <div>
                    <label htmlFor="targetGuest" className="block text-sm font-medium text-gray-700">
                      Related Guest
                    </label>
                    <select
                      id="targetGuest"
                      name="targetGuest"
                      className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                      value={newRelationship.targetGuest}
                      onChange={(e) => setNewRelationship({...newRelationship, targetGuest: e.target.value})}
                      required
                    >
                      <option value="">Select a guest</option>
                      {getAvailableTargetGuests().map(guest => (
                        <option key={guest.id} value={guest.id}>{guest.name}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label htmlFor="relationshipType" className="block text-sm font-medium text-gray-700">
                      Relationship Type
                    </label>
                    <select
                      id="relationshipType"
                      name="relationshipType"
                      className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                      value={newRelationship.type}
                      onChange={(e) => {
                        const type = e.target.value;
                        let strength = newRelationship.strength;
                        
                        // Update default strength based on type
                        if (type === 'conflict') {
                          strength = -0.5;
                        } else {
                          const typeInfo = relationshipTypes.find(t => t.id === type);
                          if (typeInfo) {
                            strength = typeInfo.defaultStrength;
                          }
                        }
                        
                        setNewRelationship({
                          ...newRelationship, 
                          type, 
                          strength
                        });
                      }}
                      required
                    >
                      {relationshipTypes.map(type => (
                        <option key={type.id} value={type.id}>{type.label}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label htmlFor="relationshipStrength" className="block text-sm font-medium text-gray-700">
                      Relationship Strength
                    </label>
                    <select
                      id="relationshipStrength"
                      name="relationshipStrength"
                      className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                      value={newRelationship.strength}
                      onChange={(e) => setNewRelationship({...newRelationship, strength: parseFloat(e.target.value)})}
                      disabled={newRelationship.type === 'conflict'}
                      required
                    >
                      {newRelationship.type === 'conflict' ? (
                        <option value="-0.5">Conflict</option>
                      ) : (
                        [0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0].map(value => (
                          <option key={value} value={value}>{Math.round(value * 100)}%</option>
                        ))
                      )}
                    </select>
                  </div>
                  
                  <div>
                    <label htmlFor="relationshipNotes" className="block text-sm font-medium text-gray-700">
                      Notes (Optional)
                    </label>
                    <textarea
                      id="relationshipNotes"
                      name="relationshipNotes"
                      rows={3}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      placeholder="E.g., Cousins from mother's side, Colleagues from Finance department, etc."
                      value={newRelationship.notes}
                      onChange={(e) => setNewRelationship({...newRelationship, notes: e.target.value})}
                    />
                  </div>
                </div>
              </div>
              
              <div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:col-start-2 sm:text-sm"
                  onClick={handleAddRelationship}
                >
                  Add Relationship
                </button>
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:col-start-1 sm:text-sm"
                  onClick={() => setShowAddModal(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* AI Suggestion Modal */}
      {showAiModal && (
        <div className="fixed inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
            
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            
            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
              <div>
                <div className="mt-3 text-center sm:mt-5">
                  <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                    AI Relationship Suggestions
                  </h3>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      Describe {guests.find(g => g.id === selectedGuest)?.name || 'selected guest'}'s relationships with other guests. The AI will analyze your description and suggest relationships.
                    </p>
                  </div>
                </div>
                
                <div className="mt-5">
                  <label htmlFor="aiSuggestion" className="block text-sm font-medium text-gray-700">
                    Describe Relationships
                  </label>
                  <textarea
                    id="aiSuggestion"
                    name="aiSuggestion"
                    rows={6}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                    placeholder="Example: John is Sarah's brother. He's good friends with Mike and David but doesn't get along with Emma. He works with Robert in the same department."
                    value={aiSuggestion}
                    onChange={(e) => setAiSuggestion(e.target.value)}
                  />
                </div>
                
                <div className="mt-4 bg-purple-50 rounded-md p-4">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <svg className="h-5 w-5 text-purple-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="ml-3 flex-1 md:flex md:justify-between">
                      <p className="text-sm text-purple-700">
                        The AI will identify relationships, assign types, and determine strengths. You can edit or delete any suggestions afterward.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-purple-600 text-base font-medium text-white hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 sm:col-start-2 sm:text-sm"
                  onClick={processAiSuggestion}
                  disabled={processingAi || !aiSuggestion.trim()}
                >
                  {processingAi ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing...
                    </>
                  ) : (
                    'Process with AI'
                  )}
                </button>
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 sm:mt-0 sm:col-start-1 sm:text-sm"
                  onClick={() => setShowAiModal(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default RelationshipEditor;