export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  window.location.href = '/';
};

export const isAuthenticated = () => {
  return !!localStorage.getItem('token');
}; 