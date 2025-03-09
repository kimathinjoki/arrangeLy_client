// api/rubyBackendService.js
// This service handles all interactions with the Ruby backend for data storage

const API_BASE_URL = import.meta.env.REACT_APP_API_URL || 'http://localhost:3001/api';

// Helper for making API requests
const fetchWithAuth = async (endpoint, options = {}) => {
  // Get auth token from localStorage or other storage mechanism
  const token = localStorage.getItem('authToken');
  
  const defaultHeaders = {
    'Content-Type': 'application/json',
    'Authorization': token ? `Bearer ${token}` : '',
  };
  
  const config = {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
  };
  
  try {
    const response = await fetch(`${API_BASE_URL}/${endpoint}`, config);
    
    // Handle unauthorized responses
    if (response.status === 401) {
      // Clear invalid token and redirect to login
      localStorage.removeItem('authToken');
      window.location.href = '/login';
      return null;
    }
    
    // Parse JSON response
    const data = await response.json();
    
    // Check for API error responses
    if (!response.ok) {
      throw new Error(data.message || 'An error occurred');
    }
    
    return data;
  } catch (error) {
    console.error('API request failed:', error);
    throw error;
  }
};

// Auth API calls
export const authService = {
  // Login user
  login: async (email, password) => {
    const response = await fetchWithAuth('auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
    
    if (response && response.token) {
      localStorage.setItem('authToken', response.token);
    }
    
    return response;
  },
  
  // Register user
  register: async (userData) => {
    return fetchWithAuth('auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  },
  
  // Logout user
  logout: () => {
    localStorage.removeItem('authToken');
  },
  
  // Check if user is authenticated
  isAuthenticated: () => {
    return !!localStorage.getItem('authToken');
  },
};

// Event API calls
export const eventService = {
  // Get all events for the logged-in user
  getEvents: () => {
    return fetchWithAuth('events');
  },
  
  // Get a specific event by ID
  getEvent: (eventId) => {
    return fetchWithAuth(`events/${eventId}`);
  },
  
  // Create a new event
  createEvent: (eventData) => {
    return fetchWithAuth('events', {
      method: 'POST',
      body: JSON.stringify({ event: eventData }),
    });
  },
  
  // Update an existing event
  updateEvent: (eventId, eventData) => {
    return fetchWithAuth(`events/${eventId}`, {
      method: 'PUT',
      body: JSON.stringify({ event: eventData }),
    });
  },
  
  // Delete an event
  deleteEvent: (eventId) => {
    return fetchWithAuth(`events/${eventId}`, {
      method: 'DELETE',
    });
  },
};

// Guest API calls
export const guestService = {
  // Get all guests for an event
  getGuests: (eventId) => {
    return fetchWithAuth(`events/${eventId}/guests`);
  },
  
  // Get a specific guest
  getGuest: (eventId, guestId) => {
    return fetchWithAuth(`events/${eventId}/guests/${guestId}`);
  },
  
  // Add a new guest
  addGuest: (eventId, guestData) => {
    return fetchWithAuth(`events/${eventId}/guests`, {
      method: 'POST',
      body: JSON.stringify({ guest: guestData }),
    });
  },
  
  // Update a guest
  updateGuest: (eventId, guestId, guestData) => {
    return fetchWithAuth(`events/${eventId}/guests/${guestId}`, {
      method: 'PUT',
      body: JSON.stringify({ guest: guestData }),
    });
  },
  
  // Delete a guest
  deleteGuest: (eventId, guestId) => {
    return fetchWithAuth(`events/${eventId}/guests/${guestId}`, {
      method: 'DELETE',
    });
  },
  
  // Import guests from a CSV file
  importGuests: (eventId, formData) => {
    return fetch(`${API_BASE_URL}/events/${eventId}/guests/import`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
      },
      body: formData, // FormData object with the CSV file
    }).then(response => {
      if (!response.ok) {
        throw new Error('Failed to import guests');
      }
      return response.json();
    });
  },
};

// Survey API calls
export const surveyService = {
  // Get the survey for an event
  getSurvey: (eventId) => {
    return fetchWithAuth(`events/${eventId}/survey`);
  },
  
  // Create or update a survey
  saveSurvey: (eventId, surveyData) => {
    return fetchWithAuth(`events/${eventId}/survey`, {
      method: 'POST',
      body: JSON.stringify({ survey: surveyData }),
    });
  },
  
  // Get survey responses
  getSurveyResponses: (eventId) => {
    return fetchWithAuth(`events/${eventId}/survey/responses`);
  },
  
  // Submit a survey response (does not require auth - used by guests)
  submitSurveyResponse: (token, responseData) => {
    return fetch(`${API_BASE_URL}/survey_responses/${token}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ response: responseData }),
    }).then(response => {
      if (!response.ok) {
        throw new Error('Failed to submit survey');
      }
      return response.json();
    });
  },
  
  // Send survey reminders
  sendReminders: (eventId, guestIds) => {
    return fetchWithAuth(`events/${eventId}/survey/send_reminders`, {
      method: 'POST',
      body: JSON.stringify({ guest_ids: guestIds }),
    });
  },
};

// Relationships API calls
export const relationshipService = {
  // Get all relationships for an event
  getRelationships: (eventId) => {
    return fetchWithAuth(`events/${eventId}/relationships`);
  },
  
  // Add a relationship
  addRelationship: (eventId, relationshipData) => {
    return fetchWithAuth(`events/${eventId}/relationships`, {
      method: 'POST',
      body: JSON.stringify({ relationship: relationshipData }),
    });
  },
  
  // Update a relationship
  updateRelationship: (eventId, relationshipId, relationshipData) => {
    return fetchWithAuth(`events/${eventId}/relationships/${relationshipId}`, {
      method: 'PUT',
      body: JSON.stringify({ relationship: relationshipData }),
    });
  },
  
  // Delete a relationship
  deleteRelationship: (eventId, relationshipId) => {
    return fetchWithAuth(`events/${eventId}/relationships/${relationshipId}`, {
      method: 'DELETE',
    });
  },
  
  // Import relationships from JSON
  importRelationships: (eventId, relationshipsData) => {
    return fetchWithAuth(`events/${eventId}/relationships/import`, {
      method: 'POST',
      body: JSON.stringify({ relationships: relationshipsData }),
    });
  },
};

// Table Arrangements API calls
export const arrangementService = {
  // Get all arrangements for an event
  getArrangements: (eventId) => {
    return fetchWithAuth(`events/${eventId}/arrangements`);
  },
  
  // Get a specific arrangement
  getArrangement: (eventId, arrangementId) => {
    return fetchWithAuth(`events/${eventId}/arrangements/${arrangementId}`);
  },
  
  // Save an arrangement
  saveArrangement: (eventId, arrangementData) => {
    return fetchWithAuth(`events/${eventId}/arrangements`, {
      method: 'POST',
      body: JSON.stringify({ arrangement: arrangementData }),
    });
  },
  
  // Update an arrangement
  updateArrangement: (eventId, arrangementId, arrangementData) => {
    return fetchWithAuth(`events/${eventId}/arrangements/${arrangementId}`, {
      method: 'PUT',
      body: JSON.stringify({ arrangement: arrangementData }),
    });
  },
  
  // Set an arrangement as current
  setAsCurrent: (eventId, arrangementId) => {
    return fetchWithAuth(`events/${eventId}/arrangements/${arrangementId}/set_as_current`, {
      method: 'POST',
    });
  },
  
  // Generate table cards
  generateTableCards: (eventId, arrangementId) => {
    return fetchWithAuth(`events/${eventId}/arrangements/${arrangementId}/table_cards`, {
      method: 'GET',
      headers: {
        'Accept': 'application/pdf',
      },
      responseType: 'blob',
    }).then(response => {
      // Create a download link for the PDF
      const url = window.URL.createObjectURL(new Blob([response]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'table_cards.pdf');
      document.body.appendChild(link);
      link.click();
      link.remove();
    });
  },
  
  // Generate place cards
  generatePlaceCards: (eventId, arrangementId) => {
    return fetchWithAuth(`events/${eventId}/arrangements/${arrangementId}/place_cards`, {
      method: 'GET',
      headers: {
        'Accept': 'application/pdf',
      },
      responseType: 'blob',
    }).then(response => {
      // Create a download link for the PDF
      const url = window.URL.createObjectURL(new Blob([response]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'place_cards.pdf');
      document.body.appendChild(link);
      link.click();
      link.remove();
    });
  },
};

export default {
  auth: authService,
  events: eventService,
  guests: guestService,
  surveys: surveyService,
  relationships: relationshipService,
  arrangements: arrangementService,
};