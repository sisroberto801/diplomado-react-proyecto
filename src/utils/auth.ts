// Temporary auth helper for testing
export const setAuthToken = (token: string) => {
  localStorage.setItem('authToken', token);
  console.log('Auth token set successfully');
};

export const getAuthToken = () => {
  return localStorage.getItem('authToken');
};

export const removeAuthToken = () => {
  localStorage.removeItem('authToken');
  console.log('Auth token removed');
};

// For testing - you can call this from browser console
// Example: window.setAuthToken('your-token-here')
if (typeof window !== 'undefined') {
  (window as any).setAuthToken = setAuthToken;
  (window as any).getAuthToken = getAuthToken;
  (window as any).removeAuthToken = removeAuthToken;
}
