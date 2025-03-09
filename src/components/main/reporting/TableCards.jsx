import React, { useState, useEffect } from 'react';
import { arrangementService } from '../../../api/rubyBackendService';

function TableCards() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [arrangements, setArrangements] = useState([]);
  const [selectedArrangement, setSelectedArrangement] = useState('');
  const [templateStyle, setTemplateStyle] = useState('classic');
  const [cardSize, setCardSize] = useState('a6');
  const [includeGuestList, setIncludeGuestList] = useState(true);
  const [cardTitle, setCardTitle] = useState('Table {number}');
  const [customMessage, setCustomMessage] = useState('');
  const [generating, setGenerating] = useState(false);
  const [preview, setPreview] = useState(null);
  
  // Mock event ID - in a real app, this would come from your context or route params
  const eventId = 1;
  
  useEffect(() => {
    const fetchArrangements = async () => {
      try {
        setLoading(true);
        const data = await arrangementService.getArrangements(eventId);
        setArrangements(data.arrangements);
        
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
        setError('Failed to fetch arrangements. Please try again.');
        setLoading(false);
      }
    };
    
    fetchArrangements();
  }, [eventId]);
  
  const handleGeneratePreview = async () => {
    if (!selectedArrangement) {
      setError('Please select an arrangement');
      return;
    }
    
    try {
      setGenerating(true);
      setError(null);
      
      // This would call your API to generate a preview
      const previewData = await getMockTableCardPreview();
      
      setPreview(previewData);
      setGenerating(false);
    } catch (err) {
      console.error('Error generating preview:', err);
      setError('Failed to generate preview. Please try again.');
      setGenerating(false);
    }
  };
  
  const handleGeneratePDF = async () => {
    if (!selectedArrangement) {
      setError('Please select an arrangement');
      return;
    }
    
    try {
      setGenerating(true);
      setError(null);
      
      await arrangementService.generateTableCards(eventId, selectedArrangement, {
        templateStyle,
        cardSize,
        includeGuestList,
        cardTitle,
        customMessage
      });
      
      // PDF download is handled by the service
      setGenerating(false);
    } catch (err) {
      console.error('Error generating PDF:', err);
      setError('Failed to generate PDF. Please try again.');
      setGenerating(false);
    }
  };
  
  // Mock function to generate preview data for demonstration
  const getMockTableCardPreview = () => {
    // Simulating API delay
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          imageUrl: 'https://via.placeholder.com/600x400?text=Table+Card+Preview',
          tables: [
            { id: 1, name: 'Table 1', capacity: 8, guestCount: 7 },
            { id: 2, name: 'Table 2', capacity: 8, guestCount: 8 },
            { id: 3, name: 'Table 3', capacity: 10, guestCount: 9 },
          ]
        });
      }, 1000);
    });
  };
  
  // Loading state
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-center">
          <svg className="animate-spin h-10 w-10 text-blue-600 mx-auto mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <p className="text-gray-600">Loading arrangements...</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold mb-6">Table Cards</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Settings Panel */}
        <div className="lg:col-span-1">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold mb-4">Table Card Settings</h2>
            
            {error && (
              <div className="mb-4 bg-red-50 border-l-4 border-red-500 p-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-red-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-red-700">{error}</p>
                  </div>
                </div>
              </div>
            )}
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="arrangement">
                  Select Arrangement
                </label>
                <select
                  id="arrangement"
                  className="w-full p-2 border rounded"
                  value={selectedArrangement}
                  onChange={(e) => setSelectedArrangement(e.target.value)}
                  disabled={arrangements.length === 0}
                >
                  {arrangements.length === 0 ? (
                    <option value="">No arrangements available</option>
                  ) : (
                    <>
                      <option value="">Select an arrangement</option>
                      {arrangements.map(arr => (
                        <option key={arr.id} value={arr.id}>
                          {arr.name} {arr.status === 'current' ? '(Current)' : ''}
                        </option>
                      ))}
                    </>
                  )}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="template">
                  Template Style
                </label>
                <select
                  id="template"
                  className="w-full p-2 border rounded"
                  value={templateStyle}
                  onChange={(e) => setTemplateStyle(e.target.value)}
                >
                  <option value="classic">Classic</option>
                  <option value="modern">Modern</option>
                  <option value="elegant">Elegant</option>
                  <option value="rustic">Rustic</option>
                  <option value="minimalist">Minimalist</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="cardSize">
                  Card Size
                </label>
                <select
                  id="cardSize"
                  className="w-full p-2 border rounded"
                  value={cardSize}
                  onChange={(e) => setCardSize(e.target.value)}
                >
                  <option value="a6">A6 (4.1 × 5.8 inches)</option>
                  <option value="a5">A5 (5.8 × 8.3 inches)</option>
                  <option value="a4">A4 (8.3 × 11.7 inches)</option>
                  <option value="letter">Letter (8.5 × 11 inches)</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="cardTitle">
                  Card Title Format
                </label>
                <input
                  id="cardTitle"
                  type="text"
                  className="w-full p-2 border rounded"
                  value={cardTitle}
                  onChange={(e) => setCardTitle(e.target.value)}
                  placeholder="Use {number} for table number"
                />
                <p className="mt-1 text-xs text-gray-500">
                  Use {'{number}'} as a placeholder for the table number.
                </p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="customMessage">
                  Custom Message (Optional)
                </label>
                <textarea
                  id="customMessage"
                  className="w-full p-2 border rounded"
                  rows="3"
                  value={customMessage}
                  onChange={(e) => setCustomMessage(e.target.value)}
                  placeholder="Add a message to appear on all table cards"
                ></textarea>
              </div>
              
              <div className="flex items-center">
                <input
                  id="includeGuestList"
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  checked={includeGuestList}
                  onChange={(e) => setIncludeGuestList(e.target.checked)}
                />
                <label htmlFor="includeGuestList" className="ml-2 block text-sm text-gray-900">
                  Include guest list on each card
                </label>
              </div>
              
              <div className="pt-4 flex space-x-3">
                <button
                  type="button"
                  onClick={handleGeneratePreview}
                  disabled={generating || !selectedArrangement}
                  className={`flex-1 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
                    generating || !selectedArrangement
                      ? 'bg-gray-300 cursor-not-allowed'
                      : 'bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
                  }`}
                >
                  {generating ? 'Generating...' : 'Preview'}
                </button>
                
                <button
                  type="button"
                  onClick={handleGeneratePDF}
                  disabled={generating || !selectedArrangement}
                  className={`flex-1 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
                    generating || !selectedArrangement
                      ? 'bg-gray-300 cursor-not-allowed'
                      : 'bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500'
                  }`}
                >
                  {generating ? 'Generating...' : 'Generate PDF'}
                </button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Preview Panel */}
        <div className="lg:col-span-2">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold mb-4">Preview</h2>
            
            {!preview ? (
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-400 mx-auto mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <p className="text-center text-gray-500">
                  Select an arrangement and click "Preview" to see how your table cards will look.
                </p>
              </div>
            ) : (
              <div>
                <div className="mb-6 border rounded-lg overflow-hidden">
                  <img 
                    src={preview.imageUrl} 
                    alt="Table Card Preview" 
                    className="w-full"
                  />
                </div>
                
                <div>
                  <h3 className="font-medium mb-2">Tables Included:</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {preview.tables.map(table => (
                      <div key={table.id} className="border rounded p-3">
                        <p className="font-medium">{table.name}</p>
                        <p className="text-sm text-gray-600">{table.guestCount} of {table.capacity} guests</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
          
          <div className="mt-6 bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold mb-4">Tips for Table Cards</h2>
            
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500 mr-2 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Print on thick cardstock (110lb or higher) for durability</span>
              </li>
              <li className="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500 mr-2 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>If using guest lists, consider privacy by only including first names</span>
              </li>
              <li className="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500 mr-2 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Make table cards at least 5 inches tall so they're visible across the room</span>
              </li>
              <li className="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500 mr-2 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Use table cards that match your event's theme and color scheme</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TableCards;