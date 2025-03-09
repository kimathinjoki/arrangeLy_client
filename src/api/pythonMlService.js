// This service handles interactions with the Python ML backend for optimization

const ML_API_BASE_URL = import.meta.VITE_ML_API_URL || 'http://localhost:5000/api';

// Helper for making ML API requests
const fetchML = async (endpoint, options = {}) => {
  // Get auth token (same as Ruby backend for simplicity)
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
    const response = await fetch(`${ML_API_BASE_URL}/${endpoint}`, config);
    
    // Parse JSON response
    const data = await response.json();
    
    // Check for API error responses
    if (!response.ok) {
      throw new Error(data.message || 'An error occurred');
    }
    
    return data;
  } catch (error) {
    console.error('ML API request failed:', error);
    throw error;
  }
};

// LLM Vectorization Service
export const vectorizationService = {
  // Process text inputs to generate embeddings
  vectorizeText: async (texts) => {
    return fetchML('vectorize', {
      method: 'POST',
      body: JSON.stringify({ texts }),
    });
  },
  
  // Process survey free-text responses to extract relationship information
  analyzeSurveyResponses: async (eventId, responses) => {
    return fetchML('analyze_survey', {
      method: 'POST',
      body: JSON.stringify({
        event_id: eventId,
        responses
      }),
    });
  },
};

// Graph Building Service
export const graphService = {
  // Build a relationship graph from guest data
  buildGraph: async (eventId) => {
    return fetchML(`events/${eventId}/build_graph`, {
      method: 'POST',
    });
  },
  
  // Get a visualization of the relationship graph
  getGraphVisualization: async (eventId) => {
    return fetchML(`events/${eventId}/graph_visualization`);
  },
  
  // Update the relationship graph with manual changes
  updateGraph: async (eventId, relationshipChanges) => {
    return fetchML(`events/${eventId}/update_graph`, {
      method: 'POST',
      body: JSON.stringify({ changes: relationshipChanges }),
    });
  },
};

// Optimization Service
export const optimizationService = {
  // Run the seating optimization algorithm
  runOptimization: async (eventId, optimizationConfig) => {
    return fetchML(`events/${eventId}/optimize`, {
      method: 'POST',
      body: JSON.stringify({ config: optimizationConfig }),
    });
  },
  
  // Get the status of a running optimization job
  getOptimizationStatus: async (eventId, jobId) => {
    return fetchML(`events/${eventId}/optimize/${jobId}/status`);
  },
  
  // Get the results of a completed optimization job
  getOptimizationResults: async (eventId, jobId) => {
    return fetchML(`events/${eventId}/optimize/${jobId}/results`);
  },
  
  // Score an existing arrangement
  scoreArrangement: async (eventId, arrangementData) => {
    return fetchML(`events/${eventId}/score_arrangement`, {
      method: 'POST',
      body: JSON.stringify({ arrangement: arrangementData }),
    });
  },
};

// Integration with WebSockets for long-running operations
export const setupOptimizationSocket = (eventId, jobId, callbacks) => {
  const socket = new WebSocket(`${ML_API_BASE_URL.replace('http', 'ws')}/ws/events/${eventId}/optimize/${jobId}`);
  
  socket.onopen = () => {
    console.log('WebSocket connection established');
    if (callbacks.onOpen) callbacks.onOpen();
  };
  
  socket.onmessage = (event) => {
    const data = JSON.parse(event.data);
    
    switch (data.type) {
      case 'progress':
        if (callbacks.onProgress) callbacks.onProgress(data.progress, data.message);
        break;
      case 'complete':
        if (callbacks.onComplete) callbacks.onComplete(data.results);
        break;
      case 'error':
        if (callbacks.onError) callbacks.onError(data.message);
        break;
      default:
        console.log('Received unknown message type:', data.type);
    }
  };
  
  socket.onerror = (error) => {
    console.error('WebSocket error:', error);
    if (callbacks.onError) callbacks.onError('WebSocket connection error');
  };
  
  socket.onclose = () => {
    console.log('WebSocket connection closed');
    if (callbacks.onClose) callbacks.onClose();
  };
  
  return {
    close: () => socket.close()
  };
};

// Advanced Analytics Services
export const analyticsService = {
  // Generate relationship network analysis
  getRelationshipAnalytics: async (eventId) => {
    return fetchML(`events/${eventId}/relationship_analytics`);
  },
  
  // Generate seating quality metrics
  getSeatingMetrics: async (eventId, arrangementId) => {
    return fetchML(`events/${eventId}/arrangements/${arrangementId}/metrics`);
  },
  
  // Compare multiple arrangements
  compareArrangements: async (eventId, arrangementIds) => {
    return fetchML(`events/${eventId}/compare_arrangements`, {
      method: 'POST',
      body: JSON.stringify({ arrangement_ids: arrangementIds }),
    });
  },
  
  // Generate arrangement recommendations
  getRecommendations: async (eventId) => {
    return fetchML(`events/${eventId}/recommendations`);
  }
};

export default {
  vectorization: vectorizationService,
  graph: graphService,
  optimization: optimizationService,
  analytics: analyticsService,
  setupOptimizationSocket
};