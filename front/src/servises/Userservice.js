
import axios from 'axios';

export const getUserRole = async (token) => {
  try {
    const response = await axios.get('http://localhost:8080/api/users/role', {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    return response.data.role; 
  } catch (error) {
    console.error('Error fetching user role:', error);
    throw error;
  }
};

