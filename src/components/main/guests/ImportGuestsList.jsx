import React, { useState } from 'react';

function ImportGuestsList() {
  const [file, setFile] = useState(null);
  const [previewData, setPreviewData] = useState([]);
  const [importing, setImporting] = useState(false);
  const [importComplete, setImportComplete] = useState(false);
  const [importStats, setImportStats] = useState({
    total: 0,
    success: 0,
    error: 0
  });
  
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    
    // Reset states
    setPreviewData([]);
    setImportComplete(false);
    
    // If there's a file, simulate parsing preview data
    if (selectedFile) {
      // This is a simulation - in a real app, you'd parse the actual CSV/Excel file
      const mockPreviewData = [
        { firstName: 'John', lastName: 'Doe', email: 'john.doe@example.com', phone: '555-123-4567', relationship: 'Family' },
        { firstName: 'Jane', lastName: 'Smith', email: 'jane.smith@example.com', phone: '555-987-6543', relationship: 'Friend' },
        { firstName: 'Robert', lastName: 'Johnson', email: 'robert.j@example.com', phone: '555-456-7890', relationship: 'Colleague' }
      ];
      
      setPreviewData(mockPreviewData);
    }
  };
  
  const handleImport = () => {
    if (!file) return;
    
    setImporting(true);
    
    // Simulate import process
    setTimeout(() => {
      // Simulate successful import with some stats
      setImportStats({
        total: previewData.length + 5,
        success: previewData.length + 3,
        error: 2
      });
      
      setImporting(false);
      setImportComplete(true);
    }, 2000);
  };
  
  const handleDownloadTemplate = () => {
    // In a real app, this would create and download a CSV/Excel template
    alert('Template download simulation. This would download a template file.');
  };
  
  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold mb-6">Import Guests List</h1>
      
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-lg font-semibold mb-4">Upload File</h2>
        
        <div className="mb-6">
          <p className="text-gray-600 mb-4">
            Upload a CSV or Excel file containing your guest list. The file should include columns for first name, last name, 
            email, phone number, and relationship.
          </p>
          
          <button 
            onClick={handleDownloadTemplate}
            className="text-blue-600 hover:text-blue-800 underline mb-4 flex items-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Download template
          </button>
          
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-400 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            
            <p className="text-sm text-gray-500 mb-3">
              {file ? file.name : "Drag and drop your file here, or click to browse"}
            </p>
            
            <input
              type="file"
              id="guestListFile"
              accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
              className="hidden"
              onChange={handleFileChange}
            />
            
            <label 
              htmlFor="guestListFile"
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline cursor-pointer"
            >
              Select File
            </label>
          </div>
        </div>
        
        {previewData.length > 0 && (
          <div className="mb-6">
            <h3 className="text-md font-medium mb-2">Preview (First 3 rows)</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">First Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Relationship</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {previewData.map((guest, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{guest.firstName}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{guest.lastName}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{guest.email}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{guest.phone}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{guest.relationship}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
        
        {file && (
          <div className="flex justify-end">
            <button
              onClick={handleImport}
              disabled={importing}
              className={`flex items-center ${importing ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700'} text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline`}
            >
              {importing ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Importing...
                </>
              ) : (
                'Import Guests'
              )}
            </button>
          </div>
        )}
      </div>
      
      {importComplete && (
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold mb-4">Import Results</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-gray-100 p-4 rounded-lg">
              <p className="text-gray-500 text-sm">Total Guests</p>
              <p className="text-2xl font-bold">{importStats.total}</p>
            </div>
            <div className="bg-green-100 p-4 rounded-lg">
              <p className="text-green-600 text-sm">Successfully Imported</p>
              <p className="text-2xl font-bold text-green-600">{importStats.success}</p>
            </div>
            <div className="bg-red-100 p-4 rounded-lg">
              <p className="text-red-600 text-sm">Failed to Import</p>
              <p className="text-2xl font-bold text-red-600">{importStats.error}</p>
            </div>
          </div>
          
          {importStats.error > 0 && (
            <div className="bg-red-50 border border-red-200 rounded-md p-4 mb-6">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-red-800">
                    There were {importStats.error} error(s) with your guest import
                  </h3>
                  <div className="mt-2 text-sm text-red-700">
                    <ul className="list-disc pl-5">
                      <li>Some guest records contained invalid or missing data</li>
                      <li>You can download the error log to see the details</li>
                    </ul>
                  </div>
                  <div className="mt-4">
                    <button
                      type="button"
                      className="inline-flex items-center px-3 py-2 border border-red-600 text-sm leading-4 font-medium rounded-md text-red-700 bg-white hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                    >
                      Download Error Log
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          <div className="flex justify-between">
            <button
              className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              onClick={() => {
                setFile(null);
                setPreviewData([]);
                setImportComplete(false);
              }}
            >
              Import Another File
            </button>
            
            <button
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              View All Guests
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ImportGuestsList;