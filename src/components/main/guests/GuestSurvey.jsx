import React, { useState } from 'react';

function GuestSurvey() {
  const [surveyConfig, setSurveyConfig] = useState({
    title: 'Wedding Seating Arrangement Survey',
    description: 'Please help us create the perfect seating arrangement by answering a few questions about your preferences.',
    questions: [
      {
        id: 1,
        type: 'text',
        question: 'Your Full Name',
        required: true,
        placeholder: 'Enter your full name as it appears on your invitation'
      },
      {
        id: 2,
        type: 'radio',
        question: 'RSVP Confirmation',
        required: true,
        options: ['Yes, I will attend', 'No, I cannot attend']
      },
      {
        id: 3,
        type: 'select',
        question: 'Relationship to the Couple',
        required: true,
        options: [
          'Bride\'s Family', 
          'Groom\'s Family', 
          'Mutual Friend', 
          'Bride\'s Friend', 
          'Groom\'s Friend', 
          'Colleague', 
          'Other'
        ]
      },
      {
        id: 4,
        type: 'select',
        question: 'Age Range',
        required: true,
        options: ['Under 18', '18-25', '26-35', '36-50', '51+']
      },
      {
        id: 5,
        type: 'radio',
        question: 'Are you comfortable sitting with people you don\'t know?',
        required: true,
        options: ['Very comfortable', 'Somewhat comfortable', 'Neutral', 'Somewhat uncomfortable', 'Very uncomfortable']
      },
      {
        id: 6,
        type: 'radio',
        question: 'Do you enjoy engaging in conversations at events?',
        required: true,
        options: ['Love it!', 'Enjoy it sometimes', 'Neutral', 'Prefer to listen', 'Not really']
      },
      {
        id: 7,
        type: 'radio',
        question: 'How likely are you to dance at the reception?',
        required: true,
        options: ['Will be on the dance floor all night!', 'Will dance occasionally', 'Only for special dances', 'Unlikely to dance', 'Definitely won\'t dance']
      },
      {
        id: 8,
        type: 'text',
        question: 'If you are bringing a significant other, please enter their name',
        required: false,
        placeholder: 'Leave blank if not applicable'
      },
      {
        id: 9,
        type: 'checkbox',
        question: 'Do you have any dietary restrictions?',
        required: false,
        options: ['Vegetarian', 'Vegan', 'Gluten-Free', 'Dairy-Free', 'Nut Allergy', 'Other']
      },
      {
        id: 10,
        type: 'textarea',
        question: 'Is there anyone specific you would like to sit with? Please list their names.',
        required: false,
        placeholder: 'We will try our best to accommodate your preferences'
      },
      {
        id: 11,
        type: 'textarea',
        question: 'Is there anyone you would prefer not to sit with?',
        required: false,
        placeholder: 'This information will be kept confidential'
      },
      {
        id: 12,
        type: 'textarea',
        question: 'Any additional preferences or requirements for your seating arrangement?',
        required: false,
        placeholder: 'E.g., need to be near exit, need accessible seating, etc.'
      }
    ]
  });

  const [previewMode, setPreviewMode] = useState(false);
  const [shareUrl, setShareUrl] = useState('');
  const [showShareModal, setShowShareModal] = useState(false);

  const addQuestion = (type) => {
    const newQuestion = {
      id: surveyConfig.questions.length + 1,
      type: type,
      question: 'New Question',
      required: false,
      options: type === 'radio' || type === 'checkbox' || type === 'select' ? ['Option 1', 'Option 2'] : [],
      placeholder: type === 'text' || type === 'textarea' ? 'Enter your answer here' : ''
    };

    setSurveyConfig({
      ...surveyConfig,
      questions: [...surveyConfig.questions, newQuestion]
    });
  };

  const updateQuestion = (id, field, value) => {
    setSurveyConfig({
      ...surveyConfig,
      questions: surveyConfig.questions.map(q => 
        q.id === id ? { ...q, [field]: value } : q
      )
    });
  };

  const updateOption = (questionId, index, value) => {
    setSurveyConfig({
      ...surveyConfig,
      questions: surveyConfig.questions.map(q => {
        if (q.id === questionId) {
          const updatedOptions = [...q.options];
          updatedOptions[index] = value;
          return { ...q, options: updatedOptions };
        }
        return q;
      })
    });
  };

  const addOption = (questionId) => {
    setSurveyConfig({
      ...surveyConfig,
      questions: surveyConfig.questions.map(q => {
        if (q.id === questionId) {
          return { ...q, options: [...q.options, `Option ${q.options.length + 1}`] };
        }
        return q;
      })
    });
  };

  const removeOption = (questionId, index) => {
    setSurveyConfig({
      ...surveyConfig,
      questions: surveyConfig.questions.map(q => {
        if (q.id === questionId) {
          const updatedOptions = [...q.options];
          updatedOptions.splice(index, 1);
          return { ...q, options: updatedOptions };
        }
        return q;
      })
    });
  };

  const removeQuestion = (id) => {
    setSurveyConfig({
      ...surveyConfig,
      questions: surveyConfig.questions.filter(q => q.id !== id)
    });
  };

  const moveQuestion = (id, direction) => {
    const currentIndex = surveyConfig.questions.findIndex(q => q.id === id);
    if (
      (direction === 'up' && currentIndex === 0) || 
      (direction === 'down' && currentIndex === surveyConfig.questions.length - 1)
    ) {
      return; // Can't move further
    }

    const newIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1;
    const updatedQuestions = [...surveyConfig.questions];
    [updatedQuestions[currentIndex], updatedQuestions[newIndex]] = 
      [updatedQuestions[newIndex], updatedQuestions[currentIndex]];

    setSurveyConfig({
      ...surveyConfig,
      questions: updatedQuestions
    });
  };

  const generateShareUrl = () => {
    // In a real app, this would make an API call to save the survey and generate a unique URL
    const dummyUrl = `https://arrange.ly/survey/${Math.random().toString(36).substring(2, 8)}`;
    setShareUrl(dummyUrl);
    setShowShareModal(true);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareUrl);
    alert('Survey link copied to clipboard!');
  };

  const saveAndPreview = () => {
    setPreviewMode(!previewMode);
  };

  const renderQuestionEditor = (question) => {
    return (
      <div key={question.id} className="bg-white p-4 mb-4 rounded-lg shadow-md">
        <div className="flex justify-between items-start mb-3">
          <div className="flex-grow mr-4">
            <input
              type="text"
              className="w-full p-2 border rounded"
              value={question.question}
              onChange={(e) => updateQuestion(question.id, 'question', e.target.value)}
            />
          </div>
          <div className="flex space-x-2">
            <button 
              onClick={() => moveQuestion(question.id, 'up')} 
              className="bg-gray-200 p-1 rounded hover:bg-gray-300"
              title="Move Up"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
            </button>
            <button 
              onClick={() => moveQuestion(question.id, 'down')} 
              className="bg-gray-200 p-1 rounded hover:bg-gray-300"
              title="Move Down"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M14.707 10.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 12.586V5a1 1 0 012 0v7.586l2.293-2.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </button>
            <button 
              onClick={() => removeQuestion(question.id)} 
              className="bg-red-500 p-1 rounded text-white hover:bg-red-600"
              title="Remove Question"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </div>
        
        <div className="mb-3">
          <label className="block text-sm font-medium text-gray-700 mb-1">Question Type</label>
          <select 
            className="w-full p-2 border rounded"
            value={question.type}
            onChange={(e) => updateQuestion(question.id, 'type', e.target.value)}
          >
            <option value="text">Short Text</option>
            <option value="textarea">Long Text</option>
            <option value="radio">Single Choice</option>
            <option value="checkbox">Multiple Choice</option>
            <option value="select">Dropdown</option>
          </select>
        </div>
        
        <div className="flex items-center mb-3">
          <input
            type="checkbox"
            id={`required-${question.id}`}
            checked={question.required}
            onChange={(e) => updateQuestion(question.id, 'required', e.target.checked)}
            className="mr-2"
          />
          <label htmlFor={`required-${question.id}`} className="text-sm text-gray-700">Required question</label>
        </div>
        
        {(question.type === 'text' || question.type === 'textarea') && (
          <div className="mb-3">
            <label className="block text-sm font-medium text-gray-700 mb-1">Placeholder Text</label>
            <input
              type="text"
              className="w-full p-2 border rounded"
              value={question.placeholder || ''}
              onChange={(e) => updateQuestion(question.id, 'placeholder', e.target.value)}
            />
          </div>
        )}
        
        {(question.type === 'radio' || question.type === 'checkbox' || question.type === 'select') && (
          <div className="mb-3">
            <label className="block text-sm font-medium text-gray-700 mb-1">Options</label>
            {question.options.map((option, index) => (
              <div key={index} className="flex items-center mb-2">
                <input
                  type="text"
                  className="flex-grow p-2 border rounded mr-2"
                  value={option}
                  onChange={(e) => updateOption(question.id, index, e.target.value)}
                />
                <button 
                  onClick={() => removeOption(question.id, index)}
                  className="bg-red-100 text-red-600 p-1 rounded hover:bg-red-200"
                  disabled={question.options.length <= 2}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            ))}
            <button
              onClick={() => addOption(question.id)}
              className="text-blue-600 text-sm flex items-center mt-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
              </svg>
              Add Option
            </button>
          </div>
        )}
      </div>
    );
  };

  const renderPreview = (question) => {
    const QuestionLabel = () => (
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {question.question}
        {question.required && <span className="text-red-500 ml-1">*</span>}
      </label>
    );

    switch (question.type) {
      case 'text':
        return (
          <div key={question.id} className="mb-4">
            <QuestionLabel />
            <input
              type="text"
              placeholder={question.placeholder}
              className="w-full p-2 border rounded"
              required={question.required}
              disabled
            />
          </div>
        );
      
      case 'textarea':
        return (
          <div key={question.id} className="mb-4">
            <QuestionLabel />
            <textarea
              placeholder={question.placeholder}
              className="w-full p-2 border rounded"
              required={question.required}
              rows="3"
              disabled
            ></textarea>
          </div>
        );
      
      case 'radio':
        return (
          <div key={question.id} className="mb-4">
            <QuestionLabel />
            <div className="space-y-2">
              {question.options.map((option, index) => (
                <div key={index} className="flex items-center">
                  <input
                    type="radio"
                    name={`question-${question.id}`}
                    id={`option-${question.id}-${index}`}
                    className="mr-2"
                    disabled
                  />
                  <label htmlFor={`option-${question.id}-${index}`} className="text-sm text-gray-700">
                    {option}
                  </label>
                </div>
              ))}
            </div>
          </div>
        );
      
      case 'checkbox':
        return (
          <div key={question.id} className="mb-4">
            <QuestionLabel />
            <div className="space-y-2">
              {question.options.map((option, index) => (
                <div key={index} className="flex items-center">
                  <input
                    type="checkbox"
                    id={`option-${question.id}-${index}`}
                    className="mr-2"
                    disabled
                  />
                  <label htmlFor={`option-${question.id}-${index}`} className="text-sm text-gray-700">
                    {option}
                  </label>
                </div>
              ))}
            </div>
          </div>
        );
      
      case 'select':
        return (
          <div key={question.id} className="mb-4">
            <QuestionLabel />
            <select className="w-full p-2 border rounded" required={question.required} disabled>
              <option value="">Select an option</option>
              {question.options.map((option, index) => (
                <option key={index} value={option}>{option}</option>
              ))}
            </select>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold mb-6">Guest Survey Management</h1>
      
      {/* Survey Creation/Preview Tabs */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
        <div className="flex border-b">
          <button
            className={`px-4 py-2 font-medium text-sm flex-1 ${!previewMode ? 'bg-blue-50 text-blue-600 border-b-2 border-blue-500' : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'}`}
            onClick={() => setPreviewMode(false)}
          >
            Edit Survey
          </button>
          <button
            className={`px-4 py-2 font-medium text-sm flex-1 ${previewMode ? 'bg-blue-50 text-blue-600 border-b-2 border-blue-500' : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'}`}
            onClick={() => setPreviewMode(true)}
          >
            Preview Survey
          </button>
        </div>
      </div>
      
      {!previewMode ? (
        <div>
          {/* Survey Settings */}
          <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <h2 className="text-lg font-semibold mb-4">Survey Details</h2>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Survey Title</label>
              <input
                type="text"
                className="w-full p-2 border rounded"
                value={surveyConfig.title}
                onChange={(e) => setSurveyConfig({ ...surveyConfig, title: e.target.value })}
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Survey Description</label>
              <textarea
                className="w-full p-2 border rounded"
                value={surveyConfig.description}
                onChange={(e) => setSurveyConfig({ ...surveyConfig, description: e.target.value })}
                rows="3"
              ></textarea>
            </div>
          </div>
          
          {/* Question List */}
          <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Survey Questions</h2>
              <div className="relative group">
                <button className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700">
                  Add Question
                </button>
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg hidden group-hover:block z-10">
                  <div className="py-1">
                    <button 
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                      onClick={() => addQuestion('text')}
                    >
                      Short Text
                    </button>
                    <button 
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                      onClick={() => addQuestion('textarea')}
                    >
                      Long Text
                    </button>
                    <button 
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                      onClick={() => addQuestion('radio')}
                    >
                      Single Choice
                    </button>
                    <button 
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                      onClick={() => addQuestion('checkbox')}
                    >
                      Multiple Choice
                    </button>
                    <button 
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                      onClick={() => addQuestion('select')}
                    >
                      Dropdown
                    </button>
                  </div>
                </div>
              </div>
            </div>
            
            {surveyConfig.questions.map(question => renderQuestionEditor(question))}
            
            {surveyConfig.questions.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                <p>No questions added yet. Click "Add Question" to get started.</p>
              </div>
            )}
          </div>
          
          {/* Action Buttons */}
          <div className="flex justify-end space-x-4 mb-6">
            <button
              className="bg-gray-200 text-gray-800 py-2 px-4 rounded hover:bg-gray-300"
              onClick={() => saveAndPreview()}
            >
              Preview Survey
            </button>
            <button
              className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700"
              onClick={() => generateShareUrl()}
            >
              Save & Share Survey
            </button>
          </div>
          
          {/* Share Modal */}
          {showShareModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
                <h3 className="text-lg font-semibold mb-4">Share Survey</h3>
                <p className="text-sm text-gray-600 mb-4">Your survey is ready to share. Copy the link below:</p>
                
                <div className="flex mb-4">
                  <input
                    type="text"
                    className="flex-grow p-2 border rounded-l"
                    value={shareUrl}
                    readOnly
                  />
                  <button
                    className="bg-blue-600 text-white px-4 rounded-r hover:bg-blue-700"
                    onClick={copyToClipboard}
                  >
                    Copy
                  </button>
                </div>
                
                <div className="mt-6 flex justify-end">
                  <button
                    className="bg-gray-200 text-gray-800 py-2 px-4 rounded hover:bg-gray-300"
                    onClick={() => setShowShareModal(false)}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div>
          {/* Survey Preview */}
          <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <h2 className="text-xl font-bold mb-2">{surveyConfig.title}</h2>
            <p className="text-gray-600 mb-6">{surveyConfig.description}</p>
            
            <form>
              {surveyConfig.questions.map(question => renderPreview(question))}
              
              <div className="mt-6">
                <button
                  type="button"
                  className="bg-blue-600 text-white py-2 px-6 rounded hover:bg-blue-700"
                  disabled
                >
                  Submit Survey
                </button>
              </div>
            </form>
          </div>
          
          <div className="flex justify-end space-x-4 mb-6">
            <button
              className="bg-gray-200 text-gray-800 py-2 px-4 rounded hover:bg-gray-300"
              onClick={() => setPreviewMode(false)}
            >
              Back to Editing
            </button>
            <button
              className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700"
              onClick={() => generateShareUrl()}
            >
              Save & Share Survey
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default GuestSurvey;