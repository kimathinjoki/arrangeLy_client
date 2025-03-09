import React, { useState } from 'react';

function ArrangementDetails() {
  const [formData, setFormData] = useState({
    venueType: 'indoor',
    venueSize: '',
    numberOfTables: '',
    seatsPerTable: '',
    tableLayout: 'round',
    specialTables: false,
    specialTablesCount: '',
    vipTable: false,
    kidsTable: false,
    specialRequirements: ''
  });
  
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would save the arrangement details
    alert('Arrangement details saved!');
  };
  
  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold mb-6">Arrangement Details</h1>
      
      <div className="bg-white p-6 rounded-lg shadow-md">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {/* Venue Type */}
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Venue Type
              </label>
              <div className="flex space-x-4">
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="venueType"
                    value="indoor"
                    checked={formData.venueType === 'indoor'}
                    onChange={handleInputChange}
                    className="form-radio text-blue-600"
                  />
                  <span className="ml-2">Indoor</span>
                </label>
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="venueType"
                    value="outdoor"
                    checked={formData.venueType === 'outdoor'}
                    onChange={handleInputChange}
                    className="form-radio text-blue-600"
                  />
                  <span className="ml-2">Outdoor</span>
                </label>
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="venueType"
                    value="hybrid"
                    checked={formData.venueType === 'hybrid'}
                    onChange={handleInputChange}
                    className="form-radio text-blue-600"
                  />
                  <span className="ml-2">Hybrid</span>
                </label>
              </div>
            </div>
            
            {/* Venue Size */}
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="venueSize">
                Venue Size (sqft)
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="venueSize"
                type="number"
                name="venueSize"
                value={formData.venueSize}
                onChange={handleInputChange}
                placeholder="Venue Size"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {/* Number of Tables */}
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="numberOfTables">
                Number of Tables
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="numberOfTables"
                type="number"
                name="numberOfTables"
                value={formData.numberOfTables}
                onChange={handleInputChange}
                placeholder="Number of Tables"
              />
            </div>
            
            {/* Seats Per Table */}
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="seatsPerTable">
                Seats Per Table
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="seatsPerTable"
                type="number"
                name="seatsPerTable"
                value={formData.seatsPerTable}
                onChange={handleInputChange}
                placeholder="Seats Per Table"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {/* Table Layout */}
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="tableLayout">
                Table Layout
              </label>
              <select
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="tableLayout"
                name="tableLayout"
                value={formData.tableLayout}
                onChange={handleInputChange}
              >
                <option value="round">Round Tables</option>
                <option value="rectangular">Rectangular Tables</option>
                <option value="mixed">Mixed Table Types</option>
              </select>
            </div>
            
            {/* Special Tables */}
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Special Tables
              </label>
              <div className="mt-2">
                <div className="flex items-center mb-2">
                  <input
                    id="specialTables"
                    name="specialTables"
                    type="checkbox"
                    checked={formData.specialTables}
                    onChange={handleInputChange}
                    className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                  />
                  <label htmlFor="specialTables" className="ml-2 block text-sm text-gray-700">
                    Include Special Tables
                  </label>
                </div>
                
                {formData.specialTables && (
                  <div className="pl-6 space-y-2">
                    <div>
                      <label className="block text-gray-700 text-sm mb-1" htmlFor="specialTablesCount">
                        How Many Special Tables?
                      </label>
                      <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="specialTablesCount"
                        type="number"
                        name="specialTablesCount"
                        value={formData.specialTablesCount}
                        onChange={handleInputChange}
                        placeholder="Number of Special Tables"
                      />
                    </div>
                    
                    <div className="flex items-center">
                      <input
                        id="vipTable"
                        name="vipTable"
                        type="checkbox"
                        checked={formData.vipTable}
                        onChange={handleInputChange}
                        className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                      />
                      <label htmlFor="vipTable" className="ml-2 block text-sm text-gray-700">
                        VIP Table
                      </label>
                    </div>
                    
                    <div className="flex items-center">
                      <input
                        id="kidsTable"
                        name="kidsTable"
                        type="checkbox"
                        checked={formData.kidsTable}
                        onChange={handleInputChange}
                        className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                      />
                      <label htmlFor="kidsTable" className="ml-2 block text-sm text-gray-700">
                        Kids Table
                      </label>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="specialRequirements">
              Special Requirements or Notes
            </label>
            <textarea
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="specialRequirements"
              name="specialRequirements"
              value={formData.specialRequirements}
              onChange={handleInputChange}
              placeholder="Add any special requirements or notes here..."
              rows="4"
            ></textarea>
          </div>
          
          <div className="flex items-center justify-between">
            <button
              type="button"
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Reset
            </button>
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Save Arrangement Details
            </button>
          </div>
        </form>
      </div>
      
      {/* Preview Section */}
      <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-lg font-semibold mb-4">Layout Preview</h2>
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center h-64">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-400 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2" />
          </svg>
          <p className="text-center text-gray-500">
            Fill in the arrangement details to see a preview of your venue layout.
            <br />
            This feature helps you visualize how tables will be arranged.
          </p>
        </div>
      </div>
    </div>
  );
}

export default ArrangementDetails;