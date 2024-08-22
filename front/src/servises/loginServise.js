import axios from 'axios';

export const loginUser = async (credentials) => {
  try {
    const response = await axios.post('http://localhost:8080/api/users/login', credentials, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    return response.data.token; 
  } catch (error) {
    console.error('Error logging in:', error);
    throw error;
  }
};