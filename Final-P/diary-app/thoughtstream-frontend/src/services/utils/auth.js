// Utility functions for auth token management
export const getAuthToken = () => {
  return localStorage.getItem('jwt');
};

export const setAuthToken = (token) => {
  if (token) {
    localStorage.setItem('jwt', token);
  } else {
    localStorage.removeItem('jwt');
  }
};

export const removeAuthToken = () => {
  localStorage.removeItem('jwt');
  localStorage.removeItem('user');
};