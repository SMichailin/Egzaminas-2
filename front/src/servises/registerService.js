import axios from 'axios';

export const registerUser = async (formData) => {
  const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/users/register`, formData);
  return response.data;
};