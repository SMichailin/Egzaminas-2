import axios from 'axios';

export const addAdd = async (addData) => {
  const token = localStorage.getItem('authToken');
  try {
    const response = await axios.post('http://localhost:8080/api/adds', addData, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error adding add:', error.response); 
    throw error;
  }
};
export const fetchAdds = async () => {
  try {
    const response = await axios.get('http://localhost:8080/api/adds');
    return response.data; 
  } catch (error) {
    console.error('Error fetching adds:', error.response); 
    throw error; 
  }
  
};
const API_URL = 'http://localhost:8080/api/adds';

export const updateBook = async (id, book) => {
  const response = await axios.put(`${API_URL}/${id}`, book);
  return response.data;
};

export const deleteBook = async (id) => {
  await axios.delete(`${API_URL}/${id}`);
};