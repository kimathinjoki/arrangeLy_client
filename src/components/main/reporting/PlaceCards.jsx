import React, { useState, useEffect } from 'react';
import { arrangementService } from '../../../api/rubyBackendService';

function PlaceCards() {
  // State for loading and errors
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [generating, setGenerating] = useState(false);
  
  // Data state
  const [arrangements, setArrangements] = useState([]);
  const [guests, setGuests] = useState([]);
  const [tables, setTables] = useState([]);
  
  // Selection state
  const [selectedArrangement, setSelectedArrangement] = useState('');
  const [selectedGuests, setSelectedGuests] = useState([]);
  const [selectedTables, setSelectedTables] = useState([]);
  const [currentSelectionMode, setCurrentSelectionMode] = useState('guests'); // 'guests' or 'tables'
  
  // Filter state
  const [searchTerm, setSearchTerm] = useState('');
  const [filterByTable, setFilterByTable] = useState('all');
  
  // Card configuration state
  const [cardSettings, setCardSettings] = useState({
    templateStyle: 'elegant',
    cardType: 'tent',
    orientation: 'horizontal',
    includeTableNumber: true,
    includeEventName: true,
    eventName: 'Our Special Day',
    includeDate: false,
    eventDate: new Date().toISOString().split('T')[0],
    addPersonalMessage: false,
    personalMessage: 'Thank you for celebrating with us'
  });
  
  // Preview state
  const [previewData, setPreviewData] = useState(null);
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  
  // Mock event ID - in a real app, this would come from your context or route params
  const eventId = 1;
  
  useEffect(() => {
    fetchArrangements();
  }, []);
  
  useEffect(() => {
    if (selectedArrangement) {
      fetchGuestsAndTables();
    }
  }, [selectedArrangement]);
  
  // Fetch arrangements
  const fetchArrangements = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Get arrangements from API
      const data = await arrangementService.getArrangements(eventId);
      setArrangements(data.arrangements || []);
      
      // If there's a current arrangement, select it by default
      const currentArrangement = data.arrangements.find(arr => arr.status === 'current');
      if (currentArrangement) {
        setSelectedArrangement(currentArrangement.id);
      } else if (data.arrangements.length > 0) {
        setSelectedArrangement(data.arrangements[0].id);
      }
      
      setLoading(false);
    } catch (err) {
      console.error('Error fetching arrangements:', err);
      setError('Failed to load arrangements. Please try again.');
      setLoading(false);
    }
  };
  
  // Fetch guests and tables for selected arrangement
  const fetchGuestsAndTables = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Get guests and tables from API
      const data = await arrangementService.getArrangementDetails(eventId, selectedArrangement);
      
      // Process and set guests
      const processedGuests = data.guests.map(guest => ({
        ...guest,
        // Ensure the tableName property exists
        tableName: guest.tableName || 'Unassigned'
      }));
      setGuests(processedGuests);
      
      // Process and set tables
      setTables(data.tables || []);
      
      // Reset selections
      setSelectedGuests([]);
      setSelectedTables([]);
      
      setLoading(false);
    } catch (err) {
      console.error('Error fetching arrangement details:', err);
      setError('Failed to load guests and tables. Please try again.');
      setLoading(false);
    }
  };
  
  // Handle selecting all guests
  const handleSelectAllGuests = () => {
    // If all are selected, deselect all. Otherwise, select all that match the current filter
    if (selectedGuests.length === filteredGuests.length) {
      setSelectedGuests([]);
    } else {
      setSelectedGuests(filteredGuests.map(guest => guest.id));
    }
  };
  
  // Handle selecting all tables
  const handleSelectAllTables = () => {
    // If all are selected, deselect all. Otherwise, select all
    if (selectedTables.length === tables.length) {
      setSelectedTables([]);
    } else {
      setSelectedTables(tables.map(table => table.id));
    }
  };
  
  // Toggle selection of a guest
  const toggleGuestSelection = (guestId) => {
    setSelectedGuests(prev => 
      prev.includes(guestId)
        ? prev.filter(id => id !== guestId)
        : [...prev, guestId]
    );
  };
  
  // Toggle selection of a table
  const toggleTableSelection = (tableId) => {
    setSelectedTables(prev => 
      prev.includes(tableId)
        ? prev.filter(id => id !== tableId)
        : [...prev, tableId]
    );
  };
  
  // Handle card setting changes
  const updateCardSettings = (name, value) => {
    setCardSettings(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  // Filter guests based on search term and table filter
  const filteredGuests = guests.filter(guest => {
    const matchesSearch = guest.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTable = filterByTable === 'all' || guest.tableId === parseInt(filterByTable);
    return matchesSearch && matchesTable;
  });
  
  // Get selected guest count based on current selection mode
  const getSelectedCount = () => {
    if (currentSelectionMode === 'guests') {
      return selectedGuests.length;
    } else {
      // Count guests at selected tables
      return guests.filter(guest => 
        guest.tableId && selectedTables.includes(guest.tableId)
      ).length;
    }
  };
  
  // Get total selectable count
  const getTotalCount = () => {
    if (currentSelectionMode === 'guests') {
      return filteredGuests.length;
    } else {
      return tables.length;
    }
  };
  
  // Generate a preview
  const handleGeneratePreview = async () => {
    if (!selectedArrangement) {
      setError('Please select an arrangement first');
      return;
    }
    
    if (currentSelectionMode === 'guests' && selectedGuests.length === 0) {
      setError('Please select at least one guest');
      return;
    }
    
    if (currentSelectionMode === 'tables' && selectedTables.length === 0) {
      setError('Please select at least one table');
      return;
    }
    
    try {
      setGenerating(true);
      setError(null);
      
      // In a real implementation, this would call your API
      // For now, we'll simulate a preview
      const previewResult = await mockGeneratePreview();
      setPreviewData(previewResult);
      setShowPreviewModal(true);
      setGenerating(false);
    } catch (err) {
      console.error('Error generating preview:', err);
      setError('Failed to generate preview. Please try again.');
      setGenerating(false);
    }
  };
  
  // Generate final PDF
  const handleGeneratePDF = async () => {
    if (!selectedArrangement) {
      setError('Please select an arrangement first');
      return;
    }
    
    if (currentSelectionMode === 'guests' && selectedGuests.length === 0) {
      setError('Please select at least one guest');
      return;
    }
    
    if (currentSelectionMode === 'tables' && selectedTables.length === 0) {
      setError('Please select at least one table');
      return;
    }
    
    try {
      setGenerating(true);
      setError(null);
      
      // In a real implementation, this would call your API
      await arrangementService.generatePlaceCards(eventId, selectedArrangement, {
        ...cardSettings,
        selectionMode: currentSelectionMode,
        selectedGuests: currentSelectionMode === 'guests' ? selectedGuests : [],
        selectedTables: currentSelectionMode === 'tables' ? selectedTables : []
      });
      
      // PDF download is handled by the service
      setGenerating(false);
    } catch (err) {
      console.error('Error generating PDF:', err);
      setError('Failed to generate PDF. Please try again.');
      setGenerating(false);
    }
  };
  
  // Mock function to simulate preview generation
  const mockGeneratePreview = () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          imageUrl: 'https://via.placeholder.com/600x300?text=Place+Card+Preview',
          cardStyle: cardSettings.templateStyle,
          examples: [
            { name: 'John Smith', table: 'Table 1' },
            { name: 'Emily Johnson', table: 'Table 2' },
            { name: 'Michael Williams', table: 'Table 3' }
          ]
        });
      }, 1000);
    });
  };
  
  // Render loading spinner
  if (loading && !guests.length && !arrangements.length) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-3 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold mb-6">Place Cards Generator</h1>
      
      {error && (
        <div className="mb-6 bg-red-50 border-l-4 border-red-500 p-4">
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
      
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Card Settings Panel - 2 columns */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-lg font-medium mb-4">Card Settings</h2>
            
            {/* Arrangement Selection */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="arrangement">
                Seating Arrangement
              </label>
              <select
                id="arrangement"
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                value={selectedArrangement}
                onChange={(e) => setSelectedArrangement(e.target.value)}
              >
                <option value="">Select an arrangement</option>
                {arrangements.map(arr => (
                  <option key={arr.id} value={arr.id}>
                    {arr.name} {arr.status === 'current' ? '(Current)' : ''}
                  </option>
                ))}
              </select>
            </div>
            
            {/* Card Type */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Card Type
              </label>
              <div className="grid grid-cols-3 gap-3">
                <div 
                  className={`border rounded-lg p-3 text-center cursor-pointer ${
                    cardSettings.cardType === 'tent' ? 'border-blue-500 bg-blue-50' : 'hover:bg-gray-50'
                  }`}
                  onClick={() => updateCardSettings('cardType', 'tent')}
                >
                  <div className="mx-auto h-12 w-20 bg-gray-200 mb-2 flex items-end justify-center rounded transform rotate-12 origin-bottom">
                    <div className="w-full h-6 bg-white rounded-t"></div>
                  </div>
                  <span className="text-sm">Tent Fold</span>
                </div>
                <div 
                  className={`border rounded-lg p-3 text-center cursor-pointer ${
                    cardSettings.cardType === 'flat' ? 'border-blue-500 bg-blue-50' : 'hover:bg-gray-50'
                  }`}
                  onClick={() => updateCardSettings('cardType', 'flat')}
                >
                  <div className="mx-auto h-12 w-20 bg-white border-2 border-gray-200 mb-2 flex items-center justify-center rounded">
                    <div className="w-16 h-8 bg-gray-200 rounded"></div>
                  </div>
                  <span className="text-sm">Flat</span>
                </div>
                <div 
                  className={`border rounded-lg p-3 text-center cursor-pointer ${
                    cardSettings.cardType === 'folded' ? 'border-blue-500 bg-blue-50' : 'hover:bg-gray-50'
                  }`}
                  onClick={() => updateCardSettings('cardType', 'folded')}
                >
                  <div className="mx-auto h-12 w-20 bg-white border-2 border-gray-200 mb-2 flex items-center justify-center rounded">
                    <div className="w-1 h-10 bg-gray-300 rounded mx-auto"></div>
                  </div>
                  <span className="text-sm">Folded</span>
                </div>
              </div>
            </div>
            
            {/* Card Style */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Card Style
              </label>
              <div className="grid grid-cols-3 gap-3">
                {['elegant', 'modern', 'rustic'].map(style => (
                  <div 
                    key={style}
                    className={`border rounded-lg p-3 text-center cursor-pointer ${
                      cardSettings.templateStyle === style ? 'border-blue-500 bg-blue-50' : 'hover:bg-gray-50'
                    }`}
                    onClick={() => updateCardSettings('templateStyle', style)}
                  >
                    <div className="capitalize text-sm">{style}</div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Orientation */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Card Orientation
              </label>
              <div className="grid grid-cols-2 gap-3">
                <div 
                  className={`border rounded-lg p-3 text-center cursor-pointer ${
                    cardSettings.orientation === 'horizontal' ? 'border-blue-500 bg-blue-50' : 'hover:bg-gray-50'
                  }`}
                  onClick={() => updateCardSettings('orientation', 'horizontal')}
                >
                  <div className="mx-auto h-8 w-16 bg-gray-200 mb-2 flex items-center justify-center rounded">
                    <div className="w-12 h-4 bg-white rounded"></div>
                  </div>
                  <span className="text-sm">Landscape</span>
                </div>
                <div 
                  className={`border rounded-lg p-3 text-center cursor-pointer ${
                    cardSettings.orientation === 'vertical' ? 'border-blue-500 bg-blue-50' : 'hover:bg-gray-50'
                  }`}
                  onClick={() => updateCardSettings('orientation', 'vertical')}
                >
                  <div className="mx-auto h-16 w-8 bg-gray-200 mb-2 flex items-center justify-center rounded">
                    <div className="w-4 h-12 bg-white rounded"></div>
                  </div>
                  <span className="text-sm">Portrait</span>
                </div>
              </div>
            </div>
            
            {/* Content Options */}
            <div className="border-t pt-4 mt-4">
              <h3 className="font-medium text-sm mb-3">Content Options</h3>
              
              <div className="space-y-3">
                {/* Include Table Number */}
                <div className="flex items-center">
                  <input
                    id="includeTableNumber"
                    type="checkbox"
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    checked={cardSettings.includeTableNumber}
                    onChange={(e) => updateCardSettings('includeTableNumber', e.target.checked)}
                  />
                  <label htmlFor="includeTableNumber" className="ml-2 block text-sm text-gray-900">
                    Include table number
                  </label>
                </div>
                
                {/* Include Event Name */}
                <div>
                  <div className="flex items-center">
                    <input
                      id="includeEventName"
                      type="checkbox"
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      checked={cardSettings.includeEventName}
                      onChange={(e) => updateCardSettings('includeEventName', e.target.checked)}
                    />
                    <label htmlFor="includeEventName" className="ml-2 block text-sm text-gray-900">
                      Include event name
                    </label>
                  </div>
                  
                  {cardSettings.includeEventName && (
                    <input
                      type="text"
                      className="mt-2 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      value={cardSettings.eventName}
                      onChange={(e) => updateCardSettings('eventName', e.target.value)}
                    />
                  )}
                </div>
                
                {/* Include Date */}
                <div>
                  <div className="flex items-center">
                    <input
                      id="includeDate"
                      type="checkbox"
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      checked={cardSettings.includeDate}
                      onChange={(e) => updateCardSettings('includeDate', e.target.checked)}
                    />
                    <label htmlFor="includeDate" className="ml-2 block text-sm text-gray-900">
                      Include event date
                    </label>
                  </div>
                  
                  {cardSettings.includeDate && (
                    <input
                      type="date"
                      className="mt-2 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      value={cardSettings.eventDate}
                      onChange={(e) => updateCardSettings('eventDate', e.target.value)}
                    />
                  )}
                </div>
                
                {/* Add Personal Message */}
                <div>
                  <div className="flex items-center">
                    <input
                      id="addPersonalMessage"
                      type="checkbox"
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      checked={cardSettings.addPersonalMessage}
                      onChange={(e) => updateCardSettings('addPersonalMessage', e.target.checked)}
                    />
                    <label htmlFor="addPersonalMessage" className="ml-2 block text-sm text-gray-900">
                      Add personalized message
                    </label>
                  </div>
                  
                  {cardSettings.addPersonalMessage && (
                    <input
                      type="text"
                      className="mt-2 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      value={cardSettings.personalMessage}
                      placeholder="Thank you for celebrating with us"
                      onChange={(e) => updateCardSettings('personalMessage', e.target.value)}
                    />
                  )}
                </div>
              </div>
            </div>
            
            {/* Action Buttons */}
            <div className="border-t pt-4 mt-4 flex space-x-3">
              <button
                type="button"
                onClick={handleGeneratePreview}
                disabled={generating || !selectedArrangement || getSelectedCount() === 0}
                className={`flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white ${
                  generating || !selectedArrangement || getSelectedCount() === 0
                    ? 'bg-gray-300 cursor-not-allowed'
                    : 'bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
                }`}
              >
                {generating ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Generating...
                  </>
                ) : (
                  <>Preview</>
                )}
              </button>
              
              <button
                type="button"
                onClick={handleGeneratePDF}
                disabled={generating || !selectedArrangement || getSelectedCount() === 0}
                className={`flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white ${
                  generating || !selectedArrangement || getSelectedCount() === 0
                    ? 'bg-gray-300 cursor-not-allowed'
                    : 'bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500'
                }`}
              >
                {generating ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Generating...
                  </>
                ) : (
                  <>Generate PDF</>
                )}
              </button>
            </div>
          </div>
          
          {/* Printing Tips */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-lg font-medium mb-4">Printing Tips</h2>
            
            <div className="space-y-2">
              <div className="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500 mr-2 mt-0.5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-sm">Use high-quality cardstock (65-110lb) for professional results</span>
              </div>
              
              <div className="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500 mr-2 mt-0.5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-sm">Print a test page on regular paper first to check alignment</span>
              </div>
              
              <div className="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500 mr-2 mt-0.5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-sm">For tent cards, score along fold lines before folding</span>
              </div>
              
              <div className="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500 mr-2 mt-0.5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-sm">Print extra cards in case of mistakes or last-minute changes</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Selection Panel - 3 columns */}
        <div className="lg:col-span-3">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-medium">Select Recipients</h2>
              <div className="flex space-x-2">
                <button
                  type="button"
                  onClick={() => setCurrentSelectionMode('guests')}
                  className={`px-3 py-1 text-sm font-medium rounded-md ${
                    currentSelectionMode === 'guests'
                      ? 'bg-blue-100 text-blue-800'
                      : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                  }`}
                >
                  Select by Guest
                </button>
                <button
                  type="button"
                  onClick={() => setCurrentSelectionMode('tables')}
                  className={`px-3 py-1 text-sm font-medium rounded-md ${
                    currentSelectionMode === 'tables'
                      ? 'bg-blue-100 text-blue-800'
                      : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                  }`}
                >
                  Select by Table
                </button>
              </div>
            </div>
            
            {/* Selection Interface - Show either guest selection or table selection */}
            {currentSelectionMode === 'guests' ? (
              <div>
                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center space-x-4">
                    <div className="relative w-64">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <input
                        type="text"
                        className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 pr-3 py-2 border-gray-300 rounded-md text-sm"
                        placeholder="Search guests..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </div>
                    
                    <select
                      className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                      value={filterByTable}
                      onChange={(e) => setFilterByTable(e.target.value)}
                    >
                      <option value="all">All Tables</option>
                      {tables.map(table => (
                        <option key={table.id} value={table.id}>{table.name}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div className="text-sm text-gray-500">
                    {selectedGuests.length} of {filteredGuests.length} selected
                  </div>
                </div>
                
                <div className="border rounded-md mb-4">
                  <div className="bg-gray-50 px-4 py-3 border-b flex items-center">
                    <input
                      id="select-all-guests"
                      type="checkbox"
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      checked={selectedGuests.length === filteredGuests.length && filteredGuests.length > 0}
                      onChange={handleSelectAllGuests}
                    />
                    <label htmlFor="select-all-guests" className="ml-2 block text-sm text-gray-900">
                      Select All Visible Guests
                    </label>
                  </div>
                  
                  <div className="max-h-96 overflow-y-auto">
                    {filteredGuests.length > 0 ? (
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-10">
                              Select
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Guest
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Table
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {filteredGuests.map((guest, idx) => (
                            <tr 
                              key={guest.id} 
                              className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}
                              onClick={() => toggleGuestSelection(guest.id)}
                            >
                              <td className="px-6 py-4 whitespace-nowrap">
                                <input
                                  type="checkbox"
                                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                  checked={selectedGuests.includes(guest.id)}
                                  onChange={(e) => e.stopPropagation()}
                                  onClick={(e) => e.stopPropagation()}
                                />
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm font-medium text-gray-900">{guest.name}</div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm text-gray-500">{guest.tableName}</div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    ) : (
                      <div className="py-8 text-center text-gray-500">
                        {searchTerm ? 'No guests match your search' : 'No guests available in this arrangement'}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <div>
                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center">
                    <input
                      id="select-all-tables"
                      type="checkbox"
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      checked={selectedTables.length === tables.length && tables.length > 0}
                      onChange={handleSelectAllTables}
                    />
                    <label htmlFor="select-all-tables" className="ml-2 block text-sm text-gray-900">
                      Select All Tables
                    </label>
                  </div>
                  
                  <div className="text-sm text-gray-500">
                    {selectedTables.length} of {tables.length} tables selected
                  </div>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {tables.map(table => {
                    const guestsAtTable = guests.filter(g => g.tableId === table.id);
                    
                    return (
                      <div 
                        key={table.id} 
                        className={`border rounded-md overflow-hidden hover:shadow-md cursor-pointer ${
                          selectedTables.includes(table.id) ? 'border-blue-500 ring-2 ring-blue-100' : ''
                        }`}
                        onClick={() => toggleTableSelection(table.id)}
                      >
                        <div className="bg-gray-50 px-4 py-3 border-b flex justify-between items-center">
                          <div className="font-medium text-gray-900">{table.name}</div>
                          <div className="text-sm text-gray-500">{guestsAtTable.length} guests</div>
                        </div>
                        
                        <div className="p-4">
                          <div className="text-sm text-gray-600 mb-2">Guests:</div>
                          <ul className="space-y-1 max-h-36 overflow-y-auto">
                            {guestsAtTable.length > 0 ? (
                              guestsAtTable.map(guest => (
                                <li key={guest.id} className="text-sm text-gray-800">
                                  {guest.name}
                                </li>
                              ))
                            ) : (
                              <li className="text-sm text-gray-500 italic">No guests assigned</li>
                            )}
                          </ul>
                        </div>
                      </div>
                    );
                  })}
                  
                  {tables.length === 0 && (
                    <div className="col-span-3 py-8 text-center text-gray-500">
                      No tables available in this arrangement
                    </div>
                  )}
                </div>
              </div>
            )}
            
            {/* Preview Area */}
            <div className="mt-6 border-t pt-6">
              <h3 className="font-medium mb-4">Card Preview</h3>
              
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 bg-gray-50 flex flex-col items-center justify-center">
                {previewData ? (
                  <div className="text-center">
                    <img 
                      src={previewData.imageUrl} 
                      alt="Place Card Preview" 
                      className="mx-auto max-w-full h-auto rounded shadow-sm mb-4"
                    />
                    <p className="text-sm text-gray-600">Click "Generate PDF" to create printable cards</p>
                  </div>
                ) : (
                  <div className="text-center">
                    <svg className="h-12 w-12 text-gray-400 mx-auto mb-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <p className="text-gray-500 font-medium">Preview will appear here</p>
                    <p className="text-gray-400 text-sm mt-1">Select guests or tables and click "Preview" to see sample cards</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Preview Modal */}
      {showPreviewModal && previewData && (
        <div className="fixed inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
            
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            
            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full sm:p-6">
              <div>
                <div className="mt-3 text-center sm:mt-5">
                  <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                    Card Preview - {previewData.cardStyle} Style
                  </h3>
                  
                  <div className="mt-4">
                    <img 
                      src={previewData.imageUrl} 
                      alt="Place Card Preview" 
                      className="mx-auto max-w-full h-auto rounded-md"
                    />
                  </div>
                  
                  <div className="mt-6 grid grid-cols-3 gap-3">
                    {previewData.examples.map((example, index) => (
                      <div key={index} className="bg-gray-50 p-3 rounded-md text-center">
                        <p className="font-medium">{example.name}</p>
                        {cardSettings.includeTableNumber && (
                          <p className="text-sm text-gray-600">{example.table}</p>
                        )}
                      </div>
                    ))}
                  </div>
                  
                  <p className="mt-6 text-sm text-gray-500">
                    This is a preview of how your place cards will look. The final PDF will include cards for all selected {currentSelectionMode === 'guests' ? 'guests' : 'tables'}.
                  </p>
                </div>
              </div>
              
              <div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:col-start-2 sm:text-sm"
                  onClick={handleGeneratePDF}
                >
                  Generate PDF
                </button>
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:col-start-1 sm:text-sm"
                  onClick={() => setShowPreviewModal(false)}
                >
                  Close Preview
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default PlaceCards;