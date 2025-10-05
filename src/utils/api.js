// API utility functions for YojanaFinder

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8091';

// Generic API call function with error handling
const apiCall = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;

  const defaultOptions = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const config = { ...defaultOptions, ...options };

  try {
    const response = await fetch(url, config);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || `API Error: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`API call failed for ${endpoint}:`, error);
    throw error;
  }
};

// Specific API functions
export const searchSchemes = async (filters) => {
  return apiCall('/api/schemes', {
    method: 'POST',
    body: JSON.stringify(filters),
  });
};

export const submitContactForm = async (formData) => {
  return apiCall('/api/contact', {
    method: 'POST',
    body: JSON.stringify(formData),
  });
};

export const registerUser = async (userData) => {
  return apiCall('/api/register', {
    method: 'POST',
    body: JSON.stringify(userData),
  });
};

export const updateUserProfile = async (uid, profileData) => {
  return apiCall(`/api/profile/${uid}`, {
    method: 'PUT',
    body: JSON.stringify(profileData),
  });
};

export const getUserProfile = async (uid) => {
  return apiCall(`/api/profile/${uid}`);
};

export const checkApiHealth = async () => {
  return apiCall('/');
};

export default {
  searchSchemes,
  submitContactForm,
  registerUser,
  updateUserProfile,
  getUserProfile,
  checkApiHealth,
};