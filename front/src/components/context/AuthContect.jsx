import  { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(localStorage.getItem('authToken'));
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    if (authToken) {
      getUserRole(authToken).then(setUserRole).catch(console.error);
    }
  }, [authToken]);

  const login = (token) => {
    setAuthToken(token);
    localStorage.setItem('authToken', token);
    getUserRole(token).then(setUserRole).catch(console.error); // Fetch and set the user role
  };

  const logout = () => {
    setAuthToken(null);
    setUserRole(null);
    localStorage.removeItem('authToken');
  };

  return (
    <AuthContext.Provider value={{ authToken, userRole, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

const getUserRole = async (token) => {
  try {
    const response = await axios.get('http://localhost:8080/api/users/role', {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    return response.data.role; // Adjust according to your response structure
  } catch (error) {
    console.error('Error fetching user role:', error);
    throw error;
  }
};

export default AuthProvider;
