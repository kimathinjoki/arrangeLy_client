import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function GuestSurveyResponse() {
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [surveyData, setSurveyData] = useState(null);
  const [responses, setResponses] = useState({});
  const [error, setError] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  
  const { token } = useParams();
  const navigate = useNavigate();
  
  useEffect(() => {
    const fetchSurvey = async () => {
      try {
        setLoading(true);
        
        // This would be your actual API call to fetch the survey
        // Replace with your actual API endpoint
        const response = await fetch(`${process.env.REACT_APP_API_URL || 'http://localhost:3001/api'}/survey_responses/${token}`);
        
        if (!response.ok) {
          throw new Error('Survey not found or expired');
        }
        
        const data = await response.json();
        
        // Initialize response object with empty values
        const initialResponses = {};
        data.questions.forEach(question => {
          if (question.type === 'checkbox') {
            initialResponses[question.id] = [];
          } else {
            initialResponses[question.id] = '';
          }
        });
        
        setSurveyData(data);
        setResponses(initialResponses);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching survey:', err);
        setError(err.message);
        setLoading(false);
      }
    };
    
    fetchSurvey();
  }, [token]);
  
  const handleInputChange = (questionId, value) => {
    setResponses(prev => ({
      ...prev,
      [questionId]: value
    }));
  };
  
  const handleCheckboxChange = (questionId, option, checked) => {
    setResponses(prev => {
      const currentSelections = [...(prev[questionId] || [])];
      
      if (checked) {
        return {
          ...prev,
          [questionId]: [...currentSelections, option]
        };
      } else {
        return {
          ...prev,
          [questionId]: currentSelections.filter(item => item !== option)
        };
      }
    });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      setSubmitting(true);
      
      // Validate required fields
      const requiredQuestionsNotAnswered = surveyData.questions
        .filter(q => q.required)
        .filter(q => {
          if (q.type === 'checkbox') {
            return !responses[q.id] || responses[q.id].length === 0;
          }
          return !responses[q.id];
        });
      
      if (requiredQuestionsNotAnswered.length > 0) {
        const firstUnanswered = requiredQuestionsNotAnswered[0];
        document.getElementById(`question-${firstUnanswered.id}`).scrollIntoView({ behavior: 'smooth' });
        setError('Please answer all required questions');
        setSubmitting(false);
        return;
      }
      
      // This would be your actual API call to submit the survey responses
      // Replace with your actual API endpoint
      const response = await fetch(`${process.env.REACT_APP_API_URL || 'http://localhost:3001/api'}/survey_responses/${token}/submit`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          responses,
          guest_id: surveyData.guest.id
        }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to submit survey');
      }
      
      setSubmitted(true);
      setSubmitting(false);
    } catch (err) {
      console.error('Error submitting survey:', err);
      setError(err.message);
      setSubmitting(false);
    }
  };
  
  // Renders a specific question based on its type
  const renderQuestion = (question) => {
    const isAnswered = question.type === 'checkbox' 
      ? responses[question.id] && responses[question.id].length > 0 
      : !!responses[question.id];
    
    return (
      <div 
        id={`question-${question.id}`} 
        key={question.id} 
        className={`mb-6 p-4 rounded-lg border ${question.required && !isAnswered ? 'border-red-300 bg-red-50' : 'border-gray-200'}`}
      >
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {question.question}
          {question.required && <span className="text-red-500 ml-1">*</span>}
        </label>
        
        {question.type === 'text' && (
          <input
            type="text"
            className="w-full p-2 border rounded"
            value={responses[question.id] || ''}
            onChange={(e) => handleInputChange(question.id, e.target.value)}
            placeholder={question.placeholder || ''}
            required={question.required}
          />
        )}
        
        {question.type === 'textarea' && (
          <textarea
            className="w-full p-2 border rounded"
            value={responses[question.id] || ''}
            onChange={(e) => handleInputChange(question.id, e.target.value)}
            placeholder={question.placeholder || ''}
            required={question.required}
            rows="3"
          ></textarea>
        )}
        
        {question.type === 'radio' && (
          <div className="space-y-2">
            {question.options.map((option, index) => (
              <div key={index} className="flex items-center">
                <input
                  type="radio"
                  id={`option-${question.id}-${index}`}
                  name={`question-${question.id}`}
                  value={option}
                  checked={responses[question.id] === option}
                  onChange={() => handleInputChange(question.id, option)}
                  className="mr-2"
                  required={question.required}
                />
                <label htmlFor={`option-${question.id}-${index}`} className="text-sm text-gray-700">
                  {option}
                </label>
              </div>
            ))}
          </div>
        )}
        
        {question.type === 'checkbox' && (
          <div className="space-y-2">
            {question.options.map((option, index) => (
              <div key={index} className="flex items-center">
                <input
                  type="checkbox"
                  id={`option-${question.id}-${index}`}
                  value={option}
                  checked={responses[question.id]?.includes(option) || false}
                  onChange={(e) => handleCheckboxChange(question.id, option, e.target.checked)}
                  className="mr-2"
                />
                <label htmlFor={`option-${question.id}-${index}`} className="text-sm text-gray-700">
                  {option}
                </label>
              </div>
            ))}
          </div>
        )}
        
        {question.type === 'select' && (
          <select
            className="w-full p-2 border rounded"
            value={responses[question.id] || ''}
            onChange={(e) => handleInputChange(question.id, e.target.value)}
            required={question.required}
          >
            <option value="">Select an option</option>
            {question.options.map((option, index) => (
              <option key={index} value={option}>{option}</option>
            ))}
          </select>
        )}
      </div>
    );
  };
  
  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <svg className="animate-spin h-10 w-10 text-blue-600 mx-auto mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <p className="text-gray-600">Loading your survey...</p>
        </div>
      </div>
    );
  }
  
  // Error state
  if (error && !surveyData) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8 text-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-red-500 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h2 className="text-xl font-bold text-gray-900 mb-2">Survey Not Found</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={() => navigate('/')}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Return Home
          </button>
        </div>
      </div>
    );
  }
  
  // Success state after submission
  if (submitted) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8 text-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-green-500 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h2 className="text-xl font-bold text-gray-900 mb-2">Thank You!</h2>
          <p className="text-gray-600 mb-6">Your response has been recorded. We appreciate your input for the seating arrangement.</p>
          <p className="text-sm text-gray-500">You can now close this window.</p>
        </div>
      </div>
    );
  }
  
  // Survey form
  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="bg-blue-600 px-6 py-4">
            <h1 className="text-white text-xl font-bold">{surveyData?.title}</h1>
            {surveyData?.event && (
              <p className="text-blue-100 mt-1">For: {surveyData.event.name}</p>
            )}
          </div>
          
          <div className="p-6">
            {surveyData?.guest && (
              <div className="mb-6 bg-blue-50 p-4 rounded-lg">
                <p className="font-medium">Hello, {surveyData.guest.name}!</p>
                <p className="text-sm text-gray-600 mt-1">
                  Please complete this survey to help us create the perfect seating arrangement for the event.
                </p>
              </div>
            )}
            
            <div className="mb-6">
              <p className="text-gray-600">{surveyData?.description}</p>
            </div>
            
            {error && (
              <div className="mb-6 bg-red-50 border-l-4 border-red-500 p-4">
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
            
            <form onSubmit={handleSubmit}>
              {surveyData?.questions.map(question => renderQuestion(question))}
              
              <div className="mt-8">
                <button
                  type="submit"
                  disabled={submitting}
                  className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
                    submitting ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
                  }`}
                >
                  {submitting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Submitting...
                    </>
                  ) : 'Submit Survey'}
                </button>
              </div>
            </form>
          </div>
          
          <div className="px-6 py-4 bg-gray-50 text-center">
            <p className="text-xs text-gray-500">
              Your responses will help us create the best possible seating arrangements. Thank you for your input!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GuestSurveyResponse;